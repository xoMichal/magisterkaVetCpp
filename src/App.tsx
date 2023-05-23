import React, { useState, CSSProperties } from 'react';
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

// Właściwe dane pytań zastąp danymi z treści zadania
const initialQuestions: QuestionData[] = [
  {
    id: 1,
    text: 'Pacjentem jest kot czy pies?',
    answers: [
      { text: 'pies', isActive: true, isClicked: false, excludesQuestions: [2] },
      { text: 'kot', isActive: true, isClicked: false, excludesQuestions: [3] },
    ],
  },
  {
    id: 2,
    text: 'Czy kot ma napady padaczkowe?',
    answers: [
      { text: 'tak', isActive: true, isClicked: false, excludesQuestions: [4] },
      { text: 'nie', isActive: true, isClicked: false, excludesQuestions: [5] },
      { text: 'nie wiem', isActive: true, isClicked: false, excludesQuestions: [3, 4] },
    ],
  },
  {
    id: 3,
    text: 'Czy możesz stwierdzić u kota stan padaczkowy?',
    answers: [
      { text: 'tak', isActive: true, isClicked: false, excludesQuestions: [5] },
      { text: 'nie', isActive: true, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 4,
    text: 'Czy kot ma powiększenie obrysu jamy brzusznej?',
    answers: [
      { text: 'tak', isActive: true, isClicked: false, excludesQuestions: [] },
      { text: 'nie', isActive: true, isClicked: false, excludesQuestions: [] },
      { text: 'nie wiem', isActive: true, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 5,
    text: 'Czy w okolicy żołądka jest wypuk bębenkowy?',
    answers: [
      { text: 'tak', isActive: true, isClicked: false, excludesQuestions: [] },
      { text: 'nie', isActive: true, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 6,
    text: 'Czy występuje bladość błon śluzowych i ostry brzuch?',
    answers: [
      { text: 'tak', isActive: true, isClicked: false, excludesQuestions: [] },
      { text: 'nie', isActive: true, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 7,
    text: 'Czy zwierzę miało kontakt z trucizną?',
    answers: [
      { text: 'tak', isActive: true, isClicked: false, excludesQuestions: [] },
      { text: 'nie', isActive: true, isClicked: false, excludesQuestions: [] },
      { text: 'nie wiem', isActive: true, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 8,
    text: 'Czy zwierzę jest płci żeńskiej?',
    answers: [
      { text: 'tak', isActive: true, isClicked: false, excludesQuestions: [] },
      { text: 'nie', isActive: true, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 9,
    text: 'Czy w badaniu RTG/USG widać zmiany w prostacie?',
    answers: [
      { text: 'tak', isActive: true, isClicked: false, excludesQuestions: [] },
      { text: 'nie', isActive: true, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 10,
    text: 'Czy zmiany występują w pęcherzu moczowym?',
    answers: [
      { text: 'tak', isActive: true, isClicked: false, excludesQuestions: [] },
      { text: 'nie', isActive: true, isClicked: false, excludesQuestions: [] },
    ],
  }, {
    id: 11,
    text: 'Czy zwierzę ma jakieś zmiany rozrostowe w innych narządach?',
    answers: [
      { text: 'tak', isActive: true, isClicked: false, excludesQuestions: [] },
      { text: 'nie', isActive: true, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 12,
    text: 'Czy w badaniu RTG/USG widać zmiany w macicy/jajnikach?',
    answers: [
      { text: 'tak', isActive: true, isClicked: false, excludesQuestions: [] },
      { text: 'nie', isActive: true, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 13,
    text: 'Czy zmiany występują w pęcherzu moczowym?',
    answers: [
      { text: 'tak', isActive: true, isClicked: false, excludesQuestions: [] },
      { text: 'nie', isActive: true, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 14,
    text: 'Czy w macicy widać symptomy ciąży?',
    answers: [
      { text: 'tak', isActive: true, isClicked: false, excludesQuestions: [] },
      { text: 'nie', isActive: true, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 15,
    text: 'Czy kot zjadł coś podejrzewanego lub mógł mieć kontakt z substancją trującą?',
    answers: [
      { text: 'tak', isActive: true, isClicked: false, excludesQuestions: [] },
      { text: 'nie', isActive: true, isClicked: false, excludesQuestions: [] },
      { text: 'nie wiem', isActive: true, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 16,
    text: 'Czy u kota w momencie wystąpienia problemów atak pojawił się po raz pierwszy?',
    answers: [
      { text: 'tak', isActive: true, isClicked: false, excludesQuestions: [] },
      { text: 'nie', isActive: true, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 17,
    text: 'Czy poziom insuliny jest podwyższony lub prawidłowy?',
    answers: [
      { text: 'tak', isActive: true, isClicked: false, excludesQuestions: [] },
      { text: 'nie', isActive: true, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 18,
    text: 'Czy poziom insuliny jest obniżony?',
    answers: [
      { text: 'tak', isActive: true, isClicked: false, excludesQuestions: [] },
      { text: 'nie', isActive: true, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 19,
    text: 'Czy poziom mocznika jest obniżony a parametry wątrobowe są podwyższone?',
    answers: [
      { text: 'tak', isActive: true, isClicked: false, excludesQuestions: [] },
      { text: 'nie', isActive: true, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 20,
    text: 'Czy wynik MR, TK, badanie płynu mózgowo-rdzeniowego są nie prawidłowe?',
    answers: [
      { text: 'tak', isActive: true, isClicked: false, excludesQuestions: [] },
      { text: 'nie', isActive: true, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 21,
    text: 'Czy pies jest po urazie?',
    answers: [
      { text: 'tak', isActive: true, isClicked: false, excludesQuestions: [] },
      { text: 'nie', isActive: true, isClicked: false, excludesQuestions: [] },
    ],
  }, {
    id: 22,
    text: 'Czy wszedł o własnych siłach?',
    answers: [
      { text: 'tak', isActive: true, isClicked: false, excludesQuestions: [] },
      { text: 'nie', isActive: true, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 23,
    text: 'Czy u psa występuje biegunka?',
    answers: [
      { text: 'tak', isActive: true, isClicked: false, excludesQuestions: [] },
      { text: 'nie', isActive: true, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 24,
    text: 'Czy u psa występuje świąd?',
    answers: [
      { text: 'tak', isActive: true, isClicked: false, excludesQuestions: [] },
      { text: 'nie', isActive: true, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 25,
    text: 'Czy znaleziono pasożyty?',
    answers: [
      { text: 'nie', isActive: true, isClicked: false, excludesQuestions: [] },
      { text: 'tak', isActive: true, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 26,
    text: 'Postępowanie zastosowanie profilaktycznego zwalczania pcheł. Czy świąd ustał?',
    answers: [
      { text: 'nie', isActive: true, isClicked: false, excludesQuestions: [] },
      { text: 'tak', isActive: true, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 27,
    text: 'Postępowanie proszę wykonać badanie poznawcze na obecność świerzbu. Czy znaleziono objawy świerzbu',
    answers: [
      { text: 'nie', isActive: true, isClicked: false, excludesQuestions: [] },
      { text: 'tak', isActive: true, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 28,
    text: 'Diagnoza świerzb. Postępowanie Proszę zastosować leczenie przeciw świerzbowe',
    answers: [
      { text: 'nie', isActive: true, isClicked: false, excludesQuestions: [] },
      { text: 'tak', isActive: true, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 29,
    text: 'Postępowanie proszę wykonać cytologię. Czy cytologia wykazała brak mikroorganizmów?',
    answers: [
      { text: 'nie', isActive: true, isClicked: false, excludesQuestions: [] },
      { text: 'tak', isActive: true, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 30,
    text: 'Czy cytologia wykazała bakterie?',
    answers: [
      { text: 'nie', isActive: true, isClicked: false, excludesQuestions: [] },
      { text: 'tak', isActive: true, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 31,
    text: 'Czy występują wyłysienia?',
    answers: [
      { text: 'występują', isActive: true, isClicked: false, excludesQuestions: [] },
      { text: 'nie występują', isActive: true, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 32,
    text: 'Czy znaleziono na ciele jakieś guzy?',
    answers: [
      { text: 'tak', isActive: true, isClicked: false, excludesQuestions: [] },
      { text: 'nie', isActive: true, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 33,
    text: 'Czy znaleziono owrzodzenia?',
    answers: [
      { text: 'tak', isActive: true, isClicked: false, excludesQuestions: [] },
      { text: 'nie', isActive: true, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 34,
    text: 'Czy znaleziono zmiany barwnikowe?',
    answers: [
      { text: 'tak', isActive: true, isClicked: false, excludesQuestions: [] },
      { text: 'nie', isActive: true, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 35,
    text: '36. Postępowanie proszę zlecić posiew i cytologię. Czy badania zostały wykonane?',
    answers: [
      { text: 'tak', isActive: true, isClicked: false, excludesQuestions: [] },
      { text: 'nie', isActive: true, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 36,
    text: 'Czy badania wskazały na obecność pasożytów?',
    answers: [
      { text: 'tak', isActive: true, isClicked: false, excludesQuestions: [] },
      { text: 'nie', isActive: true, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 37,
    text: 'Czy łysienie jest symetrycznie rozsiane?',
    answers: [
      { text: 'tak', isActive: true, isClicked: false, excludesQuestions: [] },
      { text: 'nie', isActive: true, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 38,
    text: 'Postępowanie Proszę wykonać hematologię i trichogram. Czy wyniki były prawidłowe',
    answers: [
      { text: 'tak', isActive: true, isClicked: false, excludesQuestions: [] },
      { text: 'nie', isActive: true, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 39,
    text: 'Czy występują również wymioty?',
    answers: [
      { text: 'tak', isActive: true, isClicked: false, excludesQuestions: [] },
      { text: 'nie', isActive: true, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 40,
    text: 'Czy objawy są przewlekłe?',
    answers: [
      { text: 'tak', isActive: true, isClicked: false, excludesQuestions: [] },
      { text: 'nie', isActive: true, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 41,
    text: 'Czy zlecono badanie morfologiczne krwi, biochemiczne surowicy i badanie kału?',
    answers: [
      { text: 'tak', isActive: true, isClicked: false, excludesQuestions: [] },
      { text: 'nie', isActive: true, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 42,
    text: 'Czy badanie morfologiczne lub biochemiczne nie było w normie?',
    answers: [
      { text: 'tak', isActive: true, isClicked: false, excludesQuestions: [] },
      { text: 'nie', isActive: true, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 43,
    text: 'Czy badanie kału również było poza normą?',
    answers: [
      { text: 'Tak było poza normą', isActive: true, isClicked: false, excludesQuestions: [] },
      { text: 'Nie, było w normie', isActive: true, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 44,
    text: 'Postępowanie Proszę wykonać badanie USG, Czy wykonano badanie?',
    answers: [
      { text: 'Wykonano', isActive: true, isClicked: false, excludesQuestions: [] },
      { text: 'Nie wykonano', isActive: true, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 45,
    text: 'Postępowanie Proszę wykonać badanie USG, Czy wykonano badanie?',
    answers: [
      { text: 'Wykonano', isActive: true, isClicked: false, excludesQuestions: [] },
      { text: 'Nie wykonano', isActive: true, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 46,
    text: 'Czy znaleziono coś niepokojącego podczas badania USG?',
    answers: [
      { text: 'tak', isActive: true, isClicked: false, excludesQuestions: [] },
      { text: 'nie', isActive: true, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 47,
    text: 'Proszę wykonać laparotomię. Czy badanie wykazało jakieś nieprawidłości?',
    answers: [
      { text: 'tak', isActive: true, isClicked: false, excludesQuestions: [] },
      { text: 'nie', isActive: true, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 48,
    text: 'Czy pies jadł coś nowego?',
    answers: [
      { text: 'tak', isActive: true, isClicked: false, excludesQuestions: [] },
      { text: 'nie', isActive: true, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 49,
    text: 'Czy objawy pojawiły się nagle?',
    answers: [
      { text: 'tak', isActive: true, isClicked: false, excludesQuestions: [] },
      { text: 'nie', isActive: true, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 50,
    text: 'Czy oddycha?',
    answers: [
      { text: 'tak', isActive: true, isClicked: false, excludesQuestions: [] },
      { text: 'nie', isActive: true, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 51,
    text: 'Czy liczba oddechów jest prawidłowa?',
    answers: [
      { text: 'tak', isActive: true, isClicked: false, excludesQuestions: [] },
      { text: 'nie', isActive: true, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 52,
    text: 'Czy widać krwawienia?',
    answers: [
      { text: 'tak', isActive: true, isClicked: false, excludesQuestions: [] },
      { text: 'nie', isActive: true, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 53,
    text: 'Przystąpiono do podstawowej resuscytacji?',
    answers: [
      { text: 'tak', isActive: true, isClicked: false, excludesQuestions: [] },
      { text: 'nie', isActive: true, isClicked: false, excludesQuestions: [] },
    ],
  },
  {
    id: 54,
    text: 'Czy zwierzę odzyskało oddech?',
    answers: [
      { text: 'tak', isActive: true, isClicked: false, excludesQuestions: [] },
      { text: 'nie', isActive: true, isClicked: false, excludesQuestions: [] },
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

function App() {
  const [questions, setQuestions] = useState(initialQuestions);
  const [diagnosis, setDiagnosis] = useState('');

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

    setQuestions(updatedQuestions);
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




  return (
    <>
      <div className='App-header'> VetApp</div>
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
        {diagnosis && <p>{diagnosis}</p>}
      </div>
    </>
  );

}

export default App;




