import React from "react";
import Button from "./Button";

const QuizActions = ({
  canUseHint,
  onFifty,
  onNext,
  isLocked,
  isLastQuestion,
}) => {
  return (
    <div className="mt-auto grid gap-3 lg:grid-cols-[1fr_2fr] pt-4">
      <Button
        type="button"
        onClick={onFifty}
        disabled={!canUseHint}
        className={`w-full py-4 lg:py-5 rounded-2xl font-extrabold text-base lg:text-xl tracking-wide  
          ${
            canUseHint
              ? "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 "
              : "bg-gray-100 text-gray-400 "
          }`}
      >
        50/50
      </Button>

      <Button
        type="button"
        onClick={onNext}
        disabled={!isLocked}
        className="w-full py-4 lg:py-5 rounded-2xl bg-indigo-700 hover:bg-indigo-800
             text-white font-extrabold text-base lg:text-xl tracking-wide
             flex items-center justify-center gap-3"
      >
        {isLastQuestion ? (
          <>
            <span>Finish</span>
            <i className="fa-solid fa-flag-checkered" />
          </>
        ) : (
          <>
            <span>Next</span>
            <i className="fa-solid fa-arrow-right" />
          </>
        )}
      </Button>
    </div>
  );
};

export default QuizActions;
