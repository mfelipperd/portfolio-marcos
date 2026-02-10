"use client";

import { motion } from "framer-motion";

export default function Sobre() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full py-20 text-white"
    >
      <h2 className="text-4xl font-bold mb-8">Sobre Mim</h2>
      <div className="space-y-6 text-zinc-400 text-lg leading-relaxed">
        <p>
          Sou Marcos Felippe, Desenvolvedor Full Stack especializado na criação de aplicações web modernas, escaláveis e de alta performance, com foco principal nos ecossistemas **React** e **Node.js**.
        </p>
        <p>
          Com sólida experiência em todo o ciclo de vida de desenvolvimento de software, busco entregar soluções inovadoras que priorizam a experiência do usuário e a performance, utilizando as melhores práticas como **Clean Code** e desenvolvimento orientado a componentes.
        </p>
      </div>
    </motion.div>
  );
}
