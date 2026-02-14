"use client";

import { useEffect } from "react";
import confetti from "canvas-confetti";

interface ProposalModalProps {
  isOpen: boolean;
  onAccept: () => void;
}

export default function ProposalModal({ isOpen, onAccept }: ProposalModalProps) {
  useEffect(() => {
    if (isOpen) {
      // Trigger confetti when modal opens
      const duration = 3000;
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
        // since particles fall down, start a bit higher than random
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

      return () => clearInterval(interval);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm p-4">
      <div className="glass p-6 md:p-8 text-center max-w-lg w-[90%] md:w-full animate-bounce-in mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 md:mb-6 text-pink-600 drop-shadow-md">
          ¡Te atrapé! 💘
        </h2>
        <p className="text-xl md:text-2xl mb-6 md:mb-8 text-gray-800 font-medium leading-relaxed">
          ¿Quieres ser mi San Valentín?
        </p>
        <button
          onClick={onAccept}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 md:py-4 md:px-8 rounded-full text-xl md:text-2xl shadow-lg transform transition hover:scale-105 active:scale-95 hover:rotate-3 heart-beat border-4 border-white w-full md:w-auto"
        >
          ¡SÍ, ACEPTO! 💍
        </button>
      </div>
    </div>
  );
}
