import { ANO, ESCOPOS, MUNICIPIO, TURNO, type EscopoId } from "./cargos";
import { fInt, fPct, horaCurta, ordenavel, paraISO, soData } from "./formato";
import { cargoOk, type Apuracao, type CargoOk } from "./tipos";

export const SITE = "https://www.mfelippe.com.br";
export const URL_DADOS = `${SITE}/api/apuracao-belem`;
export const URL_TSE = "https://resultados.tse.jus.br/oficial/app/index.html";
export const urlPagina = (escopo: EscopoId) => `${SITE}${ESCOPOS[escopo].caminho}`;

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

/** Média das seções totalizadas dos cargos lidos. */
export function andamentoMedio(dados: Apuracao | undefined) {
  const bons = cargosOk(dados);
  return bons.length ? bons.reduce((s, c) => s + c.secoes.pct, 0) / bons.length : 0;
}

/** Frase curta e citável por cargo. Só diz o que o TSE informa: "mais votado" não é "eleito". */
export function fraseDoCargo(cargo: CargoOk): string {
  const [a, b, c] = cargo.candidatos;
  const nome = cargo.nome.toLowerCase();
  const andamento = `${fPct(cargo.secoes.pct)} das seções ${cargo.local === "Brasil" ? "do Brasil" : `de ${cargo.local}`} totalizadas ${quando(cargo.totalizadoEm)}`.trim();
  if (!a) return `O TSE ainda não publicou votos para ${nome} (${cargo.local}).`;

  const rotulo = (x: typeof a) => `${x.nome} (${x.partido})`;
  const prep = cargo.local === "Brasil" ? "no Brasil" : cargo.local === "Pará" ? "no Pará" : `em ${cargo.local}`;
  let frase = `Para ${nome}, ${rotulo(a)} é o mais votado ${prep}, com ${fPct(a.pct)} dos votos válidos (${fInt(a.votos)} votos), com ${andamento}.`;
  const seguintes = [b, c].filter((x): x is typeof a => !!x);
  if (seguintes.length) {
    frase += ` Em seguida: ${seguintes.map((x) => `${rotulo(x)}, ${fPct(x.pct)}`).join("; ")}.`;
  }
  if (cargo.encerrado) frase += ` A apuração dos votos ${prep} para este cargo está encerrada.`;
  return frase;
}

export function resumoGeral(dados: Apuracao | undefined): string {
  const escopo = ESCOPOS[dados?.escopo ?? "belem"];
  const bons = cargosOk(dados);
  const t = maisRecente(dados);
  if (!bons.length) return `Os dados do TSE para ${escopo.nome} não puderam ser lidos agora.`;
  const onde = escopo.id === "belem" ? `Em ${escopo.nome}` : "No Pará (e no Brasil, para presidente)";
  return encerrada(dados)
    ? `A apuração está encerrada, com dados do TSE ${quando(t)}.`
    : `${onde}, ${fPct(andamentoMedio(dados))} das seções estavam totalizadas ${quando(t)} (média dos cinco cargos). A apuração segue em andamento e os números mudam a cada totalização.`;
}

export function avisoEscopo(escopo: EscopoId) {
  return escopo === "belem"
    ? `Os números são só de ${MUNICIPIO.nome}. Quem se elege depende da votação no Pará inteiro (governador, senador e deputados) ou no país (presidente). Esta página é independente e não é um site oficial do TSE.`
    : `Governador, senador e deputados: votos do Pará inteiro. Presidente: votos do Brasil inteiro. É o mesmo recorte que o TSE e o Google mostram. Esta página é independente e não é um site oficial do TSE.`;
}

export function faq(dados: Apuracao | undefined): Array<{ p: string; r: string }> {
  const escopo = ESCOPOS[dados?.escopo ?? "belem"];
  const bons = cargosOk(dados);
  const t = maisRecente(dados);
  const nome = escopo.nome;
  const quemLidera = bons.length
    ? `${bons.map(fraseDoCargo).join(" ")} Dados parciais do TSE${escopo.id === "belem" ? `, só do município de ${nome}; o resultado final depende da votação no estado ou no país` : ""}.`
    : `No momento não foi possível ler os dados do TSE. Tente de novo em instantes.`;

  const perguntas = [
    {
      p: escopo.id === "belem" ? `Quem está na frente em ${nome} nas eleições de ${ANO}?` : `Quem está na frente no Pará e no Brasil nas eleições de ${ANO}?`,
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
      r: `Não. O resultado oficial é o do TSE (site e aplicativo Resultados). Esta página é um painel independente que apresenta os mesmos arquivos públicos e mostra o horário da totalização de cada cargo para você conferir.`,
    },
    {
      p: "O que significa “seções totalizadas”?",
      r: `Seção é a urna onde os eleitores votam. “Totalizada” é a seção cujo boletim de urna já foi somado ao resultado. Quando chega a 100%, a apuração daquele recorte está completa.`,
    },
  ];

  if (escopo.id === "belem") {
    perguntas.push({
      p: `Os votos de ${nome} definem quem foi eleito?`,
      r: `Não sozinhos. Presidente é decidido com os votos do país; governador e senador, com os do Pará; deputados federais e estaduais, pelo quociente eleitoral do estado. A página só marca “Eleito” ou “2º turno” quando o próprio TSE informa.`,
    });
    perguntas.push({
      p: "Por que os números de Belém são diferentes dos que aparecem no Google?",
      r: `Porque o Google mostra o total do Pará (e do Brasil, para presidente), e esta página mostra só os votos de Belém. Para ver o mesmo recorte do Google, use a página de apuração no Pará.`,
    });
  } else {
    perguntas.push({
      p: "Por que o presidente aparece com votos do Brasil e os outros cargos com votos do Pará?",
      r: `Porque é assim que cada cargo é decidido: presidente, no país inteiro; governador, senador e deputados, no estado. É o mesmo recorte do TSE e do Google. Para ver só os votos da capital, use a página de apuração em Belém.`,
    });
    perguntas.push({
      p: "A apuração do Pará acaba quando todas as seções forem totalizadas?",
      r: `Sim, a contagem dos votos termina quando 100% das seções estão totalizadas. A página só marca “Eleito” ou “2º turno” quando o próprio TSE informa, e para de ler o TSE quando os cinco cargos chegam ao fim.`,
    });
  }
  return perguntas;
}

// "<" dentro de JSON-LD pode fechar a tag <script>
export function jsonLdSeguro(objeto: unknown) {
  return JSON.stringify(objeto).replace(/</g, "\\u003c");
}

export function jsonLd(dados: Apuracao | undefined) {
  const escopo = ESCOPOS[dados?.escopo ?? "belem"];
  const URL_PAGINA = urlPagina(escopo.id);
  const t = maisRecente(dados);
  const modificado = paraISO(t) ?? dados?.lidoEm;
  const perguntas = faq(dados);
  const ondeTitulo = escopo.id === "belem" ? escopo.nome : "Pará e Brasil";
  const titulo = `${escopo.titulo}, ${TURNO}º turno de ${ANO}: votos em tempo real`;
  const descricao = `Votos apurados ${escopo.id === "belem" ? `em ${MUNICIPIO.nome} (${MUNICIPIO.uf})` : "no Pará (presidente: no Brasil)"} para presidente, governador, senador, deputado federal e deputado estadual, lidos dos arquivos públicos do TSE e atualizados a cada minuto.`;

  const autor = { "@type": "Person", name: "Marcos Felippe", url: SITE };
  const tse = {
    "@type": "GovernmentOrganization",
    name: "Tribunal Superior Eleitoral",
    alternateName: "TSE",
    url: "https://www.tse.jus.br",
  };
  const para = { "@type": "AdministrativeArea", name: "Pará", containedInPlace: { "@type": "Country", name: "Brasil" } };
  const lugar =
    escopo.id === "belem"
      ? { "@type": "City", name: MUNICIPIO.nome, containedInPlace: para }
      : [para, { "@type": "Country", name: "Brasil" }];

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
      name: `Votos apurados: ${ondeTitulo}, eleições ${ANO} (${TURNO}º turno)`,
      description: `Votos por candidato, seções totalizadas, comparecimento, abstenção, brancos e nulos (${ondeTitulo}) para os cinco cargos em disputa. Reproduz os arquivos de divulgação de resultados do TSE.`,
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
        { "@type": "DataDownload", encodingFormat: "application/json", contentUrl: `${URL_DADOS}?escopo=${escopo.id}` },
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
        { "@type": "ListItem", position: 2, name: escopo.titulo, item: URL_PAGINA },
      ],
    },
  ];
}
