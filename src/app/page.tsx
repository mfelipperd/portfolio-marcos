"use client";

import { lazy, Suspense, useState, useEffect } from "react";
import { ParallaxProvider, ParallaxBanner } from "react-scroll-parallax";
import Image from "next/image";
import Header from "../components/Header";

// Lazy loading dos componentes pesados
const ContactForm = lazy(() => import("../components/WhatsAppContactForm"));
const AnimatedBackground = lazy(
  () => import("../components/AnimatedBackground")
);

// Lazy loading do componente de tecnologias
const TechnologiesGrid = lazy(() => import("../components/TechnologiesGrid"));

// Apenas ícones utilizados na página principal
import { SiN8N } from "react-icons/si";
import { BsRobot, BsLightning } from "react-icons/bs";
import {
  FaRocket,
  FaEnvelope,
  FaUser,
  FaCode,
  FaServer,
  FaCogs,
  FaLightbulb,
  FaHeart,
  FaUsers,
  FaCog,
  FaGithub,
  FaLinkedin,
  FaFilePdf,
  FaReact,
} from "react-icons/fa";

export default function Home() {
  // Estado para controlar o slide atual do carrossel
  const [currentSlide, setCurrentSlide] = useState(1);

  // Função ease-in-out para animação suave
  const ease = (t: number, b: number, c: number, d: number) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };

  // Função para mudar slide do carrossel
  const changeSlide = (slideNumber: number) => {
    setCurrentSlide(slideNumber);
    
    // Atualizar opacidade dos slides
    for (let i = 1; i <= 4; i++) {
      const slide = document.getElementById(`slide-${i}`);
      if (slide) {
        slide.style.opacity = i === slideNumber ? '1' : '0';
      }
    }
    
    // Atualizar indicadores
    const indicators = document.querySelectorAll('.carousel-indicator');
    indicators.forEach((indicator, index) => {
      if (indicator instanceof HTMLElement) {
        if (index + 1 === slideNumber) {
          indicator.style.opacity = '1';
          indicator.style.backgroundColor = getSlideColor(slideNumber);
        } else {
          indicator.style.opacity = '0.5';
          indicator.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
        }
      }
    });
  };

  // Função para obter a cor do slide
  const getSlideColor = (slideNumber: number) => {
    const colors = {
      1: '#a855f7', // purple
      2: '#22c55e', // green
      3: '#3b82f6', // blue
      4: '#f97316'  // orange
    };
    return colors[slideNumber as keyof typeof colors] || '#a855f7';
  };

  // Auto-rotate carousel
  useEffect(() => {
    const interval = setInterval(() => {
      const nextSlide = currentSlide === 4 ? 1 : currentSlide + 1;
      changeSlide(nextSlide);
    }, 5000); // Muda a cada 5 segundos

    return () => clearInterval(interval);
  }, [currentSlide]);

  // Adicionar event listeners após o componente montar
  useEffect(() => {
    const handleCarouselClick = (e: Event) => {
      const target = e.target as HTMLElement;
      
      // Handle indicator clicks
      if (target.classList.contains('carousel-indicator')) {
        const slideNumber = parseInt(target.getAttribute('data-slide') || '1');
        changeSlide(slideNumber);
      }
      
      // Handle navigation arrows
      if (target.closest('.carousel-prev')) {
        const prevSlide = currentSlide === 1 ? 4 : currentSlide - 1;
        changeSlide(prevSlide);
      }
      
      if (target.closest('.carousel-next')) {
        const nextSlide = currentSlide === 4 ? 1 : currentSlide + 1;
        changeSlide(nextSlide);
      }
    };

    document.addEventListener('click', handleCarouselClick);
    return () => document.removeEventListener('click', handleCarouselClick);
  }, [currentSlide]);

  // Função para scroll suave entre seções
  const scrollToSection = (sectionId: string) => {
    if (typeof window === "undefined") return;

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

      requestAnimationFrame(animation);
    }
  };

  return (
    <ParallaxProvider>
      <Suspense fallback={<div className="fixed inset-0 bg-black/50"></div>}>
        <AnimatedBackground />
      </Suspense>
      <Header />
      <div className="font-sans bg-gradient-to-br from-purple-900 via-black to-purple-800 min-h-screen relative z-10">
        {/* CARROSSEL HERO BANNER */}
        <section className="h-screen relative z-10 overflow-hidden" id="hero">
          {/* Background Animated Elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl animate-pulse" />
            <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
            <div className="absolute bottom-1/4 left-1/2 w-48 h-48 bg-purple-300/25 rounded-full blur-2xl animate-pulse delay-500" />
          </div>

          {/* Carousel Container */}
          <div className="carousel-container h-full relative">
            {/* Slide 1 - Transformação Digital */}
            <div className="carousel-slide absolute inset-0 flex items-center justify-center transition-all duration-1000 opacity-100" id="slide-1">
              <div className="text-center px-4 min-w-[1920px] max-w-[1920px] mx-auto">
                <div className="glassmorphism p-12 backdrop-blur-2xl bg-black/20 border border-purple-500/30 rounded-3xl shadow-2xl">
                  <div className="text-8xl mb-6">🚀</div>
                  <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-white to-purple-200 mb-6">
                    Transformação <br />
                    <span className="text-purple-400">Digital</span> <br />
                    <span className="text-white">Completa</span>
                  </h1>
                  <p className="text-xl sm:text-2xl text-purple-100 mb-8 leading-relaxed">
                    Do conceito ao lançamento. Criamos soluções digitais que revolucionam seu negócio e multiplicam seus resultados.
                  </p>
                  <button
                    onClick={() => scrollToSection("contato")}
                    className="px-12 py-6 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-full font-bold text-2xl shadow-2xl hover:from-purple-700 hover:to-purple-900 transition-all duration-300 transform hover:scale-110 flex items-center gap-3 mx-auto"
                  >
                    <FaRocket />
                    Começar Transformação
                  </button>
                </div>
              </div>
            </div>

            {/* Slide 2 - Sites que Vendem */}
            <div className="carousel-slide absolute inset-0 flex items-center justify-center transition-all duration-1000 opacity-0" id="slide-2">
              <div className="text-center px-4 min-w-[1920px] max-w-[1920px] mx-auto">
                <div className="glassmorphism p-12 backdrop-blur-2xl bg-black/20 border border-green-500/30 rounded-3xl shadow-2xl">
                  <div className="text-8xl mb-6">💰</div>
                  <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-300 via-white to-green-200 mb-6">
                    Sites que <br />
                    <span className="text-green-400">Vendem</span> <br />
                    <span className="text-white">24/7</span>
                  </h1>
                  <p className="text-xl sm:text-2xl text-green-100 mb-8 leading-relaxed">
                    Não apenas bonitos, mas máquinas de conversão. Sites otimizados que trabalham para você enquanto você dorme.
                  </p>
                  <button
                    onClick={() => scrollToSection("projetos")}
                    className="px-12 py-6 bg-gradient-to-r from-green-600 to-green-800 text-white rounded-full font-bold text-2xl shadow-2xl hover:from-green-700 hover:to-green-900 transition-all duration-300 transform hover:scale-110 flex items-center gap-3 mx-auto"
                  >
                    <FaEnvelope />
                    Ver Cases de Sucesso
                  </button>
                </div>
              </div>
            </div>

            {/* Slide 3 - Tecnologia de Ponta */}
            <div className="carousel-slide absolute inset-0 flex items-center justify-center transition-all duration-1000 opacity-0" id="slide-3">
              <div className="text-center px-4 min-w-[1920px] max-w-[1920px] mx-auto">
                <div className="glassmorphism p-12 backdrop-blur-2xl bg-black/20 border border-blue-500/30 rounded-3xl shadow-2xl">
                  <div className="text-8xl mb-6">⚡</div>
                  <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 via-white to-blue-200 mb-6">
                    Tecnologia <br />
                    <span className="text-blue-400">Avançada</span> <br />
                    <span className="text-white">Performance</span>
                  </h1>
                  <p className="text-xl sm:text-2xl text-blue-100 mb-8 leading-relaxed">
                    React, Next.js, Node.js e IA. As tecnologias mais modernas do mercado para resultados extraordinários.
                  </p>
                  <button
                    onClick={() => scrollToSection("servicos")}
                    className="px-12 py-6 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-full font-bold text-2xl shadow-2xl hover:from-blue-700 hover:to-blue-900 transition-all duration-300 transform hover:scale-110 flex items-center gap-3 mx-auto"
                  >
                    <FaCogs />
                    Conhecer Tecnologias
                  </button>
                </div>
              </div>
            </div>

            {/* Slide 4 - Suporte Premium */}
            <div className="carousel-slide absolute inset-0 flex items-center justify-center transition-all duration-1000 opacity-0" id="slide-4">
              <div className="text-center px-4 min-w-[1920px] max-w-[1920px] mx-auto">
                <div className="glassmorphism p-12 backdrop-blur-2xl bg-black/20 border border-orange-500/30 rounded-3xl shadow-2xl">
                  <div className="text-8xl mb-6">🎯</div>
                  <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-300 via-white to-orange-200 mb-6">
                    Suporte <br />
                    <span className="text-orange-400">Premium</span> <br />
                    <span className="text-white">Vitalício</span>
                  </h1>
                  <p className="text-xl sm:text-2xl text-orange-100 mb-8 leading-relaxed">
                    Não te abandonamos após a entrega. Suporte contínuo, atualizações e crescimento junto com seu negócio.
                  </p>
                  <button
                    onClick={() => scrollToSection("contato")}
                    className="px-12 py-6 bg-gradient-to-r from-orange-600 to-orange-800 text-white rounded-full font-bold text-2xl shadow-2xl hover:from-orange-700 hover:to-orange-900 transition-all duration-300 transform hover:scale-110 flex items-center gap-3 mx-auto"
                  >
                    <FaHeart />
                    Quero Esse Suporte
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Carousel Indicators */}
          <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-30 flex gap-3">
            <button className="carousel-indicator w-4 h-4 rounded-full bg-purple-400 opacity-100 transition-all duration-300" data-slide="1"></button>
            <button className="carousel-indicator w-4 h-4 rounded-full bg-white/50 opacity-50 transition-all duration-300 hover:opacity-75" data-slide="2"></button>
            <button className="carousel-indicator w-4 h-4 rounded-full bg-white/50 opacity-50 transition-all duration-300 hover:opacity-75" data-slide="3"></button>
            <button className="carousel-indicator w-4 h-4 rounded-full bg-white/50 opacity-50 transition-all duration-300 hover:opacity-75" data-slide="4"></button>
          </div>

          {/* Carousel Navigation Arrows */}
          <button className="carousel-prev absolute left-8 top-1/2 transform -translate-y-1/2 z-30 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300">
            <span className="text-2xl">‹</span>
          </button>
          <button className="carousel-next absolute right-8 top-1/2 transform -translate-y-1/2 z-30 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-all duration-300">
            <span className="text-2xl">›</span>
          </button>
        </section>

        {/* BANNER COM 4 CARDS CHAMATIVOS */}
        <section className="py-16 px-4 relative z-20 overflow-x-auto">
          <div className="min-w-[1920px] max-w-[1920px] mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-white to-purple-200 mb-4">
                🚀 Transforme sua Ideia em Realidade Digital
              </h2>
              <p className="text-xl text-purple-100 max-w-3xl mx-auto">
                Descubra como podemos revolucionar seu negócio com tecnologia de ponta
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1 - Velocidade Extrema */}
              <div className="glassmorphism p-8 text-center hover:scale-105 transition-all duration-300 group cursor-pointer min-h-[300px] flex flex-col justify-between">
                <div>
                  <div className="text-6xl mb-4 group-hover:animate-bounce">⚡</div>
                  <h3 className="text-xl font-bold text-purple-200 mb-3">
                    Velocidade Extrema
                  </h3>
                  <p className="text-purple-100 text-sm leading-relaxed">
                    Sites que carregam em <span className="text-purple-300 font-bold">menos de 2 segundos</span>. 
                    Performance otimizada que mantém seus usuários engajados e aumenta conversões.
                  </p>
                </div>
                <div className="mt-4 py-2 px-4 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-full">
                  <span className="text-yellow-300 font-semibold text-sm">💨 Ultra Rápido</span>
                </div>
              </div>

              {/* Card 2 - Design Irresistível */}
              <div className="glassmorphism p-8 text-center hover:scale-105 transition-all duration-300 group cursor-pointer min-h-[300px] flex flex-col justify-between">
                <div>
                  <div className="text-6xl mb-4 group-hover:animate-pulse">🎨</div>
                  <h3 className="text-xl font-bold text-purple-200 mb-3">
                    Design Irresistível
                  </h3>
                  <p className="text-purple-100 text-sm leading-relaxed">
                    Interfaces que <span className="text-purple-300 font-bold">hipnotizam usuários</span>. 
                    Design moderno, responsivo e otimizado para conversão em todos os dispositivos.
                  </p>
                </div>
                <div className="mt-4 py-2 px-4 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full">
                  <span className="text-pink-300 font-semibold text-sm">✨ Visualmente Impactante</span>
                </div>
              </div>

              {/* Card 3 - Tecnologia de Ponta */}
              <div className="glassmorphism p-8 text-center hover:scale-105 transition-all duration-300 group cursor-pointer min-h-[300px] flex flex-col justify-between">
                <div>
                  <div className="text-6xl mb-4 group-hover:animate-spin">🔥</div>
                  <h3 className="text-xl font-bold text-purple-200 mb-3">
                    Tecnologia de Ponta
                  </h3>
                  <p className="text-purple-100 text-sm leading-relaxed">
                    <span className="text-purple-300 font-bold">React, Next.js, Node.js</span> e as mais 
                    avançadas ferramentas do mercado. Seu projeto sempre à frente da concorrência.
                  </p>
                </div>
                <div className="mt-4 py-2 px-4 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full">
                  <span className="text-blue-300 font-semibold text-sm">🚀 Futuro-proof</span>
                </div>
              </div>

              {/* Card 4 - ROI Garantido */}
              <div className="glassmorphism p-8 text-center hover:scale-105 transition-all duration-300 group cursor-pointer min-h-[300px] flex flex-col justify-between">
                <div>
                  <div className="text-6xl mb-4 group-hover:animate-bounce">💰</div>
                  <h3 className="text-xl font-bold text-purple-200 mb-3">
                    ROI Garantido
                  </h3>
                  <p className="text-purple-100 text-sm leading-relaxed">
                    Investimento que <span className="text-purple-300 font-bold">se paga sozinho</span>. 
                    Soluções que geram leads, aumentam vendas e impulsionam seu faturamento.
                  </p>
                </div>
                <div className="mt-4 py-2 px-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-full">
                  <span className="text-green-300 font-semibold text-sm">📈 Resultados Reais</span>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center mt-12">
              <button
                onClick={() => scrollToSection("contato")}
                className="px-12 py-6 bg-gradient-to-r from-purple-600 via-purple-700 to-purple-800 text-white rounded-full font-bold text-2xl shadow-2xl hover:from-purple-700 hover:via-purple-800 hover:to-purple-900 transition-all duration-300 transform hover:scale-110 hover:shadow-purple-500/50 flex items-center gap-3 mx-auto"
              >
                <FaRocket className="text-2xl" />
                Quero Transformar Meu Negócio Agora!
                <span className="text-yellow-300">⚡</span>
              </button>
              <p className="text-purple-300 mt-4 text-lg">
                💎 <span className="font-semibold">Consultoria gratuita</span> • ⚡ <span className="font-semibold">Resposta em 24h</span> • 🎯 <span className="font-semibold">Orçamento personalizado</span>
              </p>
            </div>
          </div>
        </section>

        {/* SOBRE MIM */}
        <section
          className="py-16 px-4 relative z-20 mt-16 mb-16 overflow-x-auto"
          id="sobre"
        >
          <div className="glassmorphism p-6 md:p-8 relative overflow-hidden min-w-[1920px] max-w-[1920px] mx-auto">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-4 left-4 text-4xl md:text-6xl text-purple-400">
                {"<>"}
              </div>
              <div className="absolute bottom-4 right-4 text-4xl md:text-6xl text-purple-400 rotate-180">
                {"<>"}
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-6xl md:text-8xl text-purple-400/30">
                {"</>"}
              </div>
            </div>

            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12 text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-white">
                Sobre Marcos Felippe
              </h2>

              {/* Seção Principal */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 mb-6 lg:mb-8">
                {/* Foto e Info Básica */}
                <div className="lg:col-span-1 text-center lg:text-left">
                  <div className="flex flex-col items-center lg:items-start">
                    <div className="relative inline-block mb-4 lg:mb-6">
                      <Image
                        src="https://avatars.githubusercontent.com/u/64865137?v=4"
                        alt="Marcos Felippe"
                        width={200}
                        height={200}
                        loading="lazy"
                        placeholder="blur"
                        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkbHB0eH/xAAVAQEBAQEAAAAAAAAAAAAAAAAAAQIF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigD"
                        className="w-40 h-40 md:w-48 md:h-48 rounded-full border-4 border-purple-500/50 shadow-2xl object-cover relative z-10 hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 w-40 h-40 md:w-48 md:h-48 rounded-full bg-purple-500/20 blur-xl animate-pulse" />
                    </div>

                    <h3 className="text-xl md:text-2xl font-bold text-purple-200 mb-2">
                      Marcos Felippe
                    </h3>
                    <p className="text-purple-300 mb-4 md:mb-6">
                      Desenvolvedor Fullstack Senior
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-2 md:gap-3 mb-6 w-full max-w-xs">
                      <div className="bg-black/20 backdrop-blur-sm border border-purple-500/20 rounded-lg p-3 text-center">
                        <div className="text-xl md:text-2xl font-bold text-purple-300">
                          3+
                        </div>
                        <div className="text-xs md:text-sm text-purple-200">
                          Anos Exp.
                        </div>
                      </div>
                      <div className="bg-black/20 backdrop-blur-sm border border-purple-500/20 rounded-lg p-3 text-center">
                        <div className="text-xl md:text-2xl font-bold text-purple-300">
                          50+
                        </div>
                        <div className="text-xs md:text-sm text-purple-200">
                          Projetos
                        </div>
                      </div>
                      <div className="bg-black/20 backdrop-blur-sm border border-purple-500/20 rounded-lg p-3 text-center">
                        <div className="text-xl md:text-2xl font-bold text-purple-300">
                          2k+
                        </div>
                        <div className="text-xs md:text-sm text-purple-200">
                          Commits
                        </div>
                      </div>
                      <div className="bg-black/20 backdrop-blur-sm border border-purple-500/20 rounded-lg p-3 text-center">
                        <div className="text-xl md:text-2xl font-bold text-purple-300">
                          24/7
                        </div>
                        <div className="text-xs md:text-sm text-purple-200">
                          Suporte
                        </div>
                      </div>
                    </div>

                    {/* Download CV */}
                    <div className="w-full max-w-xs">
                      <p className="text-purple-200 font-semibold mb-3 text-center lg:text-left">
                        Download Currículo:
                      </p>
                      <div className="flex flex-col gap-2">
                        <a
                          href="/cv/curriculo-marcos-felippe-pt.pdf"
                          download
                          className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-purple-800 rounded-lg text-white font-semibold shadow-lg hover:from-purple-700 hover:to-purple-900 transition-all duration-300 transform hover:scale-105 text-sm"
                        >
                          <FaFilePdf className="text-base" />
                          CV Português
                        </a>
                        <a
                          href="/cv/curriculo-marcos-felippe-en.pdf"
                          download
                          className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg text-white font-semibold shadow-lg hover:from-blue-700 hover:to-blue-900 transition-all duration-300 transform hover:scale-105 text-sm"
                        >
                          <FaFilePdf className="text-base" />
                          CV English
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Descrição - Largura total */}
                <div className="lg:col-span-2">
                  {/* Descrição Principal */}
                  <div className="mb-6">
                    <h4 className="text-lg md:text-xl font-bold text-purple-300 mb-3 flex items-center gap-2">
                      <FaUser />
                      Quem sou eu
                    </h4>
                    <div className="text-purple-100 space-y-3 leading-relaxed text-sm md:text-base">
                      <p>
                        Olá! Sou{" "}
                        <strong className="text-purple-300">
                          Marcos Felippe
                        </strong>
                        , desenvolvedor Fullstack apaixonado por criar
                        experiências digitais extraordinárias. Com mais de 3
                        anos de experiência, especializo-me em transformar
                        ideias complexas em soluções simples, elegantes e
                        altamente performáticas.
                      </p>
                      <p>
                        Minha jornada começou com curiosidade pela tecnologia e
                        evoluiu para uma expertise sólida em{" "}
                        <strong className="text-purple-300">
                          React, Next.js, Node.js
                        </strong>{" "}
                        e ecossistema JavaScript/TypeScript. Tenho paixão
                        especial por automação, DevOps e arquiteturas
                        escaláveis.
                      </p>
                      <p>
                        Quando não estou codificando, você me encontrará
                        explorando novas tecnologias, contribuindo para projetos
                        open source ou ajudando outros desenvolvedores a
                        crescerem na comunidade tech.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expertise Técnica e Minha Abordagem - Largura total */}
              <div className="space-y-4 mb-6">
                {/* Expertise Técnica - 4 colunas */}
                <div>
                  <h4 className="text-lg md:text-xl font-bold text-purple-300 mb-4 flex items-center gap-2">
                    <FaCode />
                    Expertise Técnica
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-black/20 backdrop-blur-sm border border-purple-500/20 rounded-lg p-4">
                      <h5 className="font-semibold text-purple-300 mb-2 flex items-center gap-2 text-sm md:text-base">
                        <FaReact className="text-blue-400" />
                        Frontend
                      </h5>
                      <ul className="text-purple-200 text-xs md:text-sm space-y-1">
                        <li>• React 18 + Next.js 14/15</li>
                        <li>• TypeScript & JavaScript ES6+</li>
                        <li>• TailwindCSS & Styled Components</li>
                        <li>• State Management (Zustand, Redux)</li>
                        <li>• Responsive Design & PWA</li>
                      </ul>
                    </div>

                    <div className="bg-black/20 backdrop-blur-sm border border-purple-500/20 rounded-lg p-4">
                      <h5 className="font-semibold text-purple-300 mb-3 flex items-center gap-2 text-sm md:text-base">
                        <FaServer className="text-green-400" />
                        Backend
                      </h5>
                      <ul className="text-purple-200 text-xs md:text-sm space-y-1">
                        <li>• Node.js + Express/Fastify</li>
                        <li>• NestJS & Clean Architecture</li>
                        <li>• PostgreSQL, MongoDB, Redis</li>
                        <li>• Prisma ORM & TypeORM</li>
                        <li>• RESTful APIs & GraphQL</li>
                      </ul>
                    </div>

                    <div className="bg-black/20 backdrop-blur-sm border border-purple-500/20 rounded-lg p-4">
                      <h5 className="font-semibold text-purple-300 mb-3 flex items-center gap-2 text-sm md:text-base">
                        <FaCogs className="text-orange-400" />
                        DevOps & Tools
                      </h5>
                      <ul className="text-purple-200 text-xs md:text-sm space-y-1">
                        <li>• Docker & Kubernetes</li>
                        <li>• AWS, Vercel, Railway</li>
                        <li>• GitHub Actions & CI/CD</li>
                        <li>• n8n & Typebot Automation</li>
                        <li>• Monitoring & Analytics</li>
                      </ul>
                    </div>

                    <div className="bg-black/20 backdrop-blur-sm border border-purple-500/20 rounded-lg p-4">
                      <h5 className="font-semibold text-purple-300 mb-3 flex items-center gap-2 text-sm md:text-base">
                        <FaLightbulb className="text-yellow-400" />
                        Soft Skills
                      </h5>
                      <ul className="text-purple-200 text-xs md:text-sm space-y-1">
                        <li>• Resolução de Problemas</li>
                        <li>• Comunicação Efetiva</li>
                        <li>• Trabalho em Equipe</li>
                        <li>• Aprendizado Contínuo</li>
                        <li>• Mentalidade Ágil</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Minha Abordagem - 3 colunas */}
                <div>
                  <h4 className="text-lg md:text-xl font-bold text-purple-300 mb-4 flex items-center gap-2">
                    <FaHeart />
                    Minha Abordagem
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-black/10 rounded-lg border border-purple-500/10">
                      <FaRocket className="text-2xl md:text-3xl text-purple-400 mx-auto mb-2" />
                      <h5 className="font-semibold text-purple-300 mb-1 text-sm md:text-base">
                        Performance
                      </h5>
                      <p className="text-purple-200 text-xs md:text-sm">
                        Código otimizado para velocidade e eficiência máxima
                      </p>
                    </div>
                    <div className="text-center p-4 bg-black/10 rounded-lg border border-purple-500/10">
                      <FaUsers className="text-2xl md:text-3xl text-purple-400 mx-auto mb-2" />
                      <h5 className="font-semibold text-purple-300 mb-1 text-sm md:text-base">
                        UX Focus
                      </h5>
                      <p className="text-purple-200 text-xs md:text-sm">
                        Experiência do usuário sempre em primeiro lugar
                      </p>
                    </div>
                    <div className="text-center p-4 bg-black/10 rounded-lg border border-purple-500/10">
                      <FaCog className="text-2xl md:text-3xl text-purple-400 mx-auto mb-2" />
                      <h5 className="font-semibold text-purple-300 mb-1 text-sm md:text-base">
                        Escalabilidade
                      </h5>
                      <p className="text-purple-200 text-xs md:text-sm">
                        Arquiteturas preparadas para o crescimento
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social Links - Uma linha */}
              <div className="text-center pt-6 border-t border-purple-500/20">
                <p className="text-purple-200 mb-4 text-sm md:text-base">
                  Vamos nos conectar!
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  <a
                    href="https://github.com/mfelipperd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 md:px-6 py-3 bg-gray-800 rounded-full text-white font-semibold shadow-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-105 text-sm md:text-base"
                  >
                    <FaGithub className="text-base md:text-lg" />
                    GitHub
                  </a>
                  <a
                    href="https://www.linkedin.com/in/mfelipperd/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 md:px-6 py-3 bg-blue-600 rounded-full text-white font-semibold shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 text-sm md:text-base"
                  >
                    <FaLinkedin className="text-base md:text-lg" />
                    LinkedIn
                  </a>
                  <button
                    onClick={() => scrollToSection("contato")}
                    className="flex items-center gap-2 px-4 md:px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-800 rounded-full text-white font-semibold shadow-lg hover:from-purple-700 hover:to-purple-900 transition-all duration-300 transform hover:scale-105 text-sm md:text-base"
                  >
                    <FaEnvelope className="text-base md:text-lg" />
                    Contato
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TECNOLOGIAS */}
        <section className="py-16 px-4 relative z-20 mt-16 mb-16 overflow-x-auto">
          <div className="glassmorphism p-8 relative overflow-hidden min-w-[1920px] max-w-[1920px] mx-auto">
            {/* Grid Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="grid grid-cols-8 gap-4 h-full">
                {Array.from({ length: 32 }).map((_, i) => (
                  <div
                    key={i}
                    className="border border-purple-500/20 rounded"
                  />
                ))}
              </div>
            </div>

            <h3 className="text-3xl font-bold mb-12 text-purple-200 text-center relative z-10">
              Tecnologias que Domino
            </h3>
            <Suspense
              fallback={
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                  {Array(12)
                    .fill(0)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="bg-purple-900/30 h-24 rounded-xl animate-pulse"
                      ></div>
                    ))}
                </div>
              }
            >
              <TechnologiesGrid />
            </Suspense>
          </div>
        </section>

        {/* SERVIÇOS */}
        <section
          className="py-16 px-4 relative z-20 mt-16 mb-16 overflow-x-auto"
          id="servicos"
        >
          <div className="glassmorphism p-8 min-w-[1920px] max-w-[1920px] mx-auto">
            <h3 className="text-3xl font-bold mb-8 text-purple-200 text-center">
              Como Posso Transformar Seu Negócio
            </h3>
            <div className="flex gap-4 overflow-x-auto pb-4">
              <div className="bg-black/30 backdrop-blur-lg border border-purple-700/20 rounded-xl p-8 hover:border-purple-400/40 transition group h-full flex flex-col min-w-[1920px] max-w-[1920px]">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                  🚀
                </div>
                <h4 className="font-bold text-xl mb-4 text-purple-100">
                  Landing Pages de Alto Impacto
                </h4>
                <p className="text-purple-200 mb-4">
                  Páginas que convertem visitantes em clientes. Design moderno,
                  carregamento rápido e otimização para conversão.
                </p>
                <ul className="text-purple-300 text-sm space-y-1">
                  <li>• Design responsivo e moderno</li>
                  <li>• Otimização para SEO</li>
                  <li>• Integração com analytics</li>
                </ul>
              </div>

              <div className="bg-black/30 backdrop-blur-lg border border-purple-700/20 rounded-xl p-8 hover:border-purple-400/40 transition group h-full flex flex-col min-w-[1920px] max-w-[1920px]">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                  💼
                </div>
                <h4 className="font-bold text-xl mb-4 text-purple-100">
                  Sites Institucionais
                </h4>
                <p className="text-purple-200 mb-4">
                  Presença digital profissional que transmite credibilidade e
                  gera confiança nos seus clientes.
                </p>
                <ul className="text-purple-300 text-sm space-y-1">
                  <li>• CMS personalizado</li>
                  <li>• Painel administrativo</li>
                  <li>• Múltiplas páginas</li>
                </ul>
              </div>

              <div className="bg-black/30 backdrop-blur-lg border border-purple-700/20 rounded-xl p-8 hover:border-purple-400/40 transition group h-full flex flex-col min-w-[1920px] max-w-[1920px]">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                  ⚡
                </div>
                <h4 className="font-bold text-xl mb-4 text-purple-100">
                  Aplicações Web
                </h4>
                <p className="text-purple-200 mb-4">
                  Sistemas web completos, dashboards, e-commerce e soluções
                  personalizadas para sua empresa.
                </p>
                <ul className="text-purple-300 text-sm space-y-1">
                  <li>• React + Node.js</li>
                  <li>• Banco de dados</li>
                  <li>• APIs personalizadas</li>
                </ul>
              </div>

              <div className="bg-black/30 backdrop-blur-lg border border-purple-700/20 rounded-xl p-8 hover:border-purple-400/40 transition group h-full flex flex-col min-w-[1920px] max-w-[1920px]">
                <div className="flex items-center text-4xl mb-4 group-hover:scale-110 transition-transform">
                  <SiN8N className="text-orange-500 mr-2" />
                  <BsLightning className="text-yellow-400" />
                </div>
                <h4 className="font-bold text-xl mb-4 text-purple-100">
                  Automação com n8n
                </h4>
                <p className="text-purple-200 mb-4">
                  Automatize processos repetitivos, integre sistemas e otimize
                  fluxos de trabalho com n8n workflow automation.
                </p>
                <ul className="text-purple-300 text-sm space-y-1">
                  <li>• Integração de APIs</li>
                  <li>• Automação de emails</li>
                  <li>• Fluxos personalizados</li>
                </ul>
              </div>

              <div className="bg-black/30 backdrop-blur-lg border border-purple-700/20 rounded-xl p-8 hover:border-purple-400/40 transition group h-full flex flex-col min-w-[1920px] max-w-[1920px]">
                <div className="flex items-center text-4xl mb-4 group-hover:scale-110 transition-transform">
                  <BsRobot className="text-blue-500 mr-2" />
                </div>
                <h4 className="font-bold text-xl mb-4 text-purple-100">
                  Chatbots com Typebot
                </h4>
                <p className="text-purple-200 mb-4">
                  Chatbots inteligentes para atendimento 24/7, geração de leads
                  e automação de vendas usando Typebot.
                </p>
                <ul className="text-purple-300 text-sm space-y-1">
                  <li>• Conversas automatizadas</li>
                  <li>• Integração WhatsApp</li>
                  <li>• Geração de leads</li>
                </ul>
              </div>

              <div className="bg-black/30 backdrop-blur-lg border border-purple-700/20 rounded-xl p-8 hover:border-purple-400/40 transition group h-full flex flex-col min-w-[1920px] max-w-[1920px]">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                  🤖
                </div>
                <h4 className="font-bold text-xl mb-4 text-purple-100">
                  Automação Completa
                </h4>
                <p className="text-purple-200 mb-4">
                  Soluções completas de automação que conectam todos os seus
                  sistemas e processos de negócio.
                </p>
                <ul className="text-purple-300 text-sm space-y-1">
                  <li>• CRM automatizado</li>
                  <li>• Marketing automation</li>
                  <li>• Relatórios automáticos</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* PROJETOS EM DESTAQUE */}
        <section
          className="py-16 px-4 relative z-20 mt-16 mb-16 overflow-x-auto"
          id="projetos"
        >
          <div className="glassmorphism p-8 min-w-[1920px] max-w-[1920px] mx-auto">
            <h3 className="text-3xl font-bold mb-8 text-purple-200 text-center">
              Projetos Reais
            </h3>
            <div className="flex gap-4 overflow-x-auto pb-4">
              {/* Sistema de Credenciamento */}
              <div className="bg-black/30 backdrop-blur-lg border border-purple-700/20 rounded-xl p-6 hover:border-purple-400/40 transition group h-full flex flex-col min-w-[1920px] max-w-[1920px]">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-lg text-purple-100">
                    Sistema Credenciamento
                  </h4>
                  <span className="text-xs bg-green-700 text-white px-2 py-1 rounded">
                    Produção
                  </span>
                </div>
                <p className="text-purple-200 text-sm mb-3">
                  Sistema enterprise para gestão de credenciamentos com React e
                  NestJS.
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  <span className="text-xs bg-purple-900/50 text-purple-200 px-2 py-1 rounded">
                    React
                  </span>
                  <span className="text-xs bg-purple-900/50 text-purple-200 px-2 py-1 rounded">
                    NestJS
                  </span>
                  <span className="text-xs bg-purple-900/50 text-purple-200 px-2 py-1 rounded">
                    PostgreSQL
                  </span>
                </div>
                <a
                  href="https://github.com/mfelipperd/credenciamento-frontend"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-200 transition text-sm"
                >
                  Ver GitHub →
                </a>
              </div>

              {/* API de Performance */}
              <div className="bg-black/30 backdrop-blur-lg border border-purple-700/20 rounded-xl p-6 hover:border-purple-400/40 transition group h-full flex flex-col min-w-[1920px] max-w-[1920px]">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-lg text-purple-100">
                    API Alto Performance
                  </h4>
                  <span className="text-xs bg-blue-700 text-white px-2 py-1 rounded">
                    Backend
                  </span>
                </div>
                <p className="text-purple-200 text-sm mb-3">
                  API REST otimizada com cache Redis e paginação inteligente.
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  <span className="text-xs bg-purple-900/50 text-purple-200 px-2 py-1 rounded">
                    NestJS
                  </span>
                  <span className="text-xs bg-purple-900/50 text-purple-200 px-2 py-1 rounded">
                    Redis
                  </span>
                  <span className="text-xs bg-purple-900/50 text-purple-200 px-2 py-1 rounded">
                    Prisma
                  </span>
                </div>
                <span className="text-purple-400 text-sm">
                  Código proprietário
                </span>
              </div>

              {/* E-commerce Platform */}
              <div className="bg-black/30 backdrop-blur-lg border border-purple-700/20 rounded-xl p-6 hover:border-purple-400/40 transition group h-full flex flex-col min-w-[1920px] max-w-[1920px]">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-lg text-purple-100">
                    E-commerce Platform
                  </h4>
                  <span className="text-xs bg-green-700 text-white px-2 py-1 rounded">
                    Produção
                  </span>
                </div>
                <p className="text-purple-200 text-sm mb-3">
                  Plataforma completa de e-commerce com carrinho, pagamentos e
                  gestão de produtos.
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  <span className="text-xs bg-purple-900/50 text-purple-200 px-2 py-1 rounded">
                    Next.js
                  </span>
                  <span className="text-xs bg-purple-900/50 text-purple-200 px-2 py-1 rounded">
                    Stripe
                  </span>
                  <span className="text-xs bg-purple-900/50 text-purple-200 px-2 py-1 rounded">
                    MongoDB
                  </span>
                </div>
                <a
                  href="https://github.com/mfelipperd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-200 transition text-sm"
                >
                  Ver GitHub →
                </a>
              </div>

              {/* Dashboard Analytics */}
              <div className="bg-black/30 backdrop-blur-lg border border-purple-700/20 rounded-xl p-6 hover:border-purple-400/40 transition group h-full flex flex-col min-w-[1920px] max-w-[1920px]">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-lg text-purple-100">
                    Dashboard Analytics
                  </h4>
                  <span className="text-xs bg-green-700 text-white px-2 py-1 rounded">
                    Ativo
                  </span>
                </div>
                <p className="text-purple-200 text-sm mb-3">
                  Dashboard com gráficos ApexCharts e métricas em tempo real.
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  <span className="text-xs bg-purple-900/50 text-purple-200 px-2 py-1 rounded">
                    React
                  </span>
                  <span className="text-xs bg-purple-900/50 text-purple-200 px-2 py-1 rounded">
                    ApexCharts
                  </span>
                  <span className="text-xs bg-purple-900/50 text-purple-200 px-2 py-1 rounded">
                    Tailwind
                  </span>
                </div>
                <span className="text-purple-400 text-sm">Sistema interno</span>
              </div>

              {/* Automação N8N */}
              <div className="bg-black/30 backdrop-blur-lg border border-purple-700/20 rounded-xl p-6 hover:border-purple-400/40 transition group h-full flex flex-col min-w-[1920px] max-w-[1920px]">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-lg text-purple-100">
                    Automação N8N
                  </h4>
                  <span className="text-xs bg-orange-700 text-white px-2 py-1 rounded">
                    Workflow
                  </span>
                </div>
                <p className="text-purple-200 text-sm mb-3">
                  Workflows complexos de automação integrando APIs e bancos de
                  dados.
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  <span className="text-xs bg-purple-900/50 text-purple-200 px-2 py-1 rounded">
                    N8N
                  </span>
                  <span className="text-xs bg-purple-900/50 text-purple-200 px-2 py-1 rounded">
                    Webhooks
                  </span>
                  <span className="text-xs bg-purple-900/50 text-purple-200 px-2 py-1 rounded">
                    APIs
                  </span>
                </div>
                <span className="text-purple-400 text-sm">
                  Projetos diversos
                </span>
              </div>

              {/* Chat Bot WhatsApp */}
              <div className="bg-black/30 backdrop-blur-lg border border-purple-700/20 rounded-xl p-6 hover:border-purple-400/40 transition group h-full flex flex-col min-w-[1920px] max-w-[1920px]">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-lg text-purple-100">
                    Bot WhatsApp
                  </h4>
                  <span className="text-xs bg-green-700 text-white px-2 py-1 rounded">
                    Ativo
                  </span>
                </div>
                <p className="text-purple-200 text-sm mb-3">
                  Chatbot inteligente para WhatsApp com integração de IA e
                  atendimento automatizado.
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  <span className="text-xs bg-purple-900/50 text-purple-200 px-2 py-1 rounded">
                    Node.js
                  </span>
                  <span className="text-xs bg-purple-900/50 text-purple-200 px-2 py-1 rounded">
                    WhatsApp API
                  </span>
                  <span className="text-xs bg-purple-900/50 text-purple-200 px-2 py-1 rounded">
                    OpenAI
                  </span>
                </div>
                <a
                  href="https://github.com/mfelipperd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-200 transition text-sm"
                >
                  Ver GitHub →
                </a>
              </div>

              {/* Sistema de Gestão Escolar */}
              <div className="bg-black/30 backdrop-blur-lg border border-purple-700/20 rounded-xl p-6 hover:border-purple-400/40 transition group h-full flex flex-col min-w-[1920px] max-w-[1920px]">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-lg text-purple-100">
                    Gestão Escolar
                  </h4>
                  <span className="text-xs bg-blue-700 text-white px-2 py-1 rounded">
                    Enterprise
                  </span>
                </div>
                <p className="text-purple-200 text-sm mb-3">
                  Sistema completo para gestão escolar com controle de alunos,
                  notas e relatórios.
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  <span className="text-xs bg-purple-900/50 text-purple-200 px-2 py-1 rounded">
                    React
                  </span>
                  <span className="text-xs bg-purple-900/50 text-purple-200 px-2 py-1 rounded">
                    Express
                  </span>
                  <span className="text-xs bg-purple-900/50 text-purple-200 px-2 py-1 rounded">
                    MySQL
                  </span>
                </div>
                <span className="text-purple-400 text-sm">
                  Sistema proprietário
                </span>
              </div>

              {/* Call to Action - Seu Projeto */}
              <div className="bg-black/30 backdrop-blur-lg border border-purple-700/20 rounded-xl p-6 hover:border-purple-400/40 transition group border-dashed">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-lg text-purple-100">
                    Seu Projeto
                  </h4>
                  <span className="text-xs bg-yellow-700 text-white px-2 py-1 rounded">
                    Próximo
                  </span>
                </div>
                <p className="text-purple-200 text-sm mb-3">
                  Vamos criar algo incrível juntos? Entre em contato!
                </p>
                <div className="flex flex-wrap gap-1 mb-3">
                  <span className="text-xs bg-purple-900/50 text-purple-200 px-2 py-1 rounded">
                    Sua Ideia
                  </span>
                  <span className="text-xs bg-purple-900/50 text-purple-200 px-2 py-1 rounded">
                    Nossa Expertise
                  </span>
                  <span className="text-xs bg-purple-900/50 text-purple-200 px-2 py-1 rounded">
                    Sucesso
                  </span>
                </div>
                <button
                  onClick={() => scrollToSection("contato")}
                  className="text-purple-400 hover:text-purple-200 transition text-sm"
                >
                  Vamos Conversar →
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ESTATÍSTICAS */}
        <section className="py-16 px-4 relative z-20 mt-16 mb-16 overflow-x-auto">
          <div className="glassmorphism p-8 min-w-[1920px] max-w-[1920px] mx-auto">
            <h3 className="text-3xl font-bold mb-8 text-purple-200 text-center">
              Números que Impressionam
            </h3>
            <div className="flex gap-4 overflow-x-auto pb-4">
              <div className="text-center min-w-[1920px] max-w-[1920px] bg-black/30 backdrop-blur-lg border border-purple-700/20 rounded-xl p-8 hover:border-purple-400/40 transition">
                <div className="text-4xl font-bold text-purple-300 mb-2">
                  2.250+
                </div>
                <p className="text-purple-200">Contribuições no GitHub</p>
              </div>
              <div className="text-center min-w-[1920px] max-w-[1920px] bg-black/30 backdrop-blur-lg border border-purple-700/20 rounded-xl p-8 hover:border-purple-400/40 transition">
                <div className="text-4xl font-bold text-purple-300 mb-2">
                  38
                </div>
                <p className="text-purple-200">Repositórios</p>
              </div>
              <div className="text-center min-w-[1920px] max-w-[1920px] bg-black/30 backdrop-blur-lg border border-purple-700/20 rounded-xl p-8 hover:border-purple-400/40 transition">
                <div className="text-4xl font-bold text-purple-300 mb-2">
                  3+
                </div>
                <p className="text-purple-200">Anos de Experiência</p>
              </div>
              <div className="text-center min-w-[1920px] max-w-[1920px] bg-black/30 backdrop-blur-lg border border-purple-700/20 rounded-xl p-8 hover:border-purple-400/40 transition">
                <div className="text-4xl font-bold text-purple-300 mb-2">
                  100%
                </div>
                <p className="text-purple-200">Satisfação dos Clientes</p>
              </div>
            </div>
          </div>
        </section>

        {/* SITES EM PRODUÇÃO */}
        <section
          className="py-16 px-4 relative z-20 mt-16 mb-16 overflow-x-auto"
          id="sites"
        >
          <div className="glassmorphism p-8 min-w-[1920px] max-w-[1920px] mx-auto">
            <h3 className="text-3xl font-bold mb-8 text-purple-200 text-center">
              Sites em Produção
            </h3>
            <div className="flex gap-4 overflow-x-auto pb-4">
              <div className="bg-black/30 backdrop-blur-lg border border-purple-700/20 rounded-xl overflow-hidden hover:border-purple-400/40 transition group h-full flex flex-col min-w-[1920px] max-w-[1920px]">
                <div className="relative h-48 bg-gradient-to-br from-blue-600 to-blue-800 overflow-hidden">
                  <iframe
                    src="https://visuallaser.com.br"
                    className="w-full h-96 scale-50 origin-top-left pointer-events-none"
                    title="VisuaLlaser Preview"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <span className="text-xs bg-green-700 text-white px-2 py-1 rounded">
                      ATIVO
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-xl text-purple-100 mb-2">
                    VisuaLlaser
                  </h4>
                  <p className="text-purple-200 text-sm mb-4">
                    Clínica de estética avançada com sistema de agendamento
                    online, galeria de tratamentos e interface moderna
                    responsiva.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-purple-900/50 text-purple-200 px-2 py-1 rounded">
                      WordPress
                    </span>
                    <span className="text-xs bg-purple-900/50 text-purple-200 px-2 py-1 rounded">
                      PHP
                    </span>
                    <span className="text-xs bg-purple-900/50 text-purple-200 px-2 py-1 rounded">
                      MySQL
                    </span>
                  </div>
                  <a
                    href="https://visuallaser.com.br"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-200 transition"
                  >
                    Visitar Site →
                  </a>
                </div>
              </div>

              <div className="bg-black/30 backdrop-blur-lg border border-purple-700/20 rounded-xl overflow-hidden hover:border-purple-400/40 transition group h-full flex flex-col min-w-[1920px] max-w-[1920px]">
                <div className="relative h-48 bg-gradient-to-br from-green-600 to-green-800 overflow-hidden">
                  <iframe
                    src="https://homeidoc.com.br"
                    className="w-full h-96 scale-50 origin-top-left pointer-events-none"
                    title="HomeIdoc Preview"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <span className="text-xs bg-green-700 text-white px-2 py-1 rounded">
                      ATIVO
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-xl text-purple-100 mb-2">
                    HomeIdoc
                  </h4>
                  <p className="text-purple-200 text-sm mb-4">
                    Plataforma de telemedicina com consultas online, prescrições
                    digitais e sistema de agendamento integrado.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-purple-900/50 text-purple-200 px-2 py-1 rounded">
                      React
                    </span>
                    <span className="text-xs bg-purple-900/50 text-purple-200 px-2 py-1 rounded">
                      Node.js
                    </span>
                    <span className="text-xs bg-purple-900/50 text-purple-200 px-2 py-1 rounded">
                      PostgreSQL
                    </span>
                  </div>
                  <a
                    href="https://homeidoc.com.br"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-200 transition"
                  >
                    Visitar Site →
                  </a>
                </div>
              </div>

              <div className="bg-black/30 backdrop-blur-lg border border-purple-700/20 rounded-xl overflow-hidden hover:border-purple-400/40 transition group h-full flex flex-col min-w-[1920px] max-w-[1920px]">
                <div className="relative h-48 bg-gradient-to-br from-orange-600 to-red-800 overflow-hidden">
                  <iframe
                    src="https://lavaflex.com.br"
                    className="w-full h-96 scale-50 origin-top-left pointer-events-none"
                    title="LavaFlex Preview"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute top-4 right-4">
                    <span className="text-xs bg-green-700 text-white px-2 py-1 rounded">
                      ATIVO
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="font-bold text-xl text-purple-100 mb-2">
                    LavaFlex
                  </h4>
                  <p className="text-purple-200 text-sm mb-4">
                    Lava-jato premium com sistema de agendamento, controle de
                    serviços e interface moderna para gestão de clientes.
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs bg-purple-900/50 text-purple-200 px-2 py-1 rounded">
                      HTML5
                    </span>
                    <span className="text-xs bg-purple-900/50 text-purple-200 px-2 py-1 rounded">
                      CSS3
                    </span>
                    <span className="text-xs bg-purple-900/50 text-purple-200 px-2 py-1 rounded">
                      JavaScript
                    </span>
                  </div>
                  <a
                    href="https://lavaflex.com.br"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:text-purple-200 transition"
                  >
                    Visitar Site →
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTATO */}
        <section
          className="py-16 px-4 relative z-20 mt-16 mb-16 overflow-x-auto"
          id="contato"
        >
          <div className="glassmorphism p-8 min-w-[1920px] max-w-[1920px] mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4 text-purple-200">
                Pronto para Decolar seu Projeto?
              </h3>
              <p className="text-xl text-purple-100">
                Vamos transformar sua ideia em uma solução digital que gera
                resultados reais.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-bold mb-6 text-purple-200">
                  Por que me escolher?
                </h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1">✓</span>
                    <div>
                      <strong className="text-purple-100">
                        Entrega Rápida:
                      </strong>
                      <p className="text-purple-200 text-sm">
                        Projetos entregues em até 30 dias
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1">✓</span>
                    <div>
                      <strong className="text-purple-100">Código Limpo:</strong>
                      <p className="text-purple-200 text-sm">
                        Soluções escaláveis e fáceis de manter
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1">✓</span>
                    <div>
                      <strong className="text-purple-100">
                        Suporte Total:
                      </strong>
                      <p className="text-purple-200 text-sm">
                        Acompanhamento mesmo após a entrega
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1">✓</span>
                    <div>
                      <strong className="text-purple-100">Preço Justo:</strong>
                      <p className="text-purple-200 text-sm">
                        Orçamento transparente e sem surpresas
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Suspense
                fallback={
                  <div className="space-y-4 animate-pulse">
                    <div className="h-12 bg-purple-900/30 rounded-lg"></div>
                    <div className="h-12 bg-purple-900/30 rounded-lg"></div>
                    <div className="h-32 bg-purple-900/30 rounded-lg"></div>
                    <div className="h-12 bg-purple-900/30 rounded-lg"></div>
                  </div>
                }
              >
                <ContactForm />
              </Suspense>
            </div>
          </div>
        </section>
      </div>

      {/* RODAPÉ */}
      <footer className="py-8 px-4 text-center relative z-20 overflow-x-auto">
        <div className="min-w-[1920px] max-w-[1920px] mx-auto">
          <p className="text-purple-300 text-sm">
            © 2025 Marcos Felippe. Desenvolvido com ❤️ em Next.js
          </p>
        </div>
      </footer>
    </ParallaxProvider>
  );
}
