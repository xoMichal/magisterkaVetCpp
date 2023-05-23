import React from 'react';

type Answer = {
  text: string;
  isActive: boolean;
}

type QuestionProps = {
  id: number;
  text: string;
  answers: Answer[];
  onSelectAnswer: (id: number, answer: string) => void;
}

const Question: React.FC<QuestionProps> = ({ id, text, answers, onSelectAnswer }) => {
  return (
    <div>
      <p>{text}</p>
      {answers.map((answer, index) => (
        <button
          key={index}
          onClick={() => onSelectAnswer(id, answer.text)}
          disabled={!answer.isActive}
        >
          {answer.text}
        </button>
      ))}
    </div>
  );
}

export default Question;
