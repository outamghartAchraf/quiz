import React from "react";

const ScoreCircle = ({ score, total }) => (
  <div className="flex flex-col items-center mb-10 lg:mb-14">
    <div className="w-36 h-36 lg:w-48 lg:h-48 rounded-full border-8 border-indigo-600 bg-indigo-50
                    flex flex-col items-center justify-center   mb-4">
      <span className="font-black text-indigo-600 text-4xl lg:text-6xl leading-none">{score}</span>
      <span className="text-gray-400 font-black text-base lg:text-xl">/{total}</span>
    </div>
    <h2 className="font-black text-gray-800 dark:text-white text-2xl lg:text-4xl mb-1">
      Félicitations! <i className="fa-solid fa-trophy text-yellow-500" />
    </h2>
    <p className="text-gray-400 font-semibold text-sm lg:text-lg">Excellent résultat, continue comme ça</p>
  </div>
);

export default ScoreCircle;