import type { EscopoId } from "./cargos";

export type CodigoCargo = "1" | "3" | "5" | "6" | "7";

export interface Candidato {
  n: string;
  nome: string;
  partido: string;
  votos: number;
  pct: number; // % dos votos válidos, direto do TSE
  eleito: boolean;
  situacao: string; // "", "Eleito", "Não eleito", "2º turno"
  destinacao: string; // "Válido", "Anulado", "Anulado sub judice"
  seq: number;
}

export interface CargoOk {
  cd: CodigoCargo;
  nome: string;
  local: string; // "Belém", "Pará" ou "Brasil": onde estes votos foram apurados
  idg: string; // versão do arquivo no TSE
  totalizadoEm: string; // "04/10/2026 19:28:11"
  encerrado: boolean;
  secoes: { total: number; totalizadas: number; pct: number };
  eleitorado: {
    total: number;
    comparecimento: number;
    pctComparecimento: number;
    abstencao: number;
    pctAbstencao: number;
  };
  votos: {
    total: number;
    validos: number;
    brancos: number;
    pctBrancos: number;
    nulos: number;
    pctNulos: number;
  };
  totalCandidatos: number;
  candidatos: Candidato[]; // ordenados por votos; pode vir cortado (ver `resumir`)
  /** só no cliente: a última leitura deste cargo falhou e esta é a anterior */
  desatualizado?: boolean;
}

export interface CargoErro {
  cd: CodigoCargo;
  nome: string;
  erro: string;
}

export type Cargo = CargoOk | CargoErro;

export interface Apuracao {
  escopo: EscopoId;
  fonte: string;
  lidoEm: string; // ISO, hora em que o servidor leu o TSE
  cargos: Cargo[];
}

export function cargoOk(cargo: Cargo | undefined): cargo is CargoOk {
  return !!cargo && !("erro" in cargo);
}
