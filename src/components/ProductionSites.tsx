"use client";

import { useState, useEffect } from "react";
import { FaExternalLinkAlt, FaTimes, FaExpand, FaGithub } from "react-icons/fa";
import { SiVercel } from "react-icons/si";

interface Site {
  id: string;
  name: string;
  url: string;
  description?: string;
  image?: string;
  technologies: string[];
  category: string;
  gradient: string;
  framework?: string;
  githubUrl?: string;
  isVercelProject?: boolean;
}

// Sites manuais (fallback)
const manualSites: Site[] = [
  {
    id: "visuallaser",
    name: "VisuaLlaser",
    url: "https://visuallaser.com.br",
    description: "Clínica de estética avançada com sistema de agendamento online, galeria de tratamentos e interface moderna responsiva.",
    technologies: ["WordPress", "PHP", "MySQL"],
    category: "E-commerce",
    gradient: "from-blue-600 to-blue-800",
    framework: "WordPress"
  },
  {
    id: "homeidoc",
    name: "HomeIdoc",
    url: "https://homeidoc.com.br",
    description: "Plataforma de telemedicina com consultas online, prescrições digitais e sistema de agendamento integrado.",
    technologies: ["React", "Node.js", "PostgreSQL"],
    category: "Healthcare",
    gradient: "from-green-600 to-green-800",
    framework: "React"
  },
  {
    id: "lavaflex",
    name: "LavaFlex",
    url: "https://lavaflex.com.br",
    description: "Lava-jato premium com sistema de agendamento, controle de serviços e interface moderna para gestão de clientes.",
    technologies: ["HTML5", "CSS3", "JavaScript"],
    category: "Services",
    gradient: "from-orange-600 to-red-800",
    framework: "HTML"
  }
];

const frameworkGradients: { [key: string]: string } = {
  nextjs: "from-black to-gray-800",
  react: "from-blue-600 to-cyan-600",
  vue: "from-green-600 to-emerald-600",
  svelte: "from-orange-600 to-red-600",
  angular: "from-red-600 to-pink-600",
  gatsby: "from-purple-600 to-indigo-600",
  nuxtjs: "from-green-500 to-teal-600",
  default: "from-purple-600 to-purple-800"
};

export default function ProductionSites() {
  const [sites, setSites] = useState<Site[]>(manualSites);
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVercelSites();
  }, []);

  const fetchVercelSites = async () => {
    try {
      setLoading(true);
      
      // Buscar projetos da Vercel
      const response = await fetch('/api/vercel/projects');
      
      if (!response.ok) {
        throw new Error('Failed to fetch Vercel projects');
      }
      
      const data = await response.json();
      
      if (data.projects && data.projects.length > 0) {
        // Mapear projetos da Vercel para o formato de Site
        const vercelSites: Site[] = data.projects.map((project: any, index: number) => {
          const framework = project.framework?.toLowerCase() || 'default';
          const gradient = frameworkGradients[framework] || frameworkGradients.default;
          
          // Tentar inferir tecnologias do framework
          const technologies: string[] = [];
          if (project.framework) technologies.push(project.framework);
          if (project.link?.repo) technologies.push('Git');
          
          return {
            id: project.id,
            name: project.name,
            url: project.productionUrl,
            description: `Projeto ${project.framework || 'web'} hospedado na Vercel`,
            technologies,
            category: 'Web App',
            gradient,
            framework: project.framework,
            githubUrl: project.githubUrl,
            isVercelProject: true
          };
        });
        
        // Combinar projetos da Vercel com sites manuais (evitar duplicatas)
        const manualSiteUrls = manualSites.map(s => s.url.toLowerCase());
        const uniqueVercelSites = vercelSites.filter(
          vs => !manualSiteUrls.includes(vs.url?.toLowerCase() || '')
        );
        
        setSites([...manualSites, ...uniqueVercelSites]);
      } else {
        setSites(manualSites);
      }
      
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Vercel sites:', error);
      setSites(manualSites);
      setLoading(false);
    }
  };

  const openSiteModal = (site: Site) => {
    setSelectedSite(site);
    setIsFullscreen(false);
  };

  const closeSiteModal = () => {
    setSelectedSite(null);
    setIsFullscreen(false);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="bg-black/30 backdrop-blur-lg border border-purple-700/20 rounded-xl h-96 animate-pulse"
            >
              <div className="h-48 bg-purple-900/30 rounded-t-xl"></div>
              <div className="p-6 space-y-3">
                <div className="h-6 bg-purple-900/30 rounded w-3/4"></div>
                <div className="h-4 bg-purple-900/30 rounded"></div>
                <div className="h-4 bg-purple-900/30 rounded w-5/6"></div>
              </div>
            </div>
          ))}
      </div>
    );
  }

  return (
    <>
      {/* Info sobre integração */}
      <div className="mb-6 flex items-center justify-between">
        <p className="text-purple-200 text-sm">
          {sites.filter(s => s.isVercelProject).length > 0 && (
            <span className="inline-flex items-center gap-2 bg-black/30 px-4 py-2 rounded-lg">
              <SiVercel className="text-white" />
              <strong className="text-white">{sites.filter(s => s.isVercelProject).length}</strong> projetos integrados da Vercel
            </span>
          )}
        </p>
        <p className="text-purple-300 text-sm">
          Total: <strong className="text-white">{sites.length}</strong> sites
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sites.map((site) => (
          <div
            key={site.id}
            className="bg-black/30 backdrop-blur-lg border border-purple-700/20 rounded-xl overflow-hidden hover:border-purple-400/40 transition group h-full flex flex-col hover:scale-105 cursor-pointer"
            onClick={() => openSiteModal(site)}
          >
            {/* Header com gradiente */}
            <div className={`relative h-48 bg-gradient-to-br ${site.gradient} overflow-hidden`}>
              {/* Preview do site com iframe */}
              <iframe
                src={site.url}
                className="w-full h-96 scale-50 origin-top-left pointer-events-none opacity-70"
                title={`${site.name} Preview`}
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="text-center">
                  <FaExpand className="text-4xl text-white mx-auto mb-2" />
                  <p className="text-white font-semibold">Ver Site Completo</p>
                </div>
              </div>

              {/* Badges de status */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                <span className="text-xs bg-green-500 text-white px-3 py-1 rounded-full font-semibold shadow-lg flex items-center gap-1">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  ATIVO
                </span>
                {site.isVercelProject && (
                  <span className="text-xs bg-black text-white px-3 py-1 rounded-full font-semibold shadow-lg flex items-center gap-1">
                    <SiVercel />
                    Vercel
                  </span>
                )}
              </div>
            </div>

            {/* Conteúdo */}
            <div className="p-6 flex-grow flex flex-col">
              <h4 className="font-bold text-xl text-purple-100 mb-2 group-hover:text-purple-300 transition">
                {site.name}
              </h4>
              
              <p className="text-purple-200 text-sm mb-4 flex-grow line-clamp-3">
                {site.description}
              </p>

              {/* Tecnologias */}
              <div className="flex flex-wrap gap-2 mb-4">
                {site.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs bg-purple-900/50 text-purple-200 px-3 py-1 rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Ações */}
              <div className="flex gap-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    openSiteModal(site);
                  }}
                  className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm font-semibold flex items-center justify-center gap-2"
                >
                  <FaExpand />
                  Visualizar
                </button>
                {site.githubUrl && (
                  <a
                    href={site.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition text-sm font-semibold flex items-center justify-center gap-2"
                    title="Ver no GitHub"
                  >
                    <FaGithub />
                  </a>
                )}
                <a
                  href={site.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition text-sm font-semibold flex items-center justify-center gap-2"
                  title="Abrir site"
                >
                  <FaExternalLinkAlt />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de Visualização do Site */}
      {selectedSite && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={closeSiteModal}
        >
          <div
            className={`bg-black/80 backdrop-blur-lg border border-purple-500/30 rounded-2xl overflow-hidden shadow-2xl transition-all ${
              isFullscreen
                ? "w-full h-full"
                : "w-full max-w-7xl h-[90vh]"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header do Modal */}
            <div className="bg-gradient-to-r from-purple-900/50 to-purple-800/50 backdrop-blur-md border-b border-purple-500/30 p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${selectedSite.gradient} rounded-lg flex items-center justify-center text-white font-bold text-xl`}>
                  {selectedSite.name[0]}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    {selectedSite.name}
                  </h3>
                  <p className="text-sm text-purple-300">{selectedSite.url}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* Botão de fullscreen */}
                <button
                  onClick={toggleFullscreen}
                  className="p-3 hover:bg-white/10 rounded-lg transition text-white"
                  title={isFullscreen ? "Sair de tela cheia" : "Tela cheia"}
                >
                  <FaExpand className="text-xl" />
                </button>

                {/* Botão de abrir em nova aba */}
                <a
                  href={selectedSite.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg transition font-semibold flex items-center gap-2"
                >
                  <FaExternalLinkAlt />
                  Abrir Site
                </a>

                {/* Botão de fechar */}
                <button
                  onClick={closeSiteModal}
                  className="p-3 hover:bg-red-500/20 rounded-lg transition text-white"
                  title="Fechar"
                >
                  <FaTimes className="text-2xl" />
                </button>
              </div>
            </div>

            {/* Iframe do Site */}
            <div className="relative h-[calc(100%-80px)] bg-white">
              <iframe
                src={selectedSite.url}
                className="w-full h-full border-0"
                title={selectedSite.name}
                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
              />
              
              {/* Loading overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-purple-800 flex items-center justify-center pointer-events-none opacity-0 animate-pulse">
                <div className="text-center">
                  <div className="w-16 h-16 border-4 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="text-white font-semibold">Carregando site...</p>
                </div>
              </div>
            </div>

            {/* Informações adicionais (apenas quando não está em fullscreen) */}
            {!isFullscreen && (
              <div className="bg-gradient-to-r from-purple-900/50 to-purple-800/50 backdrop-blur-md border-t border-purple-500/30 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-2">
                    {selectedSite.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs bg-purple-900/50 text-purple-200 px-3 py-1 rounded-full border border-purple-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-purple-300">
                    Categoria: <strong className="text-white">{selectedSite.category}</strong>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

