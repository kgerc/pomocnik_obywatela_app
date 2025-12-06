// Top 20 najpopularniejszych dokumentów do dedykowanych landing pages
export const TOP_DOCUMENTS = [
  {
    id: 'reklamacja-telefon',
    slug: 'reklamacja-telefon',
    nazwa: 'Reklamacja telefonu komórkowego',
    kategoria: 'Telekomunikacja',
    opis: 'Reklamacja telefonu komórkowego do Orange, Play, Plus, T-Mobile',
    longDescription: 'Profesjonalna reklamacja telefonu komórkowego pozwala skutecznie dochodzić swoich praw jako konsument. Generator tworzy pismo zgodne z prawem konsumenckim, uwzględniające wszystkie wymagane elementy reklamacji.',
    keywords: 'reklamacja telefonu, reklamacja Orange, reklamacja Play, reklamacja Plus, reklamacja T-Mobile',
    searchVolume: 5400,
    faq: [
      {
        question: 'Jak długo trwa rozpatrzenie reklamacji telefonu?',
        answer: 'Operator ma 14 dni na ustosunkowanie się do reklamacji. W przypadku braku odpowiedzi, reklamacja uważana jest za uznaną.'
      },
      {
        question: 'Co zrobić jeśli operator odrzuci reklamację?',
        answer: 'Możesz złożyć odwołanie do UKE (Urząd Komunikacji Elektronicznej) lub skorzystać z pomocy rzecznika konsumentów.'
      },
      {
        question: 'Czy mogę żądać zwrotu pieniędzy za telefon?',
        answer: 'Tak, jeśli wada jest istotna i nie da się jej usunąć, możesz żądać obniżenia ceny lub odstąpienia od umowy.'
      }
    ]
  },
  {
    id: 'reklamacja-internet',
    slug: 'reklamacja-internet',
    nazwa: 'Reklamacja usługi internetowej',
    kategoria: 'Telekomunikacja',
    opis: 'Reklamacja internetu stacjonarnego lub mobilnego',
    longDescription: 'Reklamacja usługi internetowej to formalne zgłoszenie nieprawidłowości w świadczeniu usług przez operatora. Może dotyczyć wolnego internetu, przerw w dostępie, niespełniania parametrów z umowy.',
    keywords: 'reklamacja internetu, wolny internet, przerwy w internecie, reklamacja Orange internet, reklamacja Play internet',
    searchVolume: 4100,
    faq: [
      {
        question: 'Jak udowodnić, że internet jest wolniejszy niż w umowie?',
        answer: 'Wykonaj pomiary prędkości za pomocą narzędzi takich jak SpeedTest.net i dołącz screenshoty do reklamacji.'
      },
      {
        question: 'Czy mogę rozwiązać umowę z powodu złej jakości internetu?',
        answer: 'Tak, jeśli operator nie usunie problemu w terminie 14 dni, możesz rozwiązać umowę bez kar.'
      }
    ]
  },
  {
    id: 'reklamacja-kurier',
    slug: 'reklamacja-kurier',
    nazwa: 'Reklamacja przesyłki kurierskiej',
    kategoria: 'Kurierzy',
    opis: 'Reklamacja zgubionej, uszkodzonej lub opóźnionej przesyłki',
    longDescription: 'Reklamacja przesyłki kurierskiej służy do zgłoszenia problemów z dostawą paczki. Obejmuje zgubienie, uszkodzenie, opóźnienie lub niewłaściwe doręczenie przesyłki.',
    keywords: 'reklamacja InPost, reklamacja DPD, reklamacja DHL, zgubiona paczka, uszkodzona przesyłka',
    searchVolume: 3800,
    faq: [
      {
        question: 'W jakim terminie mogę złożyć reklamację przesyłki?',
        answer: 'Reklamację należy złożyć w ciągu 14 dni od daty doręczenia lub terminu, w którym paczka powinna zostać dostarczona.'
      },
      {
        question: 'Czy mogę dostać odszkodowanie za zgubioną paczkę?',
        answer: 'Tak, kurier wypłaca odszkodowanie do wartości zadeklarowanej przesyłki lub zgodnie z regulaminem przewoźnika.'
      }
    ]
  },
  {
    id: 'odwolanie-mandatu',
    slug: 'odwolanie-od-mandatu',
    nazwa: 'Odwołanie od mandatu karnego',
    kategoria: 'Motoryzacja',
    opis: 'Odwołanie od mandatu za wykroczenie drogowe',
    longDescription: 'Odwołanie od mandatu karnego to pismo składane do sądu w celu zakwestionowania słuszności nałożonej kary. Przysługuje każdemu, kto nie zgadza się z wystawionym mandatem.',
    keywords: 'odwołanie od mandatu, mandat karny, odwołanie mandat parkingowy, odwołanie fotoradar',
    searchVolume: 6700,
    faq: [
      {
        question: 'W jakim terminie mogę złożyć odwołanie od mandatu?',
        answer: 'Odwołanie należy złożyć w ciągu 7 dni od otrzymania mandatu lub zawiadomienia o ukaraniu.'
      },
      {
        question: 'Czy złożenie odwołania wstrzymuje wykonanie kary?',
        answer: 'Tak, złożenie odwołania wstrzymuje wykonanie kary do czasu rozpatrzenia sprawy przez sąd.'
      }
    ]
  },
  {
    id: 'wniosek-zasilek-okresowy',
    slug: 'wniosek-zasilek-okresowy',
    nazwa: 'Wniosek o zasiłek okresowy',
    kategoria: 'Pomoc społeczna',
    opis: 'Wniosek o przyznanie zasiłku okresowego z pomocy społecznej',
    longDescription: 'Zasiłek okresowy to świadczenie pieniężne wypłacane osobom i rodzinom znajdującym się w trudnej sytuacji materialnej. Przyznawany jest na okres od 1 do 6 miesięcy.',
    keywords: 'zasiłek okresowy, wniosek OPS, pomoc społeczna, zasiłek dla bezrobotnych',
    searchVolume: 8900,
    faq: [
      {
        question: 'Kto może otrzymać zasiłek okresowy?',
        answer: 'Zasiłek przysługuje osobom i rodzinom, których dochód nie przekracza kryterium dochodowego (776 zł dla osoby samotnej, 600 zł dla osoby w rodzinie).'
      },
      {
        question: 'Na jak długo przyznawany jest zasiłek okresowy?',
        answer: 'Zasiłek okresowy może być przyznany na okres od 1 do 6 miesięcy, z możliwością przedłużenia.'
      }
    ]
  },
  {
    id: 'wniosek-zasilek-staly',
    slug: 'wniosek-zasilek-staly',
    nazwa: 'Wniosek o zasiłek stały',
    kategoria: 'Pomoc społeczna',
    opis: 'Wniosek o przyznanie zasiłku stałego z pomocy społecznej',
    longDescription: 'Zasiłek stały to pomoc finansowa dla osób niezdolnych do pracy z powodu wieku lub niepełnosprawności, które nie mają innych źródeł utrzymania.',
    keywords: 'zasiłek stały, wniosek zasiłek stały, pomoc społeczna niepełnosprawni, zasiłek dla osób starszych',
    searchVolume: 5200,
    faq: [
      {
        question: 'Kto może otrzymać zasiłek stały?',
        answer: 'Zasiłek przysługuje osobom całkowicie niezdolnym do pracy z powodu wieku lub niepełnosprawności, które nie mają prawa do świadczeń z innych systemów zabezpieczenia społecznego.'
      }
    ]
  },
  {
    id: 'wypowiedzenie-umowy-najmu',
    slug: 'wypowiedzenie-umowy-najmu',
    nazwa: 'Wypowiedzenie umowy najmu mieszkania',
    kategoria: 'Mieszkanie',
    opis: 'Wypowiedzenie umowy najmu przez najemcę lub wynajmującego',
    longDescription: 'Wypowiedzenie umowy najmu to formalne zakończenie stosunku najmu. Wymaga zachowania odpowiedniego okresu wypowiedzenia określonego w umowie lub ustawie.',
    keywords: 'wypowiedzenie najmu, wypowiedzenie umowy najmu, rozwiązanie umowy najmu, jak wypowiedzieć najem',
    searchVolume: 7300,
    faq: [
      {
        question: 'Jaki jest okres wypowiedzenia umowy najmu?',
        answer: 'Dla umów na czas nieokreślony: 3 miesiące. Dla umów na czas określony: zgodnie z zapisami umowy, domyślnie brak możliwości wypowiedzenia przed końcem okresu.'
      }
    ]
  },
  {
    id: 'reklamacja-produkt-wadliwy',
    slug: 'reklamacja-produktu-wadliwego',
    nazwa: 'Reklamacja produktu wadliwego',
    kategoria: 'Konsumenckie',
    opis: 'Reklamacja wadliwego towaru zakupionego w sklepie',
    longDescription: 'Reklamacja produktu wadliwego to prawo konsumenta do zgłoszenia niezgodności towaru z umową. Obejmuje wady fizyczne i prawne produktu.',
    keywords: 'reklamacja produktu, reklamacja towaru, zwrot wadliwego produktu, reklamacja gwarancyjna',
    searchVolume: 9100,
    faq: [
      {
        question: 'Ile czasu mam na złożenie reklamacji?',
        answer: 'Reklamację można złożyć w ciągu 2 lat od zakupu (rękojmia) lub w okresie gwarancji, jeśli została udzielona.'
      }
    ]
  },
  {
    id: 'odwolanie-decyzja-ubezpieczyciel',
    slug: 'odwolanie-od-decyzji-ubezpieczyciela',
    nazwa: 'Odwołanie od decyzji ubezpieczyciela',
    kategoria: 'Konsumenckie',
    opis: 'Odwołanie od decyzji ubezpieczyciela o odmowie wypłaty odszkodowania',
    longDescription: 'Odwołanie od decyzji ubezpieczyciela pozwala zakwestionować odmowę wypłaty, zaniżenie wysokości odszkodowania lub inne nieprawidłowości w rozpatrzeniu szkody.',
    keywords: 'odwołanie od decyzji ubezpieczyciela, odwołanie OC, odwołanie AC, reklamacja ubezpieczenia',
    searchVolume: 4600,
    faq: [
      {
        question: 'W jakim terminie mogę odwołać się od decyzji ubezpieczyciela?',
        answer: 'Odwołanie należy złożyć w ciągu 14 dni od otrzymania decyzji ubezpieczyciela.'
      }
    ]
  },
  {
    id: 'wniosek-pozwolenie-budowa-domu',
    slug: 'wniosek-pozwolenie-na-budowe',
    nazwa: 'Wniosek o pozwolenie na budowę',
    kategoria: 'Budownictwo',
    opis: 'Wniosek o wydanie pozwolenia na budowę domu lub budynku',
    longDescription: 'Wniosek o pozwolenie na budowę to dokument wymagany przed rozpoczęciem budowy domu lub innego obiektu budowlanego wymagającego pozwolenia.',
    keywords: 'pozwolenie na budowę, wniosek pozwolenie budowlane, pozwolenie na budowę domu',
    searchVolume: 12400,
    faq: [
      {
        question: 'Jakie dokumenty potrzebne są do wniosku o pozwolenie na budowę?',
        answer: 'Projekt budowlany, mapa do celów projektowych, oświadczenia o prawie do dysponowania nieruchomością, decyzje środowiskowe (jeśli wymagane).'
      }
    ]
  },
  {
    id: 'wniosek-dodatek-mieszkaniowy',
    slug: 'wniosek-dodatek-mieszkaniowy',
    nazwa: 'Wniosek o dodatek mieszkaniowy',
    kategoria: 'Pomoc społeczna',
    opis: 'Wniosek o przyznanie dodatku mieszkaniowego',
    longDescription: 'Dodatek mieszkaniowy to pomoc dla gospodarstw domowych o niskich dochodach, mająca na celu dofinansowanie kosztów utrzymania mieszkania.',
    keywords: 'dodatek mieszkaniowy, wniosek dodatek mieszkaniowy, dofinansowanie czynszu',
    searchVolume: 6800,
    faq: [
      {
        question: 'Kto może otrzymać dodatek mieszkaniowy?',
        answer: 'Osoby i rodziny, których dochód nie przekracza określonego progu oraz wydatki na mieszkanie przekraczają procent dochodów.'
      }
    ]
  },
  {
    id: 'wniosek-urlop-dziekanski',
    slug: 'wniosek-urlop-dziekanski',
    nazwa: 'Podanie o urlop dziekański',
    kategoria: 'Studia',
    opis: 'Wniosek studenta o udzielenie urlopu dziekańskiego',
    longDescription: 'Urlop dziekański to możliwość zawieszenia studiów na okres do 1 roku z powodów zdrowotnych, rodzinnych lub innych ważnych przyczyn.',
    keywords: 'urlop dziekański, podanie urlop dziekański, zawieszenie studiów',
    searchVolume: 8200,
    faq: [
      {
        question: 'Na jak długo można dostać urlop dziekański?',
        answer: 'Urlop dziekański przyznawany jest na okres do 1 roku akademickiego, z możliwością przedłużenia.'
      }
    ]
  },
  {
    id: 'wniosek-zawieszenie-dzialalnosci',
    slug: 'wniosek-zawieszenie-dzialalnosci',
    nazwa: 'Wniosek o zawieszenie działalności gospodarczej',
    kategoria: 'Biznesowe',
    opis: 'Wniosek o zawieszenie działalności gospodarczej w CEIDG',
    longDescription: 'Zawieszenie działalności gospodarczej pozwala przedsiębiorcy czasowo zaprzestać prowadzenia działalności bez konieczności jej likwidacji i ponownej rejestracji.',
    keywords: 'zawieszenie działalności, zawieszenie działalności gospodarczej, CEIDG zawieszenie',
    searchVolume: 15300,
    faq: [
      {
        question: 'Na jak długo można zawiesić działalność gospodarczą?',
        answer: 'Działalność można zawiesić bez ograniczeń czasowych. Zawieszenie możliwe jest w pełnych miesiącach kalendarzowych.'
      }
    ]
  },
  {
    id: 'odwolanie-uke',
    slug: 'odwolanie-do-uke',
    nazwa: 'Odwołanie do UKE',
    kategoria: 'Telekomunikacja',
    opis: 'Odwołanie do Urzędu Komunikacji Elektronicznej od decyzji operatora',
    longDescription: 'Odwołanie do UKE składa się w przypadku nierozpatrzenia lub odrzucenia reklamacji przez operatora telekomunikacyjnego. UKE jako organ regulacyjny może nakazać operatorowi rozpatrzenie sprawy.',
    keywords: 'odwołanie UKE, odwołanie do UKE, UKE reklamacja operator',
    searchVolume: 3200,
    faq: [
      {
        question: 'Kiedy mogę złożyć odwołanie do UKE?',
        answer: 'Po wyczerpaniu drogi reklamacyjnej u operatora, czyli po otrzymaniu ostatecznej odpowiedzi na reklamację lub po upływie terminu na jej rozpatrzenie.'
      }
    ]
  },
  {
    id: 'reklamacja-poczta-polska',
    slug: 'reklamacja-poczta-polska',
    nazwa: 'Reklamacja Poczty Polskiej',
    kategoria: 'Kurierzy',
    opis: 'Reklamacja przesyłki pocztowej lub paczki Poczty Polskiej',
    longDescription: 'Reklamacja do Poczty Polskiej dotyczy problemów z doręczeniem listów, paczek, czy innych przesyłek pocztowych. Obejmuje zgubienie, opóźnienie, uszkodzenie.',
    keywords: 'reklamacja Poczta Polska, reklamacja paczka pocztowa, zgubiona paczka Poczta Polska',
    searchVolume: 5900,
    faq: [
      {
        question: 'Jak złożyć reklamację w Poczcie Polskiej?',
        answer: 'Reklamację można złożyć osobiście w placówce, listownie, przez e-mail lub formularz online na stronie Poczty Polskiej.'
      }
    ]
  },
  {
    id: 'wniosek-swiadectwo-pracy',
    slug: 'wniosek-swiadectwo-pracy',
    nazwa: 'Wniosek o wydanie świadectwa pracy',
    kategoria: 'Praca',
    opis: 'Wniosek o wydanie świadectwa pracy przez pracodawcę',
    longDescription: 'Świadectwo pracy to dokument potwierdzający okres i warunki zatrudnienia. Pracodawca ma obowiązek wydać je w dniu rozwiązania umowy.',
    keywords: 'świadectwo pracy, wniosek świadectwo pracy, wydanie świadectwa pracy',
    searchVolume: 7100,
    faq: [
      {
        question: 'W jakim terminie pracodawca musi wydać świadectwo pracy?',
        answer: 'Pracodawca zobowiązany jest wydać świadectwo pracy w dniu ustania stosunku pracy.'
      }
    ]
  },
  {
    id: 'reklamacja-tv',
    slug: 'reklamacja-telewizji',
    nazwa: 'Reklamacja telewizji cyfrowej',
    kategoria: 'Telekomunikacja',
    opis: 'Reklamacja usługi telewizji cyfrowej lub kablowej',
    longDescription: 'Reklamacja telewizji dotyczy problemów z jakością obrazu, brakiem kanałów, przerwami w nadawaniu lub innymi nieprawidłowościami w świadczeniu usługi TV.',
    keywords: 'reklamacja telewizji, reklamacja TV, reklamacja Canal+, reklamacja Polsat Box',
    searchVolume: 2800,
    faq: [
      {
        question: 'Co zrobić jeśli brakuje kanałów w pakiecie TV?',
        answer: 'Złóż reklamację do operatora, opisując które kanały są niedostępne i od kiedy występuje problem.'
      }
    ]
  },
  {
    id: 'wniosek-pomoc-ofiara-przemocy',
    slug: 'wniosek-pomoc-ofiara-przemocy',
    nazwa: 'Wniosek o pomoc dla ofiar przemocy',
    kategoria: 'Pomoc społeczna',
    opis: 'Wniosek o pomoc dla osób doświadczających przemocy w rodzinie',
    longDescription: 'Pomoc dla ofiar przemocy obejmuje wsparcie psychologiczne, prawne, mieszkaniowe i finansowe dla osób doświadczających przemocy domowej.',
    keywords: 'pomoc ofiara przemocy, przemoc domowa, pomoc społeczna przemoc, wniosek ofiara przemocy',
    searchVolume: 4200,
    faq: [
      {
        question: 'Jaka pomoc przysługuje ofiarom przemocy domowej?',
        answer: 'Pomoc psychologiczna, prawna, miejsce w ośrodku wsparcia, zasiłki celowe, mieszkanie chronione.'
      }
    ]
  },
  {
    id: 'wniosek-stypendium',
    slug: 'wniosek-stypendium-socjalne',
    nazwa: 'Wniosek o stypendium socjalne',
    kategoria: 'Studia',
    opis: 'Wniosek studenta o przyznanie stypendium socjalnego',
    longDescription: 'Stypendium socjalne to pomoc materialna dla studentów znajdujących się w trudnej sytuacji materialnej. Przyznawane na podstawie dochodu na osobę w rodzinie.',
    keywords: 'stypendium socjalne, wniosek stypendium socjalne, stypendium dla studentów',
    searchVolume: 11200,
    faq: [
      {
        question: 'Kto może otrzymać stypendium socjalne?',
        answer: 'Student, którego dochód na osobę w rodzinie nie przekracza progu określonego przez uczelnię (zazwyczaj około 1050 zł netto).'
      }
    ]
  },
  {
    id: 'wniosek-o-rente',
    slug: 'wniosek-o-rente',
    nazwa: 'Wniosek o rentę z tytułu niezdolności do pracy',
    kategoria: 'Pomoc społeczna',
    opis: 'Wniosek o przyznanie renty z ZUS z powodu niezdolności do pracy',
    longDescription: 'Renta z tytułu niezdolności do pracy przysługuje osobom, które utraciły zdolność do pracy z powodu choroby lub wypadku. Wymaga orzeczenia lekarza orzecznika ZUS.',
    keywords: 'wniosek o rentę, renta z niezdolności do pracy, renta ZUS, wniosek renta inwalidzka',
    searchVolume: 13800,
    faq: [
      {
        question: 'Jakie dokumenty są potrzebne do wniosku o rentę?',
        answer: 'Wypełniony wniosek, dokumentacja medyczna potwierdzająca chorobę lub niezdolność do pracy, zaświadczenia o okresach składkowych.'
      }
    ]
  }
];

export default TOP_DOCUMENTS;
