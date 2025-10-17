"use client";

import { useState } from "react";
import { FaGithub, FaExternalLinkAlt, FaStar, FaCodeBranch, FaEye } from "react-icons/fa";
import { SiVercel } from "react-icons/si";

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  image?: string;
  technologies: string[];
  category: string;
  githubUrl?: string;
  liveUrl?: string;
  stats?: {
    stars?: number;
    forks?: number;
    views?: number;
  };
  featured?: boolean;
  status: "production" | "development" | "archived";
}

const projects: Project[] = [
  {
    id: "portfolio-marcos",
    title: "Portfolio Marcos Felippe v2.0",
    description: "Portfólio profissional com integrações GitHub e Vercel em tempo real",
    longDescription: "Portfólio moderno e interativo desenvolvido com Next.js 15 e React 19, com integrações automáticas das APIs do GitHub e Vercel. Inclui sistema completo de animações, visualização de projetos em modal, filtros por categoria, gráfico de contribuições, e muito mais. Um showcase completo de habilidades técnicas e design.",
    technologies: ["Next.js 15", "React 19", "TypeScript", "TailwindCSS 4", "GitHub API", "Vercel API"],
    category: "Portfolio",
    githubUrl: "https://github.com/mfelipperd/portfolio-marcos",
    liveUrl: "https://marcosfelippe.dev",
    stats: {
      stars: 25,
      forks: 5,
      views: 1000
    },
    featured: true,
    status: "production",
  },
  {
    id: "credenciamento",
    title: "Sistema de Credenciamento",
    description: "Sistema enterprise para gestão de credenciamentos com React e NestJS",
    longDescription: "Plataforma completa de gestão de credenciamentos para eventos corporativos, com controle de acesso, geração de crachás, relatórios em tempo real e integração com APIs de pagamento.",
    technologies: ["React", "NestJS", "PostgreSQL", "Docker", "Redis", "TypeScript"],
    category: "Enterprise",
    githubUrl: "https://github.com/mfelipperd/credenciamento-frontend",
    stats: {
      stars: 15,
      forks: 3,
      views: 250
    },
    featured: true,
    status: "production",
  },
  {
    id: "homeidoc",
    title: "HomeIdoc - Telemedicina",
    description: "Plataforma de telemedicina com consultas online e prescrições digitais",
    longDescription: "Sistema completo de telemedicina que conecta médicos e pacientes, com agendamento online, videochamadas, prescrições digitais e prontuário eletrônico.",
    technologies: ["React", "Node.js", "PostgreSQL", "WebRTC", "Socket.io"],
    category: "Healthcare",
    liveUrl: "https://homeidoc.com.br",
    stats: {
      views: 1500
    },
    featured: true,
    status: "production",
  },
  {
    id: "visuallaser",
    title: "VisuaLlaser",
    description: "Clínica de estética avançada com sistema de agendamento online",
    longDescription: "Website moderno para clínica de estética com galeria de procedimentos, sistema de agendamento integrado, depoimentos de clientes e blog educativo.",
    technologies: ["WordPress", "PHP", "MySQL", "JavaScript"],
    category: "E-commerce",
    liveUrl: "https://visuallaser.com.br",
    stats: {
      views: 800
    },
    featured: true,
    status: "production",
  },
  {
    id: "lavaflex",
    title: "LavaFlex",
    description: "Lava-jato premium com sistema de agendamento",
    longDescription: "Plataforma digital para lava-jato com agendamento online, controle de serviços, programa de fidelidade e notificações automáticas.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Node.js"],
    category: "Services",
    liveUrl: "https://lavaflex.com.br",
    featured: false,
    status: "production",
  },
  {
    id: "ecommerce",
    title: "E-commerce Platform",
    description: "Plataforma completa de e-commerce com carrinho e pagamentos",
    longDescription: "Solução de e-commerce moderna com gestão de produtos, carrinho de compras, integração com Stripe, sistema de cupons e dashboard administrativo.",
    technologies: ["Next.js", "Stripe", "MongoDB", "TailwindCSS"],
    category: "E-commerce",
    githubUrl: "https://github.com/mfelipperd",
    stats: {
      stars: 8,
      forks: 2
    },
    featured: false,
    status: "production",
  },
  {
    id: "dashboard",
    title: "Dashboard Analytics",
    description: "Dashboard com gráficos e métricas em tempo real",
    longDescription: "Dashboard executivo com visualização de dados em tempo real, gráficos interativos, relatórios customizáveis e exportação de dados.",
    technologies: ["React", "ApexCharts", "Tailwind", "Node.js"],
    category: "Analytics",
    featured: false,
    status: "production",
  },
  {
    id: "automation",
    title: "Automação N8N",
    description: "Workflows complexos de automação integrando APIs",
    longDescription: "Soluções de automação empresarial com n8n, integrando múltiplas APIs, bancos de dados e sistemas legados para otimizar processos de negócio.",
    technologies: ["N8N", "Webhooks", "APIs", "PostgreSQL"],
    category: "Automation",
    featured: false,
    status: "production",
  },
  {
    id: "whatsapp-bot",
    title: "Bot WhatsApp",
    description: "Chatbot inteligente para WhatsApp com integração de IA",
    longDescription: "Chatbot avançado para WhatsApp com processamento de linguagem natural, atendimento automatizado 24/7, integração com CRM e análise de sentimento.",
    technologies: ["Node.js", "WhatsApp API", "OpenAI", "Redis"],
    category: "AI",
    githubUrl: "https://github.com/mfelipperd",
    stats: {
      stars: 20,
      forks: 5
    },
    featured: true,
    status: "production",
  },
  {
    id: "oficina-di-deias",
    title: "Oficina d'Ideias",
    description: "Plataforma criativa para gestão de ideias e projetos",
    longDescription: "Aplicação web moderna desenvolvida para facilitar a gestão e organização de ideias criativas e projetos. Interface intuitiva e responsiva, desenvolvida com as tecnologias mais recentes do mercado, oferecendo uma experiência fluida e agradável para os usuários.",
    technologies: ["Next.js", "React", "TypeScript", "TailwindCSS", "Vercel"],
    category: "Web App",
    liveUrl: "https://oficina-di-deias.vercel.app",
    stats: {
      views: 350
    },
    featured: false,
    status: "production",
  },
];

const categories = ["Todos", "Portfolio", "Enterprise", "Healthcare", "E-commerce", "Services", "Web App", "Analytics", "Automation", "AI"];

export default function InteractiveProjects() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProjects = selectedCategory === "Todos"
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  const featuredProjects = projects.filter((p) => p.featured);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "production":
        return "bg-green-500";
      case "development":
        return "bg-yellow-500";
      case "archived":
        return "bg-gray-500";
      default:
        return "bg-purple-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "production":
        return "Produção";
      case "development":
        return "Desenvolvimento";
      case "archived":
        return "Arquivado";
      default:
        return status;
    }
  };

  return (
    <div className="py-8">
      {/* Header com filtros */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <h3 className="text-3xl font-bold text-purple-200">
            Projetos em Destaque
          </h3>
          
          {/* View Mode Toggle */}
          <div className="flex gap-2 bg-black/30 p-1 rounded-lg">
            <button
              onClick={() => setViewMode("grid")}
              className={`px-4 py-2 rounded ${
                viewMode === "grid"
                  ? "bg-purple-600 text-white"
                  : "text-purple-300 hover:text-white"
              }`}
            >
              Grid
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`px-4 py-2 rounded ${
                viewMode === "list"
                  ? "bg-purple-600 text-white"
                  : "text-purple-300 hover:text-white"
              }`}
            >
              Lista
            </button>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg transition-all ${
                selectedCategory === category
                  ? "bg-gradient-to-r from-purple-600 to-purple-800 text-white"
                  : "bg-black/30 text-purple-200 hover:bg-purple-600/50"
              }`}
            >
              {category}
              {category !== "Todos" && (
                <span className="ml-2 text-xs opacity-70">
                  ({projects.filter((p) => p.category === category).length})
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Projects Banner */}
      {selectedCategory === "Todos" && (
        <div className="mb-8">
          <h4 className="text-xl font-bold text-purple-300 mb-4 flex items-center gap-2">
            ⭐ Projetos em Destaque
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featuredProjects.slice(0, 2).map((project) => (
              <div
                key={project.id}
                className="group relative bg-gradient-to-br from-purple-900/50 to-blue-900/50 backdrop-blur-lg border border-purple-500/30 rounded-2xl p-6 hover:border-purple-400/60 transition-all cursor-pointer overflow-hidden"
                onClick={() => setSelectedProject(project)}
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${getStatusColor(project.status)} animate-pulse`}></div>
                      <span className="text-xs text-purple-300">{getStatusText(project.status)}</span>
                    </div>
                    <span className="text-2xl">⭐</span>
                  </div>

                  <h5 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-200 transition">
                    {project.title}
                  </h5>
                  
                  <p className="text-purple-200 text-sm mb-4">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-xs bg-black/40 text-purple-200 px-3 py-1 rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="text-xs text-purple-400">
                        +{project.technologies.length - 4}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-purple-300 hover:text-white transition"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaExternalLinkAlt />
                        Ver Site
                      </a>
                    )}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-purple-300 hover:text-white transition"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FaGithub />
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects Grid/List */}
      <div className={viewMode === "grid" 
        ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
        : "space-y-4"
      }>
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className={`group bg-black/30 backdrop-blur-lg border border-purple-700/20 rounded-xl hover:border-purple-400/40 transition-all hover:scale-105 cursor-pointer overflow-hidden ${
              viewMode === "list" ? "flex gap-6" : ""
            }`}
            onClick={() => setSelectedProject(project)}
          >
            {/* Content */}
            <div className="p-6 flex-1">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(project.status)}`}></div>
                  <span className="text-xs text-purple-300">{project.category}</span>
                </div>
                {project.featured && <span className="text-xl">⭐</span>}
              </div>

              <h5 className="text-xl font-bold text-purple-100 mb-2 group-hover:text-purple-300 transition">
                {project.title}
              </h5>
              
              <p className="text-purple-200 text-sm mb-4 line-clamp-2">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1 mb-4">
                {project.technologies.slice(0, 3).map((tech) => (
                  <span
                    key={tech}
                    className="text-xs bg-purple-900/50 text-purple-200 px-2 py-1 rounded"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="text-xs text-purple-400 px-2 py-1">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>

              {project.stats && (
                <div className="flex items-center gap-4 text-sm text-purple-300 mb-4">
                  {project.stats.stars && (
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-400" />
                      <span>{project.stats.stars}</span>
                    </div>
                  )}
                  {project.stats.forks && (
                    <div className="flex items-center gap-1">
                      <FaCodeBranch className="text-green-400" />
                      <span>{project.stats.forks}</span>
                    </div>
                  )}
                  {project.stats.views && (
                    <div className="flex items-center gap-1">
                      <FaEye className="text-blue-400" />
                      <span>{project.stats.views}</span>
                    </div>
                  )}
                </div>
              )}

              <div className="flex gap-2">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-center text-sm font-semibold"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Ver Site
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition text-center text-sm font-semibold"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <FaGithub className="inline" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="glassmorphism max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(selectedProject.status)} animate-pulse`}></div>
                    <span className="text-sm text-purple-300">{selectedProject.category}</span>
                    {selectedProject.featured && <span className="text-xl">⭐</span>}
                  </div>
                  <h3 className="text-3xl font-bold text-purple-200">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="text-3xl text-purple-300 hover:text-white transition"
                >
                  ×
                </button>
              </div>

              {/* Description */}
              <p className="text-purple-200 mb-6 leading-relaxed">
                {selectedProject.longDescription}
              </p>

              {/* Technologies */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-purple-300 mb-3">
                  Tecnologias Utilizadas
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-4 py-2 bg-purple-900/50 text-purple-200 rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              {selectedProject.stats && (
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-purple-300 mb-3">
                    Estatísticas
                  </h4>
                  <div className="grid grid-cols-3 gap-4">
                    {selectedProject.stats.stars && (
                      <div className="bg-black/30 p-4 rounded-lg text-center">
                        <FaStar className="text-2xl text-yellow-400 mx-auto mb-2" />
                        <div className="text-xl font-bold text-yellow-300">
                          {selectedProject.stats.stars}
                        </div>
                        <p className="text-sm text-purple-200">Stars</p>
                      </div>
                    )}
                    {selectedProject.stats.forks && (
                      <div className="bg-black/30 p-4 rounded-lg text-center">
                        <FaCodeBranch className="text-2xl text-green-400 mx-auto mb-2" />
                        <div className="text-xl font-bold text-green-300">
                          {selectedProject.stats.forks}
                        </div>
                        <p className="text-sm text-purple-200">Forks</p>
                      </div>
                    )}
                    {selectedProject.stats.views && (
                      <div className="bg-black/30 p-4 rounded-lg text-center">
                        <FaEye className="text-2xl text-blue-400 mx-auto mb-2" />
                        <div className="text-xl font-bold text-blue-300">
                          {selectedProject.stats.views}
                        </div>
                        <p className="text-sm text-purple-200">Visualizações</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-4">
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg hover:from-purple-700 hover:to-purple-900 transition text-center font-semibold flex items-center justify-center gap-2"
                  >
                    <FaExternalLinkAlt />
                    Visitar Site
                  </a>
                )}
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition text-center font-semibold flex items-center justify-center gap-2"
                  >
                    <FaGithub />
                    Ver no GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

