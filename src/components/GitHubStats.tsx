"use client";

import { useState, useEffect } from "react";
import { FaGithub, FaStar, FaCodeBranch, FaCode } from "react-icons/fa";

interface GitHubContribution {
  date: string;
  count: number;
  level: number;
}

interface GitHubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
}

export default function GitHubStats() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [contributions, setContributions] = useState<number>(2250);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGitHubUser();
  }, []);

  const fetchGitHubUser = async () => {
    try {
      const response = await fetch("https://api.github.com/users/mfelipperd");
      const data = await response.json();
      setUser(data);
      setLoading(false);
    } catch (error) {
      console.error("Erro ao buscar dados do usuário:", error);
      setLoading(false);
    }
  };

  const getContributionColor = (level: number) => {
    const colors = [
      "bg-purple-900/20",
      "bg-purple-700/40",
      "bg-purple-600/60",
      "bg-purple-500/80",
      "bg-purple-400",
    ];
    return colors[level] || colors[0];
  };

  // Gerar dados de contribuição simulados para os últimos 365 dias
  const generateContributionData = () => {
    const data: GitHubContribution[] = [];
    const today = new Date();
    
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      // Simular contribuições (você pode substituir isso por dados reais de uma API)
      const count = Math.floor(Math.random() * 15);
      const level = count === 0 ? 0 : Math.min(Math.floor(count / 3), 4);
      
      data.push({
        date: date.toISOString().split('T')[0],
        count,
        level,
      });
    }
    
    return data;
  };

  const contributionData = generateContributionData();

  // Agrupar por semana
  const weeks: GitHubContribution[][] = [];
  for (let i = 0; i < contributionData.length; i += 7) {
    weeks.push(contributionData.slice(i, i + 7));
  }

  if (loading) {
    return (
      <div className="glassmorphism p-8">
        <div className="animate-pulse">
          <div className="h-8 bg-purple-900/30 rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-24 bg-purple-900/30 rounded"></div>
            ))}
          </div>
          <div className="h-32 bg-purple-900/30 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="glassmorphism p-8">
      <div className="flex items-center gap-3 mb-8">
        <FaGithub className="text-3xl text-purple-400" />
        <h3 className="text-3xl font-bold text-purple-200">
          Atividade no GitHub
        </h3>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-black/30 backdrop-blur-lg border border-purple-700/20 rounded-xl p-6 hover:border-purple-400/40 transition hover:scale-105">
          <FaCode className="text-3xl text-purple-400 mb-2" />
          <div className="text-2xl font-bold text-purple-300">
            {user?.public_repos || 38}
          </div>
          <p className="text-purple-200 text-sm">Repositórios Públicos</p>
        </div>

        <div className="bg-black/30 backdrop-blur-lg border border-green-700/20 rounded-xl p-6 hover:border-green-400/40 transition hover:scale-105">
          <div className="text-3xl mb-2">👥</div>
          <div className="text-2xl font-bold text-green-300">
            {user?.followers || 25}
          </div>
          <p className="text-purple-200 text-sm">Seguidores</p>
        </div>

        <div className="bg-black/30 backdrop-blur-lg border border-blue-700/20 rounded-xl p-6 hover:border-blue-400/40 transition hover:scale-105">
          <div className="text-3xl mb-2">🔥</div>
          <div className="text-2xl font-bold text-blue-300">
            {contributions}+
          </div>
          <p className="text-purple-200 text-sm">Contribuições</p>
        </div>

        <div className="bg-black/30 backdrop-blur-lg border border-orange-700/20 rounded-xl p-6 hover:border-orange-400/40 transition hover:scale-105">
          <div className="text-3xl mb-2">⭐</div>
          <div className="text-2xl font-bold text-orange-300">
            {Math.floor((Date.now() - new Date(user?.created_at || "2020-01-01").getTime()) / (1000 * 60 * 60 * 24 * 365))}+
          </div>
          <p className="text-purple-200 text-sm">Anos no GitHub</p>
        </div>
      </div>

      {/* Contribution Graph */}
      <div className="bg-black/30 backdrop-blur-lg border border-purple-700/20 rounded-xl p-6">
        <h4 className="text-lg font-bold text-purple-300 mb-4">
          Contribuições nos últimos 12 meses
        </h4>
        
        <div className="overflow-x-auto">
          <div className="flex gap-1 min-w-max">
            {weeks.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-1">
                {week.map((day, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={`w-3 h-3 rounded-sm ${getContributionColor(day.level)} transition-all hover:scale-150 cursor-pointer`}
                    title={`${day.date}: ${day.count} contribuições`}
                  ></div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-2 mt-4 text-sm text-purple-300">
          <span>Menos</span>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className={`w-3 h-3 rounded-sm ${getContributionColor(level)}`}
              ></div>
            ))}
          </div>
          <span>Mais</span>
        </div>
      </div>

      {/* GitHub Profile Link */}
      <div className="mt-6 text-center">
        <a
          href="https://github.com/mfelipperd"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-all transform hover:scale-105 font-semibold"
        >
          <FaGithub className="text-xl" />
          Ver Perfil Completo no GitHub
        </a>
      </div>
    </div>
  );
}

