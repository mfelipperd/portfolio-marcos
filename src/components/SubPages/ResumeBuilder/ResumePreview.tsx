import React from "react";
import { ResumeData } from "./types";

interface ResumePreviewProps {
  data: ResumeData;
  previewRef?: React.RefObject<HTMLDivElement | null>;
}

const formatPeriod = (
  startMonth: string,
  startYear: string,
  endMonth: string,
  endYear: string,
  current?: boolean
) => {
  const getMonthLabel = (m: string) => {
    const months: Record<string, string> = {
      "01": "Jan", "02": "Fev", "03": "Mar", "04": "Abr", "05": "Mai", "06": "Jun",
      "07": "Jul", "08": "Ago", "09": "Set", "10": "Out", "11": "Nov", "12": "Dez"
    };
    return months[m] || m;
  };

  const start = startMonth && startYear ? `${getMonthLabel(startMonth)}/${startYear}` : "";
  if (current) {
    return start ? `${start} - Atual` : "Atual";
  }
  const end = endMonth && endYear ? `${getMonthLabel(endMonth)}/${endYear}` : "";
  if (start && end) return `${start} - ${end}`;
  if (start) return start;
  if (end) return end;
  return "";
};

export default function ResumePreview({ data, previewRef }: ResumePreviewProps) {
  const { template, name, title, email, phone, address, summary, photoUrl, experiences, educations, skills, languages } = data;

  const renderMinimalist = () => (
    <div className="p-10 font-sans text-gray-800 bg-white h-full">
      <header className="border-b-2 border-gray-800 pb-6 mb-6 flex items-center gap-6">
        {photoUrl && (
          <img src={photoUrl} alt={name} className="w-24 h-24 rounded-full object-cover border border-gray-300" />
        )}
        <div>
          <h1 className="text-4xl font-bold text-gray-900 uppercase tracking-wider">{name || "Seu Nome"}</h1>
          {title && <div className="text-lg font-medium text-gray-700 mt-1">{title}</div>}
          <div className="text-sm text-gray-600 mt-2 flex flex-wrap gap-4">
            {email && <span>{email}</span>}
            {phone && <span>{phone}</span>}
            {address && <span>{address}</span>}
          </div>
        </div>
      </header>

      {summary && (
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 uppercase tracking-widest mb-2">Perfil Profissional</h2>
          <p className="text-gray-700 leading-relaxed text-sm">{summary}</p>
        </section>
      )}

      {experiences.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 uppercase tracking-widest mb-4">Experiência Profissional</h2>
          <div className="space-y-6">
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-gray-800">{exp.title}</h3>
                  <span className="text-sm text-gray-500">
                    {formatPeriod(exp.startMonth, exp.startYear, exp.endMonth, exp.endYear, exp.current)}
                  </span>
                </div>
                <div className="text-sm font-medium text-gray-600 mb-2">{exp.company}</div>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {educations.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 uppercase tracking-widest mb-4">Formação Acadêmica</h2>
          <div className="space-y-4">
            {educations.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <h3 className="font-bold text-gray-800">{edu.course}</h3>
                  <div className="text-sm text-gray-600">{edu.institution}</div>
                </div>
                <span className="text-sm text-gray-500">
                  {formatPeriod(edu.startMonth, edu.startYear, edu.endMonth, edu.endYear)}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills && skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 uppercase tracking-widest mb-3">Habilidades Técnicas</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, idx) => (
              <span key={idx} className="bg-gray-100 text-gray-800 text-xs px-2.5 py-1 rounded font-medium border border-gray-200">{skill}</span>
            ))}
          </div>
        </section>
      )}

      {languages && languages.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 uppercase tracking-widest mb-3">Idiomas</h2>
          <div className="flex flex-wrap gap-4 text-sm text-gray-700">
            {languages.map((lang, idx) => (
              <span key={idx} className="font-medium bg-gray-50 border border-gray-150 px-2 py-0.5 rounded">{lang}</span>
            ))}
          </div>
        </section>
      )}
    </div>
  );

  const renderModern = () => (
    <div className="flex h-full font-sans text-gray-800 bg-white">
      {/* Sidebar */}
      <aside className="w-1/3 bg-gray-100 p-8 flex flex-col gap-8 border-r border-gray-200">
        {photoUrl && (
          <img src={photoUrl} alt={name} className="w-32 h-32 rounded-full object-cover mx-auto shadow-md" />
        )}
        
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-300 pb-1">Contato</h2>
          <div className="text-sm text-gray-600 space-y-2 break-all">
            {email && <div><strong>E-mail:</strong><br/>{email}</div>}
            {phone && <div><strong>Telefone:</strong><br/>{phone}</div>}
            {address && <div><strong>Endereço:</strong><br/>{address}</div>}
          </div>
        </div>

        {educations.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-300 pb-1">Formação</h2>
            <div className="space-y-4 text-sm">
              {educations.map((edu) => (
                <div key={edu.id}>
                  <div className="font-bold text-gray-800">{edu.course}</div>
                  <div className="text-gray-600">{edu.institution}</div>
                  <div className="text-gray-500 text-xs">{formatPeriod(edu.startMonth, edu.startYear, edu.endMonth, edu.endYear)}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {skills && skills.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-300 pb-1">Habilidades</h2>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill, idx) => (
                <span key={idx} className="bg-gray-200 text-gray-800 text-xs px-2 py-0.5 rounded border border-gray-300">{skill}</span>
              ))}
            </div>
          </div>
        )}

        {languages && languages.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b border-gray-300 pb-1">Idiomas</h2>
            <div className="space-y-1 text-sm text-gray-700">
              {languages.map((lang, idx) => (
                <div key={idx} className="font-medium">{lang}</div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="w-2/3 p-8">
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">{name || "Seu Nome"}</h1>
          {title && <div className="text-lg font-medium text-gray-600 mt-1">{title}</div>}
        </header>

        {summary && (
          <section className="mb-8">
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b-2 border-gray-900 pb-1 mb-3">Sobre Mim</h2>
            <p className="text-gray-700 leading-relaxed text-sm">{summary}</p>
          </section>
        )}

        {experiences.length > 0 && (
          <section>
            <h2 className="text-sm font-bold text-gray-900 uppercase tracking-widest border-b-2 border-gray-900 pb-1 mb-4">Experiência</h2>
            <div className="space-y-6">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative pl-4 border-l-2 border-gray-200">
                  <div className="absolute w-2 h-2 bg-gray-900 rounded-full -left-[5px] top-1.5"></div>
                  <h3 className="font-bold text-gray-800 text-lg">{exp.title}</h3>
                  <div className="text-sm text-gray-500 mb-2">
                    {exp.company} • {formatPeriod(exp.startMonth, exp.startYear, exp.endMonth, exp.endYear, exp.current)}
                  </div>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );

  const renderExecutive = () => (
    <div className="p-12 font-serif text-gray-900 bg-white h-full">
      <header className="text-center mb-10">
        {photoUrl && (
          <img src={photoUrl} alt={name} className="w-20 h-20 mx-auto rounded-md object-cover mb-4 grayscale" />
        )}
        <h1 className="text-3xl font-bold uppercase tracking-widest mb-2">{name || "Seu Nome"}</h1>
        {title && <div className="text-sm font-semibold uppercase tracking-wider text-gray-700 mb-2">{title}</div>}
        <div className="text-sm text-gray-600 flex justify-center flex-wrap gap-x-4 gap-y-1">
          {address && <span>{address}</span>}
          {(address && (phone || email)) && <span>•</span>}
          {phone && <span>{phone}</span>}
          {(phone && email) && <span>•</span>}
          {email && <span>{email}</span>}
        </div>
      </header>

      {summary && (
        <section className="mb-8 text-center px-8">
          <p className="text-gray-800 leading-relaxed italic">{summary}</p>
        </section>
      )}

      {experiences.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold uppercase tracking-wider border-b border-gray-400 mb-4 text-center">Experiência Profissional</h2>
          <div className="space-y-6">
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-lg">{exp.title}</h3>
                  <span className="text-sm italic">
                    {formatPeriod(exp.startMonth, exp.startYear, exp.endMonth, exp.endYear, exp.current)}
                  </span>
                </div>
                <div className="text-md mb-2">{exp.company}</div>
                <p className="text-sm text-gray-700 whitespace-pre-wrap text-justify">{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {educations.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold uppercase tracking-wider border-b border-gray-400 mb-4 text-center">Formação Acadêmica</h2>
          <div className="space-y-4">
            {educations.map((edu) => (
              <div key={edu.id} className="flex justify-between items-baseline">
                <div>
                  <h3 className="font-bold">{edu.course}</h3>
                  <div className="text-sm">{edu.institution}</div>
                </div>
                <span className="text-sm italic">
                  {formatPeriod(edu.startMonth, edu.startYear, edu.endMonth, edu.endYear)}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {skills && skills.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold uppercase tracking-wider border-b border-gray-400 mb-4 text-center">Habilidades Técnicas</h2>
          <p className="text-sm text-gray-800 text-center leading-relaxed">
            {skills.join("   •   ")}
          </p>
        </section>
      )}

      {languages && languages.length > 0 && (
        <section className="mb-8">
          <h2 className="text-lg font-bold uppercase tracking-wider border-b border-gray-400 mb-4 text-center">Idiomas</h2>
          <p className="text-sm text-gray-850 text-center leading-relaxed font-semibold">
            {languages.join("   •   ")}
          </p>
        </section>
      )}
    </div>
  );

  return (
    <div 
      ref={previewRef} 
      // The fixed width/height below simulate an A4 paper for accurate PDF generation via html2pdf
      className="bg-white w-[210mm] min-h-[297mm] shadow-2xl mx-auto overflow-hidden relative box-border"
    >
      {template === "minimalist" && renderMinimalist()}
      {template === "modern" && renderModern()}
      {template === "executive" && renderExecutive()}
    </div>
  );
}
