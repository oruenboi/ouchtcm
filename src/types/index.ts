export type ConstitutionType = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I';

export interface Question {
  id: string;
  text: string;
  isReversed?: boolean;
}

export interface Category {
  id: ConstitutionType;
  name: string;
  chineseName: string;
  description: string;
  questions: Question[];
}

export type LikertResponse = 1 | 2 | 3 | 4 | 5;

export interface SurveyResponses {
  [questionId: string]: LikertResponse;
}

export interface CategoryResult {
  categoryId: ConstitutionType;
  name: string;
  chineseName: string;
  rawScore: number;
  normalizedPercentage: number;
  classification: 'Not' | 'Somewhat' | 'For sure';
  isNormal: boolean;
  isPositive: boolean;
}

export interface SurveyResult {
  categories: CategoryResult[];
  date: string;
  userName?: string;
}