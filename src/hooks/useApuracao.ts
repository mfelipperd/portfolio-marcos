"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cargoOk, type Apuracao, type Cargo } from "@/lib/apuracao/tipos";
import { encerrada } from "@/lib/apuracao/textos";

const INTERVALO = 60_000;

/** Se um cargo falhou nesta leitura, mantém o último dado bom dele, marcado como desatualizado. */
function mesclar(anterior: Apuracao, novo: Apuracao): Apuracao {
  const cargos: Cargo[] = novo.cargos.map((c) => {
    if (cargoOk(c)) return c;
    const velho = anterior.cargos.find((x) => x.cd === c.cd);
    return cargoOk(velho) ? { ...velho, desatualizado: true } : c;
  });
  return { ...novo, cargos };
}

export function useApuracao(inicial: Apuracao) {
  const [dados, setDados] = useState(inicial);
  const [falhou, setFalhou] = useState(false);
  const [lendo, setLendo] = useState(false);
  const [completo, setCompleto] = useState(false);
  const controle = useRef<AbortController | null>(null);
  const fim = encerrada(dados);

  const ler = useCallback(async () => {
    controle.current?.abort();
    const ac = new AbortController();
    const query = new URLSearchParams({ escopo: inicial.escopo });
    if (!completo) query.set("resumo", "1");
    controle.current = ac;
    setLendo(true);
    try {
      const r = await fetch(`/api/apuracao-belem?${query}`, { signal: ac.signal, cache: "no-store" });
      if (!r.ok) throw new Error(`API respondeu ${r.status}`);
      const novo = (await r.json()) as Apuracao;
      setDados((antes) => mesclar(antes, novo));
      setFalhou(novo.cargos.some((c) => !cargoOk(c)));
    } catch (erro) {
      if ((erro as Error).name !== "AbortError") setFalhou(true);
    } finally {
      if (controle.current === ac) setLendo(false);
    }
  }, [completo, inicial.escopo]);

  // O HTML vem do cache da CDN e pode ter alguns minutos: se estiver velho, relê na hora ao abrir.
  useEffect(() => {
    if (!encerrada(inicial) && Date.now() - Date.parse(inicial.lidoEm) > 30_000) void ler();
    // só na montagem
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Lê a cada minuto enquanto a aba está visível e a apuração está aberta; ao voltar para a aba, lê na hora.
  useEffect(() => {
    if (fim) return;
    const id = setInterval(() => {
      if (document.visibilityState === "visible") void ler();
    }, INTERVALO);
    const aoVoltar = () => {
      if (document.visibilityState === "visible") void ler();
    };
    document.addEventListener("visibilitychange", aoVoltar);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", aoVoltar);
    };
  }, [fim, ler]);

  // Quem pede a lista completa passa a receber ela nas próximas leituras.
  const pedirCompleto = useCallback(() => setCompleto(true), []);
  useEffect(() => {
    if (completo) void ler();
  }, [completo, ler]);

  useEffect(() => () => controle.current?.abort(), []);

  return { dados, falhou, lendo, atualizar: ler, completo, pedirCompleto };
}
