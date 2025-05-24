import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import SurveyForm from './components/SurveyForm';
import ResultsPage from './components/ResultsPage';
import TcmElementsPage from './components/TcmElementsPage';
import Footer from './components/Footer';
import TopNav from './components/TopNav';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <TopNav />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/survey" element={<SurveyForm />} />
              <Route path="/results" element={<ResultsPage />} />
              <Route path="/tcm-5-elements" element={<TcmElementsPage />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;