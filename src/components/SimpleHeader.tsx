"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  FaCode,
  FaRocket,
  FaCog,
  FaEnvelope,
  FaHome,
  FaUser,
  FaPhone,
} from "react-icons/fa";

export default function SimpleHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.offsetTop - headerOffset;
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* Header Desktop */}
      <header 
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled 
            ? 'bg-black/90 backdrop-blur-xl border-b border-purple-500/30 shadow-2xl h-16' 
            : 'bg-transparent h-20'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 h-full">
          <nav className="flex items-center justify-between h-full">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <Image
                src="https://avatars.githubusercontent.com/u/64865137?v=4"
                alt="Marcos Felippe"
                width={40}
                height={40}
                className="rounded-full border-2 border-purple-500"
              />
              <div>
                <h1 className="text-lg font-bold text-white">Marcos Felippe</h1>
                <p className="text-xs text-purple-300">Fullstack Developer</p>
              </div>
            </div>

            {/* Menu Desktop */}
            <div className="hidden lg:flex items-center gap-6">
              <button
                onClick={() => scrollToSection("sobre")}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-purple-700/30 text-purple-100 hover:text-white"
              >
                <FaCode className="text-purple-400" />
                Sobre
              </button>

              <button
                onClick={() => scrollToSection("projetos")}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-purple-700/30 text-purple-100 hover:text-white"
              >
                <FaRocket className="text-purple-400" />
                Projetos
              </button>

              <button
                onClick={() => scrollToSection("servicos")}
                className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-purple-700/30 text-purple-100 hover:text-white"
              >
                <FaCog className="text-purple-400" />
                Serviços
              </button>

              <button
                onClick={() => scrollToSection("contato")}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg hover:from-purple-700 hover:to-purple-900 transition-all duration-300 transform hover:scale-105"
              >
                <FaEnvelope />
                Contato
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Menu Mobile - Fixo na parte inferior */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-xl border-t border-purple-500/40">
        <div className="flex items-center justify-around px-2 py-3">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex flex-col items-center gap-1 p-2 rounded-lg text-purple-300 hover:text-purple-400"
          >
            <FaHome className="text-lg" />
            <span className="text-xs">Home</span>
          </button>

          <button
            onClick={() => scrollToSection("sobre")}
            className="flex flex-col items-center gap-1 p-2 rounded-lg text-purple-300 hover:text-purple-400"
          >
            <FaUser className="text-lg" />
            <span className="text-xs">Sobre</span>
          </button>

          <button
            onClick={() => scrollToSection("projetos")}
            className="flex flex-col items-center gap-1 p-2 rounded-lg text-purple-300 hover:text-purple-400"
          >
            <FaRocket className="text-lg" />
            <span className="text-xs">Projetos</span>
          </button>

          <button
            onClick={() => scrollToSection("servicos")}
            className="flex flex-col items-center gap-1 p-2 rounded-lg text-purple-300 hover:text-purple-400"
          >
            <FaCog className="text-lg" />
            <span className="text-xs">Serviços</span>
          </button>

          <button
            onClick={() => scrollToSection("contato")}
            className="flex flex-col items-center gap-1 p-2 rounded-lg text-purple-300 hover:text-purple-400"
          >
            <FaPhone className="text-lg" />
            <span className="text-xs">Contato</span>
          </button>
        </div>
      </div>
    </>
  );
}
