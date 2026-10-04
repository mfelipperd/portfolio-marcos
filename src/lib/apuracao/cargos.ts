import type { CodigoCargo } from "./tipos";

export const ANO = 2026;
export const TURNO = 1;
export const MUNICIPIO = { nome: "Belém", uf: "PA", codigoTse: "04278" } as const;

export type EscopoId = "belem" | "para";

/** Qual recorte da apuração a página mostra. "para" = o que o Google mostra: presidente no Brasil, o resto no Pará. */
export interface Escopo {
  id: EscopoId;
  caminho: string;
  nome: string; // "Belém" | "Pará"
  titulo: string; // H1
  outro: EscopoId;
}

export const ESCOPOS: Record<EscopoId, Escopo> = {
  belem: { id: "belem", caminho: "/apuracao-belem", nome: "Belém", titulo: "Apuração em Belém", outro: "para" },
  para: { id: "para", caminho: "/apuracao-para", nome: "Pará", titulo: "Apuração no Pará", outro: "belem" },
};

/** Nome do lugar apurado em cada cargo: no escopo "para", presidente é o Brasil. */
export function localDoCargo(escopo: EscopoId, cd: CodigoCargo) {
  if (escopo === "belem") return MUNICIPIO.nome;
  return cd === "1" ? "Brasil" : "Pará";
}

export interface DefCargo {
  cd: CodigoCargo;
  id: string; // âncora e id no HTML
  nome: string;
  eleicao: string; // código da eleição no TSE (6257 federal, 6259 estadual)
  vagas: string; // para o texto explicativo
  absoluta: boolean; // barra de 0 a 100% dos válidos; senão, relativa ao mais votado
  longo: boolean; // lista longa: mostra 10, com busca e "mostrar todos"
}

export const CARGOS: DefCargo[] = [
  { cd: "1", id: "presidente", nome: "Presidente", eleicao: "6257", vagas: "1 vaga, decidida no país inteiro", absoluta: true, longo: false },
  { cd: "3", id: "governador", nome: "Governador", eleicao: "6259", vagas: "1 vaga, decidida no Pará inteiro", absoluta: true, longo: false },
  { cd: "5", id: "senador", nome: "Senador", eleicao: "6259", vagas: "2 vagas, decididas no Pará inteiro", absoluta: false, longo: false },
  { cd: "6", id: "deputado-federal", nome: "Deputado federal", eleicao: "6259", vagas: "17 vagas, decididas no Pará inteiro", absoluta: false, longo: true },
  { cd: "7", id: "deputado-estadual", nome: "Deputado estadual", eleicao: "6259", vagas: "41 vagas, decididas no Pará inteiro", absoluta: false, longo: true },
];

export const PRIMEIROS = 10;
