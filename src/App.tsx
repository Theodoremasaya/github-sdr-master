import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Confetti from 'react-confetti';
import Dashboard from './components/Dashboard.tsx';
import QuizQuestion from './components/QuizQuestion.tsx';
import StudyModeSelector from './components/StudyModeSelector.tsx';
import LanguageSelector from './components/LanguageSelector.tsx';
import { useProgress } from './hooks/useProgress.ts';
import { useMissedQuestions } from './hooks/useMissedQuestions.ts';
import { questions } from './data/questions.ts';
import { Question, StudyMode, QuestionCategory, Difficulty, QuizSession, Badge } from './types/index.ts';
import { Trophy, Star, Award, Home, Book, BarChart3, Settings } from 'lucide-react';
import './utils/i18n.ts';

type View = 'dashboard' | 'study-selector' | 'quiz' | 'results';

function App() {
  const { i18n } = useTranslation();
  const [currentView, setCurrentView] = useState<View>('dashboard');
  const [currentSession, setCurrentSession] = useState<QuizSession | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationMessage, setCelebrationMessage] = useState('');
  const [newBadgeToShow, setNewBadgeToShow] = useState<Badge | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'ja'>('en');

  const { progress, addXP, newBadges, clearNewBadges } = useProgress();
  const { addMissedQuestion, getQuestionsForReview, getMissedQuestionsStats } = useMissedQuestions();

  const navigation = [
    { key: 'dashboard' as View, icon: <Home className="w-5 h-5" />, label: 'Dashboard' },
    { key: 'study-selector' as View, icon: <Book className="w-5 h-5" />, label: 'Study' },
  ];

  useEffect(() => {
    i18n.changeLanguage(currentLanguage);
  }, [currentLanguage, i18n]);

  useEffect(() => {
    if (newBadges.length > 0) {
      setNewBadgeToShow(newBadges[0]);
      setShowCelebration(true);
      setCelebrationMessage('New Badge Unlocked!');
    }
  }, [newBadges]);

  const startStudy = (mode: StudyMode, category?: QuestionCategory, difficulty?: Difficulty) => {
    let selectedQuestions: Question[] = [];

    if (mode === 'missed-questions') {
      const missedQuestionIds = getQuestionsForReview().map(mq => mq.questionId);
      selectedQuestions = questions.filter(q => missedQuestionIds.includes(q.id));
    } else {
      selectedQuestions = questions.filter(q => {
        let matches = true;
        if (category) matches = matches && q.category === category;
        if (difficulty) matches = matches && q.difficulty === difficulty;
        if (mode === 'challenge') matches = matches && q.difficulty === 'advanced';
        return matches;
      });
    }

    // Shuffle questions
    selectedQuestions = selectedQuestions.sort(() => Math.random() - 0.5);

    // Limit questions based on mode
    const questionLimit = mode === 'quick-review' ? 5 : mode === 'deep-dive' ? 10 : selectedQuestions.length;
    selectedQuestions = selectedQuestions.slice(0, questionLimit);

    if (selectedQuestions.length === 0) {
      alert('No questions available for this selection');
      return;
    }

    const session: QuizSession = {
      id: Date.now().toString(),
      mode,
      questions: selectedQuestions,
      currentQuestionIndex: 0,
      answers: new Array(selectedQuestions.length).fill(null),
      startTime: Date.now(),
      score: 0,
      xpEarned: 0
    };

    setCurrentSession(session);
    setCurrentQuestionIndex(0);
    setCurrentView('quiz');
  };

  const handleAnswer = (answer: number | string, isCorrect: boolean) => {
    if (!currentSession) return;

    const updatedSession = { ...currentSession };
    updatedSession.answers[currentQuestionIndex] = answer;

    const currentQuestion = currentSession.questions[currentQuestionIndex];
    
    if (isCorrect) {
      updatedSession.score += currentQuestion.points;
      updatedSession.xpEarned += currentQuestion.points;
    } else {
      addMissedQuestion(currentQuestion.id, answer);
    }

    const { leveledUp } = addXP(currentQuestion.points, currentQuestion.category, isCorrect);

    if (leveledUp) {
      setShowCelebration(true);
      setCelebrationMessage('Level Up!');
    }

    setCurrentSession(updatedSession);

    // Move to next question after a delay
    setTimeout(() => {
      if (currentQuestionIndex < currentSession.questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        // Quiz completed
        updatedSession.endTime = Date.now();
        setCurrentSession(updatedSession);
        setCurrentView('results');
      }
    }, 2000);
  };

  const handleLanguageChange = (language: 'en' | 'ja') => {
    setCurrentLanguage(language);
  };

  const closeCelebration = () => {
    setShowCelebration(false);
    if (newBadgeToShow) {
      setNewBadgeToShow(null);
      clearNewBadges();
    }
  };

  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return (
          <Dashboard
            progress={progress}
            onStartStudy={(mode) => {
              if (mode === 'missed-questions' && getMissedQuestionsStats().dueForReview === 0) {
                alert(currentLanguage === 'en' ? 'No questions to review right now!' : '現在レビューする質問はありません！');
                return;
              }
              setCurrentView('study-selector');
            }}
            currentLanguage={currentLanguage}
          />
        );

      case 'study-selector':
        return (
          <StudyModeSelector
            onStartStudy={startStudy}
            missedQuestionsCount={getMissedQuestionsStats().dueForReview}
            currentLanguage={currentLanguage}
          />
        );

      case 'quiz':
        if (!currentSession) return null;
        return (
          <QuizQuestion
            question={currentSession.questions[currentQuestionIndex]}
            onAnswer={handleAnswer}
            currentLanguage={currentLanguage}
            questionNumber={currentQuestionIndex + 1}
            totalQuestions={currentSession.questions.length}
          />
        );

      case 'results':
        if (!currentSession) return null;
        const accuracy = Math.round((currentSession.score / (currentSession.questions.length * 150)) * 100);
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-4xl mx-auto p-6"
          >
            <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
              <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Quiz Complete!</h1>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="text-3xl font-bold text-blue-600">{currentSession.score}</div>
                  <div className="text-blue-600">XP Earned</div>
                </div>
                <div className="bg-green-50 rounded-xl p-4">
                  <div className="text-3xl font-bold text-green-600">{accuracy}%</div>
                  <div className="text-green-600">Accuracy</div>
                </div>
                <div className="bg-purple-50 rounded-xl p-4">
                  <div className="text-3xl font-bold text-purple-600">{progress.level}</div>
                  <div className="text-purple-600">Current Level</div>
                </div>
              </div>
              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentView('study-selector')}
                  className="px-8 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors mr-4"
                >
                  Study More
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setCurrentView('dashboard')}
                  className="px-8 py-3 bg-gray-600 text-white rounded-xl font-semibold hover:bg-gray-700 transition-colors"
                >
                  Back to Dashboard
                </motion.button>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                GitHub SDR Master
              </h1>
              <nav className="flex gap-4">
                {navigation.map(item => (
                  <motion.button
                    key={item.key}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentView(item.key)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                      currentView === item.key
                        ? 'bg-blue-100 text-blue-600'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {item.icon}
                    {item.label}
                  </motion.button>
                ))}
              </nav>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-sm text-gray-600">
                Level {progress.level} • {progress.totalXP} XP
              </div>
              <LanguageSelector
                currentLanguage={currentLanguage}
                onLanguageChange={handleLanguageChange}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8">
        <AnimatePresence mode="wait">
          {renderView()}
        </AnimatePresence>
      </main>

      {/* Celebration Overlay */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            onClick={closeCelebration}
          >
            <Confetti
              width={window.innerWidth}
              height={window.innerHeight}
              recycle={false}
              numberOfPieces={200}
            />
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              className="bg-white rounded-2xl p-8 text-center max-w-md mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              {newBadgeToShow ? (
                <>
                  <Award className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {newBadgeToShow.name[currentLanguage]}
                  </h2>
                  <p className="text-gray-600 mb-4">
                    {newBadgeToShow.description[currentLanguage]}
                  </p>
                  <div className="text-4xl mb-4">{newBadgeToShow.icon}</div>
                  <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                    newBadgeToShow.rarity === 'legendary' ? 'bg-yellow-100 text-yellow-800' :
                    newBadgeToShow.rarity === 'epic' ? 'bg-purple-100 text-purple-800' :
                    newBadgeToShow.rarity === 'rare' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {newBadgeToShow.rarity}
                  </div>
                </>
              ) : (
                <>
                  <Star className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{celebrationMessage}</h2>
                </>
              )}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={closeCelebration}
                className="mt-6 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Continue
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;