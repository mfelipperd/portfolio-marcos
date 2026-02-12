"use client";

import { motion } from "framer-motion";
import { SiReact, SiNodedotjs, SiTypescript, SiGraphql, SiTailwindcss, SiPostgresql, SiDocker } from "react-icons/si";
import { FaCode } from "react-icons/fa6";
import { MdOutlineShowChart } from "react-icons/md";

interface SobreProps {
  onOpenContact: () => void;
}

export default function Sobre({ onOpenContact }: SobreProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full py-12 md:py-20 text-white"
    >
      <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8">Sobre Mim</h2>
      <div className="space-y-4 md:space-y-6 text-zinc-400 text-base md:text-lg leading-relaxed mb-12 md:mb-16">
        <p>
          Desenvolvedor Full Stack especializado em criar aplicações web escaláveis e de alta performance, com domínio completo do ciclo de desenvolvimento — do planejamento estratégico à implementação e manutenção.
        </p>
        <p>
          Construo interfaces dinâmicas e intuitivas com <strong>React</strong> e <strong>Next.js</strong>, e APIs robustas com <strong>Node.js</strong> e <strong>Nest.js</strong>. Meu diferencial está na capacidade de <strong>automatizar processos manuais</strong>, otimizando tempo de desenvolvimento e acelerando entregas.
        </p>
        <p>
          Vou além do código: participo ativamente na <strong>definição de arquiteturas</strong>, identifico oportunidades de melhoria em sistemas existentes e implemento soluções que agregam valor real ao produto. Comprometido com <strong>Clean Code</strong>, qualidade e performance, entrego software testável, reutilizável e preparado para escalar.
        </p>
      </div>

      <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">Habilidades Técnicas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 md:gap-x-12 gap-y-3 md:gap-y-4">
        {[
          { name: "React.js / Next.js (SSR/SSG)", icon: SiReact },
          { name: "Node.js / Nest.js / Java / Angular", icon: SiNodedotjs },
          { name: "TypeScript / JavaScript (ES6+)", icon: SiTypescript },
          { name: "GraphQL / RESTful APIs", icon: SiGraphql },
          { name: "Tailwind CSS / UI Design / Mapbox", icon: SiTailwindcss },
          { name: "PostgreSQL / MongoDB / MySQL", icon: SiPostgresql },
          { name: "Docker / CI/CD / Automação (n8n)", icon: SiDocker },
          { name: "Clean Code / Clean Architecture", icon: FaCode },
          { name: "Agile Methodologies / SEO", icon: MdOutlineShowChart }
        ].map((skill, index) => (
          <motion.div 
            key={skill.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + (index * 0.05) }}
            className="flex items-center gap-3 py-2 border-b border-white/5 group hover:border-white/10 transition-colors"
          >
            <skill.icon className="text-lg text-zinc-500 group-hover:text-zinc-300 transition-colors grayscale" />
            <span className="text-zinc-400 text-sm tracking-wide group-hover:text-zinc-300 transition-colors">{skill.name}</span>
          </motion.div>
        ))}
      </div>

      <h2 className="text-2xl md:text-3xl font-bold mt-16 md:mt-24 mb-6 md:mb-8">Ecossistema & Ferramentas</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-8 md:gap-x-12 gap-y-3 md:gap-y-4">
        {[
          { name: "Zod / React Hook Form (RHF)", icon: FaCode },
          { name: "Shadcn UI / Radix UI", icon: SiTailwindcss },
          { name: "Tanstack Query / Table", icon: MdOutlineShowChart },
          { name: "Zustand / Redux Toolkit", icon: FaCode },
          { name: "ReactBits / Framer Motion", icon: SiReact },
          { name: "SWR / Axios / Fetch API", icon: FaCode }
        ].map((tool, index) => (
          <motion.div 
            key={tool.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + (index * 0.05) }}
            className="flex items-center gap-3 py-2 border-b border-white/5 group hover:border-white/10 transition-colors"
          >
            <tool.icon className="text-lg text-zinc-500 group-hover:text-zinc-300 transition-colors grayscale" />
            <span className="text-zinc-400 text-sm tracking-wide group-hover:text-zinc-300 transition-colors">{tool.name}</span>
          </motion.div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="mt-12 md:mt-16 text-center">
        <button
          onClick={onOpenContact}
          className="text-white hover:text-zinc-300 transition-all text-xs md:text-sm tracking-wider uppercase underline underline-offset-8 decoration-white/30 hover:decoration-white"
        >
          Vamos Trabalhar Juntos?
        </button>
      </div>
    </motion.div>
  );
}
