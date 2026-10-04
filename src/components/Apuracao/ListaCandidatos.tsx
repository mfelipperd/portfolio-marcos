import { useMemo } from "react";
import { semAcento } from "@/lib/apuracao/formato";
import type { Candidato } from "@/lib/apuracao/tipos";
import { LinhaCandidato } from "./LinhaCandidato";

interface Props {
  candidatos: Candidato[];
  termo: string;
  limite?: number;
  absoluta: boolean;
}

export function ListaCandidatos({ candidatos, termo, limite, absoluta }: Props) {
  const linhas = useMemo(() => {
    const alvo = semAcento(termo);
    const todas = candidatos.map((cand, i) => ({ cand, pos: i + 1 }));
    if (alvo) {
      return todas.filter(({ cand }) => semAcento(`${cand.nome} ${cand.n} ${cand.partido}`).includes(alvo));
    }
    return limite ? todas.slice(0, limite) : todas;
  }, [candidatos, termo, limite]);

  const primeiro = candidatos[0];
  const teto = absoluta ? 100 : primeiro && primeiro.pct > 0 ? primeiro.pct : 100;

  return (
    <ol className="m-0 list-none p-0">
      {candidatos.length === 0 && (
        <li className="border-t border-white/10 py-4 text-[0.9375rem] text-zinc-400">
          O TSE ainda não publicou candidatos para este cargo.
        </li>
      )}
      {candidatos.length > 0 && linhas.length === 0 && (
        <li className="border-t border-white/10 py-4 text-[0.9375rem] text-zinc-400">
          Nenhum candidato com “{termo.trim()}”. Tente o número ou a sigla do partido.
        </li>
      )}
      {linhas.map(({ cand, pos }) => (
        <LinhaCandidato
          key={`${cand.n}-${cand.seq}`}
          cand={cand}
          pos={pos}
          largura={Math.max(0, Math.min(100, (cand.pct / teto) * 100))}
        />
      ))}
    </ol>
  );
}
