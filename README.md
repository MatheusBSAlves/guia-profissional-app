# Guia da Profissionalização

> Plataforma de apoio à carreira com **questionário interativo de preparo para entrevistas** e **gerador de currículo com pré-visualização em tempo real**.

Projeto acadêmico de extensão desenvolvido em **HTML, CSS e JavaScript puro (Vanilla)** — sem frameworks, sem backend e sem banco de dados. O objetivo é democratizar o acesso a orientações práticas de carreira para a comunidade, ajudando candidatos em duas etapas comuns de processos seletivos: o diagnóstico de preparo para entrevistas e a criação de um currículo profissional.

🔗 **Acesse online:** [guia.theuxdev.uk](https://guia.theuxdev.uk)

---

## ✨ Funcionalidades

### 📋 Questionário interativo
- 10 perguntas focadas em preparação para entrevistas (pesquisa sobre a vaga, apresentação pessoal, comunicação não verbal, etc.).
- Barra de progresso, navegação entre perguntas (voltar/avançar) e validação local.
- Pontuação de **0 a 30** com classificação em 4 perfis:

  | Pontuação | Perfil |
  |-----------|--------|
  | 0–9   | Iniciante em entrevistas |
  | 10–17 | Em desenvolvimento |
  | 18–24 | Preparado |
  | 25–30 | Perfil forte |

- Resultado com **dicas personalizadas** de acordo com o perfil alcançado.

### 📄 Gerador de currículo
- Formulário organizado em **seções recolhíveis** (dados pessoais, objetivo, resumo, experiência, formação, projetos, habilidades, idiomas e cursos).
- **Pré-visualização em tempo real**: o currículo é atualizado conforme o usuário digita.
- Seções de experiência e formação **dinâmicas** (adicionar/remover itens).
- Indicador de status por seção (*preenchida*, *vazia*, *em preenchimento*, *com erro*).
- Validação de campos obrigatórios (nome e e-mail).
- **Exportação para PDF / impressão** com layout limpo via `window.print()` e folha de estilo dedicada.

### 🎨 Experiência geral
- **Tema claro/escuro** com persistência (`localStorage`) e respeito à preferência do sistema operacional (`prefers-color-scheme`), aplicado antes da renderização para evitar *flash* visual.
- **Navegação responsiva** com menu mobile (hambúrguer).
- **Acessibilidade**: HTML semântico, *skip link*, atributos ARIA, regiões `aria-live` e navegação por teclado.

---

## 🛠️ Tecnologias

- **HTML5** semântico
- **CSS3** puro (arquivo externo, sem pré-processadores)
- **JavaScript Vanilla** (ES5/ES6, em IIFEs, sem dependências)
- **GitHub Pages** para hospedagem (domínio personalizado via `CNAME`)

Sem framework, sem etapa de *build*, sem `node_modules`.

---

## 📁 Estrutura do projeto

```
guia-profissional-app/
├── index.html            # Página inicial (apresentação do projeto)
├── questionario.html     # Questionário de preparo para entrevistas
├── curriculo.html        # Gerador de currículo
├── sobre.html            # Contexto, objetivos e equipe
├── CNAME                 # Domínio personalizado (GitHub Pages)
├── assets/
│   ├── favicon.svg
│   ├── logo-brand.svg
│   └── icons/            # Ícones SVG das seções
├── css/
│   ├── styles.css        # Estilos da aplicação
│   └── print.css         # Estilos de impressão / PDF
└── js/
    ├── theme-init.js     # Aplica o tema antes do render (evita flash)
    ├── main.js           # Tema, menu mobile e ano do rodapé (global)
    ├── questionario.js   # Lógica do questionário e cálculo do perfil
    └── curriculo.js      # Formulário, preview em tempo real e impressão
```

---

## 🚀 Como executar localmente

Por ser um site estático, **não há instalação nem build**. Escolha uma das opções:

**Abrir diretamente**
- Basta abrir o arquivo `index.html` no navegador.

**Servidor local (recomendado)**

Usando Python:
```bash
python -m http.server 8000
```

Ou a extensão **Live Server** do VS Code (clique direito em `index.html` → *Open with Live Server*).

Depois acesse `http://localhost:8000`.

---

## 🌐 Deploy

O site é publicado automaticamente pelo **GitHub Pages** a partir da branch principal. O domínio personalizado é definido no arquivo [`CNAME`](CNAME) (`guia.theuxdev.uk`).

---

## 👥 Equipe

- [Matheus Berno](https://www.theuxdev.uk)
- Erick Ciribelli
- Alexander Fonseca

---

## 🎓 Contexto acadêmico

Trabalho de **Projeto de Extensão — Front-end 1**
Faminas — Análise e Desenvolvimento de Sistemas
