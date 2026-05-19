"use client";

import React, { useState, useRef, useEffect } from "react";
import ResumeForm from "./ResumeForm";
import ResumePreview from "./ResumePreview";
import { ResumeData, initialResumeData } from "./types";
import { FaFilePdf, FaArrowLeft, FaSearchPlus, FaTimes, FaExclamationTriangle, FaWhatsapp } from "react-icons/fa";
import { saveAs } from "file-saver";

interface ResumeBuilderProps {
  onBack: () => void;
}

interface ResponsivePreviewWrapperProps {
  children: React.ReactNode;
}

function ResponsivePreviewWrapper({ children }: ResponsivePreviewWrapperProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.clientWidth;
      const targetWidth = 794; // Base A4 width (~210mm)
      const newScale = Math.min(containerWidth / targetWidth, 1);
      setScale(newScale);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined" && containerRef.current) {
      resizeObserver = new ResizeObserver(() => {
        handleResize();
      });
      resizeObserver.observe(containerRef.current);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="w-full flex items-start justify-center overflow-hidden"
      style={{ height: `${1123 * scale}px` }}
    >
      <div 
        style={{ 
          transform: `scale(${scale})`, 
          transformOrigin: "top center",
        }}
        className="shrink-0"
      >
        {children}
      </div>
    </div>
  );
}

export default function ResumeBuilder({ onBack }: ResumeBuilderProps) {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [isExporting, setIsExporting] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("preview");
  const [showWarningBanner, setShowWarningBanner] = useState(true);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [whatsappPhone, setWhatsappPhone] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

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

  const formatPhone = (val: string) => {
    const raw = val.replace(/\D/g, "");
    if (raw.length <= 2) return raw;
    if (raw.length <= 6) return `(${raw.slice(0, 2)}) ${raw.slice(2)}`;
    if (raw.length <= 10) return `(${raw.slice(0, 2)}) ${raw.slice(2, 6)}-${raw.slice(6)}`;
    return `(${raw.slice(0, 2)}) ${raw.slice(2, 7)}-${raw.slice(7, 11)}`;
  };

  React.useEffect(() => {
    // 1. Try to load from URL import param
    const urlParams = new URLSearchParams(window.location.search);
    const importParam = urlParams.get("import");
    
    if (importParam) {
      try {
        // Reconstruct standard Base64 string from URL-safe Base64
        let base64 = importParam.replace(/-/g, '+').replace(/_/g, '/');
        while (base64.length % 4) {
          base64 += '=';
        }
        
        // Decode base64 to UTF-8 string safely
        const jsonStr = decodeURIComponent(
          atob(base64)
            .split('')
            .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
        
        const importedData = JSON.parse(jsonStr);
        if (importedData && typeof importedData === "object") {
          // Update data and save to localStorage
          setResumeData(importedData);
          localStorage.setItem("portfolio_resume_data", jsonStr);
          
          // Clear import param from URL without refreshing the page
          const newUrl = new URL(window.location.href);
          newUrl.searchParams.delete("import");
          window.history.replaceState({}, "", newUrl.toString());
          return; // Skip loading from localStorage
        }
      } catch (e) {
        console.error("Erro ao importar dados da URL:", e);
      }
    }

    // 2. Fallback to localStorage if no import param
    const saved = localStorage.getItem("portfolio_resume_data");
    if (saved) {
      try {
        setResumeData(JSON.parse(saved));
      } catch (e) {
        console.error("Erro ao carregar dados salvos do currículo:", e);
      }
    }
  }, []);

  const shareWhatsApp = () => {
    try {
      // 1. Convert resumeData to a clean JSON string
      const jsonStr = JSON.stringify(resumeData);
      
      // 2. Encode to Base64 (supporting special characters correctly via encodeURIComponent)
      const base64 = btoa(encodeURIComponent(jsonStr).replace(/%([0-9A-F]{2})/g, (match, p1) => {
        return String.fromCharCode(parseInt(p1, 16));
      }));
      
      // Make it URL-safe base64
      const safeBase64 = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
      
      // 3. Generate link
      const origin = window.location.origin;
      const shareUrl = `${origin}/?p=curriculo&import=${safeBase64}`;
      
      // 4. Create WhatsApp share URL
      const text = `Olá! Criei meu currículo no Portfólio de Marcos. Você pode visualizar ou editar meus dados acessando este link: ${shareUrl}`;
      const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
      
      // 5. Open WhatsApp
      window.open(whatsappUrl, "_blank");
    } catch (error) {
      console.error("Erro ao gerar link de compartilhamento:", error);
      alert("Não foi possível gerar o link de compartilhamento.");
    }
  };

  React.useEffect(() => {
    localStorage.setItem("portfolio_resume_data", JSON.stringify(resumeData));
  }, [resumeData]);

  const exportPDF = async () => {
    setIsExporting(true);
    try {
      // Create a hidden form and submit it to trigger a native download flow.
      // This allows mobile browsers (like iOS Safari) to handle the response
      // with native "Download / Save File" prompts instead of opening a transient blob page.
      const form = document.createElement("form");
      form.method = "POST";
      
      const adminToken = localStorage.getItem("portfolio_admin_token") || "";
      const actionUrl = adminToken 
        ? `/api/encrypt?type=pdf&token=${encodeURIComponent(adminToken)}`
        : "/api/encrypt?type=pdf";
      
      form.action = actionUrl;
      
      const input = document.createElement("input");
      input.type = "hidden";
      input.name = "data";
      input.value = JSON.stringify(resumeData);
      
      form.appendChild(input);
      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);
      
      // Reset the exporting state after a brief timeout since form download does not trigger reload
      setTimeout(() => {
        setIsExporting(false);
      }, 2000);
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      alert("Ocorreu um erro ao gerar e proteger o PDF.");
      setIsExporting(false);
    }
  };

  return (
    <div className="w-full flex flex-col h-[calc(100vh-100px)] lg:h-[calc(100vh-180px)] relative bg-black">
      {/* Header */}
      <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-white/10 shrink-0 gap-2">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors text-xs sm:text-sm font-medium shrink-0"
        >
          <FaArrowLeft /> Voltar
        </button>
        <h2 
          onClick={handleAdminTrigger}
          className="text-sm sm:text-2xl font-bold text-white tracking-wider uppercase truncate max-w-[110px] min-[380px]:max-w-[160px] md:max-w-none text-center cursor-pointer select-none"
          title="Clique para acessar o Modo Admin"
        >
          Criador de Currículos {isAdmin && <span className="text-red-500 text-[10px] lowercase font-normal ml-1">(admin)</span>}
        </h2>
        <div className="flex shrink-0 items-center">
          <button
            onClick={() => setIsShareModalOpen(true)}
            disabled={isExporting}
            className="flex items-center gap-1.5 bg-red-600 hover:bg-red-700 text-white px-2.5 py-1.5 sm:px-4 sm:py-2 rounded-md transition-colors text-xs sm:text-sm font-medium disabled:opacity-50"
          >
            <FaFilePdf /> PDF
          </button>
        </div>
      </div>

      {/* Warning banner */}
      {showWarningBanner && (
        <div className={`bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs px-4 py-3 rounded-lg items-center gap-3 shrink-0 mb-4 font-medium justify-between ${
          activeTab === "preview" ? "hidden lg:flex" : "flex"
        }`}>
          <div className="flex items-center gap-3 flex-1">
            <FaExclamationTriangle className="text-amber-500 shrink-0" size={16} />
            <p className="flex-1">
              <strong>Atenção:</strong> Revise com cuidado todas as informações preenchidas antes de gerar o arquivo final (PDF). IAs e buscas automáticas podem conter imprecisões ou erros de formatação.
            </p>
          </div>
          <button
            onClick={() => setShowWarningBanner(false)}
            className="text-zinc-400 hover:text-white transition-colors p-1 shrink-0 ml-2"
            title="Fechar aviso"
            aria-label="Fechar aviso"
          >
            <FaTimes size={14} />
          </button>
        </div>
      )}

      {/* Mobile Tab Selector */}
      <div className="flex lg:hidden border border-white/10 rounded-lg p-1 mb-2.5 bg-zinc-900/50 shrink-0">
        <button
          onClick={() => setActiveTab("edit")}
          className={`flex-1 py-2 text-center rounded-md font-medium text-sm transition-all ${
            activeTab === "edit"
              ? "bg-white text-black font-bold shadow-md"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          Editar Currículo
        </button>
        <button
          onClick={() => setActiveTab("preview")}
          className={`flex-1 py-2 text-center rounded-md font-medium text-sm transition-all ${
            activeTab === "preview"
              ? "bg-white text-black font-bold shadow-md"
              : "text-zinc-400 hover:text-white"
          }`}
        >
          Visualizar
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row gap-8 flex-1 overflow-hidden">
        {/* Left Side: Form */}
        <div className={`w-full lg:w-1/2 flex flex-col overflow-hidden ${activeTab === "edit" ? "flex" : "hidden lg:flex"}`}>
          <div className="bg-zinc-900/0 sm:bg-zinc-900/20 border-0 sm:border border-white/10 rounded-none sm:rounded-lg p-0 sm:p-6 flex-1 overflow-y-auto custom-scrollbar">
            <ResumeForm data={resumeData} onChange={setResumeData} />
          </div>
        </div>

        {/* Right Side: Live Preview */}
        <div className={`w-full lg:w-1/2 bg-zinc-800 rounded-lg flex flex-col items-center justify-start p-4 sm:p-8 pb-24 lg:pb-8 relative overflow-y-auto custom-scrollbar ${activeTab === "preview" ? "flex flex-1" : "hidden lg:flex"}`}>
          {/* Info bar on mobile */}
          <div className="text-zinc-400 text-[10px] mb-2 text-center w-full lg:hidden px-2 shrink-0 uppercase tracking-wider opacity-60">
            Arraste para visualizar todo o currículo
          </div>

          {/* Template Selection (Desktop) */}
          <div className="w-full max-w-full mb-6 bg-zinc-900/50 border border-white/10 rounded-lg p-3 hidden lg:flex flex-row items-center justify-between gap-4 shrink-0 relative z-20">
            <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">Modelo:</span>
            <div className="flex gap-2 w-full sm:w-auto">
              {(["minimalist", "modern", "executive"] as const).map((tpl) => (
                <button
                  key={tpl}
                  onClick={() => setResumeData(prev => ({ ...prev, template: tpl }))}
                  className={`flex-1 sm:flex-none px-3 py-1.5 rounded border text-[10px] uppercase tracking-wider transition-all font-semibold ${
                    resumeData.template === tpl
                      ? "bg-white text-black border-white shadow-md font-bold"
                      : "bg-transparent text-zinc-400 border-white/10 hover:border-white/30 hover:text-white"
                  }`}
                >
                  {tpl === "minimalist" ? "Minimalista" : tpl === "modern" ? "Moderno" : "Executivo"}
                </button>
              ))}
            </div>
          </div>

          <button 
            onClick={() => setIsPreviewModalOpen(true)}
            className="absolute inset-0 z-10 bg-black/0 hover:bg-black/20 transition-colors hidden lg:flex items-center justify-center outline-none"
            aria-label="Ampliar visualização"
          >
            <div className="opacity-0 group-hover:opacity-100 bg-black/70 text-white px-6 py-3 rounded-full flex items-center gap-2 backdrop-blur-sm transition-all transform scale-90 group-hover:scale-100 font-bold shadow-2xl border border-white/20">
              <FaSearchPlus /> Ampliar Visualização
            </div>
          </button>

          <div className="w-full max-w-full origin-top transition-transform shadow-2xl">
            <ResponsivePreviewWrapper>
              <ResumePreview data={resumeData} />
            </ResponsivePreviewWrapper>
          </div>

          {/* Floating Action Bar on Mobile: Template Selector + Fullscreen */}
          <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-zinc-900/90 border border-white/15 backdrop-blur-md px-3 py-2 rounded-full shadow-2xl flex items-center gap-3 w-[92%] max-w-[380px]">
            {/* Template options */}
            <div className="flex gap-1.5 flex-1 items-center">
              {(["minimalist", "modern", "executive"] as const).map((tpl) => (
                <button
                  key={tpl}
                  onClick={() => setResumeData(prev => ({ ...prev, template: tpl }))}
                  className={`flex-1 py-2 px-1 rounded-full border text-[9px] uppercase tracking-wider transition-all font-semibold text-center ${
                    resumeData.template === tpl
                      ? "bg-white text-black border-white shadow-md font-bold"
                      : "bg-transparent text-zinc-400 border-white/10 hover:border-white/30"
                  }`}
                >
                  {tpl === "minimalist" ? "Min." : tpl === "modern" ? "Mod." : "Exec."}
                </button>
              ))}
            </div>
            
            {/* Divider */}
            <div className="w-px h-6 bg-white/10 shrink-0" />
            
            {/* Fullscreen Trigger */}
            <button
              onClick={() => setIsPreviewModalOpen(true)}
              className="bg-white/10 text-white p-2 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors shrink-0"
              title="Tela Cheia"
              aria-label="Tela Cheia"
            >
              <FaSearchPlus size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Hidden container strictly for export (actual 1:1 scale) */}
      <div className="absolute -left-[9999px] top-0 overflow-hidden">
        <ResumePreview data={resumeData} previewRef={previewRef} />
      </div>

      {/* Fullscreen Preview Modal */}
      {isPreviewModalOpen && (
        <div 
          onClick={() => setIsPreviewModalOpen(false)}
          className="fixed inset-0 z-9999 bg-black/80 backdrop-blur-sm flex flex-col items-center justify-start overflow-y-auto custom-scrollbar p-4 md:p-12"
        >
          <button 
            onClick={() => setIsPreviewModalOpen(false)}
            className="fixed top-6 right-6 z-10000 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-md transition-colors"
            title="Fechar"
            aria-label="Fechar"
          >
            <FaTimes size={20} />
          </button>
          <div 
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-[850px] mt-12 mb-12 bg-white shadow-2xl"
          >
             <ResponsivePreviewWrapper>
               <ResumePreview data={resumeData} />
             </ResponsivePreviewWrapper>
          </div>
        </div>
      )}
      {/* Export & Share Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="bg-zinc-900 border border-white/10 rounded-2xl p-6 max-w-md w-full shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FaFilePdf className="text-red-500" /> Exportar Currículo
              </h3>
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="text-zinc-500 hover:text-white transition-colors"
                title="Fechar"
                aria-label="Fechar"
              >
                <FaTimes size={18} />
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-zinc-400">
                Você pode gerar o arquivo PDF do seu currículo e opcionalmente enviá-lo como um link interativo direto no WhatsApp do recrutador.
              </p>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wider text-zinc-500 font-bold flex items-center gap-1.5">
                  <FaWhatsapp className="text-emerald-500" /> WhatsApp do Destinatário (DDD + Número)
                </label>
                <input
                  type="text"
                  placeholder="(11) 99999-9999"
                  value={whatsappPhone}
                  onChange={(e) => setWhatsappPhone(formatPhone(e.target.value))}
                  className="w-full bg-zinc-950 border border-white/10 rounded-xl py-3 px-4 text-white outline-none focus:border-white/30 transition-all text-sm"
                />
                <span className="text-[10px] text-zinc-500 block leading-normal">
                  Se informado, abriremos o WhatsApp enviando o link interativo do currículo. O destinatário poderá visualizá-lo e editá-lo diretamente pelo site.
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => {
                  setIsShareModalOpen(false);
                  exportPDF();
                }}
                className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white py-3 rounded-xl text-sm font-bold transition-colors"
              >
                Apenas Baixar PDF
              </button>
              <button
                onClick={() => {
                  const cleanPhone = whatsappPhone.replace(/\D/g, "");
                  if (cleanPhone.length >= 10) {
                    // Send interactive link to WhatsApp
                    const jsonStr = JSON.stringify(resumeData);
                    const base64 = btoa(encodeURIComponent(jsonStr).replace(/%([0-9A-F]{2})/g, (match, p1) => {
                      return String.fromCharCode(parseInt(p1, 16));
                    }));
                    const safeBase64 = base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
                    const origin = window.location.origin;
                    const shareUrl = `${origin}/?p=curriculo&import=${safeBase64}`;
                    const text = `Olá! Segue o link para visualizar e editar meu currículo completo diretamente no site: ${shareUrl}`;
                    const whatsappUrl = `https://api.whatsapp.com/send?phone=55${cleanPhone.replace(/^55/, "")}&text=${encodeURIComponent(text)}`;
                    
                    window.open(whatsappUrl, "_blank");
                    
                    // Proceed with standard PDF export
                    setIsShareModalOpen(false);
                    exportPDF();
                  } else {
                    alert("Por favor, digite um número de WhatsApp válido com DDD.");
                  }
                }}
                disabled={!whatsappPhone}
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:hover:bg-emerald-600 text-white py-3 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2"
              >
                <FaWhatsapp /> Enviar e Baixar PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
