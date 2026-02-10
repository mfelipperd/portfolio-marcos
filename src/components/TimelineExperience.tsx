"use client";

import { motion } from "framer-motion";
import { FaExternalLinkAlt, FaBriefcase, FaCode } from "react-icons/fa";

interface TimelineItem {
  year: string;
  title: string;
  type: "project" | "experience";
  description: string;
  technologies?: string[];
  link?: string;
  company?: string;
  period?: string;
}

const timelineData: TimelineItem[] = [
  {
    year: "2022",
    title: "LavaFlex",
    type: "project",
    description: "Primeiro site construído. Plataforma digital para lava-jato com agendamento online, controle de serviços e programa de fidelidade.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Node.js"],
    link: "https://lavaflex.com.br"
  },
  {
    year: "2022",
    title: "Oficina d'Ideias",
    type: "experience",
    description: "Desenvolvedor Full Stack Júnior focado em Next.js e otimização SEO, construindo APIs REST robustas e interfaces de alta performance.",
    technologies: ["React", "Next.js", "Node.js", "AWS"],
    company: "Oficina d'Ideias",
    period: "Mai 2022 - Fev 2024",
    link: "https://oficina-di-deias.vercel.app/"
  },
  {
    year: "2023",
    title: "Plataforma de Credenciamento + Expo Multimix",
    type: "project",
    description: "Sistema enterprise para gestão de credenciamentos da feira Expo Multimix, com controle de acesso, geração de crachás e relatórios em tempo real.",
    technologies: ["React", "NestJS", "PostgreSQL", "Docker"],
    link: "https://expo-mm-site.vercel.app/"
  },
  {
    year: "2023",
    title: "Home Idoc",
    type: "project",
    description: "Site institucional para plataforma de telemedicina que conecta médicos e pacientes.",
    technologies: ["React", "Next.js", "TypeScript"],
    link: "https://homeidoc.vercel.app/"
  },
  {
    year: "2023",
    title: "Visual Laser",
    type: "project",
    description: "Website moderno para clínica de estética com galeria de procedimentos, sistema de agendamento integrado e blog educativo.",
    technologies: ["WordPress", "PHP", "MySQL", "JavaScript"],
    link: "https://visuallaser.med.br/"
  },
  {
    year: "2024",
    title: "ENCIBRA S.A.",
    type: "experience",
    description: "Desenvolvedor de Software especializado em desenvolvimento de interfaces interativas com React.js e construção de APIs escaláveis com Node.js/Nest.js. Implementação de aplicações Next.js e administração de infraestrutura AWS.",
    technologies: ["React", "Next.js", "Node.js", "Nest.js", "AWS", "PostgreSQL"],
    company: "ENCIBRA S.A.",
    period: "Fev 2024 - Presente"
  }
];

export default function TimelineExperience() {
  return (
    <div className="relative py-20">
      {/* Timeline Line */}
      <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-zinc-800 via-zinc-700 to-zinc-800" />

      {/* Timeline Items */}
      <div className="space-y-16">
        {timelineData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className={`relative flex items-center ${
              index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            } flex-col md:gap-8`}
          >
            {/* Year Badge */}
            <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-zinc-900 to-black border-2 border-zinc-700 rounded-full flex items-center justify-center z-10">
              <span className="text-sm font-bold text-white">{item.year}</span>
            </div>

            {/* Content Card */}
            <div
              className={`w-full md:w-[calc(50%-4rem)] ${
                index % 2 === 0 ? "md:text-right md:pr-8" : "md:text-left md:pl-8"
              } ml-20 md:ml-0`}
            >
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="bg-gradient-to-br from-zinc-900/80 to-zinc-950/80 backdrop-blur-sm border border-zinc-800/50 rounded-2xl p-6 hover:border-zinc-700/70 transition-all"
              >
                {/* Icon & Title */}
                <div className={`flex items-center gap-3 mb-3 ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"} justify-start`}>
                  {item.type === "experience" ? (
                    <FaBriefcase className="text-2xl text-purple-400" />
                  ) : (
                    <FaCode className="text-2xl text-blue-400" />
                  )}
                  <h3 className="text-2xl font-bold text-white">{item.title}</h3>
                </div>

                {/* Company & Period */}
                {item.company && (
                  <p className="text-sm text-zinc-500 uppercase tracking-wider mb-3">
                    {item.company} • {item.period}
                  </p>
                )}

                {/* Description */}
                <p className="text-zinc-400 leading-relaxed mb-4">
                  {item.description}
                </p>

                {/* Technologies */}
                {item.technologies && (
                  <div className={`flex flex-wrap gap-2 mb-4 ${index % 2 === 0 ? "md:justify-end" : "md:justify-start"} justify-start`}>
                    {item.technologies.map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs bg-zinc-800/50 text-zinc-300 px-3 py-1 rounded-full border border-zinc-700/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                {/* Link */}
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors ${index % 2 === 0 ? "md:ml-auto" : ""}`}
                  >
                    <span>Ver {item.type === "experience" ? "empresa" : "projeto"}</span>
                    <FaExternalLinkAlt className="text-sm" />
                  </a>
                )}
              </motion.div>
            </div>

            {/* Spacer for alternating layout */}
            <div className="hidden md:block w-[calc(50%-4rem)]" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
