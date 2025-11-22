// Rozszerzona baza danych świadczeń (30 świadczeń)
 const swiadczeniaDB = [
  {
    id: '500plus',
    nazwa: 'Program Rodzina 500+',
    kategoria: 'Świadczenia rodzinne',
    krotki_opis: 'Świadczenie wychowawcze 500 zł miesięcznie na każde dziecko do 18. roku życia.',
    kogoDotyczy: [
      'Rodziców lub opiekunów prawnych dzieci do ukończenia 18. roku życia.',
      'Obywateli Polski lub osób legalnie przebywających w Polsce.'
    ],
    kwalifikacja: [
      'Obywatel Polski lub osoba legalnie przebywająca w Polsce',
      'Dziecko do ukończenia 18. roku życia',
      'Bez kryterium dochodowego'
    ],
    dokumenty: [
      'Wniosek o świadczenie wychowawcze',
      'Odpis skrócony aktu urodzenia dziecka',
      'Numer rachunku bankowego'
    ],
    kiedyZlozyc: 'W dowolnym czasie po narodzinach dziecka.',
    gdzieZlozyc: [
      'Przez internet na platformie emp@tia, PUE ZUS lub bankowość elektroniczną.',
      'Osobiście w urzędzie gminy/miasta.',
      'Pocztą tradycyjną.'
    ],
    uwagi: 'Świadczenie przysługuje bez kryterium dochodowego. Wniosek można złożyć w dowolnym momencie.',
    link: 'https://www.gov.pl/web/rodzina/swiadczenie-wychowawcze-rodzina-500-plus',
    pdf: 'https://www.gov.pl/attachment/1234567890',
    slowa_kluczowe: ['500+', '500 plus', 'dziecko', 'świadczenie', 'wychowawcze', 'rodzina'],
    ostatnia_aktualizacja: '2024-01-15'
  },
  {
    id: 'dodatek-mieszkaniowy',
    nazwa: 'Dodatek mieszkaniowy',
    kategoria: 'Świadczenia i dodatki mieszkaniowe',
    krotki_opis: 'Wsparcie finansowe na pokrycie części kosztów utrzymania mieszkania dla gospodarstw domowych o niskich dochodach.',
    kogoDotyczy: [
      'Gospodarstw domowych o niskich dochodach.',
      'Najemców, właścicieli lokali lub osób posiadających tytuł prawny do mieszkania.'
    ],
    kwalifikacja: [
      'Dochód gospodarstwa domowego poniżej określonego progu',
      'Posiadanie tytułu prawnego do lokalu',
      'Powierzchnia mieszkania nie przekracza norm'
    ],
    dokumenty: [
      'Wniosek o dodatek mieszkaniowy',
      'Zaświadczenia o dochodach członków gospodarstwa',
      'Dokument potwierdzający tytuł prawny do lokalu',
      'Zaświadczenie o powierzchni mieszkania'
    ],
    kiedyZlozyc: 'W dowolnym czasie w ciągu roku.',
    gdzieZlozyc: [
      'W Wydziale Świadczeń Rodzinnych lub Ośrodku Pomocy Społecznej właściwym ze względu na miejsce zamieszkania.',
      'Pocztą lub osobiście.'
    ],
    uwagi: 'Wysokość dodatku zależy od powierzchni mieszkania, liczby osób w gospodarstwie domowym oraz dochodu.',
    link: 'https://www.gov.pl/web/gov/uzyskaj-dodatek-mieszkaniowy',
    pdf: 'https://www.gov.pl/attachment/dodatek-mieszkaniowy.pdf',
    slowa_kluczowe: ['mieszkanie', 'dodatek', 'czynsz', 'rachunki', 'wynajem', 'niskie dochody'],
    ostatnia_aktualizacja: '2024-02-10'
  },
  {
    id: 'dodatek-oslonowy',
    nazwa: 'Dodatek osłonowy',
    kategoria: 'Świadczenia i dodatki mieszkaniowe',
    krotki_opis: 'Jednorazowe wsparcie finansowe na częściowe pokrycie kosztów zakupu energii elektrycznej, gazu ziemnego lub ciepła.',
    kogoDotyczy: [
      'Gospodarstw domowych spełniających kryterium dochodowe.',
      'Osób, których główne źródło ogrzewania to energia elektryczna, gaz ziemny lub ciepło systemowe.'
    ],
    kwalifikacja: [
      'Gospodarstwo domowe spełniające kryterium dochodowe',
      'Główne źródło ogrzewania: energia elektryczna, gaz ziemny lub ciepło systemowe'
    ],
    dokumenty: [
      'Wniosek o dodatek osłonowy',
      'Zaświadczenia o dochodach',
      'Potwierdzenie źródła ogrzewania'
    ],
    kiedyZlozyc: 'W okresie określonym przez władze lokalne (zazwyczaj w ciągu roku kalendarzowego).',
    gdzieZlozyc: [
      'W urzędzie gminy lub miasta właściwym ze względu na miejsce zamieszkania.',
      'Drogą elektroniczną lub osobiście.'
    ],
    uwagi: 'Dodatek osłonowy jest wypłacany jednorazowo. Wysokość zależy od liczby osób w gospodarstwie domowym.',
    link: 'https://www.gov.pl/web/klimat/dodatek-oslonowy',
    pdf: 'https://www.gov.pl/attachment/dodatek-oslonowy.pdf',
    slowa_kluczowe: ['energia', 'prąd', 'gaz', 'ogrzewanie', 'rachunki', 'osłonowy', 'drożyzna'],
    ostatnia_aktualizacja: '2024-03-01'
  },
  {
    id: 'zasilek-pielegnacyjny',
    nazwa: 'Zasiłek pielęgnacyjny',
    kategoria: 'Świadczenia dla osób z niepełnosprawnościami',
    krotki_opis: 'Świadczenie dla osób niepełnosprawnych lub w wieku emerytalnym wymagających opieki i pomocy innej osoby.',
    kogoDotyczy: [
      'Osób niepełnosprawnych ze znacznym stopniem niepełnosprawności.',
      'Dzieci niepełnosprawnych do 16. roku życia.',
      'Osób w wieku emerytalnym niezdolnych do samodzielnej egzystencji.'
    ],
    kwalifikacja: [
      'Osoba niepełnosprawna ze znacznym stopniem niepełnosprawności',
      'Dziecko niepełnosprawne do 16. roku życia',
      'Osoba w wieku emerytalnym niezdolna do samodzielnej egzystencji'
    ],
    dokumenty: [
      'Wniosek o zasiłek pielęgnacyjny',
      'Orzeczenie o niepełnosprawności lub niezdolności do samodzielnej egzystencji',
      'Dokument tożsamości'
    ],
    kiedyZlozyc: 'W dowolnym czasie.',
    gdzieZlozyc: [
      'W urzędzie gminy/miasta właściwym ze względu na miejsce zamieszkania.',
      'Przez internet (w niektórych urzędach).',
      'Pocztą lub osobiście.'
    ],
    uwagi: 'Zasiłek pielęgnacyjny przysługuje bez względu na dochód. Wysokość świadczenia jest stała.',
    link: 'https://www.gov.pl/web/rodzina/zasilek-pielegnacyjny',
    pdf: 'https://www.gov.pl/attachment/zasilek-pielegnacyjny.pdf',
    slowa_kluczowe: ['zasiłek', 'pielęgnacyjny', 'niepełnosprawność', 'opieka', 'senior', 'emeryt'],
    ostatnia_aktualizacja: '2024-01-20'
  },
  {
    id: 'swiadczenie-wspierajace',
    nazwa: 'Świadczenie wspierające',
    kategoria: 'Świadczenia dla osób z niepełnosprawnościami',
    krotki_opis: 'Nowe świadczenie dla osób z niepełnosprawnościami, które zastępuje dotychczasowe świadczenia opiekuńcze.',
    kogoDotyczy: [
      'Osób z niepełnosprawnością w wieku od 18. roku życia.',
      'Osób posiadających decyzję ustalającą poziom potrzeby wsparcia.'
    ],
    kwalifikacja: [
      'Osoba z niepełnosprawnością w wieku od 18. roku życia',
      'Decyzja ustalająca poziom potrzeby wsparcia'
    ],
    dokumenty: [
      'Wniosek o świadczenie wspierające',
      'Orzeczenie o niepełnosprawności',
      'Wyniki oceny poziomu potrzeby wsparcia'
    ],
    kiedyZlozyc: 'W dowolnym czasie po uzyskaniu orzeczenia o niepełnosprawności.',
    gdzieZlozyc: [
      'W Zakładzie Ubezpieczeń Społecznych (ZUS).',
      'Przez Platformę Usług Elektronicznych (PUE ZUS).',
      'Osobiście, pocztą lub elektronicznie.'
    ],
    uwagi: 'Świadczenie wspierające jest nowym rozwiązaniem, które zastępuje poprzednie formy pomocy. Wysokość świadczenia uzależniona jest od poziomu potrzeby wsparcia.',
    link: 'https://www.gov.pl/web/rodzina/swiadczenie-wspierajace',
    pdf: 'https://www.gov.pl/attachment/swiadczenie-wspierajace.pdf',
    slowa_kluczowe: ['wsparcie', 'niepełnosprawność', 'świadczenie', 'opieka', 'nowe'],
    ostatnia_aktualizacja: '2024-01-01'
  },
  {
    id: 'bon-energetyczny',
    nazwa: 'Bon energetyczny',
    kategoria: 'Świadczenia i dodatki mieszkaniowe',
    krotki_opis: 'Jednorazowe wsparcie finansowe dla gospodarstw domowych o niższych dochodach na pokrycie kosztów energii.',
    kogoDotyczy: [
      'Gospodarstw domowych o niższych dochodach.',
      'Osób, których dochód na osobę nie przekracza ustawowego progu.'
    ],
    kwalifikacja: [
      'Dochód na osobę poniżej 2500 zł (gospodarstwo jednoosobowe) lub 1700 zł (gospodarstwo wieloosobowe)',
      'Główne źródło ogrzewania'
    ],
    dokumenty: [
      'Wniosek o bon energetyczny',
      'Zaświadczenia o dochodach wszystkich członków gospodarstwa'
    ],
    kiedyZlozyc: 'W terminie określonym przez gminę (zazwyczaj w ciągu roku).',
    gdzieZlozyc: [
      'W urzędzie gminy lub miasta.',
      'Drogą elektroniczną lub osobiście.'
    ],
    uwagi: 'Bon energetyczny to jednorazowe wsparcie. Wysokość bonu zależy od liczby osób w gospodarstwie domowym.',
    link: 'https://www.gov.pl/web/klimat/bon-energetyczny',
    pdf: null,
    slowa_kluczowe: ['bon', 'energia', 'energetyczny', 'prąd', 'wsparcie', 'dochody'],
    ostatnia_aktualizacja: '2024-02-15'
  },
  {
    id: 'zasilek-rodzinny',
    nazwa: 'Zasiłek rodzinny',
    kategoria: 'Świadczenia rodzinne',
    krotki_opis: 'Świadczenie dla rodzin z dziećmi, uzależnione od kryterium dochodowego.',
    kogoDotyczy: [
      'Rodzin z dziećmi do ukończenia 18. roku życia lub 24. roku życia (jeśli dziecko się uczy).',
      'Rodzin, których dochód na osobę nie przekracza ustawowego progu.'
    ],
    kwalifikacja: [
      'Dochód na osobę w rodzinie nie przekracza 674 zł',
      'Dziecko do ukończenia 18. roku życia lub nauki (max 24 lata)'
    ],
    dokumenty: [
      'Wniosek o zasiłek rodzinny',
      'Zaświadczenia o dochodach',
      'Odpisy aktów urodzenia dzieci',
      'Zaświadczenie ze szkoły (jeśli dziecko powyżej 18 lat)'
    ],
    kiedyZlozyc: 'Od 1 lipca do 31 października (na nowy okres świadczeniowy) lub w dowolnym czasie w ciągu roku.',
    gdzieZlozyc: [
      'W urzędzie gminy/miasta właściwym ze względu na miejsce zamieszkania.',
      'Przez internet (np. emp@tia, PUE ZUS).',
      'Osobiście lub pocztą.'
    ],
    uwagi: 'Zasiłek rodzinny jest przyznawany na okres świadczeniowy (od 1 listopada do 31 października roku następnego).',
    link: 'https://www.gov.pl/web/rodzina/zasilek-rodzinny',
    pdf: 'https://www.gov.pl/attachment/zasilek-rodzinny.pdf',
    slowa_kluczowe: ['zasiłek', 'rodzinny', 'dzieci', 'dochody', 'świadczenie'],
    ostatnia_aktualizacja: '2024-01-10'
  },
  {
    id: 'becikowe',
    nazwa: 'Becikowe (Jednorazowa zapomoga z tytułu urodzenia dziecka)',
    kategoria: 'Świadczenia rodzinne',
    krotki_opis: 'Jednorazowa zapomoga w wysokości 1000 zł z tytułu urodzenia dziecka.',
    kogoDotyczy: [
      'Rodziców, którzy pozostawali pod opieką medyczną nie później niż od 10. tygodnia ciąży.',
      'Rodzin spełniających kryterium dochodowe.'
    ],
    kwalifikacja: [
      'Dochód na osobę w rodzinie nie przekracza 1922 zł',
      'Pozostawanie pod opieką medyczną nie później niż od 10. tygodnia ciąży'
    ],
    dokumenty: [
      'Wniosek o jednorazową zapomogę',
      'Zaświadczenie lekarskie o pozostawaniu pod opieką',
      'Akt urodzenia dziecka',
      'Zaświadczenia o dochodach'
    ],
    kiedyZlozyc: 'W ciągu 12 miesięcy od dnia narodzin dziecka.',
    gdzieZlozyc: [
      'W urzędzie gminy/miasta.',
      'Przez internet (emp@tia, PUE ZUS).',
      'Osobiście lub pocztą.'
    ],
    uwagi: 'Becikowe to jednorazowa zapomoga. Wymaga wcześniejszej opieki medycznej nad ciążą.',
    link: 'https://www.gov.pl/web/rodzina/jednorazowa-zapomoga-z-tytulu-urodzenia-dziecka',
    pdf: 'https://www.gov.pl/attachment/becikowe.pdf',
    slowa_kluczowe: ['becikowe', 'urodzenie', 'dziecko', 'zapomoga', 'ciąża', 'noworodek'],
    ostatnia_aktualizacja: '2024-01-05'
  },
  {
    id: 'kosiniakowe',
    nazwa: 'Kosiniakowe (Świadczenie rodzicielskie)',
    kategoria: 'Świadczenia rodzinne',
    krotki_opis: 'Świadczenie rodzicielskie w wysokości 1000 zł miesięcznie dla rodziców korzystających z urlopu rodzicielskiego.',
    kogoDotyczy: [
      'Rodziców, którzy nie podejmują pracy w okresie pobierania świadczenia.',
      'Osób sprawujących opiekę nad nowo narodzonym dzieckiem.'
    ],
    kwalifikacja: [
      'Zgłoszenie urodzenia dziecka do USC',
      'Niepodejmowanie pracy w okresie pobierania świadczenia',
      'Bez kryterium dochodowego'
    ],
    dokumenty: [
      'Wniosek o świadczenie rodzicielskie',
      'Akt urodzenia dziecka',
      'Oświadczenie o niepodejmowaniu pracy'
    ],
    kiedyZlozyc: 'W ciągu 3 miesięcy od dnia narodzin dziecka (dla pełnego okresu świadczenia).',
    gdzieZlozyc: [
      'W urzędzie gminy/miasta.',
      'Przez internet (emp@tia).',
      'Osobiście lub pocztą.'
    ],
    uwagi: 'Świadczenie wypłacane przez maksymalnie 12 miesięcy. Wymaga niezatrudniania się w okresie pobierania.',
    link: 'https://www.gov.pl/web/rodzina/swiadczenie-rodzicielskie',
    pdf: 'https://www.gov.pl/attachment/kosiniakowe.pdf',
    slowa_kluczowe: ['kosiniakowe', 'rodzicielskie', 'urlop', 'macierzyński', 'ojcowski', 'noworodek'],
    ostatnia_aktualizacja: '2024-02-01'
  },
  {
    id: 'zasilek-dla-bezrobotnych',
    nazwa: 'Zasiłek dla bezrobotnych',
    kategoria: 'Świadczenia z urzędu pracy',
    krotki_opis: 'Świadczenie dla osób bezrobotnych zarejestrowanych w urzędzie pracy.',
    kogoDotyczy: [
      'Osób bezrobotnych zarejestrowanych w urzędzie pracy.',
      'Osób posiadających odpowiedni staż pracy (365 dni w ostatnich 18 miesiącach).'
    ],
    kwalifikacja: [
      'Rejestracja w urzędzie pracy jako osoba bezrobotna',
      'Posiadanie odpowiedniego stażu pracy (365 dni w ostatnich 18 miesiącach)',
      'Niepodejmowanie pracy zarobkowej'
    ],
    dokumenty: [
      'Wniosek o zasiłek dla bezrobotnych',
      'Świadectwa pracy lub inne dokumenty potwierdzające zatrudnienie',
      'Dokument potwierdzający rozwiązanie umowy o pracę'
    ],
    kiedyZlozyc: 'W ciągu 7 dni od momentu utraty pracy.',
    gdzieZlozyc: [
      'W powiatowym urzędzie pracy właściwym ze względu na miejsce zameldowania.',
      'Osobiście lub za pośrednictwem platformy praca.gov.pl.'
    ],
    uwagi: 'Zasiłek przyznawany jest na czas określony (do 180 dni). Wymaga aktywnego poszukiwania pracy.',
    link: 'https://www.gov.pl/web/rodzina/zasilek-dla-bezrobotnych',
    pdf: 'https://www.gov.pl/attachment/zasilek-bezrobotnych.pdf',
    slowa_kluczowe: ['bezrobotny', 'zasiłek', 'praca', 'zwolnienie', 'urząd pracy'],
    ostatnia_aktualizacja: '2024-02-20'
  },
  {
    id: 'karta-duzej-rodziny',
    nazwa: 'Karta Dużej Rodziny',
    kategoria: 'Świadczenia specjalne i jednorazowe',
    krotki_opis: 'Program zniżek i ulg dla rodzin z co najmniej trójką dzieci.',
    kogoDotyczy: [
      'Rodzin z co najmniej trójką dzieci.',
      'Dzieci do 18. roku życia lub do 25. roku życia (uczące się).'
    ],
    kwalifikacja: [
      'Rodzina z co najmniej trójką dzieci',
      'Dzieci do 18. roku życia lub do 25. roku (uczące się)'
    ],
    dokumenty: [
      'Wniosek o Kartę Dużej Rodziny',
      'Odpisy aktów urodzenia dzieci',
      'Zaświadczenia ze szkoły (dla dzieci powyżej 18 lat)'
    ],
    kiedyZlozyc: 'W dowolnym czasie.',
    gdzieZlozyc: [
      'W urzędzie gminy/miasta.',
      'Przez internet (emp@tia).',
      'Osobiście lub drogą elektroniczną.'
    ],
    uwagi: 'Karta Dużej Rodziny uprawnia do licznych zniżek i ulg w różnych instytucjach.',
    link: 'https://www.gov.pl/web/rodzina/karta-duzej-rodziny',
    pdf: 'https://www.gov.pl/attachment/kdr.pdf',
    slowa_kluczowe: ['karta', 'duża rodzina', 'zniżki', 'ulgi', 'trójka dzieci', '3+'],
    ostatnia_aktualizacja: '2024-01-15'
  },
  {
    id: 'dobry-start',
    nazwa: 'Dobry Start (300+)',
    kategoria: 'Świadczenia edukacyjne',
    krotki_opis: 'Jednorazowe świadczenie 300 zł na wyprawkę szkolną dla ucznia.',
    kogoDotyczy: [
      'Uczniów rozpoczynających lub kontynuujących naukę w szkole.',
      'Rodzin bez kryterium dochodowego.'
    ],
    kwalifikacja: [
      'Dziecko uczęszczające do szkoły',
      'Bez kryterium dochodowego',
      'Raz w roku szkolnym'
    ],
    dokumenty: [
      'Wniosek o świadczenie Dobry Start',
      'Numer PESEL dziecka'
    ],
    kiedyZlozyc: 'Od 1 lipca do 30 listopada (na dany rok szkolny).',
    gdzieZlozyc: [
      'Przez internet (emp@tia, PUE ZUS, bankowość elektroniczna).',
      'W urzędzie gminy/miasta.',
      'Osobiście lub drogą elektroniczną.'
    ],
    uwagi: 'Świadczenie Dobry Start (300+) przysługuje raz w roku szkolnym bez względu na dochód.',
    link: 'https://www.gov.pl/web/rodzina/dobry-start-300-plus',
    pdf: 'https://www.gov.pl/attachment/dobry-start.pdf',
    slowa_kluczowe: ['300+', 'dobry start', 'szkoła', 'wyprawka', 'uczeń', 'wrzesień'],
    ostatnia_aktualizacja: '2024-08-01'
  },
  {
    id: 'alimenty',
    nazwa: 'Świadczenia z funduszu alimentacyjnego',
    kategoria: 'Świadczenia rodzinne',
    krotki_opis: 'Wsparcie dla dzieci, których rodzic nie płaci alimentów.',
    kogoDotyczy: [
      'Dzieci do 18. roku życia (lub 25. roku - jeśli się uczą).',
      'Rodzin prowadzących egzekucję alimentów od dłużnika.'
    ],
    kwalifikacja: [
      'Dziecko do 18. roku życia (lub 25. roku - jeśli uczy się)',
      'Egzekucja alimentów od dłużnika alimentacyjnego',
      'Dochód rodziny poniżej 1209 zł na osobę'
    ],
    dokumenty: [
      'Wniosek o świadczenia z funduszu alimentacyjnego',
      'Odpis wyroku zasądzającego alimenty',
      'Zaświadczenie o prowadzeniu egzekucji',
      'Zaświadczenia o dochodach'
    ],
    kiedyZlozyc: 'W dowolnym czasie w trakcie roku.',
    gdzieZlozyc: [
      'W urzędzie gminy/miasta.',
      'Przez internet (emp@tia).',
      'Osobiście lub pocztą.'
    ],
    uwagi: 'Świadczenia z funduszu alimentacyjnego wypłacane są w przypadku bezskutecznej egzekucji alimentów.',
    link: 'https://www.gov.pl/web/rodzina/fundusz-alimentacyjny',
    pdf: 'https://www.gov.pl/attachment/alimenty.pdf',
    slowa_kluczowe: ['alimenty', 'fundusz', 'alimentacyjny', 'egzekucja', 'dłużnik'],
    ostatnia_aktualizacja: '2024-01-25'
  },
  {
    id: 'zasilek-chorobowy',
    nazwa: 'Zasiłek chorobowy',
    kategoria: 'Świadczenia zdrowotne',
    krotki_opis: 'Świadczenie za okres niezdolności do pracy z powodu choroby.',
    kogoDotyczy: [
      'Osób ubezpieczonych w ZUS.',
      'Pracowników, którzy są niezdolni do pracy z powodu choroby.'
    ],
    kwalifikacja: [
      'Osoba ubezpieczona w ZUS',
      'Niezdolność do pracy potwierdzona zwolnieniem lekarskim',
      'Minimalny okres ubezpieczenia (90 dni)'
    ],
    dokumenty: [
      'Zwolnienie lekarskie (e-ZLA)',
      'Wniosek o zasiłek chorobowy'
    ],
    kiedyZlozyc: 'Automatycznie po otrzymaniu zwolnienia lekarskiego (e-ZLA).',
    gdzieZlozyc: [
      'ZUS automatycznie otrzymuje informację o zwolnieniu lekarskim.',
      'Wniosek można złożyć przez PUE ZUS lub osobiście w ZUS.'
    ],
    uwagi: 'Zasiłek chorobowy wynosi 80% podstawy wymiaru (100% w przypadku wypadku przy pracy). Wypłacany od 34. dnia choroby.',
    link: 'https://www.zus.pl/swiadczenia/zasilki/zasilek-chorobowy',
    pdf: 'https://www.zus.pl/documents/zasilek-chorobowy.pdf',
    slowa_kluczowe: ['zasiłek', 'chorobowy', 'choroba', 'zwolnienie', 'L4', 'ZUS'],
    ostatnia_aktualizacja: '2024-02-05'
  },
  {
    id: 'zasilek-macierzynski',
    nazwa: 'Zasiłek macierzyński',
    kategoria: 'Świadczenia zdrowotne',
    krotki_opis: 'Świadczenie za okres urlopu macierzyńskiego, rodzicielskiego i ojcowskiego.',
    kogoDotyczy: [
      'Osób ubezpieczonych w ZUS przebywających na urlopie macierzyńskim, rodzicielskim lub ojcowskim.',
      'Rodziców nowo narodzonych dzieci.'
    ],
    kwalifikacja: [
      'Osoba ubezpieczona w ZUS',
      'Urlop macierzyński/rodzicielski/ojcowski',
      'Zgłoszenie urodzenia dziecka'
    ],
    dokumenty: [
      'Wniosek o zasiłek macierzyński',
      'Akt urodzenia dziecka',
      'Zaświadczenie o okresie urlopu'
    ],
    kiedyZlozyc: 'Bezpośrednio przed lub po urodzeniu dziecka.',
    gdzieZlozyc: [
      'W ZUS przez PUE ZUS lub osobiście.',
      'U pracodawcy (w przypadku pracowników).'
    ],
    uwagi: 'Zasiłek macierzyński wynosi 100% podstawy wymiaru. Okres urlopu zależy od liczby dzieci urodzonych przy jednym porodzie.',
    link: 'https://www.zus.pl/swiadczenia/zasilki/zasilek-macierzynski',
    pdf: 'https://www.zus.pl/documents/zasilek-macierzynski.pdf',
    slowa_kluczowe: ['macierzyński', 'urlop', 'ciąża', 'poród', 'dziecko', 'ZUS', 'rodzicielski', 'ojcowski'],
    ostatnia_aktualizacja: '2024-02-10'
  },
  {
    id: 'zasilek-opiekunczy',
    nazwa: 'Zasiłek opiekuńczy',
    kategoria: 'Świadczenia rodzinne',
    krotki_opis: 'Świadczenie za okres sprawowania opieki nad chorym członkiem rodziny.',
    kogoDotyczy: [
      'Osób ubezpieczonych w ZUS, które muszą sprawować opiekę nad chorym członkiem rodziny.',
      'Rodziców dzieci wymagających opieki z powodu choroby.'
    ],
    kwalifikacja: [
      'Osoba ubezpieczona w ZUS',
      'Konieczność osobistego sprawowania opieki nad chorym',
      'Zaświadczenie lekarskie o konieczności opieki'
    ],
    dokumenty: [
      'Wniosek o zasiłek opiekuńczy',
      'Zaświadczenie lekarskie o konieczności opieki'
    ],
    kiedyZlozyc: 'Po otrzymaniu zaświadczenia lekarskiego o potrzebie opieki.',
    gdzieZlozyc: [
      'W ZUS przez PUE ZUS.',
      'U pracodawcy (w przypadku pracowników).'
    ],
    uwagi: 'Zasiłek opiekuńczy przysługuje przez maksymalnie 60 dni w roku kalendarzowym (14 dni na dziecko do 2 lat).',
    link: 'https://www.zus.pl/swiadczenia/zasilki/zasilek-opiekunczy',
    pdf: 'https://www.zus.pl/documents/zasilek-opiekunczy.pdf',
    slowa_kluczowe: ['opiekuńczy', 'opieka', 'dziecko', 'chore', 'ZUS', 'zasiłek'],
    ostatnia_aktualizacja: '2024-02-01'
  },
  {
    id: 'emerytura',
    nazwa: 'Emerytura',
    kategoria: 'Świadczenia dla seniorów',
    krotki_opis: 'Świadczenie emerytalne dla osób, które osiągnęły wiek emerytalny.',
    kogoDotyczy: [
      'Osób, które osiągnęły wiek emerytalny (60 lat dla kobiet, 65 lat dla mężczyzn).',
      'Osób posiadających odpowiedni staż ubezpieczeniowy.'
    ],
    kwalifikacja: [
      'Wiek emerytalny: 60 lat (kobiety), 65 lat (mężczyźni)',
      'Odpowiedni staż ubezpieczeniowy'
    ],
    dokumenty: [
      'Wniosek o emeryturę',
      'Dokumenty potwierdzające okresy zatrudnienia',
      'Dowód osobisty'
    ],
    kiedyZlozyc: 'Nie wcześniej niż na 30 dni przed osiągnięciem wieku emerytalnego.',
    gdzieZlozyc: [
      'W ZUS przez PUE ZUS.',
      'Osobiście w oddziale ZUS.',
      'Pocztą.'
    ],
    uwagi: 'Wysokość emerytury zależy od zgromadzonego kapitału i średniego dalszego trwania życia.',
    link: 'https://www.zus.pl/swiadczenia/emerytury-i-renty/emerytura',
    pdf: 'https://www.zus.pl/documents/emerytura.pdf',
    slowa_kluczowe: ['emerytura', 'wiek emerytalny', 'senior', 'ZUS', 'staż'],
    ostatnia_aktualizacja: '2024-01-30'
  },
  {
    id: 'renta',
    nazwa: 'Renta z tytułu niezdolności do pracy',
    kategoria: 'Świadczenia dla osób z niepełnosprawnościami',
    krotki_opis: 'Świadczenie dla osób niezdolnych do pracy z powodu stanu zdrowia.',
    kogoDotyczy: [
      'Osób z orzeczeniem o całkowitej lub częściowej niezdolności do pracy.',
      'Osób, których niezdolność do pracy powstała w okresie ubezpieczenia.'
    ],
    kwalifikacja: [
      'Orzeczenie o całkowitej lub częściowej niezdolności do pracy',
      'Odpowiedni okres ubezpieczenia',
      'Niezdolność powstała w okresie ubezpieczenia'
    ],
    dokumenty: [
      'Wniosek o rentę',
      'Dokumentacja medyczna',
      'Dokumenty potwierdzające okresy ubezpieczenia'
    ],
    kiedyZlozyc: 'Po otrzymaniu orzeczenia o niezdolności do pracy.',
    gdzieZlozyc: [
      'W ZUS przez PUE ZUS.',
      'Osobiście w oddziale ZUS.',
      'Pocztą.'
    ],
    uwagi: 'Renta może być przyznana na stałe lub okresowo. Wysokość zależy od zgromadzonego kapitału i stopnia niezdolności.',
    link: 'https://www.zus.pl/swiadczenia/emerytury-i-renty/renta-z-tytulu-niezdolnosci-do-pracy',
    pdf: 'https://www.zus.pl/documents/renta.pdf',
    slowa_kluczowe: ['renta', 'niezdolność', 'praca', 'orzeczenie', 'ZUS', 'choroba'],
    ostatnia_aktualizacja: '2024-02-12'
  },
  {
    id: 'dofinansowanie-turnusu',
    nazwa: 'Dofinansowanie turnusu rehabilitacyjnego',
    kategoria: 'Świadczenia dla osób z niepełnosprawnościami',
    krotki_opis: 'Wsparcie finansowe na turnus rehabilitacyjny dla osób niepełnosprawnych.',
    kogoDotyczy: [
      'Osób niepełnosprawnych z orzeczeniem.',
      'Osób wymagających rehabilitacji na skierowanie lekarskie.'
    ],
    kwalifikacja: [
      'Orzeczenie o niepełnosprawności',
      'Skierowanie lekarskie na rehabilitację',
      'Dochód rodziny poniżej określonego progu'
    ],
    dokumenty: [
      'Wniosek o dofinansowanie',
      'Orzeczenie o niepełnosprawności',
      'Skierowanie lekarskie',
      'Zaświadczenia o dochodach'
    ],
    kiedyZlozyc: 'W dowolnym czasie, w zależności od dostępności środków PFRON.',
    gdzieZlozyc: [
      'W Powiatowym Centrum Pomocy Rodzinie (PCPR).',
      'Osobiście lub drogą elektroniczną.'
    ],
    uwagi: 'Dofinansowanie zależy od dochodu i może pokryć część lub całość kosztów turnusu.',
    link: 'https://www.pfron.org.pl/turnus-rehabilitacyjny',
    pdf: 'https://www.pfron.org.pl/documents/turnus.pdf',
    slowa_kluczowe: ['turnus', 'rehabilitacja', 'niepełnosprawność', 'sanatorium', 'PFRON'],
    ostatnia_aktualizacja: '2024-03-01'
  },
  {
    id: 'likwidacja-barier',
    nazwa: 'Dofinansowanie likwidacji barier architektonicznych',
    kategoria: 'Świadczenia dla osób z niepełnosprawnościami',
    krotki_opis: 'Wsparcie na dostosowanie mieszkania do potrzeb osoby niepełnosprawnej.',
    kogoDotyczy: [
      'Osób niepełnosprawnych posiadających tytuł prawny do lokalu.',
      'Osób wymagających dostosowania mieszkania do swoich potrzeb.'
    ],
    kwalifikacja: [
      'Orzeczenie o niepełnosprawności',
      'Posiadanie tytułu prawnego do lokalu',
      'Dochód rodziny poniżej określonego progu'
    ],
    dokumenty: [
      'Wniosek o dofinansowanie',
      'Orzeczenie o niepełnosprawności',
      'Kosztorys prac',
      'Dokument potwierdzający tytuł prawny do lokalu'
    ],
    kiedyZlozyc: 'W dowolnym czasie, najlepiej przed rozpoczęciem prac.',
    gdzieZlozyc: [
      'W Powiatowym Centrum Pomocy Rodzinie (PCPR).',
      'Osobiście lub pocztą.'
    ],
    uwagi: 'Dofinansowanie może obejmować adaptację łazienki, montaż wind, podjazdów itp.',
    link: 'https://www.pfron.org.pl/likwidacja-barier',
    pdf: 'https://www.pfron.org.pl/documents/bariery.pdf',
    slowa_kluczowe: ['bariery', 'architektoniczne', 'mieszkanie', 'adaptacja', 'niepełnosprawność', 'PFRON'],
    ostatnia_aktualizacja: '2024-02-15'
  },
  {
    id: 'dofinansowanie-sprzetu',
    nazwa: 'Dofinansowanie zakupu sprzętu rehabilitacyjnego',
    kategoria: 'Świadczenia dla osób z niepełnosprawnościami',
    krotki_opis: 'Wsparcie na zakup wózka inwalidzkiego, protezy, aparatu słuchowego i innego sprzętu.',
    kogoDotyczy: [
      'Osób niepełnosprawnych wymagających sprzętu rehabilitacyjnego.',
      'Osób posiadających zlecenie lekarskie na konkretny sprzęt.'
    ],
    kwalifikacja: [
      'Orzeczenie o niepełnosprawności',
      'Zlecenie lekarskie na sprzęt',
      'Dochód rodziny poniżej określonego progu'
    ],
    dokumenty: [
      'Wniosek o dofinansowanie',
      'Orzeczenie o niepełnosprawności',
      'Zlecenie lekarskie',
      'Oferta/faktura proforma'
    ],
    kiedyZlozyc: 'W dowolnym czasie, przed zakupem sprzętu.',
    gdzieZlozyc: [
      'W Powiatowym Centrum Pomocy Rodzinie (PCPR).',
      'Osobiście lub drogą elektroniczną.'
    ],
    uwagi: 'Dofinansowanie może pokryć część lub całość kosztów sprzętu rehabilitacyjnego.',
    link: 'https://www.pfron.org.pl/sprzet-rehabilitacyjny',
    pdf: 'https://www.pfron.org.pl/documents/sprzet.pdf',
    slowa_kluczowe: ['sprzęt', 'rehabilitacyjny', 'wózek', 'proteza', 'aparat', 'PFRON'],
    ostatnia_aktualizacja: '2024-02-20'
  },
  {
    id: 'dofinansowanie-studiow',
    nazwa: 'Dofinansowanie kształcenia studentów niepełnosprawnych',
    kategoria: 'Świadczenia edukacyjne',
    krotki_opis: 'Wsparcie dla studentów z niepełnosprawnościami na pokrycie kosztów kształcenia.',
    kogoDotyczy: [
      'Studentów uczelni wyższych z orzeczeniem o niepełnosprawności.',
      'Osób aktywnie studiujących i potrzebujących wsparcia.'
    ],
    kwalifikacja: [
      'Student uczelni wyższej',
      'Orzeczenie o niepełnosprawności',
      'Aktywne studiowanie'
    ],
    dokumenty: [
      'Wniosek o dofinansowanie',
      'Orzeczenie o niepełnosprawności',
      'Zaświadczenie z uczelni'
    ],
    kiedyZlozyc: 'Na początku roku akademickiego lub semestru.',
    gdzieZlozyc: [
      'W biurze ds. osób niepełnosprawnych na uczelni.',
      'W PFRON lub Powiatowym Centrum Pomocy Rodzinie.'
    ],
    uwagi: 'Dofinansowanie może obejmować zakup materiałów dydaktycznych, sprzętu, czy pomoc asystenta.',
    link: 'https://www.pfron.org.pl/studenci',
    pdf: 'https://www.pfron.org.pl/documents/studenci.pdf',
    slowa_kluczowe: ['studia', 'student', 'niepełnosprawność', 'nauka', 'uczelnia', 'PFRON'],
    ostatnia_aktualizacja: '2024-01-20'
  },
  {
    id: 'program-czyste-powietrze',
    nazwa: 'Program Czyste Powietrze',
    kategoria: 'Świadczenia specjalne i jednorazowe',
    krotki_opis: 'Dofinansowanie wymiany źródła ciepła i termomodernizacji domów jednorodzinnych.',
    kogoDotyczy: [
      'Właścicieli lub współwłaścicieli budynków jednorodzinnych.',
      'Osób chcących wymienić źródło ogrzewania lub przeprowadzić termomodernizację.'
    ],
    kwalifikacja: [
      'Właściciel lub współwłaściciel budynku jednorodzinnego',
      'Dochód gospodarstwa domowego poniżej określonego progu (dla wyższej dotacji)'
    ],
    dokumenty: [
      'Wniosek o dofinansowanie',
      'Dokument potwierdzający tytuł prawny do nieruchomości',
      'Audyt energetyczny (w niektórych przypadkach)',
      'Oferty/faktury za wykonane prace'
    ],
    kiedyZlozyc: 'W dowolnym czasie, w zależności od dostępności środków.',
    gdzieZlozyc: [
      'Przez platformę online programu Czyste Powietrze.',
      'W punkcie konsultacyjno-informacyjnym programu.'
    ],
    uwagi: 'Wysokość dofinansowania zależy od dochodu i rodzaju inwestycji. Możliwa ulga do 69 000 zł.',
    link: 'https://www.gov.pl/web/nfosigw/czyste-powietrze',
    pdf: 'https://www.nfosigw.gov.pl/documents/czyste-powietrze.pdf',
    slowa_kluczowe: ['czyste powietrze', 'ogrzewanie', 'węgiel', 'pompa ciepła', 'termomodernizacja', 'dom'],
    ostatnia_aktualizacja: '2024-03-10'
  },
  {
    id: 'moj-prad',
    nazwa: 'Program Mój Prąd',
    kategoria: 'Świadczenia specjalne i jednorazowe',
    krotki_opis: 'Dofinansowanie instalacji fotowoltaicznych w domach jednorodzinnych.',
    kogoDotyczy: [
      'Właścicieli budynków jednorodzinnych.',
      'Osób chcących zainstalować panele fotowoltaiczne.'
    ],
    kwalifikacja: [
      'Właściciel budynku jednorodzinnego',
      'Instalacja fotowoltaiczna o mocy od 2 do 10 kW'
    ],
    dokumenty: [
      'Wniosek o dofinansowanie',
      'Dokument potwierdzający tytuł prawny',
      'Faktura za instalację',
      'Protokół odbioru instalacji'
    ],
    kiedyZlozyc: 'Po zakończeniu instalacji, w ramach dostępnego naboru.',
    gdzieZlozyc: [
      'Przez platformę online NFOŚiGW.',
      'Zgodnie z instrukcjami programu.'
    ],
    uwagi: 'Dofinansowanie może wynieść do 6000 zł. Sprawdź dostępność środków przed złożeniem wniosku.',
    link: 'https://www.gov.pl/web/nfosigw/moj-prad',
    pdf: 'https://www.nfosigw.gov.pl/documents/moj-prad.pdf',
    slowa_kluczowe: ['fotowoltaika', 'panele', 'słoneczne', 'prąd', 'energia', 'odnawialna'],
    ostatnia_aktualizacja: '2024-02-25'
  },
  {
    id: 'ulga-termomodernizacyjna',
    nazwa: 'Ulga termomodernizacyjna',
    kategoria: 'Świadczenia specjalne i jednorazowe',
    krotki_opis: 'Odliczenie wydatków na termomodernizację budynku mieszkalnego od podstawy opodatkowania.',
    kogoDotyczy: [
      'Właścicieli lub współwłaścicieli budynków jednorodzinnych.',
      'Osób, które poniosły wydatki na termomodernizację.'
    ],
    kwalifikacja: [
      'Właściciel lub współwłaściciel budynku jednorodzinnego',
      'Wydatki poniesione na termomodernizację',
      'Maksymalne odliczenie: 53 000 zł'
    ],
    dokumenty: [
      'Faktury za wykonane prace',
      'Zeznanie podatkowe PIT',
      'Dokument potwierdzający własność nieruchomości'
    ],
    kiedyZlozyc: 'W zeznaniu podatkowym PIT za rok, w którym poniesiono wydatki.',
    gdzieZlozyc: [
      'W ramach rocznego zeznania podatkowego PIT.',
      'Przez platformę e-Deklaracje lub w urzędzie skarbowym.'
    ],
    uwagi: 'Ulga obejmuje wydatki na ocieplenie, wymianę okien, drzwi i źródeł ciepła.',
    link: 'https://www.gov.pl/web/finanse/ulga-termomodernizacyjna',
    pdf: 'https://www.gov.pl/documents/ulga-termo.pdf',
    slowa_kluczowe: ['ulga', 'termomodernizacja', 'podatek', 'PIT', 'ocieplenie', 'okna'],
    ostatnia_aktualizacja: '2024-03-15'
  },
  {
    id: 'ulga-rehabilitacyjna',
    nazwa: 'Ulga rehabilitacyjna',
    kategoria: 'Świadczenia specjalne i jednorazowe',
    krotki_opis: 'Odliczenie wydatków związanych z rehabilitacją od podatku dochodowego.',
    kogoDotyczy: [
      'Osób niepełnosprawnych lub ich opiekunów.',
      'Osób ponoszących wydatki na cele rehabilitacyjne.'
    ],
    kwalifikacja: [
      'Osoba niepełnosprawna lub jej opiekun',
      'Wydatki na cele rehabilitacyjne lub ułatwienia w funkcjonowaniu'
    ],
    dokumenty: [
      'Orzeczenie o niepełnosprawności',
      'Faktury/rachunki potwierdzające wydatki',
      'Zeznanie podatkowe PIT'
    ],
    kiedyZlozyc: 'W zeznaniu podatkowym PIT za rok, w którym poniesiono wydatki.',
    gdzieZlozyc: [
      'W ramach rocznego zeznania podatkowego PIT.',
      'Przez e-Deklaracje lub w urzędzie skarbowym.'
    ],
    uwagi: 'Ulga obejmuje m.in. wydatki na sprzęt rehabilitacyjny, leki, turnusy i transport.',
    link: 'https://www.gov.pl/web/finanse/ulga-rehabilitacyjna',
    pdf: 'https://www.gov.pl/documents/ulga-rehab.pdf',
    slowa_kluczowe: ['ulga', 'rehabilitacyjna', 'niepełnosprawność', 'podatek', 'PIT', 'odliczenie'],
    ostatnia_aktualizacja: '2024-01-15'
  },
  {
    id: 'zwolnienie-z-oplaty-skarbowej',
    nazwa: 'Zwolnienie z opłaty skarbowej',
    kategoria: 'Świadczenia specjalne i jednorazowe',
    krotki_opis: 'Zwolnienie z opłaty skarbowej dla określonych grup społecznych.',
    kogoDotyczy: [
      'Osób o niskich dochodach.',
      'Osób niepełnosprawnych.',
      'Innych grup określonych w przepisach.'
    ],
    kwalifikacja: [
      'Osoby o niskich dochodach',
      'Osoby niepełnosprawne',
      'Inne określone w przepisach przypadki'
    ],
    dokumenty: [
      'Wniosek o zwolnienie z opłaty skarbowej',
      'Dokumenty potwierdzające uprawnienie do zwolnienia'
    ],
    kiedyZlozyc: 'Wraz z wnioskiem o wydanie dokumentu podlegającego opłacie skarbowej.',
    gdzieZlozyc: [
      'W urzędzie wydającym dokument.',
      'Zgodnie z procedurami danej instytucji.'
    ],
    uwagi: 'Zwolnienie dotyczy m.in. wydania dowodu osobistego, paszportu czy zaświadczeń.',
    link: 'https://www.gov.pl/web/finanse/oplata-skarbowa',
    pdf: 'https://www.gov.pl/documents/oplata-skarbowa.pdf',
    slowa_kluczowe: ['opłata skarbowa', 'zwolnienie', 'podatek', 'urząd', 'dokument'],
    ostatnia_aktualizacja: '2024-02-01'
  },
  {
    id: 'stypendium-socjalne',
    nazwa: 'Stypendium socjalne',
    kategoria: 'Świadczenia edukacyjne',
    krotki_opis: 'Wsparcie finansowe dla studentów z trudnej sytuacji materialnej.',
    kogoDotyczy: [
      'Studentów uczelni wyższych.',
      'Osób z rodzin o niskich dochodach.'
    ],
    kwalifikacja: [
      'Student uczelni wyższej',
      'Dochód na osobę w rodzinie poniżej określonego progu',
      'Kontynuowanie studiów'
    ],
    dokumenty: [
      'Wniosek o stypendium socjalne',
      'Zaświadczenia o dochodach członków rodziny',
      'Zaświadczenie o statusie studenta'
    ],
    kiedyZlozyc: 'Na początku roku akademickiego lub semestru, zgodnie z terminami uczelni.',
    gdzieZlozyc: [
      'W dziekanacie lub dziale spraw studenckich uczelni.',
      'Przez system elektroniczny uczelni (jeśli dostępny).'
    ],
    uwagi: 'Wysokość stypendium zależy od dochodu rodziny i jest przyznawana na semestr lub rok akademicki.',
    link: 'https://www.gov.pl/web/nauka/stypendium-socjalne',
    pdf: 'https://www.gov.pl/documents/stypendium-socjalne.pdf',
    slowa_kluczowe: ['stypendium', 'socjalne', 'student', 'studia', 'uczelnia', 'dochody'],
    ostatnia_aktualizacja: '2024-09-01'
  },
  {
    id: 'zasilek-pogrzebowy',
    nazwa: 'Zasiłek pogrzebowy',
    kategoria: 'Świadczenia specjalne i jednorazowe',
    krotki_opis: 'Jednorazowe świadczenie z tytułu pokrycia kosztów pogrzebu.',
    kogoDotyczy: [
      'Osób, które pokryły koszty pogrzebu.',
      'Rodzin zmarłych ubezpieczonych w ZUS lub pobierających świadczenia z ZUS.'
    ],
    kwalifikacja: [
      'Osoba, która pokryła koszty pogrzebu',
      'Zmarły był ubezpieczony lub pobierał świadczenie z ZUS'
    ],
    dokumenty: [
      'Wniosek o zasiłek pogrzebowy',
      'Akt zgonu',
      'Rachunki za pogrzeb'
    ],
    kiedyZlozyc: 'W ciągu 12 miesięcy od dnia śmierci.',
    gdzieZlozyc: [
      'W ZUS przez PUE ZUS.',
      'Osobiście w oddziale ZUS.',
      'Pocztą.'
    ],
    uwagi: 'Zasiłek pogrzebowy wypłacany jest w stałej kwocie ustalonej przez ZUS.',
    link: 'https://www.zus.pl/swiadczenia/zasilki/zasilek-pogrzebowy',
    pdf: 'https://www.zus.pl/documents/zasilek-pogrzebowy.pdf',
    slowa_kluczowe: ['zasiłek', 'pogrzebowy', 'pogrzeb', 'śmierć', 'ZUS', 'koszty'],
    ostatnia_aktualizacja: '2024-01-10'
  },
  {
    id: 'renta-rodzinna',
    nazwa: 'Renta rodzinna',
    kategoria: 'Świadczenia dla seniorów',
    krotki_opis: 'Świadczenie dla członków rodziny osoby zmarłej, która była uprawniona do emerytury lub renty.',
    kogoDotyczy: [
      'Członków rodziny osoby zmarłej (małżonek, dziecko, rodzic).',
      'Rodzin, w których zmarły był uprawniony do emerytury lub renty.'
    ],
    kwalifikacja: [
      'Członek rodziny osoby zmarłej (małżonek, dziecko, rodzic)',
      'Zmarły był uprawniony do emerytury/renty lub spełniał warunki do jej uzyskania'
    ],
    dokumenty: [
      'Wniosek o rentę rodzinną',
      'Akt zgonu',
      'Dokumenty potwierdzające pokrewieństwo',
      'Dokumenty zmarłego dotyczące uprawnień emerytalnych'
    ],
    kiedyZlozyc: 'Nie wcześniej niż miesiąc przed śmiercią osoby uprawnionej.',
    gdzieZlozyc: [
      'W ZUS przez PUE ZUS.',
      'Osobiście w oddziale ZUS.',
      'Pocztą.'
    ],
    uwagi: 'Renta rodzinna przysługuje uprawnionym członkom rodziny zmarłego. Wysokość zależy od liczby uprawnionych osób.',
    link: 'https://www.zus.pl/swiadczenia/emerytury-i-renty/renta-rodzinna',
    pdf: 'https://www.zus.pl/documents/renta-rodzinna.pdf',
    slowa_kluczowe: ['renta', 'rodzinna', 'śmierć', 'małżonek', 'dziecko', 'ZUS'],
    ostatnia_aktualizacja: '2024-01-20'
  },
    {
    id: 'swiadczenie-wspierajace-2025',
    nazwa: 'Świadczenie wspierające dla osób niepełnosprawnych',
    kategoria: 'Świadczenia dla osób z niepełnosprawnościami',
    krotki_opis: 'Miesięczne wsparcie finansowe do 4134 zł dla osób z dużymi trudnościami w funkcjonowaniu.',
    kogoDotyczy: [
      'Osób z orzeczeniem o znacznym stopniu niepełnosprawności.',
      'Osób wymagających stałej opieki i wsparcia w codziennym funkcjonowaniu.'
    ],
    kwalifikacja: [
      'Orzeczenie o znacznym stopniu niepełnosprawności',
      'Potwierdzenie potrzeby wsparcia na podstawie oceny',
      'Status osoby dorosłej wymagającej stałej opieki'
    ],
    dokumenty: [
      'Wniosek o świadczenie wspierające',
      'Orzeczenie o niepełnosprawności',
      'Decyzja o poziomie potrzeb wsparcia',
      'Dokumenty potwierdzające sytuację rodzinną'
    ],
    kiedyZlozyc: 'W dowolnym czasie po uzyskaniu orzeczenia o niepełnosprawności.',
    gdzieZlozyc: [
      'W ZUS przez PUE ZUS.',
      'Osobiście w oddziale ZUS.',
      'Pocztą.'
    ],
    uwagi: 'Wysokość świadczenia zależy od poziomu potrzeby wsparcia (od 220 zł do 4134 zł).',
    link: 'https://www.gov.pl/web/rodzina/swiadczenie-wspierajace',
    pdf: 'https://www.gov.pl/attachment/swiadczenie-wspierajace.pdf',
    slowa_kluczowe: ['wspierające', 'niepełnosprawność', 'opieka', 'świadczenie', 'pomoc'],
    ostatnia_aktualizacja: '2025-01-01'
  },

  // Aktualizacja świadczenia pielęgnacyjnego
  {
    id: 'zasilek-pielegnacyjny-2025',
    nazwa: 'Zasiłek pielęgnacyjny 2025',
    kategoria: 'Świadczenia dla osób z niepełnosprawnościami',
    krotki_opis: 'Miesięczne świadczenie pielęgnacyjne w wysokości 3287 zł dla osób niepełnosprawnych i seniorów wymagających opieki.',
    kogoDotyczy: [
      'Osób niepełnosprawnych ze znacznym stopniem niepełnosprawności.',
      'Seniorów w wieku emerytalnym wymagających całodobowej opieki.'
    ],
    kwalifikacja: [
      'Znaczny stopień niepełnosprawności lub wiek emerytalny',
      'Potrzeba całodobowej opieki lub pomocy',
      'Niepodejmowanie zatrudnienia przez opiekuna dokonującego zgłoszenia'
    ],
    dokumenty: [
      'Wniosek o zasiłek pielęgnacyjny',
      'Orzeczenie o niepełnosprawności',
      'Dokumenty tożsamości',
      'Potwierdzenie sytuacji opiekuńczej'
    ],
    kiedyZlozyc: 'W dowolnym czasie.',
    gdzieZlozyc: [
      'W urzędzie gminy/miasta.',
      'Przez internet (w niektórych urzędach).',
      'Osobiście lub pocztą.'
    ],
    uwagi: 'Zasiłek pielęgnacyjny w 2025 roku wynosi 3287 zł miesięcznie.',
    link: 'https://www.gov.pl/web/rodzina/zasilek-pielegnacyjny',
    pdf: 'https://www.gov.pl/attachment/zasilek-pielegnacyjny.pdf',
    slowa_kluczowe: ['zasiłek', 'pielęgnacyjny', 'opieka', 'niepełnosprawność', 'senior'],
    ostatnia_aktualizacja: '2025-01-15'
  },

  // Nowy dodatek dopełniający dla renty socjalnej
  {
    id: 'dodatek-dopelniajacy-renta-socjalna-2025',
    nazwa: 'Dodatek dopełniający do renty socjalnej',
    kategoria: 'Świadczenia dla osób z niepełnosprawnościami',
    krotki_opis: 'Jednorazowy dodatek 2520 zł dla osób mających prawo do renty socjalnej i orzeczenie o niezdolności do samodzielnej egzystencji.',
    kogoDotyczy: [
      'Osób mających prawo do renty socjalnej.',
      'Osób z orzeczeniem o niezdolności do samodzielnej egzystencji.'
    ],
    kwalifikacja: [
      'Prawo do renty socjalnej',
      'Orzeczenie o niezdolności do samodzielnej egzystencji',
      'Spełnienie warunków ustawy o dodatku dopełniającym'
    ],
    dokumenty: [
      'Wniosek o dodatek dopełniający',
      'Decyzja o przyznaniu renty socjalnej',
      'Orzeczenie o niezdolności do samodzielnej egzystencji'
    ],
    kiedyZlozyc: 'W dowolnym czasie po uzyskaniu renty socjalnej.',
    gdzieZlozyc: [
      'W ZUS.',
      'Przez PUE ZUS lub osobiście.'
    ],
    uwagi: 'Dodatek dopełniający to jednorazowe świadczenie w wysokości 2520 zł rocznie.',
    link: 'https://www.gov.pl/web/rodzina/dodatek-dopelniajacy',
    pdf: null,
    slowa_kluczowe: ['dodatek', 'renta socjalna', 'niezdolność', 'dopełniający'],
    ostatnia_aktualizacja: '2025-01-01'
  },

  // Zasiłek stały i okresowy z MOPS wg nowych progów dochodowych
  {
    id: 'zasilek-staly-mops-2025',
    nazwa: 'Zasiłek stały z MOPS',
    kategoria: 'Pomoc społeczna',
    krotki_opis: 'Comiesięczne wsparcie dla osób niezdolnych do pracy lub w podeszłym wieku, kwota do 1229 zł na miesiąc.',
    kogoDotyczy: [
      'Osób całkowicie niezdolnych do pracy.',
      'Osób w wieku emerytalnym o niskich dochodach.'
    ],
    kwalifikacja: [
      'Całkowita niezdolność do pracy lub wiek emerytalny',
      'Dochód poniżej 1010 zł (osoba samotna) lub 823 zł na osobę w rodzinie'
    ],
    dokumenty: [
      'Wniosek do MOPS o zasiłek stały',
      'Zaświadczenia o dochodach',
      'Dokumenty potwierdzające niezdolność lub wiek'
    ],
    kiedyZlozyc: 'W dowolnym czasie w ciągu roku.',
    gdzieZlozyc: [
      'W Miejskim/Gminnym Ośrodku Pomocy Społecznej (MOPS/GOPS).',
      'Osobiście lub pocztą.'
    ],
    uwagi: 'Zasiłek stały jest przyznawany na czas nieokreślony lub określony. Maksymalna kwota to 1229 zł.',
    link: 'https://www.infor.pl/twoje-pieniadze/swiadczenia/7042252,swiadczenia-z-mops-w-2025-r-pelna-lista-dodatkow-i-aktualne-kwoty.html',
    pdf: null,
    slowa_kluczowe: ['zasiłek', 'stały', 'MOPS', 'pomoc społeczna'],
    ostatnia_aktualizacja: '2025-01-01'
  },

  // Nowy element - dodatek pielęgnacyjny
  {
    id: 'dodatek-pielegnacyjny',
    nazwa: 'Dodatek pielęgnacyjny',
    kategoria: 'Świadczenia dla seniorów',
    krotki_opis: 'Dodatkowe świadczenie dla osób niezdolnych do samodzielnej egzystencji lub po ukończeniu 75 lat.',
    kogoDotyczy: [
      "Osoby uprawnione do emerytury lub renty, które zostały uznane za całkowicie niezdolne do pracy oraz do samodzielnej egzystencji.",
      "Osoby, które ukończyły 75 lat życia (dla nich dodatek przyznawany jest z urzędu)."
    ],
    kwalifikacja: [
      'Całkowita niezdolność do pracy i do samodzielnej egzystencji',
      'Prawo do emerytury lub renty',
      'Ukończenie 75 lat życia'
    ],
    dokumenty: [
      'Wniosek o dodatek pielęgnacyjny',
      'Orzeczenie o niezdolności do samodzielnej egzystencji',
      'Dokumenty tożsamości',
      'Decyzja emerytalna/rentowa'
    ],
    kiedyZlozyc: "W dowolnym czasie.",
    gdzieZlozyc: [
      "Osobiście lub przez pełnomocnika w dowolnej jednostce ZUS (pisemnie lub ustnie do protokołu).",
      "Za pośrednictwem operatora pocztowego.",
      "Za pośrednictwem polskiego urzędu konsularnego.",
      "Dla osób 75+ dodatek jest przyznawany z urzędu — bez składania wniosku."
    ],
    uwagi: "Dodatek pielęgnacyjny przysługuje osobom całkowicie niezdolnym do pracy i samodzielnej egzystencji lub osobom, które ukończyły 75 lat. Wysokość dodatku ustala ZUS na każdy rok.",
    link: 'https://www.gov.pl/web/rodzina/zasilek-pielegnacyjny',
    pdf: 'https://www.gov.pl/attachment/zasilek-pielegnacyjny.pdf',
    slowa_kluczowe: ['dodatek', 'pielęgnacyjny', 'opieka', 'niepełnosprawność', 'senior', '75 lat'],
    ostatnia_aktualizacja: '2025-01-15'
  }
];

export default swiadczeniaDB;