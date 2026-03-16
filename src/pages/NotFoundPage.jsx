import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="page not-found-page">
      <div className="page-container">
        <div className="error-card">
          <div className="error-icon">404</div>
          <h2>Page non trouvée</h2>
          <p className="error-message">La page que vous recherchez n'existe pas</p>
          <p className="error-subtitle">Retournez à la page d'accueil pour commencer un nouveau quiz</p>
          
          <div className="error-actions">
            <Button
              variant="primary"
              onClick={() => navigate('/', { replace: true })}
              className="retry-btn"
            >
              ← Retour à l'accueil
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;