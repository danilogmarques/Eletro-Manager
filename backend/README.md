# Lumina Backend

API em Express e TypeScript, organizada em `routes`, `controllers`, `services` e `middlewares`. As rotas ficam sob `/api`.

## Desenvolvimento

```sh
npm install
cp .env.example .env
npm run db:generate
npm run db:migrate
npm run dev
```

`GET /api/health` verifica a API. `GET /api/db/health` e os endpoints de dados testam o PostgreSQL via services.

Crie o banco e o usuário no PostgreSQL e configure `DATABASE_URL` no `.env`. O schema e as migrações são gerenciados pelo Prisma em `prisma/schema.prisma` e `prisma/migrations`. Para aplicar migrações existentes em produção, use `npm run db:deploy`. Nunca versione o `.env`. A API pode iniciar sem banco; os endpoints de dados retornam erro até que `DATABASE_URL` esteja configurada.

Se o banco já tiver sido criado com o antigo `database/schema.sql`, faça backup e confira se as tabelas correspondem à migração inicial. Nesse caso, registre a migração como aplicada antes de usar `npm run db:deploy`:

```sh
npm exec prisma -- migrate resolve --applied 20261006201900_init
```

## Endpoints disponíveis

- `GET /api/clientes`, `POST /api/clientes`, `PATCH /api/clientes/:id`, `DELETE /api/clientes/:id`
- `GET /api/servicos`, `POST /api/servicos`, `PATCH /api/servicos/:id`, `DELETE /api/servicos/:id`
- `GET /api/orcamentos`, `POST /api/orcamentos`, `PATCH /api/orcamentos/:id`, `DELETE /api/orcamentos/:id`
- `GET /api/ordens-servico`, `POST /api/ordens-servico`, `PATCH /api/ordens-servico/:id`, `DELETE /api/ordens-servico/:id`
- `GET /api/relatorios/analytics`
- `GET /api/health`
- `GET /api/db/health`

Criação e atualização validam campos, status, valores e identificadores; exclusões que violem vínculos retornam `409 Conflict`. Ordens de serviço são persistidas em `work_orders` e vinculadas a clientes e serviços ativos. A interface continua usando armazenamento local para ordens quando `VITE_API_URL` não estiver configurada.

Após atualizar o código, aplique a nova migração antes de usar ordens de serviço:

```sh
npm run db:deploy
```

O login da interface continua demonstrativo e não protege os endpoints. Implemente autenticação e autorização antes de disponibilizar a API fora de um ambiente confiável.