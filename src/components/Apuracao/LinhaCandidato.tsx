import { memo } from "react";
import { fInt, fPct } from "@/lib/apuracao/formato";
import type { Candidato } from "@/lib/apuracao/tipos";

interface Props {
  cand: Candidato;
  pos: number;
  largura: number; // 0 a 100
}

export const LinhaCandidato = memo(function LinhaCandidato({ cand, pos, largura }: Props) {
  const temSituacao = cand.situacao !== "" && cand.situacao !== "Não eleito";
  const temDestinacao = cand.destinacao !== "" && cand.destinacao !== "Válido";

  return (
    <li className="grid grid-cols-[2.2ch_minmax(0,1fr)_auto] items-start gap-x-3 border-t border-white/10 py-3">
      <span className="pt-0.5 text-right text-sm tabular-nums text-zinc-500">{pos}</span>
      <div>
        <span className="block text-[1.05rem] font-bold leading-tight [overflow-wrap:anywhere]">{cand.nome}</span>
        <span className="mt-0.5 block text-[0.8125rem] text-zinc-400">
          {cand.partido}, nº {cand.n}
        </span>
        {temSituacao && (
          <span
            className={`mt-1 inline-block rounded-full border-[1.5px] px-2 text-xs font-bold ${
              /^eleit/i.test(cand.situacao) ? "border-[#5CC08A] text-[#5CC08A]" : "border-white/70 text-white"
            }`}
          >
            {cand.situacao}
          </span>
        )}
        {temDestinacao && (
          <span className="ml-1 mt-1 inline-block rounded-full border-[1.5px] border-[#F08268] px-2 text-xs font-bold text-[#F08268]">
            Voto {cand.destinacao.toLowerCase()}
          </span>
        )}
      </div>
      <div className="whitespace-nowrap text-right">
        <span className="block text-[1.1875rem] font-extrabold tabular-nums leading-tight">{fPct(cand.pct)}</span>
        <span className="mt-0.5 block text-[0.8125rem] tabular-nums text-zinc-400">
          {fInt(cand.votos)} {cand.votos === 1 ? "voto" : "votos"}
        </span>
      </div>
      <div className="col-[2/-1] mt-2 h-1.5 bg-white/10" aria-hidden="true">
        <i className="block h-full bg-[#B88AD0] transition-[width] duration-500 ease-out motion-reduce:transition-none" style={{ width: `${largura}%` }} />
      </div>
    </li>
  );
});
