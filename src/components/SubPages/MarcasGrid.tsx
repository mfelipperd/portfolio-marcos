"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Brand {
  name: string;
  logo: string;
  url: string;
  isSvg?: boolean;
  svgPath?: React.ReactNode;
}

const brands: Brand[] = [
  {
    name: "Expo Multimix",
    logo: "https://www.expomultimix.com.br/_next/image?url=%2Fassets%2Flogo%20EMM_Prancheta%201.png&w=3840&q=75",
    url: "https://www.expomultimix.com.br",
  },
  {
    name: "Home IDOC",
    logo: "https://homeidoc.vercel.app/_next/image?url=%2Fimages%2Flogo%20home%20idoc.png&w=384&q=75",
    url: "https://homeidoc.vercel.app",
  },
  {
    name: "Visual Laser",
    logo: "https://visuallaser.med.br/_next/image?url=%2Flogo-visual-branca.png&w=384&q=75",
    url: "https://visuallaser.med.br",
  },
  {
    name: "UMZ Visitors",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTH6W6SrWYdcFvHr8bZACcEg3swkioidWunUw&s",
    url: "https://umz-visitors.vercel.app",
  },
  {
    name: "Oficina d'Ideias",
    logo: "", // Using SVG source
    url: "https://oficina-di-deias.vercel.app",
    isSvg: true,
    svgPath: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-12 h-12"
      >
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
        <path d="M9 18h6" />
        <path d="M10 22h4" />
      </svg>
    ),
  },
  {
    name: "DO Brasil Group",
    logo: "https://www.dobrasilgroup.com.br/images/DOBRASIL%20-%20amarela%20-%20fundo%20azul%20e%20verde.png",
    url: "https://www.dobrasilgroup.com.br/doce-de-leite",
  },
];


export default function MarcasGrid() {
  return (
    <div className="w-full py-12 md:py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-12"
      >
        {brands.map((brand, index) => (
          <motion.a
            key={brand.name}
            href={brand.url}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative aspect-video flex items-center justify-center bg-zinc-900/10 border border-white/5 hover:border-white/20 transition-all duration-500 rounded-sm overflow-hidden"
          >
            {/* Background Hover Effect */}
            <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative z-10 w-full h-full p-8 flex flex-col items-center justify-center gap-4">
              {brand.isSvg ? (
                <div className="text-white fill-none transition-all duration-500 group-hover:scale-110">
                  {brand.svgPath}
                </div>
              ) : (
                <div className="relative w-full h-full max-h-[60px] filter grayscale brightness-200 contrast-125 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    fill
                    className="object-contain opacity-50 group-hover:opacity-100 transition-opacity duration-500"
                    unoptimized // Optimized URLs from the sites might have their own loaders
                  />
                </div>
              )}
              
              <span className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 group-hover:text-white transition-colors duration-500">
                {brand.name}
              </span>
            </div>

            {/* Subtle Link Indicator */}
            <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-white"
              >
                <path d="M7 7h10v10" />
                <path d="M7 17L17 7" />
              </svg>
            </div>
          </motion.a>
        ))}
      </motion.div>
    </div>
  );
}
