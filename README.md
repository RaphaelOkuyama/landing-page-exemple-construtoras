# 🏗️ ARCA Construtora — Landing Page de Alto Padrão

Landing page institucional para construtora de alto padrão, construída com **Next.js 16**, **React 19**, **TypeScript** e **Tailwind CSS v4**. O projeto explora animação em `<canvas>`, storytelling controlado por scroll e microinterações para transmitir a sofisticação de um portfólio arquitetônico premium — tudo em uma única página, 100% estática e sem backend.

🔗 **Deploy:** [landing-page-exemple-construtoras.vercel.app](https://landing-page-exemple-construtoras.vercel.app/)

---

## 📝 Descrição

O ARCA é uma **single-page application** construída com **Next.js (App Router)**. A página raiz (`src/app/page.tsx`) compõe treze blocos independentes — do preloader ao rodapé — cada um encapsulado em seu próprio Client Component.

Todo o conteúdo é estático e definido em constantes nos próprios componentes (obras, depoimentos, FAQ, etapas do processo). Não há banco de dados, API ou variáveis de ambiente: o foco do projeto está na **camada visual e de interação** — animações em canvas, `IntersectionObserver` para revelações no scroll, sequência de frames sincronizada com a rolagem e parallax 3D nos cards.

A estilização é feita quase inteiramente em `globals.css` (~2.400 linhas), com tokens de tema em CSS custom properties e Tailwind v4 importado via `@import "tailwindcss"`. Componentes do **shadcn/ui** são usados apenas onde há necessidade de estrutura acessível (menu lateral, select, inputs).

---

## ✨ Funcionalidades

### 🎬 Preloader cinematográfico
- Prédio de 8 andares que se ergue camada por camada conforme o progresso avança
- Guindaste em SVG com cabo e gancho animados
- Sistema de partículas em `<canvas>` — poeira e faíscas de solda com `requestAnimationFrame`
- Fases textuais que acompanham o percentual ("Preparando o terreno" → "Obra concluída")
- Scroll do body travado durante o carregamento e liberado na saída

### 🚁 Hero com vídeo de drone
- **Desktop:** vídeo renderizado em `<canvas>` com crop e enquadramento calculados manualmente, eliminando bordas indesejadas do arquivo original
- **Mobile:** `<video>` nativo com `preload="none"` para economizar banda
- Título revelado linha por linha com máscara cinematográfica
- Indicador de scroll animado e marca d'água tipográfica ao fundo

### 📊 Contadores animados
- Estatísticas com count-up disparado por `IntersectionObserver` ao entrar na viewport
- Suporte a valores inteiros e decimais com sufixos (`+`, `%`, `B`)

### 🏗️ Sequência de construção controlada por scroll
- 63 frames `.webp` desenhados em `<canvas>`, sincronizados com a posição do scroll
- Carregamento **lazy**: só inicia quando a seção se aproxima da viewport (`rootMargin: 200px`)
- Em mobile carrega 1 a cada 3 frames (~21 imagens), com fallback para o frame carregado mais próximo
- Barra de progresso de carregamento e timeline de 5 etapas com estados ativo/concluído

### 🏢 Portfólio de obras com parallax 3D
- Cards com rotação `rotateX`/`rotateY` acompanhando o movimento do mouse
- Duas camadas de imagem — fundo e recorte (*cutout*) do edifício — criando profundidade real no hover
- Reflexo de luz (*glare*) posicionado dinamicamente conforme a inclinação do card
- Filtro por tipo: Todos · Unifamiliar · Multifamiliar

### 💬 Depoimentos e conteúdo institucional
- Carrossel de depoimentos com avanço automático
- Grade de diferenciais, timeline do processo construtivo em 6 fases e seção "Quem somos"
- FAQ em accordion com abertura exclusiva

### 📬 Contato
- Formulário com nome, e-mail, telefone, tipo de projeto (Select) e mensagem
- Botão de envio com animação de trator empurrando o texto e estado de sucesso
- ⚠️ **O formulário é apenas visual** — ainda não há integração de envio (há um `TODO` marcado no código para EmailJS/Resend)

### 🧭 Navegação
- Navbar fixa que ganha fundo e blur após 60px de scroll
- Menu mobile em Sheet lateral (shadcn/ui) com âncoras para todas as seções
- `scroll-behavior: smooth` nativo

---

## 🛠️ Tecnologias

### Core
- ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white) **Next.js 16** — Framework React com App Router
- ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) **React 19** — Biblioteca para construção de interfaces
- ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white) **TypeScript 5** — Tipagem estática

### Estilização & UI
- ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white) **Tailwind CSS v4** — Configuração CSS-first via `@import "tailwindcss"`
- **shadcn/ui** (estilo `radix-vega`) — Button, Input, Select, Sheet e Textarea
- **Radix UI** — Primitivas acessíveis por baixo dos componentes
- **lucide-react** — Ícones
- **class-variance-authority · clsx · tailwind-merge** — Composição de classes
- **tw-animate-css** — Utilitários de animação

### Animação
- **Canvas API + requestAnimationFrame** — Partículas do preloader, vídeo do hero e sequência de frames
- **IntersectionObserver** — Revelações no scroll, count-up e lazy loading dos frames
- Transições e keyframes em **CSS puro** (`globals.css`)

### Tipografia
- **Cormorant Garamond** — Títulos (serifada, com itálico)
- **Jost** — Corpo e interface (sans-serif geométrica)
- Ambas carregadas via `next/font/google` com `display: swap`

---

## 🗂️ Estrutura de Pastas

```bash
landing-page-construtora/
├── public/
│   ├── frames/                  # 63 frames .webp da sequência de construção
│   │   └── frame_1.webp ... frame_63.webp
│   ├── obras/                   # Portfólio (imagem base + cutout de cada obra)
│   │   ├── obra1.png / obra1-cutout.png
│   │   ├── ...
│   │   └── sobre-foto.png
│   └── hero-drone.mp4           # Vídeo aéreo do hero
├── src/
│   ├── app/
│   │   ├── layout.tsx           # Fontes (Cormorant + Jost), metadata e Open Graph
│   │   ├── page.tsx             # Composição de todas as seções
│   │   ├── globals.css          # Tokens de tema + toda a estilização (~2.4k linhas)
│   │   └── favicon.ico
│   ├── components/
│   │   ├── Preloader.tsx            # Prédio + guindaste + partículas em canvas
│   │   ├── Navbar.tsx               # Nav fixa + menu mobile em Sheet
│   │   ├── HeroSection.tsx          # Vídeo de drone (canvas no desktop, nativo no mobile)
│   │   ├── NumerosSection.tsx       # Contadores animados
│   │   ├── DiferenciaisSection.tsx  # Grade de 6 diferenciais
│   │   ├── ConstrucaoSection.tsx    # Sequência de 63 frames controlada por scroll
│   │   ├── ObrasSection.tsx         # Portfólio com parallax 3D e filtro
│   │   ├── ProcessoSection.tsx      # Timeline de 6 fases da obra
│   │   ├── DepoimentosSection.tsx   # Carrossel de depoimentos
│   │   ├── SobreSection.tsx         # Institucional
│   │   ├── FaqSection.tsx           # Accordion de perguntas frequentes
│   │   ├── ContatoSection.tsx       # Formulário + botão animado
│   │   ├── Footer.tsx               # Rodapé
│   │   └── ui/                      # Componentes shadcn/ui
│   │       ├── button.tsx
│   │       ├── input.tsx
│   │       ├── select.tsx
│   │       ├── sheet.tsx
│   │       └── textarea.tsx
│   ├── hooks/
│   │   └── useScrollProgress.ts # Progresso de scroll (0–1) de um container
│   └── lib/
│       └── utils.ts             # cn() — merge de classes Tailwind
├── components.json              # Configuração do shadcn/ui
├── eslint.config.mjs
├── next.config.ts
├── postcss.config.mjs
└── package.json
```

> ℹ️ O scrub de frames e o loop de vídeo em canvas são implementados inline em `ConstrucaoSection` e `HeroSection`, respectivamente — `useScrollProgress` é o único hook compartilhado.

---

## 🚀 Como Rodar Localmente

### Pré-requisitos

- **Node.js** v20+
- **npm**

> Não são necessários banco de dados, chaves de API ou variáveis de ambiente — o projeto é totalmente estático.

### Passo a passo

**1. Clone o repositório**
```bash
git clone https://github.com/RaphaelOkuyama/landing-page-exemple-construtoras.git
cd landing-page-exemple-construtoras
```

**2. Instale as dependências**
```bash
npm install
```

**3. Inicie o servidor de desenvolvimento**
```bash
npm run dev
```

O app estará disponível em: `http://localhost:3000`

---

## 📦 Scripts Disponíveis

| Script | Descrição |
|---|---|
| `npm run dev` | Inicia o servidor em modo de desenvolvimento |
| `npm run build` | Cria a versão otimizada para produção |
| `npm start` | Inicia o servidor de produção |
| `npm run lint` | Executa a verificação de código (ESLint) |

---

## 🎨 Design System

Os tokens ficam em `src/app/globals.css`, sob `:root`:

| Token | Valor | Uso |
|---|---|---|
| `--cream` | `#F5F0E8` | Fundo das seções claras |
| `--warm-white` | `#FAF8F4` | Texto sobre fundo escuro |
| `--charcoal` | `#1C1C1A` | Fundo escuro principal / texto |
| `--charcoal-2` | `#141210` | Fundo mais profundo (hero, footer) |
| `--stone` | `#8C7E6E` | Texto secundário, partículas de poeira |
| `--gold` | `#B8975A` | Cor de destaque — CTAs, faíscas, detalhes |
| `--gold-light` | `#D4B47A` | Variação clara do destaque |
| `--smoke` | `#E8E3DC` | Bordas e divisores |

Fontes: `--font-c` (Cormorant Garamond) para títulos, `--font-j` (Jost) para interface.

---

## ⚡ Notas de Performance

- **Frames sob demanda** — as 63 imagens da sequência só começam a carregar quando a seção se aproxima da viewport
- **Menos frames no mobile** — 1 a cada 3, com fallback para o frame carregado mais próximo
- **Vídeo diferenciado por dispositivo** — canvas no desktop, `<video preload="none">` no mobile
- **Sem aleatoriedade em render** — as opacidades da grade de pontos do preloader são pré-definidas para não quebrar o SSR
- **Scroll com throttle via rAF** — `useScrollProgress` limita as atualizações a um frame por vez
- **Listeners passivos** — eventos de scroll registrados com `{ passive: true }`

---

## 🧭 Próximos Passos

- [ ] Integrar envio real do formulário de contato (EmailJS ou Resend)
- [ ] Respeitar `prefers-reduced-motion` nas animações mais intensas
- [ ] Comprimir `hero-drone.mp4` (4,8 MB) para reduzir o peso do hero

---

## 📬 Contato

Desenvolvido por **Raphael Okuyama**

- 🌐 Portfólio: [portfolio-raphael-okuyama.vercel.app](https://portfolio-raphael-okuyama.vercel.app)
- 💼 LinkedIn: [raphael-okuyama](https://www.linkedin.com/in/raphael-okuyama/)
- 🐙 GitHub: [@RaphaelOkuyama](https://github.com/RaphaelOkuyama)

---

## 📄 Licença

Este projeto está licenciado sob a **MIT License**. Consulte o arquivo [LICENSE](./LICENSE) para mais detalhes.

---

Copyright © 2026 **Raphael Okuyama**

> ⚠️ **Aviso:** "ARCA Construtora" é uma marca fictícia criada para fins de demonstração. Todos os dados institucionais, obras, depoimentos e informações de contato apresentados são ilustrativos.
