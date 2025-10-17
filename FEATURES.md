# 🚀 Guia de Funcionalidades - Portfólio 2.0

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Integrações](#integrações)
3. [Componentes](#componentes)
4. [Animações](#animações)
5. [Customização](#customização)

---

## 🎯 Visão Geral

O portfólio agora é uma aplicação web moderna e interativa que integra dados reais do GitHub e Vercel para apresentar seus projetos de forma profissional e dinâmica.

### Principais Destaques

✅ **Integração Automática**: Puxa seus repos e deploys automaticamente  
✅ **100% Interativo**: Animações suaves e feedback visual constante  
✅ **Performance Otimizada**: Lazy loading e código otimizado  
✅ **Responsivo**: Funciona perfeitamente em todos os dispositivos  
✅ **Acessível**: Segue as melhores práticas de acessibilidade  

---

## 🔗 Integrações

### 1. GitHub API

#### Funcionalidades

- **Busca Automática de Repositórios**
  ```typescript
  // Busca todos os repos públicos ordenados por atualização
  fetch('https://api.github.com/users/mfelipperd/repos?sort=updated&per_page=100')
  ```

- **Estatísticas em Tempo Real**
  - Total de repositórios
  - Stars acumuladas
  - Forks totais
  - Linguagens utilizadas

- **Filtros Inteligentes**
  - Por linguagem de programação
  - Por data de atualização
  - Por popularidade (stars)

#### Como Personalizar

No arquivo `src/components/GitHubProjects.tsx`, altere o username:

```typescript
const response = await fetch(
  "https://api.github.com/users/SEU_USERNAME/repos?sort=updated&per_page=100"
);
```

### 2. Vercel Integration

#### Funcionalidades

- **Lista de Projetos em Produção**
- **Status de Deploy**
- **Links para Sites Ativos**
- **Identificação de Framework**

#### Projetos Manuais

Para adicionar projetos manualmente, edite o array em `src/components/VercelProjects.tsx`:

```typescript
const manualProjects = [
  {
    id: "seu-projeto",
    name: "Seu Projeto Incrível",
    framework: "nextjs",
    productionUrl: "https://seuprojeto.com",
    githubUrl: "https://github.com/user/repo",
    // ... outros campos
  }
];
```

### 3. GitHub Stats

#### Gráfico de Contribuições

- Heat map dos últimos 12 meses
- Cores graduadas por intensidade
- Tooltip com detalhes por dia
- Responsivo e interativo

---

## 🎨 Componentes

### GitHubProjects

**Arquivo**: `src/components/GitHubProjects.tsx`

```tsx
<GitHubProjects />
```

**Características**:
- Busca automática de repos
- Cards com informações detalhadas
- Filtros por linguagem
- Links para código e demo
- Skeleton loading

### VercelProjects

**Arquivo**: `src/components/VercelProjects.tsx`

```tsx
<VercelProjects />
```

**Características**:
- Projetos em produção
- Status badges
- Cards coloridos por framework
- Links para sites ao vivo

### InteractiveProjects

**Arquivo**: `src/components/InteractiveProjects.tsx`

```tsx
<InteractiveProjects />
```

**Características**:
- Sistema de categorias
- Modal de detalhes
- Toggle grid/lista
- Projetos em destaque
- Estatísticas visuais

**Como Adicionar Projetos**:

```typescript
const projects: Project[] = [
  {
    id: "projeto-1",
    title: "Nome do Projeto",
    description: "Descrição curta",
    longDescription: "Descrição completa para o modal",
    technologies: ["React", "Node.js", "PostgreSQL"],
    category: "Enterprise",
    githubUrl: "https://github.com/...",
    liveUrl: "https://...",
    stats: {
      stars: 10,
      forks: 2,
      views: 500
    },
    featured: true,
    status: "production"
  }
];
```

### GitHubStats

**Arquivo**: `src/components/GitHubStats.tsx`

```tsx
<GitHubStats />
```

**Características**:
- Estatísticas de usuário
- Gráfico de contribuições
- Cards com métricas
- Link para perfil

### ParticleBackground

**Arquivo**: `src/components/ParticleBackground.tsx`

```tsx
<ParticleBackground />
```

**Características**:
- Partículas interativas
- Responde ao mouse
- Performance otimizada
- Canvas animado

**Personalização**:

```typescript
// Ajustar número de partículas
const particleCount = Math.floor((canvas.width * canvas.height) / 15000);

// Ajustar cor das partículas
ctx.fillStyle = `rgba(168, 85, 247, ${particle.opacity})`;

// Ajustar distância de conexão
if (distance < 120) { // Altere este valor
  // ...
}
```

### ScrollReveal

**Arquivo**: `src/components/ScrollReveal.tsx`

```tsx
<ScrollReveal animation="fadeInUp" delay={200}>
  <div>Conteúdo que será revelado</div>
</ScrollReveal>
```

**Animações Disponíveis**:
- `fadeInUp`
- `fadeInDown`
- `fadeInLeft`
- `fadeInRight`
- `scaleIn`
- `rotateIn`

---

## 🎭 Animações

### Sistema de Animações

**Arquivo**: `src/app/animations.css`

#### Animações de Entrada

```css
.animate-fadeInUp
.animate-fadeInDown
.animate-fadeInLeft
.animate-fadeInRight
.animate-scaleIn
.animate-rotateIn
```

#### Animações Contínuas

```css
.animate-shimmer      /* Efeito de brilho */
.animate-gentlePulse  /* Pulsação suave */
.animate-float        /* Flutuação */
.animate-glow         /* Brilho */
```

#### Classes Utilitárias

```css
.delay-100  /* Delay de 0.1s */
.delay-200  /* Delay de 0.2s */
.delay-300  /* Delay de 0.3s */
/* ... até delay-600 */

.interactive-card     /* Card com hover melhorado */
.glassmorphism-enhanced /* Glassmorphism avançado */
.animated-gradient-text /* Texto com gradiente animado */
```

### Hooks de Animação

**Arquivo**: `src/hooks/useScrollReveal.ts`

#### useScrollReveal

```typescript
const { ref, isVisible } = useScrollReveal({
  threshold: 0.1,
  rootMargin: "0px",
  triggerOnce: true
});

<div ref={ref} className={isVisible ? 'animate-fadeInUp' : 'opacity-0'}>
  Conteúdo
</div>
```

#### useScrollDirection

```typescript
const scrollDirection = useScrollDirection();

// scrollDirection é 'up', 'down' ou null
```

#### useScrollPosition

```typescript
const scrollPosition = useScrollPosition();

// Retorna posição Y do scroll em pixels
```

#### useCountUp

```typescript
const { count, start } = useCountUp(1000, 2000);

useEffect(() => {
  start(); // Inicia a contagem
}, []);

<div>{count}</div>
```

---

## ⚙️ Customização

### Cores

Para alterar o esquema de cores, edite `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#a855f7',    // Roxo principal
        secondary: '#ec4899',  // Rosa secundário
        accent: '#3b82f6',     // Azul de destaque
      }
    }
  }
}
```

### Animações

Para adicionar novas animações, edite `src/app/animations.css`:

```css
@keyframes minhaAnimacao {
  from {
    /* estado inicial */
  }
  to {
    /* estado final */
  }
}

.animate-minhaAnimacao {
  animation: minhaAnimacao 0.5s ease-out forwards;
}
```

### Performance

#### Ajustar Lazy Loading

No `page.tsx`, todos os componentes pesados usam lazy loading:

```typescript
const MeuComponente = lazy(() => import("../components/MeuComponente"));

// Uso com Suspense
<Suspense fallback={<LoadingComponent />}>
  <MeuComponente />
</Suspense>
```

#### Otimizar Imagens

Use o componente Image do Next.js:

```typescript
import Image from "next/image";

<Image
  src="/minha-imagem.jpg"
  alt="Descrição"
  width={800}
  height={600}
  loading="lazy"
  placeholder="blur"
  blurDataURL="data:image/..."
/>
```

---

## 🔧 Troubleshooting

### Erro ao buscar dados do GitHub

**Problema**: API do GitHub retorna erro 403 (rate limit)

**Solução**: Adicione um token de autenticação:

```typescript
const response = await fetch(
  "https://api.github.com/users/username/repos",
  {
    headers: {
      'Authorization': `token ${process.env.GITHUB_TOKEN}`
    }
  }
);
```

### Animações não funcionando

**Problema**: Animações CSS não são aplicadas

**Solução**: Verifique se `animations.css` está importado em `globals.css`:

```css
@import "tailwindcss";
@import "./animations.css";
```

### Performance ruim

**Problema**: Site carregando lento

**Soluções**:
1. Verifique se todos os componentes pesados usam lazy loading
2. Otimize imagens (use WebP, compressão)
3. Reduza número de partículas no ParticleBackground
4. Use cache para chamadas de API

---

## 📚 Recursos Adicionais

### Documentação Oficial

- [Next.js](https://nextjs.org/docs)
- [React](https://react.dev)
- [TailwindCSS](https://tailwindcss.com/docs)
- [GitHub API](https://docs.github.com/en/rest)

### Inspiração e Design

- [Dribbble](https://dribbble.com/tags/portfolio)
- [Awwwards](https://www.awwwards.com/websites/portfolio/)
- [Behance](https://www.behance.net/search/projects?search=portfolio)

---

**Última Atualização**: 17 de Outubro, 2025  
**Versão**: 2.0.0  
**Autor**: Marcos Felippe

