import { useState, useEffect } from 'react';
import { UserProgress, QuestionCategory, Badge } from '../types/index.ts';
import { badges } from '../data/questions.ts';

const INITIAL_PROGRESS: UserProgress = {
  totalXP: 0,
  level: 1,
  streak: 0,
  longestStreak: 0,
  questionsAnswered: 0,
  correctAnswers: 0,
  accuracy: 0,
  categoriesProgress: {
    collaboration: { questionsAnswered: 0, correctAnswers: 0, accuracy: 0, xpEarned: 0, mastered: false },
    security: { questionsAnswered: 0, correctAnswers: 0, accuracy: 0, xpEarned: 0, mastered: false },
    devops: { questionsAnswered: 0, correctAnswers: 0, accuracy: 0, xpEarned: 0, mastered: false },
    enterprise: { questionsAnswered: 0, correctAnswers: 0, accuracy: 0, xpEarned: 0, mastered: false },
    'ai-features': { questionsAnswered: 0, correctAnswers: 0, accuracy: 0, xpEarned: 0, mastered: false },
    pricing: { questionsAnswered: 0, correctAnswers: 0, accuracy: 0, xpEarned: 0, mastered: false },
    migration: { questionsAnswered: 0, correctAnswers: 0, accuracy: 0, xpEarned: 0, mastered: false },
    integration: { questionsAnswered: 0, correctAnswers: 0, accuracy: 0, xpEarned: 0, mastered: false }
  },
  badges: [],
  lastStudyDate: ''
};

export const useProgress = () => {
  const [progress, setProgress] = useState<UserProgress>(INITIAL_PROGRESS);
  const [newBadges, setNewBadges] = useState<Badge[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('github-sdr-progress');
    if (saved) {
      setProgress(JSON.parse(saved));
    }
  }, []);

  const saveProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    localStorage.setItem('github-sdr-progress', JSON.stringify(newProgress));
  };

  const addXP = (points: number, category: QuestionCategory, isCorrect: boolean) => {
    const newProgress = { ...progress };
    
    // Update overall stats
    newProgress.questionsAnswered += 1;
    if (isCorrect) {
      newProgress.correctAnswers += 1;
      newProgress.totalXP += points;
    }
    newProgress.accuracy = Math.round((newProgress.correctAnswers / newProgress.questionsAnswered) * 100);
    
    // Update category stats
    const categoryProgress = newProgress.categoriesProgress[category];
    categoryProgress.questionsAnswered += 1;
    if (isCorrect) {
      categoryProgress.correctAnswers += 1;
      categoryProgress.xpEarned += points;
    }
    categoryProgress.accuracy = Math.round((categoryProgress.correctAnswers / categoryProgress.questionsAnswered) * 100);
    categoryProgress.mastered = categoryProgress.accuracy >= 90 && categoryProgress.questionsAnswered >= 5;
    
    // Calculate new level
    const newLevel = Math.floor(newProgress.totalXP / 1000) + 1;
    const leveledUp = newLevel > newProgress.level;
    newProgress.level = newLevel;
    
    // Update streak
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();
    
    if (newProgress.lastStudyDate === yesterday) {
      newProgress.streak += 1;
    } else if (newProgress.lastStudyDate !== today) {
      newProgress.streak = 1;
    }
    
    newProgress.longestStreak = Math.max(newProgress.longestStreak, newProgress.streak);
    newProgress.lastStudyDate = today;
    
    // Check for new badges
    const earnedBadges = checkBadges(newProgress);
    newProgress.badges = [...newProgress.badges, ...earnedBadges];
    setNewBadges(earnedBadges);
    
    saveProgress(newProgress);
    return { leveledUp, earnedBadges };
  };

  const checkBadges = (userProgress: UserProgress): Badge[] => {
    const newBadges: Badge[] = [];
    const currentBadgeIds = userProgress.badges.map(b => b.id);
    
    // First Steps badge
    if (!currentBadgeIds.includes('first-steps') && userProgress.correctAnswers >= 1) {
      const badge = badges.find(b => b.id === 'first-steps');
      if (badge) {
        newBadges.push({
          ...badge,
          unlockedAt: new Date().toISOString()
        });
      }
    }
    
    // Streak Master badge
    if (!currentBadgeIds.includes('streak-master') && userProgress.streak >= 7) {
      const badge = badges.find(b => b.id === 'streak-master');
      if (badge) {
        newBadges.push({
          ...badge,
          unlockedAt: new Date().toISOString()
        });
      }
    }
    
    // Security Expert badge
    if (!currentBadgeIds.includes('security-expert') && userProgress.categoriesProgress.security.mastered) {
      const badge = badges.find(b => b.id === 'security-expert');
      if (badge) {
        newBadges.push({
          ...badge,
          unlockedAt: new Date().toISOString()
        });
      }
    }
    
    return newBadges;
  };

  const clearNewBadges = () => {
    setNewBadges([]);
  };

  const resetProgress = () => {
    const resetProgress = { ...INITIAL_PROGRESS };
    saveProgress(resetProgress);
  };

  return {
    progress,
    addXP,
    resetProgress,
    newBadges,
    clearNewBadges
  };
};