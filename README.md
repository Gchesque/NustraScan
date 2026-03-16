# NutraScan AI - Análise Inteligente de Suplementos

NutraScan AI é uma aplicação Full Stack projetada para ajudar usuários a entenderem a eficácia de seus suplementos através de Inteligência Artificial e evidências científicas.

## 🚀 Funcionalidades

- **Análise por IA**: Use o poder do GPT-4o para analisar listas de ingredientes.
- **Score de Qualidade**: Receba uma nota de 0 a 100 baseada em dosagens clínicas reais.
- **Persistência de Dados**: Integração com Supabase (PostgreSQL) para salvar seu histórico.
- **Sugestões Personalizadas**: Recomendações de produtos superiores e melhores preços.
- **Autenticação Segura**: Gerenciamento de usuários e sessões persistentes.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, TailwindCSS, Shadcn UI.
- **Backend**: Node.js, Express.
- **Banco de Dados**: PostgreSQL (Supabase) com Drizzle ORM.
- **IA**: OpenAI API (GPT-4o).

## ⚙️ Configuração

Para rodar o projeto localmente ou fazer o deploy, configure as seguintes variáveis de ambiente:

```env
DATABASE_URL=sua_url_do_supabase
SESSION_SECRET=uma_chave_secreta_longa
OPENAI_API_KEY=sua_chave_da_openai
```

## 📦 Deployment

O projeto está pronto para ser implantado em plataformas como:
- **Replit**: Use o arquivo `.replit` e o botão "Deploy".
- **Railway**: Conecte este repositório e configure as variáveis de ambiente.
- **Render**: Configure como um Web Service (Node.js).

---
Desenvolvido com foco em saúde e transparência. NutraScan AI - v1.2.0
