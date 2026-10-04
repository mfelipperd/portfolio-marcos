"use client";

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
  if (encerrada(dados)) return { texto: `Apuração encerrada em Belém${hora ? `, com dados do TSE ${hora}` : ""}.`, falha: false };
  return { texto: `${hora ? `Dados do TSE ${hora}. ` : ""}A página lê de novo a cada minuto.`, falha: false };
}

export function PainelAoVivo({ inicial }: { inicial: Apuracao }) {
  const { dados, falhou, lendo, atualizar, pedirCompleto } = useApuracao(inicial);
  const { texto, falha } = aviso(dados, falhou);

  return (
    <>
      <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2.5">
        <p role="status" className={`m-0 text-sm ${falha ? "font-semibold text-[#F08268]" : "text-zinc-400"}`}>
          {texto}
        </p>
        <button
          type="button"
          onClick={() => void atualizar()}
          disabled={lendo}
          className="rounded-full border-[1.5px] border-white px-3.5 py-2 text-sm font-semibold hover:bg-white hover:text-black disabled:cursor-default disabled:opacity-45 disabled:hover:bg-transparent disabled:hover:text-white"
        >
          Atualizar agora
        </button>
      </div>

      <p data-geo="resumo" className="mt-6 max-w-3xl text-base leading-relaxed text-zinc-200">
        {resumoGeral(dados)} {AVISO_ESCOPO}
      </p>

      <nav
        className="sticky top-0 z-10 -mx-4 mt-8 border-b border-white/10 bg-black/90 backdrop-blur md:-mx-6"
        aria-label="Cargos"
      >
        <ul className="m-0 flex list-none gap-6 overflow-x-auto px-4 md:px-6 [scrollbar-width:none]">
          {CARGOS.map((c) => (
            <li key={c.cd}>
              <a href={`#${c.id}`} className="block whitespace-nowrap py-3.5 text-[0.95rem] font-semibold text-white no-underline hover:underline hover:decoration-2 hover:underline-offset-[0.3em]">
                {c.nome}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,20rem),1fr))] items-start gap-x-11 gap-y-12 pb-12 pt-8">
        {CARGOS.map((def) => (
          <CargoSecao key={def.cd} def={def} cargo={dados.cargos.find((c) => c.cd === def.cd)} aoPedirCompleto={pedirCompleto} />
        ))}
      </div>
    </>
  );
}
