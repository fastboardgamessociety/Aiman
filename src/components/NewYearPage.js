import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import moment from 'moment-timezone';

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
  cursor: pointer;
  overflow: hidden;
  
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
  cursor: pointer;
  position: relative;
  overflow: hidden;
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

const TouchRipple = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  pointer-events: none;
  transform: scale(0);
`;

const floatText = keyframes`
  0% { transform: translateX(-100px); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateX(calc(100vw + 100px)); opacity: 0; }
`;

const FloatingText = styled(motion.div)`
  position: absolute;
  top: ${props => props.top}%;
  left: -100px;
  font-size: clamp(1rem, 3vw, 1.5rem);
  color: rgba(255, 255, 255, 0.6);
  font-weight: 300;
  animation: ${floatText} ${props => props.duration}s linear infinite;
  animation-delay: ${props => props.delay}s;
  pointer-events: none;
  z-index: 1;
`;

const KissEmoji = styled(motion.div)`
  position: absolute;
  font-size: 3rem;
  pointer-events: none;
  z-index: 100;
`;

const HeartEmoji = styled(motion.div)`
  position: absolute;
  font-size: 2.5rem;
  pointer-events: none;
  z-index: 100;
`;

function NewYearPage({ onComplete }) {
  const [timeLeft, setTimeLeft] = useState({});
  const [sparkles, setSparkles] = useState([]);
  const [ripples, setRipples] = useState([]);
  const [floatingTexts, setFloatingTexts] = useState([]);
  const [kisses, setKisses] = useState([]);
  const [hearts, setHearts] = useState([]);

  const createRipple = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    const newRipple = {
      id: Date.now(),
      x,
      y,
      size
    };
    
    setRipples(prev => [...prev, newRipple]);
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 1000);
  };

  const handleScreenTouch = (event) => {
    event.preventDefault();
    
    // Generate more kisses and hearts for overwhelming effect
    const numberOfKisses = Math.floor(Math.random() * 6) + 8; // 8-13 kisses
    const numberOfHearts = Math.floor(Math.random() * 5) + 6; // 6-10 hearts
    
    // Create kisses
    for (let i = 0; i < numberOfKisses; i++) {
      setTimeout(() => {
        const newKiss = {
          id: Date.now() + i,
          x: Math.random() * (window.innerWidth - 100) + 50,
          y: Math.random() * (window.innerHeight - 100) + 50
        };
        
        setKisses(prev => [...prev, newKiss]);
        
        setTimeout(() => {
          setKisses(prev => prev.filter(kiss => kiss.id !== newKiss.id));
        }, 4000); // Longer duration
      }, i * 80); // Faster stagger
    }
    
    // Create hearts
    for (let i = 0; i < numberOfHearts; i++) {
      setTimeout(() => {
        const newHeart = {
          id: Date.now() + i + 2000,
          x: Math.random() * (window.innerWidth - 100) + 50,
          y: Math.random() * (window.innerHeight - 100) + 50
        };
        
        setHearts(prev => [...prev, newHeart]);
        
        setTimeout(() => {
          setHearts(prev => prev.filter(heart => heart.id !== newHeart.id));
        }, 5000); // Longer duration
      }, i * 100 + 150); // Stagger hearts after kisses
    }
  };

  useEffect(() => {
    // Create sparkles for background
    const newSparkles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3
    }));
    setSparkles(newSparkles);

    // Create floating texts
    const texts = ['Touch the screen', 'Tap anywhere', 'Touch me', 'Give me a touch'];
    const newFloatingTexts = Array.from({ length: 4 }, (_, i) => ({
      id: i,
      text: texts[i % texts.length],
      top: Math.random() * 60 + 20, // Between 20% and 80% from top
      duration: Math.random() * 8 + 12, // Between 12-20 seconds
      delay: i * 3 // Stagger the texts
    }));
    setFloatingTexts(newFloatingTexts);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = moment.tz('Asia/Karachi');
      const newYear = moment.tz('2026-01-01 00:00:00', 'Asia/Karachi');
      const diff = newYear.diff(now);

      console.log('New Year countdown - Current time:', now.format('YYYY-MM-DD HH:mm:ss'));
      console.log('New Year countdown - Target time:', newYear.format('YYYY-MM-DD HH:mm:ss'));
      console.log('New Year countdown - Diff:', diff);

      if (diff > 0) {
        const duration = moment.duration(diff);
        setTimeLeft({
          days: Math.floor(duration.asDays()),
          hours: duration.hours(),
          minutes: duration.minutes(),
          seconds: duration.seconds()
        });
      } else {
        // Countdown finished - trigger celebration
        clearInterval(timer);
        onComplete();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <PageContainer 
      onClick={handleScreenTouch}
      onTouchStart={handleScreenTouch}
    >
      <BackgroundElements>
        {sparkles.map(sparkle => (
          <Sparkle
            key={sparkle.id}
            left={sparkle.left}
            top={sparkle.top}
            delay={sparkle.delay}
          />
        ))}
        {floatingTexts.map(floatingText => (
          <FloatingText
            key={floatingText.id}
            top={floatingText.top}
            duration={floatingText.duration}
            delay={floatingText.delay}
          >
            {floatingText.text}
          </FloatingText>
        ))}
      </BackgroundElements>

      {kisses.map(kiss => (
        <KissEmoji
          key={kiss.id}
          initial={{ 
            x: kiss.x - 24, 
            y: kiss.y - 24, 
            scale: 0, 
            opacity: 0,
            rotate: 0 
          }}
          animate={{ 
            x: kiss.x - 24 + (Math.random() - 0.5) * 60, 
            y: -100, // Float all the way to top
            scale: [0, 1.2, 1.5, 1.2, 0.8], 
            opacity: [0, 1, 1, 1, 0.8, 0.4, 0],
            rotate: [0, 15, -15, 10, -10, 0]
          }}
          transition={{ 
            duration: 4, 
            ease: "easeOut",
            times: [0, 0.15, 0.3, 0.6, 0.8, 0.9, 1]
          }}
        >
          💋
        </KissEmoji>
      ))}

      {hearts.map(heart => (
        <HeartEmoji
          key={heart.id}
          initial={{ 
            x: heart.x - 20, 
            y: heart.y - 20, 
            scale: 0, 
            opacity: 0,
            rotate: 0 
          }}
          animate={{ 
            x: heart.x - 20 + (Math.random() - 0.5) * 80, 
            y: -120, // Float all the way to top
            scale: [0, 1, 1.3, 1.1, 0.9, 0.7], 
            opacity: [0, 1, 1, 1, 0.9, 0.6, 0.3, 0],
            rotate: [0, 8, -8, 12, -5, 3, 0]
          }}
          transition={{ 
            duration: 5, 
            ease: "easeOut",
            times: [0, 0.1, 0.25, 0.5, 0.7, 0.85, 0.95, 1]
          }}
        >
          {Math.random() > 0.6 ? '💖' : Math.random() > 0.3 ? '💕' : '❤️'}
        </HeartEmoji>
      ))}
      
      <MainTitle
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        New Year 2026
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
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          onClick={createRipple}
        >
          <TimeNumber>{timeLeft.days || 0}</TimeNumber>
          <TimeLabel>Days</TimeLabel>
          {ripples.map(ripple => (
            <TouchRipple
              key={ripple.id}
              initial={{ scale: 0, opacity: 0.6 }}
              animate={{ scale: 4, opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{
                left: ripple.x,
                top: ripple.y,
                width: ripple.size,
                height: ripple.size,
              }}
            />
          ))}
        </TimeUnit>
        <TimeUnit
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          onClick={createRipple}
        >
          <TimeNumber>{timeLeft.hours || 0}</TimeNumber>
          <TimeLabel>Hours</TimeLabel>
          {ripples.map(ripple => (
            <TouchRipple
              key={ripple.id}
              initial={{ scale: 0, opacity: 0.6 }}
              animate={{ scale: 4, opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{
                left: ripple.x,
                top: ripple.y,
                width: ripple.size,
                height: ripple.size,
              }}
            />
          ))}
        </TimeUnit>
        <TimeUnit
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          onClick={createRipple}
        >
          <TimeNumber>{timeLeft.minutes || 0}</TimeNumber>
          <TimeLabel>Minutes</TimeLabel>
          {ripples.map(ripple => (
            <TouchRipple
              key={ripple.id}
              initial={{ scale: 0, opacity: 0.6 }}
              animate={{ scale: 4, opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{
                left: ripple.x,
                top: ripple.y,
                width: ripple.size,
                height: ripple.size,
              }}
            />
          ))}
        </TimeUnit>
        <TimeUnit
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          onClick={createRipple}
        >
          <TimeNumber>{timeLeft.seconds || 0}</TimeNumber>
          <TimeLabel>Seconds</TimeLabel>
          {ripples.map(ripple => (
            <TouchRipple
              key={ripple.id}
              initial={{ scale: 0, opacity: 0.6 }}
              animate={{ scale: 4, opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{
                left: ripple.x,
                top: ripple.y,
                width: ripple.size,
                height: ripple.size,
              }}
            />
          ))}
        </TimeUnit>
      </CountdownContainer>
      
      <PersonalMessage
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 1 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={createRipple}
      >
        Heellloooo Jiii! 2026 is almost here and I can't wait to start this new year thinking about you, missing my jaaan ka tota my gulab jamunn.
        Pichla saal, 2025 was a great year adn all cuz of you i spent some of the best moments iwth you and im so sooooo 
        happy we ended up how we are now, you are the best thign that has heppened to me and i hope it remains liek this for the rest of my life.
        Saal badal gya hai lekin mera pyaar aapke liye humesha aise hii hai balke zyada horha hai with
        passing time. I love you more than anything.
        I hope Every second that passes brings us closer to new memories, new moments, and new reasons to smile. 
        You make everything brighter! ✨
        {ripples.map(ripple => (
          <TouchRipple
            key={ripple.id}
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            style={{
              left: ripple.x,
              top: ripple.y,
              width: ripple.size,
              height: ripple.size,
            }}
          />
        ))}
      </PersonalMessage>
    </PageContainer>
  );
}
export default NewYearPage;