import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { StudyMode, QuestionCategory, Difficulty } from '../types/index.ts';
import { 
  Zap, 
  BookOpen, 
  Trophy, 
  Target,
  Users,
  Shield,
  GitBranch,
  Building,
  Bot,
  DollarSign,
  ArrowRightLeft,
  Puzzle
} from 'lucide-react';

interface StudyModeSelectorProps {
  onStartStudy: (mode: StudyMode, category?: QuestionCategory, difficulty?: Difficulty) => void;
  missedQuestionsCount: number;
  currentLanguage: 'en' | 'ja';
}

const StudyModeSelector: React.FC<StudyModeSelectorProps> = ({ 
  onStartStudy, 
  missedQuestionsCount,
  currentLanguage 
}) => {
  const { t } = useTranslation();

  const studyModes = [
    {
      mode: 'quick-review' as StudyMode,
      title: t('quickReview'),
      description: currentLanguage === 'en' 
        ? '5-10 rapid-fire questions to test your knowledge' 
        : '知識をテストする5-10の早撃ち問題',
      icon: <Zap className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-400',
      duration: '5 min'
    },
    {
      mode: 'deep-dive' as StudyMode,
      title: t('deepDive'),
      description: currentLanguage === 'en'
        ? 'In-depth explanations with customer scenarios'
        : 'カスタマーシナリオ付きの詳細な解説',
      icon: <BookOpen className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-400',
      duration: '15 min'
    },
    {
      mode: 'challenge' as StudyMode,
      title: t('challengeMode'),
      description: currentLanguage === 'en'
        ? 'Timed advanced questions for experts'
        : 'エキスパート向けのタイム制限付き高度な問題',
      icon: <Trophy className="w-8 h-8" />,
      color: 'from-red-500 to-orange-400',
      duration: '20 min'
    },
    {
      mode: 'missed-questions' as StudyMode,
      title: t('missedQuestions'),
      description: currentLanguage === 'en'
        ? 'Review questions you got wrong using spaced repetition'
        : '間隔反復を使用して間違えた問題を復習',
      icon: <Target className="w-8 h-8" />,
      color: 'from-green-500 to-emerald-400',
      duration: `${missedQuestionsCount} questions`,
      disabled: missedQuestionsCount === 0
    }
  ];

  const categories = [
    {
      key: 'collaboration' as QuestionCategory,
      name: t('collaboration'),
      icon: <Users className="w-6 h-6" />,
      color: 'bg-blue-100 text-blue-600',
      description: currentLanguage === 'en' 
        ? 'Pull requests, code reviews, team workflows'
        : 'プルリクエスト、コードレビュー、チームワークフロー'
    },
    {
      key: 'security' as QuestionCategory,
      name: t('security'),
      icon: <Shield className="w-6 h-6" />,
      color: 'bg-red-100 text-red-600',
      description: currentLanguage === 'en'
        ? 'Advanced Security, secret scanning, vulnerability detection'
        : 'アドバンスセキュリティ、シークレットスキャン、脆弱性検出'
    },
    {
      key: 'devops' as QuestionCategory,
      name: t('devops'),
      icon: <GitBranch className="w-6 h-6" />,
      color: 'bg-green-100 text-green-600',
      description: currentLanguage === 'en'
        ? 'GitHub Actions, CI/CD, automation, packages'
        : 'GitHub Actions、CI/CD、自動化、パッケージ'
    },
    {
      key: 'enterprise' as QuestionCategory,
      name: t('enterprise'),
      icon: <Building className="w-6 h-6" />,
      color: 'bg-purple-100 text-purple-600',
      description: currentLanguage === 'en'
        ? 'SAML, SCIM, compliance, audit logs'
        : 'SAML、SCIM、コンプライアンス、監査ログ'
    },
    {
      key: 'ai-features' as QuestionCategory,
      name: t('aiFeatures'),
      icon: <Bot className="w-6 h-6" />,
      color: 'bg-indigo-100 text-indigo-600',
      description: currentLanguage === 'en'
        ? 'Copilot, AI-powered features, code suggestions'
        : 'Copilot、AI機能、コード提案'
    },
    {
      key: 'pricing' as QuestionCategory,
      name: t('pricing'),
      icon: <DollarSign className="w-6 h-6" />,
      color: 'bg-yellow-100 text-yellow-600',
      description: currentLanguage === 'en'
        ? 'Plans, features comparison, ROI calculations'
        : 'プラン、機能比較、ROI計算'
    },
    {
      key: 'migration' as QuestionCategory,
      name: t('migration'),
      icon: <ArrowRightLeft className="w-6 h-6" />,
      color: 'bg-orange-100 text-orange-600',
      description: currentLanguage === 'en'
        ? 'Moving from other platforms, data migration'
        : '他プラットフォームからの移行、データ移行'
    },
    {
      key: 'integration' as QuestionCategory,
      name: t('integration'),
      icon: <Puzzle className="w-6 h-6" />,
      color: 'bg-teal-100 text-teal-600',
      description: currentLanguage === 'en'
        ? 'APIs, webhooks, third-party integrations'
        : 'API、Webhook、サードパーティ統合'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          {currentLanguage === 'en' ? 'Choose Your Learning Path' : 'ラーニングパスを選択'}
        </h1>
        <p className="text-lg text-gray-600">
          {currentLanguage === 'en' 
            ? 'Select a study mode and category to begin mastering GitHub'
            : '学習モードとカテゴリを選択してGitHubをマスターしましょう'
          }
        </p>
      </div>

      {/* Study Modes */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Study Modes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {studyModes.map((mode, index) => (
            <motion.button
              key={mode.mode}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => !mode.disabled && onStartStudy(mode.mode)}
              disabled={mode.disabled}
              className={`relative p-6 rounded-2xl bg-gradient-to-r ${mode.color} text-white shadow-lg hover:shadow-xl transition-all duration-300 ${
                mode.disabled ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105'
              }`}
            >
              <div className="flex flex-col items-center text-center space-y-4">
                {mode.icon}
                <h3 className="text-lg font-bold">{mode.title}</h3>
                <p className="text-sm text-white/90">{mode.description}</p>
                <div className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-medium">
                  {mode.duration}
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {currentLanguage === 'en' ? 'Study by Category' : 'カテゴリ別学習'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.button
              key={category.key}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onStartStudy('quick-review', category.key)}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-left"
            >
              <div className="flex items-start gap-4">
                <div className={`flex-shrink-0 p-3 rounded-xl ${category.color}`}>
                  {category.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-gray-900 mb-2">{category.name}</h3>
                  <p className="text-sm text-gray-600">{category.description}</p>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl font-bold mb-2">
              {currentLanguage === 'en' ? 'Ready for a Challenge?' : 'チャレンジの準備はできましたか？'}
            </h2>
            <p className="text-white/90">
              {currentLanguage === 'en' 
                ? 'Test your knowledge with our most difficult questions'
                : '最も難しい問題で知識をテストしましょう'
              }
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onStartStudy('challenge')}
            className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {currentLanguage === 'en' ? 'Start Challenge' : 'チャレンジ開始'}
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default StudyModeSelector;