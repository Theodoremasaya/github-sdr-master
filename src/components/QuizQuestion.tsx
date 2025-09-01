import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Question, LocalizedString } from '../types/index.ts';
import { useTranslation } from 'react-i18next';
import { Check, X, Lightbulb, Users, ArrowRight } from 'lucide-react';

interface QuizQuestionProps {
  question: Question;
  onAnswer: (answer: number | string, isCorrect: boolean) => void;
  currentLanguage: 'en' | 'ja';
  questionNumber: number;
  totalQuestions: number;
}

const QuizQuestion: React.FC<QuizQuestionProps> = ({
  question,
  onAnswer,
  currentLanguage,
  questionNumber,
  totalQuestions
}) => {
  const { t } = useTranslation();
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const getLocalizedText = (text: LocalizedString) => text[currentLanguage];

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    
    setSelectedAnswer(answerIndex);
  };

  const submitAnswer = () => {
    if (selectedAnswer === null) return;
    
    const isCorrect = selectedAnswer === question.correctAnswer;
    setShowResult(true);
    onAnswer(selectedAnswer, isCorrect);
  };

  const continueToNext = () => {
    setShowExplanation(false);
    setShowResult(false);
    setSelectedAnswer(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">
            Question {questionNumber} of {totalQuestions}
          </span>
          <span className="text-sm font-medium text-blue-600">
            {question.points} XP
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <motion.div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Question Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg p-8 mb-6"
      >
        <div className="flex items-start gap-4 mb-6">
          <div className="flex-shrink-0">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              question.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
              question.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
            </div>
          </div>
          <div className="flex-shrink-0">
            <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
              {t(question.category)}
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-8">
          {getLocalizedText(question.question)}
        </h2>

        {/* Options */}
        <div className="space-y-4 mb-8">
          {question.options?.map((option, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleAnswerSelect(index)}
              disabled={showResult}
              className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-200 ${
                selectedAnswer === index
                  ? showResult
                    ? index === question.correctAnswer
                      ? 'border-green-500 bg-green-50 text-green-800'
                      : 'border-red-500 bg-red-50 text-red-800'
                    : 'border-blue-500 bg-blue-50 text-blue-800'
                  : showResult && index === question.correctAnswer
                  ? 'border-green-500 bg-green-50 text-green-800'
                  : 'border-gray-200 bg-gray-50 hover:border-gray-300 text-gray-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{getLocalizedText(option)}</span>
                {showResult && (
                  <div className="flex-shrink-0">
                    {index === question.correctAnswer ? (
                      <Check className="w-5 h-5 text-green-600" />
                    ) : selectedAnswer === index ? (
                      <X className="w-5 h-5 text-red-600" />
                    ) : null}
                  </div>
                )}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          {!showResult ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={submitAnswer}
              disabled={selectedAnswer === null}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-200 ${
                selectedAnswer !== null
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {t('submitAnswer')}
            </motion.button>
          ) : (
            <div className="flex gap-4 w-full">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowExplanation(!showExplanation)}
                className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-xl font-semibold hover:bg-purple-700 transition-colors"
              >
                <Lightbulb className="w-5 h-5" />
                {t('viewExplanation')}
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={continueToNext}
                className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-colors ml-auto"
              >
                {t('continue')}
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          )}
        </div>
      </motion.div>

      {/* Result Feedback */}
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`rounded-2xl p-6 mb-6 ${
              selectedAnswer === question.correctAnswer
                ? 'bg-green-50 border-2 border-green-200'
                : 'bg-red-50 border-2 border-red-200'
            }`}
          >
            <div className="flex items-center gap-3 mb-4">
              {selectedAnswer === question.correctAnswer ? (
                <>
                  <Check className="w-8 h-8 text-green-600" />
                  <h3 className="text-xl font-bold text-green-800">{t('correct')}!</h3>
                  <span className="text-green-600 font-semibold">+{question.points} XP</span>
                </>
              ) : (
                <>
                  <X className="w-8 h-8 text-red-600" />
                  <h3 className="text-xl font-bold text-red-800">{t('incorrect')}</h3>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Explanation Panel */}
      <AnimatePresence>
        {showExplanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-2xl shadow-lg p-8 space-y-6"
          >
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="w-5 h-5 text-purple-600" />
                <h3 className="text-lg font-bold text-gray-900">{t('explanation')}</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {getLocalizedText(question.explanation)}
              </p>
            </div>

            <div>
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-bold text-gray-900">{t('useCase')}</h3>
              </div>
              <p className="text-gray-700 leading-relaxed">
                {getLocalizedText(question.useCase)}
              </p>
            </div>

            {question.customerScenario && (
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <Users className="w-5 h-5 text-green-600" />
                  <h3 className="text-lg font-bold text-gray-900">{t('customerScenario')}</h3>
                </div>
                <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-xl">
                  <p className="text-green-800 leading-relaxed">
                    {getLocalizedText(question.customerScenario)}
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QuizQuestion;