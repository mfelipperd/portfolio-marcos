'use client';

import { useEffect, useState } from 'react';

export default function AnimatedBackground() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        setScrollY(window.scrollY);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Gerar tags em posições aleatórias
  const tags = [
    { id: 1, symbol: '<>', x: 10, y: 20, size: 'text-6xl', speed: 0.3, opacity: 0.05 },
    { id: 2, symbol: '</>', x: 85, y: 15, size: 'text-4xl', speed: 0.5, opacity: 0.08 },
    { id: 3, symbol: '<>', x: 70, y: 40, size: 'text-5xl', speed: 0.2, opacity: 0.06 },
    { id: 4, symbol: '</>', x: 20, y: 60, size: 'text-7xl', speed: 0.4, opacity: 0.04 },
    { id: 5, symbol: '<>', x: 90, y: 70, size: 'text-3xl', speed: 0.6, opacity: 0.09 },
    { id: 6, symbol: '</>', x: 5, y: 80, size: 'text-5xl', speed: 0.3, opacity: 0.07 },
    { id: 7, symbol: '<>', x: 60, y: 10, size: 'text-4xl', speed: 0.7, opacity: 0.05 },
    { id: 8, symbol: '</>', x: 40, y: 90, size: 'text-6xl', speed: 0.2, opacity: 0.06 },
    { id: 9, symbol: '<>', x: 15, y: 35, size: 'text-3xl', speed: 0.8, opacity: 0.08 },
    { id: 10, symbol: '</>', x: 75, y: 65, size: 'text-5xl', speed: 0.4, opacity: 0.05 },
    { id: 11, symbol: '<>', x: 30, y: 25, size: 'text-4xl', speed: 0.6, opacity: 0.07 },
    { id: 12, symbol: '</>', x: 95, y: 45, size: 'text-6xl', speed: 0.3, opacity: 0.04 },
    { id: 13, symbol: '<>', x: 50, y: 5, size: 'text-5xl', speed: 0.5, opacity: 0.08 },
    { id: 14, symbol: '</>', x: 25, y: 75, size: 'text-4xl', speed: 0.7, opacity: 0.06 },
    { id: 15, symbol: '<>', x: 80, y: 30, size: 'text-7xl', speed: 0.2, opacity: 0.05 },
    { id: 16, symbol: '</>', x: 45, y: 55, size: 'text-3xl', speed: 0.9, opacity: 0.09 },
    { id: 17, symbol: '<>', x: 35, y: 85, size: 'text-5xl', speed: 0.4, opacity: 0.06 },
    { id: 18, symbol: '</>', x: 65, y: 20, size: 'text-4xl', speed: 0.6, opacity: 0.07 },
    { id: 19, symbol: '<>', x: 12, y: 50, size: 'text-6xl', speed: 0.3, opacity: 0.05 },
    { id: 20, symbol: '</>', x: 88, y: 85, size: 'text-5xl', speed: 0.8, opacity: 0.08 }
  ];

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {tags.map((tag) => (
        <div
          key={tag.id}
          className={`absolute ${tag.size} font-mono text-purple-400 select-none animate-drift`}
          style={{
            left: `${tag.x}%`,
            top: `${tag.y}%`,
            opacity: tag.opacity,
            transform: `translateY(${scrollY * tag.speed}px) rotate(${scrollY * tag.speed * 0.1}deg)`,
            transition: 'transform 0.05s ease-out',
            animationDelay: `${tag.id * 0.5}s`,
          }}
        >
          {tag.symbol}
        </div>
      ))}

      {/* Tags adicionais que se movem na direção oposta */}
      {tags.slice(0, 10).map((tag) => (
        <div
          key={`reverse-${tag.id}`}
          className={`absolute ${tag.size} font-mono text-blue-400 select-none animate-drift`}
          style={{
            left: `${(tag.x + 40) % 100}%`,
            top: `${(tag.y + 30) % 100}%`,
            opacity: tag.opacity * 0.7,
            transform: `translateY(${-scrollY * tag.speed * 0.5}px) rotate(${-scrollY * tag.speed * 0.05}deg)`,
            transition: 'transform 0.05s ease-out',
            animationDelay: `${tag.id * 0.7}s`,
          }}
        >
          {tag.symbol === '<>' ? '</>' : '<>'}
        </div>
      ))}

      {/* Tags que se movem horizontalmente com o scroll */}
      {tags.slice(10, 15).map((tag) => (
        <div
          key={`horizontal-${tag.id}`}
          className={`absolute ${tag.size} font-mono text-indigo-400 select-none`}
          style={{
            left: `${tag.x}%`,
            top: `${tag.y}%`,
            opacity: tag.opacity * 0.5,
            transform: `translateX(${scrollY * tag.speed * 0.3}px) translateY(${scrollY * tag.speed * 0.2}px) rotate(${scrollY * tag.speed * 0.08}deg)`,
            transition: 'transform 0.05s ease-out',
          }}
        >
          {tag.symbol}
        </div>
      ))}

      {/* Gradiente para suavizar as bordas */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/30 pointer-events-none" />
    </div>
  );
}
