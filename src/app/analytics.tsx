"use client";

import { useEffect } from 'react';

export default function Analytics() {
  useEffect(() => {
    // Analytics Helper - apenas no client
    if (typeof window !== 'undefined') {
      // Helper para rastrear eventos personalizados
      window.trackEvent = function(eventName, parameters = {}) {
        console.log('Event tracked:', eventName, parameters);
        
        // Google Analytics
        if (typeof window.gtag !== 'undefined') {
          window.gtag('event', eventName, parameters);
        }
        
        // Facebook Pixel
        if (typeof window.fbq !== 'undefined') {
          window.fbq('track', eventName, parameters);
        }
        
        // LinkedIn
        if (typeof window.lintrk !== 'undefined') {
          window.lintrk('track', parameters);
        }
      };
      
      // Rastrear tempo na página
      let startTime = Date.now();
      window.addEventListener('beforeunload', function() {
        let timeOnPage = Math.round((Date.now() - startTime) / 1000);
        window.trackEvent('time_on_page', {
          value: timeOnPage,
          event_category: 'engagement'
        });
      });
      
      // Rastrear scroll depth
      let maxScroll = 0;
      window.addEventListener('scroll', function() {
        let scrollPercent = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
        if (scrollPercent > maxScroll) {
          maxScroll = scrollPercent;
          if (maxScroll % 25 === 0) { // A cada 25% de scroll
            window.trackEvent('scroll_depth', {
              value: maxScroll,
              event_category: 'engagement'
            });
          }
        }
      });

      // Rastrear notificações aceitas
      window.trackNotificationEvent = function(action, data = {}) {
        window.trackEvent('notification_' + action, {
          event_category: 'notifications',
          event_label: action,
          ...data
        });
      };

      // Rastrear cliques em elementos importantes
      document.addEventListener('click', function(e) {
        // Botões de contato
        if (e.target && e.target.closest('[data-analytics="contact"]')) {
          window.trackEvent('contact_click', {
            event_category: 'engagement',
            event_label: 'contact_button'
          });
        }
        
        // Projetos
        if (e.target && e.target.closest('[data-analytics="project"]')) {
          window.trackEvent('project_view', {
            event_category: 'engagement', 
            event_label: 'project_click'
          });
        }
        
        // Serviços
        if (e.target && e.target.closest('[data-analytics="service"]')) {
          window.trackEvent('service_view', {
            event_category: 'engagement',
            event_label: 'service_click'
          });
        }
      });
    }
  }, []);

  return null;
}