import React from "react";
import { FaQuestion } from "react-icons/fa";

function Card({ card, isFlipped, isMatched, onFlip }) {
  const handleClick = () => {
    if (!isFlipped && !isMatched) {
      onFlip(card.id);
    }
  };

  const isOpen = isFlipped || isMatched;
  const IconComponent = card.icon;

  return (
    // Wrapper: perspective agar efek 3D terlihat
    <div
      onClick={handleClick}
      className="w-20 h-20 cursor-pointer select-none"
      style={{ perspective: '600px' }}
    >
      {/* Inner: yang dirotasi saat flip */}
      <div
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d',
          transition: 'transform 0.5s ease',
          // muter 180 derajat saat flipped/matched
          transform: isOpen ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >

        {/* SISI BELAKANG: tampil saat belum dibalik (?) */}
        <div
          className="absolute inset-0 flex items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 shadow-lg hover:shadow-xl"
          style={{
            backfaceVisibility: 'hidden',
            // Sisi belakang default menghadap depan
          }}
        >
          <FaQuestion className="text-white/60 text-xl" />
        </div>

        {/* SISI DEPAN: tampil saat kartu terbuka (icon) */}
        <div
          className={`absolute inset-0 flex items-center justify-center rounded-xl shadow-md
            ${isMatched
              ? 'bg-green-100 ring-2 ring-green-400'  // matched: hijau
              : 'bg-white'                              // flipped: putih
            }`}
          style={{
            backfaceVisibility: 'hidden',
            // Sisi depan awalnya menghadap belakang, perlu di-rotate 180deg
            transform: 'rotateY(180deg)',
          }}
        >
          <IconComponent
            style={{
              color: card.color,
              fontSize: '2rem',
              // Animasi pop saat kartu terbuka
              animation: isOpen ? 'popIn 0.3s ease 0.25s both' : 'none',
            }}
          />
        </div>

      </div>
    </div>
  );
}

export default Card;

/*
  Tambahkan animasi ini di globals.css:

  @keyframes popIn {
    0%   { transform: scale(0.5); opacity: 0; }
    70%  { transform: scale(1.2); }
    100% { transform: scale(1);   opacity: 1; }
  }
*/