import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../components/Button';

const ErrorPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const errorMessage = location.state?.errorMessage || 'Une erreur est survenue';

  const handleRetry = () => {
    navigate('/', { replace: true });
  };

  return (
    <div className="page error-page">
      <div className="page-container">
        <div className="error-card">
          <div className="error-icon">⚠️</div>
          <h2>Erreur lors du chargement</h2>
          <p className="error-message">{errorMessage}</p>
          <p className="error-subtitle">Veuillez vérifier votre connexion Internet et réessayer.</p>
          
          <div className="error-actions">
            <Button
              variant="primary"
              onClick={handleRetry}
              className="retry-btn"
            >
              🔄 Réessayer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;