"use client";

import { useState, useEffect } from "react";
import { FaCookieBite, FaTimes, FaCheck, FaBell } from "react-icons/fa";

interface CookieBannerProps {
  onAccept: () => void;
}

export default function CookieBanner({ onAccept }: CookieBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Verificar se o usuário já aceitou os cookies
    // LIMPAR PARA TESTE - REMOVER DEPOIS
    // localStorage.removeItem("cookieConsent");
    
    const cookieConsent = localStorage.getItem("cookieConsent");
    console.log("🍪 Checking cookie consent:", cookieConsent);
    
    if (!cookieConsent || cookieConsent === "null") {
      console.log("🍪 No consent found, showing banner...");
      // Mostrar banner após 2 segundos
      setTimeout(() => {
        console.log("🍪 Timer fired - showing banner");
        setIsVisible(true);
        setTimeout(() => {
          setIsAnimating(true);
          console.log("🍪 Animation started");
        }, 100);
      }, 2000);
    } else {
      console.log("🍪 Consent already given:", cookieConsent);
    }
  }, []);

  const handleAccept = () => {
    console.log("🍪 Cookie Accept clicked - START");
    
    // 1. Esconder banner imediatamente
    setIsAnimating(false);
    console.log("🎬 Animation stopped");
    
    // 2. Salvar consentimento
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem("cookieConsent", "accepted");
        localStorage.setItem("cookieConsentDate", new Date().toISOString());
        console.log("✅ Cookie consent saved to localStorage");
      }
    } catch (error) {
      console.error("❌ Error saving to localStorage:", error);
    }
    
    // 3. Esconder banner
    setTimeout(() => {
      setIsVisible(false);
      console.log("🙈 Banner hidden");
    }, 100);
    
    // 4. Chamar callback
    setTimeout(() => {
      console.log("🎯 Calling onAccept callback...");
      try {
        onAccept();
        console.log("✅ onAccept callback executed");
      } catch (error) {
        console.error("❌ Error in onAccept callback:", error);
      }
    }, 200);
    
    // 5. Solicitar permissão para notificações (em background)
    setTimeout(() => {
      handleNotificationPermission();
    }, 500);
    
    console.log("🍪 Cookie Accept clicked - END");
  };

  const handleNotificationPermission = async () => {
    if ("Notification" in window) {
      console.log("🔔 Requesting notification permission...");
      
      try {
        const permission = await Notification.requestPermission();
        console.log("📱 Permission result:", permission);
        
        if (permission === "granted") {
          localStorage.setItem("notificationPermission", "granted");
          console.log("✅ Notification permission granted");
          
          // Mostrar notificação de boas-vindas
          try {
            new Notification("🎉 Obrigado!", {
              body: "Você receberá atualizações sobre novos projetos e oportunidades!",
              icon: "/favicon.ico"
            });
          } catch (notifError) {
            console.warn("⚠️ Could not show welcome notification:", notifError);
          }
        } else {
          localStorage.setItem("notificationPermission", "denied");
          console.log("❌ Notification permission denied");
        }
      } catch (permissionError) {
        console.error("❌ Error requesting permission:", permissionError);
        localStorage.setItem("notificationPermission", "error");
      }
    } else {
      console.log("❌ Notifications not supported");
      localStorage.setItem("notificationPermission", "not_supported");
    }
  };

  const handleDecline = () => {
    console.log("🚫 Cookie Decline clicked");
    setIsAnimating(false);
    
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.setItem("cookieConsent", "declined");
        localStorage.setItem("notificationPermission", "declined");
        console.log("✅ Cookie decline saved to localStorage");
      }
    } catch (error) {
      console.error("❌ Error saving decline to localStorage:", error);
    }
    
    setTimeout(() => {
      setIsVisible(false);
      console.log("🙈 Banner hidden (declined)");
    }, 100);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[9999] pointer-events-none">
      <div 
        className={`
          pointer-events-auto max-w-sm w-full glassmorphism p-4 rounded-xl border border-purple-500/20 shadow-lg
          transform transition-all duration-500 ease-out
          ${isAnimating ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-full opacity-0 scale-95'}
        `}
        style={{ position: 'relative', zIndex: 10000 }}
      >
        {/* Header Compacto */}
        <div className="flex items-center gap-2 mb-3">
          <FaCookieBite className="text-lg text-orange-400" />
          <FaBell className="text-sm text-purple-400" />
          <h3 className="text-sm font-bold text-white">
            Cookies & Notificações
          </h3>
        </div>

        {/* Content Resumido */}
        <div className="mb-4">
          <p className="text-purple-100 text-xs leading-relaxed mb-2">
            Utilizamos cookies e enviamos notificações sobre projetos e oportunidades <span className="text-purple-300">(a cada 2 dias)</span>.
          </p>
        </div>

        {/* Actions Compactas */}
        <div className="flex gap-2" style={{ position: 'relative', zIndex: 10001 }}>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log("🔥 Button ACCEPT physically clicked!");
              handleAccept();
            }}
            onMouseDown={() => console.log("🔥 Button ACCEPT mouse down!")}
            className="flex-1 flex items-center justify-center gap-1 py-2 px-3 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white rounded-lg font-medium text-xs transition-all duration-300 shadow-md cursor-pointer"
            style={{ position: 'relative', zIndex: 10002 }}
          >
            <FaCheck className="text-xs" />
            Aceitar
          </button>
          
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              console.log("🔥 Button DECLINE physically clicked!");
              handleDecline();
            }}
            onMouseDown={() => console.log("🔥 Button DECLINE mouse down!")}
            className="flex items-center justify-center p-2 bg-gray-600/50 hover:bg-gray-600/70 text-gray-300 hover:text-white rounded-lg transition-all duration-300 cursor-pointer"
            style={{ position: 'relative', zIndex: 10002 }}
          >
            <FaTimes className="text-xs" />
          </button>
        </div>

        {/* Footer Compacto */}
        <p className="text-xs text-purple-400 mt-2 text-center opacity-75">
          🔒 Dados seguros
        </p>
        
        {/* Botão de Teste - REMOVER EM PRODUÇÃO */}
        <button
          type="button"
          onClick={() => {
            localStorage.removeItem("cookieConsent");
            localStorage.removeItem("notificationPermission");
            console.log("🧹 localStorage cleared for testing");
            window.location.reload();
          }}
          className="text-xs text-red-400 underline mt-1 opacity-50 hover:opacity-100"
        >
          [DEBUG] Limpar e Recarregar
        </button>
      </div>
    </div>
  );
}
