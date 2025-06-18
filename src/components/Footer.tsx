import React from 'react';
import { ExternalLink } from 'lucide-react';
import LetterGlitch from './LetterGlitch';

const FooterBanner = () => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-neutral-700/50 h-16 sm:h-14">
      {/* Glitch Background - Full size container */}
      <div className="absolute inset-0 overflow-hidden">
        <LetterGlitch
          glitchSpeed={50}
          centerVignette={true}
          outerVignette={false}
          smooth={true}
          glitchColors={['#1D2A4D', '#00CABA', '#3A3A3A']}
        />
      </div>
      
      {/* Text overlay with better contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
      
      {/* Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex items-center justify-center h-full">
          <div className="flex flex-col sm:flex-row items-center justify-center text-xs sm:text-sm space-y-1 sm:space-y-0 sm:space-x-2">
            <div className="flex items-center space-x-1 sm:space-x-2 text-white">
              <span>Crafted by</span>
              <span className="font-semibold text-accent-500">Nexius Labs</span>
            </div>
            <span className="hidden sm:inline text-neutral-400">•</span>
            <a 
              href="https://nexiuslabs.netlify.app/build-with-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent-500 hover:text-accent-400 transition-colors flex items-center space-x-1 group text-center font-medium"
            >
              <span className="leading-tight">Learn how to create sites like this</span>
              <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 transition-transform flex-shrink-0" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterBanner;