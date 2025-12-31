import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import NewYearPage from './components/NewYearPage';
import NewYearCelebration from './components/NewYearCelebration';

const AppContainer = styled.div`
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
`;

function App() {
  const [currentStep, setCurrentStep] = useState('newYearCountdown');

  const handleNewYearComplete = () => {
    setCurrentStep('newYearCelebration');
  };

  const handleNewYearCelebrationComplete = () => {
    // For now, just stay on celebration
    // Later we'll add birthday content
    console.log('New Year celebration complete!');
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'newYearCountdown':
        return <NewYearPage onComplete={handleNewYearComplete} />;
      case 'newYearCelebration':
        return <NewYearCelebration onClose={handleNewYearCelebrationComplete} />;
      default:
        return <NewYearPage onComplete={handleNewYearComplete} />;
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