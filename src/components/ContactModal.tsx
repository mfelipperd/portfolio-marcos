"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaLinkedin, FaWhatsapp, FaEnvelope, FaTimes } from "react-icons/fa";
import { HiDownload } from "react-icons/hi";
import { useEffect, useState } from "react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [isRecruiter, setIsRecruiter] = useState(false);

  // Reset recruiter state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => setIsRecruiter(false), 500);
    }
  }, [isOpen]);

  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const contactLinks = [
    {
      name: "LinkedIn",
      icon: FaLinkedin,
      url: "https://www.linkedin.com/in/mfelipperd/",
      label: "/in/mfelipperd"
    },
    {
      name: "Email",
      icon: FaEnvelope,
      url: "mailto:marcos.felippe.dev@gmail.com",
      label: "marcos.felippe.dev@gmail.com"
    },
    {
      name: "WhatsApp",
      icon: FaWhatsapp,
      url: "https://wa.me/5591991195755",
      label: "+55 (91) 99119-5755"
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-black border border-white/10 rounded-2xl p-8 max-w-md w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors"
                aria-label="Fechar"
              >
                <FaTimes size={24} />
              </button>

              {/* Title */}
              <h2 className="text-3xl font-bold text-white mb-2">
                Vamos Conversar?
              </h2>
              <p className="text-zinc-400 mb-8">
                Entre em contato através de qualquer um dos canais abaixo.
              </p>

              {/* Contact Links */}
              <div className="space-y-4">
                {contactLinks.map((contact, index) => (
                  <motion.a
                    key={contact.name}
                    href={contact.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-4 p-4 border border-white/10 rounded-xl hover:border-white/30 hover:bg-white/5 transition-all group"
                  >
                    <contact.icon className="text-3xl text-white group-hover:scale-110 transition-transform" />
                    <div className="flex-1">
                      <div className="text-sm text-zinc-500 uppercase tracking-wider">
                        {contact.name}
                      </div>
                      <div className="text-white group-hover:text-zinc-300 transition-colors">
                        {contact.label}
                      </div>
                    </div>
                  </motion.a>
                ))}

                {/* Recruiter Section */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: contactLinks.length * 0.1 }}
                  className="mt-6 p-4 bg-zinc-900/50 border border-dashed border-white/10 rounded-xl overflow-hidden"
                >
                  <AnimatePresence mode="wait">
                    {!isRecruiter ? (
                      <motion.div
                        key="identify"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="text-center"
                      >
                        <p className="text-sm text-zinc-400 mb-3">
                          É um recrutador?
                        </p>
                        <button
                          onClick={() => setIsRecruiter(true)}
                          className="text-white hover:text-zinc-300 transition-all text-xs tracking-wider uppercase underline underline-offset-4 decoration-white/30 hover:decoration-white"
                        >
                          Sim, eu sou
                        </button>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="download"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                      >
                        <a
                          href="/assets/MARCOS-FELIPPE-CV.pdf"
                          download="MARCOS-FELIPPE-CV.pdf"
                          className="flex items-center justify-center gap-3 w-full py-3 bg-white text-black rounded-lg font-bold hover:bg-zinc-200 transition-colors group"
                        >
                          <HiDownload className="text-xl group-hover:scale-110 transition-transform" />
                          Download Currículo
                        </a>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>

              {/* Footer */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <p className="text-sm text-zinc-500 text-center">
                  Belém, PA - Brasil • Disponível para novas oportunidades
                </p>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
