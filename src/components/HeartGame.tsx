"use client";

import { useState, useEffect } from "react";

interface HeartGameProps {
  onCatch: () => void;
}

export default function HeartGame({ onCatch }: HeartGameProps) {
  const [position, setPosition] = useState({ top: "50%", left: "50%" });

  // Function to move the heart to a random position
  const moveHeart = () => {
    // Generate random percentage within 10% to 90% to keep it visible
    const randomTop = Math.floor(Math.random() * 80) + 10;
    const randomLeft = Math.floor(Math.random() * 80) + 10;
    setPosition({ top: `${randomTop}%`, left: `${randomLeft}%` });
  };

  useEffect(() => {
    // Move faster (500ms) to make it more difficult!
    const interval = setInterval(moveHeart, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      onClick={onCatch}
      className="absolute cursor-pointer transition-all duration-300 ease-in-out hover:scale-110 active:scale-95 select-none touch-manipulation transform-gpu"
      style={{
        top: position.top,
        left: position.left,
        fontSize: "var(--heart-size, 4rem)", 
        transform: "translate(-50%, -50%) translateZ(0)", // Force hardware acceleration
        willChange: "top, left",
      }}
    >
      <span className="text-6xl md:text-8xl" style={{ textShadow: "0px 0px 10px rgba(255, 255, 255, 0.5)" }}>❤️</span>
    </div>
  );
}
