"use client";

import { useState, useEffect, useCallback } from 'react';

export const useNotifications = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const [serviceWorkerRegistration, setServiceWorkerRegistration] = useState<ServiceWorkerRegistration | null>(null);

  // Verificar suporte e registrar service worker
  useEffect(() => {
    // Verificar suporte a notificações
    setIsSupported('Notification' in window && 'serviceWorker' in navigator);
    
    if ('Notification' in window) {
      setPermission(Notification.permission);
    }

    // Registrar service worker
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('Service Worker registrado:', registration);
          setServiceWorkerRegistration(registration);
        })
        .catch((error) => {
          console.error('Erro ao registrar Service Worker:', error);
        });
    }
  }, []);

  // Solicitar permissão para notificações
  const requestPermission = useCallback(async (): Promise<NotificationPermission> => {
    if (!isSupported) {
      throw new Error('Notificações não são suportadas neste navegador');
    }

    try {
      const result = await Notification.requestPermission();
      setPermission(result);
      return result;
    } catch (error) {
      console.error('Erro ao solicitar permissão:', error);
      throw error;
    }
  }, [isSupported]);

  // Iniciar sistema de notificações periódicas
  const startPeriodicNotifications = useCallback(() => {
    console.log('📋 startPeriodicNotifications called');
    console.log('📋 serviceWorkerRegistration:', !!serviceWorkerRegistration);
    console.log('📋 permission:', permission);
    
    if (serviceWorkerRegistration && permission === 'granted') {
      console.log('📤 Sending message to service worker...');
      
      // Enviar mensagem para o service worker iniciar o sistema
      serviceWorkerRegistration.active?.postMessage({
        type: 'START_NOTIFICATIONS'
      });
      
      // Salvar preferência do usuário
      localStorage.setItem('periodicNotifications', 'enabled');
      localStorage.setItem('notificationsStartDate', new Date().toISOString());
      
      console.log('✅ Sistema de notificações periódicas iniciado');
    } else {
      console.log('❌ Cannot start notifications - missing requirements');
    }
  }, [serviceWorkerRegistration, permission]);

  return {
    isSupported,
    permission,
    serviceWorkerRegistration,
    requestPermission,
    startPeriodicNotifications
  };
};