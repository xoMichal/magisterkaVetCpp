import React from 'react';

type DiagnosticProps = {
  text: string;
}

const Diagnostic: React.FC<DiagnosticProps> = ({ text }) => {
  return (
    <div>
      <h2>Diagnoza lub postępowanie</h2>
      <p>{text}</p>
    </div>
  );
}

export default Diagnostic;
