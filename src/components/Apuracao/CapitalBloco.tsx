import { MUNICIPIO } from "@/lib/apuracao/cargos";
import { fInt, fPct, horaCurta } from "@/lib/apuracao/formato";
import type { CargoOk } from "@/lib/apuracao/tipos";

/** Dado extra: os mais votados na capital, com o % do mesmo candidato no total para comparar. */
export function CapitalBloco({ cargo, frase }: { cargo: CargoOk; frase: string }) {
  const cap = cargo.capital;
  if (!cap || cap.candidatos.length === 0) return null;
  const total = cargo.local === "Brasil" ? "Brasil" : "Pará";
  const hora = horaCurta(cap.totalizadoEm);

  return (
    <aside className="mt-5 rounded-lg border border-[#B88AD0]/40 bg-[#B88AD0]/5 p-3.5" aria-label={`Como ${MUNICIPIO.nome} votou para ${cargo.nome.toLowerCase()}`}>
      <h3 className="m-0 text-base font-extrabold tracking-tight">Como {MUNICIPIO.nome} votou</h3>
      <p className="mt-1 text-xs text-zinc-400">
        {fPct(cap.secoes.pct)} das seções da capital totalizadas ({fInt(cap.secoes.totalizadas)} de {fInt(cap.secoes.total)})
        {hora ? `, às ${hora}` : ""}. Comparecimento: {fPct(cap.pctComparecimento)}.
      </p>
      <ol className="m-0 mt-2 list-none p-0">
        {cap.candidatos.map((c, i) => (
          <li key={c.n} className="grid grid-cols-[2.2ch_minmax(0,1fr)_auto] items-baseline gap-x-3 border-t border-white/10 py-2">
            <span className="text-right text-sm tabular-nums text-zinc-500">{i + 1}</span>
            <span className="min-w-0">
              <span className="block font-bold leading-tight [overflow-wrap:anywhere]">{c.nome}</span>
              <span className="block text-xs text-zinc-400">
                {c.partido}, nº {c.n} · {fInt(c.votos)} {c.votos === 1 ? "voto" : "votos"}
              </span>
            </span>
            <span className="whitespace-nowrap text-right">
              <span className="block font-extrabold tabular-nums">{fPct(c.pct)}</span>
              {c.pctGeral !== null && <span className="block text-xs tabular-nums text-zinc-400">{total} {fPct(c.pctGeral)}</span>}
            </span>
          </li>
        ))}
      </ol>
      {/* o texto corrido acima é o que buscadores e IAs conseguem citar; fica visível também para leitores de tela */}
      <p className="mb-0 mt-2 text-xs leading-relaxed text-zinc-500">{frase}</p>
    </aside>
  );
}
