import React from 'react';
import { Category } from '../types';
import QuestionItem from './QuestionItem';
import { useLanguage } from '../context/LanguageContext';

interface CategorySectionProps {
  category: Category;
  responses: { [key: string]: number };
  onResponseChange: (questionId: string, value: number) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({ 
  category, 
  responses, 
  onResponseChange 
}) => {
  const { getCategoryName, getCategoryDescription } = useLanguage();

  // Get translated category name and description
  const translatedName = getCategoryName(category.id, category.name);
  const translatedDescription = getCategoryDescription(category.id, category.description);

  return (
    <div className="mb-10">
      <div className="bg-neutral p-4 rounded-lg mb-5">
        <h3 className="text-xl font-bold text-primary">
          Type {category.id}: {translatedName}
        </h3>
        <p className="text-sm text-taupe mt-1">{category.chineseName}</p>
        <p className="text-neutral-dark mt-1">{translatedDescription}</p>
      </div>
      
      <div className="space-y-4">
        {category.questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            value={responses[question.id] || 0}
            onChange={onResponseChange}
          />
        ))}
      </div>
    </div>
  );
};

export default CategorySection;