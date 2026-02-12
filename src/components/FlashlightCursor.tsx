"use client";

import { useEffect } from "react";

export default function FlashlightCursor() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const titleElement = document.querySelector(".title-container");
      if (titleElement) {
        const rect = titleElement.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        document.documentElement.style.setProperty("--flashlight-x", `${x}px`);
        document.documentElement.style.setProperty("--flashlight-y", `${y}px`);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return null; // Apenas gerencia estado global de CSS
}
