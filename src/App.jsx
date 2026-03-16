import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import QuizPage from "./pages/QuizPage";
import ResultPage from "./pages/ResultPage";
import ErrorPage from "./pages/ErrorPage";
import NotFoundPage from "./pages/NotFoundPage";

const THEME_KEY = "sport-quiz-theme";

const App = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem(THEME_KEY) || "light");

  useEffect(() => {
    const root = document.documentElement; // <html>
    if (theme === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage theme={theme} onToggleTheme={toggleTheme} />} />
        <Route path="/quiz" element={<QuizPage theme={theme} onToggleTheme={toggleTheme} />} />
        <Route path="/results" element={<ResultPage theme={theme} onToggleTheme={toggleTheme} />} />
        <Route path="/error" element={<ErrorPage theme={theme} onToggleTheme={toggleTheme} />} />
        <Route path="*" element={<NotFoundPage theme={theme} onToggleTheme={toggleTheme} />} />
      </Routes>
    </Router>
  );
};

export default App;