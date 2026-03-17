import React from "react";
import { FaClock, FaMousePointer, FaCheck, FaSyncAlt, FaRedo } from 'react-icons/fa';

function ScoreBoard({ moves, matchedCount, totalPairs, time, formatTime, onReset, isWon }) {
    const isGameComplete = matchedCount === totalPairs;

    return (
        <div className="text-center mb-6">
            <div className="flex justify-center gap-4 mb-4">

                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <p className="text-sm text-indigo-200 flex items-center justify-center gap-1">
                        <FaClock className="text-indigo-300" /> Waktu
                    </p>
                    <p className="text-2xl font-bold text-white">
                        {formatTime(time)}
                    </p>
                </div>

                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <p className="text-sm text-indigo-200 flex items-center justify-center gap-1">
                        <FaMousePointer className="text-indigo-300" /> Percobaan
                    </p>
                    <p className="text-2xl font-bold text-white">{moves}</p>
                </div>

                <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                    <p className="text-sm text-indigo-200 flex items-center justify-center gap-1">
                        <FaCheck className="text-indigo-300" /> Ditemukan
                    </p>
                    <p className="text-2xl font-bold text-white">{matchedCount} / {totalPairs}</p>
                </div>

            </div>

            {isGameComplete && (
                <p className="text-yellow-300 font-bold text-lg mb-2 animate-pulse">
                    🏆 Selamat! Selesai dalam waktu {formatTime(time)} dengan {moves} percobaan!
                </p>
            )}

            <button
                onClick={onReset}
                className={`px-8 py-3 font-bold rounded-full transition-all duration-300 flex items-center gap-6 mx-auto transform hover:-translate-y-1 active:scale-95 ${
                    isGameComplete 
                    ? "bg-green-400 text-green-950 hover:bg-green-300 hover:shadow-[0_0_25px_rgba(74,222,128,0.7)]" 
                    : "bg-yellow-400 text-indigo-900 hover:bg-yellow-300 hover:shadow-[0_0_25px_rgba(250,204,21,0.7)]"
                }`}
            >
                {isGameComplete ? <FaRedo className="animate-spin-slow" /> : <FaSyncAlt />}
                {isGameComplete ? "Main Lagi" : "Acak Ulang"}
            </button>
        </div>
    );
}

export default ScoreBoard;