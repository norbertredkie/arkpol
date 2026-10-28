import datetime as dt, json, shutil, tempfile, unittest
from pathlib import Path
import sla_kwartal as S

HERE = Path(__file__).resolve().parent
D = dt.date

class Base(unittest.TestCase):
    def setUp(self):
        self.tmp = Path(tempfile.mkdtemp())
        shutil.copytree(HERE / "templates", self.tmp / "templates")
        self.cfg = json.loads((HERE / "config.json").read_text())
        self.cfg["sla_document"] = ""
        (self.tmp / "subcontractors.json").write_text(json.dumps([
            {"id": "a", "name": "A", "email": "a@x", "lang": "pl", "active": True},
            {"id": "b", "name": "B", "email": "b@x", "lang": "en", "active": True},
            {"id": "z", "name": "Z", "email": "z@x", "active": False}]))
        self.log = []
    def tearDown(self): shutil.rmtree(self.tmp)
    def run_on(self, day):
        return S.run(day, base=self.tmp, cfg=self.cfg, log=self.log.append)
    def outbox(self):
        return sorted(p.name.split("-", 2)[2] for p in (self.tmp / "outbox").glob("*.eml"))
    def blocked(self):
        return json.loads((self.tmp / "blocked.json").read_text())

class Calendar(Base):
    def test_target_quarter_switches_14_days_before(self):
        self.assertEqual(S.target_quarter(D(2026, 12, 17), self.cfg), "2026-Q4")
        self.assertEqual(S.target_quarter(D(2026, 12, 18), self.cfg), "2027-Q1")
        self.assertEqual(S.target_quarter(D(2026, 10, 28), self.cfg), "2026-Q4")
    def test_offsets_match_norbert(self):
        self.assertEqual(S.step_offsets(self.cfg), {"invite": 0, "reminder1": 3, "reminder2": 6, "warning": 9})

class FullCycle(Base):
    def test_unsigned_timeline_and_block_at_quarter_start(self):
        start = D(2026, 12, 18)  # 14 days before 2027-Q1
        for i in range(0, 20):
            self.run_on(start + dt.timedelta(days=i))
        st = json.loads((self.tmp / "state.json").read_text())["2027-Q1"]["a"]["steps"]
        self.assertEqual(st, {"invite": "2026-12-18", "reminder1": "2026-12-21",
                              "reminder2": "2026-12-24", "warning": "2026-12-27"})
        self.assertNotIn("z", json.loads((self.tmp / "state.json").read_text())["2027-Q1"])
        self.assertEqual(len(self.outbox()), 8)  # 4 steps x 2 active subs, nothing else
        # notice on 27.12, block only from quarter start
        S.run(D(2026, 12, 31), base=self.tmp, cfg=self.cfg, log=self.log.append)
        self.assertEqual(self.blocked()["blocked"], [])
        self.run_on(D(2027, 1, 1))
        self.assertEqual(self.blocked()["blocked"], ["a", "b"])

    def test_signed_after_reminder_stops_mails_and_unblocks(self):
        self.run_on(D(2026, 12, 18)); self.run_on(D(2026, 12, 21))
        st = json.loads((self.tmp / "state.json").read_text())
        st["2027-Q1"]["a"]["signed_at"] = "2026-12-22"
        (self.tmp / "state.json").write_text(json.dumps(st))
        for i in range(22, 32):
            self.run_on(D(2026, 12, i))
        self.run_on(D(2027, 1, 2))
        names = self.outbox()
        self.assertIn("signed-a.eml", names)
        self.assertNotIn("reminder2-a.eml", names)
        self.assertNotIn("warning-a.eml", names)
        self.assertEqual(self.blocked()["blocked"], ["b"])

    def test_missed_days_send_only_latest_step(self):
        self.run_on(D(2026, 12, 18))
        self.run_on(D(2026, 12, 25))  # job dead 19-24: reminder1 skipped, reminder2 sent
        names = [n for n in self.outbox() if n.endswith("-a.eml")]
        self.assertEqual(names, ["invite-a.eml", "reminder2-a.eml"])

    def test_mid_quarter_first_run_blocks_day_after_notice(self):
        for i in range(0, 12):
            self.run_on(D(2026, 11, 2) + dt.timedelta(days=i))
        st = json.loads((self.tmp / "state.json").read_text())["2026-Q4"]["a"]["steps"]
        self.assertEqual(st["warning"], "2026-11-11")
        self.run_on(D(2026, 11, 11)); self.assertEqual(self.blocked()["blocked"], [])
        self.run_on(D(2026, 11, 12)); self.assertEqual(self.blocked()["blocked"], ["a", "b"])

class Mail(Base):
    def test_cc_office_manager_and_language(self):
        self.run_on(D(2026, 12, 18))
        import email
        rd = lambda g: email.message_from_bytes(next((self.tmp / "outbox").glob(g)).read_bytes())
        a, b = rd("*invite-a.eml"), rd("*invite-b.eml")
        self.assertEqual(a["Cc"], "[office-manager@arkpol.com]")
        self.assertIn("SLA podwykonawcy Arkpol na kwartał 2027-Q1", a.get_payload(decode=True).decode())
        self.assertIn("subcontractor SLA for 2027-Q1", b.get_payload(decode=True).decode())
    def test_warning_names_block_date(self):
        for i in range(0, 10): self.run_on(D(2026, 12, 18) + dt.timedelta(days=i))
        w = next((self.tmp / "outbox").glob("*warning-a.eml")).read_text()
        self.assertIn("od 01.01.2027", w)
    def test_switch_off_never_touches_smtp(self):
        self.assertFalse(self.cfg["send_enabled"])
        S.smtplib.SMTP = None  # would crash if used
        self.run_on(D(2026, 12, 18))
        self.assertTrue(any("dry-run" in l for l in self.log))

if __name__ == "__main__":
    unittest.main()
