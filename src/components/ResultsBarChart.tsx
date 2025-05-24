import React from 'react';
import { CategoryResult } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ResultsBarChartProps {
  results: CategoryResult[];
}

const ResultsBarChart: React.FC<ResultsBarChartProps> = ({ results }) => {
  const { t, getCategoryName } = useLanguage();
  const maxValue = 100; // Maximum percentage value
  
  // Sort results by normalized percentage in descending order
  const sortedResults = [...results].sort((a, b) => b.normalizedPercentage - a.normalizedPercentage);
  
  // Define color based on classification
  const getBarColor = (classification: string) => {
    switch (classification) {
      case 'For sure':
        return 'bg-accent';
      case 'Somewhat':
        return 'bg-secondary';
      case 'Not':
      default:
        return 'bg-gray-300';
    }
  };

  // Translate classification
  const getTranslatedClassification = (classification: string) => {
    switch (classification) {
      case 'For sure':
        return t('class.forsure');
      case 'Somewhat':
        return t('class.somewhat');
      case 'Not':
        return t('class.not');
      default:
        return classification;
    }
  };
  
  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold mb-4">{t('results.distribution')}</h3>
      <div className="space-y-5 sm:space-y-4">
        {sortedResults.map((result) => (
          <div key={result.categoryId} className="relative">
            <div className="flex flex-col sm:flex-row sm:items-center mb-1">
              <div className="text-sm font-medium text-neutral-dark mb-1 sm:mb-0 sm:w-60">
                <div>Type {result.categoryId}: {getCategoryName(result.categoryId, result.name)}</div>
                <div className="text-xs text-taupe">{result.chineseName}</div>
              </div>
              <span className="text-sm text-neutral-dark mb-1 sm:mb-0 sm:ml-auto">
                {result.normalizedPercentage.toFixed(1)}%
              </span>
            </div>
            <div className="w-full bg-neutral rounded-full h-4">
              <div
                className={`h-4 rounded-full ${getBarColor(result.classification)}`}
                style={{ width: `${(result.normalizedPercentage / maxValue) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-end mt-1">
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white border border-gray-200">
                {getTranslatedClassification(result.classification)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResultsBarChart;