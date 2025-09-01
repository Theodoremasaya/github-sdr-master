export interface Question {
  id: string;
  category: QuestionCategory;
  difficulty: Difficulty;
  type: QuestionType;
  question: LocalizedString;
  options?: LocalizedString[];
  correctAnswer: number | string;
  explanation: LocalizedString;
  useCase: LocalizedString;
  customerScenario?: LocalizedString;
  points: number;
  tags: string[];
}

export interface LocalizedString {
  en: string;
  ja: string;
}

export type QuestionCategory = 
  | 'collaboration'
  | 'security'
  | 'devops'
  | 'enterprise'
  | 'ai-features'
  | 'pricing'
  | 'migration'
  | 'integration';

export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export type QuestionType = 'multiple-choice' | 'true-false' | 'scenario' | 'drag-drop';

export type StudyMode = 'quick-review' | 'deep-dive' | 'challenge' | 'missed-questions';

export interface UserProgress {
  totalXP: number;
  level: number;
  streak: number;
  longestStreak: number;
  questionsAnswered: number;
  correctAnswers: number;
  accuracy: number;
  categoriesProgress: Record<QuestionCategory, CategoryProgress>;
  badges: Badge[];
  lastStudyDate: string;
}

export interface CategoryProgress {
  questionsAnswered: number;
  correctAnswers: number;
  accuracy: number;
  xpEarned: number;
  mastered: boolean;
}

export interface Badge {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  icon: string;
  unlockedAt: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface QuizSession {
  id: string;
  mode: StudyMode;
  questions: Question[];
  currentQuestionIndex: number;
  answers: (number | string | null)[];
  startTime: number;
  endTime?: number;
  score: number;
  xpEarned: number;
}

export interface MissedQuestion {
  questionId: string;
  incorrectAnswer: number | string;
  missedCount: number;
  lastMissed: string;
  nextReviewDate: string;
}