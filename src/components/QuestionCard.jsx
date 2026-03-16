import React from "react";
import Button from "./Button";

const letters = ["a", "b", "c", "d"];
const badgeColors = ["bg-yellow-400", "bg-green-400", "bg-violet-500", "bg-green-300"];

const QuestionCard = ({
  questionText,
  options,
  onSelect,
  isLocked,
  correctAnswer,
  selectedAnswer,
}) => {
  const rowClass = (opt) => {
    const base =
      "flex items-center gap-3 lg:gap-5 rounded-2xl px-4 py-3.5 lg:py-5 w-full text-left bg-gray-100";
    if (!isLocked) return base;

    if (opt === correctAnswer) return `${base} ring-2 ring-emerald-400 bg-emerald-100`;
    if (selectedAnswer === opt && opt !== correctAnswer) return `${base} ring-2 ring-rose-400 bg-rose-100`;

    return `${base} opacity-60`;
  };

  const textClass = (opt) => {
    if (!isLocked) return "font-bold text-gray-700 text-base lg:text-xl";
    if (opt === correctAnswer) return "font-extrabold text-emerald-700 text-base lg:text-xl";
    if (selectedAnswer === opt && opt !== correctAnswer) return "font-extrabold text-rose-700 text-base lg:text-xl";
    return "font-bold text-gray-500 text-base lg:text-xl";
  };

  return (
    <>
      <div className="bg-purple-100 rounded-2xl px-5 py-5 lg:px-10 lg:py-8 mb-6 lg:mb-8 text-center">
        <p className="font-bold text-gray-800 text-base lg:text-2xl leading-snug">
          {questionText}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 mb-6 lg:mb-8">
        {options.map((opt, idx) => (
          <Button
            key={opt}
            type="button"
            disabled={isLocked}
            onClick={() => onSelect(opt)}
            className={rowClass(opt)}
          >
            <span
              className={`w-7 h-7 lg:w-10 lg:h-10 rounded-full ${
                badgeColors[idx % badgeColors.length]
              } flex items-center justify-center text-white font-extrabold text-xs lg:text-base flex-shrink-0`}
            >
              {letters[idx] || "•"}
            </span>
            <span className={textClass(opt)}>{opt}</span>
          </Button>
        ))}
      </div>
    </>
  );
};

export default QuestionCard;