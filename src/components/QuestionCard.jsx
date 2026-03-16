import React, { useState } from 'react';
import Button from './Button';

const QuestionCard = ({ 
  question, 
  answers, 
  onAnswerSelect, 
  onHint,
  hintUsed,
  showFeedback = false,
  selectedAnswer = null,
  correctAnswer = null
}) => {
  const handleAnswerClick = (answer) => {
    if (!showFeedback) {
      onAnswerSelect(answer);
    }
  };

  const handleHint = () => {
    onHint();
  };

  return (
    <div className="question-card">
      <div className="question-meta">
        <span className="question-category">{question.category || 'Sports'}</span>
        <span className={`question-difficulty difficulty-${question.difficulty}`}>
          {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
        </span>
      </div>

      <h2 className="question-text">{question.text}</h2>

      <div className="answers-grid">
        {answers.map((answer, index) => {
          let answerClass = 'answer-btn';
          
          if (showFeedback) {
            if (answer === correctAnswer) {
              answerClass += ' correct';
            } else if (answer === selectedAnswer && answer !== correctAnswer) {
              answerClass += ' incorrect';
            } else {
              answerClass += ' disabled';
            }
          }

          return (
            <Button
              key={index}
              className={answerClass}
              onClick={() => handleAnswerClick(answer)}
              disabled={showFeedback}
            >
              {answer}
            </Button>
          );
        })}
      </div>

      <div className="hint-container">
        <Button
          variant="hint"
          onClick={handleHint}
          disabled={hintUsed}
          className={hintUsed ? 'hint-used' : ''}
        >
          💡 50/50 Hint {hintUsed && '(Used)'}
        </Button>
      </div>
    </div>
  );
};

export default QuestionCard;