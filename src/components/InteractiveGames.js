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

function InteractiveGames() {
  const [activeGame, setActiveGame] = useState('hearts');
  const [heartScore, setHeartScore] = useState(0);
  const [collectedHearts, setCollectedHearts] = useState(new Set());
  const [memoryCards, setMemoryCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(new Set());
  const [currentMessage, setCurrentMessage] = useState('');
  const [showReward, setShowReward] = useState(null);
  const [completedGames, setCompletedGames] = useState(new Set());
  const [quizScore, setQuizScore] = useState(0);
  const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
  const [quizAnswered, setQuizAnswered] = useState(false);

  const gameRewards = {
    hearts: {
      emoji: '🤗',
      title: 'Virtual Hug Reward!',
      message: 'Here\'s the biggest, warmest hug just for you! You collected all my hearts perfectly. I wish I could give you this hug in person right now! *HUGE HUG*,iiii aur itna dabana tha jaise waise dabata jab hugg hehe  🤗💕 '
    },
    memory: {
      emoji: '💋',
      title: 'Sweet Kiss Reward!',
      message: 'You have such an amazing memory! Here\'s a sweet kiss all over you liek i usually do as your reward for matching all the pairs perfectly. *Kiss* 💋 You\'re absolutely brilliant jaanuu!'
    },
    quiz: {
      emoji: '🎁',
      title: 'Special Gift Reward!',
      message: 'You know me so well! Here\'s a special virtual gift just for you: A promise that when we\'re together again, I\'ll give you the most amazing surprise. You deserve the world! 🎁💝'
    }
  };

  const quizQuestions = [
    {
      question: "What's my favorite thing about you?",
      options: ["Your smile", "Your laugh", "Your hair", "Everything about you"],
      correct: 3
    },
    {
      question: "What do I love most about our conversations?",
      options: ["kinni bongiyan maarti", "How funny you are", "How caring you are", "All of the above"],
      correct: 0
    },
    {
      question: "What makes you special to me?",
      options: ["Your beauty", "Your heart", "Your mind", "You areee soooo perfect jsut as you aree"],
      correct: 3
    },
    {
      question: "How do you make me feel?",
      options: ["Happy", "Loved", "Complete", "All of these and more"],
      correct: 3
    },
    {
      question: "What's the best part of my day?",
      options: ["Morning coffee", "Work achievements", "Thinking about you", "Going to sleep"],
      correct: 2
    },
    {
      question: "If I could give you anything, what would it be?",
      options: ["Expensive gifts", "The whole world", "All my love", "My time and attention"],
      correct: 1
    },
    {
      question: "What do I admire most about you?",
      options: ["Your strength", "Your compassion", "Your intelligence", "you"],
      correct: 3
    },
    {
      question: "How do you inspire me?",
      options: ["To be better", "To dream bigger", "To love deeper", "In every possible way"],
      correct: 2
    },
    {
      question: "What's my promise to you?",
      options: ["To always be there", "To love you forever", "To make you happy", "All of these always"],
      correct: 1
    },
    {
      question: "What are you to me?",
      options: ["My girlfriend", "My best friend", "My everything", "The love of my life"],
      correct: 2
    }
  ];

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
      setHeartScore(prev => {
        const newScore = prev + 1;
        if (newScore === 16 && !completedGames.has('hearts')) {
          setTimeout(() => {
            setShowReward('hearts');
            setCompletedGames(prev => new Set([...prev, 'hearts']));
          }, 1000);
        }
        return newScore;
      });
    }
  };

  const flipMemoryCard = (index) => {
    if (flippedCards.length === 2 || matchedPairs.has(index)) return;
    
    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);
    
    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (memoryCards[first].emoji === memoryCards[second].emoji) {
        const newMatched = new Set([...matchedPairs, first, second]);
        setMatchedPairs(newMatched);
        
        if (newMatched.size === 16 && !completedGames.has('memory')) {
          setTimeout(() => {
            setShowReward('memory');
            setCompletedGames(prev => new Set([...prev, 'memory']));
          }, 1000);
        }
      }
      setTimeout(() => setFlippedCards([]), 1000);
    }
  };

  const getRandomMessage = () => {
    const randomMessage = loveMessages[Math.floor(Math.random() * loveMessages.length)];
    setCurrentMessage(randomMessage);
  };

  const closeReward = () => {
    setShowReward(null);
  };

  const answerQuiz = (answerIndex) => {
    if (quizAnswered) return;
    
    setQuizAnswered(true);
    if (answerIndex === quizQuestions[currentQuizQuestion].correct) {
      setQuizScore(prev => prev + 1);
    }
    
    setTimeout(() => {
      if (currentQuizQuestion < quizQuestions.length - 1) {
        setCurrentQuizQuestion(prev => prev + 1);
        setQuizAnswered(false);
      } else if (!completedGames.has('quiz')) {
        setShowReward('quiz');
        setCompletedGames(prev => new Set([...prev, 'quiz']));
      }
    }, 1500);
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
      
      case 'quiz':
        return (
          <GameContainer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <GameTitle>Love Quiz! 🧩</GameTitle>
            <GameDescription>
              Let's see how well you know my feelings about you!
            </GameDescription>
            <Score>Score: {quizScore}/{quizQuestions.length}</Score>
            
            {currentQuizQuestion < quizQuestions.length ? (
              <div>
                <h4 style={{ color: '#ff6b6b', margin: '2rem 0 1rem' }}>
                  {quizQuestions[currentQuizQuestion].question}
                </h4>
                <div style={{ display: 'grid', gap: '1rem', margin: '2rem 0' }}>
                  {quizQuestions[currentQuizQuestion].options.map((option, index) => (
                    <MessageButton
                      key={index}
                      onClick={() => answerQuiz(index)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      style={{ 
                        background: quizAnswered 
                          ? (index === quizQuestions[currentQuizQuestion].correct 
                              ? 'linear-gradient(135deg, #00b894, #00cec9)' 
                              : 'linear-gradient(135deg, #ff6b6b, #ff8e8e)')
                          : 'linear-gradient(135deg, #ff6b6b, #ff8e8e)'
                      }}
                    >
                      {option}
                    </MessageButton>
                  ))}
                </div>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ color: '#ff6b6b', fontSize: '1.2rem', fontWeight: 'bold' }}
              >
                🎉 Quiz Complete! You got {quizScore}/{quizQuestions.length} right! 🎉
              </motion.div>
            )}
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
        <GameButton 
          active={activeGame === 'quiz'} 
          onClick={() => setActiveGame('quiz')}
        >
          🧩 Love Quiz
        </GameButton>
      </GameSelector>
      
      <AnimatePresence mode="wait">
        {renderGame()}
      </AnimatePresence>

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
    </GamesContainer>
  );
}

export default InteractiveGames;