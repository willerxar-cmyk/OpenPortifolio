# PortfolioCV - Sistema de Portfólio com Blog Gratuito

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat-square&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-cyan?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

> 🎨 **Crie seu portfólio profissional com blog integrado, gratuitamente e de forma eficiente!**

Um sistema moderno de portfólio desenvolvido com as tecnologias mais recentes de 2026, featuring blog completo, upload de imagens, i18n (internacionalização) e painel administrativo.

## ✨ Features

### 🎯 Core
- ⚡ **Next.js 16** com App Router e React Server Components
- 🎨 **Design Moderno** com Tailwind CSS e Framer Motion
- 📱 **100% Responsivo** - Mobile, Tablet e Desktop
- 🌐 **i18n Completo** - PT, EN, ES (fácil adicionar mais)
- 🌙 **Dark Mode** nativo
- 📊 **JSON Database** - Sem necessidade de banco de dados externo

### 📝 Sistema de Blog Completo
- ✍️ **Editor Rich Text** (TipTap) com formatação completa
- 🖼️ **Upload de Imagens** Drag & Drop integrado
- 🏷️ **Tags e Categorias** organizadas
- 👤 **Sistema de Autores** com bio e redes sociais
- 🔍 **Busca em tempo real**
- 📰 **Posts em Destaque**
- 📝 **SEO integrado** (meta títulos, descrições)
- 💾 **Autosave** a cada 30 segundos

### 🎨 Portfólio
- 📂 **Projetos** com galeria de imagens
- 📄 **Currículo** com experiência, educação e habilidades
- 🏷️ **Categorias e Subcategorias**
- ⭐ **Projetos em Destaque**

### 🔐 Admin
- 🔒 **Autenticação JWT** segura
- 📊 **Dashboard** administrativo
- 🖼️ **Gestão de Mídia** (upload/delete)
- 📝 **CRUD completo** para blog, projetos e currículo

## 🚀 Começando

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn
- Git

### Instalação

1. **Clone o repositório**

```bash
git clone https://github.com/seu-usuario/portifoliocv.git
cd portifoliocv
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure as variáveis de ambiente**

```bash
cp .env.example .env.local
```

Edite `.env.local`:

```env
# Autenticação Admin
ADMIN_EMAIL=seu-email@exemplo.com
ADMIN_PASSWORD=sua-senha-segura
AUTH_SECRET=seu-token-secreto-jwt
```

4. **Inicie o servidor de desenvolvimento**

```bash
npm run dev
```

Acesse: http://localhost:3000

## 📖 Como Usar

### 🔐 Acessar o Admin

1. Vá para: http://localhost:3000/login
2. Use as credenciais configuradas no `.env.local`
3. Acesse o dashboard: http://localhost:3000/admin

### 📝 Criar um Post no Blog

1. No admin, clique em **"Blog"** → **"Novo Post"**
2. Preencha o título em pelo menos um idioma
3. Escreva o conteúdo usando o editor rich text
4. Faça upload da imagem de capa (drag & drop)
5. Adicione tags e selecione a categoria
6. Preencha os campos SEO (opcional)
7. Clique em **"Publicar"** ou **"Salvar Rascunho"**

### 🎨 Adicionar Projetos

1. No admin, clique em **"Projetos"** → **"Novo Projeto"**
2. Preencha título, descrição e tecnologias
3. Faça upload da imagem de capa
4. Adicione mais imagens para a galeria (opcional)
5. Marque como destaque se desejar
6. Salve

### 🌐 Internacionalização (i18n)

O sistema já vem com 3 idiomas: Português, Inglês e Espanhol.

Para adicionar um novo idioma:

1. Crie um novo arquivo em `src/data/locales/xx.json` (ex: `fr.json` para Francês)
2. Copie a estrutura do `en.json` e traduza
3. Adicione o idioma em `src/contexts/I18nContext.tsx`:

```typescript
const translations = {
  en: () => import('@/data/locales/en.json').then((m) => m.default),
  pt: () => import('@/data/locales/pt.json').then((m) => m.default),
  es: () => import('@/data/locales/es.json').then((m) => m.default),
  fr: () => import('@/data/locales/fr.json').then((m) => m.default), // novo
}
```

4. Atualize o tipo `Locale` em `src/types/index.ts`:

```typescript
export type Locale = 'en' | 'pt' | 'es' | 'fr';
```

## 🎨 Customização

### 🎯 Cores e Tema

Edite `src/app/globals.css`:

```css
:root {
  --primary: 250 95% 60%;        /* Roxo moderno */
  --secondary: 250 30% 90%;      /* Lilás claro */
  --accent: 280 95% 60%;         /* Destaque */
  /* ... outras variáveis */
}
```

### 📝 Conteúdo Pessoal

#### Perfil
Edite `src/data/profile.json`:

```json
{
  "name": "Seu Nome",
  "title": "Seu Título",
  "bio": "Sua biografia...",
  "email": "seu@email.com",
  "social": {
    "github": "https://github.com/seuusuario",
    "linkedin": "https://linkedin.com/in/seuusuario",
    "twitter": "https://twitter.com/seuusuario"
  }
}
```

#### Projetos
Edite `src/data/projects.json` ou use o painel admin.

#### Currículo
Edite `src/data/curriculum.json` ou use o painel admin.

#### Blog
Edite `src/data/blog.json` ou use o painel admin com editor visual.

### 🖼️ Imagens

As imagens são salvas automaticamente em `public/uploads/`:
- `projects/` - Imagens de projetos
- `blog/` - Imagens de posts
- `curriculum/` - Certificados/logos
- `avatar/` - Foto de perfil
- `general/` - Outras imagens

## 🚀 Deploy

### Vercel (Recomendado)

1. Push seu código para o GitHub
2. Conecte seu repositório na [Vercel](https://vercel.com)
3. Adicione as variáveis de ambiente
4. Deploy automático a cada push!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Outras Plataformas

**Netlify:**
```bash
npm run build
# Faça upload da pasta .netlify ou configure CI/CD
```

**Railway:**
```bash
railway login
railway init
railway up
```

**Docker:**
```bash
docker build -t portfolio .
docker run -p 3000:3000 portfolio
```

## 📁 Estrutura do Projeto

```
portifoliocv/
├── src/
│   ├── app/                    # Rotas Next.js (App Router)
│   │   ├── (root)/            # Grupo de rotas públicas
│   │   │   ├── page.tsx       # Home
│   │   │   ├── blog/          # Blog público
│   │   │   ├── portfolio/     # Portfólio
│   │   │   └── curriculum/    # Currículo
│   │   ├── admin/             # Painel admin
│   │   ├── api/               # API Routes
│   │   └── layout.tsx         # Layout raiz
│   ├── components/
│   │   ├── ui/               # Componentes Shadcn/ui
│   │   └── layout/           # Header, Footer, etc
│   ├── data/                 # Banco de dados JSON
│   │   ├── locales/          # Traduções
│   │   ├── authors.json
│   │   ├── blog.json
│   │   ├── projects.json
│   │   └── profile.json
│   ├── hooks/                # React Hooks
│   ├── lib/                  # Utilitários
│   └── types/                # Tipos TypeScript
├── public/
│   └── uploads/              # Imagens enviadas
└── ...config files
```

## 🛠️ Tecnologias

- **[Next.js 16](https://nextjs.org/)** - Framework React com App Router
- **[React 19](https://react.dev/)** - Biblioteca UI
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática
- **[Tailwind CSS v4](https://tailwindcss.com/)** - Framework CSS
- **[Shadcn/ui](https://ui.shadcn.com/)** - Componentes reutilizáveis
- **[TipTap](https://tiptap.dev/)** - Editor rich text
- **[Framer Motion](https://www.framer.com/motion/)** - Animações
- **[Lucide React](https://lucide.dev/)** - Ícones

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor, leia o [CONTRIBUTING.md](CONTRIBUTING.md) primeiro.

1. Fork o projeto
2. Crie sua branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

✅ **GRATUITO PARA USO** - Este projeto é 100% gratuito para qualquer pessoa usar!

📋 **Requisito:** Por favor, atribua os créditos ao desenvolvedor original mantendo esta seção no README do seu projeto.

💡 Você pode usar, modificar e distribuir livremente, desde que mantenha os créditos ao autor original.

---

## 👨‍💻 Autor

**Willer Xavier Reis** - Criador e Desenvolvedor

> Desenvolvido com ❤️ para ajudar profissionais a criarem seu portfólio de forma gratuita e eficiente.

📧 Contato: willerreis@example.com  
🌐 Portfólio: [willerxavierreis.com](https://willerxavierreis.com)  
💼 LinkedIn: [linkedin.com/in/willer-xavier-reis](https://linkedin.com/in/willer-xavier-reis)

**Se você usar este projeto, por favor:**
- ⭐ Dê uma star no repositório original
- 📢 Compartilhe com outros desenvolvedores
- 💬 Deixe seu feedback

---

⭐ **Se este projeto te ajudou, dê uma star no GitHub!** ⭐

## 💡 Dicas

- **Backup:** Faça backup regular do arquivo `src/data/blog.json`
- **Imagens:** Use formato WebP para melhor performance
- **SEO:** Preencha sempre meta título e descrição nos posts
- **Performance:** O sistema usa cache automático via Next.js
- **Segurança:** Nunca comite o arquivo `.env.local`

## 🐛 Solução de Problemas

### Erro 404 no blog
Verifique se o arquivo `src/data/blog.json` existe e é válido.

### Upload não funciona
Verifique as permissões da pasta `public/uploads/`.

### Erro de compilação
Execute `npm run clean` e depois `npm install` novamente.

---

**Feito com ❤️ usando Next.js 16 e tecnologias modernas de 2026**
