import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { 
  Trophy, 
  Target, 
  Zap, 
  Calendar,
  BookOpen,
  Award,
  TrendingUp,
  Star
} from 'lucide-react';
import { UserProgress, StudyMode } from '../types/index.ts';

interface DashboardProps {
  progress: UserProgress;
  onStartStudy: (mode: StudyMode) => void;
  currentLanguage: 'en' | 'ja';
}

const Dashboard: React.FC<DashboardProps> = ({ progress, onStartStudy, currentLanguage }) => {
  const { t } = useTranslation();

  const studyModes: { mode: StudyMode; icon: React.ReactNode; color: string; description: string }[] = [
    {
      mode: 'quick-review',
      icon: <Zap className="w-6 h-6" />,
      color: 'from-blue-500 to-cyan-400',
      description: currentLanguage === 'en' ? '5-10 quick questions' : '5-10の簡単な質問'
    },
    {
      mode: 'deep-dive',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'from-purple-500 to-pink-400',
      description: currentLanguage === 'en' ? 'Detailed explanations & scenarios' : '詳細な説明とシナリオ'
    },
    {
      mode: 'challenge',
      icon: <Trophy className="w-6 h-6" />,
      color: 'from-red-500 to-orange-400',
      description: currentLanguage === 'en' ? 'Timed, advanced questions' : 'タイム制限付きの高度な質問'
    },
    {
      mode: 'missed-questions',
      icon: <Target className="w-6 h-6" />,
      color: 'from-green-500 to-emerald-400',
      description: currentLanguage === 'en' ? 'Review your mistakes' : '間違いを復習'
    }
  ];

  const categoryNames = {
    collaboration: t('collaboration'),
    security: t('security'),
    devops: t('devops'),
    enterprise: t('enterprise'),
    'ai-features': t('aiFeatures'),
    pricing: t('pricing'),
    migration: t('migration'),
    integration: t('integration')
  };

  const getXPForNextLevel = () => {
    return (progress.level) * 1000;
  };

  const getCurrentLevelXP = () => {
    return progress.totalXP - ((progress.level - 1) * 1000);
  };

  const getXPNeeded = () => {
    return getXPForNextLevel() - getCurrentLevelXP();
  };

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
          {t('welcomeTitle')}
        </h1>
        <p className="text-xl text-gray-600">
          {t('welcomeSubtitle')}
        </p>
      </motion.div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500">{t('level')}</p>
              <p className="text-3xl font-bold text-blue-600">{progress.level}</p>
            </div>
            <div className="w-16 h-16">
              <CircularProgressbar
                value={(getCurrentLevelXP() / 1000) * 100}
                text={`${progress.level}`}
                styles={buildStyles({
                  textSize: '32px',
                  pathColor: '#3B82F6',
                  textColor: '#3B82F6',
                  trailColor: '#E5E7EB'
                })}
              />
            </div>
          </div>
          <p className="text-xs text-gray-500">
            {getXPNeeded()} XP to next level
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500">{t('streak')}</p>
              <p className="text-3xl font-bold text-orange-600">{progress.streak}</p>
            </div>
            <Calendar className="w-12 h-12 text-orange-600" />
          </div>
          <p className="text-xs text-gray-500">
            Best: {progress.longestStreak} days
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500">{t('accuracy')}</p>
              <p className="text-3xl font-bold text-green-600">{progress.accuracy}%</p>
            </div>
            <TrendingUp className="w-12 h-12 text-green-600" />
          </div>
          <p className="text-xs text-gray-500">
            {progress.correctAnswers}/{progress.questionsAnswered} correct
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl p-6 shadow-lg"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-medium text-gray-500">{t('badges')}</p>
              <p className="text-3xl font-bold text-purple-600">{progress.badges.length}</p>
            </div>
            <Award className="w-12 h-12 text-purple-600" />
          </div>
          <p className="text-xs text-gray-500">
            Achievements unlocked
          </p>
        </motion.div>
      </div>

      {/* Study Modes */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Study Mode</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {studyModes.map((mode, index) => (
            <motion.button
              key={mode.mode}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.02, y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onStartStudy(mode.mode)}
              className={`p-8 rounded-2xl bg-gradient-to-r ${mode.color} text-white shadow-lg hover:shadow-xl transition-all duration-300`}
            >
              <div className="flex items-center gap-4 mb-4">
                {mode.icon}
                <h3 className="text-xl font-bold">{t(mode.mode.replace('-', '') as any)}</h3>
              </div>
              <p className="text-white/90 text-left">{mode.description}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Category Progress */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Category Progress</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {Object.entries(progress.categoriesProgress).map(([category, categoryProgress], index) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              className="bg-white rounded-2xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">{categoryNames[category as keyof typeof categoryNames]}</h3>
                {categoryProgress.mastered && (
                  <Star className="w-5 h-5 text-yellow-500 fill-current" />
                )}
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Accuracy</span>
                  <span className="font-medium">{categoryProgress.accuracy}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${categoryProgress.accuracy}%` }}
                    transition={{ duration: 1, delay: 0.2 * index }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{categoryProgress.questionsAnswered} answered</span>
                  <span>{categoryProgress.xpEarned} XP</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Badges */}
      {progress.badges.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Achievements</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {progress.badges.slice(-3).map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * index }}
                className={`bg-white rounded-2xl p-6 shadow-lg border-2 ${
                  badge.rarity === 'legendary' ? 'border-yellow-300' :
                  badge.rarity === 'epic' ? 'border-purple-300' :
                  badge.rarity === 'rare' ? 'border-blue-300' :
                  'border-gray-200'
                }`}
              >
                <div className="text-center">
                  <div className="text-4xl mb-2">{badge.icon}</div>
                  <h3 className="font-bold text-gray-900">
                    {badge.name[currentLanguage]}
                  </h3>
                  <p className="text-sm text-gray-600 mt-2">
                    {badge.description[currentLanguage]}
                  </p>
                  <div className={`inline-block mt-3 px-2 py-1 rounded-full text-xs font-medium ${
                    badge.rarity === 'legendary' ? 'bg-yellow-100 text-yellow-800' :
                    badge.rarity === 'epic' ? 'bg-purple-100 text-purple-800' :
                    badge.rarity === 'rare' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {badge.rarity}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;