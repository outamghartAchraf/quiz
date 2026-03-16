import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Get quiz data from navigation state
  const quizData = location.state?.quizData;

  const [showReview, setShowReview] = useState(false);

  // Redirect to home if no quiz data
  if (!quizData) {
    return (
      <div className="page error-page">
        <div className="page-container">
          <div className="error-card">
            <div className="error-icon">⚠️</div>
            <h2>Aucune donnée de quiz</h2>
            <p className="error-message">Veuillez d'abord effectuer un quiz</p>
            <Button 
              variant="primary" 
              onClick={() => navigate('/')}
            >
              ← Retour au Menu
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const { score, totalQuestions, answers, percentage } = quizData;

  const getResultMessage = () => {
    if (percentage === 100) {
      return { emoji: '🏆', message: 'Parfait! Vous êtes un expert!' };
    } else if (percentage >= 80) {
      return { emoji: '⭐', message: 'Excellent! Très bien joué!' };
    } else if (percentage >= 60) {
      return { emoji: '👍', message: 'Bien! Continuez ainsi!' };
    } else {
      return { emoji: '💪', message: 'À bientôt pour une revanche!' };
    }
  };

  const result = getResultMessage();

  const handleRestart = () => {
    navigate('/', { replace: true });
  };

  return (
    <div className="page result-page">
      <div className="page-container">
        <div className="result-card">
          <h2>Quiz Terminé! 🎉</h2>

          <div className="result-score">
            <div className="score-circle">
              <span className="score-number">{score}</span>
              <span className="score-total">/ {totalQuestions}</span>
            </div>
            <p className="score-percentage">{percentage}%</p>
          </div>

          <div className="result-message">
            <p className="result-emoji">{result.emoji}</p>
            <p className="result-text">{result.message}</p>
          </div>

          <div className="result-stats">
            <div className="stat">
              <span className="stat-label">✅ Bonnes réponses</span>
              <span className="stat-value">{score}</span>
            </div>
            <div className="stat">
              <span className="stat-label">❌ Mauvaises réponses</span>
              <span className="stat-value">{totalQuestions - score}</span>
            </div>
          </div>

          <div className="result-buttons">
            <Button
              variant="primary"
              onClick={handleRestart}
              className="restart-btn"
            >
              🔄 Nouvelle Partie
            </Button>
            <Button
              variant="secondary"
              onClick={() => setShowReview(!showReview)}
              className="review-btn"
            >
              {showReview ? '✕ Fermer' : '📋'} Voir les Réponses
            </Button>
          </div>

          {showReview && (
            <div className="review-section">
              <h3>Récapitulatif des Réponses</h3>
              <div className="review-list">
                {answers.map((answer, index) => (
                  <div 
                    key={index} 
                    className={`review-item ${answer.isCorrect ? 'correct' : 'incorrect'}`}
                  >
                    <div className="review-header">
                      <span className="review-number">Question {index + 1}</span>
                      <span className={`review-status ${answer.isCorrect ? 'correct' : 'incorrect'}`}>
                        {answer.isCorrect ? '✅ Correct' : '❌ Incorrect'}
                      </span>
                    </div>

                    <div className="review-content">
                      <p><strong>Question:</strong> {answer.question}</p>
                      {answer.userAnswer && (
                        <p>
                          <strong>Votre réponse:</strong>
                          <span className={answer.isCorrect ? 'correct-answer' : 'wrong-answer'}>
                            {answer.userAnswer}
                          </span>
                        </p>
                      )}
                      {!answer.isCorrect && (
                        <p>
                          <strong>Bonne réponse:</strong>
                          <span className="correct-answer">{answer.correctAnswer}</span>
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultPage;