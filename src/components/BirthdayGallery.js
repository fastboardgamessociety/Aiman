import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

// Import media files
import Birthday from '../Media/Birthday.jpeg';
import buns from '../Media/buns.mov';
import car from '../Media/car.jpg';
import carp2 from '../Media/carp2.PNG';
import chess from '../Media/chess.MP4';
import dome from '../Media/dome.jpeg';
import emen from '../Media/emen.JPG';
import family from '../Media/family.jpg';
import family2 from '../Media/family2.jpeg';
import iftar1 from '../Media/iftar1.MP4';
import iftar2 from '../Media/iftar2.MP4';
import iftar3 from '../Media/iftar3.jpeg';
import psl from '../Media/psl.jpeg';
import ring from '../Media/ring.MP4';
import rome from '../Media/rome.jpg';
import shaghf from '../Media/shaghf.JPG';
import soventure from '../Media/soventure.jpeg';
import tim1 from '../Media/tim1.MP4';
import tim2 from '../Media/tim2.mov';
import uni from '../Media/uni.MP4';
import unip2 from '../Media/unip2.MP4';
import unip3 from '../Media/unip3.JPG';
import valentines from '../Media/valentines.mov';
import welcome from '../Media/welcome.jpeg';
import concert1 from '../Media/concert1.jpeg';
import concert2 from '../Media/concert2.MP4';

// Import music files
import perfectSong from '../music_files/pouf-salon.fr - Ed Sheeran - Perfect (Official Music Video).mp3';
import goatSong from '../music_files/pouf-salon.fr - Diljit Dosanjh - G.O.A.T. (Official Music Video).mp3';
import tareefanSong from '../music_files/pouf-salon.fr - Karan Aujla DIVINE - Tareefan.mp3';
import hasanSong from '../music_files/pouf-salon.fr - Hasan Raheem - MEMORIES Justin Bibis Shehryar (Lyric Video).mp3';

const GalleryContainer = styled.div`
  min-height: 100vh;
  padding: 100px 20px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #ff9a9e 100%);
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 80%, rgba(255, 182, 193, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255, 105, 180, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(221, 160, 221, 0.2) 0%, transparent 50%);
    pointer-events: none;
  }
  
  @media (max-width: 768px) {
    padding: 120px 20px 20px;
  }
`;

const FloatingElement = styled.div`
  position: absolute;
  font-size: ${props => props.size || '2rem'};
  left: ${props => props.left}%;
  top: ${props => props.top}%;
  animation: float ${props => props.duration || 6}s ease-in-out infinite;
  animation-delay: ${props => props.delay || 0}s;
  opacity: 0.6;
  pointer-events: none;
  z-index: 1;
  
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(180deg); }
  }
`;

const SparkleBackground = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
`;

const Sparkle = styled.div`
  position: absolute;
  width: 4px;
  height: 4px;
  background: ${props => props.color || '#ffd700'};
  border-radius: 50%;
  left: ${props => props.left}%;
  top: ${props => props.top}%;
  animation: sparkle 3s ease-in-out infinite;
  animation-delay: ${props => props.delay}s;
  
  @keyframes sparkle {
    0%, 100% { opacity: 0; transform: scale(0); }
    50% { opacity: 1; transform: scale(1); }
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
  cursor: pointer;
  
  img, video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: transform 0.3s ease;
  }
  
  video {
    background: #000;
  }
  
  &:hover img, &:hover video {
    transform: scale(1.05);
  }
  
  /* Fallback for broken media */
  &::after {
    content: '📷';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 3rem;
    color: rgba(255, 255, 255, 0.7);
    z-index: 1;
    display: none;
  }
  
  img[style*="display: none"] + &::after,
  video[style*="display: none"] + &::after {
    display: block;
  }
`;

const SwipeContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  border-radius: 15px 15px 0 0;
  cursor: pointer;
  background: linear-gradient(135deg, #ff9a9e, #fecfef);
  
  img, video {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    transition: transform 0.3s ease;
  }
  
  video {
    background: #000;
  }
  
  &:hover img, &:hover video {
    transform: scale(1.05);
  }
`;

const SwipeIndicator = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 5px;
  z-index: 10;
`;

const Dot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.5)'};
  transition: all 0.3s ease;
`;

const SwipeButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.direction === 'left' ? 'left: 10px;' : 'right: 10px;'}
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  ${SwipeContainer}:hover & {
    opacity: 1;
  }
`;

const FullscreenModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
  padding: 20px;
`;

const FullscreenContent = styled(motion.div)`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FullscreenMedia = styled.div`
  max-width: 100%;
  max-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  
  img, video {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: 10px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  }
`;

const FullscreenCaption = styled.div`
  color: white;
  text-align: center;
  margin-top: 20px;
  max-width: 600px;
`;

const FullscreenTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #ffd700;
`;

const FullscreenDescription = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  opacity: 0.9;
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
`;

const NavigationButton = styled(motion.button)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  ${props => props.direction === 'left' ? 'left: 20px;' : 'right: 20px;'}
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
  }
  
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    ${props => props.direction === 'left' ? 'left: 10px;' : 'right: 10px;'}
  }
`;

const MusicCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 2rem;
  text-align: center;
  box-shadow: 0 10px 30px rgba(255, 105, 180, 0.2);
  border: 1px solid rgba(255, 105, 180, 0.1);
`;

const MusicEmoji = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
`;

const MusicTitle = styled.h4`
  font-size: 1.4rem;
  color: #ff6b6b;
  margin-bottom: 1rem;
  font-weight: 600;
`;

const MusicDescription = styled.p`
  color: #555;
  line-height: 1.6;
  font-size: 1rem;
  margin-bottom: 1.5rem;
`;

const AudioPlayer = styled.audio`
  width: 100%;
  max-width: 400px;
  height: 40px;
  
  &::-webkit-media-controls-panel {
    background-color: #ff6b6b;
  }
  
  &::-webkit-media-controls-play-button {
    background-color: #ff6b6b;
    border-radius: 50%;
  }
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

const ContinueButton = styled(motion.button)`
  background: linear-gradient(45deg, #ff69b4, #ff1493);
  color: white;
  border: none;
  padding: 20px 40px;
  border-radius: 30px;
  font-size: 1.2rem;
  cursor: pointer;
  font-weight: 700;
  margin-top: 3rem;
  box-shadow: 0 10px 30px rgba(255, 105, 180, 0.4);
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 15px 40px rgba(255, 105, 180, 0.6);
  }
`;

function BirthdayGallery({ onComplete }) {
  const [activeSubTab, setActiveSubTab] = useState('memories');
  const [currentMediaIndex, setCurrentMediaIndex] = useState({});
  const [fullscreenMedia, setFullscreenMedia] = useState(null);
  const [fullscreenIndex, setFullscreenIndex] = useState(0);
  const [backgroundElements, setBackgroundElements] = useState([]);
  const [sparkles, setSparkles] = useState([]);

  // Initialize background elements
  useEffect(() => {
    const floatingEmojis = ['💖', '🌸', '🦋', '✨', '💕', '🌺', '🎀', '💫', '🌟', '💐', '🎵', '💝', '🌈', '🦄', '👑'];
    const colors = ['#ffd700', '#ff69b4', '#ff1493', '#dda0dd', '#87ceeb'];
    
    const newFloatingElements = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      emoji: floatingEmojis[Math.floor(Math.random() * floatingEmojis.length)],
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: `${Math.random() * 1.5 + 1.5}rem`,
      duration: Math.random() * 4 + 4,
      delay: Math.random() * 3
    }));
    
    const newSparkles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 3
    }));
    
    setBackgroundElements(newFloatingElements);
    setSparkles(newSparkles);
  }, []);

  // Media data with actual files
  const memories = [
    {
      id: 1,
      title: 'The Day it All Started',
      description: 'Appka special day that i randomly decided to celebrate being a cheapra trying to make u fall for me hehe and i guess it worked yassss!! Wo poora din hii soo sooo good frm d grill to our weird lunch together itni awkward baaton ke saath and then the surprise that i felt ke aapko lagra kia creepy insaan hai itni ajeeb gali mein leke jaara',
      media: [Birthday],
      hasSwipe: false
    },
    {
      id: 2,
      title: 'Cutest dayy',
      description: ' You are and always will be familya dn issi liey this day was really special cuz the first tiem i met someone from your family and glad to say theyre as amazing as oyu balek sachi poocho tou ziyadaaa hehe. Inni cutoo family to always tell you how much you are lovedd. These precious times together mean everything to me jaanu.',
      media: [family, family2],
      hasSwipe: true
    },
    {
      id: 3,
      title: 'Rome dayss',
      description: ' UFF ye tou kya hii din tha itne mazedaar after i got back from AE in may and hum pehli dafa thore door rehne ke baad hangout karne gaye adn uff the first hug felt liek heaven i had missed you soo soo mcuh as i do rnn. aur uff itne maze uss din jo barf khayi thi aapne mujeh pata chalgya ye bhi meri tarah hii poori pagal lool',
      media: [rome],
      hasSwipe: false
    },
    {
      id: 4,
      title: 'University ke pyaare pyaare din onli cuz of u',
      description: 'AAAAHh i cant even freakin believe i got you bhaiii warna mein kaise guzarta ye time uni mein uff legit 0 expectatiosn aur hazaar log mujhe taane maar chuek thay ke uni mein tou sabki shaadi hojaati aur tumhari tou study bhi ni hori ouch bas pir meine aisi gurl pull karli sabke munh shut hehe aaaahhh cant even imagine going to another unia dn not finding u uff.',
      media: [uni, welcome, soventure, unip2, unip3],
      hasSwipe: true
    },
    {
      id: 5,
      title: 'Iftariyaaan',
      description: 'THis is my fav memory fo us together idk what it is mayeb cuz i had expected somehtin totally different for that day jo bataya bhi tha aapko lol lekin bas this day is always ogonna be special for me cuz that is the day jis din i was like yes waleed aapki duain kabool adn now congrats you hae the best girl in thte world all yours the onyl perfect one to exist.',
      media: [iftar1, iftar2, iftar3],
      hasSwipe: true
    },
    {
      id: 6,
      title: 'PSL Fun',
      description: 'Cricket season excitement, i was so happppy to see Your passion for PSL and mein tha ke shukar hai poori zindagi maze ab agathe dekheinge psl ehhehe, uff thora sa jealous bhi hota tha ke ye babar babar y akrti rehti but jaanu anything for you my pyaari my everythinggg aapke liye itni si bardasht np',
      media: [psl],
      hasSwipe: false
    },
    {
      id: 7,
      title: 'Chess Master',
      description: ' Mr President and Mrs President aka VP, aaah i still remeber the day jisdin humne ye bat pehli dafa discuss kit hi ek society banani ik aapne uss waqt socha hoga kya shoda banda banaya hai khayaali pulao banata rehta lekin i was liek yaar ye akrna hai for my passiona and she must be a part of it too uff and best decision jo jo humne already kiya hai and jo jo inshaAllah iss semester karna hai (sabse bara kaam aapko sikhani chess adn interest develop tanko)',
      media: [chess],
      hasSwipe: false
    },
    {
      id: 8,
      title: 'Gaari mein masti',
      description: 'Ye tou aapki bhi fav cheez xd, but bas i didnt expect ke ham itna hangout kia akreinge gaari mein jitna hum karte lekin we do have liek a lot lot of memories in this car adn hopefully mazeed banani not just this car but jitni bhi aage in the future in PAkistan our of PAK. Aur ye gaari sambhaal ke rakhni huemsha cuz this car has literally seen us falling in love, frm the day we met and went to cafe d grill to aaj kal jab hum itne maze hehe shukar hai it all worked out.' ,
      media: [car, carp2],
      hasSwipe: true
    },
    {
      id: 10,
      title: 'Valentine\'s Day',
      description: ' iss din se pehle bas ye yaad mujhe ke 3 din mein soya ni tha and then proposign on this day asking you out and you sayign yes, despite alll the deeds before this iss din mujhe sure huwa ke yes waleed bhai jaan mubarak hou she likes you too eheh. Bas biggest regret phir bhi aaj tak mera ke wo phool kharab hogye jo aapke fav thayyy aaaahhhh but chalo aise 1000 phool qurbaan aappe jaanu',
      media: [valentines, ring],
      hasSwipe: false
    },
    {
      id: 11,
      title: 'Tim Hortons 2',
      description: 'Our favorite coffee spot dates and a lot more too but yes. ooo aur jo bahane se pehli dafa apko leke gya tha ke parhne jayeinge sessionals keliye lol. mere drame ya tou aap samajhti ni ya khud jaanke involcve cutie.',
      media: [tim1, tim2],
      hasSwipe: true
    },
    {
      id: 13,
      title: 'Dome Visit',
      description: '@ bandar in one frame mashaAllah but aik zyada pyaara. bas ye din bhi kya hii baat iski tou i first thoguht ni jana chaye ke awein ajeeb lagta bahi were not even that close or whatever lekin meine kaha bas waleed tensun not.',
      media: [dome],
      hasSwipe: false
    },
    {
      id: 14,
      title: 'Emen Moments',
      description: 'Horiible food with you still tastes like heaven because uff itna bura khana abhi tak ulti aati soch ke lkein itna maze ka din humen itni cute baatein hangout itna maze ka adn then afterparty ki tou kya hii baaaaat.',
      media: [emen],
      hasSwipe: false
    },
    {
      id: 15,
      title: 'Shaghf Times',
      description: 'Shaghf always special for me cuz me bachpan se fav hangout spot lekin going there with you meant somethign different to me and jitni humen udhar beth ke logo ki chughliyan ki thien na wao wo tou cherry on the top jo nashaiyon ke darmiyan bethke humne maze hehe',
      media: [shaghf],
      hasSwipe: false
    },
    {
      id: 17,
      title: 'Buns',
      description: 'ye bhi din har aapke saath wale din ki tarah amazing but jo bhi ho jab apne pyaare pyaare haathon se khana khilati aap tou bas mein pighal jata wahan aur jo uss din humen reel banayi thi wo lipstick lagane wali abhi tak jis din mera mood kharab wo dkekh ke has has ke pagal hroa hota mein lol',
      media: [buns],
      hasSwipe: false
    },
    {
      id: 18,
      title: 'Concert',
      description: 'Aaaahh only god knows how many concerts ive wanted to attend with you, pehle bayaan phir farhan saeed, havi, diljit, aujla and what not lekin aapko hasan raheem pasand tou meine kaha y not. uff jsut comapring the difference with bayaan wala concert tou itna maza but im grateful for all the times weve had togehter aik saath hon bayaan ki picture mein ya 2 ghante hug karna hasan ke concert mein hehe',
      media: [concert1, concert2],
      hasSwipe: true
    }
  ];

  const handleMediaChange = (memoryId, direction) => {
    const memory = memories.find(m => m.id === memoryId);
    if (!memory || !memory.hasSwipe) return;
    
    const currentIndex = currentMediaIndex[memoryId] || 0;
    const maxIndex = memory.media.length - 1;
    
    let newIndex;
    if (direction === 'next') {
      newIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
    } else {
      newIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
    }
    
    setCurrentMediaIndex(prev => ({
      ...prev,
      [memoryId]: newIndex
    }));
  };

  const openFullscreen = (memory, startIndex = 0) => {
    setFullscreenMedia(memory);
    setFullscreenIndex(startIndex);
  };

  const closeFullscreen = () => {
    setFullscreenMedia(null);
    setFullscreenIndex(0);
  };

  const navigateFullscreen = (direction) => {
    if (!fullscreenMedia || !fullscreenMedia.media) return;
    
    const maxIndex = fullscreenMedia.media.length - 1;
    if (direction === 'next') {
      setFullscreenIndex(prev => prev >= maxIndex ? 0 : prev + 1);
    } else {
      setFullscreenIndex(prev => prev <= 0 ? maxIndex : prev - 1);
    }
  };

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!fullscreenMedia) return;
      
      switch (e.key) {
        case 'Escape':
          closeFullscreen();
          break;
        case 'ArrowLeft':
          navigateFullscreen('prev');
          break;
        case 'ArrowRight':
          navigateFullscreen('next');
          break;
        default:
          break;
      }
    };

    if (fullscreenMedia) {
      document.addEventListener('keydown', handleKeyPress);
      return () => document.removeEventListener('keydown', handleKeyPress);
    }
  }, [fullscreenMedia]);

  const renderMedia = (memory) => {
    const currentIndex = currentMediaIndex[memory.id] || 0;
    const mediaFile = memory.media[currentIndex];
    const isVideo = mediaFile && (mediaFile.includes('.mp4') || mediaFile.includes('.MP4') || mediaFile.includes('.mov'));
    
    if (memory.hasSwipe && memory.media.length > 1) {
      return (
        <SwipeContainer onClick={() => openFullscreen(memory, currentIndex)}>
          {isVideo ? (
            <video 
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
              onError={(e) => {
                console.log('Video error:', e);
                e.target.style.display = 'none';
              }}
              onLoadedData={(e) => {
                e.target.style.display = 'block';
              }}
              preload="metadata"
            >
              <source src={mediaFile} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img 
              src={mediaFile} 
              alt={memory.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
              onError={(e) => {
                console.log('Image error:', e);
                e.target.style.display = 'none';
              }}
              onLoad={(e) => {
                e.target.style.display = 'block';
              }}
            />
          )}
          
          <SwipeButton 
            direction="left" 
            onClick={(e) => {
              e.stopPropagation();
              handleMediaChange(memory.id, 'prev');
            }}
          >
            ‹
          </SwipeButton>
          <SwipeButton 
            direction="right" 
            onClick={(e) => {
              e.stopPropagation();
              handleMediaChange(memory.id, 'next');
            }}
          >
            ›
          </SwipeButton>
          
          <SwipeIndicator>
            {memory.media.map((_, index) => (
              <Dot key={index} active={index === currentIndex} />
            ))}
          </SwipeIndicator>
        </SwipeContainer>
      );
    } else {
      return (
        <MemoryImage onClick={() => openFullscreen(memory, 0)}>
          {isVideo ? (
            <video 
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
              onError={(e) => {
                console.log('Video error:', e);
                e.target.style.display = 'none';
              }}
              onLoadedData={(e) => {
                e.target.style.display = 'block';
              }}
              preload="metadata"
            >
              <source src={mediaFile} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <img 
              src={mediaFile} 
              alt={memory.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }}
              onError={(e) => {
                console.log('Image error:', e);
                e.target.style.display = 'none';
              }}
              onLoad={(e) => {
                e.target.style.display = 'block';
              }}
            />
          )}
        </MemoryImage>
      );
    }
  };

  const loveThings = [
    {
      emoji: '😊',
      title: 'Your Smile',
      description: 'Aaapke pyaare honton ki muskurahat, the way wo perfectly split hote hain aaah id do anythgin to see that right now because ik youre smilign lookign at this cutoo bohot pyaari lagri hou'
    },
    {
      emoji: '👀',
      title: 'Your Eyes',
      description: 'Those beautiful eyes that sparkle with mischief and kindness. I could get lost in them for hours and never want to find my way out because this is where i fell and mera dil legayi ye pyaari pyaari 2 aankhein.'
    },
    {
      emoji: '😂',
      title: 'Your Laugh',
      description: 'Your infectious laugh that makes me soo sooo happy. Humesha aise hii hasti muskuraati raho jaanu'
    },
    {
      emoji: '🧠',
      title: 'Your issmart Brain',
      description: 'How incredibly smart and thoughtful you are.Jaise meri choti choti cheez notice karti mujeh itna acha jaanti ke mein khud bhi nia dn kitna sochti sahi tarah bas perfect '
    },
    {
      emoji: '❤️',
      title: 'Your Heart',
      description: 'Your kind, caring heart that loves so deeply. The way you care and make me feel special and valued. literally somehitn i never expected to get and youve given me everythign jaanu'
    },
    {
      emoji: '💪',
      title: 'Your hair',
      description: 'Itne pyaare baal inke baar emein batane ki zaroorat tou ni lekin jaan itne pyaare kaise the waves they fall into just perfect btw my fav hairstyle is when you left them into curls wo purple wale din iftar ehhe '
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
                  {renderMedia(memory)}
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
                holding your hand kissing you everywhere and seeing that gorgeous smile light up as you celebrate another year of being absolutely amazing.<br /><br />
                
                I'm so sorry I can't be there in person. The distance feels especially hard today 
                when all I want is to give you the biggest hug anda lot more too along with celebrating together. But even though 
                we're miles apart, please know that you're in my heart every single moment always and especially this tiem when it is your special day<br /><br />
                
                You are the most incredible person I've ever met. You are not jsut great to me but everyone around you which makes me fall even mroee, 
                your intelligence amazes me daily, and your beauty - inside and out - takes my breath away. 
                You make ordinary moments feel magical just by being you.<br /><br />
                
                I love how you laugh at the silliest things, how you care so deeply about others, 
                how you see beauty in everything around you. I love your curiosity, your strength, 
                your gentle heart. I love the way you make me want to be a better person without being in contact iwth any othere gurl lmaoo.<br /><br />
                
                Today is all about celebrating YOU - the wonderful, amazing, beautiful person you are. 
                You deserve all the happiness in the world, and I promise I'm working every day toward 
                the moment when we can celebrate together again.<br /><br />
                
                Until then, know that you are loved beyond measure, cherished more than words can express, 
                and thought about every single day. You are my sunshine, my inspiration, and my heart.<br /><br />
                
                Meine wapis aaake aaah itna hug karna kha jana aapkooooo until then all we can do is wait.
                <br /><br />
                Happy Birthday, my beautiful Aiman. I love you more than you'll ever know! 💖<br /><br />
                
                With all my love and birthday wishes,<br />
                Your own Waleed
              </MessageText>
            </MessageCard>
          </ContentContainer>
        );
      
      case 'music':
        return (
          <ContentContainer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <MessageCard>
              <MessageTitle>This Reminds Me of You 🎵</MessageTitle>
              <MessageText>
                You are always in my heart, and these songs capture exactly how I feel about you. 
                Every melody, every lyric speaks of our love story. Music becomes more beautiful when I think of you! 💖
              </MessageText>
            </MessageCard>
            
            <div style={{ display: 'grid', gap: '2rem', marginTop: '2rem' }}>
              <MusicCard
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <MusicEmoji>🎵</MusicEmoji>
                <MusicTitle>"Perfect" by Ed Sheeran</MusicTitle>
                <MusicDescription>
                  "I found a love for me, darling just dive right in and follow my lead" - 
                  This song perfectly describes how I feel about you. You are my perfect match! 💕
                </MusicDescription>
                <AudioPlayer controls>
                  <source src={perfectSong} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </AudioPlayer>
              </MusicCard>

              <MusicCard
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                <MusicEmoji>🐐</MusicEmoji>
                <MusicTitle>"G.O.A.T" by Diljit Dosanjh</MusicTitle>
                <MusicDescription>
                  This song reminds me of your confidence and how you're the greatest of all time in my heart! 
                  You're my G.O.A.T in every way possible! 🔥
                </MusicDescription>
                <AudioPlayer controls>
                  <source src={goatSong} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </AudioPlayer>
              </MusicCard>

              <MusicCard
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                <MusicEmoji>🌟</MusicEmoji>
                <MusicTitle>"Tareefan" by Karan Aujla</MusicTitle>
                <MusicDescription>
                  Every word of praise in this song is what I feel about you! You deserve all the tareefan 
                  (compliments) in the world because you're absolutely incredible! ✨
                </MusicDescription>
                <AudioPlayer controls>
                  <source src={tareefanSong} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </AudioPlayer>
              </MusicCard>

              <MusicCard
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <MusicEmoji>🎤</MusicEmoji>
                <MusicTitle>"Memories" by Hasan Raheem</MusicTitle>
                <MusicDescription>
                  Remember our amazing night at the Hasan Raheem concert? This song captures all our beautiful 
                  memories together - more magical moments, endless love, and a lifetime of happiness! 🎵💃
                </MusicDescription>
                <AudioPlayer controls>
                  <source src={hasanSong} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </AudioPlayer>
              </MusicCard>
            </div>
          </ContentContainer>
        );
      
      default:
        return null;
    }
  };

  return (
    <GalleryContainer>
      <SparkleBackground>
        {sparkles.map(sparkle => (
          <Sparkle
            key={sparkle.id}
            left={sparkle.left}
            top={sparkle.top}
            color={sparkle.color}
            delay={sparkle.delay}
          />
        ))}
        {backgroundElements.map(element => (
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
      </SparkleBackground>
      
      <SectionTitle
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{ position: 'relative', zIndex: 10 }}
      >
        For My Beautiful Aiman 💖
      </SectionTitle>
      
      <TabContainer style={{ position: 'relative', zIndex: 10 }}>
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
        <SubTab 
          active={activeSubTab === 'music'} 
          onClick={() => setActiveSubTab('music')}
        >
          🎵 Our Music
        </SubTab>
      </TabContainer>
      
      <AnimatePresence mode="wait">
        <div style={{ position: 'relative', zIndex: 10 }}>
          {renderContent()}
        </div>
      </AnimatePresence>
      
      <ContinueButton
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        onClick={onComplete}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        🎮 Let's Play Games! ✨
      </ContinueButton>

      {fullscreenMedia && (
        <FullscreenModal
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeFullscreen}
        >
          <FullscreenContent
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton
              onClick={closeFullscreen}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ×
            </CloseButton>

            {fullscreenMedia.media.length > 1 && (
              <>
                <NavigationButton
                  direction="left"
                  onClick={() => navigateFullscreen('prev')}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ‹
                </NavigationButton>
                <NavigationButton
                  direction="right"
                  onClick={() => navigateFullscreen('next')}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ›
                </NavigationButton>
              </>
            )}

            <FullscreenMedia>
              {(() => {
                const mediaFile = fullscreenMedia.media[fullscreenIndex];
                const isVideo = mediaFile && (mediaFile.includes('.mp4') || mediaFile.includes('.MP4') || mediaFile.includes('.mov'));
                
                return isVideo ? (
                  <video 
                    controls 
                    autoPlay={false}
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                    onError={(e) => {
                      console.log('Fullscreen video error:', e);
                      e.target.style.display = 'none';
                    }}
                    key={`video-${fullscreenIndex}`} // Force re-render when index changes
                  >
                    <source src={mediaFile} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <img 
                    src={mediaFile} 
                    alt={fullscreenMedia.title}
                    style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }}
                    onError={(e) => {
                      console.log('Fullscreen image error:', e);
                      e.target.style.display = 'none';
                    }}
                    key={`image-${fullscreenIndex}`} // Force re-render when index changes
                  />
                );
              })()}
            </FullscreenMedia>

            <FullscreenCaption>
              <FullscreenTitle>{fullscreenMedia.title}</FullscreenTitle>
              <FullscreenDescription>{fullscreenMedia.description}</FullscreenDescription>
              {fullscreenMedia.media.length > 1 && (
                <div style={{ marginTop: '10px', opacity: 0.7 }}>
                  {fullscreenIndex + 1} of {fullscreenMedia.media.length}
                </div>
              )}
            </FullscreenCaption>
          </FullscreenContent>
        </FullscreenModal>
      )}
    </GalleryContainer>
  );
}

export default BirthdayGallery;