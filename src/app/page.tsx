"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import LightRays from "../components/LightRays";
import FlashlightCursor from "../components/FlashlightCursor";
import ContactModal from "../components/ContactModal";
import Sobre from "../components/SubPages/Sobre";
import Projetos from "../components/SubPages/Projetos";
import MarcasGrid from "@/components/SubPages/MarcasGrid";
import Ferramentas from "../components/SubPages/Ferramentas";
import LandingPage from "../components/LandingPage";

function PortfolioContent() {
  const searchParams = useSearchParams();
  const menuItems = ["Portfolio", "Sobre", "Experiências", "Ferramentas"];
  
  // Initial state based on URL
  const pParam = searchParams.get("p")?.toLowerCase();
  const isDirectTool = pParam === "curriculo" || pParam === "resume" || pParam === "qrcode";
  const initialPage = menuItems.find(
    item => item.toLowerCase() === pParam
  ) || (isDirectTool ? "Ferramentas" : "Portfolio");

  const [activePage, setActivePage] = useState<string | null>(initialPage);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSubToolActive, setIsSubToolActive] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const isLocalhost = 
      typeof window !== "undefined" && 
      (window.location.hostname === "localhost" || 
       window.location.hostname === "127.0.0.1" || 
       window.location.hostname.startsWith("192.168."));
    
    if (isLocalhost) {
      localStorage.setItem("portfolio_admin_token", "@Marcana3027");
      setIsAdmin(true);
      return;
    }

    const adminToken = localStorage.getItem("portfolio_admin_token");
    if (adminToken) {
      fetch("/api/admin/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: adminToken }),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.valid) {
            setIsAdmin(true);
          } else {
            localStorage.removeItem("portfolio_admin_token");
          }
        })
        .catch(() => {});
    }
  }, []);

  const handleAdminTrigger = async () => {
    if (isAdmin) {
      localStorage.removeItem("portfolio_admin_token");
      setIsAdmin(false);
      alert("Modo Administrador Desativado! PDFs serão criptografados.");
    } else {
      const pw = prompt("Digite a senha de administrador:");
      if (pw) {
        try {
          const res = await fetch("/api/admin/validate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ token: pw }),
          });
          const json = await res.json();
          if (json.valid) {
            localStorage.setItem("portfolio_admin_token", pw);
            setIsAdmin(true);
            alert("Modo Administrador Ativado! PDFs serão gerados sem criptografia.");
          } else {
            alert("Senha incorreta!");
          }
        } catch (err) {
          alert("Erro ao validar senha.");
        }
      }
    }
  };

  // Scroll listener for landing page
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Listen for tool/page parameter changes in URL to dynamically check if sub-tool is active
  useEffect(() => {
    const checkTool = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const p = urlParams.get("p")?.toLowerCase();
      const tool = urlParams.get("tool")?.toLowerCase();
      setIsSubToolActive(
        p === "curriculo" || p === "resume" || p === "qrcode" || !!tool
      );
    };

    checkTool();
    window.addEventListener("popstate", checkTool);
    
    // Intercept pushState and replaceState to catch manual URL updates
    const originalReplaceState = window.history.replaceState;
    const originalPushState = window.history.pushState;
    
    window.history.replaceState = function(...args) {
      originalReplaceState.apply(this, args);
      checkTool();
    };
    window.history.pushState = function(...args) {
      originalPushState.apply(this, args);
      checkTool();
    };

    return () => {
      window.removeEventListener("popstate", checkTool);
      window.history.replaceState = originalReplaceState;
      window.history.pushState = originalPushState;
    };
  }, []);

  // Sync URL when activePage changes
  useEffect(() => {
    const url = new URL(window.location.href);
    if (activePage) {
      const currentP = url.searchParams.get("p")?.toLowerCase();
      const isCurrentDirect = currentP === "curriculo" || currentP === "resume" || currentP === "qrcode";
      
      if (activePage === "Ferramentas" && isCurrentDirect) {
        // Keep the direct url parameter p=curriculo / p=resume / p=qrcode
      } else {
        url.searchParams.set("p", activePage.toLowerCase());
        url.searchParams.delete("tool");
      }
    } else {
      url.searchParams.delete("p");
      url.searchParams.delete("tool");
    }
    window.history.replaceState({}, "", url.toString());
  }, [activePage]);

  const renderContent = () => {
    switch (activePage) {
      case "Portfolio": return <MarcasGrid />;
      case "Sobre": return <Sobre onOpenContact={() => setIsContactModalOpen(true)} />;
      case "Experiências": return <Projetos onOpenContact={() => setIsContactModalOpen(true)} />;
      case "Ferramentas": return <Ferramentas />;
      default: return null;
    }
  };

  const getPageTitle = () => {
    if (activePage === "Portfolio") return "Marcas & Projetos";
    if (activePage === "Sobre") return "Sobre Mim";
    if (activePage === "Experiências") return "Experiências";
    if (activePage === "Ferramentas") return "Ferramentas & Utilidades";
    return "";
  };

  return (
    <main className="relative min-h-screen bg-black overflow-hidden select-none">
      <FlashlightCursor />
      
      <div className="fixed inset-0 z-0 opacity-40">
        <LightRays
          raysOrigin="top-center"
          raysColor="#ffffff"
          raysSpeed={0.6}
          lightSpread={1.2}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.4}
        />
      </div>

      <motion.header
        animate={{
          height: (activePage || isScrolled) ? "4rem" : "100vh",
          backgroundColor: (activePage || isScrolled) ? "rgba(0,0,0,0.85)" : "rgba(0,0,0,0)",
          borderBottomColor: (activePage || isScrolled) ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0)",
        }}
        className={`fixed top-0 inset-x-0 z-50 flex items-center transition-colors ${(activePage || isScrolled) ? 'backdrop-blur-md border-b pointer-events-auto' : 'pointer-events-none sticky-header'}`}
      >
        <div className={`w-full max-w-[1200px] mx-auto px-4 md:px-6 flex ${activePage ? 'flex-row justify-between items-center h-full' : 'flex-col items-center justify-center gap-8 md:gap-12'}`}>
          <motion.div
            initial={false}
            animate={{
              scale: (activePage || isScrolled) ? 0.35 : 1,
              x: 0,
              y: 0,
            }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className={`cursor-pointer z-50 flex items-center justify-start pointer-events-auto title-container ${!activePage ? 'flashlight-mask' : ''} ${
              (activePage || isScrolled) ? 'w-20 sm:w-32 md:w-auto' : 'w-auto'
            }`}
            onClick={() => setActivePage(null)}
            style={{ transformOrigin: "left center" }}
          >
            <h1 className="text-4xl sm:text-6xl md:text-9xl text-left text-neumorphic m-0 p-0">
              M.Felippe
            </h1>
          </motion.div>

          <motion.nav
            layout
            className="flex gap-2 sm:gap-4 md:gap-8 shrink-0 pointer-events-auto"
          >
            {menuItems
              .filter(item => item !== activePage)
              .map((item) => (
                <span 
                  key={item} 
                  onClick={() => setActivePage(item)}
                  className="menu-item text-xs sm:text-base md:text-xl font-medium tracking-wide text-zinc-500 hover:text-white transition-all duration-300 cursor-pointer"
                >
                  {item}
                </span>
              ))
            }
            <Link
              href="/blog"
              className="menu-item text-xs sm:text-base md:text-xl font-medium tracking-wide text-zinc-500 hover:text-white transition-all duration-300"
            >
              Blog
            </Link>
          </motion.nav>
        </div>
      </motion.header>

      <div className={`relative z-10 ${
        activePage 
          ? activePage === "Ferramentas" && isSubToolActive ? 'pt-16 md:pt-32' : 'pt-24 md:pt-32'
          : 'pt-20'
      } min-h-screen`}>
        <div className="max-w-[1200px] mx-auto px-4 md:px-6">
          <AnimatePresence mode="wait">
            {activePage && (
              <motion.div
                key={activePage}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full"
              >
                {/* Dynamic Section Title */}
                {!isSubToolActive && (
                  <header className="mb-6 md:mb-20">
                    <motion.h2 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-2xl md:text-4xl font-bold text-white tracking-tight flex items-center gap-4"
                    >
                      <span className="w-8 h-px bg-white/20" />
                      {getPageTitle()}
                    </motion.h2>
                  </header>
                )}

                {renderContent()}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {!activePage && (
        <div className="relative z-10 pt-20">
          <div className="max-w-[1200px] mx-auto px-4 md:px-6">
            <LandingPage />
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col items-center gap-4 py-20 border-t border-white/5"
            >
              <button
                onClick={() => setIsContactModalOpen(true)}
                className="text-white hover:text-zinc-300 transition-all text-sm tracking-wider uppercase underline underline-offset-8 decoration-white/30 hover:decoration-white"
              >
                Entrar em Contato
              </button>
              <p className="text-xs text-zinc-800 tracking-widest uppercase flex items-center gap-2">
                © 2026 Portfolio | Design inspirado em <a href="https://macedo.design/" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-600 transition-colors">Rodrigo Macedo</a>
                <span onClick={handleAdminTrigger} className="cursor-pointer opacity-0 hover:opacity-100 transition-opacity ml-1 text-red-500 font-bold select-none">
                  {isAdmin ? "[Admin Ativo]" : "[Admin]"}
                </span>
              </p>
            </motion.div>
          </div>
        </div>
      )}

      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </main>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white">Carregando...</div>}>
      <PortfolioContent />
    </Suspense>
  );
}
