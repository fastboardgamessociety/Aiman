import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import TestNewYearCountdown from './TestNewYearCountdown';
import TestBirthdayCountdown from './TestBirthdayCountdown';
import BirthdayGallery from './BirthdayGallery';
import InteractiveGames from './InteractiveGames';
import NewYearCelebration from './NewYearCelebration';
import BirthdayCelebration from './BirthdayCelebration';

const TestContainer = styled.div`
  min-height: 100vh;
  position: relative;
  background: #000;
`;

const TestNavigation = styled.div`
  position: fixed;
  top: 20px;
  left: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 8px;
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(15px);
  padding: 20px;
  border-radius: 15px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
  max-height: 90vh;
  overflow-y: auto;
`;

const TestButton = styled.button`
  background: ${props => props.active ? '#ff6b6b' : 'rgba(255, 255, 255, 0.1)'};
  color: white;
  border: none;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 200px;
  text-align: left;
  border: 1px solid ${props => props.active ? '#ff6b6b' : 'rgba(255, 255, 255, 0.2)'};
  
  &:hover {
    background: ${props => props.active ? '#ff5252' : 'rgba(255, 255, 255, 0.2)'};
    transform: translateX(2px);
  }
`;

const CelebrationButton = styled.button`
  background: linear-gradient(45deg, #ffd700, #ffed4e);
  color: #333;
  border: none;
  padding: 12px 16px;
  border-radius: 10px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 200px;
  font-weight: 600;
  text-align: left;
  
  &:hover {
    background: linear-gradient(45deg, #ffed4e, #ffd700);
    transform: translateX(2px);
  }
`;

const TestTitle = styled.h3`
  color: white;
  margin: 0 0 15px 0;
  font-size: 1.2rem;
  text-align: center;
  font-family: 'Dancing Script', cursive;
`;

const SectionTitle = styled.h4`
  color: #ffd700;
  margin: 15px 0 8px 0;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const CloseTestMode = styled.button`
  background: #ff4757;
  color: white;
  border: none;
  padding: 12px 16px;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  margin-top: 15px;
  font-weight: 600;
  
  &:hover {
    background: #ff3742;
    transform: translateX(2px);
  }
`;

const ContentArea = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
`;

function TestMode({ onClose }) {
  const [currentPage, setCurrentPage] = useState('newYearCountdown');
  const [showCelebration, setShowCelebration] = useState(null);

  const renderCurrentPage = () => {
    if (showCelebration === 'newYear') {
      return <NewYearCelebration onClose={() => setShowCelebration(null)} />;
    }
    
    if (showCelebration === 'birthday') {
      return <BirthdayCelebration onClose={() => setShowCelebration(null)} />;
    }

    switch (currentPage) {
      case 'newYearCountdown':
        return <TestNewYearCountdown onCelebrate={() => setShowCelebration('newYear')} />;
      case 'birthdayCountdown':
        return <TestBirthdayCountdown onCelebrate={() => setShowCelebration('birthday')} />;
      case 'birthdayGallery':
        return <BirthdayGallery />;
      case 'games':
        return <InteractiveGames />;
      default:
        return <TestNewYearCountdown onCelebrate={() => setShowCelebration('newYear')} />;
    }
  };

  return (
    <TestContainer>
      <TestNavigation>
        <TestTitle>🧪 Complete Test Mode</TestTitle>
        
        <SectionTitle>📄 Countdown Pages</SectionTitle>
        
        <TestButton 
          active={currentPage === 'newYearCountdown'} 
          onClick={() => {
            setCurrentPage('newYearCountdown');
            setShowCelebration(null);
          }}
        >
          🎊 New Year Countdown
        </TestButton>
        
        <TestButton 
          active={currentPage === 'birthdayCountdown'} 
          onClick={() => {
            setCurrentPage('birthdayCountdown');
            setShowCelebration(null);
          }}
        >
          🎂 Birthday Countdown
        </TestButton>
        
        <SectionTitle>💕 Birthday Content</SectionTitle>
        
        <TestButton 
          active={currentPage === 'birthdayGallery'} 
          onClick={() => {
            setCurrentPage('birthdayGallery');
            setShowCelebration(null);
          }}
        >
          💕 Birthday Gallery
        </TestButton>
        
        <TestButton 
          active={currentPage === 'games'} 
          onClick={() => {
            setCurrentPage('games');
            setShowCelebration(null);
          }}
        >
          🎮 Interactive Games
        </TestButton>
        
        <SectionTitle>🎉 Epic Celebrations</SectionTitle>
        
        <CelebrationButton 
          onClick={() => setShowCelebration('newYear')}
        >
          ✨ EPIC New Year Show
        </CelebrationButton>
        
        <CelebrationButton 
          onClick={() => setShowCelebration('birthday')}
        >
          🎂 AMAZING Birthday Magic
        </CelebrationButton>
        
        <CloseTestMode onClick={onClose}>
          ❌ Exit Test Mode
        </CloseTestMode>
      </TestNavigation>
      
      <ContentArea>
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage + (showCelebration || '')}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderCurrentPage()}
          </motion.div>
        </AnimatePresence>
      </ContentArea>
    </TestContainer>
  );
}

export default TestMode;