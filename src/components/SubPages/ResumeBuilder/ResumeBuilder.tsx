"use client";

import React, { useState, useRef, useEffect } from "react";
import ResumeForm from "./ResumeForm";
import ResumePreview from "./ResumePreview";
import { ResumeData, initialResumeData } from "./types";
import { FaFilePdf, FaArrowLeft, FaSearchPlus, FaTimes, FaExclamationTriangle } from "react-icons/fa";
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
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [showWarningBanner, setShowWarningBanner] = useState(true);
  const previewRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const saved = localStorage.getItem("portfolio_resume_data");
    if (saved) {
      try {
        setResumeData(JSON.parse(saved));
      } catch (e) {
        console.error("Erro ao carregar dados salvos do currículo:", e);
      }
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem("portfolio_resume_data", JSON.stringify(resumeData));
  }, [resumeData]);

  const exportPDF = async () => {
    setIsExporting(true);
    try {
      // Call API route to generate and protect PDF with password on server side
      const response = await fetch("/api/encrypt?type=pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(resumeData),
      });

      if (!response.ok) {
        throw new Error(await response.text());
      }

      const encryptedBuffer = await response.arrayBuffer();
      const blob = new Blob([encryptedBuffer], { type: "application/pdf" });
      const fileURL = URL.createObjectURL(blob);
      const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

      if (isMobile) {
        // Em dispositivos móveis, tentamos abrir em uma nova aba para visualização e salvamento nativo.
        // Se o bloqueador de popups impedir, abrimos na aba atual.
        const newTab = window.open(fileURL, "_blank");
        if (!newTab) {
          window.location.href = fileURL;
        }
      } else {
        // No desktop, fazemos o download direto do arquivo
        const link = document.createElement("a");
        link.href = fileURL;
        link.download = "meu_curriculo.pdf";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      alert("Ocorreu um erro ao gerar e proteger o PDF.");
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="w-full flex flex-col h-[calc(100vh-120px)] relative bg-black">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 shrink-0 gap-2">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-zinc-400 hover:text-white transition-colors text-xs sm:text-sm font-medium shrink-0"
        >
          <FaArrowLeft /> Voltar
        </button>
        <h2 className="text-sm sm:text-2xl font-bold text-white tracking-wider uppercase truncate max-w-[130px] min-[400px]:max-w-[200px] sm:max-w-none text-center">
          Criador de Currículos
        </h2>
        <div className="flex shrink-0">
          <button
            onClick={exportPDF}
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
      <div className="flex lg:hidden border border-white/10 rounded-lg p-1 mb-4 bg-zinc-900/50 shrink-0">
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
          <div className="bg-zinc-900/20 border border-white/10 rounded-lg p-6 flex-1 overflow-y-auto custom-scrollbar">
            <ResumeForm data={resumeData} onChange={setResumeData} />
          </div>
        </div>

        {/* Right Side: Live Preview */}
        <div className={`w-full lg:w-1/2 bg-zinc-800 rounded-lg flex flex-col items-center justify-start p-4 sm:p-8 relative overflow-y-auto custom-scrollbar ${activeTab === "preview" ? "flex flex-1" : "hidden lg:flex"}`}>
          {/* Info bar on mobile */}
          <div className="text-zinc-400 text-xs mb-4 flex items-center justify-between w-full lg:hidden px-2 shrink-0">
            <span>Role para visualizar o currículo inteiro</span>
            <button 
              onClick={() => setIsPreviewModalOpen(true)}
              className="bg-white/10 text-white px-3 py-1.5 rounded-md flex items-center gap-1.5 font-bold hover:bg-white/20 transition-colors"
            >
              <FaSearchPlus size={12} /> Tela Cheia
            </button>
          </div>

          {/* Template Selection */}
          <div className="w-full max-w-full mb-6 bg-zinc-900/50 border border-white/10 rounded-lg p-3 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0 relative z-20">
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
    </div>
  );
}
