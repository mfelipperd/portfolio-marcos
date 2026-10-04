import type { MetadataRoute } from "next";

const BASE_URL = "https://www.mfelippe.com.br";

// Crawlers de IA: busca/citação em resposta (para o site ser indicado) e coleta para treino.
// Liberados de propósito: a página de apuração quer ser citada por assistentes.
const ROBOS_DE_IA = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
  "CCBot",
  "Amazonbot",
  "meta-externalagent",
  "DuckAssistBot",
  "MistralAI-User",
];

// O endpoint de dados fica aberto; o resto de /api/ continua fechado (vence a regra mais específica).
const REGRAS = {
  allow: ["/", "/api/apuracao-belem"],
  disallow: ["/api/"],
};

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", ...REGRAS },
      ...ROBOS_DE_IA.map((userAgent) => ({ userAgent, ...REGRAS })),
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
