"use client";

import { useState, useRef } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { motion } from "framer-motion";
import { FaDownload, FaQrcode, FaLink, FaImage, FaArrowLeft } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi";

interface QRCodeGeneratorProps {
  onBack: () => void;
}

export default function QRCodeGenerator({ onBack }: QRCodeGeneratorProps) {
  const [text, setText] = useState("https://marcosfelippe.dev");
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState("#ffffff");
  const [bgColor, setBgColor] = useState("#000000");
  const qrRef = useRef<HTMLDivElement>(null);

  const downloadQRCode = (format: "png" | "jpeg") => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (canvas) {
      const url = canvas.toDataURL(`image/${format}`, 1.0);
      const link = document.createElement("a");
      link.href = url;
      link.download = `qrcode-${Date.now()}.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <motion.button
        onClick={onBack}
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors uppercase text-[10px] tracking-[0.2em] font-bold group"
      >
        <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        Voltar para Ferramentas
      </motion.button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-start">
      {/* Settings Side */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-8"
      >
        <div className="space-y-4">
          <label className="text-zinc-500 text-sm uppercase tracking-widest font-medium flex items-center gap-2">
            <FaLink className="text-xs" /> Conteúdo do QR Code
          </label>
          <div className="relative group">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Digite uma URL ou texto..."
              className="w-full bg-zinc-900/50 border border-white/10 rounded-xl py-4 px-6 text-white placeholder:text-zinc-700 outline-none focus:border-white/30 focus:bg-zinc-900 transition-all"
            />
            <div className="absolute inset-0 rounded-xl bg-white/5 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-4">
            <label className="text-zinc-500 text-sm uppercase tracking-widest font-medium">Tamanho (px)</label>
            <input
              type="range"
              min="128"
              max="512"
              step="32"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-white"
            />
            <div className="text-right text-xs text-zinc-600">{size}px</div>
          </div>

          <div className="space-y-4">
            <label className="text-zinc-500 text-sm uppercase tracking-widest font-medium flex items-center gap-2">
               Cores
            </label>
            <div className="flex gap-4">
              <div className="flex flex-col gap-2 flex-1">
                <span className="text-[10px] text-zinc-600 uppercase">Fundo</span>
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-full h-10 bg-transparent border-none rounded-lg cursor-pointer"
                />
              </div>
              <div className="flex flex-col gap-2 flex-1">
                <span className="text-[10px] text-zinc-600 uppercase">QR</span>
                <input
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-full h-10 bg-transparent border-none rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-white/5 space-y-4">
          <label className="text-zinc-500 text-sm uppercase tracking-widest font-medium flex items-center gap-2">
            <FaDownload className="text-xs" /> Exportar Arquivo
          </label>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => downloadQRCode("png")}
              className="flex-1 min-w-[140px] bg-white text-black py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-zinc-200 transition-all group"
            >
              <FaImage className="group-hover:scale-110 transition-transform" />
              Download PNG
            </button>
            <button
              onClick={() => downloadQRCode("jpeg")}
              className="flex-1 min-w-[140px] bg-zinc-900 border border-white/10 text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-zinc-800 transition-all group"
            >
              <FaImage className="group-hover:scale-110 transition-transform" />
              Download JPEG
            </button>
          </div>
        </div>
      </motion.div>

      {/* Preview Side */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative aspect-square max-w-[400px] mx-auto w-full bg-zinc-950 rounded-3xl border border-white/5 flex items-center justify-center overflow-hidden shadow-2xl"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" />
        </div>
        
        <div 
          ref={qrRef} 
          className="p-8 bg-zinc-900/30 rounded-2xl border border-white/10 backdrop-blur-sm z-10"
          style={{ boxShadow: `0 0 40px ${fgColor}10` }}
        >
          <QRCodeCanvas
            value={text}
            size={size}
            level={"H"}
            includeMargin={true}
            bgColor={bgColor}
            fgColor={fgColor}
          />
        </div>

        {/* Floating elements */}
        <div className="absolute bottom-6 left-6 flex items-center gap-2 text-[10px] text-zinc-600 tracking-[0.2em] uppercase">
          <FaQrcode /> Preview em Tempo Real
        </div>
        <div className="absolute top-6 right-6 text-white/20">
          <HiOutlineSparkles size={24} />
        </div>
      </motion.div>
      </div>
    </div>
  );
}
