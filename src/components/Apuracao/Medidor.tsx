export function Medidor({ pct, rotulo }: { pct: number; rotulo: string }) {
  const valor = Math.max(0, Math.min(100, pct));

  return (
    <div
      className="h-2 w-full bg-white/10"
      role="progressbar"
      aria-label={rotulo}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(valor)}
    >
      <span className="block h-full bg-[#EDAE00] transition-[width] duration-700 ease-out motion-reduce:transition-none" style={{ width: `${valor}%` }} />
    </div>
  );
}
