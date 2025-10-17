"use client";

import { ReactNode } from "react";
import { useScrollReveal } from "../hooks/useScrollReveal";

interface ScrollRevealProps {
  children: ReactNode;
  animation?: "fadeInUp" | "fadeInDown" | "fadeInLeft" | "fadeInRight" | "scaleIn" | "rotateIn";
  delay?: number;
  className?: string;
}

/**
 * Componente que adiciona animações de revelação baseadas no scroll
 */
export default function ScrollReveal({
  children,
  animation = "fadeInUp",
  delay = 0,
  className = "",
}: ScrollRevealProps) {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1, triggerOnce: true });

  const animationClass = isVisible ? `animate-${animation}` : "opacity-0";
  const delayClass = delay > 0 ? `delay-${delay}` : "";

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`${animationClass} ${delayClass} ${className}`}
    >
      {children}
    </div>
  );
}

