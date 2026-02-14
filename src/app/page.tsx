"use client";

import { useState } from "react";
import HeartGame from "@/components/HeartGame";
import ProposalModal from "@/components/ProposalModal";
import MusicPlayer from "@/components/MusicPlayer";
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
        <div className="z-50 p-8 glass rounded-3xl text-center animate-bounce-in mx-4 max-w-2xl border-4 border-pink-300 shadow-2xl bg-black/40 backdrop-blur-md">
          <h1 className="text-4xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-red-300 to-pink-300 drop-shadow-sm mb-6 animate-pulse">
            ¡SABÍA QUE DIRÍAS QUE SÍ! 💖
          </h1>
          <p className="text-2xl md:text-3xl text-white font-medium mb-6 leading-relaxed">
            Me haces la persona más feliz del mundo.<br/>
            Gracias por este primer San Valentín juntos.<br/>
            ¡Que sea el primero de muchos!
          </p>
          <p className="text-4xl md:text-5xl font-bold text-pink-400 mt-4 drop-shadow-md">
            Te amo infinito 🌹
          </p>
        </div>
      )}
      
      <MusicPlayer />
    </main>
  );
}
