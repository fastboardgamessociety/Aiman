import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const GalleryContainer = styled.div`
  min-height: 100vh;
  padding: 100px 20px 20px;
  
  @media (max-width: 768px) {
    padding: 120px 20px 20px;
  }
`;

const SectionTitle = styled(motion.h2)`
  font-family: 'Dancing Script', cursive;
  font-size: clamp(2rem, 6vw, 3rem);
  color: white;
  text-align: center;
  margin-bottom: 2rem;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  gap: 1rem;
  flex-wrap: wrap;
`;

const SubTab = styled.button`
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.2)'};
  color: ${props => props.active ? '#333' : 'white'};
  border: none;
  padding: 0.8rem 1.5rem;
  border-radius: 20px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const ContentContainer = styled(motion.div)`
  max-width: 1000px;
  margin: 0 auto;
`;

const MemoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const MemoryCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const MemoryImage = styled.div`
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, #ff9a9e, #fecfef);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4rem;
  position: relative;
  overflow: hidden;
`;

const MemoryCaption = styled.div`
  padding: 1.5rem;
  text-align: center;
`;

const MemoryTitle = styled.h4`
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 0.5rem;
  font-weight: 600;
`;

const MemoryDescription = styled.p`
  color: #666;
  font-size: 0.95rem;
  line-height: 1.5;
`;

const LoveList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
`;

const LoveCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
`;

const LoveEmoji = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const LoveTitle = styled.h4`
  font-size: 1.4rem;
  color: #ff6b6b;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const LoveDescription = styled.p`
  color: #555;
  line-height: 1.6;
  font-size: 1rem;
`;

const MessageCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 25px;
  padding: 2.5rem;
  text-align: center;
  margin-bottom: 2rem;
`;

const MessageTitle = styled.h3`
  font-family: 'Dancing Script', cursive;
  font-size: 2.5rem;
  color: #ff6b6b;
  margin-bottom: 1.5rem;
`;

const MessageText = styled.p`
  font-size: 1.1rem;
  line-height: 1.7;
  color: #555;
  max-width: 700px;
  margin: 0 auto;
`;

function BirthdayGallery() {
  const [activeSubTab, setActiveSubTab] = useState('memories');

  const memories = [
    {
      id: 1,
      emoji: '☕',
      title: 'Coffee Shop Talks',
      description: 'Those endless conversations over coffee where time just stopped. Your laugh echoing through the café, making everyone smile.'
    },
    {
      id: 2,
      emoji: '🌅',
      title: 'Sunrise Together',
      description: 'That early morning when we watched the sunrise. You looked so peaceful and beautiful, I wished that moment could last forever.'
    },
    {
      id: 3,
      emoji: '🎬',
      title: 'Movie Night',
      description: 'Cuddled up watching movies, you falling asleep on my shoulder. Those quiet, perfect moments that mean everything.'
    },
    {
      id: 4,
      emoji: '🌸',
      title: 'Spring Walk',
      description: 'Walking through the park in spring, you stopping to smell every flower. Your joy in simple things is infectious.'
    },
    {
      id: 5,
      emoji: '🍕',
      title: 'Pizza Date',
      description: 'Our first official date. You got sauce on your nose and laughed so hard. That\'s when I knew you were special.'
    },
    {
      id: 6,
      emoji: '🌙',
      title: 'Stargazing',
      description: 'Late night talks under the stars. You pointing out constellations, me just watching you light up talking about dreams.'
    }
  ];

  const loveThings = [
    {
      emoji: '😊',
      title: 'Your Smile',
      description: 'The way your whole face lights up when you smile. It\'s like sunshine breaking through clouds - instant happiness for everyone around you.'
    },
    {
      emoji: '👀',
      title: 'Your Eyes',
      description: 'Those beautiful eyes that sparkle with mischief and kindness. I could get lost in them for hours and never want to find my way out.'
    },
    {
      emoji: '😂',
      title: 'Your Laugh',
      description: 'Your infectious laugh that makes everyone around you happy. It\'s the most beautiful sound in the world to me.'
    },
    {
      emoji: '🧠',
      title: 'Your Mind',
      description: 'How incredibly smart and thoughtful you are. The way you see the world differently and make me think about things in new ways.'
    },
    {
      emoji: '❤️',
      title: 'Your Heart',
      description: 'Your kind, caring heart that loves so deeply. The way you care about others and make everyone feel special and valued.'
    },
    {
      emoji: '💪',
      title: 'Your Strength',
      description: 'How strong and resilient you are, even when things get tough. You face challenges with grace and never give up.'
    }
  ];

  const renderContent = () => {
    switch (activeSubTab) {
      case 'memories':
        return (
          <ContentContainer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <MessageCard>
              <MessageTitle>Our Beautiful Memories 💕</MessageTitle>
              <MessageText>
                Every moment we've shared has been a treasure. These are just some of the memories 
                that make my heart full whenever I think about them. Each one is a piece of our story together.
              </MessageText>
            </MessageCard>
            
            <MemoryGrid>
              {memories.map((memory, index) => (
                <MemoryCard
                  key={memory.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.02 }}
                >
                  <MemoryImage>
                    <span style={{ fontSize: '4rem' }}>{memory.emoji}</span>
                  </MemoryImage>
                  <MemoryCaption>
                    <MemoryTitle>{memory.title}</MemoryTitle>
                    <MemoryDescription>{memory.description}</MemoryDescription>
                  </MemoryCaption>
                </MemoryCard>
              ))}
            </MemoryGrid>
          </ContentContainer>
        );
      
      case 'love':
        return (
          <ContentContainer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <MessageCard>
              <MessageTitle>What I Love About You 💖</MessageTitle>
              <MessageText>
                There are so many things I love about you, Aiman. You're absolutely incredible 
                in every way, and these are just a few of the countless reasons why you mean the world to me.
              </MessageText>
            </MessageCard>
            
            <LoveList>
              {loveThings.map((thing, index) => (
                <LoveCard
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                >
                  <LoveEmoji>{thing.emoji}</LoveEmoji>
                  <LoveTitle>{thing.title}</LoveTitle>
                  <LoveDescription>{thing.description}</LoveDescription>
                </LoveCard>
              ))}
            </LoveList>
          </ContentContainer>
        );
      
      case 'message':
        return (
          <ContentContainer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <MessageCard>
              <MessageTitle>A Letter Just for You 💌</MessageTitle>
              <MessageText style={{ fontSize: '1.2rem', lineHeight: '1.8', textAlign: 'left' }}>
                My dearest Aiman,<br /><br />
                
                Happy Birthday, beautiful! 🎉 I wish I could be there with you right now, 
                holding your hand and seeing that gorgeous smile light up as you celebrate another year of being absolutely amazing.<br /><br />
                
                I'm so sorry I can't be there in person. The distance feels especially hard today 
                when all I want is to give you the biggest hug and celebrate together. But even though 
                we're miles apart, please know that you're in my heart every single moment.<br /><br />
                
                You are the most incredible person I've ever met. Your kindness touches everyone around you, 
                your intelligence amazes me daily, and your beauty - inside and out - takes my breath away. 
                You make ordinary moments feel magical just by being you.<br /><br />
                
                I love how you laugh at the silliest things, how you care so deeply about others, 
                how you see beauty in everything around you. I love your curiosity, your strength, 
                your gentle heart. I love the way you make me want to be a better person.<br /><br />
                
                Today is all about celebrating YOU - the wonderful, amazing, beautiful person you are. 
                You deserve all the happiness in the world, and I promise I'm working every day toward 
                the moment when we can celebrate together again.<br /><br />
                
                Until then, know that you are loved beyond measure, cherished more than words can express, 
                and thought about every single day. You are my sunshine, my inspiration, and my heart.<br /><br />
                
                Happy Birthday, my beautiful Aiman. I love you more than you'll ever know! 💖<br /><br />
                
                With all my love and birthday wishes,<br />
                Your biggest admirer ❤️
              </MessageText>
            </MessageCard>
          </ContentContainer>
        );
      
      default:
        return null;
    }
  };

  return (
    <GalleryContainer>
      <SectionTitle
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        For My Beautiful Aiman 💖
      </SectionTitle>
      
      <TabContainer>
        <SubTab 
          active={activeSubTab === 'memories'} 
          onClick={() => setActiveSubTab('memories')}
        >
          📸 Our Memories
        </SubTab>
        <SubTab 
          active={activeSubTab === 'love'} 
          onClick={() => setActiveSubTab('love')}
        >
          💕 Why I Love You
        </SubTab>
        <SubTab 
          active={activeSubTab === 'message'} 
          onClick={() => setActiveSubTab('message')}
        >
          💌 Birthday Letter
        </SubTab>
      </TabContainer>
      
      <AnimatePresence mode="wait">
        {renderContent()}
      </AnimatePresence>
    </GalleryContainer>
  );
}

export default BirthdayGallery;