"use client";

import { lazy, Suspense, useState, useEffect } from "react";
import { ParallaxProvider } from "react-scroll-parallax";
import Image from "next/image";
import SimpleHeader from "../components/SimpleHeader";
import SimpleCookieBanner from "../components/SimpleCookieBanner";
import ClientOnlyWrapper from "../components/ClientOnlyWrapper";
import { useNotifications } from "../hooks/useNotifications";

// Lazy loading dos componentes pesados
const ContactForm = lazy(() => import("../components/WhatsAppContactForm"));
const AnimatedBackground = lazy(
  () => import("../components/AnimatedBackground")
);

// Lazy loading do componente de tecnologias
const TechnologiesGrid = lazy(() => import("../components/TechnologiesGrid"));

// Lazy loading dos novos componentes de projetos
const GitHubProjects = lazy(() => import("../components/GitHubProjects"));
const VercelProjects = lazy(() => import("../components/VercelProjects"));
const GitHubStats = lazy(() => import("../components/GitHubStats"));
const InteractiveProjects = lazy(() => import("../components/InteractiveProjects"));
const ParticleBackground = lazy(() => import("../components/ParticleBackground"));
const ProductionSites = lazy(() => import("../components/ProductionSites"));

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
  
    // Hook para notificações
  const { 
    startPeriodicNotifications,
    isSupported
  } = useNotifications();

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
  }, [currentSlide, changeSlide]);

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
  }, [currentSlide, changeSlide]);

  // Função para lidar com aceite de cookies e notificações
  const handleCookieAccept = async () => {
    console.log('🔄 handleCookieAccept called, isSupported:', isSupported);
    
    if (isSupported) {
      try {
        // Iniciar notificações periódicas
        console.log('🚀 Starting periodic notifications...');
        startPeriodicNotifications();
        
        console.log('✅ Sistema de notificações ativado com sucesso!');
      } catch (error) {
        console.error('❌ Erro ao ativar notificações:', error);
      }
    } else {
      console.log('❌ Notifications not supported on this device/browser');
    }
  };

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

      <Suspense fallback={null}>
        <ParticleBackground />
      </Suspense>
      
      <SimpleHeader />
      
      {/* Custom Scroll Indicator */}
      <div className="scroll-indicator"></div>
      
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
              <div className="text-center px-4 max-w-7xl mx-auto w-full">
                <div className="glassmorphism p-6 md:p-12 backdrop-blur-2xl bg-black/20 border border-purple-500/30 rounded-3xl shadow-2xl">
                  <div className="text-6xl md:text-8xl mb-6">🚀</div>
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
                                                className="px-6 md:px-12 py-4 md:py-6 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-full font-bold text-lg md:text-2xl shadow-2xl hover:from-purple-700 hover:to-purple-900 transition-all duration-300 transform hover:scale-110 flex items-center gap-2 md:gap-3 mx-auto"
                  >
                    <FaRocket />
                    Começar Transformação
                  </button>
                </div>
              </div>
            </div>

            {/* Slide 2 - Sites que Vendem */}
            <div className="carousel-slide absolute inset-0 flex items-center justify-center transition-all duration-1000 opacity-0" id="slide-2">
              <div className="text-center px-4 max-w-7xl mx-auto w-full">
                <div className="glassmorphism p-12 backdrop-blur-2xl bg-black/20 border border-green-500/30 rounded-3xl shadow-2xl">
                  <div className="text-6xl md:text-8xl mb-6">💰</div>
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
              <div className="text-center px-4 max-w-7xl mx-auto w-full">
                <div className="glassmorphism p-12 backdrop-blur-2xl bg-black/20 border border-blue-500/30 rounded-3xl shadow-2xl">
                  <div className="text-6xl md:text-8xl mb-6">⚡</div>
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
              <div className="text-center px-4 max-w-7xl mx-auto w-full">
                <div className="glassmorphism p-12 backdrop-blur-2xl bg-black/20 border border-orange-500/30 rounded-3xl shadow-2xl">
                  <div className="text-6xl md:text-8xl mb-6">🎯</div>
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
        <section className="py-8 px-4 relative z-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
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

        {/* SOBRE MARCOS FELIPPE - REDESIGN */}
        <section
          className="py-8 px-4 relative z-20 mt-8 mb-8"
          id="sobre"
        >
          <div className="max-w-7xl mx-auto">
            
            {/* Título Principal */}
            <div className="text-center mb-10">
              <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-white to-purple-200 mb-4">
                👨‍💻 Sobre Marcos Felippe
              </h2>
              <p className="text-xl text-purple-100 max-w-3xl mx-auto">
                Desenvolvedor Fullstack apaixonado por transformar ideias em realidade digital
              </p>
            </div>

            {/* Layout Principal em Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              
              {/* Card 1 - Perfil e Estatísticas */}
              <div className="glassmorphism p-8 text-center hover:scale-105 transition-all duration-300">
                <div className="relative inline-block mb-6">
                  <Image
                    src="https://avatars.githubusercontent.com/u/64865137?v=4"
                    alt="Marcos Felippe"
                    width={160}
                    height={160}
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkbHB0eH/xAAVAQEBAQEAAAAAAAAAAAAAAAAAAQIF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigDEnyJigD"
                    className="w-40 h-40 rounded-full border-4 border-purple-500/50 shadow-2xl object-cover relative z-10 hover:rotate-6 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 w-40 h-40 rounded-full bg-purple-500/20 blur-xl animate-pulse" />
                </div>
                
                <h3 className="text-2xl font-bold text-purple-200 mb-2">Marcos Felippe</h3>
                <p className="text-purple-300 mb-6 text-lg">Desenvolvedor Fullstack Senior</p>
                
                {/* Estatísticas em Grid 2x2 */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-black/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-4 hover:border-purple-400/40 transition-all">
                    <div className="text-2xl font-bold text-purple-300">3+</div>
                    <div className="text-sm text-purple-200">Anos Exp.</div>
                  </div>
                  <div className="bg-black/30 backdrop-blur-sm border border-green-500/20 rounded-xl p-4 hover:border-green-400/40 transition-all">
                    <div className="text-2xl font-bold text-green-300">50+</div>
                    <div className="text-sm text-green-200">Projetos</div>
                  </div>
                  <div className="bg-black/30 backdrop-blur-sm border border-blue-500/20 rounded-xl p-4 hover:border-blue-400/40 transition-all">
                    <div className="text-2xl font-bold text-blue-300">2k+</div>
                    <div className="text-sm text-blue-200">Commits</div>
                  </div>
                  <div className="bg-black/30 backdrop-blur-sm border border-orange-500/20 rounded-xl p-4 hover:border-orange-400/40 transition-all">
                    <div className="text-2xl font-bold text-orange-300">24/7</div>
                    <div className="text-sm text-orange-200">Suporte</div>
                  </div>
                </div>

                {/* Downloads CV */}
                <div className="space-y-3">
                  <p className="text-purple-200 font-semibold mb-3">📄 Download Currículo:</p>
                  <a
                    href="/cv/curriculo-marcos-felippe-pt.pdf"
                    download
                    className="block w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl text-white font-semibold shadow-lg hover:from-purple-700 hover:to-purple-900 transition-all duration-300 transform hover:scale-105"
                  >
                    <FaFilePdf className="inline mr-2" />
                    CV Português
                  </a>
                  <a
                    href="/cv/curriculo-marcos-felippe-en.pdf"
                    download
                    className="block w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl text-white font-semibold shadow-lg hover:from-blue-700 hover:to-blue-900 transition-all duration-300 transform hover:scale-105"
                  >
                    <FaFilePdf className="inline mr-2" />
                    CV English
                  </a>
                </div>
              </div>

              {/* Card 2 - Sobre Mim */}
              <div className="glassmorphism p-8 hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <FaUser className="text-2xl text-purple-400" />
                  <h4 className="text-2xl font-bold text-purple-300">Quem Sou Eu</h4>
                </div>
                
                <div className="text-purple-100 space-y-4 leading-relaxed">
                  <p>
                    Olá! Sou <span className="text-purple-300 font-bold">Marcos Felippe</span>, 
                    desenvolvedor Fullstack apaixonado por criar experiências digitais extraordinárias.
                  </p>
                  <p>
                    Com mais de <span className="text-green-300 font-bold">3 anos de experiência</span>, 
                    especializo-me em transformar ideias complexas em soluções simples, elegantes e altamente performáticas.
                  </p>
                  <p>
                    Minha expertise inclui <span className="text-blue-300 font-bold">React, Next.js, Node.js</span> e 
                    todo o ecossistema JavaScript/TypeScript moderno.
                  </p>
                  <p>
                    Tenho paixão especial por <span className="text-orange-300 font-bold">automação, DevOps</span> e 
                    arquiteturas escaláveis que crescem junto com o negócio.
                  </p>
                </div>

                {/* Badges de Especialidades */}
                <div className="flex flex-wrap gap-2 mt-6">
                  <span className="px-3 py-1 bg-purple-600/30 text-purple-200 rounded-full text-sm">React Expert</span>
                  <span className="px-3 py-1 bg-blue-600/30 text-blue-200 rounded-full text-sm">Node.js</span>
                  <span className="px-3 py-1 bg-green-600/30 text-green-200 rounded-full text-sm">DevOps</span>
                  <span className="px-3 py-1 bg-orange-600/30 text-orange-200 rounded-full text-sm">Automação</span>
                </div>
              </div>

              {/* Card 3 - Minha Abordagem */}
              <div className="glassmorphism p-8 hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-3 mb-6">
                  <FaHeart className="text-2xl text-purple-400" />
                  <h4 className="text-2xl font-bold text-purple-300">Minha Abordagem</h4>
                </div>

                <div className="space-y-6">
                  <div className="text-center p-4 bg-black/20 rounded-xl border border-purple-500/20 hover:border-purple-400/40 transition-all">
                    <FaRocket className="text-3xl text-purple-400 mx-auto mb-2" />
                    <h5 className="font-bold text-purple-300 mb-2">Performance</h5>
                    <p className="text-purple-200 text-sm">Código otimizado para velocidade e eficiência máxima</p>
                  </div>

                  <div className="text-center p-4 bg-black/20 rounded-xl border border-green-500/20 hover:border-green-400/40 transition-all">
                    <FaUsers className="text-3xl text-green-400 mx-auto mb-2" />
                    <h5 className="font-bold text-green-300 mb-2">UX Focus</h5>
                    <p className="text-green-200 text-sm">Experiência do usuário sempre em primeiro lugar</p>
                  </div>

                  <div className="text-center p-4 bg-black/20 rounded-xl border border-blue-500/20 hover:border-blue-400/40 transition-all">
                    <FaCog className="text-3xl text-blue-400 mx-auto mb-2" />
                    <h5 className="font-bold text-blue-300 mb-2">Escalabilidade</h5>
                    <p className="text-blue-200 text-sm">Arquiteturas preparadas para o crescimento</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Expertise Técnica - Seção Completa */}
            <div className="glassmorphism p-6 mb-8">
              <div className="flex items-center gap-3 mb-8 justify-center">
                <FaCode className="text-3xl text-purple-400" />
                <h4 className="text-3xl font-bold text-purple-300">Expertise Técnica</h4>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-black/30 backdrop-blur-sm border border-blue-500/20 rounded-xl p-6 hover:border-blue-400/40 transition-all hover:scale-105">
                  <div className="flex items-center gap-2 mb-4">
                    <FaReact className="text-2xl text-blue-400" />
                    <h5 className="font-bold text-blue-300 text-lg">Frontend</h5>
                  </div>
                  <ul className="text-blue-200 space-y-2">
                    <li>• React 18 + Next.js 15</li>
                    <li>• TypeScript & JavaScript ES6+</li>
                    <li>• TailwindCSS & Styled Components</li>
                    <li>• State Management (Zustand, Redux)</li>
                    <li>• Responsive Design & PWA</li>
                  </ul>
                </div>

                <div className="bg-black/30 backdrop-blur-sm border border-green-500/20 rounded-xl p-6 hover:border-green-400/40 transition-all hover:scale-105">
                  <div className="flex items-center gap-2 mb-4">
                    <FaServer className="text-2xl text-green-400" />
                    <h5 className="font-bold text-green-300 text-lg">Backend</h5>
                  </div>
                  <ul className="text-green-200 space-y-2">
                    <li>• Node.js + Express/Fastify</li>
                    <li>• NestJS & Clean Architecture</li>
                    <li>• PostgreSQL, MongoDB, Redis</li>
                    <li>• Prisma ORM & TypeORM</li>
                    <li>• RESTful APIs & GraphQL</li>
                  </ul>
                </div>

                <div className="bg-black/30 backdrop-blur-sm border border-orange-500/20 rounded-xl p-6 hover:border-orange-400/40 transition-all hover:scale-105">
                  <div className="flex items-center gap-2 mb-4">
                    <FaCogs className="text-2xl text-orange-400" />
                    <h5 className="font-bold text-orange-300 text-lg">DevOps & Tools</h5>
                  </div>
                  <ul className="text-orange-200 space-y-2">
                    <li>• Docker & Kubernetes</li>
                    <li>• AWS, Vercel, Railway</li>
                    <li>• GitHub Actions & CI/CD</li>
                    <li>• n8n & Typebot Automation</li>
                    <li>• Monitoring & Analytics</li>
                  </ul>
                </div>

                <div className="bg-black/30 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-400/40 transition-all hover:scale-105">
                  <div className="flex items-center gap-2 mb-4">
                    <FaLightbulb className="text-2xl text-purple-400" />
                    <h5 className="font-bold text-purple-300 text-lg">Soft Skills</h5>
                  </div>
                  <ul className="text-purple-200 space-y-2">
                    <li>• Resolução de Problemas</li>
                    <li>• Comunicação Efetiva</li>
                    <li>• Trabalho em Equipe</li>
                    <li>• Aprendizado Contínuo</li>
                    <li>• Mentalidade Ágil</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Social Links - CTA Final */}
            <div className="glassmorphism p-8 text-center">
              <h4 className="text-2xl font-bold text-purple-300 mb-4">🚀 Vamos Nos Conectar!</h4>
              <p className="text-purple-200 mb-6 text-lg">
                Pronto para transformar sua ideia em realidade digital?
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <a
                  href="https://github.com/mfelipperd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-4 bg-gray-800 rounded-xl text-white font-semibold shadow-lg hover:bg-gray-700 transition-all duration-300 transform hover:scale-110"
                >
                  <FaGithub className="text-xl" />
                  GitHub
                </a>
                <a
                  href="https://www.linkedin.com/in/mfelipperd/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-4 bg-blue-600 rounded-xl text-white font-semibold shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-110"
                >
                  <FaLinkedin className="text-xl" />
                  LinkedIn
                </a>
                <button
                  onClick={() => scrollToSection("contato")}
                  className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-800 rounded-xl text-white font-semibold shadow-lg hover:from-purple-700 hover:to-purple-900 transition-all duration-300 transform hover:scale-110"
                >
                  <FaEnvelope className="text-xl" />
                  Entrar em Contato
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* TECNOLOGIAS */}
        <section className="py-8 px-4 relative z-20 mt-8 mb-8">
          <div className="glassmorphism p-8 relative overflow-hidden max-w-7xl mx-auto">
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
          className="py-8 px-4 relative z-20 mt-8 mb-8 overflow-x-auto"
          id="servicos"
        >
          <div className="glassmorphism p-8 max-w-7xl mx-auto">
            <h3 className="text-3xl font-bold mb-8 text-purple-200 text-center">
              Como Posso Transformar Seu Negócio
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-black/30 backdrop-blur-lg border border-purple-700/20 rounded-xl p-8 hover:border-purple-400/40 transition group h-full flex flex-col hover:scale-105">
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

              <div className="bg-black/30 backdrop-blur-lg border border-purple-700/20 rounded-xl p-8 hover:border-purple-400/40 transition group h-full flex flex-col hover:scale-105">
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

              <div className="bg-black/30 backdrop-blur-lg border border-purple-700/20 rounded-xl p-8 hover:border-purple-400/40 transition group h-full flex flex-col hover:scale-105">
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

              <div className="bg-black/30 backdrop-blur-lg border border-purple-700/20 rounded-xl p-8 hover:border-purple-400/40 transition group h-full flex flex-col hover:scale-105">
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

              <div className="bg-black/30 backdrop-blur-lg border border-purple-700/20 rounded-xl p-8 hover:border-purple-400/40 transition group h-full flex flex-col hover:scale-105">
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

              <div className="bg-black/30 backdrop-blur-lg border border-purple-700/20 rounded-xl p-8 hover:border-purple-400/40 transition group h-full flex flex-col hover:scale-105">
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

        {/* PROJETOS EM DESTAQUE - NOVA SEÇÃO INTERATIVA */}
        <section
          className="py-8 px-4 relative z-20 mt-8 mb-8 overflow-x-auto"
          id="projetos"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-white to-purple-200 mb-4">
                🚀 Meus Projetos
              </h2>
              <p className="text-xl text-purple-100 max-w-3xl mx-auto">
                Conheça os projetos que desenvolvi, desde aplicações enterprise até soluções inovadoras
              </p>
            </div>

            {/* Componente Interativo de Projetos */}
            <div className="glassmorphism p-8 mb-8">
              <Suspense
                fallback={
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array(6)
                      .fill(0)
                      .map((_, i) => (
                        <div
                          key={i}
                          className="bg-purple-900/30 h-64 rounded-xl animate-pulse"
                        ></div>
                      ))}
                  </div>
                }
              >
                <InteractiveProjects />
              </Suspense>
            </div>
          </div>
        </section>

        {/* GITHUB STATS E CONTRIBUIÇÕES */}
        <section className="py-8 px-4 relative z-20 mt-8 mb-8">
          <div className="max-w-7xl mx-auto">
            <Suspense
              fallback={
                <div className="glassmorphism p-8">
                  <div className="h-64 bg-purple-900/30 rounded-xl animate-pulse"></div>
                </div>
              }
            >
              <GitHubStats />
            </Suspense>
          </div>
        </section>

        {/* REPOSITÓRIOS DO GITHUB */}
        <section className="py-8 px-4 relative z-20 mt-8 mb-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-white to-purple-200 mb-4">
                💻 Repositórios GitHub
              </h2>
              <p className="text-xl text-purple-100 max-w-3xl mx-auto">
                Explore meu código open-source e contribuições na comunidade
              </p>
            </div>

            <div className="glassmorphism p-8">
              <Suspense
                fallback={
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array(6)
                      .fill(0)
                      .map((_, i) => (
                        <div
                          key={i}
                          className="bg-purple-900/30 h-64 rounded-xl animate-pulse"
                        ></div>
                      ))}
                  </div>
                }
              >
                <GitHubProjects />
              </Suspense>
            </div>
          </div>
        </section>

        {/* PROJETOS NA VERCEL */}
        <section className="py-8 px-4 relative z-20 mt-8 mb-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-white to-purple-200 mb-4">
                ⚡ Projetos em Produção
              </h2>
              <p className="text-xl text-purple-100 max-w-3xl mx-auto">
                Aplicações deployadas e rodando em produção na Vercel
              </p>
            </div>

            <div className="glassmorphism p-8">
              <Suspense
                fallback={
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array(3)
                      .fill(0)
                      .map((_, i) => (
                        <div
                          key={i}
                          className="bg-purple-900/30 h-64 rounded-xl animate-pulse"
                        ></div>
                      ))}
                  </div>
                }
              >
                <VercelProjects />
              </Suspense>
            </div>
          </div>
        </section>

        {/* ESTATÍSTICAS */}
        <section className="py-8 px-4 relative z-20 mt-8 mb-8">
          <div className="glassmorphism p-8 max-w-7xl mx-auto">
            <h3 className="text-3xl font-bold mb-8 text-purple-200 text-center">
              Números que Impressionam
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center bg-black/30 backdrop-blur-lg border border-purple-700/20 rounded-xl p-8 hover:border-purple-400/40 transition hover:scale-105">
                <div className="text-4xl font-bold text-purple-300 mb-2">
                  2.250+
                </div>
                <p className="text-purple-200">Contribuições no GitHub</p>
              </div>
              <div className="text-center bg-black/30 backdrop-blur-lg border border-purple-700/20 rounded-xl p-8 hover:border-purple-400/40 transition hover:scale-105">
                <div className="text-4xl font-bold text-purple-300 mb-2">
                  38
                </div>
                <p className="text-purple-200">Repositórios</p>
              </div>
              <div className="text-center bg-black/30 backdrop-blur-lg border border-purple-700/20 rounded-xl p-8 hover:border-purple-400/40 transition hover:scale-105">
                <div className="text-4xl font-bold text-purple-300 mb-2">
                  3+
                </div>
                <p className="text-purple-200">Anos de Experiência</p>
              </div>
              <div className="text-center bg-black/30 backdrop-blur-lg border border-purple-700/20 rounded-xl p-8 hover:border-purple-400/40 transition hover:scale-105">
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
          className="py-8 px-4 relative z-20 mt-8 mb-8"
          id="sites"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-white to-purple-200 mb-4">
                🌐 Sites em Produção
              </h2>
              <p className="text-xl text-purple-100 max-w-3xl mx-auto">
                Navegue pelos sites que desenvolvi e que estão ativos em produção
              </p>
            </div>

            <div className="glassmorphism p-8">
              <Suspense
                fallback={
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array(3)
                      .fill(0)
                      .map((_, i) => (
                        <div
                          key={i}
                          className="bg-purple-900/30 h-96 rounded-xl animate-pulse"
                        ></div>
                      ))}
                  </div>
                }
              >
                <ProductionSites />
              </Suspense>
            </div>
          </div>
        </section>

        {/* CONTATO */}
        <section
          className="py-8 px-4 relative z-20 mt-8 mb-8 overflow-x-auto"
          id="contato"
        >
          <div className="glassmorphism p-8 max-w-7xl mx-auto">
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
      <footer className="py-8 px-4 text-center relative z-20">
        <div className="max-w-7xl mx-auto">
          <p className="text-purple-300 text-sm">
            © 2025 Marcos Felippe. Desenvolvido com ❤️ em Next.js
          </p>
        </div>
      </footer>
      
      {/* Cookie Banner & Notificações */}
      <ClientOnlyWrapper>
        <SimpleCookieBanner onAccept={handleCookieAccept} />
      </ClientOnlyWrapper>
    </ParallaxProvider>
  );
}
