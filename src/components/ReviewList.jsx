import React from "react";

const ReviewList = ({ answers }) => (
  <div className="mb-6">
    <div className="bg-gray-50 dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-800 rounded-2xl p-4 lg:p-6">
      <h3 className="font-black text-gray-800 dark:text-white text-lg lg:text-2xl mb-4 flex items-center gap-3">
        <i className="fa-solid fa-clipboard-list text-indigo-700" /> Voir les réponses
      </h3>
      <div className="flex flex-col gap-3 max-h-[45vh] overflow-auto pr-1">
        {answers.map((a, idx) => (
          <div key={idx} className={`rounded-2xl p-4 border-2 ${a.isCorrect ? "bg-green-50 border-green-200" : "bg-red-50 border-red-200"}`}>
            <p className="font-black text-gray-800 mb-2">
              <span className="text-gray-400 font-extrabold mr-2">Q{idx + 1}</span>{a.question}
            </p>
            <p className="text-sm font-semibold text-gray-600">
              <i className="fa-solid fa-user text-gray-400 mr-2" /> Ta réponse:{" "}
              <span className={a.isCorrect ? "text-green-700 font-black" : "text-red-700 font-black"}>
                {a.userAnswer ?? "—"}
              </span>
            </p>
            {!a.isCorrect && (
              <p className="text-sm font-semibold text-gray-600">
                <i className="fa-solid fa-bullseye text-gray-400 mr-2" /> Bonne réponse:{" "}
                <span className="text-green-700 font-black">{a.correctAnswer}</span>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default ReviewList;