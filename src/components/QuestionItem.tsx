import React from 'react';
import { Question } from '../types';
import { likertOptions } from '../data/surveyData';
import { useLanguage } from '../context/LanguageContext';

interface QuestionItemProps {
  question: Question;
  value: number;
  onChange: (questionId: string, value: number) => void;
}

const QuestionItem: React.FC<QuestionItemProps> = ({ question, value, onChange }) => {
  const { t, getQuestionText } = useLanguage();
  
  // Handle gender-specific questions
  const gender = localStorage.getItem('gender');
  
  // Skip rendering gender-specific questions that don't apply to the user
  if (
    (question.text.includes('(female only)') && gender === 'male') ||
    (question.text.includes('(male only)') && gender === 'female')
  ) {
    return null;
  }

  // Translate the options
  const translatedOptions = [
    { value: 1, label: t('option.never') },
    { value: 2, label: t('option.seldom') },
    { value: 3, label: t('option.sometimes') },
    { value: 4, label: t('option.often') },
    { value: 5, label: t('option.always') }
  ];

  // Get the translated question text
  const translatedQuestionText = getQuestionText(question.id);

  return (
    <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
      <p className="text-neutral-dark font-medium mb-3">
        {translatedQuestionText}
        {question.isReversed && <span className="text-xs text-secondary ml-1">{t('reversed.label')}</span>}
      </p>
      
      <div className="flex flex-wrap justify-between">
        {translatedOptions.map((option) => (
          <div 
            key={option.value}
            className="flex items-center space-x-2 mb-2 sm:mb-0"
          >
            <input
              type="radio"
              id={`${question.id}-${option.value}`}
              name={question.id}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(question.id, option.value)}
              className="w-4 h-4 text-accent focus:ring-accent"
            />
            <label 
              htmlFor={`${question.id}-${option.value}`}
              className="text-sm text-neutral-dark"
            >
              {option.label}
              {question.isReversed && (
                <span className="text-xs text-secondary ml-1">
                  ({6 - option.value} pts)
                </span>
              )}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionItem;