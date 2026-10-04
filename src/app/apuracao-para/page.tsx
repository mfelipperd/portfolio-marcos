import { metadataDaPagina, PaginaApuracao } from "@/components/Apuracao/Pagina";

export const revalidate = 20; // literal: o Next não aceita valor importado aqui (mesmo valor de REVALIDAR)
export const preferredRegion = "gru1";
export const maxDuration = 15;

export const generateMetadata = () => metadataDaPagina("para");

export default function Page() {
  return <PaginaApuracao id="para" />;
}
