"use client";

import { useState, useEffect } from "react";
import { FaCookieBite, FaTimes, FaCheck } from "react-icons/fa";

interface SimpleCookieBannerProps {
  onAccept: () => void;
}

export default function SimpleCookieBanner({ onAccept }: SimpleCookieBannerProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setTimeout(() => {
        setShow(true);
      }, 1000);
    }
  }, []);

  const accept = () => {
    console.log("✅ ACCEPT CLICKED!");
    localStorage.setItem("cookieConsent", "accepted");
    setShow(false);
    onAccept();
  };

  const decline = () => {
    console.log("❌ DECLINE CLICKED!");
    localStorage.setItem("cookieConsent", "declined");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div 
      className="fixed bottom-4 right-4 max-w-xs sm:max-w-sm w-auto p-4 sm:p-5 bg-black/90 text-white rounded-xl border border-purple-500 shadow-2xl"
      style={{ zIndex: 99999 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <FaCookieBite style={{ marginRight: '8px', color: '#ffa500' }} />
        <strong>Cookies & Notificações</strong>
      </div>
      
      <p className="text-xs sm:text-sm mb-3 sm:mb-4 text-gray-200">
        Utilizamos cookies e enviamos notificações sobre projetos.
      </p>
      
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={accept}
          style={{
            flex: 1,
            padding: '8px 12px',
            backgroundColor: '#a855f7',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontSize: '12px'
          }}
        >
          <FaCheck style={{ marginRight: '5px' }} />
          Aceitar
        </button>
        
        <button
          onClick={decline}
          style={{
            padding: '8px',
            backgroundColor: '#666',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          <FaTimes />
        </button>
      </div>
      
      <button
        onClick={() => {
          localStorage.clear();
          window.location.reload();
        }}
        style={{
          marginTop: '10px',
          fontSize: '10px',
          color: '#ff6b6b',
          background: 'none',
          border: 'none',
          textDecoration: 'underline',
          cursor: 'pointer'
        }}
      >
        [DEBUG] Limpar e Recarregar
      </button>
    </div>
  );
}
