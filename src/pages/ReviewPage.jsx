import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";

const ReviewPage = ({ theme, onToggleTheme }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const quizData = location.state?.quizData;

  if (!quizData) {
    navigate("/", { replace: true });
    return null;
  }

  const { score, totalQuestions, answers, percentage } = quizData;

  return (
    <div className="font-nunito bg-white dark:bg-slate-950 min-h-screen w-full transition-colors">
      <div className="w-full min-h-screen flex flex-col px-5 py-8 lg:px-24 lg:py-14">
        <Header
          title="SportQuiz"
          subtitle="Révision complète"
          theme={theme}
          onToggleTheme={onToggleTheme}
          rightSlot={
            <button
              onClick={() => navigate("/results", { replace: true })}
              className="w-11 h-11 lg:w-14 lg:h-14 rounded-2xl bg-gray-100 dark:bg-slate-900
                         hover:bg-gray-200 dark:hover:bg-slate-800 flex items-center justify-center transition-colors"
              aria-label="Back to results"
              type="button"
              title="Retour aux résultats"
            >
              <i
                className="fa-solid fa-arrow-left text-gray-700 dark:text-gray-200"
                aria-hidden="true"
              />
            </button>
          }
        />

        {/* Summary Stats */}
        <div className="mb-8 bg-indigo-50 dark:bg-slate-900 border-2 border-indigo-200 dark:border-slate-800 rounded-2xl p-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
            <div>
              <p className="text-indigo-700 dark:text-indigo-300 font-semibold text-sm mb-2">
                Résumé de ta partie
              </p>
              <h2 className="font-black text-indigo-600 dark:text-indigo-400 text-3xl">
                {score} / {totalQuestions}
              </h2>
            </div>

            <div className="text-center">
              <p className="text-gray-400 font-semibold text-sm mb-2">Pourcentage</p>
              <p className="font-black text-indigo-600 text-3xl">{percentage}%</p>
            </div>

            <div className="flex gap-4">
              <div className="text-center">
                <p className="text-green-700 font-semibold text-sm mb-2">
                  <i className="fa-solid fa-circle-check mr-1" aria-hidden="true" />
                  Correct
                </p>
                <p className="font-black text-green-600 text-2xl">{score}</p>
              </div>

              <div className="text-center">
                <p className="text-red-700 font-semibold text-sm mb-2">
                  <i className="fa-solid fa-circle-xmark mr-1" aria-hidden="true" />
                  Incorrect
                </p>
                <p className="font-black text-red-600 text-2xl">
                  {Math.max(0, totalQuestions - score)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Questions Review List */}
        <div className="flex-1 mb-8">
          <h3 className="font-black text-gray-800 dark:text-white text-2xl mb-4 flex items-center gap-3">
            <i className="fa-solid fa-clipboard-list text-indigo-700" aria-hidden="true" />
            Détail des questions
          </h3>

          <div className="flex flex-col gap-4 max-h-[50vh] overflow-y-auto pr-2">
            {answers.map((a, idx) => (
              <div
                key={idx}
                className={`rounded-2xl p-5 border-2 transition-all ${
                  a.isCorrect
                    ? "bg-green-50 border-green-200 hover:shadow-md hover:shadow-green-100"
                    : "bg-red-50 border-red-200 hover:shadow-md hover:shadow-red-100"
                }`}
              >
                {/* Question Number + Status */}
                <div className="flex items-start justify-between mb-3">
                  <h4 className="font-black text-gray-800 dark:text-gray-200 text-lg flex items-center gap-2">
                    <span className="text-gray-500">Q{idx + 1}</span>
                  </h4>

                  {a.isCorrect ? (
                    <span className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full font-bold text-sm">
                      <i className="fa-solid fa-check" aria-hidden="true" />
                      Correct
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-3 py-1 rounded-full font-bold text-sm">
                      <i className="fa-solid fa-xmark" aria-hidden="true" />
                      Incorrect
                    </span>
                  )}
                </div>

                {/* Question Text */}
                <p className="font-bold text-gray-800 dark:text-gray-100 mb-3 text-base leading-relaxed">
                  {a.question}
                </p>

                {/* User Answer */}
                <div className="mb-3 pl-4 border-l-4 border-gray-300">
                  <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                    <i className="fa-solid fa-user text-gray-400 mr-2" aria-hidden="true" />
                    Ta réponse:
                  </p>
                  <p
                    className={`font-extrabold text-base mt-1 ${
                      a.isCorrect ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {a.userAnswer ?? (
                      <span className="italic text-gray-400">
                        Pas de réponse (temps écoulé)
                      </span>
                    )}
                  </p>
                </div>

                {/* Correct Answer (if wrong) */}
                {!a.isCorrect && (
                  <div className="pl-4 border-l-4 border-green-400">
                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                      <i className="fa-solid fa-bullseye text-green-500 mr-2" aria-hidden="true" />
                      Bonne réponse:
                    </p>
                    <p className="font-extrabold text-base mt-1 text-green-700">
                      {a.correctAnswer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 pt-8 border-t-2 border-gray-200 dark:border-slate-800">
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
            onClick={() => navigate("/results", { replace: true })}
            className="w-full py-5 rounded-2xl border-2 border-indigo-200 bg-indigo-50
                       text-indigo-700 font-black text-base lg:text-xl tracking-wide
                       hover:bg-indigo-100 hover:-translate-y-0.5 active:scale-95 transition-all
                       flex items-center justify-center gap-3"
          >
            <i className="fa-solid fa-arrow-left" aria-hidden="true" />
            Retour aux résultats
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;