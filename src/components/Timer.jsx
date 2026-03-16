import React, { useState, useEffect } from 'react';

const Timer = ({ duration = 30, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, onTimeUp]);

  const percentage = (timeLeft / duration) * 100;
  const isWarning = timeLeft <= 5;
  const isDanger = timeLeft <= 3;

  return (
    <div className="timer-container">
      <svg className="timer-svg" viewBox="0 0 100 100">
        <circle 
          className="timer-circle"
          cx="50" 
          cy="50" 
          r="45"
          style={{
            strokeDashoffset: 283 - (percentage / 100) * 283
          }}
        ></circle>
      </svg>
      <div className={`timer-display ${isDanger ? 'danger' : isWarning ? 'warning' : ''}`}>
        <span className="timer-text">{timeLeft}</span>
        <span className="timer-unit">s</span>
      </div>
    </div>
  );
};

export default Timer;