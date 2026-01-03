import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import BirthdayCountdown from './BirthdayCountdown';
import BirthdayCelebration from './BirthdayCelebration';
import BirthdayGallery from './BirthdayGallery';
import InteractiveGames from './InteractiveGames';

const TestContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
`;

const TestHeader = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  padding: 15px 20px;
  z-index: 1000;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  border-bottom: 2px solid rgba(255, 255, 255, 0.2);
`;

const TestButton = styled(motion.button)`
  background: ${props => props.active ? 'linear-gradient(45deg, #ff6b6b, #ff8e8e)' : 'rgba(255, 255, 255, 0.2)'};
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  font-weight: 600;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  
  &:hover {
    background: ${props => props.active ? 'linear-gradient(45deg, #ff8e8e, #ff6b6b)' : 'rgba(255, 255, 255, 0.3)'};
    transform: translateY(-2px);
  }
`;

const ContentArea = styled.div`
  margin-top: 80px;
`;

const RewardModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
`;

const RewardCard = styled(motion.div)`
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%);
  border-radius: 25px;
  padding: 3rem;
  text-align: center;
  max-width: 500px;
  margin: 20px;
  box-shadow: 0 20px 60px rgba(255, 105, 180, 0.4);
`;

const RewardTitle = styled.h2`
  font-family: 'Dancing Script', cursive;
  font-size: 2.5rem;
  color: white;
  margin-bottom: 1rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
`;

const RewardEmoji = styled.div`
  font-size: 4rem;
  margin: 1rem 0;
`;

const RewardMessage = styled.p`
  font-size: 1.2rem;
  color: white;
  line-height: 1.6;
  margin-bottom: 2rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
`;

const CloseRewardButton = styled(motion.button)`
  background: linear-gradient(45deg, #ff69b4, #ff1493);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 25px;
  font-size: 1.1rem;
  cursor: pointer;
  font-weight: 600;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 105, 180, 0.4);
  }
`;

const gameRewards = {
  hearts: {
    emoji: '🤗',
    title: 'Virtual Hug Reward!',
    message: 'Here\'s the biggest, warmest hug just for you! You completed the heart collector game perfectly. I wish I could give you this hug in person right now! *HUGE HUG* 🤗💕'
  },
  memory: {
    emoji: '💋',
    title: 'Sweet Kiss Reward!',
    message: 'You have such an amazing memory! Here\'s a sweet kiss as your reward for matching all the pairs perfectly. *Kiss* 💋 You\'re absolutely brilliant!'
  },
  quiz: {
    emoji: '🎁',
    title: 'Special Gift Reward!',
    message: 'You know me so well! Here\'s a special virtual gift just for you: A promise that when we\'re together again, I\'ll give you the most amazing surprise. You deserve the world! 🎁💝'
  }
};

function TestMode() {
  const [currentView, setCurrentView] = useState('countdown');
  const [showReward, setShowReward] = useState(null);

  const handleRewardShow = (gameType) => {
    setShowReward(gameType);
  };

  const closeReward = () => {
    setShowReward(null);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'countdown':
        return <BirthdayCountdown onComplete={() => setCurrentView('celebration')} />;
      case 'celebration':
        return <BirthdayCelebration onComplete={() => setCurrentView('gallery')} />;
      case 'gallery':
        return <BirthdayGallery onComplete={() => setCurrentView('games')} />;
      case 'games':
        return <InteractiveGames onComplete={() => console.log('Games complete!')} />;
      default:
        return <BirthdayCountdown onComplete={() => setCurrentView('celebration')} />;
    }
  };

  return (
    <TestContainer>
      <TestHeader>
        <TestButton
          active={currentView === 'countdown'}
          onClick={() => setCurrentView('countdown')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🎂 Birthday Countdown
        </TestButton>
        
        <TestButton
          active={currentView === 'celebration'}
          onClick={() => setCurrentView('celebration')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🎉 Birthday Celebration
        </TestButton>
        
        <TestButton
          active={currentView === 'gallery'}
          onClick={() => setCurrentView('gallery')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          📸 Birthday Gallery
        </TestButton>
        
        <TestButton
          active={currentView === 'games'}
          onClick={() => setCurrentView('games')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🎮 Interactive Games
        </TestButton>
        
        <div style={{ width: '100%', height: '1px', background: 'rgba(255,255,255,0.2)', margin: '5px 0' }} />
        
        <TestButton
          onClick={() => handleRewardShow('hearts')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🤗 Heart Collector Reward
        </TestButton>
        
        <TestButton
          onClick={() => handleRewardShow('memory')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          💋 Memory Game Reward
        </TestButton>
        
        <TestButton
          onClick={() => handleRewardShow('quiz')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🎁 Quiz Reward
        </TestButton>
      </TestHeader>

      <ContentArea>
        {renderCurrentView()}
      </ContentArea>

      {showReward && (
        <RewardModal
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <RewardCard
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <RewardTitle>{gameRewards[showReward].title}</RewardTitle>
            <RewardEmoji>{gameRewards[showReward].emoji}</RewardEmoji>
            <RewardMessage>{gameRewards[showReward].message}</RewardMessage>
            <CloseRewardButton
              onClick={closeReward}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Thank You! 💕
            </CloseRewardButton>
          </RewardCard>
        </RewardModal>
      )}
    </TestContainer>
  );
}

export default TestMode;