"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPaperPlane, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

export default function LeadForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    interest: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Erro ao enviar");

      setStatus("success");
      setFormData({ name: "", contact: "", interest: "" });
      
      // Reset after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      console.error(err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const inputClasses = "w-full bg-zinc-900/50 border border-white/10 rounded-lg p-3 text-white placeholder:text-zinc-600 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20 transition-all";

  return (
    <div className="w-full max-w-xl mx-auto">
      <motion.form
        onSubmit={handleSubmit}
        className="space-y-6 bg-black/40 backdrop-blur-xl p-8 rounded-2xl border border-white/5 shadow-2xl relative overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-zinc-500 font-semibold ml-1">Seu Nome</label>
            <input
              required
              type="text"
              placeholder="Ex: João Silva"
              className={inputClasses}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              disabled={status === "loading" || status === "success"}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-zinc-500 font-semibold ml-1">WhatsApp ou E-mail</label>
            <input
              required
              type="text"
              placeholder="Ex: (91) 99999-9999 ou email@exemplo.com"
              className={inputClasses}
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              disabled={status === "loading" || status === "success"}
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs uppercase tracking-widest text-zinc-500 font-semibold ml-1">O que você precisa?</label>
            <select
              className={`${inputClasses} appearance-none cursor-pointer`}
              value={formData.interest}
              onChange={(e) => setFormData({ ...formData, interest: e.target.value })}
              disabled={status === "loading" || status === "success"}
              title="Selecione o serviço de interesse"
              aria-label="Selecione o serviço de interesse"
            >
              <option value="">Selecione uma opção</option>
              <option value="Landing Page">Landing Page</option>
              <option value="Portfolio">Portfólio Profissional</option>
              <option value="Ecommerce">E-commerce Customizado</option>
              <option value="Sistema">Sistema Web / Dashboard</option>
              <option value="Outros">Outros Projetos</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className={`w-full py-4 rounded-lg font-bold uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-all duration-500 ${
            status === "success" 
            ? "bg-green-600 text-white" 
            : status === "error"
            ? "bg-red-600 text-white"
            : "bg-white text-black hover:bg-zinc-200"
          } disabled:opacity-70`}
        >
          <AnimatePresence mode="wait">
            {status === "idle" && (
              <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-2">
                Solicitar Orçamento Grátis <FaPaperPlane className="text-xs" />
              </motion.span>
            )}
            {status === "loading" && (
              <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                Enviando...
              </motion.span>
            )}
            {status === "success" && (
              <motion.span key="success" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex items-center gap-2">
                Enviado com Sucesso! <FaCheckCircle />
              </motion.span>
            )}
            {status === "error" && (
              <motion.span key="error" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex items-center gap-2">
                Erro ao enviar <FaExclamationCircle />
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        <p className="text-[10px] text-center text-zinc-600 uppercase tracking-tighter">
          Seus dados estão seguros. Entrarei em contato em até 24h.
        </p>

        {/* Decorative background rays inside the form */}
        <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-white/5 blur-[100px] rounded-full pointer-events-none" />
      </motion.form>
    </div>
  );
}
