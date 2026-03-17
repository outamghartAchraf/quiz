import Header from "./Header";
import { useNavigate } from "react-router-dom";

const QuizHeader = ({ category, currentIndex, total, score, theme, onToggleTheme }) => {
  const navigate = useNavigate();

  return (
    <Header
      title={category || "Sports"}
      subtitle={`Question ${currentIndex + 1}/${total} • Score ${score}`}
      theme={theme}
      onToggleTheme={onToggleTheme}
      rightSlot={
        <button
          onClick={() => navigate("/", { replace: true })}
          className="w-11 h-11 lg:w-14 lg:h-14 rounded-2xl bg-gray-100 dark:bg-slate-900
          hover:bg-gray-200 dark:hover:bg-slate-800
          flex items-center justify-center transition-colors"
        >
          <i className="fa-solid fa-arrow-left text-gray-700 dark:text-gray-200 text-lg lg:text-xl" />
        </button>
      }
    />
  );
};

export default QuizHeader;