"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThreeDText from "../components/ThreeDText";
import FlashlightCursor from "../components/FlashlightCursor";
import ContactModal from "../components/ContactModal";
import Sobre from "../components/SubPages/Sobre";
import Projetos from "../components/SubPages/Projetos";

export default function Home() {
  const [activePage, setActivePage] = useState<string | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const menuItems = ["Sobre", "Experiências"];

  const renderContent = () => {
    switch (activePage) {
      case "Sobre": return <Sobre onOpenContact={() => setIsContactModalOpen(true)} />;
      case "Experiências": return <Projetos onOpenContact={() => setIsContactModalOpen(true)} />;
      default: return null;
    }
  };


  return (
    <main className="relative min-h-screen bg-black overflow-hidden select-none">
      <FlashlightCursor />

      {/* Header Container */}
      <motion.header
        animate={{
          height: activePage ? "4rem" : "100vh",
          backgroundColor: activePage ? "rgba(0,0,0,0.85)" : "rgba(0,0,0,0)",
          borderBottomColor: activePage ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0)",
        }}
        className={`fixed top-0 inset-x-0 z-50 flex items-center transition-colors ${activePage ? 'backdrop-blur-md border-b' : ''}`}
      >
        <div className={`w-full max-w-[1200px] mx-auto px-4 md:px-6 flex ${activePage ? 'flex-row justify-between items-center h-full' : 'flex-col items-center justify-center gap-8 md:gap-12'}`}>




          
          {/* Title / Logo Container */}
          <motion.div
            initial={false}
            animate={{
              scale: activePage ? 0.35 : 1,
              x: 0,
              y: 0,
              width: activePage ? "auto" : "100%",
            }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className={`cursor-pointer z-50 flex items-center justify-start w-fit ${!activePage ? 'flashlight-mask' : ''}`}
            onClick={() => setActivePage(null)}
            style={{ transformOrigin: "left center" }}
          >
            <ThreeDText 
              text="M.Felippe" 
              className="text-4xl sm:text-6xl md:text-9xl tracking-tighter text-left m-0 p-0"
            />
          </motion.div>



          {/* Menu Container */}
          <motion.nav
            layout
            className="flex gap-4 md:gap-12 ml-auto flex-shrink-0"
          >
            {menuItems
              .filter(item => {
                // Na home: mostra todos os itens
                if (!activePage) return true;
                // Quando em uma página: mostra apenas a outra opção
                return item !== activePage;
              })
              .map((item) => (
                <span 
                  key={item} 
                  onClick={() => setActivePage(item)}
                  className={`menu-item text-base sm:text-lg md:text-xl font-medium tracking-wide ${activePage === item ? 'text-white' : ''}`}
                >
                  {item}
                </span>
              ))
            }
          </motion.nav>
        </div>
      </motion.header>

      {/* Sub-page Content Area */}
      <div className="relative z-10 pt-20 md:pt-24 min-h-screen">
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">



        <AnimatePresence mode="wait">
          {activePage && (
            <motion.div
              key={activePage}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {renderContent()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>


      {/* Subtle Bottom Footer */}
      {!activePage && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <button
            onClick={() => setIsContactModalOpen(true)}
            className="px-8 py-3 border border-white/20 text-white hover:bg-white hover:text-black transition-all rounded-full text-sm tracking-wider uppercase"
          >
            Entrar em Contato
          </button>
          <p className="text-xs text-zinc-800 tracking-widest uppercase">
            © 2026 Portfolio
          </p>
        </motion.div>
      )}

      {/* Contact Modal */}
      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </main>
  );
}

