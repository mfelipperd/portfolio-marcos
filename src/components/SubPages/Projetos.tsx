"use client";

import { motion } from "framer-motion";

export default function Projetos() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full py-20 text-white"
    >
      <h2 className="text-4xl font-bold mb-12">Experiência & Projetos</h2>
      <div className="space-y-12 text-left">
        <div>
          <h3 className="text-2xl font-semibold text-white">Software Developer</h3>
          <p className="text-zinc-500 mb-4 text-sm uppercase tracking-widest">ENCIBRA S.A. • Fev 2024 - Presente</p>
          <p className="text-zinc-400">Focado em React.js, Node.js, Nest.js e tecnologias cloud (AWS), desenvolvendo sistemas complexos de engenharia.</p>
        </div>
        <div>
          <h3 className="text-2xl font-semibold text-white">Full Stack Developer Jr.</h3>
          <p className="text-zinc-500 mb-4 text-sm uppercase tracking-widest">Oficina d'Ideias • Mai 2022 - Fev 2024</p>
          <p className="text-zinc-400">Atuação com Next.js e SEO, construindo APIs REST robustas e interfaces de alta conversão.</p>
        </div>
      </div>
    </motion.div>
  );
}
