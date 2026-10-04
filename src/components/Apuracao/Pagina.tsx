import type { Metadata } from "next";
import Link from "next/link";
import { ANO, ESCOPOS, MUNICIPIO, TURNO, type EscopoId } from "@/lib/apuracao/cargos";
import { fPct } from "@/lib/apuracao/formato";
import { lerApuracao, resumir } from "@/lib/apuracao/tse";
import {
  URL_DADOS, URL_TSE, andamentoMedio, avisoEscopo, cargosOk, faq, jsonLd, jsonLdSeguro, maisRecente, quando, urlPagina,
} from "@/lib/apuracao/textos";
import { PainelAoVivo } from "./PainelAoVivo";

const TEXTOS = {
  belem: {
    titulo: (_andamento: string) => `Apuração Belém ${ANO} ao vivo: votos do TSE por cargo`,
    descricao: (andamento: string) =>
      `Votos apurados em ${MUNICIPIO.nome} (${MUNICIPIO.uf}) no ${TURNO}º turno de ${ANO}: presidente, governador, senador, deputado federal e estadual.${andamento} Dados do TSE, atualizados a cada minuto.`,
    intro: `Votos apurados em ${MUNICIPIO.nome} (${MUNICIPIO.uf}) para presidente, governador, senador, deputado federal e deputado estadual, cargo por cargo, com os dados públicos do TSE.`,
    palavras: [
      `apuração ${MUNICIPIO.nome} ${ANO}`, `resultado eleição ${MUNICIPIO.nome}`, `eleições ${ANO} ${MUNICIPIO.nome}`,
      `votos ${MUNICIPIO.nome} em tempo real`, "apuração ao vivo", "resultado TSE Belém", "quem está ganhando em Belém", "eleições Pará 2026",
    ],
  },
  para: {
    titulo: (_andamento: string) => `Apuração Pará ${ANO} ao vivo: governador, senador e mais`,
    descricao: (andamento: string) =>
      `Votos apurados no Pará no ${TURNO}º turno de ${ANO}: governador, senador, deputado federal e estadual, e presidente no Brasil.${andamento} Dados do TSE, atualizados a cada minuto.`,
    intro: `Votos apurados no Pará para governador, senador, deputado federal e deputado estadual, e no Brasil para presidente, cargo por cargo, com os dados públicos do TSE. É o mesmo recorte que o TSE e o Google mostram.`,
    palavras: [
      `apuração Pará ${ANO}`, `resultado eleição Pará ${ANO}`, `quem está ganhando no Pará`, "apuração governador Pará",
      "resultado senador Pará", "apuração deputado federal Pará", "apuração deputado estadual Pará", "apuração presidente 2026 ao vivo", "resultado TSE Pará",
    ],
  },
} as const;

export async function metadataDaPagina(id: EscopoId): Promise<Metadata> {
  const escopo = ESCOPOS[id];
  const t = TEXTOS[id];
  const dados = await lerApuracao(id);
  const bons = cargosOk(dados);
  const hora = maisRecente(dados);
  const andamento = bons.length ? ` ${fPct(andamentoMedio(dados))} das seções totalizadas ${quando(hora)}.` : "";
  const title = t.titulo(andamento);
  const description = t.descricao(andamento);
  const url = urlPagina(id);

  return {
    title: { absolute: title },
    description,
    keywords: [...t.palavras],
    alternates: { canonical: escopo.caminho },
    openGraph: { type: "website", locale: "pt_BR", url, siteName: "Marcos Felippe - Fullstack Developer", title, description },
    twitter: { card: "summary_large_image", title, description },
  };
}

export async function PaginaApuracao({ id }: { id: EscopoId }) {
  const escopo = ESCOPOS[id];
  const outro = ESCOPOS[escopo.outro];
  const t = TEXTOS[id];
  const dados = await lerApuracao(id);
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
          <span aria-current="page">{escopo.titulo}</span>
        </nav>

        <header className="mt-6">
          <p className="m-0 text-sm font-semibold uppercase tracking-widest text-[#EDAE00]">
            Eleições {ANO} · {TURNO}º turno · ao vivo
          </p>
          <h1 className="m-0 mt-2 text-[clamp(2.75rem,12vw,6.5rem)] font-black leading-[0.9] tracking-tight">{escopo.titulo}</h1>
          <p className="m-0 mt-4 max-w-2xl text-lg font-medium text-zinc-300">{t.intro}</p>

          <div className="mt-5 inline-flex rounded-full border border-white/15 p-1 text-sm font-semibold" role="group" aria-label="Recorte da apuração">
            {(["para", "belem"] as const).map((e) => (
              <Link
                key={e}
                href={ESCOPOS[e].caminho}
                aria-current={e === id ? "page" : undefined}
                className={`rounded-full px-4 py-1.5 ${e === id ? "bg-white text-black" : "text-zinc-300 hover:text-white"}`}
              >
                {e === "para" ? "Pará e Brasil" : "Só Belém"}
              </Link>
            ))}
          </div>
        </header>

        <PainelAoVivo key={id} inicial={resumir(dados)} />

        <section aria-labelledby="faq" className="max-w-3xl border-t border-white/10 pt-10">
          <h2 id="faq" className="m-0 text-2xl font-extrabold tracking-tight">
            Perguntas frequentes sobre a apuração {id === "belem" ? "em Belém" : "no Pará"}
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
              <a href={`/api/apuracao-belem?escopo=${id}`} className="underline underline-offset-4">
                {URL_DADOS.replace("https://", "")}?escopo={id}
              </a>
              .
            </p>
            <p className="rounded-md border border-white/15 p-3 text-sm text-zinc-400">
              <strong className="text-white">Como citar:</strong> {escopo.titulo}, {TURNO}º turno de {ANO}. Marcos Felippe,{" "}
              {urlPagina(id).replace("https://", "")}. Dados: TSE{hora ? `, totalização ${quando(hora).replace("às ", "")}` : ""}.
            </p>
          </div>
        </section>

        <p className="mt-10 max-w-3xl text-sm text-zinc-500">
          {avisoEscopo(id)}{" "}
          <Link href={outro.caminho} className="underline underline-offset-4">
            Ver {outro.id === "belem" ? "só Belém" : "Pará e Brasil"}
          </Link>
          {" · "}
          <Link href="/" className="underline underline-offset-4">
            Voltar ao portfólio
          </Link>
          .
        </p>
      </div>
    </main>
  );
}
