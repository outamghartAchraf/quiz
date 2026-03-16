import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";

const ErrorPage = ({ theme, onToggleTheme }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const errorMessage = location.state?.errorMessage || "Une erreur est survenue";

  return (
    <div className="font-nunito bg-white dark:bg-slate-950 min-h-screen w-full transition-colors">
      <div className="w-full min-h-screen flex flex-col px-5 py-8 lg:px-24 lg:py-14">
        <Header title="SportQuiz" subtitle="Erreur" theme={theme} onToggleTheme={onToggleTheme} />

        <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-6">
          <p className="font-black text-red-700 mb-2">⚠️ Erreur</p>
          <p className="text-red-700 font-semibold">{errorMessage}</p>
        </div>

        <div className="flex-1" />

        <button
          onClick={() => navigate("/", { replace: true })}
          className="w-full py-5 rounded-2xl bg-indigo-700 text-white font-black text-base lg:text-xl tracking-wide
                     shadow-lg shadow-indigo-200 hover:bg-indigo-800 transition-all"
        >
          Retour
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;