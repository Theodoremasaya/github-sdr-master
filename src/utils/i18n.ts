import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      // Navigation
      dashboard: 'Dashboard',
      study: 'Study',
      progress: 'Progress',
      settings: 'Settings',
      
      // Study Modes
      quickReview: 'Quick Review',
      deepDive: 'Deep Dive',
      challengeMode: 'Challenge Mode',
      missedQuestions: 'Review Mistakes',
      
      // Categories
      collaboration: 'Collaboration',
      security: 'Security',
      devops: 'DevOps',
      enterprise: 'Enterprise',
      aiFeatures: 'AI Features',
      pricing: 'Pricing',
      migration: 'Migration',
      integration: 'Integration',
      
      // UI Elements
      startQuiz: 'Start Quiz',
      nextQuestion: 'Next Question',
      submitAnswer: 'Submit Answer',
      viewExplanation: 'View Explanation',
      continue: 'Continue',
      finish: 'Finish',
      retry: 'Retry',
      
      // Progress
      level: 'Level',
      xp: 'XP',
      streak: 'Day Streak',
      accuracy: 'Accuracy',
      questionsAnswered: 'Questions Answered',
      badges: 'Badges',
      
      // Results
      correct: 'Correct!',
      incorrect: 'Incorrect',
      explanation: 'Explanation',
      useCase: 'Use Case',
      customerScenario: 'Customer Scenario',
      
      // Settings
      language: 'Language',
      difficulty: 'Difficulty',
      notifications: 'Notifications',
      
      // Gamification
      congratulations: 'Congratulations!',
      newBadgeUnlocked: 'New Badge Unlocked!',
      levelUp: 'Level Up!',
      perfectScore: 'Perfect Score!',
      
      // Welcome
      welcomeTitle: 'Master GitHub & Become the Best SDR',
      welcomeSubtitle: 'Interactive learning with gamification to help you excel in your role',
      getStarted: 'Get Started'
    }
  },
  ja: {
    translation: {
      // Navigation
      dashboard: 'ダッシュボード',
      study: '学習',
      progress: '進捗',
      settings: '設定',
      
      // Study Modes
      quickReview: 'クイックレビュー',
      deepDive: 'ディープダイブ',
      challengeMode: 'チャレンジモード',
      missedQuestions: '間違いの復習',
      
      // Categories
      collaboration: 'コラボレーション',
      security: 'セキュリティ',
      devops: 'DevOps',
      enterprise: 'エンタープライズ',
      aiFeatures: 'AI機能',
      pricing: '価格設定',
      migration: '移行',
      integration: '統合',
      
      // UI Elements
      startQuiz: 'クイズ開始',
      nextQuestion: '次の質問',
      submitAnswer: '回答を送信',
      viewExplanation: '解説を見る',
      continue: '続行',
      finish: '完了',
      retry: '再挑戦',
      
      // Progress
      level: 'レベル',
      xp: 'XP',
      streak: '日連続',
      accuracy: '正解率',
      questionsAnswered: '回答済み質問',
      badges: 'バッジ',
      
      // Results
      correct: '正解！',
      incorrect: '不正解',
      explanation: '解説',
      useCase: 'ユースケース',
      customerScenario: 'カスタマーシナリオ',
      
      // Settings
      language: '言語',
      difficulty: '難易度',
      notifications: '通知',
      
      // Gamification
      congratulations: 'おめでとうございます！',
      newBadgeUnlocked: '新しいバッジを獲得！',
      levelUp: 'レベルアップ！',
      perfectScore: '満点！',
      
      // Welcome
      welcomeTitle: 'GitHubをマスターし、最高のSDRになろう',
      welcomeSubtitle: 'ゲーミフィケーションを活用したインタラクティブ学習で、あなたの役割で優れた成果を上げましょう',
      getStarted: '始める'
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;