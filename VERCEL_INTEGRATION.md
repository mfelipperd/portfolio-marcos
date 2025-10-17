# 🚀 Guia de Integração com Vercel

Este guia explica como configurar a integração automática com a API da Vercel para exibir seus projetos em produção no portfólio.

## 📋 Pré-requisitos

- Conta na Vercel
- Projetos deployados na Vercel
- Node.js 18+ instalado

## 🔑 Passo 1: Obter Token de Acesso da Vercel

1. Acesse [https://vercel.com/account/tokens](https://vercel.com/account/tokens)

2. Clique em **"Create Token"**

3. Configure o token:
   - **Name**: `Portfolio API Token`
   - **Scope**: Selecione sua conta/team
   - **Expiration**: Escolha a validade (recomendado: No Expiration)

4. Clique em **"Create"**

5. **IMPORTANTE**: Copie o token gerado imediatamente! Ele não será exibido novamente.

## ⚙️ Passo 2: Configurar Variáveis de Ambiente

### Para Desenvolvimento Local

1. Crie um arquivo `.env.local` na raiz do projeto:

```bash
touch .env.local
```

2. Adicione o token da Vercel:

```env
VERCEL_TOKEN=seu_token_aqui
```

3. **NUNCA** commite este arquivo! Ele já está no `.gitignore`.

### Para Produção (Vercel)

1. Acesse o dashboard do seu projeto na Vercel

2. Vá em **Settings** → **Environment Variables**

3. Adicione a variável:
   - **Key**: `VERCEL_TOKEN`
   - **Value**: Cole seu token
   - **Environment**: Selecione todos (Production, Preview, Development)

4. Clique em **Save**

5. Faça um novo deploy para aplicar as mudanças

## 🧪 Passo 3: Testar a Integração

### Testar Localmente

```bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

Acesse: `http://localhost:3000`

### Verificar API

Você pode testar diretamente a API:

```bash
curl http://localhost:3000/api/vercel/projects
```

Ou visite no navegador:
```
http://localhost:3000/api/vercel/projects
```

**Resposta esperada:**
```json
{
  "projects": [
    {
      "id": "prj_...",
      "name": "nome-do-projeto",
      "framework": "nextjs",
      "productionUrl": "https://seuprojeto.com",
      "githubUrl": "https://github.com/user/repo",
      ...
    }
  ],
  "total": 5
}
```

## 📊 O que a Integração Faz

A integração busca automaticamente:

✅ **Todos os projetos da Vercel**
- Nome do projeto
- Framework utilizado (Next.js, React, Vue, etc.)
- Data de criação e última atualização

✅ **Deployments em produção**
- Status do deployment (READY, ERROR, etc.)
- URL de produção
- Data do último deploy

✅ **Domínios**
- Domínios customizados
- URLs .vercel.app
- URL primária de produção

✅ **Repositório GitHub**
- Link para o repositório
- Branch de produção
- Organização/usuário

## 🎨 Como Funciona no Site

### Seção "Sites em Produção"

Exibe:
- Preview visual do site
- Badge "Vercel" para projetos integrados
- Status (ATIVO/ERRO)
- Tecnologias utilizadas
- Links para GitHub e site ao vivo
- Visualização em modal completo

### Seção "Projetos na Vercel"

Exibe:
- Cards específicos da Vercel
- Estatísticas (total de projetos, online, uptime)
- Framework identificado com ícones
- Status de deployment
- Links diretos

## 🔧 Troubleshooting

### Erro: "Vercel token not configured"

**Causa**: Token não foi configurado nas variáveis de ambiente.

**Solução**:
1. Verifique se o arquivo `.env.local` existe
2. Confirme que a variável `VERCEL_TOKEN` está definida
3. Reinicie o servidor de desenvolvimento

### Erro: "Failed to fetch Vercel projects"

**Causa**: Token inválido ou sem permissões.

**Solução**:
1. Gere um novo token
2. Verifique se o token tem permissões de leitura
3. Confirme que o token não expirou

### Projetos não aparecem

**Causa**: Projetos sem deployment de produção.

**Solução**:
- A API só retorna projetos com deployment READY em produção
- Faça deploy dos projetos na Vercel
- Aguarde o deploy completar

### Sites manuais não aparecem mais

**Não se preocupe!** Os sites manuais são mantidos como fallback e aparecem junto com os projetos da Vercel.

**Como funciona:**
1. Busca projetos da Vercel
2. Adiciona sites manuais que não estão duplicados
3. Exibe todos juntos

## 🛡️ Segurança

### Boas Práticas

✅ **SEMPRE** use variáveis de ambiente para tokens
✅ **NUNCA** commite tokens no código
✅ **Use** tokens com permissões mínimas necessárias
✅ **Revogue** tokens antigos quando criar novos
✅ **Monitore** o uso dos tokens no dashboard da Vercel

### Permissões do Token

O token precisa apenas de:
- ✅ Read Projects
- ✅ Read Deployments
- ✅ Read Domains

**NÃO** precisa de:
- ❌ Write/Delete Projects
- ❌ Write Deployments
- ❌ Admin permissions

## 📱 Modo Fallback

Se a API da Vercel não estiver configurada ou falhar:

1. **Sites manuais** continuam funcionando normalmente
2. **Sem erros** visíveis para o usuário
3. **Mensagem clara** no console para debugging

### Sites Manuais

Localizados em:
- `src/components/ProductionSites.tsx` → `manualSites`
- `src/components/VercelProjects.tsx` → `manualProjects`

Para adicionar sites manuais:

```typescript
const manualSites: Site[] = [
  {
    id: "meu-site",
    name: "Meu Site",
    url: "https://meusite.com",
    description: "Descrição do site",
    technologies: ["React", "Node.js"],
    category: "Web App",
    gradient: "from-blue-600 to-cyan-600",
    framework: "React"
  }
];
```

## 🚀 Deploy

### Vercel (Recomendado)

```bash
# Fazer deploy
vercel

# Deploy para produção
vercel --prod
```

Não esqueça de configurar `VERCEL_TOKEN` nas variáveis de ambiente do projeto!

### Outras Plataformas

Se hospedar em outra plataforma, configure a variável `VERCEL_TOKEN` da mesma forma.

## 📚 Recursos

- [Vercel API Documentation](https://vercel.com/docs/rest-api)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

## 🆘 Suporte

Se tiver problemas:

1. Verifique os logs do console
2. Teste a API diretamente: `/api/vercel/projects`
3. Confirme as variáveis de ambiente
4. Gere um novo token se necessário

---

**Última Atualização**: 17 de Outubro, 2025  
**Versão da API**: Vercel API v9  
**Status**: ✅ Funcional

