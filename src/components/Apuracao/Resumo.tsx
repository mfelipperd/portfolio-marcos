import { fInt, fPct } from "@/lib/apuracao/formato";
import type { CargoOk } from "@/lib/apuracao/tipos";

export function Resumo({ cargo }: { cargo: CargoOk }) {
  const itens: Array<[string, number, number]> = [
    ["Comparecimento", cargo.eleitorado.comparecimento, cargo.eleitorado.pctComparecimento],
    ["Abstenção", cargo.eleitorado.abstencao, cargo.eleitorado.pctAbstencao],
    ["Brancos", cargo.votos.brancos, cargo.votos.pctBrancos],
    ["Nulos", cargo.votos.nulos, cargo.votos.pctNulos],
  ];

  return (
    <dl className="m-0 grid grid-cols-2 gap-x-5 gap-y-3 border-t-2 border-white pt-3.5">
      {itens.map(([rotulo, valor, pct]) => (
        <div key={rotulo}>
          <dt className="text-[0.8125rem] text-zinc-400">{rotulo}</dt>
          <dd className="m-0 font-bold tabular-nums">
            {fInt(valor)} <small className="text-[0.8125rem] font-medium text-zinc-400">{fPct(pct)}</small>
          </dd>
        </div>
      ))}
    </dl>
  );
}
