import { ANO, CARGOS, MUNICIPIO, TURNO, type DefCargo } from "./cargos";
import { fInt, fPct, horaCurta, ordenavel, paraISO, soData } from "./formato";
import { cargoOk, type Apuracao, type CargoOk } from "./tipos";

export const SITE = "https://www.mfelippe.com.br";
export const CAMINHO = "/apuracao-belem";
export const URL_PAGINA = `${SITE}${CAMINHO}`;
export const URL_DADOS = `${SITE}/api/apuracao-belem`;
export const URL_TSE = "https://resultados.tse.jus.br/oficial/app/index.html";

const defDe = (cargo: CargoOk) => CARGOS.find((d) => d.cd === cargo.cd) as DefCargo;

export function cargosOk(dados: Apuracao | undefined) {
  return (dados?.cargos ?? []).filter(cargoOk);
}

/** Totalização mais recente entre os cargos, no formato do TSE ("04/10/2026 19:28:11"). */
export function maisRecente(dados: Apuracao | undefined) {
  return cargosOk(dados).reduce(
    (atual, c) => (ordenavel(c.totalizadoEm) > ordenavel(atual) ? c.totalizadoEm : atual),
    ""
  );
}

export function encerrada(dados: Apuracao | undefined) {
  return !!dados && dados.cargos.length > 0 && dados.cargos.every((c) => cargoOk(c) && c.encerrado);
}

export function quando(totalizadoEm: string) {
  const h = horaCurta(totalizadoEm);
  const d = soData(totalizadoEm);
  return h && d ? `às ${h} de ${d}` : h ? `às ${h}` : "";
}

function nomeCargo(cargo: CargoOk) {
  return cargo.nome.toLowerCase();
}

/** Frase curta e citável por cargo. Só diz o que o TSE informa: "mais votado" não é "eleito". */
export function fraseDoCargo(cargo: CargoOk): string {
  const [a, b, c] = cargo.candidatos;
  const andamento = `${fPct(cargo.secoes.pct)} das seções de Belém totalizadas ${quando(cargo.totalizadoEm)}`.trim();
  if (!a) return `O TSE ainda não publicou votos para ${nomeCargo(cargo)} em ${MUNICIPIO.nome}.`;

  const rotulo = (x: typeof a) => `${x.nome} (${x.partido})`;
  let frase = `Para ${nomeCargo(cargo)}, ${rotulo(a)} é o mais votado em ${MUNICIPIO.nome}, com ${fPct(a.pct)} dos votos válidos (${fInt(a.votos)} votos), com ${andamento}.`;
  const seguintes = [b, c].filter((x): x is typeof a => !!x);
  if (seguintes.length) {
    frase += ` Em seguida: ${seguintes.map((x) => `${rotulo(x)}, ${fPct(x.pct)}`).join("; ")}.`;
  }
  if (cargo.encerrado) frase += ` A apuração dos votos de ${MUNICIPIO.nome} para este cargo está encerrada.`;
  return frase;
}

export function resumoGeral(dados: Apuracao | undefined): string {
  const bons = cargosOk(dados);
  const t = maisRecente(dados);
  if (!bons.length) return `Os dados do TSE para ${MUNICIPIO.nome} não puderam ser lidos agora.`;
  const pct = bons.reduce((s, c) => s + c.secoes.pct, 0) / bons.length;
  return encerrada(dados)
    ? `A apuração dos votos de ${MUNICIPIO.nome} no ${TURNO}º turno de ${ANO} está encerrada, com dados do TSE ${quando(t)}.`
    : `Em ${MUNICIPIO.nome}, ${fPct(pct)} das seções estavam totalizadas ${quando(t)} (média dos cinco cargos). A apuração segue em andamento e os números mudam a cada totalização.`;
}

export function lideres(dados: Apuracao | undefined) {
  return cargosOk(dados)
    .filter((c) => c.candidatos.length > 0)
    .map((c) => ({ def: defDe(c), cargo: c, lider: c.candidatos[0] }));
}

export const AVISO_ESCOPO =
  `Os números são só de ${MUNICIPIO.nome}. Quem se elege depende da votação no Pará inteiro (governador, senador e deputados) ou no país (presidente). Esta página é independente e não é um site oficial do TSE.`;

export function faq(dados: Apuracao | undefined): Array<{ p: string; r: string }> {
  const bons = cargosOk(dados);
  const t = maisRecente(dados);
  const quemLidera = bons.length
    ? `${bons.map(fraseDoCargo).join(" ")} Dados parciais do TSE, só do município de ${MUNICIPIO.nome}; o resultado final depende da votação no estado ou no país.`
    : `No momento não foi possível ler os dados do TSE. Tente de novo em instantes.`;

  return [
    {
      p: `Quem está na frente em ${MUNICIPIO.nome} nas eleições de ${ANO}?`,
      r: quemLidera,
    },
    {
      p: "De onde vêm os votos mostrados nesta página?",
      r: `Dos arquivos públicos de divulgação de resultados do Tribunal Superior Eleitoral (TSE), publicados em resultados.tse.jus.br, conforme os artigos 264 a 269 da Resolução TSE nº 23.751/2026. A página não usa nenhuma outra fonte e não recalcula percentuais: mostra os valores que o TSE informa.`,
    },
    {
      p: "Com que frequência os números atualizam?",
      r: `O TSE regrava os arquivos conforme a totalização avança, com cerca de 1 a 2 minutos de atraso. Esta página relê o TSE a cada 60 segundos enquanto a apuração está aberta e para de ler quando os cinco cargos chegam ao fim.${t ? ` A última totalização lida foi ${quando(t)}.` : ""}`,
    },
    {
      p: "Este é o resultado oficial?",
      r: `Não. O resultado oficial é o do TSE (site e aplicativo Resultados). Esta página é um painel independente que apresenta os mesmos arquivos públicos, só para ${MUNICIPIO.nome}, e mostra o horário da totalização de cada cargo para você conferir.`,
    },
    {
      p: "O que significa “seções totalizadas”?",
      r: `Seção é a urna onde os eleitores votam. “Totalizada” é a seção cujo boletim de urna já foi somado ao resultado. Em ${MUNICIPIO.nome}, o total de seções aparece no andamento de cada cargo; quando chega a 100%, a apuração do município está completa.`,
    },
    {
      p: `Os votos de ${MUNICIPIO.nome} definem quem foi eleito?`,
      r: `Não sozinhos. Presidente é decidido com os votos do país; governador e senador, com os do Pará; deputados federais e estaduais, pelo quociente eleitoral do estado. A página só marca “Eleito” ou “2º turno” quando o próprio TSE informa.`,
    },
  ];
}

// "<" dentro de JSON-LD pode fechar a tag <script>
export function jsonLdSeguro(objeto: unknown) {
  return JSON.stringify(objeto).replace(/</g, "\\u003c");
}

export function jsonLd(dados: Apuracao | undefined) {
  const t = maisRecente(dados);
  const modificado = paraISO(t) ?? dados?.lidoEm;
  const perguntas = faq(dados);
  const titulo = `Apuração em ${MUNICIPIO.nome}, ${TURNO}º turno de ${ANO}: votos em tempo real`;
  const descricao = `Votos apurados em ${MUNICIPIO.nome} (${MUNICIPIO.uf}) para presidente, governador, senador, deputado federal e deputado estadual, lidos dos arquivos públicos do TSE e atualizados a cada minuto.`;

  const autor = { "@type": "Person", name: "Marcos Felippe", url: SITE };
  const tse = {
    "@type": "GovernmentOrganization",
    name: "Tribunal Superior Eleitoral",
    alternateName: "TSE",
    url: "https://www.tse.jus.br",
  };
  const lugar = {
    "@type": "City",
    name: MUNICIPIO.nome,
    containedInPlace: { "@type": "AdministrativeArea", name: "Pará", containedInPlace: { "@type": "Country", name: "Brasil" } },
  };

  return [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${URL_PAGINA}#pagina`,
      url: URL_PAGINA,
      name: titulo,
      description: descricao,
      inLanguage: "pt-BR",
      dateModified: modificado,
      isPartOf: { "@type": "WebSite", name: "Marcos Felippe", url: SITE },
      author: autor,
      publisher: autor,
      about: { "@type": "Event", name: `Eleições gerais de ${ANO}, ${TURNO}º turno`, startDate: `${ANO}-10-04`, location: lugar },
      mainEntity: { "@id": `${URL_PAGINA}#dados` },
      citation: URL_TSE,
      speakable: { "@type": "SpeakableSpecification", cssSelector: ["[data-geo='resumo']"] },
    },
    {
      "@context": "https://schema.org",
      "@type": "Dataset",
      "@id": `${URL_PAGINA}#dados`,
      name: `Votos apurados em ${MUNICIPIO.nome}, eleições ${ANO} (${TURNO}º turno)`,
      description: `Votos por candidato, seções totalizadas, comparecimento, abstenção, brancos e nulos em ${MUNICIPIO.nome} para os cinco cargos em disputa. Reproduz os arquivos de divulgação de resultados do TSE.`,
      url: URL_PAGINA,
      inLanguage: "pt-BR",
      isAccessibleForFree: true,
      creator: tse,
      publisher: autor,
      isBasedOn: URL_TSE,
      spatialCoverage: lugar,
      temporalCoverage: `${ANO}-10-04`,
      dateModified: modificado,
      measurementTechnique: "Totalização oficial de boletins de urna pelo TSE",
      variableMeasured: ["Votos por candidato", "Percentual dos votos válidos", "Seções totalizadas", "Comparecimento", "Abstenção", "Votos brancos", "Votos nulos"],
      distribution: [
        { "@type": "DataDownload", encodingFormat: "application/json", contentUrl: URL_DADOS },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: perguntas.map(({ p, r }) => ({
        "@type": "Question",
        name: p,
        acceptedAnswer: { "@type": "Answer", text: r },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Início", item: SITE },
        { "@type": "ListItem", position: 2, name: `Apuração em ${MUNICIPIO.nome}`, item: URL_PAGINA },
      ],
    },
  ];
}
