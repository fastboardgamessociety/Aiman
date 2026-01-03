import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion } from 'framer-motion';
import moment from 'moment-timezone';

const glow = keyframes`
  0% { text-shadow: 0 0 20px rgba(255, 215, 0, 0.5); }
  50% { text-shadow: 0 0 30px rgba(255, 215, 0, 0.8), 0 0 40px rgba(255, 215, 0, 0.6); }
  100% { text-shadow: 0 0 20px rgba(255, 215, 0, 0.5); }
`;

const sparkle = keyframes`
  0%, 100% { opacity: 0; transform: scale(0) rotateY(0deg); }
  50% { opacity: 1; transform: scale(1) rotateY(180deg); }
`;

const float3D = keyframes`
  0% { transform: translateY(0px) rotateX(0deg) rotateY(0deg); }
  33% { transform: translateY(-20px) rotateX(15deg) rotateY(120deg); }
  66% { transform: translateY(-10px) rotateX(-10deg) rotateY(240deg); }
  100% { transform: translateY(0px) rotateX(0deg) rotateY(360deg); }
`;

const bounce3D = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0) rotateX(0deg) scale(1); }
  40% { transform: translateY(-30px) rotateX(15deg) scale(1.1); }
  60% { transform: translateY(-15px) rotateX(-10deg) scale(1.05); }
`;

const cake3D = keyframes`
  0% { transform: rotateY(0deg) scale(1); }
  25% { transform: rotateY(90deg) scale(1.1); }
  50% { transform: rotateY(180deg) scale(1); }
  75% { transform: rotateY(270deg) scale(1.1); }
  100% { transform: rotateY(360deg) scale(1); }
`;

const gift3D = keyframes`
  0% { transform: rotateX(0deg) rotateY(0deg) translateZ(0px); }
  25% { transform: rotateX(15deg) rotateY(90deg) translateZ(20px); }
  50% { transform: rotateX(0deg) rotateY(180deg) translateZ(0px); }
  75% { transform: rotateX(-15deg) rotateY(270deg) translateZ(20px); }
  100% { transform: rotateX(0deg) rotateY(360deg) translateZ(0px); }
`;

const balloon3D = keyframes`
  0% { transform: translateY(0px) rotateZ(0deg) scale(1); }
  50% { transform: translateY(-25px) rotateZ(10deg) scale(1.1); }
  100% { transform: translateY(0px) rotateZ(0deg) scale(1); }
`;

const candle3D = keyframes`
  0% { transform: rotateY(0deg) translateZ(0px); filter: hue-rotate(0deg); }
  25% { transform: rotateY(90deg) translateZ(10px); filter: hue-rotate(90deg); }
  50% { transform: rotateY(180deg) translateZ(0px); filter: hue-rotate(180deg); }
  75% { transform: rotateY(270deg) translateZ(10px); filter: hue-rotate(270deg); }
  100% { transform: rotateY(360deg) translateZ(0px); filter: hue-rotate(360deg); }
`;

const floatText = keyframes`
  0% { transform: translateX(-100px); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateX(calc(100vw + 100px)); opacity: 0; }
`;

const CountdownContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  text-align: center;
  position: relative;
  background: linear-gradient(135deg, #ff9a9e 0%, #fecfef 50%, #fecfef 100%);
  overflow: hidden;
  perspective: 1000px;
`;

const BackgroundElements = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  transform-style: preserve-3d;
`;

const Sparkle = styled.div`
  position: absolute;
  width: 4px;
  height: 4px;
  background: #ffd700;
  border-radius: 50%;
  animation: ${sparkle} 3s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
  left: ${props => props.left}%;
  top: ${props => props.top}%;
  transform-style: preserve-3d;
`;

const Model3D = styled(motion.div)`
  position: absolute;
  font-size: ${props => props.size || '4rem'};
  left: ${props => props.left}%;
  top: ${props => props.top}%;
  transform-style: preserve-3d;
  filter: drop-shadow(0 10px 20px rgba(0, 0, 0, 0.3));
`;

const FloatingCake = styled(Model3D)`
  animation: ${cake3D} 8s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
`;

const FloatingGift = styled(Model3D)`
  animation: ${gift3D} 6s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
`;

const FloatingBalloon = styled(Model3D)`
  animation: ${balloon3D} 4s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
`;

const FloatingCandle = styled(Model3D)`
  animation: ${candle3D} 5s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
`;

const Floating3DElement = styled(Model3D)`
  animation: ${float3D} ${props => props.duration}s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
`;

const Bouncing3DElement = styled(Model3D)`
  animation: ${bounce3D} ${props => props.duration}s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
`;

const FloatingText = styled(motion.div)`
  position: absolute;
  top: ${props => props.top}%;
  left: -100px;
  font-size: clamp(1rem, 3vw, 1.5rem);
  color: rgba(255, 255, 255, 0.7);
  font-weight: 300;
  animation: ${floatText} ${props => props.duration}s linear infinite;
  animation-delay: ${props => props.delay}s;
  pointer-events: none;
  z-index: 1;
`;

const TouchRipple = styled(motion.div)`
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  pointer-events: none;
  transform: scale(0);
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

const BirthdayTitle = styled(motion.h1)`
  font-family: 'Dancing Script', cursive;
  font-size: clamp(2.5rem, 8vw, 4rem);
  color: white;
  margin-bottom: 1rem;
  animation: ${glow} 3s ease-in-out infinite;
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
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 1.5rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  min-width: 80px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transform-style: preserve-3d;
  box-shadow: 0 10px 30px rgba(255, 105, 180, 0.3);
  
  &:hover {
    background: rgba(255, 255, 255, 0.25);
    transform: translateY(-5px) rotateX(5deg);
    box-shadow: 0 15px 40px rgba(255, 105, 180, 0.4);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #ff69b4, #ff1493, #ffd700, #ff69b4);
    background-size: 300% 300%;
    border-radius: 17px;
    z-index: -1;
    animation: gradientShift 3s ease infinite;
  }
  
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
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
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  max-width: 500px;
  color: rgba(255, 255, 255, 0.95);
  font-style: italic;
  line-height: 1.6;
  margin-bottom: 2rem;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
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
  const [sparkles, setSparkles] = useState([]);
  const [floatingTexts, setFloatingTexts] = useState([]);
  const [ripples, setRipples] = useState([]);
  const [kisses, setKisses] = useState([]);
  const [hearts, setHearts] = useState([]);
  const [models3D, setModels3D] = useState([]);

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
    
    // Generate birthday kisses and hearts
    const numberOfKisses = Math.floor(Math.random() * 6) + 8;
    const numberOfHearts = Math.floor(Math.random() * 5) + 6;
    
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
        }, 4000);
      }, i * 80);
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
        }, 5000);
      }, i * 100 + 150);
    }
  };

  useEffect(() => {
    // Create sparkles for background
    const newSparkles = Array.from({ length: 40 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 3
    }));
    setSparkles(newSparkles);

    // Create floating texts
    const texts = ['Happy Birthday!', 'You\'re amazing!', 'my jaan', 'Birthday girl!'];
    const newFloatingTexts = Array.from({ length: 4 }, (_, i) => ({
      id: i,
      text: texts[i % texts.length],
      top: Math.random() * 60 + 20,
      duration: Math.random() * 8 + 12,
      delay: i * 3
    }));
    setFloatingTexts(newFloatingTexts);

    // Create 3D models
    const cakes = Array.from({ length: 6 }, (_, i) => ({
      id: `cake-${i}`,
      type: 'cake',
      emoji: '🎂',
      left: Math.random() * 80 + 10,
      top: Math.random() * 70 + 15,
      size: `${Math.random() * 2 + 3}rem`,
      delay: Math.random() * 4
    }));

    const gifts = Array.from({ length: 8 }, (_, i) => ({
      id: `gift-${i}`,
      type: 'gift',
      emoji: ['🎁', '🎀', '💝'][Math.floor(Math.random() * 3)],
      left: Math.random() * 80 + 10,
      top: Math.random() * 70 + 15,
      size: `${Math.random() * 1.5 + 2.5}rem`,
      delay: Math.random() * 3
    }));

    const balloons = Array.from({ length: 10 }, (_, i) => ({
      id: `balloon-${i}`,
      type: 'balloon',
      emoji: ['🎈', '🎀', '🌸'][Math.floor(Math.random() * 3)],
      left: Math.random() * 80 + 10,
      top: Math.random() * 70 + 15,
      size: `${Math.random() * 1.5 + 2}rem`,
      delay: Math.random() * 2
    }));

    const candles = Array.from({ length: 12 }, (_, i) => ({
      id: `candle-${i}`,
      type: 'candle',
      emoji: ['🕯️', '🔥', '✨'][Math.floor(Math.random() * 3)],
      left: Math.random() * 80 + 10,
      top: Math.random() * 70 + 15,
      size: `${Math.random() * 1 + 1.5}rem`,
      delay: Math.random() * 2.5
    }));

    const floating = Array.from({ length: 15 }, (_, i) => ({
      id: `float-${i}`,
      type: 'floating',
      emoji: ['🌟', '💫', '⭐', '🌈', '🦄', '👑'][Math.floor(Math.random() * 6)],
      left: Math.random() * 80 + 10,
      top: Math.random() * 70 + 15,
      size: `${Math.random() * 1.5 + 2}rem`,
      duration: Math.random() * 4 + 4,
      delay: Math.random() * 3
    }));

    const bouncing = Array.from({ length: 10 }, (_, i) => ({
      id: `bounce-${i}`,
      type: 'bouncing',
      emoji: ['🎉', '🎊', '💖', '💕', '🌺', '🌸'][Math.floor(Math.random() * 6)],
      left: Math.random() * 80 + 10,
      top: Math.random() * 70 + 15,
      size: `${Math.random() * 1.5 + 2.5}rem`,
      duration: Math.random() * 2 + 2,
      delay: Math.random() * 2
    }));

    setModels3D([...cakes, ...gifts, ...balloons, ...candles, ...floating, ...bouncing]);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = moment.tz('Asia/Karachi');
      // Target January 4, 2026 for birthday
      const birthday = moment.tz('2026-01-04 00:00:00', 'Asia/Karachi');
      const diff = birthday.diff(now);

      console.log('Birthday countdown - Current time:', now.format('YYYY-MM-DD HH:mm:ss'));
      console.log('Birthday countdown - Target time:', birthday.format('YYYY-MM-DD HH:mm:ss'));
      console.log('Birthday countdown - Diff:', diff);

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
    <CountdownContainer 
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
        
        {models3D.map(model => {
          switch (model.type) {
            case 'cake':
              return (
                <FloatingCake
                  key={model.id}
                  left={model.left}
                  top={model.top}
                  size={model.size}
                  delay={model.delay}
                >
                  {model.emoji}
                </FloatingCake>
              );
            case 'gift':
              return (
                <FloatingGift
                  key={model.id}
                  left={model.left}
                  top={model.top}
                  size={model.size}
                  delay={model.delay}
                >
                  {model.emoji}
                </FloatingGift>
              );
            case 'balloon':
              return (
                <FloatingBalloon
                  key={model.id}
                  left={model.left}
                  top={model.top}
                  size={model.size}
                  delay={model.delay}
                >
                  {model.emoji}
                </FloatingBalloon>
              );
            case 'candle':
              return (
                <FloatingCandle
                  key={model.id}
                  left={model.left}
                  top={model.top}
                  size={model.size}
                  delay={model.delay}
                >
                  {model.emoji}
                </FloatingCandle>
              );
            case 'floating':
              return (
                <Floating3DElement
                  key={model.id}
                  left={model.left}
                  top={model.top}
                  size={model.size}
                  duration={model.duration}
                  delay={model.delay}
                >
                  {model.emoji}
                </Floating3DElement>
              );
            case 'bouncing':
              return (
                <Bouncing3DElement
                  key={model.id}
                  left={model.left}
                  top={model.top}
                  size={model.size}
                  duration={model.duration}
                  delay={model.delay}
                >
                  {model.emoji}
                </Bouncing3DElement>
              );
            default:
              return null;
          }
        })}
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
            y: -100,
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
            y: -120,
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
          {Math.random() > 0.6 ? '💖' : Math.random() > 0.3 ? '💕' : '🎂'}
        </HeartEmoji>
      ))}
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
        Meri jaan aapka special day is almost here. I've been counting down the days 
        because I can't wait to celebrate the most amazing person I know lekin my biggest regret is not being there for you Im sooo soooo sorry i couldnt be there jaanu and im gonna make up for it fr sure lekin fro nowletss not be sad and celebrate mera fav din ever hehe 💖
      </PersonalMessage>
      
      <CountdownGrid>
        <TimeBox
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
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
        </TimeBox>
        <TimeBox
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
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
        </TimeBox>
        <TimeBox
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
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
        </TimeBox>
        <TimeBox
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
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
        </TimeBox>
      </CountdownGrid>
      
      <SorryNote
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.6, duration: 1 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={createRipple}
      >
        I wish I could be there to celebrate with you in person. I'm sorry I can't give you 
        the biggest hug right now, but know that I'm thinking of you every second and my 
        heart is always with you. Jahaan jaata mere saath ho aap adn bas humesha mere dil mein meri jaan mera jahaaan. You mean everything to me! 💕
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
      </SorryNote>
    </CountdownContainer>
  );
}

export default BirthdayCountdown;