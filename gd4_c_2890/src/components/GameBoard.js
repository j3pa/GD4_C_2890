import React from "react";
import Card from "./Card";

// Jumlah kolom grid sesuai difficulty
// easy: 4 kartu = 4 kolom (1 baris)... tapi lebih bagus 4 kolom 2 baris
// medium: 12 kartu = 4 kolom 3 baris
// hard: 16 kartu = 4 kolom 4 baris
const COLS_MAP = {
  easy:   4,
  medium: 4,
  hard:   4,
};

// Tailwind grid class sesuai jumlah kolom
const GRID_COLS_CLASS = {
  4: 'grid-cols-4',
};

function GameBoard({ cards, flippedCards, matchedCards, onFlip, difficulty }) {
  const cols = COLS_MAP[difficulty] || 4;
  const gridClass = GRID_COLS_CLASS[cols] || 'grid-cols-4';

  return (
    <div className={`grid ${gridClass} gap-4 justify-items-center`}>
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          isFlipped={flippedCards.includes(card.id)}
          isMatched={matchedCards.includes(card.id)}
          onFlip={onFlip}
        />
      ))}
    </div>
  );
}

export default GameBoard;