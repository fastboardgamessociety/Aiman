import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import moment from 'moment-timezone';
import Confetti from 'react-confetti';

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

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 50%, #000 100%);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  position: relative;
  overflow: hidden;
`;

const MainTitle = styled(motion.h1)`
  font-family: 'Dancing Script', cursive;
  font-size: clamp(3rem, 10vw, 6rem);
  font-weight: 700;
  text-align: center;
  margin-bottom: 1rem;
  animation: ${glow} 3s ease-in-out infinite;
  background: linear-gradient(45deg, #fff, #ffd700, #fff);
  background-size: 200% 200%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const SubTitle = styled(motion.p)`
  font-size: clamp(1.2rem, 4vw, 2rem);
  text-align: center;
  margin-bottom: 4rem;
  opacity: 0.9;
  font-weight: 400;
`;

const CountdownContainer = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
`;

const TimeUnit = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(15px);
  border: 2px solid rgba(255, 255, 255, 0.15);
  border-radius: 20px;
  padding: 2rem 1.5rem;
  min-width: 120px;
  position: relative;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #ffd700, transparent, #ffd700);
    border-radius: 20px;
    z-index: -1;
    opacity: 0.5;
  }
  
  @media (max-width: 768px) {
    min-width: 100px;
    padding: 1.5rem 1rem;
  }
`;

const TimeNumber = styled.div`
  font-size: clamp(3rem, 10vw, 5rem);
  font-weight: 800;
  line-height: 1;
  color: #ffd700;
  animation: ${pulse} 2s ease-in-out infinite;
  text-shadow: 0 0 20px rgba(255, 215, 0, 0.5);
`;

const TimeLabel = styled.div`
  font-size: clamp(1rem, 3vw, 1.3rem);
  margin-top: 1rem;
  opacity: 0.8;
  text-transform: uppercase;
  letter-spacing: 3px;
  font-weight: 600;
  color: #fff;
`;

const PersonalMessage = styled(motion.div)`
  max-width: 700px;
  text-align: center;
  font-size: clamp(1.1rem, 4vw, 1.4rem);
  line-height: 1.7;
  opacity: 0.95;
  font-weight: 400;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 25px;
  padding: 2.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
`;

function TestNewYear() {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      // Set a test target time - 2 minutes from now for testing
      const now = moment();
      const testTarget = moment().add(2, 'minutes');
      const diff = testTarget.diff(now);

      if (diff > 0) {
        const duration = moment.duration(diff);
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: duration.minutes(),
          seconds: duration.seconds()
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <PageContainer>
      <MainTitle
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        New Year 2025
      </MainTitle>
      
      <SubTitle
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1.5 }}
      >
        For my beautiful Aiman ✨
      </SubTitle>
      
      <CountdownContainer
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 1.2, ease: "easeOut" }}
      >
        <TimeUnit
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <TimeNumber>{timeLeft.days || 0}</TimeNumber>
          <TimeLabel>Days</TimeLabel>
        </TimeUnit>
        <TimeUnit
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <TimeNumber>{timeLeft.hours || 0}</TimeNumber>
          <TimeLabel>Hours</TimeLabel>
        </TimeUnit>
        <TimeUnit
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <TimeNumber>{timeLeft.minutes || 0}</TimeNumber>
          <TimeLabel>Minutes</TimeLabel>
        </TimeUnit>
        <TimeUnit
          whileHover={{ scale: 1.05, y: -5 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <TimeNumber>{timeLeft.seconds || 0}</TimeNumber>
          <TimeLabel>Seconds</TimeLabel>
        </TimeUnit>
      </CountdownContainer>
      
      <PersonalMessage
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 1.2 }}
      >
        Hey beautiful! 2025 is almost here and I can't wait to start this new year with you in my thoughts. 
        Every second that passes brings us closer to new adventures, new memories, and new reasons to smile together. 
        You make everything in my world brighter! 💖
      </PersonalMessage>
    </PageContainer>
  );
}

export default TestNewYear;