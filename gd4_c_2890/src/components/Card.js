import React, { useState } from "react";
import { FaQuestion } from "react-icons/fa";

function Card({ card, isFlipped, isMatched, onFlip }) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    if (!isFlipped && !isMatched) {
      onFlip(card.id);
    }
  };

  const isOpen = isFlipped || isMatched;
  const IconComponent = card.icon;

  const getBackGradient = () => {
    if (isHovered && !isOpen) {
      return 'linear-gradient(135deg, #f0abfc, #818cf8)'; // pink ke biru
    }
    return 'linear-gradient(135deg, #a855f7, #6366f1)';
  };

  return (
    <div
      onClick={handleClick}
// buat deteksi mouse hover 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-20 h-20 cursor-pointer select-none"
      style={{ perspective: '600px' }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transform: isOpen
            ? 'rotateY(180deg)'
            : isHovered
              ? 'rotateY(0deg) scale(1.1) translateY(-4px)'
              : 'rotateY(0deg) scale(1)',
          transition: 'transform 0.5s ease, box-shadow 0.3s ease',
          borderRadius: '12px',

          boxShadow: isHovered && !isOpen
            ? '0 0 20px rgba(192, 132, 252, 0.8), 0 8px 20px rgba(0,0,0,0.3)'
            : '0 4px 12px rgba(0,0,0,0.3)',
        }}
      >

        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '12px',
            backfaceVisibility: 'hidden',

            background: getBackGradient(),
            transition: 'background 0.3s ease',
          }}
        >
          <FaQuestion
            style={{
              color: isHovered ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.6)',
              fontSize: '1.5rem',
              transition: 'color 0.3s ease',
            }}
          />
        </div>


        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '12px',
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: isMatched ? '#dcfce7' : '#ffffff',
            border: isMatched ? '2px solid #4ade80' : 'none',
          }}
        >
          <IconComponent
            style={{
              color: card.color,
              fontSize: '2rem',
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? 'scale(1)' : 'scale(0.5)',
            transition: 'opacity 0.2s ease, transform 0.5s ease',
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default Card;