"use client";

import { motion } from "framer-motion";

export default function Contato() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full py-20 text-white"
    >
      <h2 className="text-4xl font-bold mb-8 text-center">Vamos Conversar?</h2>
      <div className="flex flex-col items-center gap-8">
        <div className="flex flex-col items-center gap-2">
          <a 
            href="mailto:felipperabelodurans@gmail.com"
            className="text-2xl hover:text-zinc-400 transition-colors"
          >
            felipperabelodurans@gmail.com
          </a>
          <p className="text-zinc-500 text-lg">+55 (91) 99119-5755</p>
        </div>
        <div className="flex gap-8">
          <a href="https://linkedin.com/in/mfelipperd" target="_blank" className="text-zinc-400 hover:text-white transition-colors">LinkedIn</a>
          <a href="https://github.com/mfelipperd" target="_blank" className="text-zinc-400 hover:text-white transition-colors">GitHub</a>
        </div>
        <div className="h-px w-24 bg-zinc-800" />
        <p className="text-zinc-500">Belém, PA - Brasil • Disponível para novas oportunidades.</p>
      </div>
    </motion.div>
  );
}
