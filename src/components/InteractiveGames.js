import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const GamesContainer = styled.div`
  min-height: 100vh;
  padding: 100px 20px 20px;
  
  @media (max-width: 768px) {
    padding: 120px 20px 20px;
  }
`;

const GamesTitle = styled(motion.h2)`
  font-family: 'Dancing Script', cursive;
  font-size: clamp(2rem, 6vw, 3rem);
  color: white;
  text-align: center;
  margin-bottom: 2rem;
`;

const GameSelector = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  gap: 1rem;
  flex-wrap: wrap;
`;

const GameButton = styled.button`
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.2)'};
  color: ${props => props.active ? '#333' : 'white'};
  border: none;
  padding: 1rem 1.5rem;
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const GameContainer = styled(motion.div)`
  max-width: 600px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 25px;
  padding: 2rem;
  text-align: center;
`;

const GameTitle = styled.h3`
  font-family: 'Dancing Script', cursive;
  font-size: 2rem;
  color: #ff6b6b;
  margin-bottom: 1rem;
`;

const GameDescription = styled.p`
  color: #666;
  margin-bottom: 2rem;
  line-height: 1.6;
`;

// Heart Collector Game
const HeartGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  margin: 2rem 0;
`;

const HeartButton = styled(motion.button)`
  width: 60px;
  height: 60px;
  border: none;
  border-radius: 50%;
  font-size: 2rem;
  cursor: pointer;
  background: ${props => props.collected ? '#ff6b6b' : '#f0f0f0'};
  color: white;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const Score = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: #ff6b6b;
  margin: 1rem 0;
`;

// Memory Match Game
const MemoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  margin: 2rem 0;
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
`;

const MemoryCard = styled(motion.button)`
  width: 60px;
  height: 60px;
  border: none;
  border-radius: 10px;
  font-size: 1.5rem;
  cursor: pointer;
  background: ${props => props.flipped ? '#ff6b6b' : '#ddd'};
  color: white;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

// Love Messages Game
const MessageButton = styled(motion.button)`
  background: linear-gradient(135deg, #ff6b6b, #ff8e8e);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 25px;
  font-size: 1.1rem;
  cursor: pointer;
  margin: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(255, 107, 107, 0.4);
  }
`;

const MessageDisplay = styled(motion.div)`
  background: linear-gradient(135deg, #ffeaa7, #fab1a0);
  padding: 2rem;
  border-radius: 20px;
  margin: 2rem 0;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #333;
`;

function InteractiveGames() {
  const [activeGame, setActiveGame] = useState('hearts');
  const [heartScore, setHeartScore] = useState(0);
  const [collectedHearts, setCollectedHearts] = useState(new Set());
  const [memoryCards, setMemoryCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(new Set());
  const [currentMessage, setCurrentMessage] = useState('');

  const loveMessages = [
    "You make every day brighter just by being you! ✨",
    "Your smile is my favorite thing in the whole world! 😊",
    "I fall in love with you more every single day! 💕",
    "You're the most beautiful person inside and out! 🌸",
    "Your laugh is like music to my ears! 🎵",
    "You make me want to be the best version of myself! 💪",
    "Every moment with you feels like magic! ✨",
    "You're my sunshine on cloudy days! ☀️",
    "Your kindness touches everyone around you! 💖",
    "I'm so grateful to have you in my life! 🙏"
  ];

  useEffect(() => {
    // Initialize memory game
    const emojis = ['💖', '🌸', '🦋', '🌟', '💕', '🎀', '🌺', '✨'];
    const cards = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
    setMemoryCards(cards.map((emoji, index) => ({ id: index, emoji, flipped: false })));
  }, []);

  const collectHeart = (index) => {
    if (!collectedHearts.has(index)) {
      setCollectedHearts(prev => new Set([...prev, index]));
      setHeartScore(prev => prev + 1);
    }
  };

  const flipMemoryCard = (index) => {
    if (flippedCards.length === 2 || matchedPairs.has(index)) return;
    
    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);
    
    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (memoryCards[first].emoji === memoryCards[second].emoji) {
        setMatchedPairs(prev => new Set([...prev, first, second]));
      }
      setTimeout(() => setFlippedCards([]), 1000);
    }
  };

  const getRandomMessage = () => {
    const randomMessage = loveMessages[Math.floor(Math.random() * loveMessages.length)];
    setCurrentMessage(randomMessage);
  };

  const renderGame = () => {
    switch (activeGame) {
      case 'hearts':
        return (
          <GameContainer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <GameTitle>Collect Hearts for Aiman! 💖</GameTitle>
            <GameDescription>
              Tap the hearts to collect them! Each heart represents how much you mean to me!
            </GameDescription>
            <Score>Hearts Collected: {heartScore}/16</Score>
            <HeartGrid>
              {Array.from({ length: 16 }, (_, i) => (
                <HeartButton
                  key={i}
                  collected={collectedHearts.has(i)}
                  onClick={() => collectHeart(i)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  💖
                </HeartButton>
              ))}
            </HeartGrid>
            {heartScore === 16 && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ color: '#ff6b6b', fontSize: '1.2rem', fontWeight: 'bold' }}
              >
                🎉 You collected all my love! Happy Birthday! 🎉
              </motion.div>
            )}
          </GameContainer>
        );
      
      case 'memory':
        return (
          <GameContainer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <GameTitle>Memory Match! 🧠</GameTitle>
            <GameDescription>
              Match the pairs! Just like how perfectly we match together!
            </GameDescription>
            <Score>Pairs Found: {matchedPairs.size / 2}/8</Score>
            <MemoryGrid>
              {memoryCards.map((card, index) => (
                <MemoryCard
                  key={card.id}
                  flipped={flippedCards.includes(index) || matchedPairs.has(index)}
                  onClick={() => flipMemoryCard(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {flippedCards.includes(index) || matchedPairs.has(index) ? card.emoji : '?'}
                </MemoryCard>
              ))}
            </MemoryGrid>
            {matchedPairs.size === 16 && (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ color: '#ff6b6b', fontSize: '1.2rem', fontWeight: 'bold' }}
              >
                🎉 Perfect match! Just like us! 🎉
              </motion.div>
            )}
          </GameContainer>
        );
      
      case 'messages':
        return (
          <GameContainer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <GameTitle>Love Message Generator! 💌</GameTitle>
            <GameDescription>
              Click the button to get a special message just for you!
            </GameDescription>
            <MessageButton
              onClick={getRandomMessage}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get My Love Message! 💕
            </MessageButton>
            <AnimatePresence>
              {currentMessage && (
                <MessageDisplay
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                >
                  {currentMessage}
                </MessageDisplay>
              )}
            </AnimatePresence>
          </GameContainer>
        );
      
      default:
        return null;
    }
  };

  return (
    <GamesContainer>
      <GamesTitle
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Fun Games for You! 🎮
      </GamesTitle>
      
      <GameSelector>
        <GameButton 
          active={activeGame === 'hearts'} 
          onClick={() => setActiveGame('hearts')}
        >
          💖 Heart Collector
        </GameButton>
        <GameButton 
          active={activeGame === 'memory'} 
          onClick={() => setActiveGame('memory')}
        >
          🧠 Memory Match
        </GameButton>
        <GameButton 
          active={activeGame === 'messages'} 
          onClick={() => setActiveGame('messages')}
        >
          💌 Love Messages
        </GameButton>
      </GameSelector>
      
      <AnimatePresence mode="wait">
        {renderGame()}
      </AnimatePresence>
    </GamesContainer>
  );
}

export default InteractiveGames;