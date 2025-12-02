// Centralne miejsce importu wszystkich pism

import { pismaAdministracja } from './administracja';
import { pismaTelekomunikacja } from './telekomunikacja';
import { pismaKurierzy } from './kurierzy';
import { pismaKonsumenckie } from './konsumenckie';
import { pismaStudia } from './studia';
import { pismaMieszkanie } from './mieszkanie';
import { pismaBiznesowe } from './biznesowe';
import { pismaSzkola } from './szkola';
import { pismaPraca } from './praca';
import { pismaBudownictwo } from './budownictwo';
import { pismaMotoryzacja } from './motoryzacja';

// Pisma z oryginalnego GeneratorPismTab (zachowane dla kompatybilności)
export const pismaUrzedowe = [
  {
    id: 'wniosek_akt_urodzenia',
    nazwa: 'Wniosek o odpis aktu urodzenia',
    kategoria: 'Urząd Stanu Cywilnego',
    opis: 'Wniosek o wydanie odpisu aktu urodzenia',
    pytania: [
      { id: 'urzad', label: 'Nazwa urzędu', placeholder: 'np. Urząd Stanu Cywilnego w Warszawie', type: 'text' },
      { id: 'osoba', label: 'Imię i nazwisko osoby, której dotyczy akt', placeholder: 'np. Jan Kowalski', type: 'text' },
      { id: 'data_urodzenia', label: 'Data urodzenia', placeholder: 'np. 01.01.1990', type: 'text' },
      { id: 'miejsce_urodzenia', label: 'Miejsce urodzenia', placeholder: 'np. Warszawa', type: 'text' },
      { id: 'rodzaj_odpisu', label: 'Rodzaj odpisu', placeholder: 'np. zupełny, skrócony', type: 'text' },
      { id: 'cel', label: 'Cel wydania odpisu', placeholder: 'np. wniosek o dowód osobisty, zawarcie małżeństwa', type: 'text' }
    ]
  },
  {
    id: 'wniosek_zasilek_rodzinny',
    nazwa: 'Wniosek o zasiłek rodzinny',
    kategoria: 'Pomoc społeczna',
    opis: 'Wniosek o przyznanie zasiłku rodzinnego',
    pytania: [
      { id: 'urzad', label: 'Nazwa urzędu/OPS', placeholder: 'np. Ośrodek Pomocy Społecznej w Warszawie', type: 'text' },
      { id: 'liczba_dzieci', label: 'Liczba dzieci', placeholder: 'np. 2', type: 'text' },
      { id: 'wiek_dzieci', label: 'Wiek dzieci', placeholder: 'np. 5 lat i 8 lat', type: 'text' },
      { id: 'dochod_rodziny', label: 'Miesięczny dochód rodziny (zł)', placeholder: 'np. 3000', type: 'text' },
      { id: 'liczba_osob', label: 'Liczba osób w gospodarstwie', placeholder: 'np. 4', type: 'text' }
    ]
  },
  {
    id: 'wniosek_zwrot_podatku',
    nazwa: 'Wniosek o zwrot nadpłaty podatku',
    kategoria: 'Urząd Skarbowy',
    opis: 'Wniosek do urzędu skarbowego o zwrot nadpłaconego podatku',
    pytania: [
      { id: 'urzad', label: 'Nazwa urzędu skarbowego', placeholder: 'np. Urząd Skarbowy Warszawa-Śródmieście', type: 'text' },
      { id: 'rodzaj_podatku', label: 'Rodzaj podatku', placeholder: 'np. PIT, VAT, CIT', type: 'text' },
      { id: 'rok_podatkowy', label: 'Rok podatkowy', placeholder: 'np. 2024', type: 'text' },
      { id: 'kwota', label: 'Kwota nadpłaty (zł)', placeholder: 'np. 1500', type: 'text' },
      { id: 'numer_konta', label: 'Numer konta do zwrotu', placeholder: 'np. 12 3456 7890 1234 5678 9012 3456', type: 'text' },
      { id: 'uzasadnienie', label: 'Dlaczego powstała nadpłata?', placeholder: 'Opisz przyczynę nadpłaty', type: 'textarea' }
    ]
  }
];

// Połącz wszystkie pisma w jedną tablicę
export const DOSTEPNE_PISMA = [
  ...pismaUrzedowe,
  ...pismaAdministracja,
  ...pismaTelekomunikacja,
  ...pismaKurierzy,
  ...pismaKonsumenckie,
  ...pismaStudia,
  ...pismaMieszkanie,
  ...pismaBiznesowe,
  ...pismaSzkola,
  ...pismaPraca,
  ...pismaBudownictwo,
  ...pismaMotoryzacja
];

export default DOSTEPNE_PISMA;
