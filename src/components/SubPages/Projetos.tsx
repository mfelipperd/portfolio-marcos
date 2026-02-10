"use client";

import { motion } from "framer-motion";
import InteractiveProjects from "../InteractiveProjects";

export default function Projetos() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full py-20 text-white"
    >
      <h2 className="text-4xl font-bold mb-8">Projetos & Portfólio</h2>
      <p className="text-zinc-400 text-lg mb-12">
        Uma seleção de projetos que desenvolvi, variando de aplicações enterprise a experimentos criativos.
      </p>

      

      <div className="mt-32 pt-16 border-t border-zinc-800/50">
        <h2 className="text-4xl font-bold mb-12">Experiência Profissional</h2>
        <div className="space-y-12 text-left">
          <div>
            <h3 className="text-2xl font-semibold text-white">Desenvolvedor de Software</h3>
            <p className="text-zinc-500 mb-4 text-sm uppercase tracking-widest">ENCIBRA S.A. • Fev 2024 - Presente</p>
            <div className="text-zinc-400 space-y-2">
              <p>Desenvolvimento de interfaces interativas com React.js e construção de APIs escaláveis com Node.js/Nest.js.</p>
              <p>Implementação de aplicações Next.js e administração de infraestrutura AWS (RDS, Storage).</p>
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-semibold text-white">Desenvolvedor Full Stack Júnior</h3>
            <p className="text-zinc-500 mb-4 text-sm uppercase tracking-widest">Oficina d'Ideias • Mai 2022 - Fev 2024</p>
            <div className="text-zinc-400 space-y-2">
              <p>Foco em Next.js e otimização SEO, construindo APIs REST robustas e interfaces de alta performance.</p>
              <p>Gerenciamento de soluções em nuvem AWS e entregas baseadas em metodologias ágeis.</p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
