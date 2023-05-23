import React, { useState } from 'react';
import QuestionList from './components/QuestionList';
import Diagnostic from './components/Diagnostic';
import { diagnosticEngine } from './components/diagnosticEngine';

type Answer = {
  text: string;
  isActive: boolean;
}

type QuestionData = {
  id: number;
  text: string;
  answers: Answer[];
}

// Właściwe dane pytań zastąp danymi z treści zadania
const initialQuestions: QuestionData[] = [
  {
    id: 1,
    text: 'Pacjentem jest kot czy pies?',
    answers: [
      { text: 'pies', isActive: false },
      { text: 'kot', isActive: false },
    ],
  },
  {
    id: 2,
    text: 'Czy kot ma napady padaczkowe?',
    answers: [
      { text: 'tak', isActive: false },
      { text: 'nie', isActive: false },
    ],
  },
  {
    id: 3,
    text: 'Czy możesz stwierdzić u kota stan padaczkowy?',
    answers: [
      { text: 'tak', isActive: false },
      { text: 'nie', isActive: false },
    ],
  },
  {
    id: 4,
    text: 'Czy kot ma powiększenie obrysu jamy brzusznej?',
    answers: [
      { text: 'tak', isActive: false },
      { text: 'nie', isActive: false },
    ],
  },
  {
    id: 5,
    text: 'Czy w okolicy żołądka jest wypuk bębenkowy?',
    answers: [
      { text: 'tak', isActive: false },
      { text: 'nie', isActive: false },
    ],
  },
  {
    id: 6,
    text: 'Czy występuje bladość błon śluzowych i ostry brzuch?',
    answers: [
      { text: 'tak', isActive: false },
      { text: 'nie', isActive: false },
    ],
  },
  {
    id: 7,
    text: 'Czy zwierzę miało kontakt z trucizną?',
    answers: [
      { text: 'tak', isActive: false },
      { text: 'nie', isActive: false },
    ],
  },
  {
    id: 8,
    text: 'Czy zwierzę jest płci żeńskiej?',
    answers: [
      { text: 'tak', isActive: false },
      { text: 'nie', isActive: false },
    ],
  },
  {
    id: 9,
    text: 'Czy w badaniu RTG/USG widać zmiany w prostacie?',
    answers: [
      { text: 'tak', isActive: false },
      { text: 'nie', isActive: false },
    ],
  },
  {
    id: 10,
    text: 'Czy zmiany występują w pęcherzu moczowym?',
    answers: [
      { text: 'tak', isActive: false },
      { text: 'nie', isActive: false },
    ],
  }, {
    id: 11,
    text: 'Czy zwierzę ma jakieś zmiany rozrostowe w innych narządach?',
    answers: [
      { text: 'tak', isActive: false },
      { text: 'nie', isActive: false },
    ],
  },
  {
    id: 12,
    text: 'Czy w badaniu RTG/USG widać zmiany w macicy/jajnikach?',
    answers: [
      { text: 'tak', isActive: false },
      { text: 'nie', isActive: false },
    ],
  },
  {
    id: 13,
    text: 'Czy zmiany występują w pęcherzu moczowym?',
    answers: [
      { text: 'tak', isActive: false },
      { text: 'nie', isActive: false },
    ],
  },
  {
    id: 14,
    text: 'Czy w macicy widać symptomy ciąży?',
    answers: [
      { text: 'tak', isActive: false },
      { text: 'nie', isActive: false },
    ],
  },
  {
    id: 15,
    text: 'Czy kot zjadł coś podejrzewanego lub mógł mieć kontakt z substancją trującą?',
    answers: [
      { text: 'tak', isActive: false },
      { text: 'nie', isActive: false },
    ],
  },
  {
    id: 16,
    text: 'Czy u kota w momencie wystąpienia problemów atak pojawił się po raz pierwszy?',
    answers: [
      { text: 'tak', isActive: false },
      { text: 'nie', isActive: false },
    ],
  },
  {
    id: 17,
    text: 'Czy poziom insuliny jest podwyższony lub prawidłowy?',
    answers: [
      { text: 'tak', isActive: false },
      { text: 'nie', isActive: false },
    ],
  },
  {
    id: 18,
    text: 'Czy poziom insuliny jest obniżony?',
    answers: [
      { text: 'tak', isActive: false },
      { text: 'nie', isActive: false },
    ],
  },
  {
    id: 19,
    text: 'Czy poziom mocznika jest obniżony a parametry wątrobowe są podwyższone?',
    answers: [
      { text: 'tak', isActive: false },
      { text: 'nie', isActive: false },
    ],
  },
  {
    id: 20,
    text: 'Czy wynik MR, TK, badanie płynu mózgowo-rdzeniowego są nie prawidłowe?',
    answers: [
      { text: 'tak', isActive: false },
      { text: 'nie', isActive: false },
    ],
  },
  {
    id: 21,
    text: 'Czy pies jest po urazie?',
    answers: [
      { text: 'tak', isActive: false },
      { text: 'nie', isActive: false },
    ],
  }, {
    id: 22,
    text: 'Czy wszedł o własnych siłach?',
    answers: [
      { text: 'tak', isActive: false },
      { text: 'nie', isActive: false },
    ],
  },
  {
    id: 23,
    text: 'Czy u psa występuje biegunka?',
    answers: [
      { text: 'tak', isActive: false },
      { text: 'nie', isActive: false },
    ],
  },
  {
    id: 24,
    text: 'Czy u psa występuje świąd?',
    answers: [
      { text: 'tak', isActive: false },
      { text: 'nie', isActive: false },
    ],
  },
  {
    id: 25,
    text: 'Czy znaleziono pasożyty?',
    answers: [
      { text: 'nie', isActive: false },
      { text: 'tak', isActive: false },
    ],
  },
  {
    id: 26,
    text: 'Postępowanie zastosowanie profilaktycznego zwalczania pcheł. Czy świąd ustał?',
    answers: [
      { text: 'nie', isActive: false },
      { text: 'tak', isActive: false },
    ],
  },
  {
    id: 27,
    text: 'Postępowanie zastosowanie profilaktycznego zwalczania pcheł. Czy świąd ustał?',
    answers: [
      { text: 'nie', isActive: false },
      { text: 'tak', isActive: false },
    ],
  },
  {
    id: 28,
    text: 'Postępowanie proszę wykonać badanie poznawcze na obecność świerzbu. Czy znaleziono objawy świerzbu',
    answers: [
      { text: 'nie', isActive: false },
      { text: 'tak', isActive: false },
    ],
  },
  {
    id: 29,
    text: 'Diagnoza świerzb. Postępowanie Proszę zastosować leczenie przeciw świerzbowe',
    answers: [
      { text: 'nie', isActive: false },
      { text: 'tak', isActive: false },
    ],
  },
  {
    id: 30,
    text: 'Postępowanie proszę wykonać cytologię. Czy cytologia wykazała brak mikroorganizmów?',
    answers: [
      { text: 'nie', isActive: false },
      { text: 'tak', isActive: false },
    ],
  },
  {
    id: 31,
    text: 'Czy cytologia wykazała bakterie?',
    answers: [
      { text: 'nie', isActive: false },
      { text: 'tak', isActive: false },
    ],
  },
  {
    id: 32,
    text: 'Czy występują wyłysienia?',
    answers: [
      { text: 'występują', isActive: false },
      { text: 'nie występują', isActive: false },
    ],
  },
  {
    id: 33,
    text: 'Czy znaleziono na ciele jakieś guzy?',
    answers: [
      { text: 'tak', isActive: false },
      { text: 'nie', isActive: false },
    ],
  },
  {
    id: 34,
    text: 'Czy u psa występuje ból?',
    answers: [
      { text: 'tak', isActive: false },
      { text: 'nie', isActive: false },
    ],
  },
  {
    id: 35,
    text: 'Czy u psa występuje gorączka?',
    answers: [
      { text: 'tak', isActive: false },
      { text: 'nie', isActive: false },
    ],
  },
  {
    id: 36,
    text: 'Czy wyniki badania krwi są w normie?',
    answers: [
      { text: 'tak', isActive: false },
      { text: 'nie', isActive: false },
    ],
  },
  {
    id: 37,
    text: 'Czy pies ma problemy z oddychaniem?',
    answers: [
      { text: 'tak', isActive: false },
      { text: 'nie', isActive: false },
    ],
  },
  {
    id: 38,
    text: 'Czy pies jest letargiczny?',
    answers: [
      { text: 'tak', isActive: false },
      { text: 'nie', isActive: false },
    ],
  },
  {
    id: 39,
    text: 'Czy pies nie chce jeść?',
    answers: [
      { text: 'tak', isActive: false },
      { text: 'nie', isActive: false },
    ],
  },
  {
    id: 40,
    text: 'Czy u psa występuje wymiotowanie?',
    answers: [
      { text: 'tak', isActive: false },
      { text: 'nie', isActive: false },
    ],
  },
  {
    id: 41,
    text: 'Czy u psa występuje kaszel?',
    answers: [
      { text: 'tak', isActive: false },
      { text: 'nie', isActive: false },
    ],
  },
  {
    id: 42,
    text: 'Czy pies ma biegunkę?',
    answers: [
      { text: 'tak', isActive: false },
      { text: 'nie', isActive: false },
    ],
  },
  {
    id: 43,
    text: 'Czy pies jest nadmiernie śpiący?',
    answers: [
      { text: 'tak', isActive: false },
      { text: 'nie', isActive: false },
    ],
  },
  {
    id: 44,
    text: 'Czy badanie kału również było poza normą?',
    answers: [
      { text: 'Tak było poza normą', isActive: false },
      { text: 'Nie, było w normie', isActive: false },
    ],
  },
  {
    id: 45,
    text: 'Postępowanie Proszę wykonać badanie USG, Czy wykonano badanie?',
    answers: [
      { text: 'Wykonano', isActive: false },
      { text: 'Nie wykonano', isActive: false },
    ],
  },
  {
    id: 46,
    text: 'Postępowanie Proszę wykonać badanie USG, Czy wykonano badanie?',
    answers: [
      { text: 'Wykonano', isActive: false },
      { text: 'Nie wykonano', isActive: false },
    ],
  },
  {
    id: 47,
    text: 'Czy znaleziono coś niepokojącego podczas badania USG?',
    answers: [
      { text: 'tak', isActive: false },
      { text: 'nie', isActive: false },
    ],
  },
  {
    id: 48,
    text: 'Proszę wykonać laparotomię. Czy badanie wykazało jakieś nieprawidłości?',
    answers: [
      { text: 'tak', isActive: false },
      { text: 'nie', isActive: false },
    ],
  },
  {
    id: 49,
    text: 'Czy pies jadł coś nowego?',
    answers: [
      { text: 'tak', isActive: false },
      { text: 'nie', isActive: false },
    ],
  },
  {
    id: 50,
    text: 'Czy objawy pojawiły się nagle?',
    answers: [
      { text: 'tak', isActive: false },
      { text: 'nie', isActive: false },
    ],
  },
  {
    id: 51,
    text: 'Czy oddycha?',
    answers: [
      { text: 'tak', isActive: false },
      { text: 'nie', isActive: false },
    ],
  },
  {
    id: 52,
    text: 'Czy liczba oddechów jest prawidłowa?',
    answers: [
      { text: 'tak', isActive: false },
      { text: 'nie', isActive: false },
    ],
  },
  {
    id: 53,
    text: 'Czy widać krwawienia?',
    answers: [
      { text: 'tak', isActive: false },
      { text: 'nie', isActive: false },
    ],
  },
  {
    id: 54,
    text: 'Przystąpiono do podstawowej resuscytacji?',
    answers: [
      { text: 'tak', isActive: false },
      { text: 'nie', isActive: false },
    ],
},
{
    id: 55,
    text: 'Czy zwierzę odzyskało oddech?',
    answers: [
      { text: 'tak', isActive: false },
      { text: 'nie', isActive: false },
    ],
},
]
// Stylowanie dla kontenera pytań
const questionContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#f0f0f0',
  padding: '20px',
  borderRadius: '15px',
  margin: '10px 0',
};

// Stylowanie dla przycisków odpowiedzi
const buttonStyle = {
  backgroundColor: '#4caf50',
  color: 'white',
  padding: '10px 20px',
  margin: '5px',
  border: 'none',
  borderRadius: '5px',
  textTransform: 'uppercase',
  cursor: 'pointer',
};
function App() {
  const [questions, setQuestions] = useState(initialQuestions);
  const [diagnosis, setDiagnosis] = useState('');

  const onSelectAnswer = (id: number, answer: string) => {
    const updatedQuestions = diagnosticEngine(questions, id, answer);
    setQuestions(updatedQuestions);

    // Symulacja generowania diagnozy/postępowania
    if (updatedQuestions.every(question => question.answers.some((answer: { isActive: any; }) => !answer.isActive))) {
      setDiagnosis('Wygenerowana diagnoza lub postępowanie');
    }
  };

  return (
    <div>
      <QuestionList questions={questions} onSelectAnswer={onSelectAnswer} />
      {diagnosis && <Diagnostic text={diagnosis} />}
    </div>
  );
}

export default App;
