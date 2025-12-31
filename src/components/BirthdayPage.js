import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import moment from 'moment-timezone';
import BirthdayCountdown from './BirthdayCountdown';
import BirthdayGallery from './BirthdayGallery';
import InteractiveGames from './InteractiveGames';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
`;

const WaitingContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  text-align: center;
`;

const WaitingTitle = styled(motion.h1)`
  font-family: 'Dancing Script', cursive;
  font-size: clamp(2.5rem, 8vw, 4rem);
  color: white;
  margin-bottom: 2rem;
`;

const WaitingMessage = styled(motion.p)`
  font-size: clamp(1.1rem, 4vw, 1.4rem);
  color: rgba(255, 255, 255, 0.9);
  max-width: 600px;
  line-height: 1.6;
  margin-bottom: 3rem;
`;

const ComingSoonBox = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  max-width: 500px;
`;

const CountdownToReveal = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const TimeUnit = styled.div`
  text-align: center;
  background: rgba(255, 255, 255, 0.1);
  padding: 1rem;
  border-radius: 10px;
  min-width: 60px;
`;

const TimeNumber = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: #ffd700;
`;

const TimeLabel = styled.div`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 0.5rem;
`;

const TabContainer = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
  z-index: 100;
  
  @media (max-width: 768px) {
    position: relative;
    top: 0;
    transform: none;
    justify-content: center;
    padding: 20px;
  }
`;

const Tab = styled(motion.button)`
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.2)'};
  color: ${props => props.active ? '#333' : 'white'};
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

function BirthdayPage({ phase }) {
  const [activeTab, setActiveTab] = useState('countdown');
  const [timeUntilBirthday, setTimeUntilBirthday] = useState({});

  useEffect(() => {
    if (phase === 'waitingForBirthday') {
      const timer = setInterval(() => {
        const now = moment.tz('Asia/Karachi');
        const birthday = moment.tz('2025-01-04 00:00:00', 'Asia/Karachi');
        const diff = birthday.diff(now);

        if (diff > 0) {
          const duration = moment.duration(diff);
          setTimeUntilBirthday({
            days: Math.floor(duration.asDays()),
            hours: duration.hours(),
            minutes: duration.minutes(),
            seconds: duration.seconds()
          });
        }
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [phase]);

  if (phase === 'waitingForBirthday') {
    return (
      <PageContainer>
        <WaitingContainer>
          <WaitingTitle
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Happy New Year, Aiman! 🎊
          </WaitingTitle>
          
          <WaitingMessage
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            2025 is here! But wait... there's something even more special coming up very soon. 
            Your birthday is just around the corner, and I have some amazing surprises waiting for you!
          </WaitingMessage>
          
          <ComingSoonBox
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            <h3 style={{ color: '#ffd700', marginBottom: '1rem', fontFamily: 'Dancing Script', fontSize: '1.8rem' }}>
              Something Special Coming...
            </h3>
            <p style={{ color: 'rgba(255, 255, 255, 0.9)', marginBottom: '1rem' }}>
              Your birthday celebration will unlock in:
            </p>
            
            <CountdownToReveal>
              <TimeUnit>
                <TimeNumber>{timeUntilBirthday.days || 0}</TimeNumber>
                <TimeLabel>Days</TimeLabel>
              </TimeUnit>
              <TimeUnit>
                <TimeNumber>{timeUntilBirthday.hours || 0}</TimeNumber>
                <TimeLabel>Hours</TimeLabel>
              </TimeUnit>
              <TimeUnit>
                <TimeNumber>{timeUntilBirthday.minutes || 0}</TimeNumber>
                <TimeLabel>Minutes</TimeLabel>
              </TimeUnit>
              <TimeUnit>
                <TimeNumber>{timeUntilBirthday.seconds || 0}</TimeNumber>
                <TimeLabel>Seconds</TimeLabel>
              </TimeUnit>
            </CountdownToReveal>
          </ComingSoonBox>
        </WaitingContainer>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <TabContainer>
        <Tab 
          active={activeTab === 'countdown'} 
          onClick={() => setActiveTab('countdown')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🎂 Birthday
        </Tab>
        <Tab 
          active={activeTab === 'gallery'} 
          onClick={() => setActiveTab('gallery')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          💕 For You
        </Tab>
        <Tab 
          active={activeTab === 'games'} 
          onClick={() => setActiveTab('games')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          🎮 Play
        </Tab>
      </TabContainer>
      
      <AnimatePresence mode="wait">
        {activeTab === 'countdown' && (
          <BirthdayCountdown key="countdown" />
        )}
        {activeTab === 'gallery' && (
          <BirthdayGallery key="gallery" />
        )}
        {activeTab === 'games' && (
          <InteractiveGames key="games" />
        )}
      </AnimatePresence>
    </PageContainer>
  );
}

export default BirthdayPage;