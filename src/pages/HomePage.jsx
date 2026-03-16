import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import Loader from '../components/Loader';
import { fetchQuestions } from '../utils/quizService';

const HomePage = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(10);
  const [difficulty, setDifficulty] = useState('');
  const [loading, setLoading] = useState(false);

  const handleStart = async () => {
    if (amount < 1 || amount > 50) {
      alert('اختر عدد أسئلة بين 1 و 50');
      return;
    }

    try {
      setLoading(true);
      
      // جلب الأسئلة من الـ API
      const questions = await fetchQuestions(amount, difficulty);

      if (questions.length === 0) {
        alert('لا توجد أسئلة متاحة بهذه المعايير');
        setLoading(false);
        return;
      }

      // الانتقال إلى صفحة الكويز مع الأسئلة
      navigate('/quiz', {
        state: {
          questions: questions,
          quizConfig: {
            amount,
            difficulty
          }
        }
      });
    } catch (error) {
      alert('خطأ في تحميل الأسئلة: ' + error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader message="جاري تحميل الأسئلة..." />;
  }

  return (
    <div className="page home-page">
      <div className="page-container">
        <div className="home-card">
          <h2>إعدادات الكويز</h2>
          <p className="home-subtitle">اختر عدد الأسئلة ومستوى الصعوبة</p>

          {/* عدد الأسئلة */}
          <div className="form-group">
            <label htmlFor="amount">عدد الأسئلة:</label>
            <input
              id="amount"
              type="number"
              min="1"
              max="50"
              value={amount}
              onChange={(e) => setAmount(parseInt(e.target.value) || 10)}
              className="form-input"
            />
            <small>اختر بين 1 و 50 سؤال</small>
          </div>

          {/* مستوى الصعوبة */}
          <div className="form-group">
            <label htmlFor="difficulty">مستوى الصعوبة:</label>
            <select
              id="difficulty"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="form-select"
            >
              <option value="">جميع المستويات</option>
              <option value="easy">سهل</option>
              <option value="medium">متوسط</option>
              <option value="hard">صعب جداً</option>
            </select>
          </div>

          {/* زر البدء */}
          <Button 
            variant="primary"
            onClick={handleStart}
            className="start-btn"
          >
            🚀 ابدأ الكويز
          </Button>

          {/* معلومات */}
          <div className="home-info">
            <h3>كيف تعمل اللعبة؟</h3>
            <ul>
              <li>✅ أجب على الأسئلة قبل انتهاء الوقت</li>
              <li>⏱️ لديك 30 ثانية لكل سؤال</li>
              <li>💡 استخدم تلميح 50/50 مرة واحدة فقط</li>
              <li>📊 تابع تقدمك في الوقت الفعلي</li>
              <li>🏆 شاهد نتائجك والأسئلة التي أخطأت بها</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;