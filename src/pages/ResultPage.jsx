import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";

const ResultPage = ({ theme, onToggleTheme }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const quizData = location.state?.quizData;

  const [showReview, setShowReview] = useState(false);

  if (!quizData) {
    navigate("/", { replace: true });
    return null;
  }

  const { score, totalQuestions, answers } = quizData;
  const wrongCount = Math.max(0, totalQuestions - score);

  return (
    <div className="font-nunito bg-white dark:bg-slate-950 min-h-screen w-full transition-colors">
      <div className="w-full min-h-screen flex flex-col px-5 py-8 lg:px-24 lg:py-14">
        <Header
          title="SportQuiz"
          subtitle="Résultats de ta partie"
          theme={theme}
          onToggleTheme={onToggleTheme}
        />

        {/* Score circle */}
        <div className="flex flex-col items-center mb-10 lg:mb-14">
          <div
            className="w-36 h-36 lg:w-48 lg:h-48 rounded-full border-8 border-indigo-600 bg-indigo-50
                       flex flex-col items-center justify-center shadow-xl shadow-indigo-100 mb-4"
          >
            <span className="font-black text-indigo-600 text-4xl lg:text-6xl leading-none">
              {score}
            </span>
            <span className="text-gray-400 font-black text-base lg:text-xl">
              /{totalQuestions}
            </span>
          </div>

          <h2 className="font-black text-gray-800 dark:text-white text-2xl lg:text-4xl mb-1">
            Félicitations !{" "}
            <i className="fa-solid fa-trophy text-yellow-500" aria-hidden="true" />
          </h2>

          <p className="text-gray-400 font-semibold text-sm lg:text-lg">
            Excellent résultat, continue comme ça !
          </p>
        </div>

        {/* Stats row */}
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 mb-10 lg:mb-14">
          {/* Bonnes réponses */}
          <div className="flex-1 flex items-center gap-4 border-2 border-green-200 bg-green-50 rounded-2xl px-6 py-5">
            <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-green-400 flex items-center justify-center flex-shrink-0 shadow-md shadow-green-200">
              <i className="fa-solid fa-circle-check text-white text-xl lg:text-2xl" aria-hidden="true" />
            </div>
            <div>
              <p className="text-green-700 text-xs lg:text-sm font-bold mb-0.5">
                Bonnes réponses
              </p>
              <p className="font-black text-green-600 text-3xl lg:text-4xl leading-none">
                {score}
              </p>
            </div>
          </div>

          {/* Mauvaises réponses */}
          <div className="flex-1 flex items-center gap-4 border-2 border-red-200 bg-red-50 rounded-2xl px-6 py-5">
            <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-red-400 flex items-center justify-center flex-shrink-0 shadow-md shadow-red-200">
              <i className="fa-solid fa-circle-xmark text-white text-xl lg:text-2xl" aria-hidden="true" />
            </div>
            <div>
              <p className="text-red-700 text-xs lg:text-sm font-bold mb-0.5">
                Mauvaises réponses
              </p>
              <p className="font-black text-red-500 text-3xl lg:text-4xl leading-none">
                {wrongCount}
              </p>
            </div>
          </div>
        </div>

        {/* Review list */}
        {showReview && (
          <div className="mb-6">
            <div className="bg-gray-50 dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-800 rounded-2xl p-4 lg:p-6">
              <h3 className="font-black text-gray-800 dark:text-white text-lg lg:text-2xl mb-4 flex items-center gap-3">
                <i className="fa-solid fa-clipboard-list text-indigo-700" aria-hidden="true" />
                Voir les réponses
              </h3>

              <div className="flex flex-col gap-3 max-h-[45vh] overflow-auto pr-1">
                {answers.map((a, idx) => (
                  <div
                    key={idx}
                    className={`rounded-2xl p-4 border-2 ${
                      a.isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"
                    }`}
                  >
                    <p className="font-black text-gray-800 mb-2">
                      <span className="text-gray-400 font-extrabold mr-2">Q{idx + 1}</span>
                      {a.question}
                    </p>

                    <p className="text-sm font-semibold text-gray-600">
                      <i className="fa-solid fa-user text-gray-400 mr-2" aria-hidden="true" />
                      Ta réponse:{" "}
                      <span className={a.isCorrect ? "text-green-700 font-black" : "text-red-700 font-black"}>
                        {a.userAnswer ?? "—"}
                      </span>
                    </p>

                    {!a.isCorrect && (
                      <p className="text-sm font-semibold text-gray-600">
                        <i className="fa-solid fa-bullseye text-gray-400 mr-2" aria-hidden="true" />
                        Bonne réponse:{" "}
                        <span className="text-green-700 font-black">{a.correctAnswer}</span>
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="flex-1" />

        {/* Buttons */}
        <div className="flex flex-col gap-3 pt-8">
          <button
            onClick={() => navigate("/", { replace: true })}
            className="w-full py-5 rounded-2xl bg-indigo-700 text-white font-black text-base lg:text-xl tracking-wide
                       shadow-lg shadow-indigo-200 hover:bg-indigo-800 hover:-translate-y-0.5 active:scale-95 transition-all
                       flex items-center justify-center gap-3"
          >
            <i className="fa-solid fa-rotate-right" aria-hidden="true" />
            Nouvelle partie
          </button>

          <button
            onClick={() => setShowReview((v) => !v)}
            className="w-full py-5 rounded-2xl border-2 border-indigo-200 bg-indigo-50
                       text-indigo-700 font-black text-base lg:text-xl tracking-wide
                       hover:bg-indigo-100 hover:-translate-y-0.5 active:scale-95 transition-all
                       flex items-center justify-center gap-3"
          >
            {showReview ? (
              <>
                <i className="fa-solid fa-xmark" aria-hidden="true" />
                Fermer
              </>
            ) : (
              <>
                <i className="fa-solid fa-clipboard-list" aria-hidden="true" />
                Voir les réponses
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultPage;