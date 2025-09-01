import { useState, useEffect } from 'react';
import { MissedQuestion, Question } from '../types/index.ts';

export const useMissedQuestions = () => {
  const [missedQuestions, setMissedQuestions] = useState<MissedQuestion[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('github-sdr-missed-questions');
    if (saved) {
      setMissedQuestions(JSON.parse(saved));
    }
  }, []);

  const saveMissedQuestions = (questions: MissedQuestion[]) => {
    setMissedQuestions(questions);
    localStorage.setItem('github-sdr-missed-questions', JSON.stringify(questions));
  };

  const addMissedQuestion = (questionId: string, incorrectAnswer: number | string) => {
    const existingIndex = missedQuestions.findIndex(mq => mq.questionId === questionId);
    const now = new Date().toISOString();
    
    if (existingIndex >= 0) {
      // Update existing missed question
      const updated = [...missedQuestions];
      updated[existingIndex] = {
        ...updated[existingIndex],
        incorrectAnswer,
        missedCount: updated[existingIndex].missedCount + 1,
        lastMissed: now,
        nextReviewDate: calculateNextReviewDate(updated[existingIndex].missedCount + 1)
      };
      saveMissedQuestions(updated);
    } else {
      // Add new missed question
      const newMissedQuestion: MissedQuestion = {
        questionId,
        incorrectAnswer,
        missedCount: 1,
        lastMissed: now,
        nextReviewDate: calculateNextReviewDate(1)
      };
      saveMissedQuestions([...missedQuestions, newMissedQuestion]);
    }
  };

  const removeMissedQuestion = (questionId: string) => {
    const filtered = missedQuestions.filter(mq => mq.questionId !== questionId);
    saveMissedQuestions(filtered);
  };

  const getQuestionsForReview = () => {
    const now = new Date();
    return missedQuestions.filter(mq => new Date(mq.nextReviewDate) <= now);
  };

  const markAsReviewed = (questionId: string, wasCorrect: boolean) => {
    if (wasCorrect) {
      // Remove from missed questions if answered correctly
      removeMissedQuestion(questionId);
    } else {
      // Update the review schedule if still incorrect
      addMissedQuestion(questionId, ''); // We don't track the specific wrong answer on review
    }
  };

  // Spaced repetition algorithm: 1 day, 3 days, 7 days, 14 days, 30 days
  const calculateNextReviewDate = (missedCount: number): string => {
    const intervals = [1, 3, 7, 14, 30]; // days
    const intervalIndex = Math.min(missedCount - 1, intervals.length - 1);
    const interval = intervals[intervalIndex];
    
    const nextReview = new Date();
    nextReview.setDate(nextReview.getDate() + interval);
    return nextReview.toISOString();
  };

  const getMissedQuestionsStats = () => {
    const totalMissed = missedQuestions.length;
    const dueForReview = getQuestionsForReview().length;
    const averageMissedCount = totalMissed > 0 
      ? missedQuestions.reduce((sum, mq) => sum + mq.missedCount, 0) / totalMissed 
      : 0;

    return {
      totalMissed,
      dueForReview,
      averageMissedCount: Math.round(averageMissedCount * 10) / 10
    };
  };

  return {
    missedQuestions,
    addMissedQuestion,
    removeMissedQuestion,
    getQuestionsForReview,
    markAsReviewed,
    getMissedQuestionsStats
  };
};