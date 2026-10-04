import { useDeferredValue, useState } from "react";
import { PRIMEIROS, type DefCargo } from "@/lib/apuracao/cargos";
import { fInt, fPct, horaCurta } from "@/lib/apuracao/formato";
import { fraseDoCargo } from "@/lib/apuracao/textos";
import { cargoOk, type Cargo, type CargoOk } from "@/lib/apuracao/tipos";
import { ListaCandidatos } from "./ListaCandidatos";
import { Medidor } from "./Medidor";
import { Resumo } from "./Resumo";

function andamento(ok: CargoOk | null, falhou: boolean) {
  if (!ok) return falhou ? "O TSE não respondeu para este cargo. Nova leitura em 1 minuto." : "Lendo os dados do TSE…";

  const base = `${fPct(ok.secoes.pct)} das seções totalizadas (${fInt(ok.secoes.totalizadas)} de ${fInt(ok.secoes.total)})`;
  const aviso = falhou ? " A última leitura falhou; esta é a anterior." : "";
  if (ok.encerrado) return `${base}. Apuração encerrada em Belém.${aviso}`;

  const hora = horaCurta(ok.totalizadoEm);
  return `${base}.${hora ? ` Última totalização às ${hora}.` : ""}${aviso}`;
}

interface Props {
  def: DefCargo;
  cargo: Cargo | undefined;
  aoPedirCompleto: () => void;
}

export function CargoSecao({ def, cargo, aoPedirCompleto }: Props) {
  const [busca, setBusca] = useState("");
  const [aberto, setAberto] = useState(false);
  const termo = useDeferredValue(busca);

  const ok = cargoOk(cargo) ? cargo : null;
  const falhou = (!!cargo && !cargoOk(cargo)) || !!ok?.desatualizado;
  const buscando = termo.trim() !== "";
  const faltam = !!ok && ok.candidatos.length < ok.totalCandidatos;

  return (
    <section id={def.id} className="min-w-0" aria-labelledby={`${def.id}-titulo`}>
      <Medidor pct={ok ? ok.secoes.pct : 0} rotulo={`Seções totalizadas para ${def.nome.toLowerCase()}`} />
      <div className="pb-3.5 pt-3">
        <h2 id={`${def.id}-titulo`} className="m-0 text-3xl font-extrabold leading-none tracking-tight">
          {def.nome}
        </h2>
        <p className={`mt-1.5 text-sm ${falhou ? "text-[#F08268]" : "text-zinc-400"}`}>{andamento(ok, falhou)}</p>
        <p className="mt-1 text-xs text-zinc-500">{def.vagas}.</p>
      </div>

      {ok && (
        <>
          {/* Frase pronta, em texto corrido: é o que leitores de tela, buscadores e IAs conseguem citar. */}
          <p className="mb-3 text-sm leading-relaxed text-zinc-300">{fraseDoCargo(ok)}</p>

          {def.longo && (
            <label className="mb-1.5 block">
              <input
                type="search"
                value={busca}
                onChange={(e) => {
                  setBusca(e.target.value);
                  aoPedirCompleto();
                }}
                placeholder="Buscar por nome, número ou partido"
                aria-label={`Buscar candidato a ${def.nome.toLowerCase()}`}
                autoComplete="off"
                className="w-full rounded-md border-[1.5px] border-white/15 bg-transparent px-3 py-2.5 text-base text-white placeholder:text-zinc-500 focus:border-white focus:outline-none focus-visible:outline-3 focus-visible:outline-[#EDAE00]"
              />
            </label>
          )}

          <ListaCandidatos candidatos={ok.candidatos} termo={termo} limite={def.longo && !aberto ? PRIMEIROS : undefined} absoluta={def.absoluta} />

          {def.longo && !buscando && ok.totalCandidatos > PRIMEIROS && (
            <button
              type="button"
              onClick={() => {
                setAberto(!aberto);
                if (!aberto) aoPedirCompleto();
              }}
              className="mt-1 w-full border-0 border-t border-white/10 bg-transparent py-3 text-left text-[0.9375rem] font-semibold underline decoration-[1.5px] underline-offset-4"
            >
              {aberto
                ? faltam
                  ? "Carregando a lista completa…"
                  : `Mostrar só os ${PRIMEIROS} mais votados`
                : `Mostrar todos os ${fInt(ok.totalCandidatos)} candidatos`}
            </button>
          )}

          <Resumo cargo={ok} />
        </>
      )}
    </section>
  );
}
