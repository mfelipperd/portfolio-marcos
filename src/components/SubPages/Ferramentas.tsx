"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import ToolsGrid from "./ToolsGrid";
import QRCodeGenerator from "./QRCodeGenerator";
import ResumeBuilder from "./ResumeBuilder/ResumeBuilder";

export default function Ferramentas() {
  const searchParams = useSearchParams();
  
  // Set initial state based on "p" param (direct link) or "tool" param
  const [activeTool, setActiveTool] = useState<string | null>(() => {
    const pParam = searchParams.get("p")?.toLowerCase();
    const toolParam = searchParams.get("tool")?.toLowerCase();
    
    if (pParam === "curriculo" || pParam === "resume" || toolParam === "resume" || toolParam === "curriculo") {
      return "resume";
    }
    if (pParam === "qrcode" || toolParam === "qrcode") {
      return "qrcode";
    }
    return null;
  });

  // Sync tool param with URL when activeTool changes, or keep p parameter direct
  useEffect(() => {
    const url = new URL(window.location.href);
    const pParam = url.searchParams.get("p")?.toLowerCase();
    
    if (activeTool) {
      // If we got here via ?p=curriculo or ?p=resume or ?p=qrcode, keep it as is
      if (activeTool === "resume" && (pParam === "curriculo" || pParam === "resume")) {
        // Keep p param
      } else if (activeTool === "qrcode" && pParam === "qrcode") {
        // Keep p param
      } else {
        url.searchParams.set("tool", activeTool);
      }
    } else {
      // If user navigated back, reset direct p to "ferramentas" and remove tool
      if (pParam === "curriculo" || pParam === "resume" || pParam === "qrcode") {
        url.searchParams.set("p", "ferramentas");
      }
      url.searchParams.delete("tool");
    }
    window.history.replaceState({}, "", url.toString());
  }, [activeTool]);

  const renderTool = () => {
    switch (activeTool) {
      case "qrcode":
        return <QRCodeGenerator onBack={() => setActiveTool(null)} />;
      case "resume":
        return <ResumeBuilder onBack={() => setActiveTool(null)} />;
      default:
        return <ToolsGrid onSelectTool={(toolId) => setActiveTool(toolId)} />;
    }
  };

  return (
    <div className="w-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTool || "grid"}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderTool()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
