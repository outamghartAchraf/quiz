import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar';
import QuestionCard from '../components/QuestionCard';
import ScoreBoard from '../components/ScoreBoard';
import Timer from '../components/Timer';
import Loader from '../components/Loader';
import Button from '../components/Button';
import { decodeHTML } from '../utils/quizService';

const QuizPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // الحصول على الأسئلة من الحالة
  const questions = location.state?.questions || [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [hintUsed, setHintUsed] = useState(false);
  const [displayAnswers, setDisplayAnswers] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  // التحقق من وجود أسئلة
  useEffect(() => {
    if (!questions || questions.length === 0) {
      navigate('/', { replace: true });
    } else {
      // تهيئة الأسئلة الأولى
      const shuffled = shuffleAnswers(questions[0]);
      setDisplayAnswers(shuffled);
    }
  }, [questions, navigate]);

  // فك تشفير الأحرف الخاصة
  const decodeHTMLEntity = (html) => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = html;
    return textarea.value;
  };

  // خلط الإجابات
  const shuffleAnswers = (question) => {
    const answers = [
      decodeHTMLEntity(question.correct_answer),
      ...question.incorrect_answers.map(a => decodeHTMLEntity(a))
    ];
    return answers.sort(() => Math.random() - 0.5);
  };

  // خلط أي مصفوفة
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // معالجة اختيار الإجابة
  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);

    const currentQuestion = questions[currentIndex];
    const correctAnswer = decodeHTMLEntity(currentQuestion.correct_answer);
    const isCorrect = answer === correctAnswer;

    if (isCorrect) {
      setScore(prev => prev + 1);
    }

    setAnswers(prev => [...prev, {
      question: decodeHTMLEntity(currentQuestion.question),
      userAnswer: answer,
      correctAnswer: correctAnswer,
      isCorrect
    }]);
  };

  // تلميح 50/50
  const handleHint = () => {
    if (hintUsed) return;

    const currentQuestion = questions[currentIndex];
    const correctAnswer = decodeHTMLEntity(currentQuestion.correct_answer);
    const incorrectAnswers = displayAnswers.filter(
      a => a !== correctAnswer
    );

    if (incorrectAnswers.length > 2) {
      const toRemove = shuffleArray(incorrectAnswers).slice(0, 2);
      const filtered = displayAnswers.filter(a => !toRemove.includes(a));
      setDisplayAnswers(filtered);
    }

    setHintUsed(true);
  };

  // انتهاء الوقت
  const handleTimeUp = () => {
    if (!showFeedback) {
      handleAnswerSelect(null);
    }
  };

  // الانتقال للسؤال التالي
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      const nextQuestion = questions[currentIndex + 1];
      const shuffled = shuffleAnswers(nextQuestion);
      setDisplayAnswers(shuffled);
      setShowFeedback(false);
      setSelectedAnswer(null);
      setHintUsed(false);
    } else {
      // انتقل لصفحة النتائج
      navigate('/results', {
        state: {
          quizData: {
            score,
            totalQuestions: questions.length,
            answers,
            percentage: Math.round((score / questions.length) * 100)
          }
        },
        replace: true
      });
    }
  };

  // حالة التحميل
  if (questions.length === 0) {
    return <Loader message="تحضير الكويز..." />;
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="page quiz-page">
      <div className="quiz-container">
        {/* رأس الكويز */}
        <div className="quiz-header">
          <ProgressBar current={currentIndex + 1} total={questions.length} />
          <ScoreBoard score={score} total={questions.length} />
        </div>

        {/* المؤقت */}
        <div className="quiz-timer">
          <Timer duration={30} onTimeUp={handleTimeUp} />
        </div>

        {/* بطاقة السؤال */}
        <QuestionCard
          question={{
            text: decodeHTMLEntity(currentQuestion.question),
            category: currentQuestion.category,
            difficulty: currentQuestion.difficulty,
            type: currentQuestion.type
          }}
          answers={displayAnswers}
          onAnswerSelect={handleAnswerSelect}
          onHint={handleHint}
          hintUsed={hintUsed}
          showFeedback={showFeedback}
          selectedAnswer={selectedAnswer}
          correctAnswer={decodeHTMLEntity(currentQuestion.correct_answer)}
        />

        {/* زر التالي */}
        {showFeedback && (
          <div className="quiz-footer">
            <Button
              variant="primary"
              onClick={handleNext}
              className="next-btn"
            >
              {currentIndex === questions.length - 1 ? 'انهاء' : 'التالي'} →
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;