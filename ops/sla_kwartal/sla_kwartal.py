"""Quarterly subcontractor SLA signing cycle.

Every quarter each active subcontractor gets the SLA for the next quarter to sign.
Office Manager is CC'd on every mail; signed copies are archived to Google Drive.

Timeline (Norbert, 28.10.2026), counted from the day the SLA was sent (D0):
  D0     invitation to sign
  D+3    reminder 1
  D+6    reminder 2
  D+9    notice: no signature = new orders blocked
  block  from the first day of the quarter; if the cycle was sent mid-quarter,
         from the day after the notice

Runs once a day (launchd). Idempotent: every step fires once per quarter. If the
job missed days, only the latest due step is sent (no back-to-back catch-up mails).

Outbound mail and Drive archiving stay behind switches in config.json.
With switches off, mails land in outbox/ as .eml files and nothing leaves the machine.
"""
from __future__ import annotations

import argparse
import datetime as dt
import json
import shutil
import smtplib
import subprocess
import sys
from email.message import EmailMessage
from pathlib import Path

HERE = Path(__file__).resolve().parent
STEPS = ["invite", "reminder1", "reminder2", "warning"]


# ---------- calendar ----------

def quarter_of(d: dt.date) -> str:
    return f"{d.year}-Q{(d.month - 1) // 3 + 1}"


def quarter_start(q: str) -> dt.date:
    y, n = int(q[:4]), int(q[-1])
    return dt.date(y, 3 * (n - 1) + 1, 1)


def next_quarter(q: str) -> str:
    y, n = int(q[:4]), int(q[-1])
    return f"{y + 1}-Q1" if n == 4 else f"{y}-Q{n + 1}"


def step_offsets(cfg: dict) -> dict[str, int]:
    every = cfg["reminder_every_days"]
    off = {"invite": 0}
    for i in range(1, cfg["reminders"] + 1):
        off[f"reminder{i}"] = every * i
    off["warning"] = every * cfg["reminders"] + cfg["warning_after_last_reminder_days"]
    return off


def target_quarter(today: dt.date, cfg: dict) -> str:
    """The quarter whose SLA must be in signing today.

    Once we are inside the send window of the next quarter, that one; otherwise the
    current quarter (covers the very first run, which happens mid-quarter)."""
    nq = next_quarter(quarter_of(today))
    if (quarter_start(nq) - today).days <= cfg["send_days_before_quarter"]:
        return nq
    return quarter_of(today)


# ---------- core decision (pure, tested) ----------

def due_step(rec: dict, today: dt.date, cfg: dict) -> str | None:
    """Latest step that is due and not yet done, or None."""
    if rec.get("signed_at"):
        return None
    if "invite" not in rec.get("steps", {}):
        return "invite"
    sent = dt.date.fromisoformat(rec["steps"]["invite"])
    age = (today - sent).days
    offsets = step_offsets(cfg)
    due = [s for s in STEPS if offsets[s] <= age]
    latest = due[-1]
    return None if latest in rec["steps"] else latest


def block_from(rec: dict, quarter: str) -> dt.date | None:
    """Day from which new orders are blocked, or None while not warned / signed."""
    if rec.get("signed_at") or "warning" not in rec.get("steps", {}):
        return None
    warned = dt.date.fromisoformat(rec["steps"]["warning"])
    return max(quarter_start(quarter), warned + dt.timedelta(days=1))


def is_blocked(rec: dict, quarter: str, today: dt.date) -> bool:
    b = block_from(rec, quarter)
    return b is not None and today >= b


# ---------- mail ----------

def render(step: str, sub: dict, quarter: str, cfg: dict, today: dt.date, rec: dict) -> tuple[str, str]:
    lang = sub.get("lang", "pl") if sub.get("lang") in ("pl", "en") else "en"
    tpl = (HERE / "templates" / f"{step}.{lang}.txt").read_text(encoding="utf-8")
    qs = quarter_start(quarter)
    sent = rec.get("steps", {}).get("invite", today.isoformat())
    fields = {
        "name": sub["name"],
        "quarter": quarter,
        "quarter_start": qs.strftime("%d.%m.%Y"),
        "sent": dt.date.fromisoformat(sent).strftime("%d.%m.%Y"),
        "block_date": max(qs, today + dt.timedelta(days=1)).strftime("%d.%m.%Y"),
        "sign_link": rec.get("sign_link", "[link do podpisu w Autenti]"),
    }
    subject, body = tpl.split("\n", 1)
    return subject.removeprefix("Subject: ").format(**fields), body.lstrip("\n").format(**fields)


def keychain(service: str) -> str:
    out = subprocess.run(["security", "find-generic-password", "-s", service, "-w"],
                         capture_output=True, text=True)
    if out.returncode != 0:
        raise RuntimeError(f"Keychain item {service} missing")
    return out.stdout.strip()


def deliver(msg: EmailMessage, cfg: dict, outbox: Path) -> str:
    outbox.mkdir(parents=True, exist_ok=True)
    name = f"{dt.datetime.now():%Y%m%d-%H%M%S}-{msg['X-SLA-Step']}-{msg['X-SLA-Sub']}.eml"
    (outbox / name).write_bytes(bytes(msg))
    if not cfg["send_enabled"]:
        return f"dry-run → outbox/{name}"
    pw = keychain(cfg["smtp_keychain_service"])
    with smtplib.SMTP(cfg["smtp_host"], cfg["smtp_port"], timeout=60) as s:
        s.starttls()
        s.login(cfg["from_address"], pw)
        s.send_message(msg)
    return f"SENT → {msg['To']} (cc {msg['Cc']})"


def build_mail(step, sub, quarter, cfg, today, rec, attach: Path | None) -> EmailMessage:
    subject, body = render(step, sub, quarter, cfg, today, rec)
    m = EmailMessage()
    m["From"], m["To"], m["Cc"] = cfg["from_address"], sub["email"], cfg["cc_office_manager"]
    m["Subject"] = subject
    m["X-SLA-Step"], m["X-SLA-Sub"], m["X-SLA-Quarter"] = step, sub["id"], quarter
    m.set_content(body)
    if attach and attach.exists():
        m.add_attachment(attach.read_bytes(), maintype="application",
                         subtype="vnd.openxmlformats-officedocument.wordprocessingml.document",
                         filename=f"SLA_Podwykonawca_{quarter}.docx")
    return m


# ---------- signing + archive adapters ----------

def autenti_status(rec: dict, cfg: dict) -> str | None:
    """Signed date (ISO) from Autenti, or None. Needs W.7 (Autenti API key)."""
    if not cfg["send_enabled"]:
        return None
    raise NotImplementedError("Autenti API not connected yet (scope W.7)")


def archive(sub: dict, quarter: str, signed_pdf: Path | None, cfg: dict) -> str:
    folder = cfg["drive_folder"].format(quarter=quarter)
    local = HERE / "archive" / quarter
    local.mkdir(parents=True, exist_ok=True)
    if signed_pdf and signed_pdf.exists():
        shutil.copy2(signed_pdf, local / f"{sub['id']}_{quarter}.pdf")
    if not cfg["archive_enabled"]:
        return f"dry-run → archive/{quarter} (Drive: {folder})"
    raise NotImplementedError("Google Drive upload not connected yet (Arkpol Drive access)")


# ---------- run ----------

def load(p: Path, default):
    return json.loads(p.read_text(encoding="utf-8")) if p.exists() else default


def run(today: dt.date, base: Path = HERE, cfg: dict | None = None, log=print) -> dict:
    cfg = cfg or load(base / "config.json", {})
    subs = load(base / "subcontractors.json", None)
    if subs is None:
        log("no subcontractors.json yet (Office Manager list A9) — nothing to do")
        return {}
    state = load(base / "state.json", {})
    q = target_quarter(today, cfg)
    qstate = state.setdefault(q, {})
    attach = Path(cfg["sla_document"]).expanduser() if cfg.get("sla_document") else None

    for sub in (s for s in subs if s.get("active")):
        rec = qstate.setdefault(sub["id"], {"steps": {}})
        signed = rec.get("signed_at") or autenti_status(rec, cfg)
        if signed and not rec.get("archived"):
            rec["signed_at"] = signed
            rec["archived"] = archive(sub, q, None, cfg)
            log(f"{q} {sub['id']}: SIGNED {signed} · {rec['archived']}")
            m = build_mail("signed", sub, q, cfg, today, rec, None)
            log(f"{q} {sub['id']}: signed → {deliver(m, cfg, base / 'outbox')}")
            continue
        step = due_step(rec, today, cfg)
        if step:
            m = build_mail(step, sub, q, cfg, today, rec, attach if step == "invite" else None)
            res = deliver(m, cfg, base / "outbox")
            rec["steps"][step] = today.isoformat()
            log(f"{q} {sub['id']}: {step} · {res}")

    blocked = sorted(sid for sid, rec in qstate.items() if is_blocked(rec, q, today))
    (base / "blocked.json").write_text(json.dumps(
        {"quarter": q, "as_of": today.isoformat(), "blocked": blocked}, indent=1), encoding="utf-8")
    if blocked:
        log(f"{q} BLOCKED (no new orders): {', '.join(blocked)}")
    (base / "state.json").write_text(json.dumps(state, indent=1, ensure_ascii=False), encoding="utf-8")
    return state


def main(argv=None):
    ap = argparse.ArgumentParser()
    ap.add_argument("--today", help="YYYY-MM-DD (testing)")
    ap.add_argument("--mark-signed", nargs=2, metavar=("SUB_ID", "DATE"),
                    help="manual signature record until Autenti is connected")
    a = ap.parse_args(argv)
    today = dt.date.fromisoformat(a.today) if a.today else dt.date.today()
    if a.mark_signed:
        cfg = load(HERE / "config.json", {})
        state = load(HERE / "state.json", {})
        q = target_quarter(today, cfg)
        state.setdefault(q, {}).setdefault(a.mark_signed[0], {"steps": {}})["signed_at"] = a.mark_signed[1]
        (HERE / "state.json").write_text(json.dumps(state, indent=1, ensure_ascii=False), encoding="utf-8")
        print(f"{q} {a.mark_signed[0]} signed {a.mark_signed[1]}")
        return
    run(today)


if __name__ == "__main__":
    sys.exit(main())
