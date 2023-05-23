type Answer = {
  text: string;
  isActive: boolean;
}

type QuestionData = {
  id: number;
  text: string;
  answers: Answer[];
}

export function diagnosticEngine(questions: QuestionData[], id: number, answer: string): QuestionData[] {
  // Zaimplementuj logikę wykluczania pytań na podstawie odpowiedzi

  // Na przykład, jeśli odpowiedź na pierwsze pytanie to "pies", to wyklucz wszystkie pytania specyficzne dla kota
  if (id === 1 && answer === 'pies') {
    return questions.map(question => {
      if (question.id !== 1 && question.text.includes('kot')) {
        return {
          ...question,
          answers: question.answers.map((answer) => ({ ...answer, isActive: false }))
        };
      }

      return question;
    });
  }

  // Jeśli nie ma specyficznych zasad dla tej odpowiedzi, zwróć niezmienione pytania
  return questions;
}
