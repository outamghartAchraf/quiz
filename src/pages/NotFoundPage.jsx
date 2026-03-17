import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

const NotFoundPage = ({ theme, onToggleTheme }) => {
  const navigate = useNavigate();

  return (
    <div className="font-nunito bg-white dark:bg-slate-950 min-h-screen w-full transition-colors">
      <div className="w-full min-h-screen flex flex-col px-5 py-8 lg:px-24 lg:py-14">
        <Header title="SportQuiz" subtitle="Page introuvable" theme={theme} onToggleTheme={onToggleTheme} />

        <div className="bg-gray-50 dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-800 rounded-2xl p-6">
          <p className="font-black text-gray-800 dark:text-white mb-2">404</p>
          <p className="text-gray-500 font-semibold">Page non trouvée</p>
        </div>

        <div className="flex-1" />

        <button
          onClick={() => navigate("/", { replace: true })}
          className="w-full py-5 rounded-2xl bg-indigo-700 text-white font-black text-base lg:text-xl tracking-wide
                     shadow-lg shadow-indigo-200 hover:bg-indigo-800 transition-all"
        >
          Retour accueil
        </button>
      </div>
    </div>
  );
};

export default NotFoundPage;