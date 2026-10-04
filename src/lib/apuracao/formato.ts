const inteiro = new Intl.NumberFormat("pt-BR");
const percentual = new Intl.NumberFormat("pt-BR", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const fInt = (n: number) => inteiro.format(n);
export const fPct = (n: number) => `${percentual.format(n)}%`;

export function semAcento(texto: string) {
  return texto.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();
}

// "04/10/2026 19:28:11" -> "19:28"
export function horaCurta(dataHora: string) {
  const m = /(\d{2}):(\d{2}):\d{2}$/.exec(dataHora);
  return m ? `${m[1]}:${m[2]}` : "";
}

// "04/10/2026 19:28:11" -> "04/10/2026"
export function soData(dataHora: string) {
  const m = /^(\d{2}\/\d{2}\/\d{4})/.exec(dataHora);
  return m ? m[1] : "";
}

// "04/10/2026 19:28:11" -> "20261004192811", só para comparar qual é mais recente
export function ordenavel(dataHora: string) {
  const m = /^(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}):(\d{2})$/.exec(dataHora);
  return m ? m[3] + m[2] + m[1] + m[4] + m[5] + m[6] : "";
}

// "04/10/2026 19:28:11" -> "2026-10-04T19:28:11-03:00" (o TSE usa o horário de Brasília, igual ao do Pará)
export function paraISO(dataHora: string) {
  const o = ordenavel(dataHora);
  if (!o) return undefined;
  return `${o.slice(0, 4)}-${o.slice(4, 6)}-${o.slice(6, 8)}T${o.slice(8, 10)}:${o.slice(10, 12)}:${o.slice(12, 14)}-03:00`;
}
