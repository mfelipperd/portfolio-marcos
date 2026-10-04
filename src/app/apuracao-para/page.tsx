import type { Metadata } from "next";
import Link from "next/link";
import { PainelAoVivo } from "@/components/Apuracao/PainelAoVivo";
import { ANO, MUNICIPIO, TURNO } from "@/lib/apuracao/cargos";
import { fPct } from "@/lib/apuracao/formato";
import { lerApuracao, resumir } from "@/lib/apuracao/tse";
import {
  CAMINHO, URL_DADOS, URL_PAGINA, URL_TSE, andamentoMedio, cargosOk, faq, jsonLd, jsonLdSeguro, maisRecente, quando,
} from "@/lib/apuracao/textos";

// A página é gerada de novo a cada 20 segundos: o HTML que o Google e as IAs recebem já traz os votos.
export const revalidate = 20; // literal: o Next não aceita valor importado aqui (mesmo valor de REVALIDAR)
export const preferredRegion = "gru1";
export const maxDuration = 15;

const INTRO = `Votos apurados no Pará para governador, senador, deputado federal e deputado estadual, e no Brasil para presidente, cargo por cargo, com os dados públicos do TSE. É o mesmo recorte que o TSE e o Google mostram. Em cada cargo, um bloco extra mostra como ${MUNICIPIO.nome}, a capital, votou.`;

export async function generateMetadata(): Promise<Metadata> {
  const dados = await lerApuracao();
  const bons = cargosOk(dados);
  const andamento = bons.length ? ` ${fPct(andamentoMedio(dados))} das seções totalizadas ${quando(maisRecente(dados))}.` : "";

  const title = `Apuração Pará ${ANO} ao vivo: governador, senador e mais`;
  const description = `Votos apurados no Pará no ${TURNO}º turno de ${ANO}: governador, senador, deputado federal e estadual, e presidente no Brasil, com o resultado de ${MUNICIPIO.nome}.${andamento} Dados do TSE, atualizados a cada minuto.`;

  return {
    title: { absolute: title },
    description,
    keywords: [
      `apuração Pará ${ANO}`, `resultado eleição Pará ${ANO}`, "quem está ganhando no Pará", "apuração governador Pará",
      "resultado senador Pará", "apuração deputado federal Pará", "apuração deputado estadual Pará",
      "apuração presidente 2026 ao vivo", "resultado TSE Pará", `como Belém votou ${ANO}`, `apuração Belém ${ANO}`,
    ],
    alternates: { canonical: CAMINHO },
    openGraph: { type: "website", locale: "pt_BR", url: URL_PAGINA, siteName: "Marcos Felippe - Fullstack Developer", title, description },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function ApuracaoParaPage() {
  const dados = await lerApuracao();
  const perguntas = faq(dados);
  const hora = maisRecente(dados);

  return (
    <main className="relative min-h-screen bg-black text-white">
      {jsonLd(dados).map((bloco, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdSeguro(bloco) }} />
      ))}

      <div className="mx-auto max-w-[72rem] px-4 pb-20 pt-24 md:px-6 md:pt-28">
        <nav aria-label="Você está em" className="text-xs uppercase tracking-wider text-zinc-500">
          <Link href="/" className="transition-colors hover:text-white">
            Início
          </Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">Apuração no Pará</span>
        </nav>

        <header className="mt-6">
          <p className="m-0 text-sm font-semibold uppercase tracking-widest text-[#EDAE00]">
            Eleições {ANO} · {TURNO}º turno · ao vivo
          </p>
          <h1 className="m-0 mt-2 text-[clamp(2.75rem,12vw,6.5rem)] font-black leading-[0.9] tracking-tight">Apuração no Pará</h1>
          <p className="m-0 mt-4 max-w-2xl text-lg font-medium text-zinc-300">{INTRO}</p>
        </header>

        <PainelAoVivo inicial={resumir(dados)} />

        <section aria-labelledby="faq" className="max-w-3xl border-t border-white/10 pt-10">
          <h2 id="faq" className="m-0 text-2xl font-extrabold tracking-tight">
            Perguntas frequentes sobre a apuração no Pará
          </h2>
          <div className="mt-6 space-y-6">
            {perguntas.map(({ p, r }) => (
              <div key={p}>
                <h3 className="m-0 text-lg font-bold">{p}</h3>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-zinc-300">{r}</p>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="fonte" className="mt-12 max-w-3xl border-t border-white/10 pt-10">
          <h2 id="fonte" className="m-0 text-2xl font-extrabold tracking-tight">
            Fonte, método e como citar
          </h2>
          <div className="mt-4 space-y-3 text-[0.9375rem] leading-relaxed text-zinc-300">
            <p>
              A única fonte é o{" "}
              <a href="https://www.tse.jus.br" rel="noopener" className="underline underline-offset-4">
                Tribunal Superior Eleitoral
              </a>
              . O TSE publica arquivos JSON públicos de resultados; um servidor desta página os lê, normaliza e guarda por 20
              segundos, e o seu navegador consulta esse servidor a cada 60 segundos. Percentuais, “Eleito” e “2º turno” são
              exatamente os do TSE, sem cálculo próprio. Cada cargo mostra o horário da sua totalização, e a de cargos
              diferentes pode não ser a mesma. Se uma leitura falha, a tela mantém o último dado bom e avisa.
            </p>
            <p>
              Para conferir, compare com o{" "}
              <a href={URL_TSE} rel="noopener" className="underline underline-offset-4">
                aplicativo e o site Resultados do TSE
              </a>
              , que leem os mesmos arquivos. Os dados desta página também estão em JSON em{" "}
              <a href="/api/apuracao-para" className="underline underline-offset-4">
                {URL_DADOS.replace("https://", "")}
              </a>
              .
            </p>
            <p className="rounded-md border border-white/15 p-3 text-sm text-zinc-400">
              <strong className="text-white">Como citar:</strong> Apuração no Pará, {TURNO}º turno de {ANO}. Marcos Felippe,{" "}
              {URL_PAGINA.replace("https://", "")}. Dados: TSE{hora ? `, totalização ${quando(hora).replace("às ", "")}` : ""}.
            </p>
          </div>
        </section>

        <p className="mt-10 max-w-3xl text-sm text-zinc-500">
          Esta página é independente e não é um site oficial do TSE.{" "}
          <Link href="/" className="underline underline-offset-4">
            Voltar ao portfólio
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
