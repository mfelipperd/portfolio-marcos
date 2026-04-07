"use client";

import { motion } from "framer-motion";
import { FaQrcode, FaTools } from "react-icons/fa";

interface Tool {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
}

const tools: Tool[] = [
  {
    id: "qrcode",
    name: "Gerador de QR Code",
    description: "Crie e exporte QR Codes personalizados em PNG ou JPEG.",
    icon: <FaQrcode className="w-12 h-12" />,
  },
  // Mais ferramentas podem ser adicionadas aqui
];

interface ToolsGridProps {
  onSelectTool: (toolId: string) => void;
}

export default function ToolsGrid({ onSelectTool }: ToolsGridProps) {
  return (
    <div className="w-full py-12 md:py-20 text-white">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
      >
        {tools.map((tool, index) => (
          <motion.button
            key={tool.id}
            onClick={() => onSelectTool(tool.id)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative aspect-video flex items-center justify-center bg-zinc-900/10 border border-white/5 hover:border-white/20 transition-all duration-500 rounded-sm overflow-hidden text-left w-full"
          >
            {/* Background Hover Effect */}
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 w-full h-full p-8 flex flex-col items-center justify-center gap-4">
              <div className="text-zinc-500 group-hover:text-white transition-all duration-500 group-hover:scale-110">
                {tool.icon}
              </div>
              
              <div className="text-center">
                <span className="block text-sm font-bold uppercase tracking-[0.2em] text-white mb-2">
                  {tool.name}
                </span>
                <p className="text-[10px] text-zinc-500 group-hover:text-zinc-400 transition-colors uppercase tracking-widest max-w-[200px] mx-auto line-clamp-2">
                  {tool.description}
                </p>
              </div>
            </div>

            {/* Subtle Action Indicator */}
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <FaTools className="text-white text-xs" />
            </div>
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}
