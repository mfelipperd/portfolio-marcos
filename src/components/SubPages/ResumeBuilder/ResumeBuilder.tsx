"use client";

import React, { useState, useRef } from "react";
import ResumeForm from "./ResumeForm";
import ResumePreview from "./ResumePreview";
import { ResumeData, initialResumeData } from "./types";
import { FaFilePdf, FaArrowLeft, FaSearchPlus, FaTimes, FaExclamationTriangle } from "react-icons/fa";
import { saveAs } from "file-saver";

interface ResumeBuilderProps {
  onBack: () => void;
}

export default function ResumeBuilder({ onBack }: ResumeBuilderProps) {
  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [isExporting, setIsExporting] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
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
      saveAs(blob, 'meu_curriculo.pdf');
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
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/10 shrink-0">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors"
        >
          <FaArrowLeft /> Voltar
        </button>
        <h2 className="text-2xl font-bold text-white tracking-wider uppercase">Criador de Currículos</h2>
        <div className="flex gap-4">
          <button
            onClick={exportPDF}
            disabled={isExporting}
            className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-colors text-sm font-medium disabled:opacity-50"
          >
            <FaFilePdf /> PDF
          </button>
        </div>
      </div>

      {/* Warning banner */}
      <div className="bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs px-4 py-3 rounded-lg flex items-center gap-3 shrink-0 mb-4 font-medium">
        <FaExclamationTriangle className="text-amber-500 shrink-0" size={16} />
        <p className="flex-1">
          <strong>Atenção:</strong> Revise com cuidado todas as informações preenchidas antes de gerar o arquivo final (PDF). IAs e buscas automáticas podem conter imprecisões ou erros de formatação.
        </p>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col lg:flex-row gap-8 flex-1 overflow-hidden">
        {/* Left Side: Form */}
        <div className="w-full lg:w-1/2 flex flex-col overflow-hidden">
          <div className="bg-zinc-900/20 border border-white/10 rounded-lg p-6 flex-1 overflow-y-auto custom-scrollbar">
            <ResumeForm data={resumeData} onChange={setResumeData} />
          </div>
        </div>

        {/* Right Side: Live Preview (Thumbnail) */}
        <div className="w-full lg:w-1/2 bg-zinc-800 rounded-lg flex items-center justify-center p-8 relative overflow-hidden group">
          <button 
            onClick={() => setIsPreviewModalOpen(true)}
            className="absolute inset-0 z-10 bg-black/0 hover:bg-black/20 transition-colors flex items-center justify-center outline-none"
            aria-label="Ampliar visualização"
          >
            <div className="opacity-0 group-hover:opacity-100 bg-black/70 text-white px-6 py-3 rounded-full flex items-center gap-2 backdrop-blur-sm transition-all transform scale-90 group-hover:scale-100 font-bold shadow-2xl border border-white/20">
              <FaSearchPlus /> Ampliar Visualização
            </div>
          </button>

          {/* Scaled down preview to fit the container without scrolling */}
          <div className="scale-[0.35] sm:scale-[0.4] md:scale-[0.45] origin-center pointer-events-none transition-transform shadow-2xl">
            <ResumePreview data={resumeData} />
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
            className="scale-[0.7] sm:scale-90 md:scale-100 origin-top bg-white shadow-2xl mt-12 mb-12"
          >
             <ResumePreview data={resumeData} />
          </div>
        </div>
      )}
    </div>
  );
}
