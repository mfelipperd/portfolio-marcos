import "server-only";
import { CARGOS, MUNICIPIO, PRIMEIROS, localDoCargo, type DefCargo } from "./cargos";
import { montarCapital } from "./capital";
import { normalizar, type BrutoTse } from "./normalizar";
import { cargoOk, type Apuracao } from "./tipos";

// TSE_ORIGEM só existe para testes locais com um servidor de fixtures.
const ORIGEM = process.env.TSE_ORIGEM ?? "https://resultados.tse.jus.br/oficial/ele2026";
const UF = MUNICIPIO.uf.toLowerCase();

/** Segundos que o Next guarda cada arquivo do TSE. Com 10 arquivos (5 cargos x Pará e Belém), o TSE recebe no máximo 10 leituras a cada 20 s. */
export const REVALIDAR = 20;

// As URLs são sempre montadas aqui, nunca vêm do cliente: 404 em excesso bloqueia o IP.
function arquivo(cargo: DefCargo, abr: string, prefixo: string) {
  const c = cargo.cd.padStart(4, "0");
  const e = cargo.eleicao.padStart(6, "0");
  return `${ORIGEM}/${cargo.eleicao}/dados/${abr}/${prefixo}-c${c}-e${e}-u.json`;
}

// Presidente: arquivo do Brasil. Demais cargos: arquivo do estado.
const urlGeral = (cargo: DefCargo) =>
  cargo.cd === "1" ? arquivo(cargo, "br", "br") : arquivo(cargo, UF, UF);
const urlCapital = (cargo: DefCargo) => arquivo(cargo, UF, `${UF}${MUNICIPIO.codigoTse}`);

async function baixar(endereco: string): Promise<BrutoTse> {
  const resposta = await fetch(endereco, {
    headers: { accept: "application/json" },
    signal: AbortSignal.timeout(8000),
    next: { revalidate: REVALIDAR },
  });
  if (!resposta.ok) throw new Error(`TSE respondeu ${resposta.status}`);
  return resposta.json();
}

/**
 * Lê os cinco cargos (Pará; presidente no Brasil) e, como dado extra, o resultado de Belém.
 * Erro em um cargo não derruba os outros; falha em Belém só tira o dado extra daquele cargo.
 */
export async function lerApuracao(): Promise<Apuracao> {
  const cargos = await Promise.all(
    CARGOS.map(async (def) => {
      const [geral, capital] = await Promise.allSettled([baixar(urlGeral(def)), baixar(urlCapital(def))]);
      if (geral.status === "rejected") {
        return { cd: def.cd, nome: def.nome, erro: String((geral.reason as Error).message ?? geral.reason) };
      }
      const ok = normalizar(geral.value, { ...def, local: localDoCargo(def.cd) });
      if (capital.status === "fulfilled") {
        ok.capital = montarCapital(normalizar(capital.value, { ...def, local: MUNICIPIO.nome }), ok);
      }
      return ok;
    })
  );

  return { fonte: "TSE", lidoEm: new Date().toISOString(), cargos };
}

/** Versão leve: nos cargos de lista longa, só os mais votados (o total continua em `totalCandidatos`). */
export function resumir(dados: Apuracao): Apuracao {
  return {
    ...dados,
    cargos: dados.cargos.map((c) => {
      const def = CARGOS.find((d) => d.cd === c.cd);
      return cargoOk(c) && def?.longo ? { ...c, candidatos: c.candidatos.slice(0, PRIMEIROS) } : c;
    }),
  };
}
