import React, { CSSProperties, useState } from 'react';

type Answer = {
  text: string;
  isActive: boolean;
  isClicked: boolean;
}

type QuestionProps = {
  id: number;
  text: string;
  answers: Answer[];
  onSelectAnswer: (id: number, answer: string) => void;
}

const buttonStyle: CSSProperties = {
  backgroundColor: '#007BFF',
  color: 'white',
  padding: '10px 30px',
  margin: '10px',
  border: 'none',
  borderRadius: '4px',
  textTransform: 'uppercase',
  cursor: 'pointer',
};

const selectedButtonStyle: CSSProperties = {
  ...buttonStyle,
  backgroundColor: 'green',
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

const Question: React.FC<QuestionProps> = ({ id, text, answers, onSelectAnswer }) => {
  return (
    <div style={questionContainerStyle}>
      <p>{text}</p>
      {answers.map((answer, index) => (
        <button
        key={index}
        onClick={() => onSelectAnswer(id, answer.text)}
        disabled={!answer.isActive}
        style={{
          ...buttonStyle,
          backgroundColor: answer.isClicked ? 'green' : '#007BFF',
        }}
      >
        {answer.text}
      </button>
      ))}
    </div>
  );
}

export default Question;
