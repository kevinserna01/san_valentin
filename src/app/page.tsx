"use client";

import { useState } from "react";
import HeartGame from "@/components/HeartGame";
import ProposalModal from "@/components/ProposalModal";
import confetti from "canvas-confetti";

export default function Home() {
  const [gameWon, setGameWon] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const handleCatch = () => {
    setGameWon(true);
  };

  const handleAccept = () => {
    setAccepted(true);
    // Massive celebration
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 overflow-hidden relative">
      {!gameWon && (
        <h1 className="text-3xl md:text-6xl font-bold text-white mb-8 animate-pulse text-center absolute top-10 md:top-20 pointer-events-none select-none drop-shadow-lg w-full px-4">
          ¡Atrapa el corazón! ❤️
        </h1>
      )}

      {!gameWon && <HeartGame onCatch={handleCatch} />}

      <ProposalModal isOpen={gameWon && !accepted} onAccept={handleAccept} />

      {accepted && (
        <div className="z-50 text-center animate-bounce-in">
          <h1 className="text-6xl md:text-8xl font-bold text-white drop-shadow-lg mb-4">
            ¡SABÍA QUE DIRÍAS QUE SÍ!
          </h1>
          <p className="text-3xl text-pink-100">Te amo ❤️</p>
        </div>
      )}
    </main>
  );
}
