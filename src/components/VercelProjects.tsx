"use client";

import { useState, useEffect } from "react";
import { FaExternalLinkAlt, FaGithub, FaRocket, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { SiVercel } from "react-icons/si";

interface VercelProject {
  id: string;
  name: string;
  accountId: string;
  createdAt: number;
  updatedAt: number;
  framework: string | null;
  devCommand: string | null;
  installCommand: string | null;
  buildCommand: string | null;
  outputDirectory: string | null;
  directoryListing: boolean;
  nodeVersion: string;
  link?: {
    type: string;
    repo: string;
    repoId: number;
    org?: string;
    gitCredentialId?: string;
    productionBranch?: string;
  };
  latestDeployments?: Array<{
    uid: string;
    url: string;
    name: string;
    state: string;
    type: string;
    createdAt: number;
    meta: {
      githubCommitMessage?: string;
      githubCommitRef?: string;
      githubCommitSha?: string;
    };
  }>;
}

interface ProjectWithDeployment extends VercelProject {
  productionUrl?: string;
  lastDeploymentState?: string;
  githubUrl?: string;
}

export default function VercelProjects() {
  const [projects, setProjects] = useState<ProjectWithDeployment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Projetos manuais conhecidos (caso a API não esteja configurada)
  const manualProjects: ProjectWithDeployment[] = [
    {
      id: "portfolio-1",
      name: "Portfolio Marcos Felippe",
      accountId: "",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      framework: "nextjs",
      devCommand: null,
      installCommand: null,
      buildCommand: null,
      outputDirectory: null,
      directoryListing: false,
      nodeVersion: "18.x",
      productionUrl: "https://marcosfelippe.dev",
      lastDeploymentState: "READY",
      githubUrl: "https://github.com/mfelipperd/portfolio-marcos",
      link: {
        type: "github",
        repo: "mfelipperd/portfolio-marcos",
        repoId: 12345,
        productionBranch: "main"
      }
    },
    {
      id: "homeidoc",
      name: "HomeIdoc",
      accountId: "",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      framework: "react",
      devCommand: null,
      installCommand: null,
      buildCommand: null,
      outputDirectory: null,
      directoryListing: false,
      nodeVersion: "18.x",
      productionUrl: "https://homeidoc.com.br",
      lastDeploymentState: "READY",
      githubUrl: "https://github.com/mfelipperd"
    },
    {
      id: "credenciamento",
      name: "Sistema de Credenciamento",
      accountId: "",
      createdAt: Date.now(),
      updatedAt: Date.now(),
      framework: "react",
      devCommand: null,
      installCommand: null,
      buildCommand: null,
      outputDirectory: null,
      directoryListing: false,
      nodeVersion: "18.x",
      productionUrl: "https://credenciamento.app",
      lastDeploymentState: "READY",
      githubUrl: "https://github.com/mfelipperd/credenciamento-frontend",
      link: {
        type: "github",
        repo: "mfelipperd/credenciamento-frontend",
        repoId: 54321,
        productionBranch: "main"
      }
    }
  ];

  useEffect(() => {
    fetchVercelProjects();
  }, []);

  const fetchVercelProjects = async () => {
    try {
      setLoading(true);
      
      // Tentar buscar projetos da API da Vercel
      const response = await fetch('/api/vercel/projects');
      
      if (!response.ok) {
        throw new Error('Failed to fetch Vercel projects');
      }
      
      const data = await response.json();
      
      // Se houver projetos da API, usar eles
      if (data.projects && data.projects.length > 0) {
        const formattedProjects = data.projects.map((project: any) => ({
          id: project.id,
          name: project.name,
          accountId: project.accountId,
          createdAt: project.createdAt,
          updatedAt: project.updatedAt,
          framework: project.framework,
          devCommand: project.devCommand,
          installCommand: project.installCommand,
          buildCommand: project.buildCommand,
          outputDirectory: project.outputDirectory,
          directoryListing: project.directoryListing,
          nodeVersion: project.nodeVersion || '18.x',
          link: project.link,
          productionUrl: project.productionUrl,
          lastDeploymentState: project.latestDeployment?.state || 'READY',
          githubUrl: project.githubUrl,
        }));
        
        setProjects(formattedProjects);
      } else {
        // Se não houver projetos da API, usar projetos manuais
        setProjects(manualProjects);
      }
      
      setLoading(false);
    } catch (err) {
      console.error("Erro ao buscar projetos da Vercel:", err);
      // Em caso de erro, usar projetos manuais como fallback
      setProjects(manualProjects);
      setError(null); // Não mostrar erro, apenas usar fallback
      setLoading(false);
    }
  };

  const getFrameworkIcon = (framework: string | null) => {
    switch (framework) {
      case "nextjs":
        return "⚡";
      case "react":
        return "⚛️";
      case "vue":
        return "💚";
      case "svelte":
        return "🔥";
      default:
        return "🚀";
    }
  };

  const getFrameworkColor = (framework: string | null) => {
    switch (framework) {
      case "nextjs":
        return "from-black to-gray-800";
      case "react":
        return "from-blue-600 to-cyan-600";
      case "vue":
        return "from-green-600 to-emerald-600";
      case "svelte":
        return "from-orange-600 to-red-600";
      default:
        return "from-purple-600 to-purple-800";
    }
  };

  if (loading) {
    return (
      <div className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="bg-black/30 backdrop-blur-lg border border-purple-700/20 rounded-xl p-6 h-64 animate-pulse"
              >
                <div className="h-6 bg-purple-900/30 rounded mb-4"></div>
                <div className="h-4 bg-purple-900/30 rounded mb-2"></div>
                <div className="h-4 bg-purple-900/30 rounded mb-2"></div>
                <div className="h-4 bg-purple-900/30 rounded w-2/3"></div>
              </div>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      {/* Header com estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="glassmorphism p-6 text-center hover:scale-105 transition-all">
          <SiVercel className="text-4xl text-white mx-auto mb-2" />
          <div className="text-3xl font-bold text-purple-300">{projects.length}</div>
          <p className="text-purple-200 text-sm">Projetos na Vercel</p>
        </div>
        
        <div className="glassmorphism p-6 text-center hover:scale-105 transition-all">
          <FaCheckCircle className="text-4xl text-green-400 mx-auto mb-2" />
          <div className="text-3xl font-bold text-green-300">
            {projects.filter(p => p.lastDeploymentState === "READY").length}
          </div>
          <p className="text-purple-200 text-sm">Online</p>
        </div>
        
        <div className="glassmorphism p-6 text-center hover:scale-105 transition-all">
          <FaRocket className="text-4xl text-blue-400 mx-auto mb-2" />
          <div className="text-3xl font-bold text-blue-300">100%</div>
          <p className="text-purple-200 text-sm">Uptime</p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="bg-black/30 backdrop-blur-lg border border-purple-700/20 rounded-xl overflow-hidden hover:border-purple-400/40 transition-all hover:scale-105 group flex flex-col"
          >
            {/* Header com gradiente baseado no framework */}
            <div className={`bg-gradient-to-r ${getFrameworkColor(project.framework)} p-6 relative`}>
              <div className="absolute top-2 right-2">
                {project.lastDeploymentState === "READY" ? (
                  <div className="flex items-center gap-1 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                    <FaCheckCircle />
                    <span>Online</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full">
                    <FaRocket />
                    <span>Deploying</span>
                  </div>
                )}
              </div>
              
              <div className="text-5xl mb-3">{getFrameworkIcon(project.framework)}</div>
              <h4 className="font-bold text-xl text-white">
                {project.name}
              </h4>
            </div>

            {/* Body */}
            <div className="p-6 flex-grow flex flex-col">
              {/* Framework badge */}
              {project.framework && (
                <div className="mb-4">
                  <span className="text-xs bg-purple-900/50 text-purple-200 px-3 py-1 rounded-full">
                    {project.framework.toUpperCase()}
                  </span>
                </div>
              )}

              {/* GitHub Link */}
              {project.link && (
                <div className="mb-4">
                  <div className="flex items-center gap-2 text-sm text-purple-300">
                    <FaGithub />
                    <span className="truncate">{project.link.repo}</span>
                  </div>
                </div>
              )}

              {/* Last Update */}
              <div className="text-xs text-purple-400 mb-4">
                Atualizado em {new Date(project.updatedAt).toLocaleDateString("pt-BR")}
              </div>

              {/* Actions */}
              <div className="flex gap-2 mt-auto">
                {project.productionUrl && (
                  <a
                    href={project.productionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-lg hover:from-purple-700 hover:to-purple-900 transition text-center text-sm font-semibold flex items-center justify-center gap-2"
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
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition text-center text-sm font-semibold flex items-center justify-center gap-2"
                    title="Ver no GitHub"
                  >
                    <FaGithub />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Info */}
      <div className="mt-8 text-center">
        <div className="glassmorphism p-6 inline-block">
          <p className="text-purple-200 text-sm">
            <SiVercel className="inline mr-2" />
            Todos os projetos são hospedados na{" "}
            <strong className="text-white">Vercel</strong> com deploy automático via GitHub
          </p>
        </div>
      </div>
    </div>
  );
}

