<p align="center">
  <img src="https://raw.githubusercontent.com/facebook/react/main/fixtures/dom/public/react-logo.svg" width="120" alt="React Logo"/>
</p>

<h1 align="center">🚀 Modern React Admin Template</h1>

<p align="center">
  <b>Template front-end robusto, escalável e moderno, com as melhores práticas do ecossistema React.</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18+-61DAFB?style=for-the-badge&logo=react&logoColor=white"/>
  <img src="https://img.shields.io/badge/Vite-3.0-F7DF1E?style=for-the-badge&logo=vite"/>
  <img src="https://img.shields.io/badge/Styled%20Components-DB7093?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/React%20Router%20DOM-v6-CA4245?style=for-the-badge"/>
  <img src="https://img.shields.io/badge/Axios-007FFF?style=for-the-badge"/>
</p>

---

## ✨ Core Features

### 🎨 Theming Dinâmico
- Suporte completo para **Light Mode** e **Dark Mode**, com persistência da escolha do usuário.

### 🔐 Autenticação JWT Completa
- Fluxo de **login**, **logout** e persistência de sessão via **localStorage**.

### 🛡️ Interceptador de API
- Instância **Axios** centralizada com interceptadores para envio automático do token e tratamento global de erros (como sessão expirada, redirecionando para o login).

### 🧩 Arquitetura Reutilizável
- **Componentes Genéricos:** DataTable configurável com busca, paginação e cards para mobile, Modal genérico, PageHeader, etc.
- **Layouts Responsivos:** Renderização otimizada para Widescreen (menu lateral retrátil) e Mobile (menu inferior fixo).

### 🛰️ Gerenciamento de Estado Centralizado
- Uso de **Context API** para estados globais limpos e desacoplados: `AuthContext`, `ThemeContext`, `AlertContext`.

### 🚦 Roteamento Profissional
- Rotas públicas e privadas gerenciadas com **react-router-dom v6**.

### 🔔 Feedback de Usuário Moderno
- Sistema de alertas e confirmações globais via `AlertContext`, evitando o uso de `window.alert()`.

### 🔧 Configuração Centralizada
- Menus de navegação e submenus definidos em um único arquivo `menuConfig.js`.

---

## 🛠️ Tech Stack

| Tecnologia | Detalhes |
|------------|----------|
| React      | 18+ |
| Vite       | Build Tool |
| Styled Components | Estilização dinâmica |
| React Router DOM v6 | Roteamento SPA |
| Axios      | Requisições HTTP |
| ESLint     | Linter com regras pré-configuradas |

---

## 🚀 Getting Started

### Pré-requisitos
- Node.js (v18+)
- npm ou Yarn

### Instalação

```bash
# Clone o repositório
git clone https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git

# Entre na pasta do projeto
cd SEU-REPOSITORIO

# Instale as dependências
npm install
