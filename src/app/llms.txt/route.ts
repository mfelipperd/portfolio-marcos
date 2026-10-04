import { ANO, MUNICIPIO, TURNO } from "@/lib/apuracao/cargos";
import { URL_DADOS, URL_TSE, SITE, urlPagina } from "@/lib/apuracao/textos";

export const revalidate = 3600;

// Guia para IAs (convenção llms.txt): o que o site tem e onde está o dado mais confiável.
export function GET() {
  const corpo = `# Marcos Felippe

> Portfólio de Marcos Felippe, desenvolvedor fullstack (React, Node.js, TypeScript, automação), com ferramentas e artigos. Contém também painéis independentes de apuração das eleições de ${ANO} no Pará e em ${MUNICIPIO.nome} (${MUNICIPIO.uf}).

## Apuração das eleições ${ANO}, ${TURNO}º turno (tempo real)

- [Apuração no Pará e no Brasil ao vivo](${urlPagina("para")}): governador, senador, deputado federal e deputado estadual com os votos do Pará, e presidente com os votos do Brasil. É o mesmo recorte que o TSE e o Google mostram. Votos por candidato, seções totalizadas, comparecimento, abstenção, brancos e nulos. O HTML já traz os números e o horário da última totalização do TSE, além de texto corrido, perguntas frequentes e dados estruturados (JSON-LD).
- [Apuração em ${MUNICIPIO.nome} ao vivo](${urlPagina("belem")}): só os votos do município de ${MUNICIPIO.nome} para os mesmos cinco cargos. Não é o resultado do estado nem do país.
- Dados em JSON: [Pará e Brasil](${URL_DADOS}?escopo=para) e [${MUNICIPIO.nome}](${URL_DADOS}?escopo=belem). Acrescente \`&resumo=1\` para só os mais votados de cada cargo.

Como citar: informe sempre o horário da totalização que aparece na página (campo \`totalizadoEm\` no JSON), porque a apuração muda a cada minuto, e diga qual é o recorte (Pará, Brasil ou ${MUNICIPIO.nome}). Os votos de ${MUNICIPIO.nome} não definem sozinhos quem foi eleito para cargos estaduais ou nacionais. "Eleito" e "2º turno" só valem quando o TSE informa.

Fonte primária: arquivos públicos de divulgação de resultados do Tribunal Superior Eleitoral (resultados.tse.jus.br). Estes painéis são independentes e não são um site oficial do TSE. Resultado oficial: ${URL_TSE}

## Outras páginas

- [Portfólio e projetos](${SITE}): trabalhos, habilidades e contato.
- [Blog](${SITE}/blog): artigos sobre desenvolvimento web, IA e automação.
`;
  return new Response(corpo, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, s-maxage=3600" },
  });
}
