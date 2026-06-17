# ARKPOL — Kalkulator Wyceny Przeprowadzki
**Sekcja:** Redesign strony | **Typ:** Interaktywny widget / lead capture tool  
**Data:** 2026-06-17 | **Autor:** CPA

---

## Cel

Zamienić "Contact Us" (pasywne, zero konwersji) na **aktywny kalkulator wyceny** który:
1. Angażuje użytkownika od razu (mikrointerakcje)
2. Kwalifikuje lead (typ przeprowadzki, skala, termin)
3. Zbiera dane kontaktowe **po** pokazaniu szacunku — nie przed
4. Generuje dane dla CMO/CRO (skąd, dokąd, ile firm pyta)

---

## Logika Kalkulatora (5 kroków)

### Krok 1 — Typ przeprowadzki
```
[ Prywatna / Dom ]   [ Firmowa / Biuro ]   [ NATO / Wojskowa ]
```
Wybór wpływa na: zakres pytań, tone of voice, CTA na końcu.

---

### Krok 2 — Skala
**Prywatna:**
- Kawalerka / 1 pokój
- 2–3 pokoje
- Dom / 4+ pokoi
- Specjalny transport (dzieło sztuki, fortepian, wino)

**Firmowa:**
- Małe biuro (< 10 osób)
- Średnie biuro (10–50 osób)
- Duże biuro (50+ osób)
- Relokacja pracownika (expat package)

---

### Krok 3 — Trasa
```
Skąd: [ kraj / miasto ]  →  Dokąd: [ kraj / miasto ]
```
Automatyczne flagowanie:
- Europa → Europa: **Własne ekipy Arkpol** (szybciej, taniej)
- Europa → poza EU: **Sieć partnerów** (dodatkowe info o customs)
- Specjalne: Niemcy, NL, BE → highlight Frankfurt/BNL warehouse

---

### Krok 4 — Termin
```
[ < 2 tygodnie ]  [ 1–3 miesiące ]  [ > 3 miesiące ]  [ Elastyczny ]
```
Pilność wpływa na priorytet w CRM i tone odpowiedzi.

---

### Krok 5 — Szacunek + Formularz kontaktowy

**Pokazujesz szacunek PRZED pobraniem kontaktu:**

```
📦 Twoja przeprowadzka: Warszawa → Frankfurt
👥 Firmowa, 10–50 osób

Szacunkowy koszt: €3,500 – €8,000
Czas realizacji: 3–7 dni roboczych
Ekipa: własne zespoły Arkpol (PL + DE)

Aby otrzymać dokładną wycenę:
[ Imię ]  [ Email firmowy ]  [ Telefon ]
[ Wyślij zapytanie → ]
```

**Dlaczego koszt przed formularzem:** użytkownik czuje że dostał wartość → wyższy conversion rate vs "wypełnij formularz żeby dowiedzieć się ceny."

---

## Algorytm Szacowania (wewnętrzny)

| Typ | Skala | Trasa | Zakres |
|---|---|---|---|
| Prywatna | Kawalerka | EU–EU | €800–2,000 |
| Prywatna | 2–3 pokoje | EU–EU | €2,000–5,000 |
| Prywatna | Dom | EU–EU | €4,000–12,000 |
| Prywatna | Dom | EU–Overseas | €8,000–25,000 |
| Firmowa | < 10 os. | EU–EU | €2,000–6,000 |
| Firmowa | 10–50 os. | EU–EU | €6,000–20,000 |
| Firmowa | 50+ os. | EU–EU | €15,000–50,000+ |
| Ekspat package | 1 osoba | EU–EU | €2,500–7,000 |

*Zakresy celowo szerokie — chodzi o jakościowy sygnał, nie precyzyjną ofertę.*

---

## UX / Design

**Umiejscowienie na stronie:** między Section 4 (Services) a Section 5 (EU Map) — lub jako sticky floating button "Szybka wycena" w prawym dolnym rogu.

**Wizualnie:**
- Dark navy tło (spójne z hero)
- Progress bar na górze (Krok 1/5)
- Duże klikalne kafelki (nie radio buttons) — mobile-first
- Animacja przejścia między krokami (slide)
- Wynik w złotym boxie (gold `#C9A84C`) — premium feel

**Mobile:** cały kalkulator w bottom sheet / modal — nie inline (za mało miejsca).

---

## Dane które zbieramy (CRM/CDO)

Każde przejście przez kalkulator → event do GA4 + zapis w CRM:
- Typ przeprowadzki
- Skala
- Trasa (origin country → destination country)
- Termin
- Czy zostawił kontakt (tak/nie)
- Czas spędzony w kalkulatorze

**Wartość dla CMO:** które trasy są najpopularniejsze → priorytet w content hubie (Section 7).
**Wartość dla CRO:** conversion rate po kroku 5 → A/B test copy na CTA.

---

## Tech Stack

```typescript
// Next.js component, bez backendu
// State: React useState / Zustand
// Submit: POST /api/quote-request → email (Resend) + CRM (HubSpot/Pipedrive)
// Analytics: GA4 custom events
// Schema: nie (kalkulator dynamiczny, nie indeksowany)
```

Formularz kontaktowy w kroku 5 → webhook do CRM + email do działu handlowego Arkpol.

---

## Atomic Tasks (implementacja)

1. Komponent `QuoteCalculator` — 5-step wizard (React, ~4h)
2. Algorytm szacowania — prosta lookup table w JSON (~1h)
3. Animacje przejść między krokami — Framer Motion (~2h)
4. Formularz kontaktowy + walidacja (~1h)
5. POST /api/quote-request → Resend email (~2h)
6. GA4 event tracking (~1h)
7. Mobile bottom sheet wrapper (~2h)
8. A/B test setup (wariant A: cena przed formularzem, wariant B: formularz bez ceny) (~1h)

**Łącznie: ~14h implementacji**

---

## Dlaczego to ważne dla Meta Ads

Kalkulator = **lead magnet z wartością natychmiastową**.

Kiedy puszczasz reklamę na Facebooku/Instagramie targetując millenialsów (25–40, właściciele firm, managerowie HR, expaci):
- Reklama: "Ile kosztuje przeprowadzka firmy z PL do DE? Sprawdź w 2 minuty →"
- Klik → kalkulator → szacunek → formularz

To **landing page + lead gen w jednym**, mierzalny ROAS, niski CPL vs. generic "skontaktuj się z nami."

**Docelowe CPL dla millenialsów B2B (EU):** €15–40 za kwalifikowany lead (z szacunkiem trasy i firmy).
