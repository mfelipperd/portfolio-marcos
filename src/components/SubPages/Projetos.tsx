"use client";

import { motion } from "framer-motion";
import TimelineExperience from "../TimelineExperience";

export default function Projetos() {
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
    </motion.div>
  );
}
