import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="mt-auto py-4 text-center animate-backgroundCycle">
      <div className="flex items-center justify-center">
        <p className="text-sm font-medium animate-colorCycle">
          {t('footer.proudly')}{' '}
          <a 
            href="https://nexiuslabs.com/"
            target="_blank" 
            rel="noopener noreferrer"
            className="mx-1 transition-colors font-bold underline decoration-dotted underline-offset-2 animate-colorCycle"
          >
            Nexius Labs
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;