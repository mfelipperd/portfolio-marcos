"use client";

import { useEffect } from "react";

export default function FlashlightCursor() {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Use requestAnimationFrame for smoother updates
      requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--flashlight-x", `${e.clientX}px`);
        document.documentElement.style.setProperty("--flashlight-y", `${e.clientY}px`);
      });
    };


    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return null;
}

