import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  33% { transform: translateY(-15px) rotate(120deg); }
  66% { transform: translateY(-25px) rotate(240deg); }
  100% { transform: translateY(0px) rotate(360deg); }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0) scale(1); }
  40% { transform: translateY(-30px) scale(1.1); }
  60% { transform: translateY(-15px) scale(1.05); }
`;

const heartPulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.3); }
  100% { transform: scale(1); }
`;

const sparkleRain = keyframes`
  0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
  100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
`;

const cakeGlow = keyframes`
  0% { box-shadow: 0 0 20px rgba(255, 182, 193, 0.5); }
  50% { box-shadow: 0 0 40px rgba(255, 182, 193, 0.8), 0 0 60px rgba(255, 105, 180, 0.6); }
  100% { box-shadow: 0 0 20px rgba(255, 182, 193, 0.5); }
`;

const balloonFloat = keyframes`
  0% { transform: translateY(100vh) rotate(0deg); }
  100% { transform: translateY(-100vh) rotate(360deg); }
`;

const CelebrationContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, 
    #ffb6c1 0%, 
    #ffc0cb 25%, 
    #ffe4e1 50%, 
    #f0e6ff 75%, 
    #e6e6fa 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow: hidden;
`;

const MagicalBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const SparkleRain = styled.div`
  position: absolute;
  left: ${props => props.left}%;
  font-size: ${props => props.size}px;
  animation: ${sparkleRain} ${props => props.duration}s linear infinite;
  animation-delay: ${props => props.delay}s;
`;

const FloatingBalloon = styled.div`
  position: absolute;
  left: ${props => props.left}%;
  font-size: ${props => props.size}px;
  animation: ${balloonFloat} ${props => props.duration}s linear infinite;
  animation-delay: ${props => props.delay}s;
`;

const CelebrationText = styled(motion.h1)`
  font-family: 'Dancing Script', cursive;
  font-size: clamp(4rem, 12vw, 7rem);
  font-weight: 700;
  background: linear-gradient(45deg, #ff69b4, #ff1493, #dc143c, #ff69b4);
  background-size: 300% 300%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-align: center;
  margin-bottom: 2rem;
  animation: gradientShift 3s ease infinite;
  text-shadow: 2px 2px 4px rgba(255, 105, 180, 0.3);
  z-index: 10;
  
  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
`;

const BirthdayCake = styled(motion.div)`
  font-size: clamp(6rem, 20vw, 12rem);
  margin-bottom: 2rem;
  animation: ${cakeGlow} 2s ease-in-out infinite;
  z-index: 10;
  position: relative;
  
  &::before {
    content: '🎂';
    position: absolute;
    top: 0;
    left: 0;
    filter: blur(10px);
    opacity: 0.5;
    z-index: -1;
  }
`;

const CelebrationMessage = styled(motion.p)`
  font-size: clamp(1.5rem, 5vw, 2.2rem);
  color: #8b008b;
  text-align: center;
  max-width: 700px;
  padding: 0 20px;
  margin-bottom: 3rem;
  line-height: 1.6;
  font-weight: 600;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.8);
  z-index: 10;
`;

const HeartExplosion = styled(motion.div)`
  position: absolute;
  font-size: ${props => props.size}px;
  left: ${props => props.left}%;
  top: ${props => props.top}%;
  animation: ${heartPulse} ${props => props.duration}s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
  z-index: 5;
`;

const FloatingElement = styled(motion.div)`
  position: absolute;
  font-size: ${props => props.size}px;
  left: ${props => props.left}%;
  top: ${props => props.top}%;
  animation: ${float} ${props => props.duration}s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
  z-index: 5;
`;

const BouncingElement = styled(motion.div)`
  position: absolute;
  font-size: ${props => props.size}px;
  left: ${props => props.left}%;
  top: ${props => props.top}%;
  animation: ${bounce} ${props => props.duration}s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
  z-index: 5;
`;

const CloseButton = styled(motion.button)`
  background: linear-gradient(45deg, #ff69b4, #ff1493);
  color: white;
  border: none;
  padding: 20px 40px;
  border-radius: 30px;
  font-size: 1.3rem;
  cursor: pointer;
  font-weight: 700;
  box-shadow: 0 10px 30px rgba(255, 105, 180, 0.4);
  z-index: 10;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(255, 105, 180, 0.6);
  }
`;

const MagicWand = styled(motion.div)`
  position: absolute;
  font-size: 3rem;
  left: ${props => props.left}%;
  top: ${props => props.top}%;
  z-index: 8;
`;

const sparkleEmojis = ['✨', '⭐', '🌟', '💫', '🔮'];
const balloonEmojis = ['🎈', '🎀', '🌸', '🦋', '💖', '🌺'];
const celebrationEmojis = ['🎉', '🎊', '💕', '💖', '🌈', '🦄', '👑', '💎'];
const floatingEmojis = ['🌸', '🌺', '🌻', '🌷', '🌹', '💐'];

function BirthdayCelebration({ onClose }) {
  const [sparkleRaindrops, setSparkleRaindrops] = useState([]);
  const [floatingBalloons, setFloatingBalloons] = useState([]);
  const [hearts, setHearts] = useState([]);
  const [floatingElements, setFloatingElements] = useState([]);
  const [bouncingElements, setBouncingElements] = useState([]);
  const [magicWands, setMagicWands] = useState([]);

  useEffect(() => {
    // Create sparkle rain
    const createSparkleRain = () => {
      const newSparkles = Array.from({ length: 8 }, (_, i) => ({
        id: Date.now() + i,
        left: Math.random() * 100,
        size: Math.random() * 20 + 15,
        duration: Math.random() * 3 + 2,
        delay: Math.random() * 2,
        emoji: sparkleEmojis[Math.floor(Math.random() * sparkleEmojis.length)]
      }));
      setSparkleRaindrops(prev => [...prev.slice(-20), ...newSparkles]);
    };

    // Create floating balloons
    const createBalloons = () => {
      const newBalloons = Array.from({ length: 5 }, (_, i) => ({
        id: Date.now() + i + 1000,
        left: Math.random() * 100,
        size: Math.random() * 40 + 30,
        duration: Math.random() * 8 + 6,
        delay: Math.random() * 3,
        emoji: balloonEmojis[Math.floor(Math.random() * balloonEmojis.length)]
      }));
      setFloatingBalloons(prev => [...prev.slice(-15), ...newBalloons]);
    };

    // Create heart explosions
    const newHearts = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 30 + 20,
      duration: Math.random() * 2 + 1,
      delay: Math.random() * 4
    }));
    setHearts(newHearts);

    // Create floating elements
    const newFloating = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 25 + 20,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 3,
      emoji: floatingEmojis[Math.floor(Math.random() * floatingEmojis.length)]
    }));
    setFloatingElements(newFloating);

    // Create bouncing elements
    const newBouncing = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 80 + 10,
      size: Math.random() * 35 + 25,
      duration: Math.random() * 2 + 1.5,
      delay: Math.random() * 3,
      emoji: celebrationEmojis[Math.floor(Math.random() * celebrationEmojis.length)]
    }));
    setBouncingElements(newBouncing);

    // Create magic wands
    const newWands = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      left: Math.random() * 80 + 10,
      top: Math.random() * 60 + 20
    }));
    setMagicWands(newWands);

    // Start intervals
    createSparkleRain();
    createBalloons();
    
    const sparkleInterval = setInterval(createSparkleRain, 1500);
    const balloonInterval = setInterval(createBalloons, 3000);

    return () => {
      clearInterval(sparkleInterval);
      clearInterval(balloonInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      <CelebrationContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <Confetti 
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={300}
          recycle={true}
          colors={['#ff69b4', '#ff1493', '#ffc0cb', '#ffb6c1', '#dda0dd', '#da70d6']}
          gravity={0.1}
        />
        
        <MagicalBackground>
          {sparkleRaindrops.map(sparkle => (
            <SparkleRain
              key={sparkle.id}
              left={sparkle.left}
              size={sparkle.size}
              duration={sparkle.duration}
              delay={sparkle.delay}
            >
              {sparkle.emoji}
            </SparkleRain>
          ))}
          
          {floatingBalloons.map(balloon => (
            <FloatingBalloon
              key={balloon.id}
              left={balloon.left}
              size={balloon.size}
              duration={balloon.duration}
              delay={balloon.delay}
            >
              {balloon.emoji}
            </FloatingBalloon>
          ))}
          
          {hearts.map(heart => (
            <HeartExplosion
              key={heart.id}
              left={heart.left}
              top={heart.top}
              size={heart.size}
              duration={heart.duration}
              delay={heart.delay}
            >
              💖
            </HeartExplosion>
          ))}
          
          {floatingElements.map(element => (
            <FloatingElement
              key={element.id}
              left={element.left}
              top={element.top}
              size={element.size}
              duration={element.duration}
              delay={element.delay}
            >
              {element.emoji}
            </FloatingElement>
          ))}
          
          {bouncingElements.map(element => (
            <BouncingElement
              key={element.id}
              left={element.left}
              top={element.top}
              size={element.size}
              duration={element.duration}
              delay={element.delay}
            >
              {element.emoji}
            </BouncingElement>
          ))}
          
          {magicWands.map(wand => (
            <MagicWand
              key={wand.id}
              left={wand.left}
              top={wand.top}
              initial={{ scale: 0, rotate: 0 }}
              animate={{ 
                scale: [0, 1.2, 1], 
                rotate: [0, 360, 720],
                y: [0, -20, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                delay: wand.id * 0.5 
              }}
            >
              🪄
            </MagicWand>
          ))}
        </MagicalBackground>
        
        <BirthdayCake
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ 
            delay: 0.5, 
            type: "spring", 
            stiffness: 200,
            duration: 2
          }}
        >
          🎂
        </BirthdayCake>
        
        <CelebrationText
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1.5 }}
        >
          Happy Birthday Aiman! 🎉
        </CelebrationText>
        
        <CelebrationMessage
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.5, duration: 1.2 }}
        >
          Today is all about celebrating the most amazing, beautiful, and wonderful person I know! 
          You light up every room you enter and make the world a more magical place! 💖✨🦄
        </CelebrationMessage>

        <CloseButton
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 4, duration: 1 }}
          onClick={onClose}
          whileHover={{ scale: 1.1, rotate: 5 }}
          whileTap={{ scale: 0.95 }}
        >
          Explore Birthday Surprises! 🎁✨
        </CloseButton>
      </CelebrationContainer>
    </AnimatePresence>
  );
}

export default BirthdayCelebration;