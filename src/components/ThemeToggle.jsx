import React from 'react';
import Button from './Button';

const ThemeToggle = ({ theme, onToggle }) => {
  return (
    <Button
      className="theme-toggle-btn"
      onClick={onToggle}
      variant="secondary"
      aria-label="Toggle theme"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </Button>
  );
};

export default ThemeToggle;