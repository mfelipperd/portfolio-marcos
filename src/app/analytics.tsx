"use client";

import Script from "next/script";

export default function Analytics() {
  return (
    <>
      {/* Google Analytics 4 */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'GA_MEASUREMENT_ID', {
            page_title: 'Marcos Felippe - Fullstack Developer',
            page_location: window.location.href,
            custom_map: {
              'custom_dimension1': 'user_type',
              'custom_dimension2': 'page_section'
            }
          });
          
          // Eventos personalizados para conversões
          gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href,
            custom_parameter: 'portfolio_view'
          });
          
          // Rastrear cliques em botões de contato
          document.addEventListener('click', function(e) {
            if (e.target && e.target.closest('[data-ga-event="contact"]')) {
              gtag('event', 'contact_click', {
                event_category: 'engagement',
                event_label: 'contact_button',
                value: 1
              });
            }
            
            if (e.target && e.target.closest('[data-ga-event="project"]')) {
              gtag('event', 'project_view', {
                event_category: 'engagement',
                event_label: 'project_click',
                value: 1
              });
            }
            
            if (e.target && e.target.closest('[data-ga-event="service"]')) {
              gtag('event', 'service_view', {
                event_category: 'engagement',
                event_label: 'service_click',
                value: 1
              });
            }
          });
        `}
      </Script>

      {/* Facebook Pixel */}
      <Script id="facebook-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', 'FB_PIXEL_ID');
          fbq('track', 'PageView');
          
          // Eventos personalizados para conversões
          fbq('track', 'ViewContent', {
            content_name: 'Portfolio Marcos Felippe',
            content_category: 'Portfolio',
            content_type: 'website'
          });
          
          // Rastrear engajamento
          document.addEventListener('click', function(e) {
            if (e.target && e.target.closest('[data-fb-event="contact"]')) {
              fbq('track', 'Lead', {
                content_name: 'Contact Button Click',
                content_category: 'Contact',
                value: 1,
                currency: 'BRL'
              });
            }
          });
        `}
      </Script>

      {/* LinkedIn Insight Tag */}
      <Script id="linkedin-insight" strategy="afterInteractive">
        {`
          _linkedin_partner_id = "LINKEDIN_PARTNER_ID";
          window._linkedin_data_partner_ids = window._linkedin_data_partner_ids || [];
          window._linkedin_data_partner_ids.push(_linkedin_partner_id);
          
          (function(l) {
          if (!l){window.lintrk = function(a,b){window.lintrk.q.push([a,b])};
          window.lintrk.q=[]}
          var s = document.getElementsByTagName("script")[0];
          var b = document.createElement("script");
          b.type = "text/javascript";b.async = true;
          b.src = "https://snap.licdn.com/li.lms-analytics/insight.min.js";
          s.parentNode.insertBefore(b, s);})(window.lintrk);
          
          // Rastrear conversões
          window.lintrk('track', { conversion_id: 123456 });
        `}
      </Script>

      {/* Hotjar para análise de comportamento */}
      <Script id="hotjar" strategy="afterInteractive">
        {`
          (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:HOTJAR_ID,hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
          })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
        `}
      </Script>

      {/* Microsoft Clarity para análise de UX */}
      <Script id="microsoft-clarity" strategy="afterInteractive">
        {`
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "CLARITY_ID");
        `}
      </Script>

      {/* Google Tag Manager */}
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM_ID');
        `}
      </Script>

      {/* Google Tag Manager (noscript) */}
      <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=GTM_ID"
          height="0"
          width="0"
          style={{ display: "none", visibility: "hidden" }}
        />
      </noscript>

      {/* Facebook Pixel (noscript) */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=FB_PIXEL_ID&ev=PageView&noscript=1"
          alt="Facebook Pixel"
        />
      </noscript>

      {/* Meta Pixel Helper */}
      <Script id="meta-pixel-helper" strategy="afterInteractive">
        {`
          // Helper para rastrear eventos personalizados
          window.trackEvent = function(eventName, parameters = {}) {
            // Google Analytics
            if (typeof gtag !== 'undefined') {
              gtag('event', eventName, parameters);
            }
            
            // Facebook Pixel
            if (typeof fbq !== 'undefined') {
              fbq('track', eventName, parameters);
            }
            
            // LinkedIn
            if (typeof lintrk !== 'undefined') {
              lintrk('track', parameters);
            }
            
            // Console para debug
            console.log('Event tracked:', eventName, parameters);
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
        `}
      </Script>
    </>
  );
}
