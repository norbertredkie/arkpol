"use client";

/**
 * Lightweight in-page i18n (PL / EN / DE).
 * - Default: auto-detect the visitor's browser language, fall back to English.
 * - Choice persisted in localStorage ("arkpol_lang").
 * - No routing change — a single URL, text swaps instantly via context.
 */

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Locale = "en" | "pl" | "de";
export const LOCALES: Locale[] = ["pl", "en", "de"];

const messages = {
  en: {
    nav: { services: "Services", why: "Why Arkpol", network: "Network", faq: "FAQ", insights: "Insights", quote: "Request a Quote" },
    hero: {
      titleA: "Move With", titleAccent: "Certainty",
      sub: "International moves, run by the people accountable for them. Our own crews across Central Europe, an accredited network worldwide, and thirty years of getting it there — intact, on time, without the drama.",
      ctaQuote: "Request a Quote", ctaServices: "Our Services",
      marqueeLabel: "Moving Europe — and the world — since 1995",
    },
    statement: {
      eyebrow: "Track Record",
      heading: "Trusted where it cannot go wrong.",
      sub: "Thirty years of moves with no margin for error — the sensitive, the high-profile, and the supposedly impossible.",
      proof: [
        { k: "NATO Sites", v: "Multi-country relocations delivered" },
        { k: "Premier League", v: "Ibrahimović · Fernandinho" },
        { k: "Venice", v: "A household, by water only" },
      ],
    },
    why: {
      eyebrow: "Why Arkpol",
      heading: "Not a mover. A logistics standard.",
      reasons: [
        { title: "Precision-Grade Logistics", body: "Three decades moving high-value, time-critical and sensitive cargo across borders — every relocation planned, documented and executed to an exacting standard. The complex move is our default setting." },
        { title: "Our Own Crews Where It Counts", body: "Across Central and Eastern Europe — our home ground — your move is handled end-to-end by Arkpol's own teams, dispatched from our warehouses in Poland and Germany. One crew, one standard, no handoff surprises." },
        { title: "Accredited Reach, Worldwide", body: "Wherever you're headed, you're covered by a vetted international network. As an IAMTrusted moving company working hand-in-hand with FIDI-accredited partners, every leg of your move is held to the same accredited standard — across Europe and beyond." },
      ],
    },
    network: {
      eyebrow: "Our Network",
      heading1: "Two hubs.", heading2: "One European backbone.",
      mapAlt: "Arkpol's European coverage from its Poland and Germany hubs",
      cards: [
        { tag: "POLAND", name: "Arkpol PL", address: "Str. Główna 9a, Nowa Wieś — Warsaw area", capacity: "2,300 m² warehouse · serves Central & Eastern Europe" },
        { tag: "GERMANY", name: "Arkpol DE", address: "Frankfurt am Main", capacity: "1,500 m² warehouse · serves Western, Southern, Northern & Central Europe" },
      ],
      legend: [
        "Our hubs — Poland & Germany",
        "Central Europe — both hubs",
        "Eastern Europe — from Poland",
        "Western · Southern · Northern — from Germany",
      ],
      footnote: "Two warehouses, one standard — from Lisbon to Lviv, every move runs on the same crews and the same quality bar.",
    },
    numbers: { moves: "Moves per year", years: "Years", countries: "Countries", memberships: "Memberships", memberOf: "We are members of", credential: "IAMX Validated · IAM Trusted Moving Company · EURA Full Member · FEDEMAC Direct Affiliate" },
    services: {
      eyebrow: "What we do",
      heading: "Four services. One accountable team.",
      tiles: [
        { title: "International Moving (Europe)", description: "Door-to-door across the EU, handled end-to-end by one of our own crews — packed, moved, delivered." },
        { title: "Overseas Shipping (Sea + Air)", description: "Sea and air freight worldwide, with customs and paperwork handled so nothing stalls at the border." },
        { title: "Corporate & Office Relocations", description: "Whole offices and staff moves planned to the hour, so business never skips a beat." },
        { title: "Warehousing & Storage", description: "Secure, insured storage in our own Polish and German warehouses — for a week or a year." },
      ],
      form: {
        heading: "Tell us about your move",
        sub: "Where you're going, roughly when — and we'll come back within one business day.",
        labels: ["Full Name", "Company", "Origin City", "Destination Country", "Estimated Move Date"],
        placeholders: ["Jane Smith", "Acme Corp", "Warsaw", "Germany", ""],
        requiredNote: "Required fields",
        submit: "Get My Quote",
        successHeading: "You're on our radar.",
        successPre: "Thanks — we'll be in touch within one business day at ",
        successPost: ".",
      },
    },
    faq: {
      eyebrow: "Answers",
      heading: "Straight answers, before you ask.",
      sub: "The questions that actually matter when you're moving — answered without the sales pitch.",
      stillHave: "Still have a question? ", requestQuote: "Request a quote", andAsk: " and ask us directly.",
      items: [
        { q: "How do I move internationally from Poland to Germany?", a: "Arkpol handles your Poland–Germany move door-to-door with our own trained crews — no subcontractors. We survey your belongings, pack everything professionally, and transport it directly between our warehouses in both Poland and Germany, giving you flexible storage at either end if your dates don't align perfectly. Our team takes care of all cross-border paperwork so you don't have to navigate EU customs procedures alone. From first contact to keys-in-hand at your new address, a typical PL–DE move takes 3–7 days depending on volume." },
        { q: "What certifications should an international moving company have?", a: "The two recognised industry benchmarks are IAM (International Association of Movers) and FEDEMAC (Federation of European Movers Associations). IAM membership requires movers to meet strict standards for insurance, crew training, and claims handling, while FEDEMAC ensures compliance with European cross-border regulations. Arkpol holds both, which means your goods are covered by internationally recognised liability frameworks and you have a formal complaints pathway if anything goes wrong." },
        { q: "How long does an international corporate relocation take?", a: "A single-employee corporate relocation within Europe typically takes one to two weeks from survey to delivery, while larger volume moves or those requiring customs clearance outside the EU can run three to six weeks. The key variables are shipment volume, the destination country's import requirements, and whether temporary storage is needed. Arkpol's corporate relocation team provides a detailed timeline at the survey stage so HR and the relocating employee both have certainty." },
        { q: "Can household goods be shipped by sea from Poland?", a: "Yes — Arkpol arranges containerised sea freight for moves from Poland to destinations beyond Europe, including the Americas, Asia, and Africa. Your belongings are professionally packed and loaded into a dedicated or shared (LCL) container at our Polish warehouse, then shipped through major European ports. Sea freight is the most cost-effective option for large volumes over long distances, with transit times typically ranging from 2 to 8 weeks depending on destination. We manage port-to-door delivery at the receiving end." },
        { q: "What is a FIDI / IAM moving company?", a: "FIDI is the global alliance of premium international movers; its members must pass the independent FAIM quality audit (covering packing, claims, staff training, and financial stability) and are re-audited every three years. IAM is the International Association of Movers, the largest moving-industry association worldwide, with similar ethical and operational standards. A mover carrying either accreditation has been vetted by an independent third party — not just self-declared. Arkpol is an IAMTrusted moving company and works within the FIDI network, so your move meets the same standards whether you are an individual or a multinational corporation." },
        { q: "Have you handled high-security and government-site relocations?", a: "Yes. Across three decades Arkpol has carried out complex, high-scrutiny relocations connected to NATO and government sites in several countries — the kind of moves where documentation, vetting and timing leave no margin for error. That same discipline — meticulous paperwork, security-aware crews and tight on-site coordination — is built into every move we run, whether it's a single family or a multi-country corporate programme." },
        { q: "How much does an international move from Europe to the USA cost?", a: "Honestly, it depends — but the main cost drivers are shipment volume (cubic metres), origin and destination cities, sea-freight versus air-freight, and the level of packing service you choose. A shared container (LCL) for a one-bedroom apartment from Poland typically starts around €2,000–4,000 all-in, while a full 20-ft container for a larger home can reach €6,000–10,000+. US customs clearance and destination-agent fees add to the total. The only way to get an accurate number is a free home survey or video assessment — request a quote and we'll give you a fixed-price offer within 48 hours." },
      ],
    },
    insights: {
      eyebrow: "Insights",
      heading: "The relocation playbook.",
      sub: "Practical, no-nonsense guides from people who move for a living — so you can plan with confidence.",
      pillars: [
        { title: "Corporate Relocation", articles: ["Relocating employees from Poland to Germany (2026 guide)", "What HR needs to know about EU employee relocation", "How to choose an IAM-certified moving company"] },
        { title: "Country Guides", articles: ["Moving to the Netherlands from Poland: what to expect", "International move to the UK after Brexit: customs & rules", "Moving to Germany: a step-by-step expat guide"] },
        { title: "Specialty Moves", articles: ["Relocating sensitive and high-value cargo", "Moving artwork and valuables internationally", "Relocating a home office across borders"] },
      ],
      newGuidesBold: "2 new guides", newGuidesRest: " published every month.", readBlog: "Read the blog",
    },
    footer: {
      cta: "Move With Certainty.",
      colCompany: "Company", colServices: "Services", colResources: "Resources", colContact: "Contact",
      company: ["About", "Why Arkpol", "Our Network", "Insights"],
      servicesLinks: ["International Moving", "Overseas Shipping", "Corporate Relocations", "Warehousing"],
      resources: ["FAQ", "Case Studies", "GDPR", "Blog"],
      phone: "Phone: on request",
      entities: ["Str. Główna 9a, Nowa Wieś, Warsaw area", "Frankfurt am Main"],
      members: "Members",
      copyright: "© 2026 Arkpol Group. All rights reserved.",
      tagline: "30 years of moving Europe.",
    },
  },

  pl: {
    nav: { services: "Usługi", why: "Dlaczego Arkpol", network: "Sieć", faq: "FAQ", insights: "Poradnik", quote: "Zapytaj o wycenę" },
    hero: {
      titleA: "Przeprowadzki z", titleAccent: "pewnością",
      sub: "Międzynarodowe przeprowadzki prowadzone przez ludzi, którzy za nie odpowiadają. Własne ekipy w Europie Środkowej, akredytowana sieć na całym świecie i trzydzieści lat dostarczania na miejsce — w całości, na czas, bez nerwów.",
      ctaQuote: "Zapytaj o wycenę", ctaServices: "Nasze usługi",
      marqueeLabel: "Przeprowadzki w Europie — i na świecie — od 1995",
    },
    statement: {
      eyebrow: "Doświadczenie",
      heading: "Zaufanie tam, gdzie nie ma miejsca na błąd.",
      sub: "Trzydzieści lat przeprowadzek bez marginesu błędu — tych wrażliwych, prestiżowych i rzekomo niemożliwych.",
      proof: [
        { k: "Obiekty NATO", v: "Przeprowadzki w wielu krajach" },
        { k: "Premier League", v: "Ibrahimović · Fernandinho" },
        { k: "Wenecja", v: "Dom przewieziony wyłącznie wodą" },
      ],
    },
    why: {
      eyebrow: "Dlaczego Arkpol",
      heading: "To nie firma przeprowadzkowa. To standard logistyki.",
      reasons: [
        { title: "Logistyka precyzyjna", body: "Trzy dekady przewożenia cennych, wrażliwych i pilnych ładunków przez granice — każda przeprowadzka zaplanowana, udokumentowana i wykonana według rygorystycznego standardu. Trudna przeprowadzka to nasza codzienność." },
        { title: "Własne ekipy tam, gdzie to się liczy", body: "W Europie Środkowej i Wschodniej — na naszym terenie — Twoją przeprowadzką od początku do końca zajmują się własne zespoły Arkpolu, wysyłane z magazynów w Polsce i w Niemczech. Jedna ekipa, jeden standard, bez niespodzianek na styku." },
        { title: "Akredytowany zasięg na całym świecie", body: "Dokądkolwiek zmierzasz, masz wsparcie sprawdzonej sieci międzynarodowej. Jako firma z certyfikatem IAMTrusted, współpracująca z partnerami akredytowanymi przez FIDI, na każdym etapie utrzymujemy ten sam akredytowany standard — w Europie i poza nią." },
      ],
    },
    network: {
      eyebrow: "Nasza sieć",
      heading1: "Dwa centra.", heading2: "Jeden europejski kręgosłup.",
      mapAlt: "Zasięg Arkpolu w Europie z centrów w Polsce i w Niemczech",
      cards: [
        { tag: "POLSKA", name: "Arkpol PL", address: "ul. Główna 9a, Nowa Wieś — okolice Warszawy", capacity: "Magazyn 2 300 m² · obsługuje Europę Środkową i Wschodnią" },
        { tag: "NIEMCY", name: "Arkpol DE", address: "Frankfurt nad Menem", capacity: "Magazyn 1 500 m² · obsługuje Europę Zachodnią, Południową, Północną i Środkową" },
      ],
      legend: [
        "Nasze centra — Polska i Niemcy",
        "Europa Środkowa — oba centra",
        "Europa Wschodnia — z Polski",
        "Zachód · Południe · Północ — z Niemiec",
      ],
      footnote: "Dwa magazyny, jeden standard — od Lizbony po Lwów każda przeprowadzka opiera się na tych samych ekipach i tej samej jakości.",
    },
    numbers: { moves: "Przeprowadzek rocznie", years: "Lat", countries: "Krajów", memberships: "Członkostwa", memberOf: "Jesteśmy członkami", credential: "IAMX Validated · IAM Trusted Moving Company · EURA Full Member · FEDEMAC Direct Affiliate" },
    services: {
      eyebrow: "Co robimy",
      heading: "Cztery usługi. Jeden odpowiedzialny zespół.",
      tiles: [
        { title: "Przeprowadzki międzynarodowe (Europa)", description: "Od drzwi do drzwi w całej UE, w całości obsługiwane przez naszą własną ekipę — spakowane, przewiezione, dostarczone." },
        { title: "Transport zamorski (morze + lotniczy)", description: "Fracht morski i lotniczy na całym świecie, z obsługą cła i dokumentów, by nic nie utknęło na granicy." },
        { title: "Przeprowadzki firm i biur", description: "Całe biura i przeprowadzki pracowników zaplanowane co do godziny, by firma nie traciła tempa." },
        { title: "Magazynowanie i przechowywanie", description: "Bezpieczne, ubezpieczone przechowywanie w naszych magazynach w Polsce i w Niemczech — na tydzień lub na rok." },
      ],
      form: {
        heading: "Opowiedz nam o swojej przeprowadzce",
        sub: "Dokąd i mniej więcej kiedy — odezwiemy się w ciągu jednego dnia roboczego.",
        labels: ["Imię i nazwisko", "Firma", "Miasto początkowe", "Kraj docelowy", "Przybliżona data przeprowadzki"],
        placeholders: ["Jan Kowalski", "Acme Sp. z o.o.", "Warszawa", "Niemcy", ""],
        requiredNote: "Pola wymagane",
        submit: "Poproś o wycenę",
        successHeading: "Mamy Cię na radarze.",
        successPre: "Dziękujemy — odezwiemy się w ciągu jednego dnia roboczego na ",
        successPost: ".",
      },
    },
    faq: {
      eyebrow: "Odpowiedzi",
      heading: "Konkretne odpowiedzi, zanim zapytasz.",
      sub: "Pytania, które naprawdę mają znaczenie przy przeprowadzce — odpowiedzi bez sprzedażowego tonu.",
      stillHave: "Masz jeszcze pytanie? ", requestQuote: "Zapytaj o wycenę", andAsk: " i zapytaj nas wprost.",
      items: [
        { q: "Jak zorganizować międzynarodową przeprowadzkę z Polski do Niemiec?", a: "Arkpol realizuje przeprowadzkę z Polski do Niemiec od drzwi do drzwi własnymi, przeszkolonymi ekipami — bez podwykonawców. Robimy wizję lokalną, profesjonalnie wszystko pakujemy i przewozimy bezpośrednio między naszymi magazynami w Polsce i w Niemczech, oferując elastyczne przechowywanie po obu stronach, gdyby terminy nie zgrały się idealnie. Nasz zespół zajmuje się wszystkimi formalnościami granicznymi, byś nie musiał sam zmagać się z procedurami celnymi UE. Od pierwszego kontaktu po klucze w nowym miejscu typowa przeprowadzka PL–DE trwa od 3 do 7 dni, w zależności od ilości rzeczy." },
        { q: "Jakie certyfikaty powinna mieć międzynarodowa firma przeprowadzkowa?", a: "Dwa uznane standardy branżowe to IAM (International Association of Movers) oraz FEDEMAC (Federation of European Movers Associations). Członkostwo w IAM wymaga spełnienia rygorystycznych wymogów dotyczących ubezpieczenia, szkolenia ekip i obsługi reklamacji, a FEDEMAC zapewnia zgodność z europejskimi przepisami transgranicznymi. Arkpol posiada oba, co oznacza, że Twoje mienie jest objęte uznanymi międzynarodowo ramami odpowiedzialności, a w razie problemów masz formalną ścieżkę reklamacyjną." },
        { q: "Ile trwa międzynarodowa relokacja firmowa?", a: "Relokacja jednego pracownika w obrębie Europy trwa zwykle od jednego do dwóch tygodni od wizji lokalnej do dostawy, a większe przeprowadzki lub te wymagające odprawy celnej poza UE mogą trwać od trzech do sześciu tygodni. Kluczowe zmienne to objętość ładunku, wymogi importowe kraju docelowego oraz to, czy potrzebne jest tymczasowe przechowywanie. Zespół relokacji firmowych Arkpolu przedstawia szczegółowy harmonogram już na etapie wizji lokalnej, dzięki czemu zarówno HR, jak i przenoszony pracownik mają pewność." },
        { q: "Czy mienie domowe można wysłać drogą morską z Polski?", a: "Tak — Arkpol organizuje kontenerowy fracht morski na przeprowadzki z Polski do miejsc poza Europą, w tym do obu Ameryk, Azji i Afryki. Twoje rzeczy są profesjonalnie pakowane i ładowane do dedykowanego lub współdzielonego kontenera (LCL) w naszym magazynie w Polsce, a następnie wysyłane przez główne porty europejskie. Fracht morski to najbardziej opłacalna opcja przy dużych objętościach na dalekie odległości, a czas transportu wynosi zwykle od 2 do 8 tygodni, w zależności od celu. Po stronie odbioru zajmujemy się dostawą z portu do drzwi." },
        { q: "Czym jest firma przeprowadzkowa FIDI / IAM?", a: "FIDI to globalny sojusz najlepszych firm przeprowadzek międzynarodowych; jego członkowie muszą przejść niezależny audyt jakości FAIM (obejmujący pakowanie, reklamacje, szkolenie personelu i stabilność finansową) i są ponownie audytowani co trzy lata. IAM to International Association of Movers, największe na świecie stowarzyszenie branży przeprowadzkowej, o podobnych standardach etycznych i operacyjnych. Firma z jedną z tych akredytacji została zweryfikowana przez niezależną stronę trzecią — to nie tylko deklaracje. Arkpol jest firmą z certyfikatem IAMTrusted i działa w sieci FIDI, więc Twoja przeprowadzka spełnia te same standardy niezależnie od tego, czy jesteś osobą prywatną, czy międzynarodową korporacją." },
        { q: "Czy realizowaliście przeprowadzki obiektów o wysokim poziomie bezpieczeństwa i rządowych?", a: "Tak. Przez trzy dekady Arkpol realizował złożone, wymagające szczególnej kontroli przeprowadzki związane z obiektami NATO i rządowymi w kilku krajach — takie, w których dokumentacja, weryfikacja i terminowość nie zostawiają marginesu błędu. Ta sama dyscyplina — skrupulatne formalności, ekipy świadome wymogów bezpieczeństwa i ścisła koordynacja na miejscu — jest wpisana w każdą naszą przeprowadzkę, czy to jednej rodziny, czy wielokrajowego programu firmowego." },
        { q: "Ile kosztuje międzynarodowa przeprowadzka z Europy do USA?", a: "Szczerze — to zależy, ale głównymi czynnikami kosztów są objętość ładunku (metry sześcienne), miasta początkowe i docelowe, fracht morski kontra lotniczy oraz wybrany zakres usługi pakowania. Współdzielony kontener (LCL) dla mieszkania jednopokojowego z Polski zaczyna się zwykle od ok. 2 000–4 000 € łącznie, a pełny kontener 20-stopowy dla większego domu może sięgnąć 6 000–10 000 € i więcej. Do tego dochodzą odprawa celna w USA i opłaty agenta w miejscu docelowym. Jedyny sposób na dokładną kwotę to bezpłatna wizja lokalna lub ocena wideo — poproś o wycenę, a w ciągu 48 godzin przedstawimy ofertę ze stałą ceną." },
      ],
    },
    insights: {
      eyebrow: "Poradnik",
      heading: "Przewodnik po przeprowadzkach.",
      sub: "Praktyczne, konkretne poradniki od ludzi, którzy przeprowadzkami zajmują się zawodowo — abyś planował z pewnością.",
      pillars: [
        { title: "Przeprowadzki firmowe", articles: ["Relokacja pracowników z Polski do Niemiec (poradnik 2026)", "Co dział HR musi wiedzieć o relokacji pracowników w UE", "Jak wybrać firmę przeprowadzkową z certyfikatem IAM"] },
        { title: "Poradniki krajowe", articles: ["Przeprowadzka z Polski do Holandii: czego się spodziewać", "Przeprowadzka do Wielkiej Brytanii po brexicie: cło i przepisy", "Przeprowadzka do Niemiec: poradnik krok po kroku"] },
        { title: "Przeprowadzki specjalistyczne", articles: ["Transport ładunków wrażliwych i o dużej wartości", "Międzynarodowy transport dzieł sztuki i kosztowności", "Przeprowadzka biura domowego za granicę"] },
      ],
      newGuidesBold: "2 nowe poradniki", newGuidesRest: " co miesiąc.", readBlog: "Czytaj blog",
    },
    footer: {
      cta: "Przeprowadzki z pewnością.",
      colCompany: "Firma", colServices: "Usługi", colResources: "Zasoby", colContact: "Kontakt",
      company: ["O nas", "Dlaczego Arkpol", "Nasza sieć", "Poradnik"],
      servicesLinks: ["Przeprowadzki międzynarodowe", "Transport zamorski", "Przeprowadzki firm", "Magazynowanie"],
      resources: ["FAQ", "Realizacje", "RODO", "Blog"],
      phone: "Telefon: na życzenie",
      entities: ["ul. Główna 9a, Nowa Wieś, okolice Warszawy", "Frankfurt nad Menem"],
      members: "Członkostwa",
      copyright: "© 2026 Arkpol Group. Wszelkie prawa zastrzeżone.",
      tagline: "30 lat przeprowadzek w Europie.",
    },
  },

  de: {
    nav: { services: "Leistungen", why: "Warum Arkpol", network: "Netzwerk", faq: "FAQ", insights: "Wissen", quote: "Angebot anfordern" },
    hero: {
      titleA: "Umzug mit", titleAccent: "Gewissheit",
      sub: "Internationale Umzüge, geführt von den Menschen, die dafür geradestehen. Eigene Teams in Mitteleuropa, ein akkreditiertes Netzwerk weltweit und dreißig Jahre Erfahrung darin, alles ans Ziel zu bringen — unversehrt, pünktlich, ohne Drama.",
      ctaQuote: "Angebot anfordern", ctaServices: "Unsere Leistungen",
      marqueeLabel: "Umzüge in Europa — und weltweit — seit 1995",
    },
    statement: {
      eyebrow: "Erfolgsbilanz",
      heading: "Vertraut, wo nichts schiefgehen darf.",
      sub: "Dreißig Jahre Umzüge ohne Spielraum für Fehler — die heiklen, die prominenten und die vermeintlich unmöglichen.",
      proof: [
        { k: "NATO-Standorte", v: "Umzüge in mehreren Ländern" },
        { k: "Premier League", v: "Ibrahimović · Fernandinho" },
        { k: "Venedig", v: "Ein Haushalt, nur über das Wasser" },
      ],
    },
    why: {
      eyebrow: "Warum Arkpol",
      heading: "Keine Umzugsfirma. Ein Logistikstandard.",
      reasons: [
        { title: "Logistik mit Präzision", body: "Drei Jahrzehnte Transport hochwertiger, zeitkritischer und sensibler Güter über Grenzen — jeder Umzug geplant, dokumentiert und nach höchstem Standard ausgeführt. Der komplexe Umzug ist für uns der Normalfall." },
        { title: "Eigene Teams, wo es darauf ankommt", body: "In Mittel- und Osteuropa — unserem Heimatgebiet — wird Ihr Umzug von Anfang bis Ende von Arkpols eigenen Teams abgewickelt, die aus unseren Lägern in Polen und Deutschland kommen. Ein Team, ein Standard, keine Übergabe-Überraschungen." },
        { title: "Akkreditierte Reichweite, weltweit", body: "Wohin Sie auch ziehen, ein geprüftes internationales Netzwerk steht hinter Ihnen. Als IAMTrusted-Umzugsunternehmen, das Hand in Hand mit FIDI-akkreditierten Partnern arbeitet, gilt auf jeder Etappe derselbe akkreditierte Standard — in Europa und darüber hinaus." },
      ],
    },
    network: {
      eyebrow: "Unser Netzwerk",
      heading1: "Zwei Standorte.", heading2: "Ein europäisches Rückgrat.",
      mapAlt: "Arkpols Abdeckung in Europa von den Standorten in Polen und Deutschland",
      cards: [
        { tag: "POLEN", name: "Arkpol PL", address: "Str. Główna 9a, Nowa Wieś — Raum Warschau", capacity: "Lager 2.300 m² · bedient Mittel- und Osteuropa" },
        { tag: "DEUTSCHLAND", name: "Arkpol DE", address: "Frankfurt am Main", capacity: "Lager 1.500 m² · bedient West-, Süd-, Nord- und Mitteleuropa" },
      ],
      legend: [
        "Unsere Standorte — Polen & Deutschland",
        "Mitteleuropa — beide Standorte",
        "Osteuropa — aus Polen",
        "West · Süd · Nord — aus Deutschland",
      ],
      footnote: "Zwei Läger, ein Standard — von Lissabon bis Lemberg läuft jeder Umzug mit denselben Teams und demselben Qualitätsanspruch.",
    },
    numbers: { moves: "Umzüge pro Jahr", years: "Jahre", countries: "Länder", memberships: "Mitgliedschaften", memberOf: "Wir sind Mitglied bei", credential: "IAMX Validated · IAM Trusted Moving Company · EURA Full Member · FEDEMAC Direct Affiliate" },
    services: {
      eyebrow: "Was wir tun",
      heading: "Vier Leistungen. Ein verantwortliches Team.",
      tiles: [
        { title: "Internationale Umzüge (Europa)", description: "Tür zu Tür in der gesamten EU, komplett von einem unserer eigenen Teams abgewickelt — verpackt, transportiert, geliefert." },
        { title: "Überseeversand (See + Luft)", description: "See- und Luftfracht weltweit, inklusive Zoll und Papierkram, damit an der Grenze nichts liegen bleibt." },
        { title: "Firmen- und Büroumzüge", description: "Ganze Büros und Mitarbeiterumzüge auf die Stunde geplant, damit der Betrieb nie ins Stocken gerät." },
        { title: "Lagerung & Aufbewahrung", description: "Sichere, versicherte Lagerung in unseren eigenen Lägern in Polen und Deutschland — für eine Woche oder ein Jahr." },
      ],
      form: {
        heading: "Erzählen Sie uns von Ihrem Umzug",
        sub: "Wohin und ungefähr wann — wir melden uns innerhalb eines Werktags.",
        labels: ["Vollständiger Name", "Unternehmen", "Abgangsstadt", "Zielland", "Voraussichtliches Umzugsdatum"],
        placeholders: ["Max Mustermann", "Acme GmbH", "Warschau", "Deutschland", ""],
        requiredNote: "Pflichtfelder",
        submit: "Angebot erhalten",
        successHeading: "Wir haben Sie auf dem Schirm.",
        successPre: "Danke — wir melden uns innerhalb eines Werktags unter ",
        successPost: ".",
      },
    },
    faq: {
      eyebrow: "Antworten",
      heading: "Klare Antworten, bevor Sie fragen.",
      sub: "Die Fragen, die beim Umzug wirklich zählen — beantwortet ohne Verkaufsgerede.",
      stillHave: "Noch eine Frage? ", requestQuote: "Angebot anfordern", andAsk: " und fragen Sie uns direkt.",
      items: [
        { q: "Wie ziehe ich international von Polen nach Deutschland um?", a: "Arkpol wickelt Ihren Umzug von Polen nach Deutschland von Tür zu Tür mit eigenen, geschulten Teams ab — ohne Subunternehmer. Wir besichtigen Ihr Umzugsgut, packen alles professionell und transportieren es direkt zwischen unseren Lägern in Polen und Deutschland; bei nicht passenden Terminen bieten wir an beiden Enden flexible Lagerung. Unser Team kümmert sich um sämtlichen grenzüberschreitenden Papierkram, damit Sie sich nicht allein durch die EU-Zollverfahren kämpfen müssen. Vom ersten Kontakt bis zur Schlüsselübergabe dauert ein typischer PL–DE-Umzug je nach Umfang 3 bis 7 Tage." },
        { q: "Welche Zertifizierungen sollte ein internationales Umzugsunternehmen haben?", a: "Die zwei anerkannten Branchen-Maßstäbe sind IAM (International Association of Movers) und FEDEMAC (Federation of European Movers Associations). Eine IAM-Mitgliedschaft erfordert strenge Standards bei Versicherung, Team-Schulung und Schadensabwicklung, während FEDEMAC die Einhaltung europäischer grenzüberschreitender Vorschriften sicherstellt. Arkpol verfügt über beide — Ihr Gut ist also durch international anerkannte Haftungsrahmen abgesichert und Sie haben einen formalen Beschwerdeweg, falls etwas schiefgeht." },
        { q: "Wie lange dauert eine internationale Firmenrelokation?", a: "Die Relokation eines einzelnen Mitarbeiters innerhalb Europas dauert in der Regel ein bis zwei Wochen von der Besichtigung bis zur Lieferung, während größere Umzüge oder solche mit Zollabfertigung außerhalb der EU drei bis sechs Wochen dauern können. Die entscheidenden Faktoren sind Umfang, die Einfuhranforderungen des Ziellandes und ob eine Zwischenlagerung nötig ist. Arkpols Team für Firmenrelokationen liefert bereits bei der Besichtigung einen detaillierten Zeitplan, damit sowohl die Personalabteilung als auch der umziehende Mitarbeiter Gewissheit haben." },
        { q: "Kann Umzugsgut per Seefracht aus Polen verschickt werden?", a: "Ja — Arkpol organisiert containerisierte Seefracht für Umzüge aus Polen zu Zielen außerhalb Europas, darunter Nord- und Südamerika, Asien und Afrika. Ihr Gut wird professionell verpackt und in unserem polnischen Lager in einen eigenen oder geteilten Container (LCL) geladen und dann über die großen europäischen Häfen verschifft. Seefracht ist bei großen Mengen über weite Strecken am wirtschaftlichsten, mit Transitzeiten von in der Regel 2 bis 8 Wochen je nach Ziel. Die Zustellung vom Hafen bis zur Tür übernehmen wir am Zielort." },
        { q: "Was ist ein FIDI- / IAM-Umzugsunternehmen?", a: "FIDI ist die globale Allianz erstklassiger internationaler Umzugsunternehmen; ihre Mitglieder müssen das unabhängige FAIM-Qualitätsaudit bestehen (Verpackung, Schadensabwicklung, Personalschulung und finanzielle Stabilität) und werden alle drei Jahre erneut auditiert. IAM ist die International Association of Movers, der weltweit größte Branchenverband, mit ähnlichen ethischen und operativen Standards. Ein Unternehmen mit einer dieser Akkreditierungen wurde von einer unabhängigen Stelle geprüft — nicht nur selbst erklärt. Arkpol ist ein IAMTrusted-Umzugsunternehmen und arbeitet im FIDI-Netzwerk, sodass Ihr Umzug denselben Standards entspricht, ob als Privatperson oder als multinationaler Konzern." },
        { q: "Haben Sie Umzüge an Hochsicherheits- und Regierungsstandorten durchgeführt?", a: "Ja. Über drei Jahrzehnte hat Arkpol komplexe, streng geprüfte Umzüge im Zusammenhang mit NATO- und Regierungsstandorten in mehreren Ländern durchgeführt — Umzüge, bei denen Dokumentation, Überprüfung und Timing keinen Spielraum für Fehler lassen. Dieselbe Disziplin — akribischer Papierkram, sicherheitsbewusste Teams und enge Koordination vor Ort — steckt in jedem Umzug, ob für eine einzelne Familie oder ein länderübergreifendes Firmenprogramm." },
        { q: "Was kostet ein internationaler Umzug von Europa in die USA?", a: "Ehrlich gesagt: Es kommt darauf an — die wichtigsten Kostentreiber sind der Umfang (Kubikmeter), Abgangs- und Zielort, See- gegenüber Luftfracht und der gewählte Verpackungsumfang. Ein geteilter Container (LCL) für eine Ein-Zimmer-Wohnung aus Polen beginnt meist bei rund 2.000–4.000 € all-in, während ein voller 20-Fuß-Container für ein größeres Zuhause 6.000–10.000 € und mehr erreichen kann. Hinzu kommen die US-Zollabfertigung und Gebühren des Zielagenten. Eine genaue Zahl gibt es nur über eine kostenlose Besichtigung oder Video-Einschätzung — fordern Sie ein Angebot an und wir nennen Ihnen innerhalb von 48 Stunden einen Festpreis." },
      ],
    },
    insights: {
      eyebrow: "Wissen",
      heading: "Das Umzugs-Playbook.",
      sub: "Praktische, klare Leitfäden von Profis, die vom Umziehen leben — damit Sie sicher planen können.",
      pillars: [
        { title: "Firmenumzüge", articles: ["Mitarbeiter von Polen nach Deutschland versetzen (Leitfaden 2026)", "Was die Personalabteilung über EU-Mitarbeiterumzüge wissen muss", "Wie man ein IAM-zertifiziertes Umzugsunternehmen wählt"] },
        { title: "Länder-Guides", articles: ["Umzug von Polen in die Niederlande: was Sie erwartet", "Umzug nach Großbritannien nach dem Brexit: Zoll & Regeln", "Umzug nach Deutschland: Schritt-für-Schritt-Guide"] },
        { title: "Spezialumzüge", articles: ["Transport sensibler und hochwertiger Güter", "Kunst und Wertsachen international transportieren", "Ein Homeoffice über Grenzen umziehen"] },
      ],
      newGuidesBold: "2 neue Leitfäden", newGuidesRest: " jeden Monat.", readBlog: "Zum Blog",
    },
    footer: {
      cta: "Umzug mit Gewissheit.",
      colCompany: "Unternehmen", colServices: "Leistungen", colResources: "Ressourcen", colContact: "Kontakt",
      company: ["Über uns", "Warum Arkpol", "Unser Netzwerk", "Wissen"],
      servicesLinks: ["Internationale Umzüge", "Überseeversand", "Firmenumzüge", "Lagerung"],
      resources: ["FAQ", "Referenzen", "DSGVO", "Blog"],
      phone: "Telefon: auf Anfrage",
      entities: ["Str. Główna 9a, Nowa Wieś, Raum Warschau", "Frankfurt am Main"],
      members: "Mitglied",
      copyright: "© 2026 Arkpol Group. Alle Rechte vorbehalten.",
      tagline: "30 Jahre Umzüge in Europa.",
    },
  },
} as const;

export type Messages = (typeof messages)["en"];

const LocaleContext = createContext<{
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: Messages;
}>({ locale: "en", setLocale: () => {}, t: messages.en });

function detect(): Locale {
  if (typeof window === "undefined") return "en";
  try {
    const saved = localStorage.getItem("arkpol_lang");
    if (saved === "en" || saved === "pl" || saved === "de") return saved;
  } catch {}
  const nav = (navigator.language || "en").slice(0, 2).toLowerCase();
  if (nav === "pl") return "pl";
  if (nav === "de") return "de";
  return "en";
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    setLocaleState(detect());
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = (l: Locale) => {
    setLocaleState(l);
    try {
      localStorage.setItem("arkpol_lang", l);
    } catch {}
  };

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t: messages[locale as Locale] as Messages }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}

export function useT(): Messages {
  return useContext(LocaleContext).t;
}
