import type { CapitalCargo, CargoOk } from "./tipos";

export const TOP_CAPITAL = 5;

/** Reduz o cargo de Belém aos mais votados e junta o % do mesmo candidato no total (Pará ou Brasil). */
export function montarCapital(belem: CargoOk, geral: CargoOk): CapitalCargo {
  const pctGeral = new Map(geral.candidatos.map((c) => [c.n, c.pct]));
  return {
    totalizadoEm: belem.totalizadoEm,
    encerrado: belem.encerrado,
    secoes: belem.secoes,
    pctComparecimento: belem.eleitorado.pctComparecimento,
    totalCandidatos: belem.candidatos.length,
    candidatos: belem.candidatos.slice(0, TOP_CAPITAL).map((c) => ({
      n: c.n,
      nome: c.nome,
      partido: c.partido,
      votos: c.votos,
      pct: c.pct,
      pctGeral: pctGeral.get(c.n) ?? null,
    })),
  };
}
