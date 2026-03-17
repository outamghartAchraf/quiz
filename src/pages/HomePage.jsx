import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchQuestions } from "../utils/quizService";
import Header from "../components/Header";
import Loader from "../components/Loader";

const HomePage = ({ theme, onToggleTheme }) => {
  const navigate = useNavigate();

  const [amount, setAmount] = useState(10);
  const [difficulty, setDifficulty] = useState("");
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    if (Number.isNaN(amount) || amount < 5 || amount > 30) {
      alert("Entrez un nombre entre 5 et 30");
      return;
    }

    try {
      setLoading(true);

      const questions = await fetchQuestions(amount, difficulty);

      if (!questions || questions.length === 0) {
        alert("Aucune question disponible pour ces paramètres.");
        return;
      }

      navigate("/quiz", {
        state: { questions, quizConfig: { amount, difficulty } },
      });
    } catch (err) {
      navigate("/error", {
        state: { errorMessage: err?.message || "Erreur lors du chargement des questions." },
        replace: true,
      });
    } finally {
      setLoading(false);
    }
  };

   
  if (loading) {
    return <Loader message="Chargement des questions..." />;
  }

  return (
    <div className="font-nunito bg-white dark:bg-slate-950 min-h-screen w-full transition-colors">
      <div className="w-full min-h-screen flex flex-col px-5 py-8 lg:px-24 lg:py-14">
        <Header
          title="SportQuiz"
          subtitle="Teste tes connaissances sportives"
          theme={theme}
          onToggleTheme={onToggleTheme}
        />

        <div className="mb-8">
          <h2 className="font-black text-gray-800 dark:text-white text-2xl lg:text-5xl leading-tight mb-2">
            Start Quiz 
          </h2>
          <p className="text-gray-400 font-semibold text-sm lg:text-lg">
          
          </p>
        </div>

        <div className="flex flex-col lg:flex-row lg:gap-16 gap-8">
          <div className="flex-1">
            <p className="font-black text-gray-800 dark:text-white text-base lg:text-xl mb-1">
              Nombre de questions
            </p>
            <p className="text-gray-400 text-xs lg:text-sm font-semibold mb-3">
              Entrez un nombre entre 5 et 30
            </p>
            <input
              type="number"
              min={5}
              max={30}
              placeholder="Ex : 10"
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value, 10) || 5)}
              className="w-full border-2 border-gray-200 dark:border-slate-800 rounded-2xl px-5 py-4
                         font-black text-gray-800 dark:text-white text-lg lg:text-xl bg-gray-50 dark:bg-slate-900
                         placeholder-gray-300 dark:placeholder-slate-500 outline-none
                         focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-500/20
                         focus:bg-white dark:focus:bg-slate-950 transition-all"
            />
          </div>

          <div className="flex-1">
            <p className="font-black text-gray-800 dark:text-white text-base lg:text-xl mb-1">
              Niveau de difficulté
            </p>
            <p className="text-gray-400 text-xs lg:text-sm font-semibold mb-3">
              Choisissez votre défi
            </p>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full border-2 border-gray-200 dark:border-slate-800 rounded-2xl px-5 py-4
                         font-black text-gray-800 dark:text-white text-lg lg:text-xl bg-gray-50 dark:bg-slate-900
                         outline-none cursor-pointer
                         focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 dark:focus:ring-indigo-500/20
                         focus:bg-white dark:focus:bg-slate-950 transition-all"
            >
              <option value="">-- Sélectionner --</option>
              <option value="easy">Facile — Débutant</option>
              <option value="medium">Moyen — Équilibré</option>
              <option value="hard">Difficile — Expert</option>
            </select>
          </div>
        </div>

        <div className="flex-1" />

        <div className="pt-8">
          <button
            onClick={handleStart}
            className="w-full py-5 rounded-2xl bg-indigo-700
                       text-white font-black text-base lg:text-xl tracking-wide
                      
                       hover:bg-indigo-800 hover:-translate-y-0.5
                       active:scale-95 transition-all"
          >
            Lancer le Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;