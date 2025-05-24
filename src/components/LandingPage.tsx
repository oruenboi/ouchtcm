import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import LanguageToggle from './LanguageToggle';

const LandingPage: React.FC = () => {
  const { t } = useLanguage();
  const [gender, setGender] = useState<string>('');
  const [name, setName] = useState<string>('');

  // Load saved name and gender from localStorage if available
  useEffect(() => {
    const savedGender = localStorage.getItem('gender');
    const savedName = localStorage.getItem('userName');
    
    if (savedGender) {
      setGender(savedGender);
    }
    
    if (savedName) {
      setName(savedName);
    }
  }, []);

  const handleGenderSelect = (selectedGender: string) => {
    setGender(selectedGender);
    localStorage.setItem('gender', selectedGender);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    localStorage.setItem('userName', e.target.value);
  };

  return (
    <div className="min-h-screen bg-neutral">
      <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end mb-4">
          <LanguageToggle />
        </div>
        
        <div className="text-center">
          <h1 className="mt-4 text-4xl font-extrabold text-primary tracking-tight sm:text-5xl">
            {t('title')}
          </h1>
          <p className="mt-6 text-xl text-neutral-dark">
            {t('subtitle')}
          </p>
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-xl overflow-hidden">
          <div className="px-6 py-8 sm:p-10">
            <div className="text-center sm:text-left">
              <h2 className="text-2xl leading-9 font-bold text-primary">
                {t('about.title')}
              </h2>
              <div className="mt-3 text-base leading-7 text-neutral-dark">
                <p className="mb-4">
                  {t('about.description')}
                </p>
                <p className="mb-4">
                  {t('about.insight')}
                </p>
                <h3 className="text-lg font-semibold text-primary mt-6 mb-3">{t('types.title')}</h3>
                <ul className="list-disc pl-5 mb-6 space-y-2">
                  <li><span className="font-medium">{t('type.a')}</span></li>
                  <li><span className="font-medium">{t('type.b')}</span></li>
                  <li><span className="font-medium">{t('type.c')}</span></li>
                  <li><span className="font-medium">{t('type.d')}</span></li>
                  <li><span className="font-medium">{t('type.e')}</span></li>
                  <li><span className="font-medium">{t('type.f')}</span></li>
                  <li><span className="font-medium">{t('type.g')}</span></li>
                  <li><span className="font-medium">{t('type.h')}</span></li>
                  <li><span className="font-medium">{t('type.i')}</span></li>
                </ul>
                <h3 className="text-lg font-semibold text-primary mt-6 mb-3">{t('instructions.title')}</h3>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>{t('instructions.step1')}</li>
                  <li>{t('instructions.step2')}
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                      <li>{t('instructions.never')}</li>
                      <li>{t('instructions.seldom')}</li>
                      <li>{t('instructions.sometimes')}</li>
                      <li>{t('instructions.often')}</li>
                      <li>{t('instructions.always')}</li>
                    </ul>
                  </li>
                  <li>{t('instructions.step3')}</li>
                  <li>{t('instructions.step4')}</li>
                  <li>{t('instructions.step5')}</li>
                </ol>

                <div className="mt-8 space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-3">{t('name.label')}</h3>
                    <div className="mt-2">
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={handleNameChange}
                        placeholder={t('name.placeholder')}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-accent focus:ring-accent py-3 px-4"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-3">{t('gender.label')}</h3>
                    <div className="flex gap-4 mt-2">
                      <button
                        onClick={() => handleGenderSelect('female')}
                        className={`px-6 py-3 rounded-md ${
                          gender === 'female' 
                            ? 'bg-accent text-white' 
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {t('gender.female')}
                      </button>
                      <button
                        onClick={() => handleGenderSelect('male')}
                        className={`px-6 py-3 rounded-md ${
                          gender === 'male' 
                            ? 'bg-accent text-white' 
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {t('gender.male')}
                      </button>
                    </div>
                    {!gender && (
                      <p className="text-sm text-secondary mt-2">
                        {t('gender.required')}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="px-6 py-8 bg-neutral sm:p-10 sm:flex sm:items-center">
            <div className="w-full">
              <Link
                to={gender ? "/survey" : "#"}
                onClick={(e) => {
                  if (!gender) {
                    e.preventDefault();
                    alert("Please select your gender before proceeding");
                  }
                }}
                className={`w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-accent ${
                  gender ? 'hover:bg-accent-dark' : 'opacity-70 cursor-not-allowed'
                } md:py-4 md:text-lg md:px-10`}
              >
                {t('begin.button')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;