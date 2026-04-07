"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ToolsGrid from "./ToolsGrid";
import QRCodeGenerator from "./QRCodeGenerator";

export default function Ferramentas() {
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const renderTool = () => {
    switch (activeTool) {
      case "qrcode":
        return <QRCodeGenerator onBack={() => setActiveTool(null)} />;
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
