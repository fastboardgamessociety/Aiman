import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';

const explode = keyframes`
  0% {
    opacity: 1;
    transform: scale(0);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(1.5);
  }
`;

const shoot = keyframes`
  0% {
    transform: translateY(100vh) scale(0);
    opacity: 1;
  }
  70% {
    transform: translateY(0) scale(0.5);
    opacity: 1;
  }
  100% {
    transform: translateY(0) scale(1);
    opacity: 0;
  }
`;

const FireworksContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 10;
`;

const Firework = styled.div`
  position: absolute;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: ${props => props.color};
  animation: ${shoot} 2s ease-out;
  left: ${props => props.left}%;
  animation-delay: ${props => props.delay}s;
  
  &::before {
    content: '';
    position: absolute;
    top: -50px;
    left: -50px;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    border: 2px solid ${props => props.color};
    animation: ${explode} 1s ease-out;
    animation-delay: ${props => props.delay + 1.4}s;
    animation-fill-mode: both;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: -30px;
    left: -30px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: radial-gradient(circle, ${props => props.color} 0%, transparent 70%);
    animation: ${explode} 1.5s ease-out;
    animation-delay: ${props => props.delay + 1.4}s;
    animation-fill-mode: both;
  }
`;

const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7', '#dda0dd', '#98d8c8'];

function Fireworks() {
  const [fireworks, setFireworks] = useState([]);

  useEffect(() => {
    const createFirework = () => ({
      id: Math.random(),
      left: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 2
    });

    // Create initial fireworks
    const initialFireworks = Array.from({ length: 8 }, createFirework);
    setFireworks(initialFireworks);

    // Add more fireworks periodically
    const interval = setInterval(() => {
      setFireworks(prev => [
        ...prev.slice(-10), // Keep only last 10 to prevent memory issues
        ...Array.from({ length: 3 }, createFirework)
      ]);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <FireworksContainer>
      {fireworks.map(firework => (
        <Firework
          key={firework.id}
          left={firework.left}
          color={firework.color}
          delay={firework.delay}
        />
      ))}
    </FireworksContainer>
  );
}

export default Fireworks;