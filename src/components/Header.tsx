'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { SiN8N } from 'react-icons/si';
import { BsRobot } from 'react-icons/bs';
import { FaCode, FaRocket, FaEnvelope } from 'react-icons/fa';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        const scrollY = window.scrollY;
        const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = Math.min((scrollY / documentHeight) * 100, 100);
        
        setIsScrolled(scrollY > 100);
        setScrollProgress(progress);
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const isMinimized = isScrolled && !isHovered;

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    if (typeof window === 'undefined') return;
    
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 120;
      const elementPosition = element.offsetTop - headerOffset;
      
      const startPosition = window.pageYOffset;
      const distance = elementPosition - startPosition;
      const duration = 800;
      let startTime: number | null = null;

      function animation(currentTime: number) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      }

      function ease(t: number, b: number, c: number, d: number) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
      }

      requestAnimationFrame(animation);
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
      isMinimized 
        ? 'h-16 bg-black/95 backdrop-blur-md border-b border-purple-700/30' 
        : 'h-20 bg-black/80 backdrop-blur-lg border-b border-purple-700/20'
    }`}
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-7xl mx-auto px-4 h-full">
        <nav className="flex items-center justify-between h-full">
          <div className={`flex items-center gap-4 transition-all duration-500 ${
            isMinimized ? 'transform scale-90' : 'transform scale-100'
          }`}>
            <div className="relative">
              <Image 
                src="https://avatars.githubusercontent.com/u/64865137?v=4" 
                alt="Marcos Felippe" 
                width={isMinimized ? 32 : 40}
                height={isMinimized ? 32 : 40}
                className="rounded-full border-2 border-purple-500 transition-all duration-300"
              />
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full blur opacity-30 animate-pulse"></div>
            </div>
            <div className={`transition-all duration-500 ${isMinimized ? 'opacity-0 max-w-0 overflow-hidden' : 'opacity-100 max-w-xs'}`}>
              <h1 className="text-lg font-bold text-white">Marcos Felippe</h1>
              <p className="text-xs text-purple-300">Fullstack Developer</p>
            </div>
          </div>

          <div className={`flex items-center gap-6 transition-all duration-500 ${
            isMinimized ? 'gap-4' : 'gap-6'
          }`}>
            <button 
              onClick={() => scrollToSection('sobre')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-purple-700/30 hover:scale-105 ${
                isMinimized ? 'text-sm' : 'text-base'
              }`}
            >
              <FaCode className={`${isMinimized ? 'text-base' : 'text-lg'} text-purple-400`} />
              <span className={`text-purple-100 transition-all duration-500 ${
                isMinimized ? 'hidden md:inline text-sm' : 'inline'
              }`}>Sobre</span>
            </button>

            <button 
              onClick={() => scrollToSection('projetos')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-purple-700/30 hover:scale-105 ${
                isMinimized ? 'text-sm' : 'text-base'
              }`}
            >
              <FaRocket className={`${isMinimized ? 'text-base' : 'text-lg'} text-purple-400`} />
              <span className={`text-purple-100 transition-all duration-500 ${
                isMinimized ? 'hidden md:inline text-sm' : 'inline'
              }`}>Projetos</span>
            </button>

            <button 
              onClick={() => scrollToSection('servicos')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-purple-700/30 hover:scale-105 ${
                isMinimized ? 'text-sm' : 'text-base'
              }`}
            >
              <SiN8N className={`${isMinimized ? 'text-base' : 'text-lg'} text-orange-400`} />
              <span className={`text-purple-100 transition-all duration-500 ${
                isMinimized ? 'hidden md:inline text-sm' : 'inline'
              }`}>Automação</span>
            </button>

            <button 
              onClick={() => scrollToSection('contato')}
              className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg transition-all duration-300 hover:from-purple-700 hover:to-purple-900 hover:scale-105 ${
                isMinimized ? 'text-sm px-3' : 'text-base px-4'
              }`}
            >
              <FaEnvelope className={`${isMinimized ? 'text-sm' : 'text-base'} text-white`} />
              <span className={`text-white font-semibold transition-all duration-500 ${
                isMinimized ? 'hidden lg:inline text-sm' : 'inline'
              }`}>Contato</span>
            </button>

            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={`flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-gray-600 to-gray-800 rounded-lg transition-all duration-300 hover:from-gray-700 hover:to-gray-900 hover:scale-105 ${
                isMinimized ? 'text-sm px-2' : 'text-base px-3'
              }`}
              title="Voltar ao topo"
            >
              <FaRocket className={`${isMinimized ? 'text-sm' : 'text-base'} text-white transform rotate-180`} />
            </button>
          </div>

          <div className={`mt-2 h-1 bg-purple-900/30 rounded-full overflow-hidden transition-all duration-500 ${
            isMinimized ? 'opacity-0' : 'opacity-100'
          }`}>
            <div 
              className="h-full bg-gradient-to-r from-purple-500 to-purple-300 rounded-full transition-all duration-300"
              style={{
                width: `${scrollProgress}%`
              }}
            />
          </div>
        </nav>
      </div>

      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute top-0 right-1/4 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl animate-pulse delay-1000" />
      </div>
    </header>
  );
}