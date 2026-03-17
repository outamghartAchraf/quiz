
import Timer from "./Timer";

const QuestionInfo = ({ currentIndex, total, timeLeft, dashArray, dashOffset }) => {
  return (
    <div className="flex items-center justify-between mb-3">
      <div>
        <p className="text-gray-400 text-xs lg:text-sm font-semibold mb-0.5">
          Question
        </p>
        <p className="font-black leading-none text-indigo-600 text-2xl lg:text-4xl">
          {currentIndex + 1}
          <span className="text-gray-400 font-semibold text-base lg:text-2xl">
            /{total}
          </span>
        </p>
      </div>
      <Timer timeLeft={timeLeft} dashArray={dashArray} dashOffset={dashOffset} />
    </div>
  );
};

export default QuestionInfo;