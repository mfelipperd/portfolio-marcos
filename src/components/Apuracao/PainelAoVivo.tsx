"use client";

import { useEffect, useState } from "react";
import { CARGOS } from "@/lib/apuracao/cargos";
import { useApuracao } from "@/hooks/useApuracao";
import { AVISO_ESCOPO, encerrada, maisRecente, quando, resumoGeral } from "@/lib/apuracao/textos";
import { cargoOk, type Apuracao } from "@/lib/apuracao/tipos";
import { CargoSecao } from "./CargoSecao";

function aviso(dados: Apuracao, falhou: boolean) {
  const bons = dados.cargos.filter(cargoOk);
  const t = maisRecente(dados);
  const hora = quando(t);

  if (bons.length === 0) return { texto: "Não deu para ler os dados do TSE agora. Nova leitura em 1 minuto.", falha: true };
  if (falhou) return { texto: `Não deu para ler parte dos dados do TSE agora.${hora ? ` Na tela, os mais recentes são de ${hora.replace("às ", "")}.` : ""}`, falha: true };
  if (encerrada(dados)) return { texto: `Apuração encerrada${hora ? `, com dados do TSE ${hora}` : ""}.`, falha: false };
  return { texto: `${hora ? `Dados do TSE ${hora}. ` : ""}A página lê de novo a cada minuto.`, falha: false };
}

export function PainelAoVivo({ inicial }: { inicial: Apuracao }) {
  const { dados, falhou, lendo, atualizar, pedirCompleto } = useApuracao(inicial);
  const { texto, falha } = aviso(dados, falhou);
  const fim = encerrada(dados);
  const [ativo, setAtivo] = useState<string>(CARGOS[0].id);

  // Destaca no menu o cargo que está na tela.
  useEffect(() => {
    const secoes = CARGOS.map((c) => document.getElementById(c.id)).filter((el): el is HTMLElement => !!el);
    const obs = new IntersectionObserver(
      (entradas) => {
        const visivel = entradas.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visivel) setAtivo(visivel.target.id);
      },
      { rootMargin: "-130px 0px -55% 0px" }
    );
    secoes.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-3">
        <p
          role="status"
          className={`m-0 inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm ${
            falha ? "border-[#F08268]/50 font-semibold text-[#F08268]" : "border-white/15 text-zinc-300"
          }`}
        >
          <span aria-hidden="true" className="relative flex h-2 w-2">
            {!fim && !falha && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5CC08A] opacity-75 motion-reduce:animate-none" />}
            <span className={`relative inline-flex h-2 w-2 rounded-full ${falha ? "bg-[#F08268]" : fim ? "bg-zinc-500" : "bg-[#5CC08A]"}`} />
          </span>
          {texto}
        </p>
        <button
          type="button"
          onClick={() => void atualizar()}
          disabled={lendo}
          className="rounded-full border-[1.5px] border-white px-4 py-2 text-sm font-semibold transition-colors hover:bg-white hover:text-black disabled:cursor-default disabled:opacity-45 disabled:hover:bg-transparent disabled:hover:text-white"
        >
          {lendo ? "Atualizando…" : "Atualizar agora"}
        </button>
      </div>

      <p data-geo="resumo" className="mt-6 max-w-3xl text-base leading-relaxed text-zinc-200">
        {resumoGeral(dados)}
      </p>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-zinc-500">{AVISO_ESCOPO}</p>

      <nav
        className="sticky top-16 z-30 -mx-4 mt-8 border-b border-white/10 bg-black/80 backdrop-blur-md md:-mx-6"
        aria-label="Cargos"
      >
        <ul className="m-0 flex list-none gap-1 overflow-x-auto px-3 md:px-5 [scrollbar-width:none]">
          {CARGOS.map((c) => (
            <li key={c.cd}>
              <a
                href={`#${c.id}`}
                aria-current={ativo === c.id ? "true" : undefined}
                className={`block whitespace-nowrap border-b-2 px-3 py-3.5 text-[0.95rem] font-semibold no-underline transition-colors ${
                  ativo === c.id ? "border-[#EDAE00] text-white" : "border-transparent text-zinc-400 hover:text-white"
                }`}
              >
                {c.nome}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,21rem),1fr))] items-start gap-5 pb-12 pt-6 md:gap-6">
        {CARGOS.map((def) => (
          <CargoSecao key={def.cd} def={def} cargo={dados.cargos.find((c) => c.cd === def.cd)} aoPedirCompleto={pedirCompleto} />
        ))}
      </div>
    </>
  );
}
