import React, { useState } from 'react';
import QuestionList from './components/QuestionList';
import Diagnostic from './components/Diagnostic';
import { diagnosticEngine } from './components/diagnosticEngine';

type Answer = {
  text: string;
  isActive: boolean;
  isClicked: boolean;
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
      { text: 'pies', isActive: false, isClicked: false },
      { text: 'kot', isActive: false, isClicked: false },
    ],
  },
  {
    id: 2,
    text: 'Czy kot ma napady padaczkowe?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false },
      { text: 'nie', isActive: false, isClicked: false },
      { text: 'nie wiem', isActive: false, isClicked: false },
    ],
  },
  {
    id: 3,
    text: 'Czy możesz stwierdzić u kota stan padaczkowy?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false },
      { text: 'nie', isActive: false, isClicked: false },
    ],
  },
  {
    id: 4,
    text: 'Czy kot ma powiększenie obrysu jamy brzusznej?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false },
      { text: 'nie', isActive: false, isClicked: false },
      { text: 'nie wiem', isActive: false, isClicked: false },
    ],
  },
  {
    id: 5,
    text: 'Czy w okolicy żołądka jest wypuk bębenkowy?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false },
      { text: 'nie', isActive: false, isClicked: false },
    ],
  },
  {
    id: 6,
    text: 'Czy występuje bladość błon śluzowych i ostry brzuch?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false },
      { text: 'nie', isActive: false, isClicked: false },
    ],
  },
  {
    id: 7,
    text: 'Czy zwierzę miało kontakt z trucizną?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false },
      { text: 'nie', isActive: false, isClicked: false },
      { text: 'nie wiem', isActive: false, isClicked: false },
    ],
  },
  {
    id: 8,
    text: 'Czy zwierzę jest płci żeńskiej?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false },
      { text: 'nie', isActive: false, isClicked: false },
    ],
  },
  {
    id: 9,
    text: 'Czy w badaniu RTG/USG widać zmiany w prostacie?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false },
      { text: 'nie', isActive: false, isClicked: false },
    ],
  },
  {
    id: 10,
    text: 'Czy zmiany występują w pęcherzu moczowym?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false },
      { text: 'nie', isActive: false, isClicked: false },
    ],
  }, {
    id: 11,
    text: 'Czy zwierzę ma jakieś zmiany rozrostowe w innych narządach?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false },
      { text: 'nie', isActive: false, isClicked: false },
    ],
  },
  {
    id: 12,
    text: 'Czy w badaniu RTG/USG widać zmiany w macicy/jajnikach?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false },
      { text: 'nie', isActive: false, isClicked: false },
    ],
  },
  {
    id: 13,
    text: 'Czy zmiany występują w pęcherzu moczowym?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false },
      { text: 'nie', isActive: false, isClicked: false },
    ],
  },
  {
    id: 14,
    text: 'Czy w macicy widać symptomy ciąży?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false },
      { text: 'nie', isActive: false, isClicked: false },
    ],
  },
  {
    id: 15,
    text: 'Czy kot zjadł coś podejrzewanego lub mógł mieć kontakt z substancją trującą?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false },
      { text: 'nie', isActive: false, isClicked: false },
      { text: 'nie wiem', isActive: false, isClicked: false },
    ],
  },
  {
    id: 16,
    text: 'Czy u kota w momencie wystąpienia problemów atak pojawił się po raz pierwszy?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false },
      { text: 'nie', isActive: false, isClicked: false },
    ],
  },
  {
    id: 17,
    text: 'Czy poziom insuliny jest podwyższony lub prawidłowy?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false },
      { text: 'nie', isActive: false, isClicked: false },
    ],
  },
  {
    id: 18,
    text: 'Czy poziom insuliny jest obniżony?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false },
      { text: 'nie', isActive: false, isClicked: false },
    ],
  },
  {
    id: 19,
    text: 'Czy poziom mocznika jest obniżony a parametry wątrobowe są podwyższone?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false },
      { text: 'nie', isActive: false, isClicked: false },
    ],
  },
  {
    id: 20,
    text: 'Czy wynik MR, TK, badanie płynu mózgowo-rdzeniowego są nie prawidłowe?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false },
      { text: 'nie', isActive: false, isClicked: false },
    ],
  },
  {
    id: 21,
    text: 'Czy pies jest po urazie?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false },
      { text: 'nie', isActive: false, isClicked: false },
    ],
  }, {
    id: 22,
    text: 'Czy wszedł o własnych siłach?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false },
      { text: 'nie', isActive: false, isClicked: false },
    ],
  },
  {
    id: 23,
    text: 'Czy u psa występuje biegunka?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false },
      { text: 'nie', isActive: false, isClicked: false },
    ],
  },
  {
    id: 24,
    text: 'Czy u psa występuje świąd?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false },
      { text: 'nie', isActive: false, isClicked: false },
    ],
  },
  {
    id: 25,
    text: 'Czy znaleziono pasożyty?',
    answers: [
      { text: 'nie', isActive: false, isClicked: false },
      { text: 'tak', isActive: false, isClicked: false },
    ],
  },
  {
    id: 26,
    text: 'Postępowanie zastosowanie profilaktycznego zwalczania pcheł. Czy świąd ustał?',
    answers: [
      { text: 'nie', isActive: false, isClicked: false },
      { text: 'tak', isActive: false, isClicked: false },
    ],
  },
  {
    id: 27,
    text: 'Postępowanie proszę wykonać badanie poznawcze na obecność świerzbu. Czy znaleziono objawy świerzbu',
    answers: [
      { text: 'nie', isActive: false, isClicked: false },
      { text: 'tak', isActive: false, isClicked: false },
    ],
  },
  {
    id: 28,
    text: 'Diagnoza świerzb. Postępowanie Proszę zastosować leczenie przeciw świerzbowe',
    answers: [
      { text: 'nie', isActive: false, isClicked: false },
      { text: 'tak', isActive: false, isClicked: false },
    ],
  },
  {
    id: 29,
    text: 'Postępowanie proszę wykonać cytologię. Czy cytologia wykazała brak mikroorganizmów?',
    answers: [
      { text: 'nie', isActive: false, isClicked: false },
      { text: 'tak', isActive: false, isClicked: false },
    ],
  },
  {
    id: 30,
    text: 'Czy cytologia wykazała bakterie?',
    answers: [
      { text: 'nie', isActive: false, isClicked: false },
      { text: 'tak', isActive: false, isClicked: false },
    ],
  },
  {
    id: 31,
    text: 'Czy występują wyłysienia?',
    answers: [
      { text: 'występują', isActive: false, isClicked: false },
      { text: 'nie występują', isActive: false, isClicked: false },
    ],
  },
  {
    id: 32,
    text: 'Czy znaleziono na ciele jakieś guzy?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false },
      { text: 'nie', isActive: false, isClicked: false },
    ],
  },
  {
    id: 33,
    text: 'Czy znaleziono owrzodzenia?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false },
      { text: 'nie', isActive: false, isClicked: false },
    ],
  },
  {
    id: 34,
    text: 'Czy znaleziono zmiany barwnikowe?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false },
      { text: 'nie', isActive: false, isClicked: false },
    ],
  },
  {
    id: 35,
    text: '36. Postępowanie proszę zlecić posiew i cytologię. Czy badania zostały wykonane?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false },
      { text: 'nie', isActive: false, isClicked: false },
    ],
  },
  {
    id: 36,
    text: 'Czy badania wskazały na obecność pasożytów?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false },
      { text: 'nie', isActive: false, isClicked: false },
    ],
  },
  {
    id: 37,
    text: 'Czy łysienie jest symetrycznie rozsiane?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false },
      { text: 'nie', isActive: false, isClicked: false },
    ],
  },
  {
    id: 38,
    text: 'Postępowanie Proszę wykonać hematologię i trichogram. Czy wyniki były prawidłowe',
    answers: [
      { text: 'tak', isActive: false, isClicked: false },
      { text: 'nie', isActive: false, isClicked: false },
    ],
  },
  {
    id: 39,
    text: 'Czy występują również wymioty?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false },
      { text: 'nie', isActive: false, isClicked: false },
    ],
  },
  {
    id: 40,
    text: 'Czy objawy są przewlekłe?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false },
      { text: 'nie', isActive: false, isClicked: false },
    ],
  },
  {
    id: 41,
    text: 'Czy zlecono badanie morfologiczne krwi, biochemiczne surowicy i badanie kału?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false },
      { text: 'nie', isActive: false, isClicked: false },
    ],
  },
  {
    id: 42,
    text: 'Czy badanie morfologiczne lub biochemiczne nie było w normie?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false },
      { text: 'nie', isActive: false, isClicked: false },
    ],
  },
  {
    id: 43,
    text: 'Czy badanie kału również było poza normą?',
    answers: [
      { text: 'Tak było poza normą', isActive: false, isClicked: false },
      { text: 'Nie, było w normie', isActive: false, isClicked: false },
    ],
  },
  {
    id: 44,
    text: 'Postępowanie Proszę wykonać badanie USG, Czy wykonano badanie?',
    answers: [
      { text: 'Wykonano', isActive: false, isClicked: false },
      { text: 'Nie wykonano', isActive: false, isClicked: false },
    ],
  },
  {
    id: 45,
    text: 'Postępowanie Proszę wykonać badanie USG, Czy wykonano badanie?',
    answers: [
      { text: 'Wykonano', isActive: false, isClicked: false },
      { text: 'Nie wykonano', isActive: false, isClicked: false },
    ],
  },
  {
    id: 46,
    text: 'Czy znaleziono coś niepokojącego podczas badania USG?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false },
      { text: 'nie', isActive: false, isClicked: false },
    ],
  },
  {
    id: 47,
    text: 'Proszę wykonać laparotomię. Czy badanie wykazało jakieś nieprawidłości?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false },
      { text: 'nie', isActive: false, isClicked: false },
    ],
  },
  {
    id: 48,
    text: 'Czy pies jadł coś nowego?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false },
      { text: 'nie', isActive: false, isClicked: false },
    ],
  },
  {
    id: 49,
    text: 'Czy objawy pojawiły się nagle?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false },
      { text: 'nie', isActive: false, isClicked: false },
    ],
  },
  {
    id: 50,
    text: 'Czy oddycha?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false },
      { text: 'nie', isActive: false, isClicked: false },
    ],
  },
  {
    id: 51,
    text: 'Czy liczba oddechów jest prawidłowa?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false },
      { text: 'nie', isActive: false, isClicked: false },
    ],
  },
  {
    id: 52,
    text: 'Czy widać krwawienia?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false },
      { text: 'nie', isActive: false, isClicked: false },
    ],
  },
  {
    id: 53,
    text: 'Przystąpiono do podstawowej resuscytacji?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false },
      { text: 'nie', isActive: false, isClicked: false },
    ],
},
{
    id: 54,
    text: 'Czy zwierzę odzyskało oddech?',
    answers: [
      { text: 'tak', isActive: false, isClicked: false },
      { text: 'nie', isActive: false, isClicked: false },
    ],
},
]

function App() {
  const [questions, setQuestions] = useState(initialQuestions);
  const [diagnosis, setDiagnosis] = useState('');

  const onSelectAnswer = (id: number, answer: string) => {
    const updatedQuestions = questions.map(question => {
      if (question.id === id) {
        question.answers = question.answers.map(a =>
          a.text === answer ? { ...a, isActive: false, isClicked: true } : a
        );
      }
      return question;
    });
  
    setQuestions(updatedQuestions);
  
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
