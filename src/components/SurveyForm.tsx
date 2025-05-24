import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { categories } from '../data/surveyData';
import { SurveyResponses } from '../types';
import CategorySection from './CategorySection';
import ProgressBar from './ProgressBar';
import { calculateSurveyResults } from '../utils/calculations';
import { ArrowLeft, ArrowRight, Save } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import LanguageToggle from './LanguageToggle';

const SurveyForm: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState(0);
  const [responses, setResponses] = useState<SurveyResponses>({});
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  const [userName, setUserName] = useState<string>('');

  // Count only questions that apply to the user's gender
  const totalQuestions = categories.reduce((sum, cat) => {
    return sum + cat.questions.filter(q => {
      const questionText = q.text;
      return !(
        (questionText.includes('(female only)') && localStorage.getItem('gender') === 'male') ||
        (questionText.includes('(male only)') && localStorage.getItem('gender') === 'female')
      );
    }).length;
  }, 0);
  
  // Initialize gender-specific questions and load user name on mount
  useEffect(() => {
    const gender = localStorage.getItem('gender');
    const storedName = localStorage.getItem('userName');
    
    if (storedName) {
      setUserName(storedName);
    }
    
    if (gender) {
      const newResponses = { ...responses };
      let updated = false;
      
      categories.forEach(category => {
        category.questions.forEach(question => {
          if (
            (question.text.includes('(female only)') && gender === 'male') ||
            (question.text.includes('(male only)') && gender === 'female')
          ) {
            if (responses[question.id] === undefined) {
              newResponses[question.id] = 1; // Set "Never" for non-applicable questions
              updated = true;
            }
          }
        });
      });
      
      if (updated) {
        setResponses(newResponses);
      }
    }
  }, []); // Run once on mount
  
  // Handle response changes
  const handleResponseChange = (questionId: string, value: number) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };
  
  // Track progress
  useEffect(() => {
    const answered = Object.keys(responses).length;
    setAnsweredQuestions(answered);
  }, [responses]);
  
  // Get unanswered questions for the current category
  const getUnansweredQuestionsForCategory = (categoryIndex: number) => {
    const category = categories[categoryIndex];
    
    // Get applicable questions for this user's gender
    const applicableQuestions = category.questions.filter(q => {
      const questionText = q.text;
      return !(
        (questionText.includes('(female only)') && localStorage.getItem('gender') === 'male') ||
        (questionText.includes('(male only)') && localStorage.getItem('gender') === 'female')
      );
    });
    
    // Filter for unanswered questions by explicitly checking for undefined
    return applicableQuestions
      .filter(q => responses[q.id] === undefined)
      .map(q => q.id);
  };
  
  // Navigate between categories
  const handleNext = () => {
    const unansweredQuestions = getUnansweredQuestionsForCategory(activeCategory);
    
    if (unansweredQuestions.length > 0) {
      alert(`Please answer all questions on this page. You have ${unansweredQuestions.length} unanswered question(s).`);
      return;
    }
    
    if (activeCategory < categories.length - 1) {
      setActiveCategory(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handlePrevious = () => {
    if (activeCategory > 0) {
      setActiveCategory(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if current page has all questions answered
    const unansweredCurrentQuestions = getUnansweredQuestionsForCategory(activeCategory);
    
    if (unansweredCurrentQuestions.length > 0) {
      alert(`Please answer all questions on this page. You have ${unansweredCurrentQuestions.length} unanswered question(s).`);
      return;
    }
    
    // Check if all categories have all questions answered
    let allAnswered = true;
    let totalUnanswered = 0;
    
    for (let i = 0; i < categories.length; i++) {
      const unansweredQuestions = getUnansweredQuestionsForCategory(i);
      if (unansweredQuestions.length > 0) {
        allAnswered = false;
        totalUnanswered += unansweredQuestions.length;
      }
    }
    
    if (!allAnswered) {
      alert(`Please go back and answer all questions. You have ${totalUnanswered} unanswered question(s) across all categories.`);
      return;
    }
    
    // Calculate results
    const results = calculateSurveyResults(categories, responses);
    
    // Store results in localStorage
    localStorage.setItem('surveyResults', JSON.stringify({
      categories: results,
      date: new Date().toISOString(),
      userName: userName
    }));
    
    // Navigate to results page
    navigate('/results');
  };
  
  return (
    <div className="min-h-screen bg-neutral py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end mb-4">
          <LanguageToggle />
        </div>

        <div className="text-center mb-10">
          <div className="flex justify-center mb-4">
            <a href="https://ouch.com.sg/" target="_blank" rel="noopener noreferrer">
              <img 
                src="https://ouch.com.sg/wp-content/uploads/2022/05/ouch-logo-120x87.png" 
                alt="Ouch Logo" 
                className="h-12"
              />
            </a>
          </div>
          <h1 className="text-3xl font-bold text-primary">
            {t('survey.title')}
          </h1>
          {userName && (
            <p className="mt-2 text-lg text-neutral-dark">
              {t('results.name')} {userName}
            </p>
          )}
          <p className="mt-2 text-neutral-dark">
            {t('survey.instructions')}
          </p>
        </div>
        
        <ProgressBar current={answeredQuestions} total={totalQuestions} />
        
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between mb-4">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={activeCategory === 0}
                className={`flex items-center px-4 py-2 text-sm rounded ${
                  activeCategory === 0 
                    ? 'text-gray-400 bg-gray-100 cursor-not-allowed' 
                    : 'text-gray-700 bg-gray-200 hover:bg-gray-300'
                }`}
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                {t('survey.prev')}
              </button>
              
              <div className="text-sm font-medium text-gray-500">
                {t('survey.category')} {activeCategory + 1} {t('survey.of')} {categories.length}
              </div>
              
              {activeCategory < categories.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 bg-gray-200 hover:bg-gray-300 rounded"
                >
                  {t('survey.next')}
                  <ArrowRight className="h-4 w-4 ml-1" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="flex items-center px-4 py-2 text-sm text-white bg-accent hover:bg-accent-dark rounded"
                >
                  {t('survey.submit')}
                  <Save className="h-4 w-4 ml-1" />
                </button>
              )}
            </div>
            
            <CategorySection
              category={categories[activeCategory]}
              responses={responses}
              onResponseChange={handleResponseChange}
            />
            
            {/* Bottom navigation buttons */}
            <div className="mt-10 border-t pt-6 flex justify-between">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={activeCategory === 0}
                className={`flex items-center px-4 py-2 text-sm rounded ${
                  activeCategory === 0 
                    ? 'text-gray-400 bg-gray-100 cursor-not-allowed' 
                    : 'text-gray-700 bg-gray-200 hover:bg-gray-300'
                }`}
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                {t('survey.prev')}
              </button>
              
              {activeCategory < categories.length - 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 bg-gray-200 hover:bg-gray-300 rounded"
                >
                  {t('survey.next')}
                  <ArrowRight className="h-4 w-4 ml-1" />
                </button>
              ) : (
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-accent hover:bg-accent-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent"
                >
                  {t('survey.complete')}
                </button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SurveyForm;