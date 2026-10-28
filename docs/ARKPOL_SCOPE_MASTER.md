# ARKPOL OS — SCOPE MASTER

**Data:** 2026-08-19 · **Status:** do akceptacji zarządu (fazami) · **To jest JEDEN kanoniczny spis całego zakresu.**
Szczegóły techniczne żyją w: `ARKPOL_ARCHITECTURE.md` (jak to jest zbudowane), `WDROZENIE_STEP_BY_STEP.md` (instrukcje wykonania), `INTEGRACJA_SURVEY_STACK.md` (spięcie survey). Ten dokument mówi: **jaki problem rozwiązujemy, czym, co z tego mamy, ile to kosztuje — i z jakich atomowych kroków składa się każde działanie.**

---

## Jak czytać ten dokument

**Dla zarządu (wystarczy 10 minut):** przy każdej fazie czytaj ramkę **Problem → Rozwiązanie → Zyski → Koszty** i wiersz „Po czym poznamy, że działa". Akceptacja = podpis pod fazą, nie pod tabelką.
**Dla wykonawców:** każda faza ma pod spodem tabelę zadań atomowych. Jedno zadanie = jedna czynność, jeden wynik, jeden test. Nic nie jest robione, jeśli nie ma numeru w tym dokumencie.

**Jak liczymy koszty (w każdej fazie te same trzy pozycje):**
- 💰 **Finansowy** — abonamenty, licencje, opłaty za narzędzia zewnętrzne. Kwoty z publicznych cenników; gdzie cennika nie ma, piszemy „do potwierdzenia" i nie zgadujemy.
- 👤 **Ludzki** — czyj czas i ile go schodzi: jednorazowo na wdrożenie i stale w codziennej pracy. Zasada IQ 80: załogi w terenie NICZEGO nie wypełniają i niczego się nie uczą — pomiary robi maszyna, walidacja w biurze, system sam wyłapuje błędy.
- 🤖 **AI/PBS** — wszędzie tam, gdzie pracę wykonuje struktura PBS (budowa, integracje, agenci, nadzór), koszt AI jest **zależny od wyceny obsługi systemu przez PBS** — rozliczany zbiorczo za obsługę systemu, nie doliczany osobno do każdego zadania. W tabelach zadań wykonawca „Agent" = ta pozycja.

**Oznaczenia:** ✅ zrobione · ⬜ do zrobienia · 🔑 czeka na klucz/decyzję Norberta · 🔒 zablokowane przez inne zadanie
**Wykonawcy:** **Agent** = struktura PBS (robi sama; koszt = 🤖) · **Norbert** = tylko rzeczy wymagające właściciela (konta, karty, hasła, decyzje o kosztach) · **Biuro/MM** = ludzie Arkpolu w codziennej pracy

---

## Mapa całości (kolejność i zależności)

| Faza | Nazwa | Odblokowuje ją | Stan |
|---|---|---|---|
| 0 | Fundament: Brain + nadzór | — | ✅ ZROBIONE |
| 1 | Leady i standardowa ścieżka | konto Calendly 🔑 | ⬜ |
| 2 | Poczta: Gmail + Mail Brain | Google Workspace 🔑 | ⬜ |
| 3 | Tracking: Verizon + SCAM ALERT | klucz API Verizon 🔑 | ⬜ |
| 4 | Finanse: PO → faktura → windykacja → marża | klucze Revolut + EnableBanking 🔑 | ⬜ |
| 5 | WhatsApp załóg i klientów | konto Entee.ai 🔑 | ⬜ |
| 6 | Survey stack: Yembo ↔ Move4U | odpowiedzi vendorów + decyzja kontraktowa 🔑 | ⬜ (w toku) |
| 7 | Google Drive + dokumenty | Google Workspace (faza 2) | 🔒 |
| 8 | Ludzie i rytm zespołu | fazy 1–7 częściowo | 🔒 |
| K | Kontrola komunikacji i śladu ustaleń | dane VoIP od Norberta 🔑 (pełna moc po fazach 2+4) | ⬜ |
| D | Arkpol Domestic: aplikacja zamówień (bus + tragarze, pakiety, skan, kalendarz z DISPO, partnerzy) | słowo Norberta „start" (D1.1) 🔑 | ⬜ scope 2026-10-28 |
| R | Sidequest: RedKey (rynek lokalny) | — | ⛔ zastąpiony fazą D |

Fazy 1–6 są od siebie NIEZALEŻNE — każdy klucz odblokowuje swoją fazę osobno, żadna nie czeka na inną.

---

## FAZA 0 — Fundament ✅ ZROBIONE

> **Problem:** firma nie miała jednego miejsca, w którym widać wszystko naraz — ludzi, zadania, leady, integracje. Wiedza operacyjna żyła w głowach, mailach i arkuszach; awarii nikt by nie zauważył, dopóki ktoś nie zadzwoni.
> **Rozwiązanie:** Arkpol Brain — centrum dowodzenia w internecie, za hasłem (mapa ludzi i agentów, zadania, leady, ustawienia integracji) + „strażnik" PBS, który co 15 minut sprawdza zdrowie systemu i złamane terminy, a problemy zgłasza na Telegram.
> **Zyski:** jeden ekran prawdy o firmie; awaria wykryta w kwadrans zamiast po tygodniu; fundament, na którym stoją wszystkie następne fazy.
> **Koszty:** 💰 hosting serwera ~5 USD/mies. (Railway). 👤 zero — biuro nic nie musiało robić. 🤖 budowa i nadzór = struktura PBS, koszt zależny od wyceny obsługi systemu przez PBS.
> **Po czym poznamy, że działa:** wchodzisz na https://arkpol-production.up.railway.app/brain, logujesz się hasłem — widzisz firmę. Wyłączenie systemu = alarm w ciągu 15 minut.

| ID | Zadanie atomowe | Wykonawca | Wynik | Test akceptacji | Stan |
|---|---|---|---|---|---|
| A0.1 | Zbudować panel Brain (mapa, zadania, leady, intel, logowanie) | Agent | działający panel /brain | klik po wszystkich zakładkach bez błędu | ✅ |
| A0.2 | Wpisać realną strukturę firmy (13 ludzi + 8 agentów) | Agent | seed bazy zgodny z blueprintem | mapa pokazuje właściwe osoby i role | ✅ |
| A0.3 | Wdrożyć Brain na serwer (Railway) z trwałą bazą i hasłem produkcyjnym | Agent | https://arkpol-production.up.railway.app | logowanie działa; bez hasła 401 | ✅ |
| A0.4 | Zbudować /brain/settings: pola na klucze 9 integracji + statusy + URL-e webhooków do skopiowania | Agent | strona Ustawienia | zapis klucza → status „Klucz zapisany"; sekret widoczny tylko jako końcówka | ✅ |
| A0.5 | Uzbroić strażnika (health + SLA + eskalacje, co 15 min) | Agent | com.pbs.arkpol-watch (launchd) | pierwszy przebieg czysty; padnięcie Brain = alert TG | ✅ |
| A0.6 | Zarejestrować hasło i klucz webhooków w rejestrze odnowień (Rule 46) | Agent | 2 wpisy w auth-renewals.json | wpisy mają instrukcje rotacji krok-po-kroku | ✅ |
| A0.7 | Zaprojektować plan spięcia survey stacku | Agent | `INTEGRACJA_SURVEY_STACK.md` | plan zawiera przepływ, webhooki i punkty ludzkie | ✅ |
| A0.8 | Wysłać zapytania demo do Yembo i Move4U (pytania z due diligence) | Agent | 2 maile + log w `VENDOR_OUTREACH_LOG.md` | maile w Wysłanych; follow-up po 5 dniach roboczych | ✅ |
| A0.9 | Strażnik v2 — cisza webhooków: dla każdej PODPIĘTEJ integracji brak zdarzeń przez [24 h] = alert (webhook padł/klucz wygasł); + alert na crash deployu Railway | Agent | reguły w arkpol_watch | odpięcie webhooka testowego odpala alert <24 h | ⬜ (uzbrajane wraz z podpinaniem integracji) |

---

## FAZA 1 — Leady i standardowa ścieżka

> **Problem:** lead potrafi utknąć albo zginąć — oddzwonienie, oferta i follow-upy zależą od czyjejś pamięci. Nie wiadomo, ile leadów przepada i na którym etapie.
> **Rozwiązanie:** jeden lejek dla wszystkich kanałów (strona, telefon, polecenie, partnerzy) + Calendly jako jedyna brama do wideo-rozmowy + automatyczne zegary terminów: oddzwonienie ≤5 min, oferta w 6h / do 10:00, ważność 72h, przypomnienia D+1/D+2/D+3.
> **Zyski:** zero zgubionych leadów; szybsza oferta = wyższa wygrywalność (cel: SLA ofert ≥95%, akceptacje w 72h ≥60%); po raz pierwszy widać cały lejek w liczbach.
> **Koszty:** 💰 Calendly ~10–12 USD/stanowisko/mies. (plan Standard; do potwierdzenia przy zakładaniu — być może wystarczy 1 stanowisko firmowe). 👤 jednorazowo: Norbert ~35 min; stale: move managerowie pracują JAK DOTĄD, tylko dostają gotowe zadania zamiast pilnować terminów w głowie. 🤖 automaty i pilnowanie SLA = struktura PBS, koszt wg wyceny obsługi PBS.
> **Po czym poznamy, że działa:** testowa rezerwacja w Calendly sama pojawia się w Brain i sama tworzy zadanie „Rozmowa po Calendly" dla move managera.

| ID | Zadanie atomowe | Wykonawca | Wejście | Wynik | Test akceptacji | Stan |
|---|---|---|---|---|---|---|
| A1.1 | Założyć/wskazać firmowe konto Calendly; typ spotkania „Video survey 15–20 min" (pola obowiązkowe: adresy, piętra, winda, m², gabaryty, telefon; bufory 15 min; przypomnienia T-24h/T-2h) | **Norbert (30 min)** 🔑 | karta/konto | link do rezerwacji | testowa rezerwacja przychodzi mailem | ⬜ |
| A1.2 | Wkleić URL webhooka (z /brain/settings, przycisk Kopiuj) w Calendly → Integrations → Webhooks | **Norbert (5 min)** | A1.1 | aktywny webhook | rezerwacja → lead w Brain na etapie „Calendly" | 🔒 A1.1 |
| A1.3 | Zweryfikować mapowanie pól realnego payloadu Calendly na leada (adresy/telefon/notatki) | Agent | A1.2 | poprawione mapowanie w hooku | pola z formularza widoczne na leadzie | 🔒 A1.2 |
| A1.4 | Włączyć zegary SLA: oddzwonienie ≤5 min, oferta 6h / do 10:00, ważność 72h, follow-upy D+1/D+2/D+3 jako auto-taski Ownera | Agent | A1.3 | auto-taski z terminami | sztuczny lead generuje komplet tasków o właściwych porach | 🔒 A1.3 |
| A1.5 | Ręczny formularz „dodaj leada z telefonu" dla sekretarki/MM (1 ekran, zero pól obowiązkowych poza kontaktem) | Agent | — | formularz w /brain/leads | sekretarka dodaje leada w <30 s | ⬜ |
| A1.6 | Alarm strażnika: lead bez Ownera >48h → Telegram | Agent | A1.4 | reguła w arkpol_watch | sztuczny zaległy lead odpala alert | 🔒 A1.4 |
| A1.7 | Scheduler Brain (wewnętrzny cron na serwerze): silnik, który ODPALA zegary SLA, follow-upy D+1/2/3, przypomnienia PO/faktura, raporty tygodniowe/miesięczne — wspólna infrastruktura dla faz 1/4/8/K | Agent | — | działający scheduler + rejestr przebiegów | testowy zegar odpala się o zadanej godzinie; przebieg widoczny w rejestrze | ⬜ |

---

## FAZA 2 — Poczta: Gmail + Mail Brain

> **Problem:** poczta na home.pl bez API = AI nie może pomagać przy mailach; odpowiedzi na powtarzalne maile (potwierdzenia, brakujące dokumenty, FAQ) zjadają godziny biura dziennie; wiedza o wątkach z partnerami żyje w skrzynkach poszczególnych osób.
> **Rozwiązanie:** migracja skrzynek na Google Workspace oficjalną ścieżką (Outlook zostaje jako klient — zero przeuczania), potem Mail Brain: AI czyta przychodzące i przygotowuje SZKICE odpowiedzi, człowiek zatwierdza jednym kliknięciem. Auto-wysyłka tylko dla wąskiej, zatwierdzonej listy (potwierdzenia, przypomnienia, FAQ). Oferty, ceny, reklamacje — ZAWSZE człowiek.
> **Zyski:** szacunkowo 1–2 h dziennie mniej klepania powtarzalnych odpowiedzi na osobę w biurze; żaden mail od partnera nie wisi >24h bez reakcji; pełny ślad decyzji AI (kto zatwierdził, co i kiedy) — element dowodowy pod FIDI/FAIM.
> **Koszty:** 💰 Google Workspace Business Standard ~12–14 USD/użytkownik/mies. (liczba użytkowników = liczba skrzynek osobowych, ustalimy w A2.1); home.pl odchodzi z kosztów po migracji. 👤 jednorazowo: Norbert 1–2 h (założenie + DNS), sekretarka ~1 h (mapa skrzynek), reszta migracji po stronie agenta; stale: biuro pracuje jak dotąd (Outlook zostaje), dochodzi tylko klik „zatwierdź szkic". 🤖 migracja, klasyfikacja maili, szkice, audit trail = struktura PBS, koszt wg wyceny obsługi PBS.
> **Po czym poznamy, że działa:** mail testowy od „partnera" dostaje gotowy szkic odpowiedzi w mniej niż minutę — i czeka na kliknięcie.

| ID | Zadanie atomowe | Wykonawca | Wejście | Wynik | Test akceptacji | Stan |
|---|---|---|---|---|---|---|
| A2.1 | Spisać mapę poczty: wszystkie skrzynki @arkpol.com, kto używa, jakie typy maili | Norbert + sekretarka (1 h) | — | lista skrzynek | lista kompletna wg biura | ⬜ |
| A2.2 | Założyć Google Workspace (Business Standard) na domenę arkpol.com | **Norbert (1–2 h + karta)** 🔑 | dostęp do DNS | konsola admin | logowanie do admin.google.com działa | ⬜ |
| A2.3 | Migracja TESTOWEJ skrzynki z home.pl (oficjalne narzędzie IMAP Google) | Agent wg instrukcji | A2.1+A2.2 | 1 skrzynka w Gmailu | stare maile widoczne w Gmailu | 🔒 A2.2 |
| A2.4 | Migracja pozostałych skrzynek + przełączenie MX na Google | Agent + Norbert (DNS) | A2.3 OK | cała poczta na Google | nowy mail na @arkpol.com ląduje w Gmailu | 🔒 A2.3 |
| A2.5 | Podpiąć Outlooki chętnych do Gmaila | Biuro wg 1-stronowej instrukcji od Agenta | A2.4 | Outlook działa po staremu | użytkownik nie widzi różnicy | 🔒 A2.4 |
| A2.6 | Podpiąć Gmail API (push) do Brain; klasyfikacja maili (RFQ/pricing/operacje) | Agent | A2.4 | strumień maili w Brain | nowy mail widoczny w Brain <1 min | 🔒 A2.4 |
| A2.7 | Mail Brain poziom L1: AI robi szkice, człowiek zatwierdza; zawsze pyta o CBM przed wyceną; partnerzy wymagają PO | Agent | A2.6 | szkice w skrzynce | mail testowy → szkic <1 min; nic nie wychodzi bez kliknięcia | 🔒 A2.6 |
| A2.8 | Audit trail każdej decyzji AI (klasyfikacja, model, akcja, kto zatwierdził, kiedy) | Agent | A2.7 | rejestr zdarzeń | każdy szkic ma wpis w rejestrze | 🔒 A2.7 |
| A2.9 | Auto-wysyłka (L3) TYLKO dla: potwierdzeń dokumentów, próśb o brakujący dokument, przypomnień, FAQ — po akceptacji listy przez Norberta | Agent + **Norbert (decyzja)** | A2.7 stabilne 2 tyg. | lista L3 + włącznik | żaden mail spoza listy nie wyszedł sam | 🔒 A2.7 |
| A2.10 | Biblioteka szablonów ODPOWIEDZI mailowych dla Mail Brain: typ maila → szablon (oferta wg SZABLONY nr 1, follow-up ustaleń nr 10, potwierdzenia, brakujący dokument, FAQ, partnerskie EN nr 9) — jedna wersja prawdy w SZABLONY_PAKIET.md, Mail Brain używa TYLKO ich | Agent | SZABLONY_PAKIET ✅ | mapa typ→szablon w Brain | szkic odpowiedzi na mail testowy = treść z właściwego szablonu | 🔒 A2.7 |

---

## FAZA 3 — Tracking: Verizon = zegar zleceń + SCAM ALERT

> **Problem:** nikt nie wie dokładnie, ile godzin naprawdę trwa zlecenie (a bez tego nie ma prawdziwej marży w fazie 4), a lewe trasy i postoje — dom pracownika, Lidl, kebab — to cichy przeciek paliwa i czasu, wykrywany przypadkiem albo wcale. Raportowanie przez załogi nie działa i działać nie będzie (zasada IQ 80).
> **Rozwiązanie:** GPS Verizon (już opłacany!) staje się jedynym zegarem zleceń: wyjazd z magazynu = start, przyjazd = ekipa na miejscu, powrót = dzień zamknięty. Reguły SCAM ALERT wykrywają nieautoryzowane objazdy, podejrzane postoje, zły kierunek i 2× czas przejazdu — natychmiastowe powiadomienie MM + COO + dispo.
> **Zyski:** koniec przecieku paliwa/czasu (każdy objazd widoczny w minuty); dokładne godziny pracy per zlecenie i załoga — fundament liczenia marży; załogi NIC nie raportują, więc nie ma czego sabotować ani zapominać.
> **Koszty:** 💰 zero nowych abonamentów — Verizon już jest w kosztach; dostęp API zwykle w cenie (do potwierdzenia w panelu/u supportu). 👤 jednorazowo: Norbert 30 min na klucz; stale: zero — załogi jeżdżą jak jeździły. 🤖 integracja, reguły alertów i utrzymanie = struktura PBS, koszt wg wyceny obsługi PBS.
> **Po czym poznamy, że działa:** przejazd testowego auta sam zmienia status zlecenia w Brain; celowy objazd odpala alarm.

| ID | Zadanie atomowe | Wykonawca | Wejście | Wynik | Test akceptacji | Stan |
|---|---|---|---|---|---|---|
| A3.1 | Wygenerować klucz API w panelu Verizon Reveal (Admin → Integrations); jeśli opcji brak — zgłoszenie do supportu (treść pisze Agent) | **Norbert (30 min)** 🔑 | panel Reveal | klucz w /brain/settings | status „Klucz zapisany" | ⬜ |
| A3.2 | Klient Verizon w Brain: pojazdy, pozycje, geofence magazynów (WAW + FRA) | Agent | A3.1 | dane GPS w Brain | lista aut i pozycji na żywo | 🔒 A3.1 |
| A3.3 | Mapowanie zdarzeń GPS na statusy zleceń (wyjazd=start, przyjazd=na miejscu, odjazd=koniec, powrót=dzień zamknięty) | Agent | A3.2 | automat statusów | przejazd testowy zmienia statusy bez ręki człowieka | 🔒 A3.2 |
| A3.4 | SCAM ALERT: reguły (nieautoryzowany postój, zły kierunek, 2× czas, długi postój na biegu jałowym) + powiadomienie MM+COO+dispo | Agent | A3.3 | alerty | celowy objazd = alert w <5 min | 🔒 A3.3 |
| A3.5 | Timing per zlecenie i per załoga do warstwy intel (fundament pod marżę w fazie 4) | Agent | A3.3 | godziny pracy per job | raport godzin zgadza się z rzeczywistością dnia testowego | 🔒 A3.3 |

---

## FAZA 4 — Finanse: PO → faktura → windykacja → PRAWDZIWA MARŻA

> **Problem:** dwa problemy naraz. Pierwszy: dziury w płatnościach — brak PO, niewystawiona faktura, przeterminowana wpłata wychodzą na jaw za późno i windykacja zależy od czyjejś czujności. Drugi, większy: przy ~18 mln PLN obrotu firma zarabia ~5,7% (≈1 mln), bo NIKT nie zna prawdziwego kosztu zlecenia — przetargi bywają wygrywane na stratach.
> **Rozwiązanie:** automat pilnujący łańcucha po każdym zleceniu (brak PO → Owner co 2 dni; jest PO → faktura, brak po 24h → codziennie; termin → CFO; brak wpłaty → klient co 3 dni; 7+ dni → eskalacja do zarządu) + zszycie danych: godziny z GPS (faza 3) + koszty terenowe z Revolut + wpłaty z banków (EnableBanking) = **marża per zlecenie / partner / trasa**, raportowana zarządowi co miesiąc.
> **Zyski:** windykacja bez dziur (nic nie czeka na czyjąś pamięć); decyzje przetargowe na liczbach — ofertujemy tam, gdzie zarabiamy, przeceniamy/odpuszczamy tam, gdzie tracimy. To jest główna dźwignia celu „kilka milionów dochodu zamiast jednego".
> **Koszty:** 💰 Revolut API — w cenie konta firmowego; EnableBanking — rejestracja darmowa, produkcyjny dostęp wg ich cennika (do potwierdzenia przy rejestracji; przy naszej skali zwykle niewielki abonament). 👤 jednorazowo: Norbert ~1,5 h (dwa klucze); stale: CFO dostaje gotowe alerty zamiast pilnować terminów — pracy UBYWA. 🤖 workflow, matching wpłat, raporty marż = struktura PBS, koszt wg wyceny obsługi PBS.
> **Po czym poznamy, że działa:** sztuczne zlecenie bez PO samo generuje przypomnienia co 2 dni; wpłata testowa sama zamyka fakturę; na koniec miesiąca zarząd dostaje raport marż mailem.

| ID | Zadanie atomowe | Wykonawca | Wejście | Wynik | Test akceptacji | Stan |
|---|---|---|---|---|---|---|
| A4.1 | Workflow PO→faktura→płatność w Brain: brak PO → Owner co 2 dni; jest PO → prośba o fakturę, brak po 24h → codziennie; termin → CFO; brak wpłaty → klient co 3 dni; 7+ dni → eskalacja CFO+CEO+Vice CEO | Agent | zlecenia w Brain | automat przypomnień | sztuczne zlecenie przechodzi cały łańcuch we właściwych odstępach | ⬜ |
| A4.2 | Wygenerować klucz API Revolut Business (READ-ONLY) | **Norbert (30 min)** 🔑 | panel Revolut | klucz w /brain/settings | status „Klucz zapisany" | ⬜ |
| A4.3 | Stream transakcji Revolut do Brain (paliwo/hotele/myto załóg na żywo) | Agent | A4.2 | transakcje w Brain | transakcja testowa widoczna <5 min | 🔒 A4.2 |
| A4.4 | Zarejestrować aplikację EnableBanking (konto + klucz prywatny + Application ID do /brain/settings) | **Norbert (~1 h)** 🔑 | enablebanking.com | klucz + ID w settings | „test połączenia" w Ustawieniach zwraca nazwę aplikacji | ⬜ |
| A4.5 | Dopasowanie wpłat bankowych do faktur/zleceń (klient EnableBanking już gotowy i przetestowany kryptograficznie) | Agent | A4.4 | auto-matching | wpłata testowa zamyka fakturę bez ręki człowieka | 🔒 A4.4 |
| A4.6 | Miesięczny raport: przychód/zlecenie, przychód/załoga, koszty, **marża per job/partner/trasa**, wkład partnerów — mailem do zarządu | Agent | A3.5+A4.3 | raport PDF/mail | raport za miesiąc testowy zgadza się z księgowością co do kierunku | 🔒 A3.5, A4.3 |
| A4.7 | Alarm strażnika: faktura po terminie bez wpisu eskalacji → Telegram | Agent | A4.1 | reguła w watch | sztuczna zaległość odpala alert | 🔒 A4.1 |

---

## FAZA 5 — WhatsApp załóg i klientów (Entee.ai)

> **Problem:** zdjęcia, szkody i paragony od załóg giną w prywatnych czatach; nie da się ich potem znaleźć przy reklamacji. Klienci piszący na WhatsApp nie trafiają do lejka. Każda próba dania załogom „aplikacji do raportowania" skończy się porażką (zasada IQ 80 — QR-kody już odrzucono).
> **Rozwiązanie:** firmowy numer WhatsApp podpięty przez Entee.ai do Brain: wszystko od załóg wpada samo do właściwego zlecenia, wiadomości klientów stają się leadami w lejku z fazy 1, odpowiedzi biura wracają na telefon. Załogi używają tego, czego używają dziś — WhatsAppa.
> **Zyski:** komplet dokumentacji zdjęciowej przy zleceniu (dowód przy szkodach i pod FIDI/FAIM); nowy kanał leadów bez dodatkowej pracy; zero szkoleń w terenie.
> **Koszty:** 💰 abonament Entee.ai — do potwierdzenia przy zakładaniu konta + opłaty Meta za konwersacje WhatsApp Business (grosze/konwersacja, zależne od wolumenu). 👤 jednorazowo: Norbert 30 min; stale: zero dla załóg (nic się dla nich nie zmienia), biuro odpowiada z jednego miejsca zamiast z pięciu telefonów. 🤖 integracja i routing wiadomości = struktura PBS, koszt wg wyceny obsługi PBS.
> **Po czym poznamy, że działa:** zdjęcie wysłane na firmowy numer pojawia się przy zleceniu w Brain.

| ID | Zadanie atomowe | Wykonawca | Wejście | Wynik | Test akceptacji | Stan |
|---|---|---|---|---|---|---|
| A5.1 | Założyć konto Entee.ai + podpiąć firmowy numer WhatsApp + klucz API do /brain/settings | **Norbert (30 min)** 🔑 | numer firmowy | klucz w settings | status „Klucz zapisany" | ⬜ |
| A5.2 | Zweryfikować mapowanie realnego payloadu Entee na hook (hook i klient wysyłki już istnieją, pisane defensywnie) | Agent | A5.1 | adapter potwierdzony | zdjęcie na numer → widoczne przy zleceniu | 🔒 A5.1 |
| A5.3 | Wysyłka z Brain na WhatsApp (odpowiedzi biura wracają na telefon załogi/klienta) | Agent | A5.2 | działający kanał zwrotny | odpowiedź z Brain dochodzi na telefon | 🔒 A5.2 |
| A5.4 | Zapytania klientów z WhatsApp = nowe leady (źródło „whatsapp") w lejku z fazy 1 | Agent | A5.2 | auto-leady | wiadomość testowa tworzy leada | 🔒 A5.2 |
| A5.5 | Follow-upy D+1/D+2 na WhatsApp — dopiero po akceptacji szablonów treści przez Norberta | Agent + **Norbert (akceptacja szablonów)** | A5.3 | auto-follow-upy | follow-up wychodzi tylko z zatwierdzonym szablonem | 🔒 A5.3 |

---

## FAZA 6 — Survey stack: Yembo ↔ Move4U ↔ Brain

> **Problem:** kubatura jest dziś szacowana ręcznie — niedoszacowanie to bezpośrednia strata na zleceniu, przeszacowanie to przegrany klient. Dokumentacja wykonawcza (spisy, protokoły, zdjęcia) jest nierówna — a to ona jest dowodem przy szkodach i warunkiem akredytacji FIDI/FAIM, na której stoi plan ekspansji.
> **Rozwiązanie:** AI liczy kubaturę z nagrania (Yembo — jedyny vendor z prawdziwym rozpoznawaniem obrazu, używany przez Gosselin/Atlas), oferta powstaje na realnych danych w Brain, a po wygranej dokumentacja jedzie przez Move4U (SurveyPro/CrewPro/Claims) — narzędzie „rodzime" dla dwóch naszych zleceniodawców (Crown = oficjalne partnerstwo, Voerman = twórca Move4U). Aplikację w terenie ma WYŁĄCZNIE team leader. Kontrola krzyżowa: różnica oferta-vs-załadunek >15% = automatyczny alert.
> **Zyski:** wyceny bez niedoszacowań (przeciek marży zatkany u źródła); szybsza oferta (AI liczy w minuty, nie MM w godziny); dokumentacja w formacie, któremu ufają Crown/Voerman = argument handlowy; komplet dowodów pod FAIM.
> **Koszty:** 💰 Yembo: sygnały rynkowe ~5–15 USD/survey [NIEPOTWIERDZONE — dokładna cena na demo; przy 100–150 surveys/mies. to rząd 0,5–2 tys. USD/mies.]; Move4U: cennik niepublikowany [na demo]; opcja Voxme: 300 USD/rok + 3 USD/zlecenie (cennik publiczny) + ew. drukarka Zebra ~960 USD jednorazowo. Decyzja kontraktowa = osobna ratyfikacja Norberta po demach (A6.5) — nic nie kupujemy przed nią. 👤 jednorazowo: Norbert 2× 45 min na demach + pilot z udziałem MM; stale: MM przegląda inwentarz AI przed ofertą (~5 min/zlecenie zamiast ręcznego liczenia), team leader klika protokoły w CrewPro (duże przyciski, zero pisania). 🤖 adaptery, automaty i kontrole = struktura PBS, koszt wg wyceny obsługi PBS.
> **Po czym poznamy, że działa:** pilot na ~5 mieszkaniach — CBM policzony przez AI vs faktycznie załadowany różni się o mniej niż 15%.

| ID | Zadanie atomowe | Wykonawca | Wejście | Wynik | Test akceptacji | Stan |
|---|---|---|---|---|---|---|
| A6.1 | Plan spięcia + hooki yembo/move4u w Brain + pola survey w bazie + maile demo | Agent | — | patrz FAZA 0 (A0.7, A0.8) | — | ✅ |
| A6.2 | Demo z Yembo: uzyskać odpowiedzi na 8 pytań DD (API + nasz numer zlecenia! CBM, języki, ceny, RODO) | Agent umawia, **Norbert na demo** | odpowiedź vendora | notatka decyzyjna | wszystkie 8 pytań ma odpowiedź TAK/NIE/kwota | 🔄 AE Tom Killian chce call; poproszono o sloty + pisemne odpowiedzi (2026-08-20) |
| A6.3 | Demo z Move4U: 7 pytań DD (API dla własnego systemu, znaczenie partnerstwa z Crown, koszt integracji Yembo, etykiety) | Agent umawia, **Norbert na demo** | odpowiedź vendora | notatka decyzyjna | j.w. | 🔄 CEO Joggie Taute odpowiedział na 6/7 (2026-08-18): **mamy już 2×CrewPro+1×SurveyPro!**, etykiety ✅, tech-fee unlimited możliwy, ISO 27001; API POMINIĘTE — dopytano |
| A6.4 | Debata org PBS nad notatkami → JEDNA rekomendacja kontraktowa (co kupujemy, za ile, w jakiej kolejności) | Agent (org) | A6.2+A6.3 | rekomendacja | rekomendacja zawiera koszty i plan wyjścia | 🔒 A6.2, A6.3 |
| A6.5 | **Decyzja kontraktowa** (koszt = zawsze Norbert) | **Norbert** 🔑 | A6.4 | podpisana decyzja | — | 🔒 A6.4 |
| A6.6 | Pilot-benchmark: te same ~5 mieszkań przez Yembo self-survey vs obecny survey ręczny; porównanie z faktycznym załadunkiem | Agent + MM | A6.5 (lub trial) | tabela CBM | mediana różnicy <15% | 🔒 A6.5 |
| A6.7 | Adapter realnego payloadu Yembo na nasz hook (webhook „survey completed" → CBM+inwentarz na leadzie) | Agent | A6.5 + klucz API | działające spięcie | prawdziwy survey ląduje na leadzie i tworzy task „Oferta SLA 6h" | 🔒 A6.5 |
| A6.8 | Automat: rezerwacja Calendly → link Yembo do klienta (szablon SMS/mail z `SZABLONY_PAKIET.md`) | Agent | A6.7 + faza 1 | auto-wysyłka linku | klient testowy dostaje link po rezerwacji | 🔒 A6.7, A1.4 |
| A6.9 | Move4U: auto-założenie joba po wygranej ofercie + odbiór protokołów/szkód do zlecenia (i do Drive po fazie 7) | Agent | A6.5 + klucz API | dokumenty wracają same | protokół testowy widoczny przy zleceniu | 🔒 A6.5 |
| A6.10 | Kontrola krzyżowa CBM: |oferta − załadunek| >15% → task „wyjaśnij różnicę" dla MM | Agent | A6.7 | automat kontrolny | sztuczna rozbieżność tworzy task | 🔒 A6.7 |
| A6.11 | (Opcja) Voxme etykiety Zebra — TYLKO jeśli demo pokaże przewagę w dniu pakowania; wyłącznie w rękach team leadera | Agent + **Norbert (decyzja)** | A6.4 | decyzja TAK/NIE | — | 🔒 A6.4 |

---

## FAZA 7 — Google Drive + dokumenty

> **Problem:** pliki zleceń (oferty, PO, CMR, protokoły, zdjęcia, zgody) są rozproszone; przy reklamacji albo audycie szukanie kompletu trwa godzinami — a FAIM od 2022 wymaga, żeby akta przeprowadzki dało się pokazać CYFROWO.
> **Rozwiązanie:** jedna struktura na Drive (`ZLECENIA/{rok}/{nr}`, `PARTNERZY`, `WZORY`), dokumenty z faz 5–6 archiwizują się same we właściwych folderach, a Mail Brain przy odpowiadaniu sięga po cenniki i procedury z plików — źródłem prawdy są dokumenty, nigdy pamięć modelu.
> **Zyski:** komplet akt każdego zlecenia w jednym miejscu w sekundy (reklamacje, audyty, FAIM); AI odpowiada na podstawie NASZYCH cenników i ustaleń, nie zgadywania.
> **Koszty:** 💰 zero nowych — Drive jest w cenie Workspace z fazy 2. 👤 jednorazowo: sekretarka ~1 h klikania struktury wg projektu; stale: MNIEJ pracy — pliki układają się same. 🤖 projekt struktury, auto-archiwizacja i wyszukiwanie = struktura PBS, koszt wg wyceny obsługi PBS.
> **Po czym poznamy, że działa:** pytanie „jaki cennik dla Crown?" zwraca właściwy plik.

| ID | Zadanie atomowe | Wykonawca | Wejście | Wynik | Test akceptacji | Stan |
|---|---|---|---|---|---|---|
| A7.1 | Zaprojektować strukturę: `_arkpol/ZLECENIA/{rok}/{nr}`, `PARTNERZY/{Sirva,Voerman,Crown,Gosselin}`, `WZORY` | Agent projektuje, sekretarka klika | faza 2 (Workspace) | struktura na Drive | foldery istnieją wg schematu | 🔒 A2.2 |
| A7.2 | Przenieść wzory z `SZABLONY_PAKIET.md` do `WZORY` (oferta 72h, zgoda social −10%, protokoły, legenda kolorów) | Agent + sekretarka | A7.1 | komplet wzorów | każdy wzór otwiera się i jest aktualny | 🔒 A7.1 |
| A7.3 | Drive API → Brain/Mail Brain (AI czyta cenniki/procedury przy szkicach odpowiedzi) | Agent | A7.1 + A2.7 | wyszukiwanie plików | „cennik dla Crown?" zwraca właściwy plik | 🔒 A7.1, A2.7 |
| A7.4 | Auto-archiwizacja dokumentów zlecenia (protokoły z Move4U, zdjęcia z WhatsApp) do folderu zlecenia | Agent | A7.1 + A5.2/A6.9 | auto-porządek | dokument testowy ląduje we właściwym folderze | 🔒 A7.1 |

---

## FAZA 8 — Ludzie i rytm zespołu

> **Problem:** nawet najlepszy system umrze, jeśli biuro go nie używa albo używa z przymusu; a bez KPI nikt nie wie, czy jest lepiej niż przed wdrożeniem. Rola Quality & Social jest nieobsadzona — jej obowiązki wiszą na COO.
> **Rozwiązanie:** wdrożenie ludzi bez szkoleń (30-minutowy pokaz + jedna strona instrukcji), cotygodniowa agenda generowana z systemu, dashboard KPI, prosty mail dla CEO po ludzku — oraz mechanizm „agent może to przejąć": każda praca człowieka powtórzona ≥2× trafia do kolejki automatyzacji, cel = co tydzień jedna rzecz przechodzi z ludzi na agentów (to systemowo łata też wakat Quality & Social).
> **Zyski:** system faktycznie używany, nie „wdrożony na papierze"; zarząd widzi trend tygodniowy w liczbach; biuro z każdym tygodniem ma odrobinę mniej roboty, nie więcej — czyli automatyzacja bez zatrudniania.
> **Koszty:** 💰 zero. 👤 jednorazowo: 30 min pokazu na osobę + tydzień przyzwyczajenia; Norbert/koordynator prowadzi pokaz. Stale: pracy ubywa (taki jest test tej fazy — patrz A8.4). 🤖 agendy, KPI, kolejka automatyzacji, mail dla CEO = struktura PBS, koszt wg wyceny obsługi PBS.
> **Po czym poznamy, że działa:** poniedziałkowe spotkanie zaczyna się od agendy wygenerowanej przez system, nie od „co tam było w zeszłym tygodniu?".

| ID | Zadanie atomowe | Wykonawca | Wejście | Wynik | Test akceptacji | Stan |
|---|---|---|---|---|---|---|
| A8.1 | Loginy dla biura (COO, 4 MM, dispo, CFO, HR, sekretarka) + 1-stronowa instrukcja + pokaz 30 min | Agent przygotowuje, Norbert/koordynator prowadzi | fazy 1+ | zespół zalogowany | każdy umie znaleźć swoje zadania | 🔒 faza 1 |
| A8.2 | Tygodniowa agenda z Brain (KPI, zaległe SLA, eskalacje, wins) — auto-mail przed spotkaniem | Agent | A8.1 | agenda co tydzień | agenda przychodzi w poniedziałek rano | 🔒 A8.1 |
| A8.3 | KPI na /brain/intel: SLA ofert ≥95%, akceptacje 72h ≥60%, no-show ≤10%, start-on-time ≥95%, szkody ≤2/100, ocena ≥4.7, obciążenie per MM, zniżka social 15–30% | Agent | dane z faz 1–6 | dashboard | liczby zgadzają się z ręcznym przeliczeniem próbki | 🔒 fazy 1–6 |
| A8.4 | Kolejka „agent może to przejąć": praca człowieka powtórzona ≥2× → propozycja automatyzacji; rytm: 1 rzecz/tydzień z półkuli LUDZIE na AGENCI | Agent | A8.3 | kolejka w intel | kolejka pokazuje ≥1 kandydata po 2 tyg. pracy | 🔒 A8.3 |
| A8.5 | Proste podsumowanie mailowe dla CEO (Aleksander) — po ludzku, bez klikania | Agent | A8.3 | cotygodniowy mail | CEO rozumie mail bez pytań | 🔒 A8.3 |

---

## FAZA K — Kontrola komunikacji i śladu ustaleń

> **Problem:** zespół deklaruje, że nie używa WhatsAppa do klientów — brak podstaw, by w to wierzyć, a zweryfikować się nie da. Ustalenia telefoniczne nie zostawiają śladu; część rozmów da się przenieść na prywatne telefony i żaden monitoring kanałów tego nie złapie. Skutek: przy fakturze „nagle" inna cena/zakres niż w ofercie i nie wiadomo, kto co komu obiecał.
> **Rozwiązanie:** NIE inwigilujemy prywatnych telefonów (i prawnie, i praktycznie ślepa uliczka). Kontrolujemy SKUTKI trzema mechanizmami: (1) **sync VoIP** — rejestr połączeń biurowych (kto, z kim, kiedy) podpięty do leadów/zleceń w Brain; (2) **żelazna zasada follow-upu**: po KAŻDYCH ustaleniach telefonicznych musi wyjść mail podsumowujący (szablon nr 10; po fazie 2 szkic robi AI, Owner tylko klika) — ustalenie bez maila nie istnieje; (3) **FLAGA dziury w śladzie**: rozjazd |oferta − faktura/oferta ostateczna| powyżej progu bez maila-śladu lub aktualizacji oferty w Brain = automatyczny alert do COO + Deputy CEO. Obejście prywatnym telefonem samo się wydaje — po skutkach w pieniądzach.
> **Zyski:** każde ustalenie ma ślad (dowód przy sporach, reklamacjach i pod FAIM); rozjazdy cena/zakres wykrywane automatycznie, nawet gdy ktoś ominął kanały firmowe; koniec „a klientowi obiecałem inaczej"; uczciwi nic nie odczują — flaga łapie wyłącznie braki śladu.
> **Koszty:** 💰 dostęp do API/rejestru połączeń VoIP — zwykle w abonamencie operatora (do potwierdzenia, gdy Norbert poda system). 👤 jednorazowo: Norbert 5 min (nazwa systemu VoIP + dostęp) + 1 komunikat do zespołu; stale: Owner wysyła 1 mail po każdej rozmowie (po fazie 2 = jedno kliknięcie „zatwierdź szkic"). 🤖 sync VoIP, pilnowanie follow-upów, flaga rozjazdu = struktura PBS, koszt wg wyceny obsługi PBS.
> **Po czym poznamy, że działa:** testowa rozmowa bez maila follow-up w 2 h robocze = task dla Ownera; sztuczna faktura różna od oferty o >10% bez śladu = alert do COO i Deputy CEO.

| ID | Zadanie atomowe | Wykonawca | Wejście | Wynik | Test akceptacji | Stan |
|---|---|---|---|---|---|---|
| K.1 | Podać, jaki system VoIP działa w biurze (operator/nazwa) + dostęp do panelu lub API | **Norbert (5 min)** 🔑 | — | dane w /brain/settings | pozycja VoIP ma status „Klucz zapisany" | ⬜ |
| K.2 | Pozycja „VoIP biurowy" w /brain/settings (klucz + operator/panel) | Agent | — | wpis w Ustawieniach | pole widoczne i zapisuje klucz | ⬜ |
| K.3 | Klient VoIP: rejestr połączeń (numer, kierunek, czas, długość — METADANE, bez nagrań) dopięty do leada/zlecenia po numerze telefonu | Agent | K.1+K.2 | zdarzenia „rozmowa" przy leadzie | testowe połączenie widoczne przy właściwym leadzie | 🔒 K.1 |
| K.4 | Automat follow-up: połączenie z klientem → oczekiwany mail podsumowania w ≤2 h roboczych; brak → task dla Ownera + wpis do rejestru braków śladu | Agent | K.3 + faza 2 (Gmail API) | automat pilnujący | rozmowa testowa bez maila tworzy task | 🔒 K.3, A2.6 |
| K.5 | Szablon „Mail follow-up ustaleń telefonicznych" (SZABLONY nr 10) + po fazie 2: auto-szkic L1 po zdarzeniu VoIP | Agent | szablon ✅ / szkice 🔒 A2.7 | szkic czeka w skrzynce po rozmowie | szkic powstaje <5 min po połączeniu | ⬜ szablon ✅ |
| K.6 | FLAGA dziury w śladzie: |oferta pierwotna − faktura/oferta ostateczna| > próg (start: 10%) bez maila-śladu lub aktualizacji oferty w Brain → alert COO + Deputy CEO | Agent | faza 4 (faktury w Brain) | automat kontrolny | sztuczny rozjazd bez śladu odpala alert; rozjazd Z udokumentowaną zmianą NIE odpala | 🔒 A4.1 |
| K.7 | Raport tygodniowy „ruch poza kanałem": lista flag K.6 + braków follow-upów per Owner → COO + Deputy CEO | Agent | K.4+K.6 | raport co tydzień | raport zawiera testowe naruszenia | 🔒 K.4, K.6 |
| K.8 | Ogłoszenie zasady zespołowi: „kanały firmowe only; po każdej rozmowie mail z ustaleniami; ustalenie bez maila nie istnieje" | **Norbert/COO (1 komunikat)** | K.4 działa | komunikat wysłany | zespół potwierdził na spotkaniu tygodniowym | 🔒 K.4 |

---

## FAZA D — Arkpol Domestic: aplikacja zamówień przeprowadzek (dawny RedKey) 🚚

**Rynek:** patrz `ARKPOL_DOMESTIC_RYNEK_PL_2026-10-28.md` — jedyny bezpośredni konkurent typu „Uber do przeprowadzek" to Lifty (Warszawa, bez pakowania/rozpakowania); reszta rynku sprzedaje godziny (bus + 2 tragarzy 132–345 zł/h netto, min. 2 h), nikt w Polsce nie sprzedaje pełnego pakietu ze stałą ceną.
**Decyzja Norberta 2026-10-28:** marka RedKey znika; cały rynek lokalny (przeprowadzki krajowe, B2C) idzie pod **Arkpol Domestic**. Wzór: aplikacje typu „taksówka bagażowa" (GROOT, Lalamove, Dolly) — klient zamawia z telefonu jak Ubera. **Przeniesienie kalkulatora RedKey na arkpol.com: NIE TERAZ** (Norbert, 28.10) — D1 rusza dopiero na jego słowo.

> **Problem:** klient prywatny, który chce się przeprowadzić w Polsce, musi dziś dzwonić, pisać i czekać na wycenę. Nie wie, ile zapłaci ani czy mamy wolny termin. My nie widzimy, ilu takich klientów odchodzi, a w pełnym sezonie odsyłamy ich z niczym — pieniądze zostają u konkurencji.
> **Rozwiązanie:** jedna aplikacja (najpierw w przeglądarce telefonu, później w App Store / Google Play) z dwiema drogami:
> 1. **STANDARD — „zamów od razu"**: adres skąd/dokąd, metraż, piętra, winda, zakres pomocy → cena od razu na ekranie → wybór wolnego dnia → zaliczka kartą/BLIK. Jak Uber: widzisz cenę, klikasz, gotowe.
> 2. **PREMIUM — „zeskanuj mieszkanie"**: klient nagrywa telefonem pokoje, AI liczy kubaturę i spis rzeczy, move manager zatwierdza wycenę, klient wybiera termin i płaci zaliczkę. W cenie: opiekun przeprowadzki, pakowanie, rozszerzone ubezpieczenie.
> Kalendarz pokazuje **tylko dni, w które naprawdę mamy ekipę i auto** — bot czyta DISPO i sam zamyka pełne dni. Jeśli wszystkie terminy są zajęte, klient widzi przycisk **„Ten termin mamy pełny — znajdziemy dla Ciebie sprawdzonego partnera"**: zgłoszenie idzie do naszej sieci zaufanych firm, a my bierzemy prowizję. Na dzień przeprowadzki klient widzi auto na mapie — z GPS Verizon, który już mamy (faza 3), więc kierowca niczego nie instaluje.
> **Zyski:** klient sam się obsługuje 24/7 — biuro dostaje gotowe, opłacone zlecenia zamiast telefonów; żaden klient nie odchodzi z pustymi rękami (pełny dzień = prowizja od partnera zamiast utraty); koniec podwójnych rezerwacji, bo kalendarz = DISPO; skan premium daje dokładną kubaturę, więc nie tracimy na niedoszacowaniu; zaliczka z góry = mniej odwołań.
> **Koszty:** 💰 płatności (Stripe: karta/BLIK/Przelewy24 — prowizja od transakcji, cennik publiczny); skan AI (Yembo — ta sama umowa co w fazie 6, cena za skan do potwierdzenia na demo); kalendarz (Calendly albo Cal.com — patrz D3.1, kwota do potwierdzenia); hosting ~5 USD/mies.; App Store 99 USD/rok + Google Play 25 USD jednorazowo (dopiero w D6). 👤 jednorazowo: Norbert ~2 h (konta, decyzje cenowe, zgoda na partnerów); stale: move manager zatwierdza wyceny premium (~5 min/zlecenie), dispo pracuje w DISPO JAK DOTĄD — kalendarz zamyka się sam. Ekipy w terenie nic nie instalują (zasada IQ 80). 🤖 budowa aplikacji, bot DISPO↔kalendarz, integracje i nadzór = struktura PBS, koszt wg wyceny obsługi PBS.
> **Po czym poznamy, że działa:** (1) testowy klient przechodzi STANDARD od adresu do zapłaconej zaliczki w < 3 min; (2) wpisanie zlecenia w DISPO na pełny dzień sprawia, że ten dzień znika z kalendarza w < 15 min; (3) przy pełnym kalendarzu przycisk partnera tworzy zgłoszenie u partnera i task dla MM.

**Ile to trwa (szacunek budowy przez PBS, bez czekania na klucze/decyzje):**

| Etap | Co działa | Czas |
|---|---|---|
| D1–D3 | STANDARD + kalendarz z DISPO + zaliczka — w przeglądarce telefonu | 2–3 tygodnie |
| D2 | PREMIUM ze skanem (po umowie z Yembo z fazy 6) | +1–2 tygodnie |
| D4 | przycisk partnera + sieć partnerów | +1 tydzień budowy; podpisanie partnerów = tempo Norberta |
| D5 | auto na mapie (Verizon) + powiadomienia SMS | +1 tydzień (po fazie 3) |
| D6 | natywne aplikacje iOS/Android | +4–6 tygodni + 1–3 tygodnie przeglądu Apple/Google |

Razem pełna wersja ≈ **2–3 miesiące**. Kolejność celowa: wersja w przeglądarce sprawdza popyt na prawdziwych zleceniach, zanim zapłacimy za sklepy z aplikacjami.

### D1 — Ścieżka STANDARD („zamów od razu")

| ID | Zadanie atomowe | Wykonawca | Wejście | Wynik | Test akceptacji | Stan |
|---|---|---|---|---|---|---|
| D1.1 | **Decyzja: start przeniesienia kalkulatora RedKey pod Arkpol Domestic** | **Norbert** 🔑 | 28.10 = „nie teraz" | słowo „start" | — | 🔑 |
| D1.2 | Przenieść silnik ceny RedKey (pricingConfig, odległość Photon/OSRM bez klucza) do aplikacji Arkpol; ceny 1:1 do czasu nowego cennika | Agent | D1.1 | moduł ceny | 10 przypadków testowych = te same kwoty co RedKey | 🔒 D1.1 |
| D1.3 | Cennik Arkpol Domestic (STANDARD) — zatwierdzenie stawek, minimum, dopłat za piętra/brak windy | **Norbert** 🔑 | propozycja Agenta z D1.2 | zatwierdzony cennik | — | 🔒 D1.2 |
| D1.4 | Ekran zamówienia mobile-first (390 px): adresy → metraż/piętra/winda → zakres → cena → termin → dane → płatność | Agent | D1.2 | ekran | klik-through na 390 px od startu do płatności testowej < 3 min | 🔒 D1.2 |
| D1.5 | Płatność zaliczki (Stripe: karta, BLIK, Przelewy24) + potwierdzenie mailem/SMS | Agent + **Norbert (konto Stripe Arkpolu)** 🔑 | D1.4 | zaliczka na koncie Arkpolu | płatność testowa (tryb testowy Stripe) zamienia lead w zlecenie | 🔒 D1.4 |
| D1.6 | Każde zamówienie = lead w Brain (ten sam lejek co faza 1) z numerem zlecenia od pierwszej sekundy | Agent | D1.5 + faza 1 | zlecenie w Brain | zamówienie testowe widoczne w Brain z JOB-ID | 🔒 D1.5 |
| D1.7 | Przekierowanie 301 redkeymoving → Arkpol Domestic; przeniesienie dotychczasowych leadów RedKey do Brain; dopiero potem wyłączenie serwisu RedKey | Agent | D1.6 | stary adres prowadzi do Arkpolu | stary URL → 301; liczba leadów w Brain = liczba w RedKey | 🔒 D1.6 |

### D2 — Ścieżka PREMIUM („zeskanuj mieszkanie")

| ID | Zadanie atomowe | Wykonawca | Wejście | Wynik | Test akceptacji | Stan |
|---|---|---|---|---|---|---|
| D2.1 | Rozszerzyć demo/umowę z fazy 6 (A6.2/A6.5) o skan robiony przez klienta prywatnego w aplikacji (link/SDK, język PL, cena za skan). **Research 28.10:** Yembo ma skan robiony przez klienta w przeglądarce telefonu, bez instalowania aplikacji (yembo.ai); publicznego API i cennika brak (strona trzecia podaje „od ~1 500 USD/mies." — NIEPOTWIERDZONE); język polski NIEPOTWIERDZONY. Skan LiDAR wbudowany w iPhone'a (RoomPlan) działa tylko na iPhone'ach Pro, na Androidzie odpowiednika brak — więc nie jako jedyna droga | Agent pyta, **Norbert decyduje** 🔑 | A6.2 | odpowiedź vendora + decyzja | znana cena za skan i sposób wpięcia | 🔒 A6.5 |
| D2.2 | Przycisk „Premium — zeskanuj mieszkanie" → link do skanu → wynik (kubatura + spis rzeczy) wraca na zlecenie w Brain | Agent | D2.1 | spięcie | skan testowy ląduje na zleceniu | 🔒 D2.1 |
| D2.3 | Wycena premium: AI proponuje cenę z kubatury, MM zatwierdza jednym kliknięciem; zegar SLA (np. 2 h w godzinach pracy) | Agent + MM | D2.2 | wycena u klienta | wycena testowa dociera do klienta w SLA | 🔒 D2.2 |
| D2.4 | Pakiety i dodatki — propozycja z researchu: **Standard** (przewóz + noszenie + demontaż/montaż), **Komfort** (+ pakowanie z materiałami), **Premium** (+ rozpakowanie, opiekun, rozszerzone ubezpieczenie); dodatki: montaż nowych mebli, wywóz, sprzątanie, magazyn Nowa Wieś, declutter, ciężkie przedmioty — co w cenie i ile kosztuje | **Norbert** 🔑 | propozycja Agenta | zatwierdzony pakiet | — | ⬜ |
| D2.5 | Plan B bez vendora: klient wysyła film/zdjęcia, MM liczy na wideo-rozmowie (dzisiejszy proces) — żeby PREMIUM działało zanim będzie umowa | Agent | — | ścieżka zapasowa | klient testowy przechodzi premium bez skanera | ⬜ |
| D2.6 | Kontrola krzyżowa: kubatura ze skanu vs faktyczny załadunek > 15% → task dla MM (wspólne z A6.10) | Agent | D2.2 + A6.10 | alert | sztuczna różnica tworzy task | 🔒 D2.2 |

### D3 — Kalendarz = prawdziwa dostępność (bot DISPO ↔ kalendarz)

| ID | Zadanie atomowe | Wykonawca | Wejście | Wynik | Test akceptacji | Stan |
|---|---|---|---|---|---|---|
| D3.1 | Wybór kalendarza. **Research 28.10:** w Calendly zewnętrzny system NIE może sam zmieniać godzin dostępności (support Calendly, 07.2025 — API tylko czyta), obejście = sztuczne „zajęte" wpisy w Kalendarzu Google; Cal.com API pozwala zapisywać grafik i wyjątki na dni (cal.com/docs, v2/schedules). **Rekomendacja:** kalendarz terminów przeprowadzek budujemy w aplikacji (serwer i tak zna pojemność z DISPO — zero opłat za stanowiska); Calendly zostaje tylko do wideo-rozmów z fazy 1. Decyzja = Norbert | Agent (org) → **Norbert** 🔑 | research API | decyzja | rekomendacja zawiera koszt i dowód z dokumentacji API | ⬜ |
| D3.2 | Dostęp bota do DISPO (eksport wartości / odczyt arkusza Google) — ta sama prośba co akcja 18 do biura finansowego | **Norbert** 🔑 + Agent | Google Workspace (faza 2) | odczyt DISPO | bot czyta dzień testowy poprawnie | 🔑 |
| D3.3 | Reguła pojemności dnia: ile ekip i aut jest danego dnia, ile już zajętych w DISPO, ile zostaje dla Domestic | Agent + **Norbert (zatwierdza regułę)** | D3.2 | wzór pojemności | wzór zgadza się z ręcznym liczeniem dispo na 5 dniach | 🔒 D3.2 |
| D3.4 | Bot DISPO → kalendarz: co 15 min zamyka pełne dni i otwiera zwolnione | Agent | D3.1 + D3.3 | działający bot | wpis w DISPO zamyka dzień w kalendarzu < 15 min | 🔒 D3.1, D3.3 |
| D3.5 | Rezerwacja w aplikacji → wpis-propozycja w DISPO do zatwierdzenia przez dispo (bot NIE nadpisuje DISPO sam) | Agent | D3.4 | propozycja w DISPO | rezerwacja testowa widoczna dla dispo jako „do zatwierdzenia" | 🔒 D3.4 |
| D3.6 | Strażnik: rozjazd kalendarz vs DISPO (podwójna rezerwacja) → alert dla dispo + MM | Agent | D3.5 | alert | sztuczna podwójna rezerwacja = alert | 🔒 D3.5 |

### D4 — „Mamy pełny termin" → sieć zaufanych partnerów

| ID | Zadanie atomowe | Wykonawca | Wejście | Wynik | Test akceptacji | Stan |
|---|---|---|---|---|---|---|
| D4.1 | Lista partnerów: kto, jakie miasta, jakie dokumenty (OC przewoźnika, członkostwa IAM/FEDEMAC itp.), stawka prowizji | **Norbert** 🔑 + Agent | kontakty Norberta | rejestr partnerów | każdy partner ma sprawdzone dokumenty w aktach | ⬜ |
| D4.2 | Umowa poleceń z partnerem (prowizja, terminy, odpowiedzialność, RODO — partner jako odrębny administrator danych) | Agent pisze, **Norbert podpisuje** 🔑 | D4.1 | wzór umowy | — | 🔒 D4.1 |
| D4.3 | Przycisk przy pełnym kalendarzu + zgoda klienta na przekazanie danych partnerowi (jedno pole, jawnie) | Agent | D3.4 | przycisk | bez zaznaczenia zgody nic nie wychodzi do partnera | 🔒 D3.4 |
| D4.4 | Przekazanie zgłoszenia partnerowi (mail/SMS) + task dla MM „dopilnuj partnera" + zliczanie prowizji. Na start prowizja = miesięczna faktura Arkpolu do partnera (automatyczne rozliczenie przez Stripe Connect dla firm z Polski NIEPOTWIERDZONE — sprawdzić u Stripe przed budową) | Agent | D4.2 + D4.3 | zgłoszenie u partnera | zgłoszenie testowe dociera; prowizja w raporcie | 🔒 D4.2, D4.3 |
| D4.5 | Napis na przycisku tylko prawdziwy: „certyfikowany" wyłącznie przy partnerze z realnym certyfikatem; inaczej „sprawdzony przez Arkpol" | Agent (gate) | D4.1 | zatwierdzony tekst | brak słowa „certyfikowany" przy partnerze bez certyfikatu | 🔒 D4.1 |

### D5 — Dzień przeprowadzki: auto na mapie + powiadomienia

| ID | Zadanie atomowe | Wykonawca | Wejście | Wynik | Test akceptacji | Stan |
|---|---|---|---|---|---|---|
| D5.1 | Link „gdzie jest moja ekipa" dla klienta — pozycja auta z Verizon (faza 3), widoczna tylko w dniu i godzinach zlecenia | Agent | A3.2 | mapa dla klienta | link testowy pokazuje auto; po zleceniu wygasa | 🔒 A3.2 |
| D5.2 | SMS/mail: dzień przed, „ekipa wyjechała", „ekipa na miejscu", po zleceniu prośba o ocenę + dopłata 20% | Agent | A3.3 | automaty | przejazd testowy wysyła komplet wiadomości | 🔒 A3.3 |

### D6 — Natywne aplikacje (dopiero gdy wersja w przeglądarce ma zlecenia)

| ID | Zadanie atomowe | Wykonawca | Wejście | Wynik | Test akceptacji | Stan |
|---|---|---|---|---|---|---|
| D6.1 | Próg startu: decyzja na liczbach z D1–D5 (zamówienia/tydzień, konwersja) | Agent (org) → **Norbert** 🔑 | 4–6 tyg. danych | TAK/NIE | — | 🔒 D1–D5 |
| D6.2 | Konta Apple Developer (99 USD/rok) i Google Play (25 USD) na Arkpol | **Norbert** 🔑 | D6.1 = TAK | konta | — | 🔒 D6.1 |
| D6.3 | Aplikacje iOS/Android (ta sama logika co wersja w przeglądarce) + powiadomienia push | Agent | D6.2 | aplikacje w TestFlight / testach Google | klik-through na prawdziwym telefonie | 🔒 D6.2 |
| D6.4 | Publikacja w sklepach (przegląd Apple/Google 1–3 tyg.) | Agent + **Norbert (akceptacja)** | D6.3 | aplikacje w sklepach | pobranie i zamówienie testowe ze sklepu | 🔒 D6.3 |

---

## SIDEQUEST R — RedKey (rynek lokalny B2C) — ZASTĄPIONY FAZĄ D (2026-10-28)

> Marka RedKey znika decyzją Norberta z 2026-10-28; leady i kalkulator RedKey przechodzą do FAZY D (D1.2, D1.7). Zadania R.1–R.3 poniżej zostają tylko jako historia.

> **Problem:** leady z kalkulatora RedKey żyją poza lejkiem — osobny strumień przychodu bez wspólnej obsługi.
> **Rozwiązanie:** import leadów RedKey do tego samego lejka (osobny brand, ten sam silnik — zero osobnej infrastruktury).
> **Zyski:** rynek lokalny obsługiwany tą samą maszyną co core-biznes; żadnych dodatkowych ludzi ani narzędzi.
> **Koszty:** 💰 zero (wszystko już istnieje). 👤 decyzja Norberta: 2 min. 🤖 sync = struktura PBS, koszt wg wyceny obsługi PBS.
> **Czeka na:** decyzję Norberta (ustalenie z 2026-08-18: rzekome „cofnięcie" bramki EXPORT_KEY okazało się fałszywym alarmem — bramka jest na miejscu).

| ID | Zadanie atomowe | Wykonawca | Wejście | Wynik | Test akceptacji | Stan |
|---|---|---|---|---|---|---|
| R.1 | Decyzja: uzbrajamy import leadów RedKey? (rekomendacja org: TAK — alarm był fałszywy) | **Norbert** 🔑 | raport 2026-08-18 | ratyfikacja/weto | — | ⬜ |
| R.2 | Wpisać EXPORT_KEY + adres serwisu RedKey w /brain/settings; pierwszy ręczny sync (przycisk już istnieje, fail-closed) | Agent | R.1 = TAK | leady RedKey w Brain | sync zwraca fetched/imported bez błędu | 🔒 R.1 |
| R.3 | Sync cykliczny (np. co godzinę) + dedup | Agent | R.2 | automat | nowy lead z kalkulatora pojawia się <1h | 🔒 R.2 |

---

## Zbiorczy obraz kosztów (stałe, miesięczne — po pełnym wdrożeniu)

| Pozycja | Kwota | Pewność |
|---|---|---|
| Hosting Brain (Railway) | ~5 USD | cennik publiczny |
| Calendly | ~10–12 USD/stanowisko | cennik publiczny, liczba stanowisk do ustalenia |
| Google Workspace | ~12–14 USD/użytkownik | cennik publiczny, liczba userów z A2.1 |
| Verizon API | 0 (w obecnym abonamencie) | do potwierdzenia |
| Revolut API | 0 (w cenie konta) | cennik publiczny |
| EnableBanking | do potwierdzenia przy rejestracji | — |
| Entee.ai + konwersacje WhatsApp | do potwierdzenia + grosze/konwersacja | — |
| Yembo | ~5–15 USD/survey ⇒ rząd 0,5–2 tys. USD/mies. przy 100–150 surveys | NIEPOTWIERDZONE — demo |
| Move4U | do potwierdzenia na demo | — |
| (opcja) Voxme | 300 USD/rok + 3 USD/zlecenie | cennik publiczny |
| Faza D: Stripe (karta/BLIK/Przelewy24) | prowizja od transakcji, bez abonamentu | cennik publiczny |
| Faza D: skan klienta (Yembo, rozszerzenie umowy z fazy 6) | do potwierdzenia na demo | NIEPOTWIERDZONE |
| Faza D (dopiero D6): Apple Developer + Google Play | 99 USD/rok + 25 USD jednorazowo | cennik publiczny |
| **🤖 Obsługa AI (struktura PBS)** | **zależna od wyceny obsługi systemu przez PBS** — jedna pozycja za całość: budowa, integracje, agenci, strażnik, utrzymanie | wycena PBS |

Żaden koszt z „do potwierdzenia" nie zostanie zaciągnięty bez osobnej ratyfikacji Norberta (dotyczy zwłaszcza decyzji kontraktowej A6.5).

---

## PYTANIA — wszystkie otwarte pytania do Norberta (jedno miejsce, stała sekcja)

**Zasada (Norbert, 2026-08-19):** każde pytanie, jakie ma system/org, musi być TUTAJ — nie w rozmowach. Norbert odpowiada, kiedy może (często „nie wiem" — to też odpowiedź). Do czasu odpowiedzi działamy na **jawnym założeniu domyślnym** z ostatniej kolumny; odpowiedź nadpisuje założenie.

| # | Pytanie | Dotyczy | Założenie domyślne (dopóki brak odpowiedzi) |
|---|---|---|---|
| P1 | Jaki system VoIP działa w biurze (operator/nazwa)? Czy panel daje eksport lub API rejestru połączeń? | K.1/K.3 | czekamy; flaga K.6 i tak wchodzi po fazie 4 (działa bez VoIP) |
| P2 | Czy istnieje już firmowe konto Calendly? Jedno wspólne stanowisko czy osobne per MM? | A1.1 | jedno konto firmowe, jeden typ spotkania |
| P3 | Gdzie zarejestrowana jest domena arkpol.com i kto ma dostęp do DNS? | A2.2/A2.4 (MX) | ustalimy przy zakładaniu Workspace |
| P4 | Ile jest skrzynek @arkpol.com i które są wspólne (sales/operations/accounting)? | A2.1 | spiszemy z sekretarką w A2.1 |
| P5 | Ilu ludzi ma dostać konta Google Workspace? (koszt ~12–14 USD/os./mies.) | A2.2, koszty | 10 osób (biuro wg struktury) |
| P6 | Czy w panelu Verizon Reveal widzisz opcję Admin → Integrations / API? | A3.1 | jeśli nie — sami piszemy do supportu Verizon (treść gotowa) |
| P7 | Jakie konta bankowe firma ma poza Revolutem (który bank/banki pod EnableBanking)? | A4.4/A4.5 | zaczynamy od samego Revoluta |
| P8 | Czy WSZYSTKIE wydatki terenowe (paliwo/myto/hotele) idą kartami Revolut? | A4.6 (kompletność marży) | tak; braki wyjdą w pierwszym raporcie marż |
| P9 | Który numer ma być firmowym WhatsAppem (istniejący czy nowy dedykowany)? | A5.1 | nowy, dedykowany numer |
| P10 | Potwierdzasz wolumen do negocjacji z vendorami: 100–150 surveys/mies., 1 200–1 500 zleceń/rok? | A6.2–A6.5 | tak (wyliczone z ~18 mln PLN obrotu) |
| P11 | Który MM poprowadzi pilot Yembo (5 mieszkań)? | A6.6 | Michał (COO) |
| P12 | Czy oferta Voxme z 2025-04-15 jest nadal na stole? Mamy kontakt do ich handlowca? | A6.11 | negocjujemy od zera z cennika publicznego |
| P13 | Masz kontakty do account managerów Crown / Voerman / Sirva? (pytanie o preferencje narzędzi survey + wymianę danych Move4U; mandat Sirvy = niezweryfikowany) | faza 6, DD | nie pytamy partnerów do czasu decyzji kontraktowej |
| P14 | Próg flagi dziury 10% i okno follow-upu 2 h robocze — zostawić, czy zmienić? | K.4/K.6 | 10% / 2 h robocze |
| P15 | Imiona/nazwiska: CFO, HR, kierownik biura, asystentka (w Brain są placeholdery) | A0.2/A8.1 | placeholdery do onboardingu (A8.1) |
| P16 | Quality & Social: planujesz zatrudnienie, czy rola zostaje na COO + agentach? | faza 8 | COO + agenci (system przejmuje checklisty) |
| P17 | Czy jest już kontakt z FIDI / docelowy termin startu akredytacji FAIM? | strategia, faza 6–7 | budujemy dokumentację „FAIM-ready" bez terminu |
| P18 | Jaki numer telefonu publikujemy na arkpol.com? (FEDEMAC podaje 22 853 30 43 — NIEZWERYFIKOWANY) | www | nie publikujemy żadnego numeru |
| P19 | RedKey (R.1): uzbrajamy import leadów? (rekomendacja org: TAK — alarm o EXPORT_KEY był fałszywy) | sidequest R | zaparkowane — sync wyłączony |
| P20 | Move4U twierdzi, że Arkpol MA już 2× CrewPro + 1× SurveyPro — wiedziałeś? Kto je kupił / kto ich używa (biuro? Voerman? Crown?) | A6.3, koszty F6 | zapytaliśmy Move4U o daty aktywacji i przypisane konta; traktujemy jako aktywa do wykorzystania |
| P21 | Yembo (Tom Killian, EST) przyśle sloty na call w przyszłym tygodniu — późne popołudnie CET pasuje? Bierzesz udział sam czy z kimś (Michał?) | A6.2 | proponujemy późne popołudnie CET; uczestnik: Norbert (+ opcjonalnie Michał) |
| P22 | Ile przeprowadzek krajowych dla klientów prywatnych Arkpol robi dziś miesięcznie i ile zapytań odrzuca w sezonie (bo brak terminu)? | D3.3, D4, decyzja D6.1 | nie znamy — pierwsze 4–6 tygodni D1 policzy to samo |
| P23 | Ile ekip i aut dziennie możemy oddać na Domestic, nie ruszając zleceń międzynarodowych/korporacyjnych? | D3.3 | 1 ekipa + 1 auto dziennie w Warszawie |
| P24 | Jakie są dziś stawki Arkpolu za przeprowadzkę lokalną (zł/h lub ryczałt) i jaka marża jest minimum? | D1.3, D2.4 | cennik RedKey 1:1 do czasu Twojej decyzji |
| P25 | Których partnerów (firmy przeprowadzkowe, organizerki, sprzątanie, wywóz) znasz osobiście i możemy ich zaprosić do sieci? | D4.1 | zaczynamy od firm z IAM/FEDEMAC w Polsce + 1 organizerka w Warszawie |
| P26 | Miasta na start: tylko Warszawa i okolice (obszar RedKey: 18 dzielnic + 20 miejscowości do 30 km)? | D1, D3 | tak, tylko Warszawa + 30 km |
| P27 | Lifty (lifty-app.pl) — znasz ich? Kupujemy ich usługę testowo jako klient, żeby sprawdzić cenę i jakość? | rynek, D1.3 | tak, jedno zamówienie testowe po Twojej zgodzie (zakup = Twoja decyzja) |

---

## Co blokuje start każdej fazy — checklista Norberta

| # | Klucz/decyzja | Odblokowuje | Ile czasu |
|---|---|---|---|
| 1 | **Akceptacja tego scope'u (fazami)** | wszystko | 10 min |
| 2 | Konto Calendly + wklejenie webhooka | FAZA 1 | 35 min |
| 3 | Google Workspace na arkpol.com | FAZY 2, 7 | 1–2 h |
| 4 | Klucz API Verizon | FAZA 3 | 30 min |
| 5 | Klucz Revolut (read-only) | FAZA 4 (część) | 30 min |
| 6 | Rejestracja EnableBanking | FAZA 4 (reszta) | ~1 h |
| 7 | Konto Entee.ai + numer | FAZA 5 | 30 min |
| 8 | Obecność na demo Yembo/Move4U + decyzja kontraktowa | FAZA 6 | 2× 45 min + decyzja |
| 9 | Decyzja RedKey (R.1) | SIDEQUEST R | 2 min |
| 10 | Nazwa systemu VoIP + dostęp do panelu/API (K.1) | FAZA K | 5 min |
| 11 | Słowo „start" dla Arkpol Domestic (D1.1) + odpowiedzi P22–P27 | FAZA D | 15 min |

**Zasady utrzymania dokumentu:** każde nowe działanie w Arkpol OS dostaje ID w tym pliku ZANIM zostanie zbudowane; statusy aktualizowane po każdej sesji; zmiany zakresu = nowa wersja do akceptacji fazy, nie ciche dopiski; kwoty „do potwierdzenia" uzupełniane w dniu poznania ceny.
