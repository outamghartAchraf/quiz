import React from 'react';

const ScoreBoard = ({ score, total }) => {
  return (
    <div className="scoreboard">
      <div className="score-display">
        <span className="score-label">Score</span>
        <span className="score-value">{score}</span>
        <span className="score-total">/ {total}</span>
      </div>
    </div>
  );
};

export default ScoreBoard;