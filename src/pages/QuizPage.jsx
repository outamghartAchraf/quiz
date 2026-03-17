import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import ProgressBar from "../components/ProgressBar";
import QuestionCard from "../components/QuestionCard";

import QuizHeader from "../components/QuizHeader";
import QuestionInfo from "../components/QuestionInfo";
import QuizActions from "../components/QuizActions";

import { decodeHTML, shuffle } from "../utils/helpers";

const QUIZ_TIME_SECONDS = 30;

const QuizPage = ({ theme, onToggleTheme }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const questionsRaw = location.state?.questions || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isLocked, setIsLocked] = useState(false);
  const [hintUsed, setHintUsed] = useState(false);
  const [removedOptions, setRemovedOptions] = useState([]);
  const [timeLeft, setTimeLeft] = useState(QUIZ_TIME_SECONDS);
  const [answersLog, setAnswersLog] = useState([]);
  const [baseOptions, setBaseOptions] = useState([]);

  const currentQuestion = questionsRaw[currentIndex];

  useEffect(() => {
    if (!questionsRaw.length) navigate("/", { replace: true });
  }, [questionsRaw]);

  
useEffect(() => {
  if (!currentQuestion) return;

  setTimeLeft(QUIZ_TIME_SECONDS);
  setSelectedAnswer(null);
  setIsLocked(false);
  setRemovedOptions([]);

  const options =
    currentQuestion.type === "boolean"
      ? ["True", "False"]
      : shuffle([
          decodeHTML(currentQuestion.correct_answer),
          ...currentQuestion.incorrect_answers.map(decodeHTML),
        ]);
  setBaseOptions(options);

  const timer = setInterval(() => {
    setTimeLeft((t) => {
      if (t <= 1) {
        clearInterval(timer);  
        setIsLocked(true);     
        setAnswersLog((prev) => [
          ...prev,
          {
            question: decodeHTML(currentQuestion.question),
            userAnswer: null,
            correctAnswer: decodeHTML(currentQuestion.correct_answer),
            isCorrect: false,
          },
        ]);
        return 0;
      }
      return t - 1;
    });
  }, 1000);

  return () => clearInterval(timer);
}, [currentIndex, currentQuestion]);

  if (!currentQuestion) return null;

  const questionText = decodeHTML(currentQuestion.question);
  const correctAnswer = decodeHTML(currentQuestion.correct_answer);
  const options = baseOptions.filter((o) => !removedOptions.includes(o));

  const onSelect = (ans) => {
    if (isLocked) return;
    setSelectedAnswer(ans);
    setIsLocked(true);

    const isCorrect = ans === correctAnswer;
    if (isCorrect) setScore((s) => s + 1);

    setAnswersLog((prev) => [
      ...prev,
      { question: questionText, userAnswer: ans, correctAnswer, isCorrect },
    ]);
  };

  const canUseHint = !hintUsed && !isLocked && currentQuestion.type !== "boolean";

  const onFifty = () => {
    if (!canUseHint) return;
    const wrong = baseOptions.filter((o) => o !== correctAnswer);
    setRemovedOptions(shuffle(wrong).slice(0, 2));
    setHintUsed(true);
  };

  const onNext = () => {
    if (!isLocked) return;
    if (currentIndex < questionsRaw.length - 1) {
      setCurrentIndex((i) => i + 1);
      return;
    }
    const totalQuestions = questionsRaw.length;
    navigate("/results", {
      state: {
        quizData: {
          score,
          totalQuestions,
          answers: answersLog,
          percentage: Math.round((score / totalQuestions) * 100),
        },
      },
      replace: true,
    });
  };

  const progressPercent = Math.round(((currentIndex + 1) / questionsRaw.length) * 100);
  const dashArray = 163;
  const dashOffset = Math.round(dashArray * (1 - timeLeft / QUIZ_TIME_SECONDS));

  return (
    <div className="font-nunito bg-white dark:bg-slate-950 min-h-screen w-full transition-colors">
      <div className="w-full min-h-screen flex flex-col px-5 py-8 lg:px-24 lg:py-14">
        <QuizHeader
          category={currentQuestion.category}
          currentIndex={currentIndex}
          total={questionsRaw.length}
          score={score}
          theme={theme}
          onToggleTheme={onToggleTheme}
        />

        <QuestionInfo
          currentIndex={currentIndex}
          total={questionsRaw.length}
          timeLeft={timeLeft}
          dashArray={dashArray}
          dashOffset={dashOffset}
        />

        <div className="mb-6 lg:mb-8">
          <ProgressBar value={progressPercent} />
        </div>

        <QuestionCard
          questionText={questionText}
          options={options}
          onSelect={onSelect}
          isLocked={isLocked}
          correctAnswer={correctAnswer}
          selectedAnswer={selectedAnswer}
        />

        <QuizActions
          canUseHint={canUseHint}
          onFifty={onFifty}
          onNext={onNext}
          isLocked={isLocked}
          isLastQuestion={currentIndex === questionsRaw.length - 1}
        />
      </div>
    </div>
  );
};

export default QuizPage;