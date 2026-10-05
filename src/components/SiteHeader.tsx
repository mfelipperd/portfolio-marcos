"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

// Mesmos itens do menu da home. Os quatro primeiros abrem a seção correspondente da home (?p=...).
const ITENS = [
  { rotulo: "Portfolio", href: "/?p=portfolio" },
  { rotulo: "Sobre", href: "/?p=sobre" },
  { rotulo: "Experiências", href: `/?p=${encodeURIComponent("experiências")}` },
  { rotulo: "Ferramentas", href: "/?p=ferramentas" },
  { rotulo: "Blog", href: "/blog" },
  { rotulo: "Apuração 2026", href: "/apuracao-para" },
];

/** Cabeçalho do projeto para as páginas internas: logo, menu em telas grandes e hambúrguer no celular. */
export default function SiteHeader({ atual }: { atual: string }) {
  const [aberto, setAberto] = useState(false);

  useEffect(() => {
    if (!aberto) return;
    const aoTecla = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    document.addEventListener("keydown", aoTecla);
    return () => document.removeEventListener("keydown", aoTecla);
  }, [aberto]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-16 border-b border-white/10 bg-black/85 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-4 md:px-6">
        <Link href="/" className="text-neumorphic text-2xl leading-none no-underline md:text-3xl" onClick={() => setAberto(false)}>
          M.Felippe
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-5 xl:gap-8 lg:flex">
          {ITENS.map((item) => (
            <Link
              key={item.rotulo}
              href={item.href}
              aria-current={item.rotulo === atual ? "page" : undefined}
              className={`menu-item text-base font-medium tracking-wide xl:text-lg ${item.rotulo === atual ? "!text-white" : ""}`}
            >
              {item.rotulo}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="-mr-2 p-2 text-white lg:hidden"
          aria-label={aberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={aberto}
          aria-controls="menu-movel"
          onClick={() => setAberto((v) => !v)}
        >
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            {aberto ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
          </svg>
        </button>
      </div>

      {aberto && (
        <nav id="menu-movel" aria-label="Menu" className="absolute inset-x-0 top-16 border-b border-white/10 bg-black shadow-2xl shadow-black lg:hidden">
          <ul className="m-0 list-none p-2">
            {ITENS.map((item) => (
              <li key={item.rotulo}>
                <Link
                  href={item.href}
                  aria-current={item.rotulo === atual ? "page" : undefined}
                  onClick={() => setAberto(false)}
                  className={`block px-4 py-3.5 text-lg font-medium ${item.rotulo === atual ? "text-white" : "text-zinc-400"}`}
                >
                  {item.rotulo}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
