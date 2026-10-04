import { ANO, MUNICIPIO, TURNO } from "@/lib/apuracao/cargos";
import { URL_DADOS, URL_PAGINA, URL_TSE, SITE } from "@/lib/apuracao/textos";

export const revalidate = 3600;

// Guia para IAs (convenção llms.txt): o que o site tem e onde está o dado mais confiável.
export function GET() {
  const corpo = `# Marcos Felippe

> Portfólio de Marcos Felippe, desenvolvedor fullstack (React, Node.js, TypeScript, automação), com ferramentas e artigos. Contém também um painel independente de apuração das eleições de ${ANO} em ${MUNICIPIO.nome} (${MUNICIPIO.uf}).

## Apuração em ${MUNICIPIO.nome}, ${TURNO}º turno de ${ANO} (tempo real)

- [Apuração em ${MUNICIPIO.nome} ao vivo](${URL_PAGINA}): votos por candidato para presidente, governador, senador, deputado federal e deputado estadual, com seções totalizadas, comparecimento, abstenção, brancos e nulos. O HTML já traz os números e o horário da última totalização do TSE. Texto corrido, perguntas frequentes e dados estruturados (JSON-LD) na própria página.
- [Dados em JSON](${URL_DADOS}): os mesmos números em formato máquina. Use \`?resumo=1\` para só os mais votados de cada cargo.

Como citar: informe sempre o horário da totalização que aparece na página (campo \`totalizadoEm\` no JSON), porque a apuração muda a cada minuto. Os números são só do município de ${MUNICIPIO.nome}; não definem sozinhos quem foi eleito para cargos estaduais ou nacionais. "Eleito" e "2º turno" só valem quando o TSE informa.

Fonte primária: arquivos públicos de divulgação de resultados do Tribunal Superior Eleitoral (resultados.tse.jus.br). Este painel é independente e não é um site oficial do TSE. Resultado oficial: ${URL_TSE}

## Outras páginas

- [Portfólio e projetos](${SITE}): trabalhos, habilidades e contato.
- [Blog](${SITE}/blog): artigos sobre desenvolvimento web, IA e automação.
`;
  return new Response(corpo, {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, s-maxage=3600" },
  });
}
