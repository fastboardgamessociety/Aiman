import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import moment from 'moment-timezone';

const CountdownContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  text-align: center;
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
`;

const BirthdayTitle = styled(motion.h1)`
  font-family: 'Dancing Script', cursive;
  font-size: clamp(2.5rem, 8vw, 4rem);
  color: white;
  margin-bottom: 1rem;
`;

const PersonalMessage = styled(motion.p)`
  font-size: clamp(1.1rem, 4vw, 1.3rem);
  color: rgba(255, 255, 255, 0.9);
  max-width: 600px;
  line-height: 1.6;
  margin-bottom: 3rem;
`;

const CountdownGrid = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 3rem;
  
  @media (max-width: 768px) {
    gap: 1rem;
  }
`;

const TimeBox = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 1.5rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  min-width: 80px;
  
  @media (max-width: 768px) {
    padding: 1rem 0.5rem;
    min-width: 60px;
  }
`;

const TimeNumber = styled.div`
  font-size: clamp(2rem, 6vw, 2.5rem);
  font-weight: 600;
  color: #ffd700;
  line-height: 1;
`;

const TimeLabel = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const SorryNote = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  max-width: 500px;
  color: rgba(255, 255, 255, 0.9);
  font-style: italic;
  line-height: 1.6;
  margin-bottom: 2rem;
`;

const TestButton = styled(motion.button)`
  background: linear-gradient(45deg, #ff6b6b, #ff8e8e);
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 25px;
  font-size: 1rem;
  cursor: pointer;
  font-weight: 600;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
  }
`;

function BirthdayCountdown({ onComplete }) {
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const timer = setInterval(() => {
      const now = moment.tz('Asia/Karachi');
      const birthday = moment.tz('2025-01-04 00:00:00', 'Asia/Karachi');
      const diff = birthday.diff(now);

      if (diff > 0) {
        const duration = moment.duration(diff);
        setTimeLeft({
          days: Math.floor(duration.asDays()),
          hours: duration.hours(),
          minutes: duration.minutes(),
          seconds: duration.seconds()
        });
      } else {
        // Birthday countdown finished - trigger celebration
        clearInterval(timer);
        onComplete();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <CountdownContainer>
      <BirthdayTitle
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Aiman's Birthday! 🎉
      </BirthdayTitle>
      
      <PersonalMessage
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        Hey beautiful! Your special day is almost here. I've been counting down the days 
        because I can't wait to celebrate the most amazing person I know! 💖
      </PersonalMessage>
      
      <CountdownGrid>
        <TimeBox
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          <TimeNumber>{timeLeft.days || 0}</TimeNumber>
          <TimeLabel>Days</TimeLabel>
        </TimeBox>
        <TimeBox
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <TimeNumber>{timeLeft.hours || 0}</TimeNumber>
          <TimeLabel>Hours</TimeLabel>
        </TimeBox>
        <TimeBox
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <TimeNumber>{timeLeft.minutes || 0}</TimeNumber>
          <TimeLabel>Minutes</TimeLabel>
        </TimeBox>
        <TimeBox
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
        >
          <TimeNumber>{timeLeft.seconds || 0}</TimeNumber>
          <TimeLabel>Seconds</TimeLabel>
        </TimeBox>
      </CountdownGrid>
      
      <SorryNote
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 1 }}
      >
        I wish I could be there to celebrate with you in person. I'm sorry I can't give you 
        the biggest hug right now, but know that I'm thinking of you every second and my 
        heart is always with you. You mean everything to me! 💕
      </SorryNote>

      <TestButton
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
        onClick={onComplete}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        🎂 Skip to Birthday Celebration (Test)
      </TestButton>
    </CountdownContainer>
  );
}

export default BirthdayCountdown;