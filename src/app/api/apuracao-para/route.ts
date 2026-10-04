import { lerApuracao, resumir, REVALIDAR } from "@/lib/apuracao/tse";
import { cargoOk } from "@/lib/apuracao/tipos";

// Perto do TSE e do público (Belém).
export const preferredRegion = "gru1";
export const maxDuration = 15;
export const revalidate = 20; // literal: o Next não aceita valor importado aqui (mesmo valor de REVALIDAR)

/**
 * GET /api/apuracao-para           -> Pará (presidente: Brasil), com `capital` (Belém) em cada cargo; todos os candidatos
 * GET /api/apuracao-para?resumo=1  -> só os mais votados nos cargos de lista longa (usado pelo painel)
 */
export async function GET(request: Request) {
  const dados = await lerApuracao();
  const algumCargoVeio = dados.cargos.some(cargoOk);
  const resumo = new URL(request.url).searchParams.get("resumo") === "1";

  return Response.json(resumo ? resumir(dados) : dados, {
    status: algumCargoVeio ? 200 : 502,
    headers: {
      // Sem stale-while-revalidate: com pouca visita, ele deixaria a tela uma leitura atrasada.
      "Cache-Control": algumCargoVeio ? `public, s-maxage=${REVALIDAR}` : "no-store",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
