'use client';

import { useState, useEffect } from 'react';

interface TimerProps {
  duration: number;
  onTimeUp: () => void;
  color: string;
  isPaused: boolean;
}

export default function Timer({ duration, onTimeUp, color, isPaused }: TimerProps) {
  const [timeLeft, setTimeLeft] = useState(duration);
  
  useEffect(() => {
    if (isPaused) return;
    
    if (timeLeft <= 0) {
      onTimeUp();
      return;
    }
    
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [timeLeft, isPaused, onTimeUp]);
  
  const percentage = (timeLeft / duration) * 100;
  const isWarning = timeLeft <= 3;
  
  return (
    <div className="flex flex-col items-center">
      <div
        className="relative w-24 h-24 rounded-full flex items-center justify-center"
        style={{
          background: `conic-gradient(${isWarning ? '#EF4444' : color} ${percentage}%, #E5E7EB ${percentage}%)`,
        }}
      >
        <div className="absolute w-20 h-20 bg-white rounded-full flex items-center justify-center">
          <span
            className={`text-3xl font-bold ${isWarning ? 'text-red-500 animate-pulse' : 'text-gray-800'}`}
          >
            {timeLeft}
          </span>
        </div>
      </div>
      <span className="mt-2 text-sm text-gray-500">seconds left</span>
    </div>
  );
}
