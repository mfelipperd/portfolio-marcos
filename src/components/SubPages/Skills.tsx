"use client";

import { motion } from "framer-motion";

const skills = [
  "React.js / Next.js",
  "Node.js / Nest.js",
  "TypeScript / JavaScript",
  "GraphQL / REST APIs",
  "Tailwind CSS / UI Design",
  "PostgreSQL / MongoDB / MySQL",
  "AWS (Cloud Architecture)",
  "Clean Code / Clean Architecture",
  "Agile Methodologies"
];

export default function Skills() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full py-20 text-white"
    >
      <h2 className="text-4xl font-bold mb-12">Habilidades</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skills.map((skill, index) => (
          <motion.div 
            key={skill}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-lg"
          >
            <span className="text-xl font-medium">{skill}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
