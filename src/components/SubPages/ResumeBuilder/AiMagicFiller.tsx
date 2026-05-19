"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaRobot, FaTimes, FaCopy, FaCheck, FaMagic, FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { ResumeData } from "./types";

interface AiMagicFillerProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyData: (data: Partial<ResumeData> & { cep?: string }) => void;
}

export default function AiMagicFiller({ isOpen, onClose, onApplyData }: AiMagicFillerProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [rawText, setRawText] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [jsonInput, setJsonInput] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  // Estados da animação de processamento
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleGeneratePrompt = () => {
    const jobCustomizationText = jobDescription.trim()
      ? `\nAdicionalmente, estou aplicando para a seguinte vaga de emprego:
Descrição da Vaga de Trabalho / Requisitos:
"""
${jobDescription.trim()}
"""

INSTRUÇÃO DE PERSONALIZAÇÃO:
Por favor, analise a descrição da vaga acima e personalize o conteúdo do meu currículo (especialmente o resumo profissional 'summary' e a descrição das experiências 'description') de forma estratégica e ética. Destaque minhas habilidades, tecnologias e conquistas anteriores que são mais relevantes para essa oportunidade específica, garantindo que o currículo pareça feito sob medida para essa vaga.`
      : "";

    const prompt = `Atue como um Engenheiro de Inteligência Artificial e Especialista em Recrutamento e Otimização de ATS (Sistemas de Rastreamento de Candidatos, como a IA Gaia da Gupy que usa modelos baseados em Transformers e similaridade de cosseno de embeddings de sentenças).

Sua tarefa é organizar, otimizar e estruturar o currículo fornecido abaixo para maximizar a aderência semântica e facilitar o Reconhecimento de Entidades Nomeadas (NER) pelo parser do ATS.${jobCustomizationText}

INSTRUÇÕES DE ENGENHARIA LINGUÍSTICA E ESCRITA (ALINHADAS ÀS DIRETRIZES DO ATS GAIA):
1. **Estrutura de Experiências (Metodologia STAR)**:
   - Para cada cargo em "experiences", estruture a "description" sob a forma de tópicos (bullet points) usando a metodologia STAR (Situação-Problema, Tarefa/Meta, Ação Técnica com ferramentas/frameworks e Resultado Mensurável).
   - Inicie cada frase obrigatoriamente com verbos de ação fortes no pretérito perfeito (ex: "Desenvolveu...", "Liderou...", "Otimizou...", "Reduziu...", "Implementou...", "Projetou..."). Evite construções passivas ou gerúndios (ex: "Responsável por...", "Fazendo...").
   - Adicione ou sugira métricas de impacto quantitativas e resultados reais. Caso não tenha os dados exatos, inclua placeholders como "[X%]", "[R$ X]" ou "[X horas]" para que o usuário preencha.
2. **Prevenção de Spam de Palavras-Chave (Anti-Keyword Stuffing)**:
   - Não liste palavras-chave de forma desconexa nas experiências. Integre os termos técnicos de modo fluido e gramaticalmente natural nas descrições de atividades das experiências.
3. **Mapeamento de Entidades (Habilidades Técnicas e Idiomas)**:
   - Extraia e catalogue no campo "skills" as principais competências técnicas (hard skills) e tecnologias mais relevantes mencionadas ou inferidas nas experiências (máximo de 12 competências, ex: React, Node.js, TypeScript).
   - Catalogue no campo "languages" os idiomas indicados no formato "Idioma (Nível de Proficiência)" (ex: "Inglês (Avançado)", "Espanhol (Intermediário)").

Minhas Informações Brutas:
"""
${rawText}
"""

A estrutura do JSON retornado DEVE seguir rigorosamente este esquema:
{
  "name": "Nome Completo",
  "title": "Profissão ou Cargo Principal",
  "email": "E-mail",
  "phone": "Telefone com DDD",
  "cep": "CEP se disponível (apenas números ou no formato 12345-678)",
  "address": "Cidade/Estado (Exemplo: São Paulo/SP)",
  "summary": "Resumo profissional de alto impacto focado em resultados semânticos para o cargo (máximo de 4 linhas)",
  "experiences": [
    {
      "title": "Cargo",
      "company": "Empresa",
      "startMonth": "Mês de início (formato MM, ex: 01, 02)",
      "startYear": "Ano de início (formato AAAA)",
      "endMonth": "Mês de término (formato MM) ou vazio se for emprego atual",
      "endYear": "Ano de término (formato AAAA) ou vazio se for emprego atual",
      "current": true ou false (true se for o emprego atual, false caso contrário)",
      "description": "Escreva em formato de bullet points. Cada bullet point deve descrever a situação/desafio, a ação técnica executada com ferramentas e o impacto/resultado mensurável gerado (utilize placeholders como [X%], [R$ X] ou [X horas]). Use verbos de ação fortes no início de cada frase."
    }
  ],
  "educations": [
    {
      "course": "Curso, Graduação ou Especialização",
      "institution": "Instituição de Ensino",
      "startMonth": "Mês de início (formato MM)",
      "startYear": "Ano de início (formato AAAA)",
      "endMonth": "Mês de término (formato MM)",
      "endYear": "Ano de término (formato AAAA)"
    }
  ],
  "skills": ["Habilidade/Tecnologia 1", "Habilidade/Tecnologia 2", "etc."],
  "languages": ["Idioma 1 (Proficiência)", "etc."]
}

REGRA DE RETORNO:
Retorne o JSON acima obrigatoriamente dentro de um bloco de código markdown (utilizando três crases e o identificador 'json'), sem qualquer texto adicional de introdução ou conclusão.
Exemplo de retorno esperado:
\`\`\`json
{
  "name": "...",
  "title": "..."
}
\`\`\``;
    setGeneratedPrompt(prompt);
    setStep(2);
  };

  const handleParseAndApply = () => {
    try {
      setError("");
      let rawInput = jsonInput.trim();

      // Extrai robustamente o conteúdo de dentro de qualquer bloco de código markdown ``` (json, text, base64 ou sem tipo)
      if (rawInput.includes("```")) {
        const match = rawInput.match(/```[a-zA-Z0-9]*([\s\S]*?)```/);
        if (match && match[1]) {
          rawInput = match[1].trim();
        } else {
          rawInput = rawInput.replace(/```[a-zA-Z0-9]*/g, "").replace(/```/g, "").trim();
        }
      }
      
      let cleanInput = rawInput.replace(/\s/g, "");
      let parsed: any = null;
      let isBase64 = false;

      // Verifica se o input é JSON direto
      if (rawInput.startsWith("{") || rawInput.startsWith("[")) {
        try {
          parsed = JSON.parse(rawInput);
        } catch (e) {
          throw new Error("JSON inválido. Verifique se o conteúdo colado contém as chaves { } corretamente.");
        }
      } else {
        // Fallback: Tenta decodificar como base64 caso o usuário tenha gerado base64 anteriormente
        try {
          const decoded = atob(cleanInput);
          parsed = JSON.parse(decoded);
          isBase64 = true;
        } catch (e) {
          try {
            let cleanBase64 = cleanInput;
            if (cleanBase64.startsWith("data:") && cleanBase64.includes("base64,")) {
              cleanBase64 = cleanBase64.split("base64,")[1];
            }
            const decoded = atob(cleanBase64);
            parsed = JSON.parse(decoded);
            isBase64 = true;
          } catch (e2) {
            throw new Error("Não foi possível processar os dados. Cole o bloco de código JSON retornado pela IA.");
          }
        }
      }

      if (!parsed || typeof parsed !== "object") {
        throw new Error("Dados resultantes inválidos ou vazios.");
      }

      // Adicionando IDs e tratando os booleanos/nulos para experiências
      const formattedExperiences = Array.isArray(parsed.experiences) 
        ? parsed.experiences.map((exp: any) => ({
            id: crypto.randomUUID(),
            title: exp.title || "",
            company: exp.company || "",
            startMonth: exp.startMonth || "01",
            startYear: exp.startYear || new Date().getFullYear().toString(),
            endMonth: exp.endMonth || "12",
            endYear: exp.endYear || new Date().getFullYear().toString(),
            current: !!exp.current,
            description: exp.description || ""
          }))
        : [];
        
      // Adicionando IDs para educações
      const formattedEducations = Array.isArray(parsed.educations) 
        ? parsed.educations.map((edu: any) => ({
            id: crypto.randomUUID(),
            course: edu.course || "",
            institution: edu.institution || "",
            startMonth: edu.startMonth || "01",
            startYear: edu.startYear || new Date().getFullYear().toString(),
            endMonth: edu.endMonth || "12",
            endYear: edu.endYear || new Date().getFullYear().toString()
          }))
        : [];

      // Dispara a animação de processamento
      setIsProcessing(true);
      setProgress(0);

      const duration = 2000; // 2 segundos
      const intervalTime = 40;
      const stepValue = 100 / (duration / intervalTime);
      let currentProgress = 0;

      const progressInterval = setInterval(() => {
        currentProgress += stepValue;
        if (currentProgress >= 100) {
          currentProgress = 100;
          clearInterval(progressInterval);
        }
        setProgress(Math.round(currentProgress));
      }, intervalTime);

      setTimeout(() => {
        setIsProcessing(false);
        onApplyData({
          name: parsed.name || "",
          title: parsed.title || "",
          email: parsed.email || "",
          phone: parsed.phone || "",
          address: parsed.address || "",
          summary: parsed.summary || "",
          experiences: formattedExperiences,
          educations: formattedEducations,
          skills: Array.isArray(parsed.skills) ? parsed.skills : [],
          languages: Array.isArray(parsed.languages) ? parsed.languages : [],
          cep: parsed.cep || "",
        });

        // Limpa estados
        setRawText("");
        setJobDescription("");
        setJsonInput("");
        setStep(1);
        onClose();
      }, duration + 250);

    } catch (err: any) {
      setError(err.message || "Não foi possível processar. Verifique se o formato retornado está correto.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-zinc-900 border border-white/10 w-full max-w-2xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600/20 text-blue-400 p-2 rounded-lg">
              <FaRobot size={20} />
            </div>
            <h2 className="text-xl font-bold text-white">Preenchimento Mágico com IA</h2>
          </div>
          <button 
            onClick={onClose} 
            disabled={isProcessing}
            title="Fechar modal" 
            className="text-zinc-500 hover:text-white transition-colors p-2 disabled:opacity-30 disabled:pointer-events-none"
          >
            <FaTimes size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
          {/* Progress Indicator */}
          <div className="flex justify-between items-center mb-6 bg-zinc-850 p-3 rounded-lg border border-white/5 font-medium">
            <div className={`flex items-center gap-2 text-sm ${step === 1 ? 'text-blue-400 font-bold' : 'text-zinc-500'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === 1 ? 'bg-blue-600 text-white font-bold' : 'bg-zinc-800 text-zinc-500'}`}>1</span>
              Texto Bruto
            </div>
            <div className="h-px bg-white/10 flex-1 mx-4"></div>
            <div className={`flex items-center gap-2 text-sm ${step === 2 ? 'text-blue-400 font-bold' : 'text-zinc-500'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === 2 ? 'bg-blue-600 text-white font-bold' : 'bg-zinc-800 text-zinc-500'}`}>2</span>
              Copiar Prompt
            </div>
            <div className="h-px bg-white/10 flex-1 mx-4"></div>
            <div className={`flex items-center gap-2 text-sm ${step === 3 ? 'text-blue-400 font-bold' : 'text-zinc-500'}`}>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${step === 3 ? 'bg-blue-600 text-white font-bold' : 'bg-zinc-800 text-zinc-500'}`}>3</span>
              Colar JSON
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-4">
              <p className="text-sm text-zinc-400">
                Cole abaixo suas informações profissionais brutas e, se desejar, a descrição da vaga para a qual deseja se candidatar. O prompt gerado irá guiar a IA na personalização do seu currículo.
              </p>
              
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
                  1. Minhas Informações Profissionais (Bruto/Rascunho) <span className="text-blue-500">*</span>
                </label>
                <textarea 
                  value={rawText}
                  onChange={(e) => setRawText(e.target.value)}
                  aria-label="Texto profissional bruto"
                  placeholder="Ex: Meu nome é Marcos, sou Dev React. Trabalhei na Empresa Tech de 2021 a 2024 fazendo sites. Fiz faculdade de ADS na Fatec de 2018 a 2021..."
                  className="w-full h-36 bg-black/50 border border-white/10 rounded-lg p-4 text-sm text-zinc-300 resize-none focus:outline-none focus:border-blue-500/50 transition-colors custom-scrollbar"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider block">
                  2. Descrição da Vaga de Trabalho (Opcional - para personalização)
                </label>
                <textarea 
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  aria-label="Descrição da vaga de trabalho"
                  placeholder="Cole aqui a descrição da vaga, requisitos, responsabilidades ou competências desejadas para que a IA adapte o currículo especificamente para essa oportunidade..."
                  className="w-full h-28 bg-black/50 border border-white/10 rounded-lg p-4 text-sm text-zinc-300 resize-none focus:outline-none focus:border-blue-500/50 transition-colors custom-scrollbar"
                />
              </div>

              <div className="flex justify-end pt-2">
                <button 
                  disabled={!rawText.trim()}
                  onClick={handleGeneratePrompt}
                  className="bg-white text-black hover:bg-zinc-200 disabled:opacity-50 px-6 py-3 rounded-md font-bold text-sm flex items-center gap-2 transition-colors"
                >
                  Gerar Prompt Customizado <FaArrowRight />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6 py-6 text-center">
              <div className="mx-auto w-16 h-16 bg-blue-600/10 text-blue-400 rounded-full flex items-center justify-center mb-2">
                <FaCopy size={28} />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-white">Prompt pronto para cópia!</h3>
                <p className="text-sm text-zinc-400 max-w-md mx-auto">
                  O prompt estruturado com suas informações foi gerado. Clique no botão abaixo para copiar e enviar para sua inteligência artificial preferida (ChatGPT, Gemini ou Claude).
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                <button 
                  onClick={() => setStep(1)}
                  className="border border-white/10 text-zinc-300 hover:text-white px-6 py-3 rounded-md text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <FaArrowLeft /> Voltar
                </button>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText(generatedPrompt);
                    setCopied(true);
                    setTimeout(() => {
                      setCopied(false);
                      setStep(3);
                    }, 1000);
                  }}
                  className="bg-white text-black hover:bg-zinc-200 px-8 py-3 rounded-md font-bold text-sm flex items-center justify-center gap-2 transition-colors min-w-[240px]"
                >
                  {copied ? (
                    <>
                      <FaCheck className="text-green-600" /> Copiado! Avançando...
                    </>
                  ) : (
                    <>
                      <FaCopy /> Copiar Prompt e Ir para o Passo 3
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              {isProcessing ? (
                <div className="bg-black/40 border border-white/5 rounded-lg p-8 h-64 flex flex-col justify-center items-center space-y-6">
                  <div className="relative w-20 h-20 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                      <circle 
                        cx="50" 
                        cy="50" 
                        r="40" 
                        className="stroke-white/5 fill-none" 
                        strokeWidth="8" 
                      />
                      <circle 
                        cx="50" 
                        cy="50" 
                        r="40" 
                        className="stroke-blue-500 fill-none transition-all duration-150 ease-out" 
                        strokeWidth="8" 
                        strokeDasharray="251.2"
                        strokeDashoffset={251.2 - (251.2 * progress) / 100}
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="absolute text-lg font-bold text-white font-mono">{progress}%</span>
                  </div>
                  
                  <div className="text-center space-y-1">
                    <p className="text-sm font-semibold text-white">Processando dados do currículo</p>
                    <p className="text-xs text-zinc-500">Aguarde enquanto os campos são preenchidos...</p>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-sm text-zinc-400">
                    Cole a resposta em JSON gerada pela inteligência artificial abaixo para realizar o preenchimento automático.
                  </p>
                  
                  <textarea 
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    aria-label="JSON retornado da IA"
                    placeholder="Cole o bloco de código JSON aqui..."
                    className="w-full h-64 bg-black/50 border border-white/10 rounded-lg p-4 text-sm text-zinc-300 resize-none font-mono focus:outline-none focus:border-blue-500/50 transition-colors custom-scrollbar"
                  />

                  {error && (
                    <div className="p-3 bg-red-900/30 border border-red-500/30 rounded-lg text-red-400 text-xs font-medium">
                      {error}
                    </div>
                  )}

                  <div className="flex justify-between pt-2">
                    <button 
                      onClick={() => setStep(2)}
                      className="text-zinc-400 hover:text-white px-4 py-2 rounded-md text-sm transition-colors flex items-center gap-2"
                    >
                      <FaArrowLeft /> Voltar
                    </button>
                    <button 
                      onClick={handleParseAndApply}
                      disabled={!jsonInput.trim()}
                      className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 text-white px-6 py-3 rounded-md font-bold text-sm flex items-center gap-2 transition-colors"
                    >
                      <FaMagic /> Processar e Preencher
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
