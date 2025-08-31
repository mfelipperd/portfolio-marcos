// Service Worker para Notificações Push
const CACHE_NAME = 'portfolio-marcos-v1';
const NOTIFICATION_CACHE = 'notifications-v1';

// Lista de notificações interessantes
const NOTIFICATIONS = [
  {
    title: "🚀 Novo Projeto Lançado!",
    body: "Confira o mais recente projeto em produção no portfólio. Tecnologias incríveis em ação!",
    icon: "/favicon.ico",
    badge: "/favicon.ico",
    tag: "new-project",
    data: { url: "/#projetos" }
  },
  {
    title: "💡 Dica de Desenvolvimento",
    body: "Descubra como otimizar performance em React com estas técnicas avançadas.",
    icon: "/favicon.ico", 
    badge: "/favicon.ico",
    tag: "dev-tip",
    data: { url: "/#sobre" }
  },
  {
    title: "🎯 Oportunidade de Projeto",
    body: "Está precisando de um desenvolvedor? Vamos conversar sobre seu próximo projeto!",
    icon: "/favicon.ico",
    badge: "/favicon.ico", 
    tag: "opportunity",
    data: { url: "/#contato" }
  },
  {
    title: "⚡ Tecnologia em Destaque",
    body: "Next.js 15 está revolucionando o desenvolvimento web. Veja como estou utilizando!",
    icon: "/favicon.ico",
    badge: "/favicon.ico",
    tag: "tech-highlight", 
    data: { url: "/#servicos" }
  },
  {
    title: "📈 Cases de Sucesso",
    body: "Veja como ajudei empresas a aumentarem suas vendas com soluções digitais eficientes.",
    icon: "/favicon.ico",
    badge: "/favicon.ico",
    tag: "success-case",
    data: { url: "/#sites" }
  },
  {
    title: "🔥 Stack Atualizada",
    body: "Novas tecnologias adicionadas ao arsenal: Docker, Kubernetes e muito mais!",
    icon: "/favicon.ico", 
    badge: "/favicon.ico",
    tag: "stack-update",
    data: { url: "/#sobre" }
  }
];

// Instalar Service Worker
self.addEventListener('install', (event) => {
  console.log('Service Worker instalado');
  self.skipWaiting();
});

// Ativar Service Worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker ativado');
  event.waitUntil(self.clients.claim());
});

// Lidar com cliques em notificações
self.addEventListener('notificationclick', (event) => {
  console.log('Notificação clicada:', event.notification);
  
  event.notification.close();
  
  const urlToOpen = event.notification.data?.url || '/';
  
  event.waitUntil(
    clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    }).then((clientList) => {
      // Se já existe uma aba aberta, focar nela
      for (const client of clientList) {
        if (client.url.includes(self.location.origin) && 'focus' in client) {
          client.navigate(urlToOpen);
          return client.focus();
        }
      }
      
      // Caso contrário, abrir nova aba
      if (clients.openWindow) {
        return clients.openWindow(urlToOpen);
      }
    })
  );
});

// Função para agendar próxima notificação
function scheduleNextNotification() {
  // Verificar se as notificações estão habilitadas
  if (Notification.permission !== 'granted') {
    return;
  }
  
  // Agendar para 2 dias (172800000 ms)
  const twodays = 2 * 24 * 60 * 60 * 1000;
  
  setTimeout(() => {
    // Selecionar notificação aleatória
    const randomNotification = NOTIFICATIONS[Math.floor(Math.random() * NOTIFICATIONS.length)];
    
    // Mostrar notificação
    self.registration.showNotification(randomNotification.title, {
      body: randomNotification.body,
      icon: randomNotification.icon,
      badge: randomNotification.badge,
      tag: randomNotification.tag,
      data: randomNotification.data,
      requireInteraction: false,
      silent: false,
      vibrate: [200, 100, 200],
      actions: [
        {
          action: 'view',
          title: 'Ver Detalhes',
          icon: '/favicon.ico'
        },
        {
          action: 'dismiss', 
          title: 'Dispensar',
          icon: '/favicon.ico'
        }
      ]
    });
    
    console.log('Notificação enviada:', randomNotification.title);
    
    // Agendar a próxima
    scheduleNextNotification();
  }, twodays);
}

// Lidar com ações das notificações
self.addEventListener('notificationclick', (event) => {
  if (event.action === 'dismiss') {
    event.notification.close();
    return;
  }
  
  // Ação padrão ou 'view'
  event.notification.close();
  
  const urlToOpen = event.notification.data?.url || '/';
  
  event.waitUntil(
    clients.openWindow(urlToOpen)
  );
});

// Mensagem do cliente para iniciar notificações
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'START_NOTIFICATIONS') {
    console.log('Iniciando sistema de notificações');
    scheduleNextNotification();
  }
  
  if (event.data && event.data.type === 'STOP_NOTIFICATIONS') {
    console.log('Parando sistema de notificações');
    // Aqui você pode implementar lógica para parar as notificações
  }
});
