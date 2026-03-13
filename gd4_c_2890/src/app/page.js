'use client';

import React, { useState, useEffect, useCallback } from 'react';
import GameBoard from '../components/GameBoard';
import ScoreBoard from '../components/ScoreBoard';
import { GiCardJoker } from 'react-icons/gi';
import { FaAppleAlt, FaLemon, FaHeart, FaStar, FaFire, FaMoon } from 'react-icons/fa';
import { IoDiamond } from "react-icons/io5";
import { FaBoltLightning } from "react-icons/fa6";

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
    { id: index * 2,     icon: item.icon, color: item.color, pairId: index },
    { id: index * 2 + 1, icon: item.icon, color: item.color, pairId: index },
  ]);
  return shuffleArray(paired);
};

const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${String(s).padStart(2, '0')}`;
};

export default function Home() {
  const [difficulty, setDifficulty]   = useState('easy');
  const [cards, setCards]             = useState(() => createCards(DIFFICULTY_CONFIG['easy'].pairs));
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves]             = useState(0);

  
  const [time, setTime]               = useState(0);
  const [isRunning, setIsRunning]     = useState(false);
  const [isWon, setIsWon]             = useState(false);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      interval = setInterval(() => {
        setTime(t => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval); 
  }, [isRunning]);

  useEffect(() => {
    const totalPairs = DIFFICULTY_CONFIG[difficulty].pairs;
    if (matchedCards.length / 2 === totalPairs && totalPairs > 0) {
      setIsRunning(false); // stop timer saat menang
      setIsWon(true);
    }
  }, [matchedCards, difficulty]);


  useEffect(() => {
    if (flippedCards.length === 2) {
      const [firstId, secondId] = flippedCards;
      const firstCard  = cards.find(c => c.id === firstId);
      const secondCard = cards.find(c => c.id === secondId);

      setMoves(prev => prev + 1);

      if (firstCard.pairId === secondCard.pairId) {
        setMatchedCards(prev => [...prev, firstId, secondId]);
        setFlippedCards([]);
      } else {
        const timer = setTimeout(() => {
          setFlippedCards([]);
        }, 800);
        return () => clearTimeout(timer);
      }
    }
  }, [flippedCards, cards]);

  const handleCardFlip = (id) => {
    if (isWon) return;
    if (flippedCards.length < 2 && !flippedCards.includes(id)) {
      if (!isRunning) setIsRunning(true); // mulai timer di klik pertama
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
  }, [difficulty]);


  const handleDifficulty = (diff) => {
    setDifficulty(diff);
    resetGame(diff);
  };

  const totalPairs = DIFFICULTY_CONFIG[difficulty].pairs;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 p-4">
      <h1 className="text-4xl font-bold mb-6 text-white drop-shadow-lg flex items-center gap-3">
        <GiCardJoker className="text-yellow-300 text-4xl" />
        Memory Card
      </h1>

      {/* Difficulty Selector */}
      <div className="flex gap-3 mb-4">
        {Object.entries(DIFFICULTY_CONFIG).map(([key, val]) => (
          <button
            key={key}
            onClick={() => handleDifficulty(key)}
            className={`px-5 py-2 rounded-full font-bold text-sm border-2 transition-all duration-200
              ${difficulty === key
                ? 'bg-yellow-400 text-gray-900 border-yellow-400'
                : 'bg-transparent text-white border-purple-400 hover:border-white'
              }`}
          >
            {val.icon} {val.label}
          </button>
        ))}
      </div>

      <ScoreBoard
        moves={moves}
        matchedCount={matchedCards.length / 2}
        totalPairs={totalPairs}
        time={time}
        formatTime={formatTime}
        onReset={() => resetGame()}
        isWon={isWon}
      />


      <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl shadow-2xl">
        <GameBoard
          cards={cards}
          flippedCards={flippedCards}
          matchedCards={matchedCards}
          onFlip={handleCardFlip}
        />
      </div>
    </div>
  );
}