'use client';

import React, { useState, useEffect, useCallback } from 'react';
import GameBoard from '../components/GameBoard';
import ScoreBoard from '../components/ScoreBoard';
import { GiCardJoker } from 'react-icons/gi';
import { FaAppleAlt, FaLemon, FaHeart, FaStar, FaFire, FaMoon } from 'react-icons/fa';
import { IoDiamond } from "react-icons/io5";
import { FaBoltLightning } from "react-icons/fa6";

// icon sing dipake
const ICONS = [
  { icon: FaAppleAlt,     color: '#e44444' },
  { icon: FaLemon,        color: '#eab308' },
  { icon: FaHeart,        color: '#ec4899' },
  { icon: FaStar,         color: '#ffea00' },
  { icon: FaFire,         color: '#ff8103' },
  { icon: FaMoon,         color: '#60a5fa' },
  { icon: IoDiamond,      color: '#4747e1' },
  { icon: FaBoltLightning,color: '#a78bfa' },
];

const DIFFICULTY_CONFIG = {
  easy:   { pairs: 4, label: 'Easy (4)',   icon: '😊' },
  medium: { pairs: 6, label: 'Medium (6)', icon: '😐' },
  hard:   { pairs: 8, label: 'Hard (8)',   icon: '💀' },
};

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};


const createCards = (pairsCount) => {
  const selectedIcons = ICONS.slice(0, pairsCount);
  

  const paired = selectedIcons.flatMap((item, index) => [
    { id: `card-${index}-A`, icon: item.icon, color: item.color, pairId: index },
    { id: `card-${index}-B`, icon: item.icon, color: item.color, pairId: index },
  ]);
  
  return shuffleArray(paired);
};

const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
};

export default function Home() {
  const [difficulty, setDifficulty]     = useState('easy');
  const [cards, setCards]               = useState(() => createCards(DIFFICULTY_CONFIG['easy'].pairs));
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves]               = useState(0);
  const [time, setTime]                 = useState(0);
  const [isRunning, setIsRunning]       = useState(false);
  const [isWon, setIsWon]               = useState(false);
  

  const [isProcessing, setIsProcessing] = useState(false); 


  useEffect(() => {
    let interval = null;
    if (isRunning && !isWon) {
      interval = setInterval(() => {
        setTime(t => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval); 
  }, [isRunning, isWon]);


  useEffect(() => {
    const totalPairs = DIFFICULTY_CONFIG[difficulty].pairs;
    if (matchedCards.length / 2 === totalPairs && totalPairs > 0) {
      setIsRunning(false); 
      setIsWon(true);
    }
  }, [matchedCards, difficulty]);

  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsProcessing(true);
      
      const [firstId, secondId] = flippedCards;
      const firstCard  = cards.find(c => c.id === firstId);
      const secondCard = cards.find(c => c.id === secondId);

      setMoves(prev => prev + 1); 

    
      if (firstCard && secondCard && firstCard.pairId === secondCard.pairId) {
        setMatchedCards(prev => [...prev, firstId, secondId]);
        setFlippedCards([]); 
        setIsProcessing(false); 
      } else {

        const timer = setTimeout(() => {
          setFlippedCards([]);
          setIsProcessing(false);
        }, 1000);
        
        return () => clearTimeout(timer); 
      }
    }
  }, [flippedCards, cards]);


  const handleCardFlip = (id) => {
    if (isWon || isProcessing || flippedCards.includes(id) || matchedCards.includes(id)) {
      return; 
    }

    if (flippedCards.length < 2) {
      if (!isRunning) setIsRunning(true);
      setFlippedCards(prev => [...prev, id]);
    }
  };


  const resetGame = useCallback((diff = difficulty) => {
    setCards(createCards(DIFFICULTY_CONFIG[diff].pairs));
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setTime(0);
    setIsRunning(false);
    setIsWon(false);
    setIsProcessing(false);
  }, [difficulty]);

  const handleDifficulty = (diff) => {
    setDifficulty(diff);
    resetGame(diff);
  };

  const totalPairs = DIFFICULTY_CONFIG[difficulty].pairs;

  return (  
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      
      <h1 className="text-4xl font-bold mb-6 text-white drop-shadow-lg flex items-center gap-3">
        <GiCardJoker className="text-yellow-300 text-4xl" />
        Memory Card
      </h1>

      
      <div className="flex gap-3 mb-4">
        {Object.entries(DIFFICULTY_CONFIG).map(([key, val]) => (
          <button
            key={key}
            onClick={() => handleDifficulty(key)}
            className={`px-5 py-2 rounded-full font-bold text-sm border-2 transition-all duration-200
              ${difficulty === key
                ? 'bg-yellow-400 text-gray-900 border-yellow-400'
                : 'bg-transparent text-white border-indigo-400 hover:border-white'
              }`}
          >
            {val.icon} {val.label}
          </button>
        ))}
      </div>

      
      <ScoreBoard
        moves={moves}
        matchedCount={matchedCards.length / 2} //
        totalPairs={totalPairs}
        time={time}
        formatTime={formatTime}
        onReset={() => resetGame()}
        isWon={isWon}
      />

    
      <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl shadow-2xl mt-4">
        <GameBoard
          cards={cards}
          flippedCards={flippedCards}
          matchedCards={matchedCards}
          onFlip={handleCardFlip}
          difficulty={difficulty}
        />
      </div>
    </div>
  );
}