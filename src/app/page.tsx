"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThreeDText from "../components/ThreeDText";
import FlashlightCursor from "../components/FlashlightCursor";
import Sobre from "../components/SubPages/Sobre";
import Skills from "../components/SubPages/Skills";
import Projetos from "../components/SubPages/Projetos";
import Contato from "../components/SubPages/Contato";

export default function Home() {
  const [activePage, setActivePage] = useState<string | null>(null);
  const menuItems = ["Sobre", "Skills", "Projetos", "Contato"];

  const renderContent = () => {
    switch (activePage) {
      case "Sobre": return <Sobre />;
      case "Skills": return <Skills />;
      case "Projetos": return <Projetos />;
      case "Contato": return <Contato />;
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
        <div className={`w-full max-w-[1200px] mx-auto px-6 flex ${activePage ? 'flex-row justify-between items-center h-full' : 'flex-col items-center justify-center gap-12'}`}>




          
          {/* Title / Logo Container */}
          <motion.div
            initial={false}
            animate={{
              scale: activePage ? 0.25 : 1,
              x: 0,
              y: 0,
            }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className={`cursor-pointer z-50 flex items-center justify-start w-fit ${!activePage ? 'flashlight-mask' : ''}`}
            onClick={() => setActivePage(null)}
            style={{ transformOrigin: "left center" }}
          >
            <ThreeDText 
              text="M.Felippe" 
              className="text-6xl md:text-9xl tracking-tighter text-left m-0 p-0"
            />
          </motion.div>



          {/* Menu Container */}
          <motion.nav
            layout
            className="flex gap-6 md:gap-12"
          >
            {menuItems.map((item) => (
              <span 
                key={item} 
                onClick={() => setActivePage(item)}
                className={`menu-item text-lg md:text-xl font-medium tracking-wide ${activePage === item ? 'text-white' : ''}`}
              >
                {item}
              </span>
            ))}
          </motion.nav>
        </div>
      </motion.header>

      {/* Sub-page Content Area */}
      <div className="relative z-10 pt-24 min-h-screen">
        <div className="max-w-[1200px] mx-auto px-6">



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
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-xs text-zinc-800 tracking-widest uppercase"
        >
          © 2026 Portfolio
        </motion.div>
      )}
    </main>
  );
}

