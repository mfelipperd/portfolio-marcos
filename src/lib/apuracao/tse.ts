import "server-only";
import { CARGOS, MUNICIPIO, PRIMEIROS, type DefCargo } from "./cargos";
import { normalizar, type BrutoTse } from "./normalizar";
import { cargoOk, type Apuracao } from "./tipos";

// TSE_ORIGEM só existe para testes locais com um servidor de fixtures.
const ORIGEM = process.env.TSE_ORIGEM ?? "https://resultados.tse.jus.br/oficial/ele2026";
const UF = MUNICIPIO.uf.toLowerCase();

/** Segundos que o Next guarda cada arquivo do TSE. Com 5 arquivos, o TSE recebe no máximo 5 leituras a cada 20 s. */
export const REVALIDAR = 20;

// As URLs são sempre montadas aqui, nunca vêm do cliente: 404 em excesso bloqueia o IP.
function urlDoArquivo(cargo: DefCargo) {
  const c = cargo.cd.padStart(4, "0");
  const e = cargo.eleicao.padStart(6, "0");
  return `${ORIGEM}/${cargo.eleicao}/dados/${UF}/${UF}${MUNICIPIO.codigoTse}-c${c}-e${e}-u.json`;
}

async function baixar(endereco: string): Promise<BrutoTse> {
  const resposta = await fetch(endereco, {
    headers: { accept: "application/json" },
    signal: AbortSignal.timeout(8000),
    next: { revalidate: REVALIDAR },
  });
  if (!resposta.ok) throw new Error(`TSE respondeu ${resposta.status}`);
  return resposta.json();
}

/** Lê os cinco cargos de Belém. Erro em um cargo não derruba os outros. */
export async function lerApuracao(): Promise<Apuracao> {
  const cargos = await Promise.all(
    CARGOS.map(async (def) => {
      try {
        return normalizar(await baixar(urlDoArquivo(def)), def);
      } catch (erro) {
        return { cd: def.cd, nome: def.nome, erro: String((erro as Error).message ?? erro) };
      }
    })
  );

  return {
    municipio: MUNICIPIO.nome,
    uf: MUNICIPIO.uf,
    fonte: "TSE",
    lidoEm: new Date().toISOString(),
    cargos,
  };
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
