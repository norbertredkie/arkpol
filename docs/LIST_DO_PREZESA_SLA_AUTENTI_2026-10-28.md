**Do:** Prezes Zarządu
**Od:** Norbert Redkie, Wiceprezes
**Data:** 28.10.2026
**Temat:** SLA dla podwykonawców, umowa z klientem w Autenti i zadania dla Jolki

---

Poniżej opisuję, co według mnie trzeba zrobić, żeby za błędy podwykonawców nie płaciła firma, i co w tym ma zrobić Jolka. Na końcu są decyzje, których potrzebuję od Ciebie.

## 1. Dlaczego SLA dla podwykonawców i dlaczego właśnie tak

**Problem.** Sieci (SIRVA, De Haan, Move One, Gosselin i inne) podpisują z nami SLA: twarde terminy, dokumenty, zdjęcia, pełną odpowiedzialność za szkody, franszyzę (np. 650 EUR na przesyłkę u De Haan) i potrącenia z naszych faktur. Dużą część tej pracy fizycznie wykonują nasi podwykonawcy, ale **oni nie podpisali z nami niczego podobnego**. Kiedy podwykonawca się spóźni albo coś zniszczy, sieć obciąża nas, a my od podwykonawcy nie mamy podstawy, żeby to odzyskać.

**Rozwiązanie.** Nie piszemy nic od zera i nie płacimy prawnikowi. Bierzemy SLA, które już podpisaliśmy z sieciami, i przenosimy z nich obowiązki 1:1 na podwykonawców:

- **To samo, co my musimy, musi też podwykonawca.** Jeśli sieć wymaga protokołu, zdjęć i spisu, podwykonawca też musi je zrobić.
- **Krótsze terminy dla podwykonawcy.** Jeśli sieć daje nam 24 godziny, podwykonawca ma 12. Zostaje nam czas na reakcję.
- **Kara od sieci przechodzi na podwykonawcę.** Potrącamy ją z jego faktur, a jako zabezpieczenie podwykonawca daje weksel in blanco.
- **Do każdego zlecenia dołączamy „Kartę Sieci”**, czyli kartkę z wymaganiami i karami danej sieci. Podwykonawca przyjmuje zlecenie, więc akceptuje kartkę. Nie powie potem, że nie wiedział.

**Dlaczego co kwartał.** Wymagania sieci się zmieniają, a podwykonawcy się zmieniają. Co kwartał wysyłamy aktualną wersję do podpisu. **Kto nie podpisze, nie dostaje nowych zleceń.** To prosta zasada i nie trzeba nikogo pilnować ręcznie.

**Jak to chodzi (automat, bez pracy biura):**

| Kiedy | Co się dzieje |
|---|---|
| 14 dni przed kwartałem | podwykonawca dostaje SLA do podpisu (Jolka w kopii) |
| po 3 dniach bez podpisu | przypomnienie 1 |
| po 6 dniach | przypomnienie 2 |
| po 9 dniach | informacja: bez podpisu nowe zlecenia zostaną zablokowane |
| 1. dzień kwartału | blokada; MM-y dostają listę, komu nie dajemy zleceń |
| po podpisie | podpisana umowa sama trafia na Dysk Google, do folderu kwartału |

**Klient prywatny.** Ten sam mechanizm działa w drugą stronę. Klient z arkpol.com dostaje umowę na jedną stronę i „Standard usługi” na jedną stronę, i wyraźnie go akceptuje. Każda obietnica dla klienta jest pokryta w SLA podwykonawcy. Nie obiecujemy klientowi niczego, czego podwykonawca nie musi wykonać.

**Skąd wzory.** Wzory wziąłem z tego, co już mamy w poczcie: wymagań SIRVA dla agentów i SLA De Haan. SLA z pozostałymi sieciami leżą na naszym Dysku i zostaną dopisane jako kolejne Karty Sieci.

## 2. Czym jest Autenti

**Autenti** to polska firma i serwis do podpisywania umów przez internet, zamiast papieru i kuriera.

- Druga strona dostaje maila z linkiem. Czyta umowę i podpisuje na telefonie albo komputerze. **Nie musi zakładać konta ani niczego instalować.**
- Podpis jest ważny prawnie na podstawie unijnego rozporządzenia eIDAS i kodeksu cywilnego. Przy ważniejszych umowach można użyć podpisu kwalifikowanego, który jest równy podpisowi odręcznemu.
- Autenti zapisuje, kto podpisał, kiedy i z jakiego adresu. Przy sporze to jest dowód.
- Ma **API**, czyli łącze do naszego systemu. Dzięki temu umowy wysyła automat, a nie Jolka ręcznie.

**Po co nam to.** Dziś umowy z podwykonawcami i klientami albo nie istnieją, albo leżą rozproszone. Z Autenti każda umowa jest podpisana, ma datę i od razu ląduje na Dysku. Klient prywatny podpisuje umowę w 2 minuty, a termin przeprowadzki potwierdzamy dopiero po podpisie.

**Koszt.** Abonament plus opłata za podpis. Plan z dostępem do API jest droższy niż podstawowy. Kwota **nie jest jeszcze potwierdzona**: Jolka sprawdzi cennik, a ja zaakceptuję koszt przed założeniem konta.

## 3. Zadania dla Jolki

Jolka **zbiera i pilnuje**, ale nie decyduje o kwotach. Odpowiedź „nie ma” też jest dobrą odpowiedzią.

**Jednorazowo (na start):**

1. Zebrać obecne wzory umów z klientami prywatnymi, regulamin i formularz odstąpienia od umowy. Jeśli ich nie ma, wpisać „brak”.
2. Przynieść 3 ostatnie oferty wysłane klientom prywatnym (PL, EN, DE).
3. Potwierdzić z Tobą, **która spółka** (AR czy BIS) podpisuje umowy z klientami prywatnymi i **kto podpisuje** za firmę.
4. Zrobić kopie **wszystkich polis**: OC, OC przewoźnika, cargo, magazyn. Przy każdej zapisać sumę, udział własny i to, czy obejmuje przeprowadzki. Dodać kontakt do brokera.
5. **Autenti:** sprawdzić, czy mamy już jakiś e-podpis. Jeśli nie, przynieść cennik planu z API, a po mojej akceptacji założyć konto firmowe.
6. Zebrać skany protokołów, których dziś używamy: rozpoczęcia, zakończenia, spisu rzeczy, szkód.
7. Opisać, jak dziś klient zgłasza reklamację i kto odpowiada. Dołączyć listę reklamacji z 2026 (tylko data i rodzaj).
8. **Lista podwykonawców**: nazwa, NIP, mail, czy mają z nami pisemną umowę, kopia ich polisy. Bez tej listy automat nie ruszy.
9. Znaleźć osobę, która sprawdzi wersje EN i DE umowy dla klienta.

**Co kwartał (stale):**

10. Jest w kopii wszystkich maili automatu do podwykonawców. Sprawdza, czy podpisane SLA są na Dysku w folderze kwartału. Pierwszego dnia kwartału przekazuje MM-om listę zablokowanych podwykonawców.

## 4. Czego potrzebuję od Ciebie

1. **Zgody na zasadę:** podwykonawca bez podpisanego SLA na dany kwartał nie dostaje nowych zleceń.
2. **Która spółka i kto podpisuje** umowy z klientami prywatnymi i z podwykonawcami.
3. **Kwot:** zaliczka od klienta (dziś 20–30%), kary dla podwykonawców i kwota weksla. Moje propozycje są w projekcie SLA.
4. **Od kiedy startujemy:** od razu na resztę IV kwartału czy od 1 stycznia 2027 (wtedy wysyłka 18 grudnia).

Projekt SLA podwykonawcy i projekt umowy z klientem mam gotowe. Mogę je pokazać w każdej chwili.

Norbert
