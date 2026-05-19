"use client";

import React, { ChangeEvent } from "react";
import { ResumeData, Experience, Education } from "./types";
import { FaTrash, FaPlus, FaImage, FaMagic } from "react-icons/fa";
import AiMagicFiller from "./AiMagicFiller";

const MONTHS = [
  { value: "01", label: "Jan" },
  { value: "02", label: "Fev" },
  { value: "03", label: "Mar" },
  { value: "04", label: "Abr" },
  { value: "05", label: "Mai" },
  { value: "06", label: "Jun" },
  { value: "07", label: "Jul" },
  { value: "08", label: "Ago" },
  { value: "09", label: "Set" },
  { value: "10", label: "Out" },
  { value: "11", label: "Nov" },
  { value: "12", label: "Dez" },
];

const YEARS = Array.from({ length: 60 }, (_, i) => (new Date().getFullYear() - i).toString());

const maskPhone = (value: string) => {
  const raw = value.replace(/\D/g, "");
  const trimmed = raw.slice(0, 11);
  if (trimmed.length <= 2) {
    return trimmed.length > 0 ? `(${trimmed}` : "";
  }
  if (trimmed.length <= 6) {
    return `(${trimmed.slice(0, 2)}) ${trimmed.slice(2)}`;
  }
  if (trimmed.length <= 10) {
    return `(${trimmed.slice(0, 2)}) ${trimmed.slice(2, 6)}-${trimmed.slice(6)}`;
  }
  return `(${trimmed.slice(0, 2)}) ${trimmed.slice(2, 7)}-${trimmed.slice(7)}`;
};

interface ResumeFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export default function ResumeForm({ data, onChange }: ResumeFormProps) {
  const [isAiModalOpen, setIsAiModalOpen] = React.useState(false);
  const [cep, setCep] = React.useState("");
  const [highlightMissing, setHighlightMissing] = React.useState(false);

  const getInputClass = (val: string, extraClasses = "") => {
    const isMissing = highlightMissing && (!val || val.trim() === "");
    return `bg-zinc-900/50 border transition-all outline-none ${
      isMissing 
        ? "border-amber-500/70 shadow-[0_0_10px_rgba(245,158,11,0.2)] focus:border-amber-500" 
        : "border-white/10 focus:border-white/50"
    } ${extraClasses}`;
  };

  const updateField = (field: keyof ResumeData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const handleCepChange = async (e: ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, "");
    if (val.length > 8) val = val.slice(0, 8);
    let masked = val;
    if (val.length > 5) {
      masked = `${val.slice(0, 5)}-${val.slice(5)}`;
    }
    setCep(masked);

    if (val.length === 8) {
      try {
        const res = await fetch(`https://viacep.com.br/ws/${val}/json/`);
        const json = await res.json();
        if (!json.erro) {
          const addressParts = [];
          if (json.logradouro) addressParts.push(json.logradouro);
          if (json.bairro) addressParts.push(json.bairro);
          if (json.localidade) addressParts.push(json.localidade);
          if (json.uf) addressParts.push(json.uf);
          updateField("address", addressParts.join(", "));
        }
      } catch (err) {
        console.error("Erro ao buscar CEP", err);
      }
    }
  };

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateField("photoUrl", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Experiences
  const addExperience = () => {
    const newExp: Experience = {
      id: crypto.randomUUID(),
      title: "",
      company: "",
      startMonth: "01",
      startYear: new Date().getFullYear().toString(),
      endMonth: "12",
      endYear: new Date().getFullYear().toString(),
      current: false,
      description: "",
    };
    updateField("experiences", [...data.experiences, newExp]);
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    const newExps = data.experiences.map((exp) =>
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    updateField("experiences", newExps);
  };

  const removeExperience = (id: string) => {
    updateField(
      "experiences",
      data.experiences.filter((exp) => exp.id !== id)
    );
  };

  // Educations
  const addEducation = () => {
    const newEdu: Education = {
      id: crypto.randomUUID(),
      course: "",
      institution: "",
      startMonth: "01",
      startYear: new Date().getFullYear().toString(),
      endMonth: "12",
      endYear: new Date().getFullYear().toString(),
    };
    updateField("educations", [...data.educations, newEdu]);
  };

  const updateEducation = (id: string, field: keyof Education, value: any) => {
    const newEdus = data.educations.map((edu) =>
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    updateField("educations", newEdus);
  };

  const removeEducation = (id: string) => {
    updateField(
      "educations",
      data.educations.filter((edu) => edu.id !== id)
    );
  };

  const handleApplyAiData = (aiData: Partial<ResumeData> & { cep?: string }) => {
    // Check if any critical field is missing
    const hasMissing = 
      !aiData.name || 
      !aiData.title || 
      !aiData.email || 
      !aiData.phone || 
      !aiData.address || 
      !aiData.summary || 
      !aiData.experiences || 
      aiData.experiences.length === 0 ||
      aiData.experiences.some((exp) => !exp.title || !exp.company || !exp.description) ||
      !aiData.educations || 
      aiData.educations.length === 0 ||
      aiData.educations.some((edu) => !edu.course || !edu.institution);

    if (hasMissing) {
      setHighlightMissing(true);
    } else {
      setHighlightMissing(false);
    }

    const rawCep = aiData.cep ? aiData.cep.replace(/\D/g, "") : "";
    if (rawCep.length === 8) {
      const formattedCep = `${rawCep.slice(0, 5)}-${rawCep.slice(5)}`;
      setCep(formattedCep);

      fetch(`https://viacep.com.br/ws/${rawCep}/json/`)
        .then((res) => res.json())
        .then((json) => {
          let addressVal = aiData.address || "";
          if (!json.erro) {
            const addressParts = [];
            if (json.logradouro) addressParts.push(json.logradouro);
            if (json.bairro) addressParts.push(json.bairro);
            if (json.localidade) addressParts.push(json.localidade);
            if (json.uf) addressParts.push(json.uf);
            addressVal = addressParts.join(", ");
          }
          onChange({ ...data, ...aiData, address: addressVal });
        })
        .catch((err) => {
          console.error("Erro ao buscar CEP da IA", err);
          onChange({ ...data, ...aiData });
        });
    } else {
      onChange({ ...data, ...aiData });
    }
  };

  return (
    <div className="flex flex-col gap-6 sm:gap-8 text-white pb-20">
      
      {/* AI Button */}
      <button
        onClick={() => setIsAiModalOpen(true)}
        className="w-full bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white p-4 rounded-lg flex items-center justify-center gap-3 font-bold transition-all shadow-lg hover:shadow-blue-500/25"
      >
        <FaMagic className="text-xl" /> 
        Preenchimento Mágico com IA
      </button>

      {highlightMissing && (
        <div className="bg-amber-600/20 border border-amber-500/30 p-4 rounded-lg flex items-center justify-between text-amber-300 text-sm shadow-md animate-fade-in shrink-0">
          <div>
            <span className="font-bold">⚠️ Preenchimento concluído!</span> Alguns campos não puderam ser preenchidos pela IA e foram destacados em laranja. Por favor, complete-os manualmente.
          </div>
          <button
            onClick={() => setHighlightMissing(false)}
            className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-3 py-1.5 rounded text-xs transition-colors shrink-0 ml-4"
          >
            Entendido
          </button>
        </div>
      )}

      {/* Personal Info */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold border-b border-white/10 pb-2">1. Dados Pessoais</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Nome Completo"
            className={getInputClass(data.name, "w-full p-3 rounded-md text-base")}
            value={data.name}
            onChange={(e) => updateField("name", e.target.value)}
          />
          <input
            type="text"
            placeholder="Profissão / Título"
            className={getInputClass(data.title, "w-full p-3 rounded-md text-base")}
            value={data.title}
            onChange={(e) => updateField("title", e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="E-mail"
            className={getInputClass(data.email, "w-full p-3 rounded-md text-base")}
            value={data.email}
            onChange={(e) => updateField("email", e.target.value)}
          />
          <input
            type="text"
            placeholder="Telefone"
            className={getInputClass(data.phone, "w-full p-3 rounded-md text-base")}
            value={data.phone}
            onChange={(e) => updateField("phone", maskPhone(e.target.value))}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="CEP (Preenchimento Automático)"
            maxLength={9}
            className="w-full bg-zinc-900/50 border border-white/10 p-3 rounded-md focus:border-white/50 outline-none transition-colors"
            value={cep}
            onChange={handleCepChange}
          />
          <input
            type="text"
            placeholder="Endereço / Cidade"
            className={getInputClass(data.address, "w-full p-3 rounded-md text-base md:col-span-2")}
            value={data.address}
            onChange={(e) => updateField("address", e.target.value)}
          />
        </div>
        <textarea
          placeholder="Resumo Profissional"
          className={getInputClass(data.summary, "w-full p-3 rounded-md text-base h-24 resize-none")}
          value={data.summary}
          onChange={(e) => updateField("summary", e.target.value)}
        />
      </section>

      {/* Photo Upload */}
      <section className="space-y-4">
        <h3 className="text-xl font-semibold border-b border-white/10 pb-2">2. Foto de Perfil</h3>
        <div className="flex items-center gap-4">
          {data.photoUrl ? (
            <div className="relative w-20 h-20 rounded-full overflow-hidden border border-white/20">
              <img src={data.photoUrl} alt="Preview" className="w-full h-full object-cover" />
              <button
                onClick={() => updateField("photoUrl", null)}
                className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
                title="Remover foto"
                aria-label="Remover foto"
              >
                <FaTrash className="text-white" />
              </button>
            </div>
          ) : (
            <div className="w-20 h-20 rounded-full border border-dashed border-white/20 flex items-center justify-center text-zinc-500 bg-zinc-900/50">
              <FaImage size={24} />
            </div>
          )}
          <label className="cursor-pointer bg-zinc-800 hover:bg-zinc-700 px-4 py-2 rounded-md transition-colors text-sm font-medium">
            Escolher Foto
            <input type="file" accept="image/*" className="hidden" onChange={handlePhotoUpload} />
          </label>
        </div>
      </section>

      {/* Experiences */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <h3 className="text-xl font-semibold">3. Experiências</h3>
          <button onClick={addExperience} className="text-sm bg-white/10 hover:bg-white/20 p-2 rounded-md transition-colors flex items-center gap-2">
            <FaPlus size={12} /> Adicionar
          </button>
        </div>
        
        {data.experiences.map((exp, idx) => (
          <div key={exp.id} className="p-4 border border-white/5 bg-zinc-900/30 rounded-md space-y-3 relative group">
            <button 
              onClick={() => removeExperience(exp.id)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
              title="Remover experiência"
              aria-label="Remover experiência"
            >
              <FaTrash size={14} />
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-8">
              <input
                type="text"
                placeholder="Cargo"
                className={getInputClass(exp.title, "w-full p-2 rounded-md text-sm")}
                value={exp.title}
                onChange={(e) => updateExperience(exp.id, "title", e.target.value)}
              />
              <input
                type="text"
                placeholder="Empresa"
                className={getInputClass(exp.company, "w-full p-2 rounded-md text-sm")}
                value={exp.company}
                onChange={(e) => updateExperience(exp.id, "company", e.target.value)}
              />
              
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 items-center md:col-span-2">
                <div className="flex flex-col gap-1 col-span-2">
                  <span className="text-xs text-zinc-500 font-medium">Início</span>
                  <div className="flex gap-2">
                    <select
                      aria-label="Mês de início"
                      className="w-1/2 bg-zinc-900 border border-white/10 p-2 rounded-md text-sm outline-none focus:border-white/50"
                      value={exp.startMonth || "01"}
                      onChange={(e) => updateExperience(exp.id, "startMonth", e.target.value)}
                    >
                      {MONTHS.map(m => <option key={m.value} value={m.value} className="bg-zinc-900">{m.label}</option>)}
                    </select>
                    <select
                      aria-label="Ano de início"
                      className="w-1/2 bg-zinc-900 border border-white/10 p-2 rounded-md text-sm outline-none focus:border-white/50"
                      value={exp.startYear || YEARS[0]}
                      onChange={(e) => updateExperience(exp.id, "startYear", e.target.value)}
                    >
                      {YEARS.map(y => <option key={y} value={y} className="bg-zinc-900">{y}</option>)}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1 col-span-2">
                  <span className="text-xs text-zinc-500 font-medium">Término</span>
                  <div className="flex gap-2">
                    <select
                      aria-label="Mês de término"
                      disabled={exp.current}
                      className="w-1/2 bg-zinc-900 border border-white/10 p-2 rounded-md text-sm outline-none focus:border-white/50 disabled:opacity-50"
                      value={exp.endMonth || "12"}
                      onChange={(e) => updateExperience(exp.id, "endMonth", e.target.value)}
                    >
                      {MONTHS.map(m => <option key={m.value} value={m.value} className="bg-zinc-900">{m.label}</option>)}
                    </select>
                    <select
                      aria-label="Ano de término"
                      disabled={exp.current}
                      className="w-1/2 bg-zinc-900 border border-white/10 p-2 rounded-md text-sm outline-none focus:border-white/50 disabled:opacity-50"
                      value={exp.endYear || YEARS[0]}
                      onChange={(e) => updateExperience(exp.id, "endYear", e.target.value)}
                    >
                      {YEARS.map(y => <option key={y} value={y} className="bg-zinc-900">{y}</option>)}
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-5 sm:justify-center">
                  <input
                    type="checkbox"
                    id={`current-${exp.id}`}
                    checked={exp.current || false}
                    onChange={(e) => updateExperience(exp.id, "current", e.target.checked)}
                    className="rounded border-white/10 text-blue-600 focus:ring-0 focus:ring-offset-0 bg-zinc-900 w-4 h-4 cursor-pointer"
                  />
                  <label htmlFor={`current-${exp.id}`} className="text-xs text-zinc-400 cursor-pointer select-none">Atual</label>
                </div>
              </div>

              <textarea
                placeholder="Descrição das atividades"
                className={getInputClass(exp.description, "w-full p-2 rounded-md text-sm h-20 resize-none md:col-span-2")}
                value={exp.description}
                onChange={(e) => updateExperience(exp.id, "description", e.target.value)}
              />
            </div>
          </div>
        ))}
        {data.experiences.length === 0 && (
          <p className="text-zinc-500 text-sm italic">Nenhuma experiência adicionada.</p>
        )}
      </section>

      {/* Education */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <h3 className="text-xl font-semibold">4. Formação Acadêmica / Cursos</h3>
          <button onClick={addEducation} className="text-sm bg-white/10 hover:bg-white/20 p-2 rounded-md transition-colors flex items-center gap-2">
            <FaPlus size={12} /> Adicionar
          </button>
        </div>
        
        {data.educations.map((edu, idx) => (
          <div key={edu.id} className="p-4 border border-white/5 bg-zinc-900/30 rounded-md space-y-3 relative group">
            <button 
              onClick={() => removeEducation(edu.id)}
              className="absolute top-4 right-4 text-zinc-500 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100"
              title="Remover formação"
              aria-label="Remover formação"
            >
              <FaTrash size={14} />
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pr-8">
              <input
                type="text"
                placeholder="Curso / Formação"
                className={getInputClass(edu.course, "w-full p-2 rounded-md text-sm md:col-span-2")}
                value={edu.course}
                onChange={(e) => updateEducation(edu.id, "course", e.target.value)}
              />
              <input
                type="text"
                placeholder="Instituição"
                className={getInputClass(edu.institution, "w-full p-2 rounded-md text-sm")}
                value={edu.institution}
                onChange={(e) => updateEducation(edu.id, "institution", e.target.value)}
              />
              
              <div className="grid grid-cols-2 gap-3 md:col-span-2">
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-zinc-500 font-medium">Início</span>
                  <div className="flex gap-2">
                    <select
                      aria-label="Mês de início"
                      className="w-1/2 bg-zinc-900 border border-white/10 p-2 rounded-md text-sm outline-none focus:border-white/50"
                      value={edu.startMonth || "01"}
                      onChange={(e) => updateEducation(edu.id, "startMonth", e.target.value)}
                    >
                      {MONTHS.map(m => <option key={m.value} value={m.value} className="bg-zinc-900">{m.label}</option>)}
                    </select>
                    <select
                      aria-label="Ano de início"
                      className="w-1/2 bg-zinc-900 border border-white/10 p-2 rounded-md text-sm outline-none focus:border-white/50"
                      value={edu.startYear || YEARS[0]}
                      onChange={(e) => updateEducation(edu.id, "startYear", e.target.value)}
                    >
                      {YEARS.map(y => <option key={y} value={y} className="bg-zinc-900">{y}</option>)}
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-xs text-zinc-500 font-medium">Término</span>
                  <div className="flex gap-2">
                    <select
                      aria-label="Mês de término"
                      className="w-1/2 bg-zinc-900 border border-white/10 p-2 rounded-md text-sm outline-none focus:border-white/50"
                      value={edu.endMonth || "12"}
                      onChange={(e) => updateEducation(edu.id, "endMonth", e.target.value)}
                    >
                      {MONTHS.map(m => <option key={m.value} value={m.value} className="bg-zinc-900">{m.label}</option>)}
                    </select>
                    <select
                      aria-label="Ano de término"
                      className="w-1/2 bg-zinc-900 border border-white/10 p-2 rounded-md text-sm outline-none focus:border-white/50"
                      value={edu.endYear || YEARS[0]}
                      onChange={(e) => updateEducation(edu.id, "endYear", e.target.value)}
                    >
                      {YEARS.map(y => <option key={y} value={y} className="bg-zinc-900">{y}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        {data.educations.length === 0 && (
          <p className="text-zinc-500 text-sm italic">Nenhuma formação adicionada.</p>
        )}
      </section>

      <AiMagicFiller 
        isOpen={isAiModalOpen} 
        onClose={() => setIsAiModalOpen(false)} 
        onApplyData={handleApplyAiData} 
      />

    </div>
  );
}
