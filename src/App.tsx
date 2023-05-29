import React, { useState, CSSProperties, useRef, useEffect } from 'react';
import './App.css'

type Answer = {
  text: string;
  isActive: boolean;
  isClicked: boolean;
  excludesQuestions: number[];
}

type QuestionData = {
  id: number;
  text: string;
  answers: Answer[];
  isActive?: boolean;
}
type Rule = {
  questionId: number;
  expectedAnswer: string;
};

type DiagnosisRule = {
  diagnosis: string;
  rules: Rule[];
};




// Właściwe dane pytań zastąp danymi z treści zadania
const initialQuestions: QuestionData[] = [
  {
    id: 1,
    text: 'Pacjentem jest kot czy pies?',
    answers: [
      { text: 'pies', isActive: false, isClicked: false, excludesQuestions: [2,3,4,5,6,7,8,9,10,11,12,14,15,16,17,18,19,20] },
      { text: 'kot', isActive: false, isClicked: false, excludesQuestions: [21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54] },
    ],
  },
  {
    id: 2,
    text: 'Czy kot ma napady padaczkowe?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false, excludesQuestions: [4,5,6,7,8,9,10,11,12,14] },//include[3,15,16,17,18,19,20]
      { text: 'nie', isActive: false, isClicked: false, excludesQuestions: [3,15,16,17,18,19,20] },//include[4,5,6,7,8,9,10,11,12,14]
      { text: 'nie wiem', isActive: false, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 4,
    text: 'Czy kot ma powiększenie obrysu jamy brzusznej?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false, excludesQuestions: [3,15,16,17,18,19,20] },//include[5,6,7,8,9,10,11,12,14]
      { text: 'nie', isActive: false, isClicked: false, excludesQuestions: [5,6,7,8,9,10,11,12,14] },
      { text: 'nie wiem', isActive: false, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 21,
    text: 'Czy pies jest po urazie?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false, excludesQuestions: [23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49] },//include[22,50,51,52,53,54]
      { text: 'nie', isActive: false, isClicked: false, excludesQuestions: [22,50,51,52,53,54] },
    ],
  },
  {
    id: 23,
    text: 'Czy u psa występuje biegunka?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false, excludesQuestions: [22,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,45,48,49,50,51,52,53,54] },//include[39,49,40,48,41,42,43,44,46,47]
      { text: 'nie', isActive: false, isClicked: false, excludesQuestions: [46,47,44,43,42,41,40,48,49,39] },
    ],
  },
  {
    id: 24,
    text: 'Czy u psa występuje świąd?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false, excludesQuestions: [22,28,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54] }, //include[25,26,27,29,30]
      { text: 'nie', isActive: false, isClicked: false, excludesQuestions: [25,26,27,29,30] },
    ],
  },
  {
    id: 31,
    text: 'Czy występują wyłysienia?',
    answers: [
      { text: 'występują', isActive: false, isClicked: false, excludesQuestions: [22,32,33,34,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54] },//included[35,36,37,38]
      { text: 'nie występują', isActive: false, isClicked: false, excludesQuestions: [35,36,37,38] },
    ],
  },
  {
    id: 32,
    text: 'Czy znaleziono na ciele jakieś guzy?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false, excludesQuestions: [33,34] },
      { text: 'nie', isActive: false, isClicked: false, excludesQuestions: [22,25,26,27,28,29,30,31,32,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54] },//included[33,34]
    ],
  },
  {
    id: 33,
    text: 'Czy znaleziono owrzodzenia?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false, excludesQuestions: [34] },
      { text: 'nie', isActive: false, isClicked: false, excludesQuestions: [33,22,25,26,27,28,29,30,31,32,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54] },
    ],
  },
  {
    id: 34,
    text: 'Czy znaleziono zmiany barwnikowe?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false, excludesQuestions: [] },
      { text: 'nie', isActive: false, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 3,
    text: 'Czy możesz stwierdzić u kota stan padaczkowy?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false, excludesQuestions: [15,16,17,18,19,20] },
      { text: 'nie', isActive: false, isClicked: false, excludesQuestions: [] },
    ],
  },
  
  {
    id: 5,
    text: 'Czy w okolicy żołądka jest wypuk bębenkowy?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false, excludesQuestions: [6,7,8,9,10,12,11,14] },
      { text: 'nie', isActive: false, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 22,
    text: 'Czy wszedł o własnych siłach?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false, excludesQuestions: [50,51,52,53,54,46,47,44,43,42,41,40,48,49,39,27,29,30,26,25] },
      { text: 'nie', isActive: false, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 39,
    text: 'Czy występują również wymioty?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false, excludesQuestions: [49] },
      { text: 'nie', isActive: false, isClicked: false, excludesQuestions: [46,47,44,43,42,41,40] },
    ],
  },
  {
    id: 25,
    text: 'Czy znaleziono pasożyty?',
    answers: [
      { text: 'nie', isActive: false, isClicked: false, excludesQuestions: [] },
      { text: 'tak', isActive: false, isClicked: false, excludesQuestions: [27,29,30,26] },
    ],
  },
  {
    id: 35,
    text: 'Postępowanie: Zlecić posiew i cytologię. Czy badania zostały wykonane?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false, excludesQuestions: [] },
      { text: 'nie', isActive: false, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 6,
    text: 'Czy występuje bladość błon śluzowych i ostry brzuch?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false, excludesQuestions: [] },
      { text: 'nie', isActive: false, isClicked: false, excludesQuestions: [7,8,9,10,11,12,14] },
    ],
  },
  {
    id: 7,
    text: 'Czy zwierzę miało kontakt z trucizną?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false, excludesQuestions: [8,9,10,11,12,14] },
      { text: 'nie', isActive: false, isClicked: false, excludesQuestions: [] },
      { text: 'nie wiem', isActive: false, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 8,
    text: 'Czy zwierzę jest płci żeńskiej?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false, excludesQuestions: [14,12,11] },
      { text: 'nie', isActive: false, isClicked: false, excludesQuestions: [9] },
    ],
  },
  {
    id: 9,
    text: 'Czy w badaniu RTG/USG widać zmiany w prostacie?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false, excludesQuestions: [10] },
      { text: 'nie', isActive: false, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 10,
    text: 'Czy zmiany występują w pęcherzu moczowym?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false, excludesQuestions: [11] },
      { text: 'nie', isActive: false, isClicked: false, excludesQuestions: [] },
    ],
  }, {
    id: 11,
    text: 'Czy zwierzę ma jakieś zmiany rozrostowe w innych narządach?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false, excludesQuestions: [] },
      { text: 'nie', isActive: false, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 12,
    text: 'Czy w badaniu RTG/USG widać zmiany w macicy/jajnikach?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false, excludesQuestions: [10,11] },
      { text: 'nie', isActive: false, isClicked: false, excludesQuestions: [14] },
    ],
  },
  {
    id: 14,
    text: 'Czy w macicy widać symptomy ciąży?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false, excludesQuestions: [] },
      { text: 'nie', isActive: false, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 15,
    text: 'Czy kot zjadł coś podejrzewanego lub mógł mieć kontakt z substancją trującą?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false, excludesQuestions: [16,17,18,19,20] },
      { text: 'nie', isActive: false, isClicked: false, excludesQuestions: [] },
      { text: 'nie wiem', isActive: false, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 16,
    text: 'Czy u kota w momencie wystąpienia problemów atak pojawił się po raz pierwszy?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false, excludesQuestions: [] },
      { text: 'nie', isActive: false, isClicked: false, excludesQuestions: [17,18,19,20] },
    ],
  },
  {
    id: 17,
    text: 'Czy poziom insuliny jest podwyższony lub prawidłowy?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false, excludesQuestions: [18,19,20] },
      { text: 'nie', isActive: false, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 18,
    text: 'Czy poziom insuliny jest obniżony?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false, excludesQuestions: [] },
      { text: 'nie', isActive: false, isClicked: false, excludesQuestions: [19,20] },
    ],
  },
  {
    id: 19,
    text: 'Czy poziom mocznika jest obniżony a parametry wątrobowe są podwyższone?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false, excludesQuestions: [20] },
      { text: 'nie', isActive: false, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 20,
    text: 'Czy wynik MR, TK, badanie płynu mózgowo-rdzeniowego są nieprawidłowe?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false, excludesQuestions: [] },
      { text: 'nie', isActive: false, isClicked: false, excludesQuestions: [] },
    ],
  },
   
  
  
  {
    id: 26,
    text: 'Postępowanie: Zastosowanie profilaktycznego zwalczania pcheł. Czy świąd ustał?',
    answers: [
      { text: 'nie', isActive: false, isClicked: false, excludesQuestions: [] },
      { text: 'tak', isActive: false, isClicked: false, excludesQuestions: [27,29,30] },
    ],
  },
  {
    id: 27,
    text: 'Postępowanie: Wykonać badanie poznawcze na obecność świerzbu. Czy znaleziono objawy świerzbu',
    answers: [
      { text: 'nie', isActive: false, isClicked: false, excludesQuestions: [] },
      { text: 'tak', isActive: false, isClicked: false, excludesQuestions: [29,30] },
    ],
  },
  {
    id: 28,
    text: 'Diagnoza: Świerzb. Postępowanie: Zastosować leczenie przeciwpasożytnicze',
    answers: [
      { text: 'nie', isActive: false, isClicked: false, excludesQuestions: [] },
      { text: 'tak', isActive: false, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 29,
    text: 'Postępowanie: Wykonać cytologię. Czy cytologia wykazała brak mikroorganizmów?',
    answers: [
      { text: 'nie', isActive: false, isClicked: false, excludesQuestions: [] },
      { text: 'tak', isActive: false, isClicked: false, excludesQuestions: [30] },
    ],
  },
  {
    id: 30,
    text: 'Czy cytologia wykazała bakterie?',
    answers: [
      { text: 'nie', isActive: false, isClicked: false, excludesQuestions: [] },
      { text: 'tak', isActive: false, isClicked: false, excludesQuestions: [] },
    ],
  },
  
  
  {
    id: 36,
    text: 'Czy badania wskazały na obecność pasożytów?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false, excludesQuestions: [37,38] },
      { text: 'nie', isActive: false, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 37,
    text: 'Czy łysienie jest symetrycznie rozsiane?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false, excludesQuestions: [] },
      { text: 'nie', isActive: false, isClicked: false, excludesQuestions: [38] },
    ],
  },
  {
    id: 38,
    text: 'Postępowanie: Wykonać hematologię i trichogram. Czy wyniki były prawidłowe',
    answers: [
      { text: 'tak', isActive: false, isClicked: false, excludesQuestions: [] },
      { text: 'nie', isActive: false, isClicked: false, excludesQuestions: [] },
    ],
  },
  
  {
    id: 40,
    text: 'Czy objawy są przewlekłe?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false, excludesQuestions: [48] },
      { text: 'nie', isActive: false, isClicked: false, excludesQuestions: [46,47,44,43,42,41] },
    ],
  },
  {
    id: 41,
    text: 'Czy zlecono badanie morfologiczne krwi, biochemiczne surowicy i badanie kału?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false, excludesQuestions: [] },
      { text: 'nie', isActive: false, isClicked: false, excludesQuestions: [46,47,44,43,42] },
    ],
  },
  {
    id: 42,
    text: 'Czy badanie morfologiczne lub biochemiczne nie było w normie?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false, excludesQuestions: [] },
      { text: 'nie', isActive: false, isClicked: false, excludesQuestions: [46,47,44,43] },
    ],
  },
  {
    id: 43,
    text: 'Czy badanie kału również było poza normą?',
    answers: [
      { text: 'Tak było poza normą', isActive: false, isClicked: false, excludesQuestions: [] },
      { text: 'Nie, było w normie', isActive: false, isClicked: false, excludesQuestions: [47,46,44] },
    ],
  },
  {
    id: 44,
    text: 'Postępowanie: Wykonać badanie USG, Czy wykonano badanie?',
    answers: [
      { text: 'Wykonano', isActive: false, isClicked: false, excludesQuestions: [] },
      { text: 'Nie wykonano', isActive: false, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 46,
    text: 'Czy znaleziono coś niepokojącego podczas badania USG?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false, excludesQuestions: [47] },
      { text: 'nie', isActive: false, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 47,
    text: 'Wykonać laparotomię. Czy badanie wykazało jakieś nieprawidłości?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false, excludesQuestions: [] },
      { text: 'nie', isActive: false, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 48,
    text: 'Czy pies jadł coś nowego?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false, excludesQuestions: [] },
      { text: 'nie', isActive: false, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 49,
    text: 'Czy objawy pojawiły się nagle?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false, excludesQuestions: [] },
      { text: 'nie', isActive: false, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 50,
    text: 'Czy oddycha?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false, excludesQuestions: [53,54] },
      { text: 'nie', isActive: false, isClicked: false, excludesQuestions: [51,52] },
    ],
  },
  {
    id: 51,
    text: 'Czy liczba oddechów jest prawidłowa?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false, excludesQuestions: [] },
      { text: 'nie', isActive: false, isClicked: false, excludesQuestions: [52] },
    ],
  },
  {
    id: 52,
    text: 'Czy widać krwawienia?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false, excludesQuestions: [] },
      { text: 'nie', isActive: false, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 53,
    text: 'Przystąpiono do podstawowej resuscytacji?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false, excludesQuestions: [] },
      { text: 'nie', isActive: false, isClicked: false, excludesQuestions: [54] },
    ],
  },
  {
    id: 54,
    text: 'Czy zwierzę odzyskało oddech?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false, excludesQuestions: [] },
      { text: 'nie', isActive: false, isClicked: false, excludesQuestions: [] },
    ],
  },
]

const buttonStyle: CSSProperties = {
  backgroundColor: '#007BFF',
  color: 'white',
  padding: '10px 30px',
  margin: '10px',
  border: 'none',
  borderRadius: '4px',
  textTransform: 'uppercase' as const,
  cursor: 'pointer',
};

const questionContainerStyle: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f0f0f0',
  padding: '20px',
  borderRadius: '15px',
  margin: '10px 0',
};

const diagnosisRules: DiagnosisRule[] = [
  {
    diagnosis: 'Postępowanie: Wykonaj dalszą diagnostykę',
    rules: [
      { questionId: 1, expectedAnswer: 'kot' },
      { questionId: 2, expectedAnswer: 'nie' },
      { questionId: 4, expectedAnswer: 'tak' },
      { questionId: 5, expectedAnswer: 'nie' },
      { questionId: 6, expectedAnswer: 'nie' },
    ],
  },
  {
    diagnosis: 'Diagnoza: Skręt żołądka',
    rules: [
      { questionId: 1, expectedAnswer: 'kot' },
      { questionId: 2, expectedAnswer: 'nie' },
      { questionId: 4, expectedAnswer: 'tak' },
      { questionId: 5, expectedAnswer: 'tak' },
    ],
  },
  {
    diagnosis: 'Postępowanie: Wykonaj badanie krwi!',
    rules: [
      { questionId: 1, expectedAnswer: 'kot' },
      { questionId: 2, expectedAnswer: 'nie' },
      { questionId: 4, expectedAnswer: 'tak' },
      { questionId: 5, expectedAnswer: 'nie' },
      { questionId: 6, expectedAnswer: 'tak' },
      { questionId: 7, expectedAnswer: 'nie' },
      { questionId: 8, expectedAnswer: 'nie' },
      { questionId: 12, expectedAnswer: 'nie' },
      { questionId: 10, expectedAnswer: 'nie' },
      { questionId: 11, expectedAnswer: 'tak' },
    ],
  },
   {
      diagnosis: 'Postępowanie: Wykonaj USG narządów wewnętrznych',
      rules: [
        { questionId: 1, expectedAnswer: 'kot' },
      { questionId: 2, expectedAnswer: 'tak' },
      { questionId: 3, expectedAnswer: 'nie' },
      { questionId: 15, expectedAnswer: 'nie' },
      { questionId: 16, expectedAnswer: 'tak' },
      { questionId: 17, expectedAnswer: 'nie' },
      { questionId: 18, expectedAnswer: 'nie' },
      ],
    },
  {
    diagnosis: 'Diagnoza: Zatrucie trucizną niewiadomego pochodzenia',
    rules: [
      { questionId: 1, expectedAnswer: 'kot' },
      { questionId: 2, expectedAnswer: 'nie' },
      { questionId: 4, expectedAnswer: 'tak' },
      { questionId: 5, expectedAnswer: 'nie' },
      { questionId: 6, expectedAnswer: 'tak' },
      { questionId: 7, expectedAnswer: 'tak' },
    ],
  },
  {
    diagnosis: 'Diagnoza: Rozrost nowotworowy',
    rules: [
      { questionId: 1, expectedAnswer: 'kot' },
      { questionId: 2, expectedAnswer: 'nie' },
      { questionId: 4, expectedAnswer: 'tak' },
      { questionId: 5, expectedAnswer: 'nie' },
      { questionId: 6, expectedAnswer: 'tak' },
      { questionId: 7, expectedAnswer: 'nie' },
      { questionId: 8, expectedAnswer: 'nie' },
      { questionId: 12, expectedAnswer: 'nie' },
      { questionId: 10, expectedAnswer: 'tak' },
    ],
  },
  {
    diagnosis: 'Diagnoza: Otyłość',
    rules: [
      { questionId: 1, expectedAnswer: 'kot' },
      { questionId: 2, expectedAnswer: 'nie' },
      { questionId: 4, expectedAnswer: 'tak' },
      { questionId: 5, expectedAnswer: 'nie' },
      { questionId: 6, expectedAnswer: 'tak' },
      { questionId: 7, expectedAnswer: 'nie' },
      { questionId: 8, expectedAnswer: 'nie' },
      { questionId: 12, expectedAnswer: 'nie' },
      { questionId: 10, expectedAnswer: 'nie' },
      { questionId: 11, expectedAnswer: 'nie' },
    ],
  },
  {
    diagnosis: 'Postępowanie: Wykonaj badanie krwi!',
    rules: [
      { questionId: 1, expectedAnswer: 'kot' },
      { questionId: 2, expectedAnswer: 'nie' },
      { questionId: 4, expectedAnswer: 'nie' },
      
    ],
  },
  {
    diagnosis: 'Diagnoza: Przerost/torbiele prostaty',
    rules: [
      { questionId: 1, expectedAnswer: 'kot' },
      { questionId: 2, expectedAnswer: 'nie' },
      { questionId: 4, expectedAnswer: 'tak' },
      { questionId: 5, expectedAnswer: 'nie' },
      { questionId: 6, expectedAnswer: 'tak' },
      { questionId: 7, expectedAnswer: 'nie' },
      { questionId: 8, expectedAnswer: 'tak' },
      { questionId: 9, expectedAnswer: 'tak' },
    ],
  },
  {
    diagnosis: 'Diagnoza: Ciąża',
    rules: [
      { questionId: 1, expectedAnswer: 'kot' },
      { questionId: 2, expectedAnswer: 'nie' },
      { questionId: 4, expectedAnswer: 'tak' },
      { questionId: 5, expectedAnswer: 'nie' },
      { questionId: 6, expectedAnswer: 'tak' },
      { questionId: 7, expectedAnswer: 'nie' },
      { questionId: 8, expectedAnswer: 'nie' },
      { questionId: 12, expectedAnswer: 'tak' },
      { questionId: 14, expectedAnswer: 'tak' },
    ],
  },
  {
    diagnosis: 'Diagnoza: rozrost endometrium',
    rules: [
      { questionId: 1, expectedAnswer: 'kot' },
      { questionId: 2, expectedAnswer: 'nie' },
      { questionId: 4, expectedAnswer: 'tak' },
      { questionId: 5, expectedAnswer: 'nie' },
      { questionId: 6, expectedAnswer: 'tak' },
      { questionId: 7, expectedAnswer: 'nie' },
      { questionId: 8, expectedAnswer: 'nie' },
      { questionId: 12, expectedAnswer: 'tak' },
      { questionId: 14, expectedAnswer: 'nie' },
    ],
  },
  {
    diagnosis: 'Diagnoza: Wyspiak trzustkowy',
    rules: [
      { questionId: 1, expectedAnswer: 'kot' },
      { questionId: 2, expectedAnswer: 'tak' },
      { questionId: 3, expectedAnswer: 'nie' },
      { questionId: 15, expectedAnswer: 'nie' },
      { questionId: 16, expectedAnswer: 'tak' },
      { questionId: 17, expectedAnswer: 'tak' },
    ],
  },
  {
    diagnosis: 'Diagnoza: Hepatopatia',
    rules: [
      { questionId: 1, expectedAnswer: 'kot' },
      { questionId: 2, expectedAnswer: 'tak' },
      { questionId: 3, expectedAnswer: 'nie' },
      { questionId: 15, expectedAnswer: 'nie' },
      { questionId: 16, expectedAnswer: 'tak' },
      { questionId: 17, expectedAnswer: 'nie' },
      { questionId: 18, expectedAnswer: 'tak' },
      { questionId: 19, expectedAnswer: 'tak' },
    ],
  },
  {
    diagnosis: 'Diagnoza: Zmiana nowotworowa. Postępowanie: rozszerz diagnostykę ',
    rules: [
      { questionId: 1, expectedAnswer: 'kot' },
      { questionId: 2, expectedAnswer: 'tak' },
      { questionId: 3, expectedAnswer: 'nie' },
      { questionId: 15, expectedAnswer: 'nie' },
      { questionId: 16, expectedAnswer: 'tak' },
      { questionId: 17, expectedAnswer: 'nie' },
      { questionId: 18, expectedAnswer: 'tak' },
      { questionId: 19, expectedAnswer: 'nie' },
      { questionId: 20, expectedAnswer: 'tak' },
    ],
  },
  {
    diagnosis: 'Diagnoza: Choroba idiopatyczna',
    rules: [
      { questionId: 1, expectedAnswer: 'kot' },
      { questionId: 2, expectedAnswer: 'tak' },
      { questionId: 3, expectedAnswer: 'nie' },
      { questionId: 15, expectedAnswer: 'nie' },
      { questionId: 16, expectedAnswer: 'tak' },
      { questionId: 17, expectedAnswer: 'nie' },
      { questionId: 18, expectedAnswer: 'tak' },
      { questionId: 19, expectedAnswer: 'nie' },
      { questionId: 20, expectedAnswer: 'nie' },
    ],
  },
  {
    diagnosis: 'Postepowanie: Wykonaj badania krwi i zleć konsultację neurologiczną',
    rules: [
      { questionId: 1, expectedAnswer: 'kot' },
      { questionId: 2, expectedAnswer: 'tak' },
      { questionId: 3, expectedAnswer: 'nie' },
      { questionId: 15, expectedAnswer: 'nie' },
      { questionId: 16, expectedAnswer: 'nie' },
    ],
  },
  {
    diagnosis: 'Diagnoza: Podejrzenie zatrucia i ewentualne wykazanie toksyn w organizmie',
    rules: [
      { questionId: 1, expectedAnswer: 'kot' },
      { questionId: 2, expectedAnswer: 'tak' },
      { questionId: 3, expectedAnswer: 'nie' },
      { questionId: 15, expectedAnswer: 'tak' },
    ],
  },
  {
    diagnosis: 'Postępowanie: Lecz doraźnie, pobierz krew do badań.',
    rules: [
      { questionId: 1, expectedAnswer: 'kot' },
      { questionId: 2, expectedAnswer: 'tak' },
      { questionId: 3, expectedAnswer: 'tak' },
    ],
  },
  {
    diagnosis: 'Diagnoza: Zakażenie pasożytnicze. Postępowanie: Zweryfikować pasożyty i zastosować odpowiednie leczenie przeciwpasożytnicze',
    rules: [
      { questionId: 1, expectedAnswer: 'pies' },
      { questionId: 21, expectedAnswer: 'nie' },
      { questionId: 23, expectedAnswer: 'nie' },
      { questionId: 24, expectedAnswer: 'nie' },
      { questionId: 31, expectedAnswer: 'tak' },
      { questionId: 35, expectedAnswer: 'tak' },
      { questionId: 36, expectedAnswer: 'tak' },
      
    ],
  },
  {
    diagnosis: 'Diagnoza: Alergiczne pchle zapalenie skóry. Postępowanie: wdrożyć leczenie przeciwpasożytnicze i przeciwświądowe.',
    rules: [
      { questionId: 1, expectedAnswer: 'pies' },
      { questionId: 21, expectedAnswer: 'nie' },
      { questionId: 23, expectedAnswer: 'nie' },
      { questionId: 24, expectedAnswer: 'tak' },
      { questionId: 25, expectedAnswer: 'nie' },
      { questionId: 26, expectedAnswer: 'tak' },
    ],
  },
  {
    diagnosis: 'Diagnoza: Alergia. Postępowanie: Zastosować dietę eliminacyjną i zastosować preparaty przeciwpasożytnicze',
    rules: [
      { questionId: 1, expectedAnswer: 'pies' },
      { questionId: 21, expectedAnswer: 'nie' },
      { questionId: 23, expectedAnswer: 'nie' },
      { questionId: 24, expectedAnswer: 'tak' },
      { questionId: 25, expectedAnswer: 'nie' },
      { questionId: 26, expectedAnswer: 'nie' },
      { questionId: 27, expectedAnswer: 'nie' },
      { questionId: 29, expectedAnswer: 'tak' },

    ],
  },
  {
    diagnosis: 'Postępowanie: Podać właściwe antybiotyki',
    rules: [
      { questionId: 1, expectedAnswer: 'pies' },
      { questionId: 21, expectedAnswer: 'nie' },
      { questionId: 23, expectedAnswer: 'nie' },
      { questionId: 24, expectedAnswer: 'tak' },
      { questionId: 25, expectedAnswer: 'nie' },
      { questionId: 26, expectedAnswer: 'nie' },
      { questionId: 27, expectedAnswer: 'nie' },
      { questionId: 29, expectedAnswer: 'nie' },
      { questionId: 30, expectedAnswer: 'tak' },
    ],
  },
  {
    diagnosis: 'Postępowanie: Zlecić biopsję. Prawdopodobna Diagnoza: Nowotwór',
    rules: [
      { questionId: 1, expectedAnswer: 'pies' },
      { questionId: 21, expectedAnswer: 'nie' },
      { questionId: 23, expectedAnswer: 'nie' },
      { questionId: 24, expectedAnswer: 'nie' },
      { questionId: 31, expectedAnswer: 'nie' },
      { questionId: 32, expectedAnswer: 'nie' },
      { questionId: 33, expectedAnswer: 'nie' },
      { questionId: 34, expectedAnswer: 'tak' },
    ],
  },
  {
    diagnosis: 'Postępowanie: Wykonać cytologię. Prawdopodobna Diagnoza: ropowica połączeń śluzowo-skórnych',
    rules: [
      { questionId: 1, expectedAnswer: 'pies' },
      { questionId: 21, expectedAnswer: 'nie' },
      { questionId: 23, expectedAnswer: 'nie' },
      { questionId: 24, expectedAnswer: 'nie' },
      { questionId: 31, expectedAnswer: 'nie' },
      { questionId: 32, expectedAnswer: 'nie' },
      { questionId: 33, expectedAnswer: 'tak' },
    ],
  },
  {
    diagnosis: 'Postępowanie: Wykonać biopsję',
    rules: [
      { questionId: 1, expectedAnswer: 'pies' },
      { questionId: 21, expectedAnswer: 'nie' },
      { questionId: 23, expectedAnswer: 'nie' },
      { questionId: 24, expectedAnswer: 'nie' },
      { questionId: 31, expectedAnswer: 'nie' },
      { questionId: 32, expectedAnswer: 'tak' },
    ],
  },

  {
    diagnosis: 'Potencjalna diagnoza: Leiszmanioza',
    rules: [
      { questionId: 1, expectedAnswer: 'pies' },
      { questionId: 21, expectedAnswer: 'nie' },
      { questionId: 23, expectedAnswer: 'nie' },
      { questionId: 24, expectedAnswer: 'nie' },
      { questionId: 31, expectedAnswer: 'nie' },
      { questionId: 32, expectedAnswer: 'nie' },
      { questionId: 33, expectedAnswer: 'nie' },
      { questionId: 34, expectedAnswer: 'nie' },
    ],
  },
  {
    diagnosis: 'Postępowanie: Wykonać biopsję i zinterpretować wyniki',
    rules: [
      { questionId: 1, expectedAnswer: 'pies' },
      { questionId: 21, expectedAnswer: 'nie' },
      { questionId: 23, expectedAnswer: 'nie' },
      { questionId: 24, expectedAnswer: 'nie' },
      { questionId: 31, expectedAnswer: 'tak' },
      { questionId: 35, expectedAnswer: 'tak' },
      { questionId: 36, expectedAnswer: 'nie' },
      { questionId: 37, expectedAnswer: 'nie' },
    ],
  },
  {
    diagnosis: 'Diagnoza: Pasożyty. Postępowanie: Zweryfikować pasoyty i zastosować odpowiednie leczenie przeciwpasozytnicze',
    rules: [
      { questionId: 1, expectedAnswer: 'pies' },
      { questionId: 21, expectedAnswer: 'nie' },
      { questionId: 23, expectedAnswer: 'nie' },
      { questionId: 24, expectedAnswer: 'tak' },
      { questionId: 25, expectedAnswer: 'tak' },
    ],
  },
  {
    diagnosis: 'Diagnoza: Niedoczynność tarczycy. Postępowanie: Podjąć leczenie.',
    rules: [
      { questionId: 1, expectedAnswer: 'pies' },
      { questionId: 21, expectedAnswer: 'nie' },
      { questionId: 23, expectedAnswer: 'nie' },
      { questionId: 24, expectedAnswer: 'nie' },
      { questionId: 31, expectedAnswer: 'tak' },
      { questionId: 35, expectedAnswer: 'tak' },
      { questionId: 36, expectedAnswer: 'nie' },
      { questionId: 37, expectedAnswer: 'tak' },
      { questionId: 38, expectedAnswer: 'tak' },
    ],
  },
  {
    diagnosis: 'Diagnoza: Choroby wrodzone lub łysienie rozsiane.',
    rules: [
      { questionId: 1, expectedAnswer: 'pies' },
      { questionId: 21, expectedAnswer: 'nie' },
      { questionId: 23, expectedAnswer: 'nie' },
      { questionId: 24, expectedAnswer: 'nie' },
      { questionId: 31, expectedAnswer: 'tak' },
      { questionId: 35, expectedAnswer: 'tak' },
      { questionId: 36, expectedAnswer: 'nie' },
      { questionId: 37, expectedAnswer: 'tak' },
      { questionId: 38, expectedAnswer: 'nie' },
    ],
  },
  {
    diagnosis: 'Postępowanie: Zlecić wymagane badania w celu dalszej diagnozy',
    rules: [
      { questionId: 1, expectedAnswer: 'pies' },
      { questionId: 21, expectedAnswer: 'nie' },
      { questionId: 23, expectedAnswer: 'tak' },
      { questionId: 39, expectedAnswer: 'tak' },
      { questionId: 40, expectedAnswer: 'tak' },
      { questionId: 41, expectedAnswer: 'nie' },
    ],
  },
  {
    diagnosis: 'Diagnoza: Choroba ogólnoustrojowa, zastosuj antybiotykoterapię',
    rules: [
      { questionId: 1, expectedAnswer: 'pies' },
      { questionId: 21, expectedAnswer: 'nie' },
      { questionId: 23, expectedAnswer: 'tak' },
      { questionId: 39, expectedAnswer: 'tak' },
      { questionId: 40, expectedAnswer: 'tak' },
      { questionId: 41, expectedAnswer: 'tak' },
      { questionId: 42, expectedAnswer: 'nie' },
    ],
  },
  {
    diagnosis: 'Brak wiedzy z danego mudułu',
    rules: [
      { questionId: 1, expectedAnswer: 'pies' },
      { questionId: 21, expectedAnswer: 'nie' },
      { questionId: 23, expectedAnswer: 'tak' },
      { questionId: 39, expectedAnswer: 'tak' },
      { questionId: 40, expectedAnswer: 'tak' },
      { questionId: 41, expectedAnswer: 'tak' },
      { questionId: 42, expectedAnswer: 'nie' },
      { questionId: 43, expectedAnswer: 'tak' },
      { questionId: 44, expectedAnswer: 'tak' },
      { questionId: 46, expectedAnswer: 'nie' },
      { questionId: 47, expectedAnswer: 'nie' },
    ],
  },
  {
    diagnosis: 'Brak wiedzy z danego modułu',
    rules: [
      { questionId: 1, expectedAnswer: 'pies' },
      { questionId: 21, expectedAnswer: 'nie' },
      { questionId: 23, expectedAnswer: 'nie' },
      { questionId: 24, expectedAnswer: 'tak' },
      { questionId: 25, expectedAnswer: 'nie' },
      { questionId: 26, expectedAnswer: 'nie' },
      { questionId: 27, expectedAnswer: 'nie' },
      { questionId: 29, expectedAnswer: 'nie' },
      { questionId: 30, expectedAnswer: 'nie' },
    ],
  },
  {
    diagnosis: 'Postępowanie: Przystąpić do działań chirurgicznych',
    rules: [
      { questionId: 1, expectedAnswer: 'pies' },
      { questionId: 21, expectedAnswer: 'nie' },
      { questionId: 23, expectedAnswer: 'tak' },
      { questionId: 39, expectedAnswer: 'tak' },
      { questionId: 40, expectedAnswer: 'tak' },
      { questionId: 41, expectedAnswer: 'tak' },
      { questionId: 42, expectedAnswer: 'nie' },
      { questionId: 43, expectedAnswer: 'tak' },
      { questionId: 44, expectedAnswer: 'tak' },
      { questionId: 46, expectedAnswer: 'nie' },
      { questionId: 47, expectedAnswer: 'tak' },
    ],
  },
  {
    diagnosis: 'Postępowanie: Zinterpretować nieprawidłowość i podjąć zabieg chirurgiczny',
    rules: [
      { questionId: 1, expectedAnswer: 'pies' },
      { questionId: 21, expectedAnswer: 'nie' },
      { questionId: 23, expectedAnswer: 'tak' },
      { questionId: 39, expectedAnswer: 'tak' },
      { questionId: 40, expectedAnswer: 'tak' },
      { questionId: 41, expectedAnswer: 'tak' },
      { questionId: 42, expectedAnswer: 'nie' },
      { questionId: 43, expectedAnswer: 'tak' },
      { questionId: 44, expectedAnswer: 'tak' },
      { questionId: 46, expectedAnswer: 'tak' },
    ],
  },
  {
    diagnosis: 'Diagnoza: Zakażenie świerzbowcem. Postępowanie: Zastosować leczenie przeciwpasożytnicze',
    rules: [
      { questionId: 1, expectedAnswer: 'pies' },
      { questionId: 21, expectedAnswer: 'nie' },
      { questionId: 23, expectedAnswer: 'nie' },
      { questionId: 24, expectedAnswer: 'tak' },
      { questionId: 25, expectedAnswer: 'nie' },
      { questionId: 26, expectedAnswer: 'nie' },
      { questionId: 27, expectedAnswer: 'tak' },
      
    ],
  },
  {
    diagnosis: 'Diagnoza: Podejrzenie choroby ogólnoustrojowej',
    rules: [
      { questionId: 1, expectedAnswer: 'pies' },
      { questionId: 21, expectedAnswer: 'nie' },
      { questionId: 23, expectedAnswer: 'tak' },
      { questionId: 39, expectedAnswer: 'tak' },
      { questionId: 40, expectedAnswer: 'tak' },
      { questionId: 41, expectedAnswer: 'tak' },
      { questionId: 42, expectedAnswer: 'tak' },
      { questionId: 43, expectedAnswer: 'nie' },
    ],
  },
  {
    diagnosis: 'Postępowanie: Zlecenie badań bakteriologicznych. Potencjalna Diagnoza: Zatrucie bakteryjne układu pokarmowego',
    rules: [
      { questionId: 1, expectedAnswer: 'pies' },
      { questionId: 21, expectedAnswer: 'nie' },
      { questionId: 23, expectedAnswer: 'tak' },
      { questionId: 39, expectedAnswer: 'tak' },
      { questionId: 40, expectedAnswer: 'nie' },
      { questionId: 48, expectedAnswer: 'nie' },
    ],
  },
  {
    diagnosis: 'Diagnoza: Zatrucie pokarmowe.',
    rules: [
      { questionId: 1, expectedAnswer: 'pies' },
      { questionId: 21, expectedAnswer: 'nie' },
      { questionId: 23, expectedAnswer: 'tak' },
      { questionId: 39, expectedAnswer: 'tak' },
      { questionId: 40, expectedAnswer: 'nie' },
      { questionId: 48, expectedAnswer: 'tak' },
    ],
  },
  {
    diagnosis: 'Postępowanie: Zlecić badania kału. Postępowanie: Podać płyny dożylnie',
    rules: [
      { questionId: 1, expectedAnswer: 'pies' },
      { questionId: 21, expectedAnswer: 'nie' },
      { questionId: 23, expectedAnswer: 'tak' },
      { questionId: 39, expectedAnswer: 'nie' },
      { questionId: 49, expectedAnswer: 'nie' },
    ],
  },
  {
    diagnosis: 'Diagnoza: Zatrucie pokarmowe lub niestrawność, zalecana obserwacja',
    rules: [
      { questionId: 1, expectedAnswer: 'pies' },
      { questionId: 21, expectedAnswer: 'nie' },
      { questionId: 23, expectedAnswer: 'tak' },
      { questionId: 39, expectedAnswer: 'nie' },
      { questionId: 49, expectedAnswer: 'tak' },
    ],
  },
  {
    diagnosis: 'Postępowanie: Sprawdź czy pies nie jest we wstrząsie. wykonaj RTG i badania krwi.',
    rules: [
      { questionId: 1, expectedAnswer: 'pies' },
      { questionId: 21, expectedAnswer: 'tak' },
      { questionId: 22, expectedAnswer: 'tak' }
    ],
  },
  {
    diagnosis: 'Postępowanie: Wykonaj RTG i zaleć obserwację psa.',
    rules: [
      { questionId: 1, expectedAnswer: 'pies' },
       { questionId: 21, expectedAnswer: 'tak' },
       { questionId: 22, expectedAnswer: 'nie' },
       { questionId: 50, expectedAnswer: 'tak' },
       { questionId: 51, expectedAnswer: 'tak' },
       { questionId: 52, expectedAnswer: 'nie' },
    ],
   },
   {
    diagnosis: 'Postępowanie: Zatamuj krwawienie i podaj leki na zwiększenie krzepliwości krwi',
    rules: [
       { questionId: 1, expectedAnswer: 'pies' },
       { questionId: 21, expectedAnswer: 'tak' },
       { questionId: 22, expectedAnswer: 'nie' },
       { questionId: 50, expectedAnswer: 'tak' },
       { questionId: 51, expectedAnswer: 'tak' },
       { questionId: 52, expectedAnswer: 'tak' },
    ],
  },
  {
    diagnosis: 'Postępowanie: Podepnij zestaw do monitorowania pracy serca i podaj odpowiednie leki',
    rules: [
      { questionId: 1, expectedAnswer: 'pies' },
      { questionId: 21, expectedAnswer: 'tak' },
      { questionId: 22, expectedAnswer: 'nie' },
      { questionId: 50, expectedAnswer: 'tak' },
      { questionId: 51, expectedAnswer: 'nie' }
    ],
  },
  {
      diagnosis: 'Przystąp do resuscytacji',
      rules: [
      { questionId: 1, expectedAnswer: 'pies' },
      { questionId: 21, expectedAnswer: 'tak' },
      { questionId: 22, expectedAnswer: 'nie' },
      { questionId: 50, expectedAnswer: 'nie' },
      { questionId: 53, expectedAnswer: 'nie' }
      ],
    },
  {
    diagnosis: 'Diagnoza: Przeprowadź badanie mające na celu znalezienie złamań',
    rules: [
      { questionId: 1, expectedAnswer: 'pies' },
      { questionId: 21, expectedAnswer: 'tak' },
      { questionId: 22, expectedAnswer: 'nie' },
      { questionId: 50, expectedAnswer: 'nie' },
      { questionId: 53, expectedAnswer: 'tak' },
      { questionId: 54, expectedAnswer: 'tak' }
    ],
  },{
    diagnosis: 'Diagnoza: Zwierzę nie żyje',
    rules: [
      { questionId: 1, expectedAnswer: 'pies' },
      { questionId: 21, expectedAnswer: 'tak' },
      { questionId: 22, expectedAnswer: 'nie' },
      { questionId: 50, expectedAnswer: 'nie' },
      { questionId: 53, expectedAnswer: 'tak' },
      { questionId: 54, expectedAnswer: 'nie' }
    ],
  },
];
  

function App() {
  const [questions, setQuestions] = useState(initialQuestions);
  const [diagnosis, setDiagnosis] = useState<string | null>(null);
  const diagnosisRef = useRef<HTMLDivElement>(null);
  
  const onSelectAnswer = (id: number, answerText: string) => {
    const updatedQuestions = questions.map(question => {
      if (question.id === id) {
        const updatedAnswers = question.answers.map(answer => {
          if (answer.text === answerText) {
            if (!answer.isClicked) {
              answer.isClicked = true;
              answer.isActive = false;
              // Wyłącz pytania, które są wymienione w excludesQuestions dla wybranej odpowiedzi.
              answer.excludesQuestions.forEach(excludedQuestionId => {
                const excludedQuestion = questions.find(q => q.id === excludedQuestionId);
                if (excludedQuestion) {
                  excludedQuestion.isActive = false;
                  excludedQuestion.answers.forEach(a => a.isActive = false);
                }
              });
            }
          } else {
            answer.isActive = false;
          }
          return answer;
        });

        return { ...question, answers: updatedAnswers };
      }
      return question;
    });

     // Sprawdzanie reguł diagnozy
     const generateDiagnosis = (questions: QuestionData[], rules: DiagnosisRule[]): string | null => {
      for (let i = 0; i < rules.length; i++) {
        const rule = rules[i];
        const allConditionsMet = rule.rules.every(({ questionId, expectedAnswer }) => {
          const question = questions.find(q => q.id === questionId);
          if (!question) return false;
    
          const answer = question.answers.find(a => a.isClicked);
          return answer && answer.text === expectedAnswer;
        });
    
        if (allConditionsMet) {
          return rule.diagnosis;
        }
      }
    
      return null;
    };
    

    setQuestions(updatedQuestions);
    // Aktualizacja diagnozy
    const diagnosis = generateDiagnosis(updatedQuestions, diagnosisRules);
    setDiagnosis(diagnosis);
  };


  const resetQuestions = () => {
    const resettedQuestions = questions.map(question => {
      const resettedAnswers = question.answers.map(answer => {
        return { ...answer, isClicked: false, isActive: true };
      });
      return { ...question, answers: resettedAnswers, isActive: true };
    });
    setQuestions(resettedQuestions);
  };


  useEffect(() => {
    if (diagnosis && diagnosisRef.current) {
      diagnosisRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [diagnosis]);
  

  return (
    <>
      <div className='App-header'> VetAdvice</div>
      <div className='App-header' >
      <button className='resetButton' onClick={resetQuestions}>Rozpocznij</button>
        <button className='resetButton' onClick={resetQuestions}>Resetuj odpowiedzi</button>
        </div>
      <div>
        {questions.map(({ id, text, answers, isActive }) => (
          <div style={{ ...questionContainerStyle, backgroundColor: isActive ? '#f0f0f0' : '#ccc' }} key={id}>
            <p>{text}</p>
            {answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => onSelectAnswer(id, answer.text)}
                disabled={!answer.isActive}
                style={{ ...buttonStyle, backgroundColor: answer.isClicked ? 'green' : '#007BFF' }}
              >
                {answer.text}
              </button>
            ))}
          </div>
        ))}
        {diagnosis && <div ref={diagnosisRef} className="diagnosis-container">
          <h2>Wynik:</h2>
          <p>{diagnosis}</p>
        </div>}
      </div>
    </>
  );

}

export default App;




