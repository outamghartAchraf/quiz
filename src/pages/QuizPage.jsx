import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import Header from "../components/Header";
import ProgressBar from "../components/ProgressBar";
import Timer from "../components/Timer";
import QuestionCard from "../components/QuestionCard";
import Button from "../components/Button";

const QUIZ_TIME_SECONDS = 30;

const decodeHTML = (html) => {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = html;
  return textarea.value;
};

const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const QuizPage = ({ theme, onToggleTheme }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const questionsRaw = location.state?.questions || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  const [answersLog, setAnswersLog] = useState([]);

  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isLocked, setIsLocked] = useState(false);

  // 50/50 once per quiz
  const [hintUsed, setHintUsed] = useState(false);
  const [removedOptions, setRemovedOptions] = useState([]);

  const [timeLeft, setTimeLeft] = useState(QUIZ_TIME_SECONDS);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!questionsRaw.length) navigate("/", { replace: true });
  }, [questionsRaw, navigate]);

  const currentQuestion = questionsRaw[currentIndex];

  const questionText = currentQuestion ? decodeHTML(currentQuestion.question) : "";
  const correctAnswer = currentQuestion ? decodeHTML(currentQuestion.correct_answer) : "";

  const baseOptions = useMemo(() => {
    if (!currentQuestion) return [];
    if (currentQuestion.type === "boolean") return shuffle(["True", "False"]);

    const correct = decodeHTML(currentQuestion.correct_answer);
    const incorrect = (currentQuestion.incorrect_answers || []).map(decodeHTML);
    return shuffle([correct, ...incorrect]);
  }, [currentQuestion]);

  const options = useMemo(() => {
    if (!removedOptions.length) return baseOptions;
    return baseOptions.filter((o) => !removedOptions.includes(o));
  }, [baseOptions, removedOptions]);

  // reset per question
  useEffect(() => {
    if (!currentQuestion) return;

    setTimeLeft(QUIZ_TIME_SECONDS);
    setSelectedAnswer(null);
    setIsLocked(false);
    setRemovedOptions([]);

    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => setTimeLeft((t) => t - 1), 1000);

    return () => intervalRef.current && clearInterval(intervalRef.current);
  }, [currentIndex, currentQuestion]);

  // time up
  useEffect(() => {
    if (!currentQuestion) return;
    if (timeLeft > 0) return;

    intervalRef.current && clearInterval(intervalRef.current);

    if (!isLocked) {
      setIsLocked(true);
      setAnswersLog((prev) => [
        ...prev,
        { question: questionText, userAnswer: null, correctAnswer, isCorrect: false },
      ]);
    }
  }, [timeLeft, isLocked, currentQuestion, questionText, correctAnswer]);

  const progressPercent = Math.round(((currentIndex + 1) / (questionsRaw.length || 1)) * 100);

  const dashArray = 163;
  const dashOffset = Math.round(dashArray * (1 - timeLeft / QUIZ_TIME_SECONDS));

  const onSelect = (ans) => {
    if (isLocked) return;
    intervalRef.current && clearInterval(intervalRef.current);

    setSelectedAnswer(ans);
    setIsLocked(true);

    const isCorrect = ans === correctAnswer;
    if (isCorrect) setScore((s) => s + 1);

    setAnswersLog((prev) => [
      ...prev,
      { question: questionText, userAnswer: ans, correctAnswer, isCorrect },
    ]);
  };

  const canUseHint = !hintUsed && !isLocked && currentQuestion?.type !== "boolean";

  const onFifty = () => {
    if (!canUseHint) return;
    const wrong = baseOptions.filter((o) => o !== correctAnswer);
    const toRemove = shuffle(wrong).slice(0, 2);
    setRemovedOptions(toRemove);
    setHintUsed(true);
  };

  const onNext = () => {
    if (!isLocked) return;

    if (currentIndex < questionsRaw.length - 1) {
      setCurrentIndex((i) => i + 1);
      return;
    }

    const totalQuestions = questionsRaw.length;
    const percentage = totalQuestions ? Math.round((score / totalQuestions) * 100) : 0;

    navigate("/results", {
      state: { quizData: { score, totalQuestions, answers: answersLog, percentage } },
      replace: true,
    });
  };

  if (!currentQuestion) return null;

  return (
    <div className="font-nunito bg-white dark:bg-slate-950 min-h-screen w-full transition-colors">
      <div className="w-full min-h-screen flex flex-col px-5 py-8 lg:px-24 lg:py-14">
        <Header
          title={currentQuestion.category || "Sports"}
          subtitle={`Question ${currentIndex + 1}/${questionsRaw.length} • Score ${score}`}
          theme={theme}
          onToggleTheme={onToggleTheme}
          rightSlot={
<button
  onClick={() => navigate("/", { replace: true })}
  className="w-11 h-11 lg:w-14 lg:h-14 rounded-2xl bg-gray-100 dark:bg-slate-900
             hover:bg-gray-200 dark:hover:bg-slate-800
             flex items-center justify-center transition-colors"
  aria-label="Back"
  type="button"
  title="Back"
>
  <i
    className="fa-solid fa-arrow-left text-gray-700 dark:text-gray-200 text-lg lg:text-xl"
    aria-hidden="true"
  />
</button>
          }
        />

        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-gray-400 text-xs lg:text-sm font-semibold mb-0.5">Question</p>
            <p className="font-black leading-none text-indigo-600 text-2xl lg:text-4xl">
              {currentIndex + 1}
              <span className="text-gray-400 font-semibold text-base lg:text-2xl">/{questionsRaw.length}</span>
            </p>
          </div>

          <Timer timeLeft={timeLeft} dashArray={dashArray} dashOffset={dashOffset} />
        </div>

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

        <div className="mt-auto grid gap-3 lg:grid-cols-[1fr_2fr] pt-4">
          <Button
            type="button"
            onClick={onFifty}
            disabled={!canUseHint}
            className={`w-full py-4 lg:py-5 rounded-2xl font-extrabold text-base lg:text-xl tracking-wide  
              ${canUseHint ? "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 " : "bg-gray-100 text-gray-400 "}`}
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
  {currentIndex === questionsRaw.length - 1 ? (
    <>
      <span>Finish</span>
      <i className="fa-solid fa-flag-checkered" aria-hidden="true" />
    </>
  ) : (
    <>
      <span>Next</span>
      <i className="fa-solid fa-arrow-right" aria-hidden="true" />
    </>
  )}
</Button>
        </div>
      </div>
    </div>
  );
};

export default QuizPage;