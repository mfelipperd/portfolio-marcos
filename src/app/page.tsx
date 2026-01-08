"use client";

import { lazy, Suspense } from "react";
import Image from "next/image";
import SimpleHeader from "../components/SimpleHeader";
import SimpleCookieBanner from "../components/SimpleCookieBanner";
import ClientOnlyWrapper from "../components/ClientOnlyWrapper";
import TextCarousel from "../components/TextCarousel";
import { useNotifications } from "../hooks/useNotifications";

// Lazy loading dos componentes pesados
const ContactForm = lazy(() => import("../components/WhatsAppContactForm"));

// Lazy loading do componente de tecnologias
const TechnologiesGrid = lazy(() => import("../components/TechnologiesGrid"));

// Lazy loading dos novos componentes de projetos
const GitHubProjects = lazy(() => import("../components/GitHubProjects"));
const VercelProjects = lazy(() => import("../components/VercelProjects"));
const GitHubStats = lazy(() => import("../components/GitHubStats"));
const InteractiveProjects = lazy(() => import("../components/InteractiveProjects"));
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
    <>
      <SimpleHeader />
      
      {/* Custom Scroll Indicator */}
      <div className="scroll-indicator"></div>
      
      <div className="font-sans bg-gradient-to-br from-purple-900 via-black to-purple-800 min-h-screen relative z-10">

        {/* CARROSSEL DE TEXTO */}
        <section className="py-12 px-4 relative z-20">
          <div className="max-w-7xl mx-auto">
            <TextCarousel
              texts={[
                "Desenvolvimento Fullstack de Alta Performance",
                "Soluções Escaláveis e Modernas",
                "React, Next.js, Node.js e TypeScript",
                "Arquiteturas Limpas e SOLID",
                "Automação com n8n e Typebot",
                "Experiências Digitais Extraordinárias"
              ]}
              interval={3500}
              className="py-8"
            />
          </div>
        </section>

        {/* BANNER COM 4 CARDS DE HABILIDADES */}
        <section className="py-8 px-4 relative z-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-white to-purple-200 mb-4">
                💻 Minhas Habilidades Técnicas
              </h2>
              <p className="text-xl text-purple-100 max-w-3xl mx-auto">
                Conhecimento profundo em tecnologias modernas e melhores práticas de desenvolvimento
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Card 1 - Frontend */}
              <div>
                <div>
                  <div className="text-6xl mb-4">⚡</div>
                  <h3 className="text-xl font-bold mb-3">
                    Frontend
                  </h3>
                  <p className="text-sm leading-relaxed">
                    <span className="font-bold">React, Next.js, TypeScript</span>. 
                    Interfaces modernas, responsivas e com foco em performance e experiência do usuário.
                  </p>
                </div>
                <div className="mt-4">
                  <span className="text-sm">🎨 UI/UX Moderno</span>
                </div>
              </div>

              {/* Card 2 - Backend */}
              <div>
                <div>
                  <div className="text-6xl mb-4">🔧</div>
                  <h3 className="text-xl font-bold mb-3">
                    Backend
                  </h3>
                  <p className="text-sm leading-relaxed">
                    <span className="font-bold">Node.js, NestJS, APIs REST</span>. 
                    Arquiteturas escaláveis, bancos de dados otimizados e sistemas robustos.
                  </p>
                </div>
                <div className="mt-4">
                  <span className="text-sm">🚀 APIs Escaláveis</span>
                </div>
              </div>

              {/* Card 3 - Deploy & Hospedagem */}
              <div>
                <div>
                  <div className="text-6xl mb-4">🚀</div>
                  <h3 className="text-xl font-bold mb-3">
                    Deploy & Hospedagem
                  </h3>
                  <p className="text-sm leading-relaxed">
                    <span className="font-bold">Vercel, GitHub Pages, Netlify</span>. 
                    Deploy de aplicações web e hospedagem de projetos. Experiência com plataformas modernas de deploy.
                  </p>
                </div>
                <div className="mt-4">
                  <span className="text-sm">☁️ Deploy</span>
                </div>
              </div>

              {/* Card 4 - Automação */}
              <div>
                <div>
                  <div className="text-6xl mb-4">🤖</div>
                  <h3 className="text-xl font-bold mb-3">
                    Automação
                  </h3>
                  <p className="text-sm leading-relaxed">
                    <span className="font-bold">n8n, Typebot, Integrações</span>. 
                    Automação de processos, workflows e integração entre sistemas.
                  </p>
                </div>
                <div className="mt-4">
                  <span className="text-sm">🔄 Workflows</span>
                </div>
              </div>
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
                Desenvolvedor Fullstack apaixonado por criar soluções digitais inovadoras
              </p>
            </div>

            {/* Layout Principal em Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              
              {/* Card 1 - Perfil e Estatísticas */}
              <div className="bg-black/20 backdrop-blur-xl rounded-xl shadow-2xl p-8 text-center hover:scale-105 transition-all duration-300">
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
              <div className="bg-black/20 backdrop-blur-xl rounded-xl shadow-2xl p-8 hover:scale-105 transition-all duration-300">
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
                    especializo-me em criar soluções simples, elegantes e altamente performáticas.
                  </p>
                  <p>
                    Minha expertise inclui <span className="text-blue-300 font-bold">React, Next.js, Node.js</span> e 
                    todo o ecossistema JavaScript/TypeScript moderno.
                  </p>
                  <p>
                    Tenho paixão especial por <span className="text-orange-300 font-bold">automação</span> e 
                    arquiteturas escaláveis que suportam crescimento e evolução contínua.
                  </p>
                </div>

                {/* Badges de Especialidades */}
                <div className="flex flex-wrap gap-2 mt-6">
                  <span className="px-3 py-1 bg-purple-600/30 text-purple-200 rounded-full text-sm">React Expert</span>
                  <span className="px-3 py-1 bg-blue-600/30 text-blue-200 rounded-full text-sm">Node.js</span>
                  <span className="px-3 py-1 bg-green-600/30 text-green-200 rounded-full text-sm">Deploy</span>
                  <span className="px-3 py-1 bg-orange-600/30 text-orange-200 rounded-full text-sm">Automação</span>
                </div>
              </div>

              {/* Card 3 - Minha Abordagem */}
              <div className="bg-black/20 backdrop-blur-xl rounded-xl shadow-2xl p-8 hover:scale-105 transition-all duration-300">
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
            <div className="bg-black/20 backdrop-blur-xl rounded-xl shadow-2xl p-6 mb-8">
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
                    <h5 className="font-bold text-orange-300 text-lg">Deploy & Tools</h5>
                  </div>
                  <ul className="text-orange-200 space-y-2">
                    <li>• Vercel & Netlify</li>
                    <li>• GitHub Pages & Actions</li>
                    <li>• Deploy automatizado</li>
                    <li>• n8n & Typebot Automation</li>
                    <li>• Versionamento Git</li>
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
            <div className="bg-black/20 backdrop-blur-xl rounded-xl shadow-2xl p-8 text-center">
              <h4 className="text-2xl font-bold text-purple-300 mb-4">🚀 Vamos Nos Conectar!</h4>
              <p className="text-purple-200 mb-6 text-lg">
                Vamos conversar sobre tecnologia, projetos e oportunidades de colaboração?
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
          <div className="bg-black/20 backdrop-blur-xl rounded-xl shadow-2xl p-8 relative overflow-hidden max-w-7xl mx-auto">
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

        {/* HABILIDADES */}
        <section
          className="py-8 px-4 relative z-20 mt-8 mb-8 overflow-x-auto"
          id="servicos"
        >
          <div className="bg-black/20 backdrop-blur-xl rounded-xl shadow-2xl p-8 max-w-7xl mx-auto">
            <h3 className="text-3xl font-bold mb-8 text-purple-200 text-center">
              Minha Expertise Técnica
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              <div className="bg-black/30 backdrop-blur-lg border border-purple-700/20 rounded-xl p-8 hover:border-purple-400/40 transition group h-full flex flex-col hover:scale-105">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                  🚀
                </div>
                <h4 className="font-bold text-xl mb-4 text-purple-100">
                  Desenvolvimento Frontend
                </h4>
                <p className="text-purple-200 mb-4">
                  Interfaces modernas e responsivas com React, Next.js e TypeScript. 
                  Foco em performance, acessibilidade e experiência do usuário.
                </p>
                <ul className="text-purple-300 text-sm space-y-1">
                  <li>• React 18 + Next.js 15</li>
                  <li>• TypeScript & JavaScript ES6+</li>
                  <li>• TailwindCSS & Styled Components</li>
                </ul>
              </div>

              <div className="bg-black/30 backdrop-blur-lg border border-purple-700/20 rounded-xl p-8 hover:border-purple-400/40 transition group h-full flex flex-col hover:scale-105">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                  💼
                </div>
                <h4 className="font-bold text-xl mb-4 text-purple-100">
                  Desenvolvimento Backend
                </h4>
                <p className="text-purple-200 mb-4">
                  APIs robustas e escaláveis com Node.js, NestJS e arquiteturas limpas. 
                  Bancos de dados otimizados e sistemas de alta performance.
                </p>
                <ul className="text-purple-300 text-sm space-y-1">
                  <li>• Node.js + Express/Fastify</li>
                  <li>• NestJS & Clean Architecture</li>
                  <li>• PostgreSQL, MongoDB, Redis</li>
                </ul>
              </div>

              <div className="bg-black/30 backdrop-blur-lg border border-purple-700/20 rounded-xl p-8 hover:border-purple-400/40 transition group h-full flex flex-col hover:scale-105">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                  ⚡
                </div>
                <h4 className="font-bold text-xl mb-4 text-purple-100">
                  Arquitetura & Design
                </h4>
                <p className="text-purple-200 mb-4">
                  Arquiteturas escaláveis, padrões de design e boas práticas. 
                  Código limpo, testável e manutenível seguindo princípios SOLID.
                </p>
                <ul className="text-purple-300 text-sm space-y-1">
                  <li>• Clean Architecture</li>
                  <li>• SOLID Principles</li>
                  <li>• Design Patterns</li>
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
                  Chatbots inteligentes e automação de conversas usando Typebot. 
                  Integração com WhatsApp e outras plataformas.
                </p>
                <ul className="text-purple-300 text-sm space-y-1">
                  <li>• Conversas automatizadas</li>
                  <li>• Integração WhatsApp</li>
                  <li>• Fluxos personalizados</li>
                </ul>
              </div>

              <div className="bg-black/30 backdrop-blur-lg border border-purple-700/20 rounded-xl p-8 hover:border-purple-400/40 transition group h-full flex flex-col hover:scale-105">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                  🤖
                </div>
                <h4 className="font-bold text-xl mb-4 text-purple-100">
                  Deploy & Hospedagem
                </h4>
                <p className="text-purple-200 mb-4">
                  Deploy de aplicações web em plataformas modernas. 
                  Experiência com Vercel, Netlify e GitHub Pages.
                </p>
                <ul className="text-purple-300 text-sm space-y-1">
                  <li>• Vercel & Netlify</li>
                  <li>• GitHub Pages</li>
                  <li>• Deploy automatizado</li>
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
            <div className="bg-black/20 backdrop-blur-xl rounded-xl shadow-2xl p-8 mb-8">
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
                <div className="bg-black/20 backdrop-blur-xl rounded-xl shadow-2xl p-8">
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

            <div className="bg-black/20 backdrop-blur-xl rounded-xl shadow-2xl p-8">
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

            <div className="bg-black/20 backdrop-blur-xl rounded-xl shadow-2xl p-8">
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
          <div className="bg-black/20 backdrop-blur-xl rounded-xl shadow-2xl p-8 max-w-7xl mx-auto">
            <h3 className="text-3xl font-bold mb-8 text-purple-200 text-center">
              Minha Jornada em Números
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
                  50+
                </div>
                <p className="text-purple-200">Projetos Desenvolvidos</p>
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

            <div className="bg-black/20 backdrop-blur-xl rounded-xl shadow-2xl p-8">
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
          <div className="bg-black/20 backdrop-blur-xl rounded-xl shadow-2xl p-8 max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4 text-purple-200">
                Vamos Conectar?
              </h3>
              <p className="text-xl text-purple-100">
                Estou sempre aberto a conversar sobre tecnologia, projetos interessantes e oportunidades de colaboração.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-bold mb-6 text-purple-200">
                  Sobre Mim
                </h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1">💼</span>
                    <div>
                      <strong className="text-purple-100">
                        Experiência:
                      </strong>
                      <p className="text-purple-200 text-sm">
                        Mais de 3 anos desenvolvendo soluções fullstack
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1">🎯</span>
                    <div>
                      <strong className="text-purple-100">Foco:</strong>
                      <p className="text-purple-200 text-sm">
                        Código limpo, arquiteturas escaláveis e boas práticas
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1">🚀</span>
                    <div>
                      <strong className="text-purple-100">
                        Aprendizado Contínuo:
                      </strong>
                      <p className="text-purple-200 text-sm">
                        Sempre estudando novas tecnologias e tendências
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-purple-400 mt-1">🤝</span>
                    <div>
                      <strong className="text-purple-100">Colaboração:</strong>
                      <p className="text-purple-200 text-sm">
                        Aberto a projetos open-source e contribuições
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
    </>
  );
}
