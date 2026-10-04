import { describe, expect, it } from "vitest";
import fixture from "./__fixtures__/deputado-federal-belem.json";
import { montarCapital, TOP_CAPITAL } from "./capital";
import { normalizar, num, type BrutoTse } from "./normalizar";
import { fraseCapital, fraseDoCargo, encerrada, faq, jsonLd, jsonLdSeguro, maisRecente } from "./textos";
import { paraISO, ordenavel } from "./formato";
import { cargoOk, type Apuracao, type CargoOk } from "./tipos";

const bruto = fixture as unknown as BrutoTse;
const cargo = normalizar(bruto, { cd: "6", nome: "Deputado federal", local: "Pará" });

const apuracao = (cargos: Apuracao["cargos"]): Apuracao => ({
  fonte: "TSE", lidoEm: "2026-10-04T22:30:00.000Z", cargos,
});

describe("normalizar", () => {
  it("converte vírgula decimal e texto em número", () => {
    expect(num("43,756787555")).toBeCloseTo(43.756787555);
    expect(num("")).toBe(0);
    expect(num(undefined)).toBe(0);
    expect(num("abc")).toBe(0);
  });

  it("lê horário, seções e resumo do arquivo real do TSE", () => {
    expect(cargo.totalizadoEm).toBe("04/10/2026 19:28:11");
    expect(cargo.encerrado).toBe(false);
    expect(cargo.secoes).toEqual({ total: 2989, totalizadas: 2976, pct: expect.closeTo(99.565, 2) });
    expect(cargo.eleitorado.comparecimento).toBe(860409);
    expect(cargo.votos.brancos).toBe(39919);
    expect(cargo.votos.nulos).toBe(25479);
  });

  it("junta candidatos de todos os partidos e ordena por votos", () => {
    expect(cargo.totalCandidatos).toBe(cargo.candidatos.length);
    const votos = cargo.candidatos.map((c) => c.votos);
    expect(votos).toEqual([...votos].sort((a, b) => b - a));
    expect(cargo.candidatos[0].partido).not.toBe("");
  });

  it("usa o percentual do TSE, sem recalcular", () => {
    const c = normalizar(
      { carg: [{ cd: "6", agr: [{ par: [{ sg: "XX", cand: [{ n: "1", nmu: "A", vap: "10", pvapn: "12,5" }] }] }] }] },
      { cd: "6", nome: "Deputado federal", local: "Belém" }
    );
    expect(c.candidatos[0].pct).toBe(12.5);
  });

  it("preserva a destinação do voto e a situação informadas pelo TSE", () => {
    const c = normalizar(
      { carg: [{ cd: "5", agr: [{ par: [{ sg: "XX", cand: [{ n: "1", nmu: "A", vap: "5", dvt: "Anulado sub judice", e: "s", st: "Eleito" }] }] }] }] },
      { cd: "5", nome: "Senador", local: "Pará" }
    );
    expect(c.candidatos[0]).toMatchObject({ destinacao: "Anulado sub judice", eleito: true, situacao: "Eleito" });
  });

  it("marca como encerrado só quando and = f", () => {
    expect(normalizar({ and: "f" }, { cd: "1", nome: "Presidente", local: "Brasil" }).encerrado).toBe(true);
    expect(normalizar({ and: "p" }, { cd: "1", nome: "Presidente", local: "Brasil" }).encerrado).toBe(false);
  });

  it("não quebra com arquivo vazio", () => {
    const c = normalizar({}, { cd: "1", nome: "Presidente", local: "Brasil" });
    expect(c.candidatos).toEqual([]);
    expect(c.secoes.pct).toBe(0);
  });
});

describe("datas", () => {
  it("converte para ISO no fuso de Brasília", () => {
    expect(paraISO("04/10/2026 19:28:11")).toBe("2026-10-04T19:28:11-03:00");
    expect(paraISO("lixo")).toBeUndefined();
    expect(ordenavel("04/10/2026 19:28:11") < ordenavel("04/10/2026 19:30:00")).toBe(true);
  });
});

describe("textos para IA e buscadores", () => {
  it("a frase cita candidato, percentual, votos, seções e horário", () => {
    const frase = fraseDoCargo(cargo);
    const lider = cargo.candidatos[0];
    expect(frase).toContain(lider.nome);
    expect(frase).toContain("é o mais votado no Pará");
    expect(frase).toContain("99,57% das seções do Pará");
    expect(frase).toContain("às 19:28 de 04/10/2026");
    expect(frase).not.toMatch(/eleit[oa]/i); // "mais votado" não é "eleito"
  });

  it("gera FAQ e JSON-LD válidos, também sem dados", () => {
    const vazio = apuracao([{ cd: "1", nome: "Presidente", erro: "TSE respondeu 503" }]);
    expect(faq(vazio)).toHaveLength(7);
    for (const dados of [vazio, apuracao([cargo])]) {
      const blocos = jsonLd(dados);
      expect(blocos.map((b) => b["@type"])).toEqual(["WebPage", "Dataset", "FAQPage", "BreadcrumbList"]);
      expect(() => JSON.parse(jsonLdSeguro(blocos))).not.toThrow();
    }
    expect(jsonLd(apuracao([cargo]))[0].dateModified).toBe("2026-10-04T19:28:11-03:00");
  });

  it("escapa < no JSON-LD", () => {
    expect(jsonLdSeguro({ a: "</script>" })).not.toContain("</script>");
  });

  it("encerrada exige os cinco cargos finalizados", () => {
    expect(encerrada(apuracao([{ ...cargo, encerrado: true }]))).toBe(true);
    expect(encerrada(apuracao([{ ...cargo, encerrado: true }, { cd: "1", nome: "Presidente", erro: "x" }]))).toBe(false);
    expect(maisRecente(apuracao([cargo]))).toBe("04/10/2026 19:28:11");
    expect(cargoOk(cargo)).toBe(true);
  });
});

describe("dado extra: como Belém votou", () => {
  const geral: CargoOk = {
    ...cargo,
    local: "Pará",
    candidatos: [
      { ...cargo.candidatos[1], pct: 52.4 },
      { ...cargo.candidatos[0], pct: 30.1 },
    ],
  };

  it("junta o % do mesmo candidato no total, pelo número", () => {
    const cap = montarCapital(cargo, geral);
    const lider = cap.candidatos[0];
    expect(cap.candidatos).toHaveLength(TOP_CAPITAL);
    expect(lider.nome).toBe(cargo.candidatos[0].nome);
    expect(lider.pctGeral).toBe(30.1);
    expect(cap.totalCandidatos).toBe(cargo.totalCandidatos);
    expect(cap.secoes.pct).toBeCloseTo(99.565, 2);
    // candidato de Belém que não está na lista do total: sem comparação, nunca inventada
    expect(montarCapital(cargo, { ...geral, candidatos: [] }).candidatos[0].pctGeral).toBeNull();
  });

  it("a frase compara Belém com o total e cita horário", () => {
    const comCapital: CargoOk = { ...geral, capital: montarCapital(cargo, geral) };
    const frase = fraseCapital(comCapital);
    expect(frase).toContain("Em Belém,");
    expect(frase).toContain("contra 30,10% no Pará");
    expect(frase).toContain("às 19:28 de 04/10/2026");
    expect(fraseCapital(geral)).toBe(""); // sem dado de Belém, sem frase
  });

  it("a frase de presidente diz Brasil, não Pará", () => {
    const pres: CargoOk = { ...geral, local: "Brasil", capital: montarCapital(cargo, geral) };
    expect(fraseCapital(pres)).toContain("no Brasil");
    expect(fraseDoCargo(pres)).toContain("é o mais votado no Brasil");
    expect(fraseDoCargo(pres)).toContain("seções do Brasil totalizadas");
  });

  it("FAQ e JSON-LD citam Belém como dado extra e a URL do Pará", () => {
    const dados = apuracao([{ ...geral, capital: montarCapital(cargo, geral) }]);
    const texto = JSON.stringify([faq(dados), jsonLd(dados)]);
    expect(faq(dados).map((f) => f.p)).toContain("Como Belém votou?");
    expect(texto).toContain("Em Belém,");
    expect(jsonLd(dados)[0].url).toBe("https://www.mfelippe.com.br/apuracao-para");
  });
});
