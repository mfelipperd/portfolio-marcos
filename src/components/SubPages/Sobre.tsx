"use client";

import { motion } from "framer-motion";

interface SobreProps {
  onOpenContact: () => void;
}

export default function Sobre({ onOpenContact }: SobreProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full py-20 text-white"
    >
      <h2 className="text-4xl font-bold mb-8">Sobre Mim</h2>
      <div className="space-y-6 text-zinc-400 text-lg leading-relaxed mb-16">
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

      <h2 className="text-3xl font-bold mb-8">Habilidades Técnicas</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-x-12 gap-y-4">
        {[
          "React.js / Next.js (SSR/SSG)",
          "Node.js / Nest.js / Java / Angular",
          "TypeScript / JavaScript (ES6+)",
          "GraphQL / RESTful APIs",
          "Tailwind CSS / UI Design / Mapbox",
          "PostgreSQL / MongoDB / MySQL",
          "Docker / CI/CD / Automação (n8n)",
          "Clean Code / Clean Architecture",
          "Agile Methodologies / SEO"
        ].map((skill, index) => (
          <motion.div 
            key={skill}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + (index * 0.05) }}
            className="flex items-center gap-3 py-2 border-b border-white/5"
          >
            <div className="w-1 h-1 rounded-full bg-white/60" />
            <span className="text-zinc-400 text-sm tracking-wide">{skill}</span>
          </motion.div>
        ))}
      </div>

      {/* CTA Button */}
      <div className="mt-16 text-center">
        <button
          onClick={onOpenContact}
          className="px-8 py-3 border border-white/20 text-white hover:bg-white hover:text-black transition-all rounded-full text-sm tracking-wider uppercase"
        >
          Vamos Trabalhar Juntos?
        </button>
      </div>
    </motion.div>
  );
}
