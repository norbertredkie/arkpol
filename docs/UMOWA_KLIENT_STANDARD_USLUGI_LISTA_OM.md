# Umowa z klientem + Standard usługi: lista zadań dla Office Manager

**2026-10-28 · prawnik nic nie pisze: bierzemy istniejące SLA sieci i je dostosowujemy (decyzja Norberta) · zadanie W.6 / W.7 (FAZA W w `ARKPOL_SCOPE_MASTER.md`) · powiązane z: SLA dla podwykonawców v2**
(`_pbs/products/pbs-federation/arenas/arkpol-testnet/channel/sla-podwykonawca/SLA_PODWYKONAWCA_v2.md`, commit 27c1a117)

---

## O co chodzi (w 3 zdaniach)

1. Klient z kreatora na arkpol.com dostaje do podpisu w Autenti **krótką umowę na 1 stronę** i **„Standard usługi” na 1 stronę**. Zaznaczając checkbox i podpisując, klient **zgadza się na Standard usługi i go zatwierdza**.
2. Standard usługi to **ten sam dokument**, który podwykonawca dostaje przy zleceniu jako „Kartę Sieci: Klient bezpośredni Arkpol”. Obowiązuje ta sama numeracja i ta sama wersja.
3. Wynik: wszystko, co obiecujemy klientowi, podwykonawca musi wykonać wobec nas. Jeśli nie wykona, odpowiada wobec Arkpol (kary, potrącenie z faktury, weksel).

```
KLIENT ── podpisuje ──▶ Umowa (1 str.) + Standard usługi vX (1 str.)
                                              │ ten sam dokument, ta sama wersja
                                              ▼
PODWYKONAWCA ── przyjmuje zlecenie ──▶ Karta Sieci „Klient bezpośredni Arkpol” = Standard usługi vX
                                              │ SLA podwykonawcy § 3, § 9, § 11
                                              ▼
                     jeśli zawiedzie: kara / potrącenie / regres na Arkpol
```

---

## Część A. Co zbiera Office Manager

Odpowiedź „nie ma” też jest odpowiedzią. Wpisujemy ją i idziemy dalej. Gotowe materiały trafiają do folderu `Umowy/Wzór umowy klient 2026` na Dysku, a link do Norberta.

| # | Co zebrać | Skąd / od kogo | Po co | Gotowe |
|---|---|---|---|---|
| A1 | **Obecne wzory**: umowa z klientem prywatnym, ogólne warunki lub regulamin, formularz odstąpienia od umowy. Jeśli ich nie ma, wpisać „brak”. | Dysk, poczta, Prezes, MM | punkt startu wzoru (pytanie P31) | ☐ |
| A2 | **3 ostatnie oferty** wysłane klientom prywatnym, po jednej PL, EN i DE (jeśli są) | skrzynki MM | umowa ma odsyłać do oferty, więc musi pasować do jej układu | ☐ |
| A3 | **Która spółka** zawiera umowy z klientami prywatnymi (AR czy BIS), pełne dane rejestrowe | Prezes / księgowość | nagłówek umowy | ☐ |
| A4 | **Kto podpisuje** po stronie Arkpol i czy potrzebne jest pełnomocnictwo dla osoby podpisującej w Autenti | Prezes | podpis w Autenti (pytanie P30) | ☐ |
| A5 | **Polisy**: kopie wszystkich polis (OC firmy, OC przewoźnika, cargo, magazyn). Przy każdej: suma, udział własny, czy obejmuje mienie przy przeprowadzce. Kontakt do brokera. | segregator, broker | zapis o odpowiedzialności w umowie. Nie obiecujemy klientowi więcej, niż pokrywa polisa. | ☐ |
| A6 | **Autenti**: czy firma ma już konto Autenti albo inny e-podpis. Jeśli nie, cennik planów **z dostępem do API** i koszt jednego podpisu. | strona Autenti / handlowiec Autenti | decyzja kosztowa Norberta, potem założenie konta (W.7) | ☐ |
| A7 | **Protokoły w użyciu** (skan z 2–3 ostatnich zleceń): protokół rozpoczęcia, zakończenia, spis rzeczy, protokół szkód. Jeśli ich nie ma, wpisać „brak”. | MM, magazyn, ekipy | te same druki podpisują klient i podwykonawca, więc muszą być jedne | ☐ |
| A8 | **Reklamacje dziś**: jak klient zgłasza szkodę, kto odpowiada, gdzie to jest zapisane. Lista reklamacji z 2026 (tylko data i rodzaj). | MM, biuro | kanał zgłoszeń i termin odpowiedzi w Standardzie | ☐ |
| A9 | **Lista podwykonawców**, którzy dziś obsługują klientów prywatnych: nazwa, NIP, kontakt, czy mają pisemną umowę z Arkpol, kopia polisy | MM, księgowość | oni podpisują SLA podwykonawcy. Bez tego obietnica dla klienta nie ma pokrycia. | ☐ |
| A10 | **Podwykonawcy: SLA kwartalne.** Office Manager jest w DW każdego maila automatu (zaproszenie, 2 przypomnienia, informacja o blokadzie). Sprawdza, czy podpisane SLA są w folderze kwartału na Dysku. Kto nie podpisał, ten od pierwszego dnia kwartału nie dostaje nowych zleceń: przekazać to MM. | automat `ops/sla_kwartal`, Dysk | dzięki temu obietnice z umowy klienta są pokryte przez podwykonawców | co kwartał |
| A11 | **Tłumacz lub native** do sprawdzenia wersji EN i DE | kontakty firmy | Standard usługi i umowa w 3 językach | ☐ |

**Czego Office Manager NIE decyduje.** Te pola zostają w [nawiasach] do decyzji Norberta i Prezesa: wysokość zaliczki, kwoty kar dla podwykonawców, sumy polis, termin wysłania dokumentów klientowi, zakres, za który Arkpol bierze odpowiedzialność.

---

## Część B. Umowa z klientem: szkic układu (1 strona)

Krótko, zwykłym językiem, bez paragrafów na pół strony. Wszystkie szczegóły są w ofercie i w Standardzie usługi.

1. **Strony**: Arkpol [spółka z A3] i Klient (dane z kreatora).
2. **Co robimy**: zakres, ilość i adresy według **Oferty nr [XXX]**, która jest częścią umowy.
3. **Termin**: [data]. Termin jest potwierdzony dopiero po podpisaniu umowy i wpłacie zaliczki (jak w stopce oferty).
4. **Cena i płatność**: ryczałt według oferty, zaliczka [20–30]% (jak w ofercie). Dopłaty tylko według cennika z oferty i tylko po akceptacji Klienta przed rozpoczęciem pracy.
5. **Standard usługi**:
   > ☐ **Akceptuję Standard usługi Arkpol (wersja [2] z [28.10.2026]). Standard jest częścią tej umowy.**
   >
   > Checkbox w kreatorze jest **niezaznaczony** domyślnie. Bez zaznaczenia nie można przejść dalej. Autenti podpisuje umowę, ofertę i Standard jako **jeden PDF**.
6. **Odpowiedzialność i ubezpieczenie**: jedno zdanie, treść po A5 (polisy) i decyzji Norberta.
7. **Odstąpienie od umowy** (wymóg ustawy dla konsumenta, umowa zawarta na odległość): wzór formularza w załączniku. Klient w kreatorze prosi o rozpoczęcie usługi przed upływem 14 dni i przyjmuje do wiadomości, że po pełnym wykonaniu usługi traci prawo odstąpienia (art. 38 ustawy o prawach konsumenta).
8. **Dane osobowe**: jedno zdanie i link do polityki prywatności.

---

## Część C. Standard usługi: szkic (1 strona, ta sama wersja co SLA podwykonawcy)

Każda obietnica ma źródło w SLA podwykonawcy. Kolumna „§ SLA” to dowód, że za tę obietnicę odpowiada wobec nas podwykonawca. Nowych liczb nie dopisujemy. Tam, gdzie liczbę musi ustalić Norbert, jest [nawias].

### Co obiecujemy Klientowi

| # | Obietnica dla Klienta | § SLA podwykonawcy |
|---|---|---|
| S1 | Przed rozpoczęciem pracy razem z Klientem spisujemy stan mieszkania (zdjęcia „przed”), a po zakończeniu stan „po”. Obie strony podpisują protokół. | § 5 ust. 5 |
| S2 | Zabezpieczamy podłogi, drzwi i części wspólne przez cały czas pracy. Za szkody w mieszkaniu odpowiadamy. | § 5 ust. 5, § 9 |
| S3 | Ekipa jest przeszkolona, ma brygadzistę, z którym można się porozumieć po polsku lub angielsku, i pracuje trzeźwa. | § 5 ust. 1–2 |
| S4 | Pakujemy w nowe materiały. Każdy karton jest ponumerowany i wpisany do spisu, a Klient dostaje kopię spisu. | § 5 ust. 3, 6 |
| S5 | Meble rozkręcamy i skręcamy. Śruby i części trafiają do oznaczonego „pudełka na części”. | § 5 ust. 6 |
| S6 | Na koniec robimy wspólny obchód mieszkania i podpisujemy protokół zakończenia. | § 5 ust. 12 |
| S7 | Rozpakowanie, ustawienie i wywóz kartonów są wykonywane, jeśli są w ofercie. | § 5 ust. 11 |
| S8 | Dokumenty (spis, protokoły, zdjęcia) Klient dostaje w ciągu **[●] dni roboczych**. Decyzja Norberta: podwykonawca ma na to 1 dzień roboczy, więc termin dla Klienta nie może być krótszy niż 2. | Zał. 1 A11–A12 |
| S9 | Reklamację rozpatrujemy w ciągu **14 dni** (ustawa o prawach konsumenta). Podwykonawca ma 3 dni robocze na odpowiedź do nas, więc mieścimy się z zapasem. | § 10 ust. 2 |
| S10 | Nie ma dopłat „na miejscu” bez zgody. Każda zmiana zakresu lub ceny wymaga akceptacji Klienta **przed** wykonaniem pracy. | § 7 ust. 3 |

### Co robi Klient (żeby obietnice dało się dotrzymać)

| # | Obowiązek Klienta | Dlaczego / § SLA |
|---|---|---|
| K1 | W kreatorze podaje prawdziwe dane: piętro, winda, parking, dojście. | Od tego zależy wycena i ekipa (§ 7 ust. 1). |
| K2 | Jest obecny lub wyznacza osobę na protokół „przed” i „po” oraz podpisuje spis. | Bez podpisu nie ma dowodu przy szkodzie (§ 5 ust. 5–6). |
| K3 | Nie oddaje do pakowania rzeczy zabronionych (lista w załączniku: łatwopalne, żywność, płyny, broń itp.). Pieniądze, biżuterię i dokumenty przewozi sam. | § 5 ust. 7 |
| K4 | Dodatkowe prace zamawia przez opiekuna zlecenia, nie bezpośrednio u ekipy. | § 4 ust. 3, § 7 ust. 3 |
| K5 | Szkodę widoczną wpisuje do protokołu zakończenia, a szkodę ukrytą zgłasza w terminie **[●]**. Proponowany termin to 7 dni (art. 76 Prawa przewozowego). | § 10 |

---

## Część D. Jak zostaje spięte (do zrobienia przez Agenta, nie przez Office Manager)

1. W SLA podwykonawcy, w **Załączniku nr 2**, dopisana jest Karta Sieci „Klient bezpośredni Arkpol” = ten Standard usługi (ta sama wersja).
2. Przy każdym zleceniu dla klienta prywatnego zlecenie dla podwykonawcy zawiera ten Standard (SLA podwykonawcy § 3 ust. 1–3). Przyjęcie zlecenia oznacza akceptację.
3. Zmiana Standardu oznacza **nowy numer wersji** w obu miejscach naraz. Klient i podwykonawca zawsze mają tę samą wersję.
4. W.8: umowa z Autenti trafia do Brain razem z numerem wersji Standardu. Ten sam numer idzie na zlecenie dla podwykonawcy.
