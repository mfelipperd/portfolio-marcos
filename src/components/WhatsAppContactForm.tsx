'use client';

import { useState, FormEvent } from 'react';
import { FaWhatsapp, FaPaperPlane } from 'react-icons/fa';

interface FormData {
  name: string;
  email: string;
  phone: string;
  projectType: string;
  message: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const sendToWhatsApp = (e: FormEvent) => {
    e.preventDefault();
    
    // Número do WhatsApp (você precisa atualizar no .env.local)
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5511999999999';
    
    // Montar mensagem
    const message = `👋 *Novo Contato do Portfólio*

👤 *Nome:* ${formData.name}
📧 *Email:* ${formData.email}
📱 *WhatsApp:* ${formData.phone || 'Não informado'}
💼 *Assunto:* ${formData.projectType || 'Não especificado'}

💬 *Mensagem:*
${formData.message}

---
_Enviado através do portfólio_`;

    // Criar URL do WhatsApp
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    
    // Abrir WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Limpar formulário
    setFormData({
      name: '',
      email: '',
      phone: '',
      projectType: '',
      message: '',
    });
  };

  const sendDirectToWhatsApp = () => {
    const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '5511999999999';
    const defaultMessage = process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE || 'Olá! Vim através do seu portfólio e gostaria de conversar.';
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(defaultMessage)}`;
    window.open(whatsappURL, '_blank');
  };

  return (
    <div className="space-y-6">
      <form onSubmit={sendToWhatsApp} className="space-y-4">
        <div>
          <input 
            type="text" 
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Seu nome completo" 
            className="w-full p-4 rounded-lg border border-purple-700/40 bg-black/30 text-purple-100 placeholder-purple-400 focus:border-purple-400 focus:outline-none transition" 
            required 
          />
        </div>
        
        <div>
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Seu melhor e-mail" 
            className="w-full p-4 rounded-lg border border-purple-700/40 bg-black/30 text-purple-100 placeholder-purple-400 focus:border-purple-400 focus:outline-none transition" 
            required 
          />
        </div>
        
        <div>
          <input 
            type="tel" 
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            placeholder="Seu WhatsApp (opcional)" 
            className="w-full p-4 rounded-lg border border-purple-700/40 bg-black/30 text-purple-100 placeholder-purple-400 focus:border-purple-400 focus:outline-none transition" 
          />
        </div>
        
        <div>
          <select 
            name="projectType"
            value={formData.projectType}
            onChange={handleInputChange}
            className="w-full p-4 rounded-lg border border-purple-700/40 bg-black/30 text-purple-100 focus:border-purple-400 focus:outline-none transition"
          >
            <option value="">Assunto (opcional)</option>
            <option value="Oportunidade de Trabalho">Oportunidade de Trabalho</option>
            <option value="Colaboração em Projeto">Colaboração em Projeto</option>
            <option value="Dúvida Técnica">Dúvida Técnica</option>
            <option value="Networking">Networking</option>
            <option value="Outro">Outro</option>
          </select>
        </div>
        
        <div>
          <textarea 
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Conte-me sobre o que você gostaria de conversar..." 
            className="w-full p-4 rounded-lg border border-purple-700/40 bg-black/30 text-purple-100 placeholder-purple-400 focus:border-purple-400 focus:outline-none transition h-32 resize-none" 
            required 
          />
        </div>
        
        <button 
          type="submit" 
          className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold text-lg shadow-lg transition transform hover:scale-105 flex items-center justify-center gap-2"
        >
          <FaWhatsapp />
          Enviar para WhatsApp
        </button>
      </form>
      
      {/* Botão de contato rápido */}
      <div className="text-center">
        <p className="text-purple-300 text-sm mb-3">Ou se preferir um contato mais rápido:</p>
        <button 
          onClick={sendDirectToWhatsApp}
          className="inline-flex items-center gap-2 px-6 py-3 bg-purple-700 hover:bg-purple-800 text-white rounded-lg font-semibold transition transform hover:scale-105"
        >
          <FaPaperPlane />
          Conversar Agora no WhatsApp
        </button>
      </div>
      
      <p className="text-center text-purple-300 text-sm">Vamos conversar sobre tecnologia e desenvolvimento!</p>
    </div>
  );
}
