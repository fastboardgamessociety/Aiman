import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';

const glow = keyframes`
  0% { text-shadow: 0 0 20px rgba(255, 255, 255, 0.5); }
  50% { text-shadow: 0 0 30px rgba(255, 255, 255, 0.8), 0 0 40px rgba(255, 255, 255, 0.6); }
  100% { text-shadow: 0 0 20px rgba(255, 255, 255, 0.5); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const sparkle = keyframes`
  0%, 100% { opacity: 0; transform: scale(0); }
  50% { opacity: 1; transform: scale(1); }
`;

const PageContainer = styled.div`
  min-height: 100vh;
  background: #000;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: relative;
  overflow: hidden;
`;

const BackgroundElements = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const Sparkle = styled.div`
  position: absolute;
  width: 3px;
  height: 3px;
  background: white;
  border-radius: 50%;
  animation: ${sparkle} 3s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
  left: ${props => props.left}%;
  top: ${props => props.top}%;
`;

const MainTitle = styled(motion.h1)`
  font-family: 'Dancing Script', cursive;
  font-size: clamp(2.5rem, 8vw, 4.5rem);
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  animation: ${glow} 3s ease-in-out infinite;
`;

const SubTitle = styled(motion.p)`
  font-size: clamp(1rem, 3vw, 1.3rem);
  text-align: center;
  margin-bottom: 3rem;
  opacity: 0.8;
  font-weight: 300;
`;

const CountdownContainer = styled(motion.div)`
  display: flex;
  gap: 2rem;
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const TimeUnit = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 1.5rem 1rem;
  min-width: 100px;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: -1px;
    left: -1px;
    right: -1px;
    bottom: -1px;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    border-radius: 15px;
    z-index: -1;
  }
  
  @media (max-width: 768px) {
    min-width: 80px;
    padding: 1rem 0.5rem;
  }
`;

const TimeNumber = styled.div`
  font-size: clamp(2.5rem, 8vw, 4rem);
  font-weight: 700;
  line-height: 1;
  color: #fff;
  animation: ${pulse} 2s ease-in-out infinite;
`;

const TimeLabel = styled.div`
  font-size: clamp(0.8rem, 2vw, 1rem);
  margin-top: 0.5rem;
  opacity: 0.7;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 500;
`;

const PersonalMessage = styled(motion.div)`
  max-width: 600px;
  text-align: center;
  font-size: clamp(1rem, 3vw, 1.2rem);
  line-height: 1.6;
  opacity: 0.9;
  font-weight: 300;
  background: rgba(255, 255, 255, 0.03);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 2rem;
`;

const TestButton = styled(motion.button)`
  background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 2rem;
  font-weight: 600;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
  }
`;

function TestNewYearCountdown({ onCelebrate }) {
  const [timeLeft, setTimeLeft] = useState({});
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    // Create sparkles for background
    const newSparkles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3
    }));
    setSparkles(newSparkles);
  }, []);

  useEffect(() => {
    // Test countdown - 30 seconds from now
    const timer = setInterval(() => {
      const now = new Date();
      const testTarget = new Date(now.getTime() + 30 * 1000); // 30 seconds from now
      const diff = testTarget.getTime() - now.getTime();

      if (diff > 0) {
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <PageContainer>
      <BackgroundElements>
        {sparkles.map(sparkle => (
          <Sparkle
            key={sparkle.id}
            left={sparkle.left}
            top={sparkle.top}
            delay={sparkle.delay}
          />
        ))}
      </BackgroundElements>
      
      <MainTitle
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        New Year 2025
      </MainTitle>
      
      <SubTitle
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Counting down to something magical...
      </SubTitle>
      
      <CountdownContainer
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 1, ease: "easeOut" }}
      >
        <TimeUnit
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <TimeNumber>{timeLeft.days || 0}</TimeNumber>
          <TimeLabel>Days</TimeLabel>
        </TimeUnit>
        <TimeUnit
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <TimeNumber>{timeLeft.hours || 0}</TimeNumber>
          <TimeLabel>Hours</TimeLabel>
        </TimeUnit>
        <TimeUnit
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <TimeNumber>{timeLeft.minutes || 0}</TimeNumber>
          <TimeLabel>Minutes</TimeLabel>
        </TimeUnit>
        <TimeUnit
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <TimeNumber>{timeLeft.seconds || 0}</TimeNumber>
          <TimeLabel>Seconds</TimeLabel>
        </TimeUnit>
      </CountdownContainer>
      
      <PersonalMessage
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        Hey Aiman! 2025 is almost here and I can't wait to start this new year thinking about you. 
        Every second that passes brings us closer to new memories, new moments, and new reasons to smile. 
        You make everything brighter! ✨
      </PersonalMessage>

      <TestButton
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        onClick={onCelebrate}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        🎆 Trigger New Year Celebration
      </TestButton>
    </PageContainer>
  );
}

export default TestNewYearCountdown;