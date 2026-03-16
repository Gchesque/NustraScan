# Changelog

## [v1.2.0] - 2026-03-16

### Added
- Integração oficial com a API da OpenAI (GPT-4o) para análise de suplementos.
- Sistema de fallback para dados simulados em caso de falha ou limite de cota da API.
- Testes funcionais de ponta a ponta (Auth -> IA -> DB).

## [v1.1.0] - 2026-03-16

### Added
- Conexão persistente com PostgreSQL (Supabase) utilizando Drizzle ORM.
- Implementação de `DatabaseStorage` para persistência de usuários e análises.
- Persistência de sessões no banco de dados utilizando `connect-pg-simple`.
- Configuração de ambiente via `.env` para segurança das credenciais.

## [v1.0.1] - 2026-03-16

### Fixed
- Erro 500 no carregamento de imagens da pasta `attached_assets` (Rota estática adicionada no backend).
- Erro "Failed to fetch dynamically imported module" nas páginas de Histórico e Perfil (Imports dinâmicos ajustados para caminhos relativos).
- Imports ausentes e erros de lint em `server/routes.ts`.

### Added
- Estrutura `.context/` com `CLAUDE.md`, `AGENTS.md` e `rules.md` para diretrizes de agentes.
