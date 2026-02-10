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
      <div className="space-y-6 text-zinc-400 text-lg leading-relaxed mb-16">
        <p>
          Sou **Marcos Felippe**, Desenvolvedor Full Stack altamente qualificado, focado na criação de aplicações web modernas, escaláveis e de alta performance.
        </p>
        <p>
          Minha expertise abrange o desenvolvimento de interfaces dinâmicas com **React** e **Next.js**, além da construção de APIs robustas e seguras com **Node.js** e **Nest.js**.
        </p>
        <p>
          Com vivência em todo o ciclo de vida de desenvolvimento de software, utilizo tecnologias de ponta como **TypeScript**, **GraphQL**, **Tailwind CSS** e infraestrutura **AWS**. Sou um entusiasta de **Clean Code**, performance e, acima de tudo, da entrega de uma experiência de usuário excepcional.
        </p>
      </div>

      <h2 className="text-3xl font-bold mb-8">Habilidades Técnicas</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          "React.js / Next.js (SSR/SSG)",
          "Node.js / Nest.js / Java / Angular",
          "TypeScript / JavaScript (ES6+)",
          "GraphQL / RESTful APIs",
          "Tailwind CSS / UI Design / Mapbox",
          "PostgreSQL / MongoDB / MySQL",
          "AWS (RDS, Storage, Deployment)",
          "Clean Code / Clean Architecture",
          "Agile Methodologies / SEO"
        ].map((skill, index) => (
          <motion.div 
            key={skill}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + (index * 0.05) }}
            className="p-4 bg-zinc-900/30 border border-zinc-800/50 rounded-lg flex items-center gap-3"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
            <span className="text-zinc-300 font-medium">{skill}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
