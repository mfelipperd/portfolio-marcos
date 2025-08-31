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
      style={{
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        zIndex: 99999,
        backgroundColor: 'rgba(0,0,0,0.9)',
        color: 'white',
        padding: '20px',
        borderRadius: '10px',
        maxWidth: '300px',
        border: '1px solid #a855f7'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <FaCookieBite style={{ marginRight: '8px', color: '#ffa500' }} />
        <strong>Cookies & Notificações</strong>
      </div>
      
      <p style={{ fontSize: '12px', marginBottom: '15px' }}>
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
