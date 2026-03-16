import React from "react";

const ScoreBoard = ({ score }) => {
  return (
    <div className="font-black text-indigo-600">
      Score: <span className="text-gray-800 dark:text-white">{score}</span>
    </div>
  );
};

export default ScoreBoard;