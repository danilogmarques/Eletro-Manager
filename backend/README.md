# Lumina Backend

API em Express e TypeScript, organizada em `routes`, `controllers`, `services` e `middlewares`. As rotas ficam sob `/api`.

## Desenvolvimento

```sh
npm install
cp .env.example .env
npm run dev
```

`GET /api/health` verifica a API. `GET /api/db/health` e os endpoints de dados testam o PostgreSQL via services.

Crie o banco e o usuário no PostgreSQL, configure `DATABASE_URL` no `.env` e aplique o esquema inicial com `psql -d lumina_gestao -f database/schema.sql`. Nunca versione o `.env`. A API inicia sem banco para permitir o desenvolvimento dos endpoints.

## Endpoints disponíveis

- `GET /api/clientes`
- `GET /api/servicos`
- `GET /api/orcamentos`
- `GET /api/relatorios/analytics`
- `GET /api/health`
- `GET /api/db/health`

Os endpoints de dados são somente leitura por enquanto. Erros da API e rotas inexistentes são tratados pelos middlewares globais.

## Próximos passos

- Adicionar scripts de migração e seeds para substituir os mocks.
- Implementar operações de criação, edição e remoção.
- Adicionar autenticação real antes de disponibilizar o sistema.