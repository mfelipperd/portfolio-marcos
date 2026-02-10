"use client";

import { motion } from "framer-motion";
import { FaExternalLinkAlt } from "react-icons/fa";

interface Project {
  title: string;
  description: string;
  technologies: string[];
}

interface TimelineItem {
  year: string;
  title: string;
  type: "project" | "experience";
  description: string;
  technologies?: string[];
  link?: string;
  company?: string;
  period?: string;
  projects?: Project[];
  currentEmployer?: string;
}

const timelineData: TimelineItem[] = [
  {
    year: "2026",
    title: "Desenvolvimento Moderno",
    type: "project",
    description: "Aplicação de práticas e ferramentas de desenvolvimento de ponta, incluindo IA assistida e arquiteturas escaláveis.",
    currentEmployer: "ENCIBRA S.A.",
    projects: [
      {
        title: "Desenvolvimento com IA Assistida",
        description: "Utilização de ferramentas de IA para acelerar desenvolvimento e melhorar qualidade de código",
        technologies: ["GitHub Copilot", "Cursor", "Antigravity", "ChatGPT"]
      },
      {
        title: "Arquitetura Serverless",
        description: "Implementação de aplicações serverless escaláveis e econômicas",
        technologies: ["AWS Lambda", "Vercel Functions", "Next.js", "PostgreSQL"]
      },
      {
        title: "Monitoramento e Observabilidade",
        description: "Sistemas de monitoramento em tempo real com alertas e dashboards",
        technologies: ["Sentry", "Vercel Analytics", "Grafana", "Prometheus"]
      },
      {
        title: "Micro-frontends",
        description: "Arquitetura modular com micro-frontends para aplicações enterprise",
        technologies: ["Module Federation", "React", "TypeScript", "Webpack"]
      }
    ]
  },
  {
    year: "2025",
    title: "Automação e IA",
    type: "project",
    description: "Integração de inteligência artificial e automação em projetos, utilizando ferramentas modernas para otimizar processos e criar soluções inovadoras.",
    currentEmployer: "ENCIBRA S.A.",
    projects: [
      {
        title: "Workflows com n8n",
        description: "Automação de processos empresariais com integração de APIs, webhooks e processamento de dados",
        technologies: ["n8n", "Node.js", "APIs REST", "Webhooks", "PostgreSQL"]
      },
      {
        title: "Chatbots com Typebot",
        description: "Desenvolvimento de chatbots conversacionais inteligentes para atendimento automatizado",
        technologies: ["Typebot", "OpenAI", "Webhooks", "JavaScript"]
      },
      {
        title: "Integração com LLMs",
        description: "Implementação de modelos de linguagem em aplicações para análise de dados e geração de conteúdo",
        technologies: ["OpenAI API", "Claude API", "LangChain", "Python"]
      },
      {
        title: "Automação de Deploy",
        description: "Pipelines CI/CD automatizados com testes e deploy contínuo",
        technologies: ["GitHub Actions", "Docker", "Vercel", "AWS"]
      }
    ]
  },
  {
    year: "2024",
    title: "ENCIBRA S.A.",
    type: "experience",
    description: "Desenvolvedor de Software especializado em desenvolvimento de interfaces interativas com React.js e construção de APIs escaláveis com Node.js/Nest.js.",
    company: "ENCIBRA S.A.",
    period: "Fev 2024 - Presente",
    projects: [
      {
        title: "Sistema Financeiro",
        description: "Plataforma completa de gestão financeira com geração de PDF e exportação de relatórios",
        technologies: ["Next.js", "ShadcnUI", "TypeScript", "TailwindCSS", "Context API", "Docker"]
      },
      {
        title: "Sistema de Vistorias",
        description: "Aplicação para gerenciamento de vistorias técnicas com interface moderna e responsiva",
        technologies: ["Vite.js", "TypeScript", "TailwindCSS", "Context API", "Docker"]
      },
      {
        title: "Gerenciamento de Contratos",
        description: "Sistema para controle e acompanhamento de contratos empresariais",
        technologies: ["Next.js", "TypeScript", "PostgreSQL", "Nest.js"]
      },
      {
        title: "Gerenciamento de Saneamento Básico",
        description: "Plataforma para monitoramento e gestão de infraestrutura de saneamento",
        technologies: ["React", "Node.js", "PostgreSQL", "AWS"]
      },
      {
        title: "Fiscalização de Obras",
        description: "Sistema de acompanhamento e fiscalização de obras públicas",
        technologies: ["Next.js", "TypeScript", "Nest.js", "Docker"]
      }
    ]
  },
  {
    year: "2023",
    title: "Visual Laser",
    type: "project",
    description: "Website moderno para clínica de estética com galeria de procedimentos, sistema de agendamento integrado e blog educativo.",
    technologies: ["WordPress", "PHP", "MySQL", "JavaScript"],
    link: "https://visuallaser.med.br/",
    currentEmployer: "Oficina d'Ideias"
  },
  {
    year: "2023",
    title: "Home Idoc",
    type: "project",
    description: "Site institucional para plataforma de telemedicina que conecta médicos e pacientes.",
    technologies: ["React", "Next.js", "TypeScript"],
    link: "https://homeidoc.vercel.app/",
    currentEmployer: "Oficina d'Ideias"
  },
  {
    year: "2023",
    title: "Plataforma de Credenciamento + Expo Multimix",
    type: "project",
    description: "Sistema enterprise para gestão de credenciamentos da feira Expo Multimix, com controle de acesso, geração de crachás e relatórios em tempo real.",
    technologies: ["React", "NestJS", "PostgreSQL", "Docker"],
    link: "https://expo-mm-site.vercel.app/",
    currentEmployer: "Oficina d'Ideias"
  },
  {
    year: "2022",
    title: "Oficina d'Ideias",
    type: "experience",
    description: "Desenvolvedor Full Stack Júnior focado em Next.js e otimização SEO, construindo APIs REST robustas e interfaces de alta performance.",
    company: "Oficina d'Ideias",
    period: "Mai 2022 - Fev 2024",
    link: "https://oficina-di-deias.vercel.app/",
    projects: [
      {
        title: "WebScraper em Python",
        description: "Automação de coleta de dados web com processamento e armazenamento estruturado",
        technologies: ["Python", "BeautifulSoup", "Selenium", "Pandas"]
      },
      {
        title: "Formulário com PostgreSQL",
        description: "Sistema de formulários dinâmicos com validação e persistência em banco de dados relacional",
        technologies: ["React", "Node.js", "PostgreSQL", "Express"]
      },
      {
        title: "Landing Pages",
        description: "Páginas de conversão otimizadas para SEO e performance",
        technologies: ["Next.js", "TailwindCSS", "TypeScript"]
      },
      {
        title: "Sites Institucionais",
        description: "Websites corporativos responsivos com CMS integrado",
        technologies: ["Next.js", "React", "WordPress", "AWS"]
      }
    ]
  },
  {
    year: "2022",
    title: "LavaFlex",
    type: "project",
    description: "Primeiro site construído. Plataforma digital para lava-jato com agendamento online, controle de serviços e programa de fidelidade.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Node.js"],
    link: "https://lavaflex.com.br",
    currentEmployer: "Autônomo"
  }
];

export default function TimelineExperience() {
  return (
    <div className="relative py-8 md:py-12 max-w-4xl mx-auto">
      {/* Vertical Line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-white/10" />

      {/* Timeline Items */}
      <div className="space-y-12 md:space-y-16">
        {timelineData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative pl-8 md:pl-12"
          >
            {/* Dot on timeline */}
            <div className="absolute left-0 top-2 -translate-x-1/2 w-2 h-2 bg-white rounded-full" />

            {/* Year */}
            <div className="text-xs md:text-sm text-zinc-600 uppercase tracking-widest mb-2">
              {item.year}
              {item.currentEmployer && (
                <span className="text-zinc-500 ml-2">• {item.currentEmployer}</span>
              )}
            </div>

            {/* Title */}
            <h3 className="text-xl md:text-2xl font-bold text-white mb-2 tracking-tight">
              {item.title}
            </h3>

            {/* Company & Period */}
            {item.company && (
              <p className="text-sm text-zinc-500 uppercase tracking-wider mb-3">
                {item.company} • {item.period}
              </p>
            )}

            {/* Description */}
            <p className="text-zinc-400 leading-relaxed mb-4 max-w-2xl">
              {item.description}
            </p>

            {/* Technologies (for non-experience items) */}
            {item.technologies && !item.projects && (
              <div className="flex flex-wrap gap-3 mb-4">
                {item.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs text-zinc-500 tracking-wide"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {/* Projects (for experience items) */}
            {item.projects && (
              <div className="mt-6 space-y-6 border-l border-white/5 pl-6">
                {item.projects.map((project, pIndex) => (
                  <motion.div
                    key={pIndex}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: pIndex * 0.1 }}
                    className="relative"
                  >
                    {/* Project dot */}
                    <div className="absolute -left-[25px] top-2 w-1.5 h-1.5 bg-zinc-600 rounded-full" />
                    
                    <h4 className="text-lg font-semibold text-white mb-1">
                      {project.title}
                    </h4>
                    <p className="text-sm text-zinc-400 mb-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, tIndex) => (
                        <span
                          key={tIndex}
                          className="text-xs text-zinc-600"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Link */}
            {item.link && (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-white hover:text-zinc-400 transition-colors group mt-4"
              >
                <span className="border-b border-white/20 group-hover:border-zinc-400/40 transition-colors">
                  Ver {item.type === "experience" ? "empresa" : "projeto"}
                </span>
                <FaExternalLinkAlt className="text-xs" />
              </a>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
