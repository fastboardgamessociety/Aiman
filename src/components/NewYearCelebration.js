import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';

const lightBeam = keyframes`
  0% { transform: rotate(0deg) scale(1); opacity: 0.8; }
  50% { transform: rotate(180deg) scale(1.2); opacity: 1; }
  100% { transform: rotate(360deg) scale(1); opacity: 0.8; }
`;

const laserSweep = keyframes`
  0% { transform: translateX(-100vw) rotate(-45deg); }
  100% { transform: translateX(100vw) rotate(45deg); }
`;

const sparkleExplosion = keyframes`
  0% { transform: scale(0) rotate(0deg); opacity: 1; }
  50% { transform: scale(1.5) rotate(180deg); opacity: 0.8; }
  100% { transform: scale(3) rotate(360deg); opacity: 0; }
`;

const textGlow = keyframes`
  0% { text-shadow: 0 0 20px #fff, 0 0 40px #fff, 0 0 60px #fff; }
  50% { text-shadow: 0 0 30px #ffd700, 0 0 60px #ffd700, 0 0 90px #ffd700, 0 0 120px #ffd700; }
  100% { text-shadow: 0 0 20px #fff, 0 0 40px #fff, 0 0 60px #fff; }
`;

const droneMove = keyframes`
  0% { transform: translateX(-100px) translateY(0px); }
  25% { transform: translateX(25vw) translateY(-20px); }
  50% { transform: translateX(50vw) translateY(10px); }
  75% { transform: translateX(75vw) translateY(-15px); }
  100% { transform: translateX(calc(100vw + 100px)) translateY(5px); }
`;

const fireworkLaunch = keyframes`
  0% { transform: translateY(100vh) scale(0.5); opacity: 1; }
  70% { transform: translateY(20vh) scale(0.8); opacity: 1; }
  100% { transform: translateY(20vh) scale(1); opacity: 0; }
`;

const fireworkExplode = keyframes`
  0% { transform: scale(0); opacity: 1; }
  50% { transform: scale(1); opacity: 0.8; }
  100% { transform: scale(2.5); opacity: 0; }
`;

const CelebrationOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at center, #0a0a0a 0%, #000 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow: hidden;
`;

const LightShow = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const LightBeam = styled.div`
  position: absolute;
  width: 4px;
  height: 100vh;
  background: linear-gradient(to bottom, 
    transparent 0%, 
    ${props => props.color} 20%, 
    ${props => props.color} 80%, 
    transparent 100%);
  left: ${props => props.left}%;
  animation: ${lightBeam} ${props => props.duration}s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
  filter: blur(2px);
  box-shadow: 0 0 20px ${props => props.color};
`;

const LaserBeam = styled.div`
  position: absolute;
  width: 200vw;
  height: 3px;
  background: linear-gradient(to right, 
    transparent 0%, 
    ${props => props.color} 50%, 
    transparent 100%);
  top: ${props => props.top}%;
  animation: ${laserSweep} ${props => props.duration}s linear infinite;
  animation-delay: ${props => props.delay}s;
  filter: blur(1px);
  box-shadow: 0 0 15px ${props => props.color};
`;

const SparkleExplosion = styled.div`
  position: absolute;
  width: 20px;
  height: 20px;
  background: radial-gradient(circle, #ffd700 0%, transparent 70%);
  border-radius: 50%;
  left: ${props => props.left}%;
  top: ${props => props.top}%;
  animation: ${sparkleExplosion} ${props => props.duration}s ease-out infinite;
  animation-delay: ${props => props.delay}s;
  
  &::before {
    content: '';
    position: absolute;
    width: 40px;
    height: 40px;
    background: radial-gradient(circle, rgba(255, 215, 0, 0.3) 0%, transparent 70%);
    border-radius: 50%;
    top: -10px;
    left: -10px;
    animation: ${sparkleExplosion} ${props => props.duration * 1.2}s ease-out infinite;
    animation-delay: ${props => props.delay}s;
  }
`;

const DroneShow = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const Drone = styled(motion.div)`
  position: absolute;
  top: ${props => props.top}%;
  font-size: 2rem;
  animation: ${droneMove} ${props => props.duration}s linear infinite;
  animation-delay: ${props => props.delay}s;
  filter: drop-shadow(0 0 10px #ffd700);
`;

const DroneText = styled.div`
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  font-family: 'Dancing Script', cursive;
  font-size: clamp(2rem, 8vw, 4rem);
  color: #ffd700;
  text-align: center;
  animation: ${textGlow} 2s ease-in-out infinite;
  z-index: 10;
`;

const CelebrationText = styled(motion.h1)`
  font-family: 'Dancing Script', cursive;
  font-size: clamp(4rem, 15vw, 8rem);
  font-weight: 700;
  color: #fff;
  text-align: center;
  margin-bottom: 1rem;
  animation: ${textGlow} 3s ease-in-out infinite;
  z-index: 10;
`;

const CelebrationSubtext = styled(motion.p)`
  font-size: clamp(1.5rem, 6vw, 3rem);
  color: #ffd700;
  text-align: center;
  max-width: 800px;
  padding: 0 20px;
  font-weight: 600;
  z-index: 10;
  text-shadow: 0 0 20px #ffd700;
`;

const FireworkContainer = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const FireworkLauncher = styled.div`
  position: absolute;
  bottom: 0;
  left: ${props => props.left}%;
  width: 6px;
  height: 6px;
  background: ${props => props.color};
  border-radius: 50%;
  animation: ${fireworkLaunch} ${props => props.duration}s ease-out;
  animation-delay: ${props => props.delay}s;
  animation-fill-mode: both;
`;

const FireworkExplosion = styled.div`
  position: absolute;
  left: ${props => props.x}%;
  top: ${props => props.y}%;
  width: 8px;
  height: 8px;
  background: ${props => props.color};
  border-radius: 50%;
  
  &::before {
    content: '';
    position: absolute;
    top: -60px;
    left: -60px;
    width: 120px;
    height: 120px;
    border: 4px solid ${props => props.color};
    border-radius: 50%;
    animation: ${fireworkExplode} 2s ease-out forwards;
    animation-delay: ${props => props.delay}s;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -80px;
    left: -80px;
    width: 160px;
    height: 160px;
    background: radial-gradient(circle, ${props => props.color} 0%, transparent 70%);
    border-radius: 50%;
    animation: ${fireworkExplode} 2.5s ease-out forwards;
    animation-delay: ${props => props.delay}s;
  }
`;

const MegaFirework = styled(motion.div)`
  position: absolute;
  width: 8px;
  height: 8px;
  background: ${props => props.color};
  border-radius: 50%;
  left: ${props => props.x}px;
  top: ${props => props.y}px;
  
  &::before {
    content: '';
    position: absolute;
    top: -40px;
    left: -40px;
    width: 80px;
    height: 80px;
    border: 4px solid ${props => props.color};
    border-radius: 50%;
    opacity: 0;
    animation: megaExplode 2s ease-out forwards;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -60px;
    left: -60px;
    width: 120px;
    height: 120px;
    background: radial-gradient(circle, ${props => props.color} 0%, transparent 70%);
    border-radius: 50%;
    opacity: 0;
    animation: megaExplode 2.5s ease-out forwards;
  }
  
  @keyframes megaExplode {
    0% { transform: scale(0); opacity: 1; }
    50% { transform: scale(1); opacity: 0.8; }
    100% { transform: scale(3); opacity: 0; }
  }
`;

function NewYearCelebration({ onClose }) {
  const [lightBeams, setLightBeams] = useState([]);
  const [laserBeams, setLaserBeams] = useState([]);
  const [sparkles, setSparkles] = useState([]);
  const [drones, setDrones] = useState([]);
  const [fireworkLaunchers, setFireworkLaunchers] = useState([]);
  const [fireworkExplosions, setFireworkExplosions] = useState([]);
  const [megaFireworks, setMegaFireworks] = useState([]);

  useEffect(() => {
    // Create light beams
    const beams = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#ffd700', '#ff8e8e', '#dda0dd'][Math.floor(Math.random() * 6)],
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 2
    }));
    setLightBeams(beams);

    // Create laser beams
    const lasers = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      top: Math.random() * 80 + 10,
      color: ['#ff0080', '#00ff80', '#8000ff', '#ff8000', '#0080ff'][Math.floor(Math.random() * 5)],
      duration: Math.random() * 2 + 1,
      delay: Math.random() * 3
    }));
    setLaserBeams(lasers);

    // Create sparkle explosions
    const sparkleArray = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: Math.random() * 2 + 1,
      delay: Math.random() * 4
    }));
    setSparkles(sparkleArray);

    // Create drone show
    const droneArray = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      top: Math.random() * 30 + 10,
      duration: Math.random() * 8 + 6,
      delay: i * 2
    }));
    setDrones(droneArray);

    // Create firework launchers
    const createFireworkLaunchers = () => {
      const newLaunchers = Array.from({ length: 8 }, (_, i) => ({
        id: Date.now() + i,
        left: Math.random() * 100,
        color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffd700', '#dda0dd'][Math.floor(Math.random() * 6)],
        duration: Math.random() * 2 + 1.5,
        delay: Math.random() * 1
      }));
      setFireworkLaunchers(prev => [...prev.slice(-20), ...newLaunchers]);
      
      // Create explosions after launch
      setTimeout(() => {
        const newExplosions = newLaunchers.map(launcher => ({
          id: launcher.id + 1000,
          x: launcher.left,
          y: Math.random() * 30 + 20,
          color: launcher.color,
          delay: 0
        }));
        setFireworkExplosions(prev => [...prev.slice(-15), ...newExplosions]);
      }, 1500);
    };

    // Create mega fireworks
    const createMegaFireworks = () => {
      const newFireworks = Array.from({ length: 12 }, (_, i) => ({
        id: Date.now() + i,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight * 0.6,
        color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffd700', '#dda0dd'][Math.floor(Math.random() * 6)]
      }));
      setMegaFireworks(prev => [...prev.slice(-10), ...newFireworks]);
    };

    createFireworkLaunchers();
    createMegaFireworks();
    
    const launcherInterval = setInterval(createFireworkLaunchers, 2000);
    const fireworkInterval = setInterval(createMegaFireworks, 1800);

    return () => {
      clearInterval(launcherInterval);
      clearInterval(fireworkInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      <CelebrationOverlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <Confetti 
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={600}
          recycle={true}
          gravity={0.2}
          colors={['#ff6b6b', '#4ecdc4', '#45b7d1', '#ffd700', '#ff8e8e', '#dda0dd']}
        />
        
        <LightShow>
          {lightBeams.map(beam => (
            <LightBeam
              key={beam.id}
              left={beam.left}
              color={beam.color}
              duration={beam.duration}
              delay={beam.delay}
            />
          ))}
          
          {laserBeams.map(laser => (
            <LaserBeam
              key={laser.id}
              top={laser.top}
              color={laser.color}
              duration={laser.duration}
              delay={laser.delay}
            />
          ))}
          
          {sparkles.map(sparkle => (
            <SparkleExplosion
              key={sparkle.id}
              left={sparkle.left}
              top={sparkle.top}
              duration={sparkle.duration}
              delay={sparkle.delay}
            />
          ))}
        </LightShow>

        <FireworkContainer>
          {fireworkLaunchers.map(launcher => (
            <FireworkLauncher
              key={launcher.id}
              left={launcher.left}
              color={launcher.color}
              duration={launcher.duration}
              delay={launcher.delay}
            />
          ))}
          
          {fireworkExplosions.map(explosion => (
            <FireworkExplosion
              key={explosion.id}
              x={explosion.x}
              y={explosion.y}
              color={explosion.color}
              delay={explosion.delay}
            />
          ))}
        </FireworkContainer>

        <DroneShow>
          {drones.map(drone => (
            <Drone
              key={drone.id}
              top={drone.top}
              duration={drone.duration}
              delay={drone.delay}
            >
              ✈️
            </Drone>
          ))}
        </DroneShow>

        <DroneText
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2, duration: 2 }}
        >
          Happy New Year MiLoveee! 💖
        </DroneText>
        
        {megaFireworks.map(firework => (
          <MegaFirework
            key={firework.id}
            x={firework.x}
            y={firework.y}
            color={firework.color}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        ))}
        
        <CelebrationText
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 3, duration: 2, type: "spring", stiffness: 100 }}
        >
          🎉 2026 AAAGYAAAA! 🎉
        </CelebrationText>
        
        <CelebrationSubtext
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 4.5, duration: 1.5 }}
        >
          Welcome to our year jaanu, im gonna love you more this year adn do the best i can.  ✨
        </CelebrationSubtext>
      </CelebrationOverlay>
    </AnimatePresence>
  );
}

export default NewYearCelebration