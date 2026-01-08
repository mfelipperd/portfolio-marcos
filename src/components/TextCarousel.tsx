"use client";

import { useState, useEffect } from 'react';

interface TextCarouselProps {
  texts: string[];
  interval?: number;
  className?: string;
}

export default function TextCarousel({ 
  texts, 
  interval = 3000,
  className = "" 
}: TextCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (texts.length <= 1) return;

    const changeText = () => {
      setIsAnimating(true);
      
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % texts.length);
        setIsAnimating(false);
      }, 300);
    };

    const timer = setInterval(changeText, interval);

    return () => clearInterval(timer);
  }, [texts.length, interval]);

  if (texts.length === 0) return null;

  return (
    <div className={`relative ${className}`}>
      <div className="overflow-hidden min-h-[64px] md:min-h-[80px] flex items-center justify-center">
        <div
          className={`transition-all duration-500 ease-in-out ${
            isAnimating 
              ? 'opacity-50 translate-y-1' 
              : 'opacity-100 translate-y-0'
          }`}
        >
          <p className="text-2xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-white to-purple-200 text-center px-4">
            {texts[currentIndex]}
          </p>
        </div>
      </div>
      
      {/* Indicadores de slides */}
      {texts.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {texts.map((_, index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? 'w-8 bg-purple-400'
                  : 'w-2 bg-purple-700/50'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

