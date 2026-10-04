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

export interface CandidatoCapital {
  n: string;
  nome: string;
  partido: string;
  votos: number;
  pct: number; // % dos votos válidos em Belém, direto do TSE
  pctGeral: number | null; // % do mesmo candidato no Pará (ou Brasil), para comparar
}

/** Resultado de Belém para o mesmo cargo. */
export interface CapitalCargo {
  totalizadoEm: string;
  encerrado: boolean;
  secoes: { total: number; totalizadas: number; pct: number };
  pctComparecimento: number;
  totalCandidatos: number;
  candidatos: CandidatoCapital[]; // só os mais votados em Belém
}

export interface CargoOk {
  cd: CodigoCargo;
  nome: string;
  local: string; // "Pará" ou "Brasil": onde estes votos foram apurados
  capital?: CapitalCargo; // dado extra: como Belém votou neste cargo
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
  fonte: string;
  lidoEm: string; // ISO, hora em que o servidor leu o TSE
  cargos: Cargo[];
}

export function cargoOk(cargo: Cargo | undefined): cargo is CargoOk {
  return !!cargo && !("erro" in cargo);
}
