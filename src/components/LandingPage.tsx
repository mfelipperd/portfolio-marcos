"use client";

import { motion } from "framer-motion";
import MarcasGrid from "./SubPages/MarcasGrid";
import LeadForm from "./LeadForm";
import { FaCode, FaPaintBrush, FaRocket, FaUserTie } from "react-icons/fa";

export default function LandingPage() {
  const sections = [
    {
      title: "Desenvolvimento 100% Personalizado",
      subtitle: "Fuja dos templates genéricos e do Wix. Crio sites únicos, escritos linha por linha, focados em performance e exclusividade.",
      icon: FaCode,
    },
    {
      title: "Design sob Medida",
      subtitle: "Sua marca merece uma identidade digital que reflita sua essência. Design moderno, minimalista e pensado na experiência do usuário.",
      icon: FaPaintBrush,
    },
    {
      title: "Resultado Profissional",
      subtitle: "Sites otimizados para conversão, SEO e velocidade. Transforme visitantes em clientes com uma presença digital de alto nível.",
      icon: FaRocket,
    }
  ];

  return (
    <div className="w-full space-y-32 pb-32">
      {/* Hero Content */}
      <section className="text-center space-y-8 pt-12 md:pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-4"
        >
          <h3 className="text-zinc-500 uppercase tracking-[0.5em] text-xs md:text-sm font-light">
            Soluções Digitais Premium
          </h3>
          <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tight leading-tight">
            Seu site não deve ser <br /> 
            <span className="text-zinc-500 italic">igual ao de todo mundo.</span>
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg md:text-xl font-light">
            Desenvolvo sites exclusivos para profissionais e empresas que buscam 
            se destacar com tecnologia de ponta e design inovador.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <a
            href="#contato"
            className="px-8 py-4 bg-white text-black rounded-full font-bold uppercase tracking-widest text-xs hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
            Começar meu Projeto
          </a>
          <div className="flex items-center gap-2 text-zinc-500 text-sm italic">
            <FaUserTie className="text-white/20" /> 
            Desenvolvimento por um especialista
          </div>
        </motion.div>
      </section>

      {/* Diferenciais */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto px-4">
        {sections.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className="p-8 border border-white/5 bg-zinc-900/20 rounded-2xl hover:border-white/20 transition-all group"
          >
            <item.icon className="text-3xl text-zinc-700 mb-6 group-hover:text-white transition-colors" />
            <h4 className="text-xl font-bold text-white mb-4">{item.title}</h4>
            <p className="text-zinc-500 text-sm leading-relaxed">{item.subtitle}</p>
          </motion.div>
        ))}
      </section>

      {/* Portfolio Highlight */}
      <section className="space-y-12">
        <div className="text-center space-y-2">
          <h4 className="text-zinc-500 uppercase tracking-widest text-xs">Portfólio Selecionado</h4>
          <h2 className="text-3xl md:text-5xl font-bold text-white">Projetos de impacto.</h2>
        </div>
        <MarcasGrid />
      </section>

      {/* Lead Capture Form */}
      <section id="contato" className="space-y-12 pt-20">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <div className="inline-block px-4 py-1 border border-white/10 rounded-full text-[10px] text-zinc-500 uppercase tracking-widest mb-4">
            Contato Direto
          </div>
          <h2 className="text-3xl md:text-6xl font-bold text-white tracking-tighter">
            Vamos tirar sua ideia do papel?
          </h2>
          <p className="text-zinc-400">
            Diga-me o que você precisa e eu entrarei em contato para conversarmos sobre como 
            podemos construir algo incrível juntos.
          </p>
        </div>
        <LeadForm />
      </section>
    </div>
  );
}
