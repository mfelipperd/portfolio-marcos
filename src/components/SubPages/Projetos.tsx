"use client";

import { motion } from "framer-motion";
import TimelineExperience from "../TimelineExperience";

interface ProjetosProps {
  onOpenContact: () => void;
}

export default function Projetos({ onOpenContact }: ProjetosProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full py-20 text-white"
    >
      <h2 className="text-4xl font-bold mb-4 text-center">Experiências & Projetos</h2>
      <p className="text-zinc-400 text-lg mb-16 text-center max-w-2xl mx-auto">
        Uma jornada cronológica através dos projetos e experiências profissionais que moldaram minha carreira como desenvolvedor.
      </p>

      <TimelineExperience />

      {/* CTA Button */}
      <div className="mt-16 text-center">
        <button
          onClick={onOpenContact}
          className="text-white hover:text-zinc-300 transition-all text-sm tracking-wider uppercase underline underline-offset-8 decoration-white/30 hover:decoration-white"
        >
          Interessado? Entre em Contato
        </button>
      </div>
    </motion.div>
  );
}
