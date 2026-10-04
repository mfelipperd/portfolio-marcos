import type { Candidato, CargoOk, CodigoCargo } from "./tipos";

// Só descreve o que usamos do arquivo EA20 do TSE. Tudo chega como texto, com vírgula decimal.
type Texto = string | number | undefined | null;
interface BrutoCand { n?: Texto; nm?: string; nmu?: string; vap?: Texto; pvap?: Texto; pvapn?: Texto; e?: string; st?: string; dvt?: string; seq?: Texto }
interface BrutoPar { sg?: string; cand?: BrutoCand[] }
interface BrutoAgr { par?: BrutoPar[] }
interface BrutoCarg { cd?: Texto; agr?: BrutoAgr[] }
export interface BrutoTse {
  idg?: Texto; dt?: string; ht?: string; and?: string;
  carg?: BrutoCarg[];
  s?: Record<string, Texto>;
  e?: Record<string, Texto>;
  v?: Record<string, Texto>;
}

export function num(valor: unknown) {
  if (valor === undefined || valor === null || valor === "") return 0;
  const n = Number(String(valor).replace(",", "."));
  return Number.isFinite(n) ? n : 0;
}

export function normalizar(bruto: BrutoTse, cargo: { cd: CodigoCargo; nome: string }): CargoOk {
  const lista = Array.isArray(bruto.carg) ? bruto.carg : [];
  const carg = lista.find((c) => String(c.cd) === cargo.cd) ?? lista[0] ?? {};

  const candidatos: Candidato[] = [];
  for (const agr of carg.agr ?? []) {
    for (const par of agr.par ?? []) {
      for (const c of par.cand ?? []) {
        candidatos.push({
          n: String(c.n ?? ""),
          nome: c.nmu || c.nm || "",
          partido: par.sg || "",
          votos: num(c.vap),
          pct: num(c.pvapn ?? c.pvap),
          eleito: c.e === "s",
          situacao: c.st || "",
          destinacao: c.dvt || "",
          seq: num(c.seq),
        });
      }
    }
  }
  candidatos.sort((a, b) => b.votos - a.votos || a.seq - b.seq);

  const s = bruto.s ?? {};
  const e = bruto.e ?? {};
  const v = bruto.v ?? {};

  return {
    cd: cargo.cd,
    nome: cargo.nome,
    idg: String(bruto.idg ?? ""),
    totalizadoEm: [bruto.dt, bruto.ht].filter(Boolean).join(" "),
    encerrado: bruto.and === "f",
    secoes: { total: num(s.ts), totalizadas: num(s.st), pct: num(s.pstn ?? s.pst) },
    eleitorado: {
      total: num(e.te),
      comparecimento: num(e.c),
      pctComparecimento: num(e.pcn ?? e.pc),
      abstencao: num(e.a),
      pctAbstencao: num(e.pan ?? e.pa),
    },
    votos: {
      total: num(v.tv),
      validos: num(v.vv),
      brancos: num(v.vb),
      pctBrancos: num(v.pvbn ?? v.pvb),
      nulos: num(v.tvn),
      pctNulos: num(v.ptvnn ?? v.ptvn),
    },
    totalCandidatos: candidatos.length,
    candidatos,
  };
}
