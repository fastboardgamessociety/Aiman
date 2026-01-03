import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import BirthdayCountdown from './components/BirthdayCountdown';
import BirthdayCelebration from './components/BirthdayCelebration';
import BirthdayGallery from './components/BirthdayGallery';
import InteractiveGames from './components/InteractiveGames';

const AppContainer = styled.div`
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
`;

function App() {
  const [currentStep, setCurrentStep] = useState('birthdayCountdown');

  const handleBirthdayCountdownComplete = () => {
    setCurrentStep('birthdayCelebration');
  };

  const handleBirthdayCelebrationComplete = () => {
    setCurrentStep('birthdayGallery');
  };

  const handleBirthdayGalleryComplete = () => {
    setCurrentStep('interactiveGames');
  };

  const handleGamesComplete = () => {
    // Stay on games or loop back
    console.log('Birthday experience complete!');
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'birthdayCountdown':
        return <BirthdayCountdown onComplete={handleBirthdayCountdownComplete} />;
      case 'birthdayCelebration':
        return <BirthdayCelebration onComplete={handleBirthdayCelebrationComplete} />;
      case 'birthdayGallery':
        return <BirthdayGallery onComplete={handleBirthdayGalleryComplete} />;
      case 'interactiveGames':
        return <InteractiveGames onComplete={handleGamesComplete} />;
      default:
        return <BirthdayCountdown onComplete={handleBirthdayCountdownComplete} />;
    }
  };

  return (
    <AppContainer>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {renderCurrentStep()}
        </motion.div>
      </AnimatePresence>
    </AppContainer>
  );
}

export default App;