"use client";

import { useEffect } from "react";

export default function FlashlightCursor() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      requestAnimationFrame(() => {
        const target = document.querySelector('.flashlight-mask') as HTMLElement;
        if (target) {
          const rect = target.getBoundingClientRect();
          // Set relative coordinates on the target element
          target.style.setProperty("--flashlight-x", `${e.clientX - rect.left}px`);
          target.style.setProperty("--flashlight-y", `${e.clientY - rect.top}px`);
        } else {
          // Fallback to absolute for global use
          document.documentElement.style.setProperty("--flashlight-x", `${e.clientX}px`);
          document.documentElement.style.setProperty("--flashlight-y", `${e.clientY}px`);
        }
      });
    };



    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return null;
}

