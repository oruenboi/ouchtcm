import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const { t } = useLanguage();
  const percentage = (current / total) * 100;
  
  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
      <div 
        className="bg-accent h-2.5 rounded-full transition-all duration-300" 
        style={{ width: `${percentage}%` }}
      ></div>
      <div className="flex justify-between mt-2 text-xs text-neutral-dark">
        <span>{Math.round(percentage)}{t('survey.progress')}</span>
        <span>{current} {t('survey.answered')} {total} {t('survey.questions')}</span>
      </div>
    </div>
  );
};

export default ProgressBar;