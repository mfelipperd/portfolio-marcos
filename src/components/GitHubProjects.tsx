"use client";

import React, { useState, useEffect } from "react";
import { FaGithub, FaStar, FaCodeBranch, FaEye, FaExternalLinkAlt } from "react-icons/fa";
import { SiTypescript, SiJavascript, SiPython, SiHtml5, SiCss3 } from "react-icons/si";

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  language: string;
  topics: string[];
  created_at: string;
  updated_at: string;
  pushed_at: string;
  size: number;
  open_issues_count: number;
  visibility: string;
}

interface GitHubStats {
  totalRepos: number;
  totalStars: number;
  totalForks: number;
  languages: { [key: string]: number };
}

const languageIcons: { [key: string]: React.ReactElement } = {
  TypeScript: <SiTypescript className="text-blue-500" />,
  JavaScript: <SiJavascript className="text-yellow-400" />,
  Python: <SiPython className="text-blue-400" />,
  HTML: <SiHtml5 className="text-orange-500" />,
  CSS: <SiCss3 className="text-blue-500" />,
};

const languageColors: { [key: string]: string } = {
  TypeScript: "bg-blue-500",
  JavaScript: "bg-yellow-400",
  Python: "bg-blue-400",
  HTML: "bg-orange-500",
  CSS: "bg-blue-500",
  Java: "bg-red-500",
  Go: "bg-cyan-500",
  Rust: "bg-orange-600",
  Ruby: "bg-red-600",
  PHP: "bg-purple-500",
};

export default function GitHubProjects() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<GitHubStats>({
    totalRepos: 0,
    totalStars: 0,
    totalForks: 0,
    languages: {},
  });
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    fetchGitHubData();
  }, []);

  const fetchGitHubData = async () => {
    try {
      setLoading(true);
      
      // Buscar repositórios do usuário
      const response = await fetch(
        "https://api.github.com/users/mfelipperd/repos?sort=updated&per_page=100"
      );

      if (!response.ok) {
        throw new Error("Erro ao buscar repositórios do GitHub");
      }

      const data: GitHubRepo[] = await response.json();
      
      // Filtrar apenas repositórios públicos e ordenar por data de atualização
      const publicRepos = data
        .filter((repo) => repo.visibility === "public")
        .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());

      setRepos(publicRepos);

      // Calcular estatísticas
      const totalStars = publicRepos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
      const totalForks = publicRepos.reduce((acc, repo) => acc + repo.forks_count, 0);
      const languages: { [key: string]: number } = {};

      publicRepos.forEach((repo) => {
        if (repo.language) {
          languages[repo.language] = (languages[repo.language] || 0) + 1;
        }
      });

      setStats({
        totalRepos: publicRepos.length,
        totalStars,
        totalForks,
        languages,
      });

      setLoading(false);
    } catch (err) {
      console.error("Erro ao buscar dados do GitHub:", err);
      setError("Não foi possível carregar os projetos do GitHub");
      setLoading(false);
    }
  };

  const filteredRepos = filter === "all" 
    ? repos.slice(0, 12) 
    : repos.filter((repo) => repo.language === filter).slice(0, 12);

  const topLanguages = Object.entries(stats.languages)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  if (loading) {
    return (
      <div className="py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6)
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

  if (error) {
    return (
      <div className="py-8 text-center">
        <div className="glassmorphism p-8 max-w-2xl mx-auto">
          <FaGithub className="text-6xl text-purple-400 mx-auto mb-4" />
          <p className="text-purple-200 text-lg">{error}</p>
          <button
            onClick={fetchGitHubData}
            className="mt-4 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      {/* GitHub Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="glassmorphism p-6 text-center hover:scale-105 transition-all">
          <FaGithub className="text-4xl text-purple-400 mx-auto mb-2" />
          <div className="text-3xl font-bold text-purple-300">{stats.totalRepos}</div>
          <p className="text-purple-200 text-sm">Repositórios</p>
        </div>
        
        <div className="glassmorphism p-6 text-center hover:scale-105 transition-all">
          <FaStar className="text-4xl text-yellow-400 mx-auto mb-2" />
          <div className="text-3xl font-bold text-yellow-300">{stats.totalStars}</div>
          <p className="text-purple-200 text-sm">Stars</p>
        </div>
        
        <div className="glassmorphism p-6 text-center hover:scale-105 transition-all">
          <FaCodeBranch className="text-4xl text-green-400 mx-auto mb-2" />
          <div className="text-3xl font-bold text-green-300">{stats.totalForks}</div>
          <p className="text-purple-200 text-sm">Forks</p>
        </div>
        
        <div className="glassmorphism p-6 text-center hover:scale-105 transition-all">
          <div className="text-4xl mb-2">💻</div>
          <div className="text-3xl font-bold text-blue-300">{Object.keys(stats.languages).length}</div>
          <p className="text-purple-200 text-sm">Linguagens</p>
        </div>
      </div>

      {/* Language Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 rounded-lg transition-all ${
            filter === "all"
              ? "bg-purple-600 text-white"
              : "bg-black/30 text-purple-200 hover:bg-purple-600/50"
          }`}
        >
          Todos ({repos.length})
        </button>
        {topLanguages.map(([lang, count]) => (
          <button
            key={lang}
            onClick={() => setFilter(lang)}
            className={`px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
              filter === lang
                ? "bg-purple-600 text-white"
                : "bg-black/30 text-purple-200 hover:bg-purple-600/50"
            }`}
          >
            {languageIcons[lang] || "📝"}
            {lang} ({count})
          </button>
        ))}
      </div>

      {/* Repositories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRepos.map((repo) => (
          <div
            key={repo.id}
            className="bg-black/30 backdrop-blur-lg border border-purple-700/20 rounded-xl p-6 hover:border-purple-400/40 transition-all hover:scale-105 group flex flex-col"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2 flex-1">
                <FaGithub className="text-purple-400 text-xl flex-shrink-0" />
                <h4 className="font-bold text-lg text-purple-100 truncate group-hover:text-purple-300 transition">
                  {repo.name}
                </h4>
              </div>
            </div>

            {/* Description */}
            <p className="text-purple-200 text-sm mb-4 flex-grow line-clamp-2">
              {repo.description || "Sem descrição disponível"}
            </p>

            {/* Topics */}
            {repo.topics && repo.topics.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-4">
                {repo.topics.slice(0, 3).map((topic) => (
                  <span
                    key={topic}
                    className="text-xs bg-purple-900/50 text-purple-200 px-2 py-1 rounded-full"
                  >
                    #{topic}
                  </span>
                ))}
                {repo.topics.length > 3 && (
                  <span className="text-xs text-purple-400">+{repo.topics.length - 3}</span>
                )}
              </div>
            )}

            {/* Stats */}
            <div className="flex items-center gap-4 mb-4 text-sm text-purple-300">
              {repo.language && (
                <div className="flex items-center gap-1">
                  <div className={`w-3 h-3 rounded-full ${languageColors[repo.language] || "bg-gray-500"}`}></div>
                  <span>{repo.language}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <FaStar className="text-yellow-400" />
                <span>{repo.stargazers_count}</span>
              </div>
              <div className="flex items-center gap-1">
                <FaCodeBranch className="text-green-400" />
                <span>{repo.forks_count}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2">
              <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-center text-sm font-semibold flex items-center justify-center gap-2"
              >
                <FaGithub />
                Ver Código
              </a>
              {repo.homepage && (
                <a
                  href={repo.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-center text-sm font-semibold flex items-center justify-center gap-2"
                  title="Ver Demo"
                >
                  <FaExternalLinkAlt />
                </a>
              )}
            </div>

            {/* Last Update */}
            <div className="mt-4 pt-4 border-t border-purple-700/20">
              <p className="text-xs text-purple-400">
                Atualizado em {new Date(repo.updated_at).toLocaleDateString("pt-BR")}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Show More Button */}
      {filteredRepos.length < (filter === "all" ? repos.length : repos.filter(r => r.language === filter).length) && (
        <div className="text-center mt-8">
          <a
            href="https://github.com/mfelipperd?tab=repositories"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-full font-bold text-lg shadow-lg hover:from-purple-700 hover:to-purple-900 transition-all transform hover:scale-105"
          >
            <FaGithub className="text-xl" />
            Ver Todos no GitHub
            <FaExternalLinkAlt />
          </a>
        </div>
      )}
    </div>
  );
}

