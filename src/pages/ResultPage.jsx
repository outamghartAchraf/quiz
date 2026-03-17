import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ScoreCircle from "../components/ScoreCircle";
import StatsCard from "../components/StatsCard";
import ReviewList from "../components/ReviewList";
import ResultButtons from "../components/ResultButtons";

const ResultPage = ({ theme, onToggleTheme }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const quizData = location.state?.quizData;
  const [showReview, setShowReview] = useState(false);

  if (!quizData) {
    navigate("/", { replace: true });
    return null;
  }

  const { score, totalQuestions, answers, percentage } = quizData;
  const wrongCount = totalQuestions - score;

  return (
    <div className="font-nunito bg-white dark:bg-slate-950 min-h-screen w-full transition-colors">
      <div className="w-full min-h-screen flex flex-col px-5 py-8 lg:px-24 lg:py-14">
        <Header title="SportQuiz" subtitle="Résultats de ta partie" theme={theme} onToggleTheme={onToggleTheme} />

        <ScoreCircle score={score} total={totalQuestions} />

            <div className="text-center mb-8">
              <p className="text-gray-400 font-semibold text-sm mb-2">Pourcentage</p>
              <p className="font-black text-indigo-600 text-3xl">{percentage}%</p>
            </div>

        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 mb-10 lg:mb-14">
          <StatsCard label="Bonnes réponses" count={score} color="green" icon="fa-circle-check" />
          <StatsCard label="Mauvaises réponses" count={wrongCount} color="red" icon="fa-circle-xmark" />
        </div>


           
         
 

        {showReview && <ReviewList answers={answers} />}

        <div className="flex-1" />
        <ResultButtons showReview={showReview} setShowReview={setShowReview} />
        // داخل button "Voir les réponses":
<button
  onClick={() => navigate("/review", {
    state: { quizData }
  })}
  className="w-full py-5 rounded-2xl border-2 border-indigo-200 bg-indigo-50
             text-indigo-700 font-black text-base lg:text-xl tracking-wide
             hover:bg-indigo-100 hover:-translate-y-0.5 active:scale-95 transition-all
             flex items-center justify-center gap-3"
>
  <i className="fa-solid fa-clipboard-list" aria-hidden="true" />
  Voir les réponses
</button>
      </div>
    </div>
  );
};

export default ResultPage;