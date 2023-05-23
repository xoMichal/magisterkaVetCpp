import React from 'react';
import Question from './Question';

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

type QuestionListProps = {
  questions: QuestionData[];
  onSelectAnswer: (id: number, answer: string) => void;
}

const QuestionList: React.FC<QuestionListProps> = ({ questions, onSelectAnswer }) => {
  return (
    <div>
      {questions.map((question) => (
        <Question 
          key={question.id}
          id={question.id}
          text={question.text}
          answers={question.answers}
          onSelectAnswer={onSelectAnswer}
        />
      ))}
    </div>
  );
}

export default QuestionList;
