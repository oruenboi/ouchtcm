import { Category, SurveyResponses, CategoryResult } from '../types';
import { getThresholds } from '../data/surveyData';

// Helper function to get the correct score based on whether the question has reversed scoring
const getAdjustedScore = (question: { id: string; text: string; isReversed?: boolean }, responseValue: number): number => {
  if (question.isReversed) {
    // Reverse the score for questions that need reversed scoring (6 - value)
    return 6 - responseValue;
  }
  return responseValue;
};

export const calculateCategoryScore = (
  category: Category,
  responses: SurveyResponses
): CategoryResult => {
  // Calculate raw score by summing all responses for this category
  const questionIds = category.questions.map(q => q.id);
  const rawScore = category.questions.reduce((sum, question) => {
    const responseValue = responses[question.id] || 0;
    // Apply the adjusted score based on whether the question is reversed
    const adjustedScore = getAdjustedScore(question, responseValue);
    return sum + adjustedScore;
  }, 0);

  // Get number of items for normalization formula
  const numItems = category.questions.length;
  
  // Calculate normalized percentage score based on number of items
  let normalizedPercentage = 0;
  
  if (numItems === 6) {
    normalizedPercentage = ((rawScore - 6) / 24) * 100;
  } else if (numItems === 7) {
    normalizedPercentage = ((rawScore - 7) / 28) * 100;
  } else if (numItems === 8) {
    normalizedPercentage = ((rawScore - 8) / 32) * 100;
  }
  
  // Round to 2 decimal places
  normalizedPercentage = Math.round(normalizedPercentage * 100) / 100;
  
  // Determine classification
  let classification: 'Not' | 'Somewhat' | 'For sure';
  
  if (category.id === 'A') {
    classification = normalizedPercentage >= 60 ? 'For sure' : 'Not';
  } else {
    if (normalizedPercentage < 30) {
      classification = 'Not';
    } else if (normalizedPercentage >= 30 && normalizedPercentage <= 40) {
      classification = 'Somewhat';
    } else {
      classification = 'For sure';
    }
  }
  
  // Get specific thresholds for normal/positive indication
  const thresholds = getThresholds(category.id);
  const isNormal = rawScore <= thresholds.normal;
  const isPositive = rawScore >= thresholds.positive;
  
  return {
    categoryId: category.id,
    name: category.name,
    chineseName: category.chineseName,
    rawScore,
    normalizedPercentage,
    classification,
    isNormal,
    isPositive
  };
};

export const calculateSurveyResults = (
  categories: Category[],
  responses: SurveyResponses
) => {
  return categories.map(category => 
    calculateCategoryScore(category, responses)
  );
};