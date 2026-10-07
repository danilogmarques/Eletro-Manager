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

- `GET /api/clientes`
- `GET /api/servicos`
- `GET /api/orcamentos`
- `GET /api/relatorios/analytics`
- `GET /api/health`
- `GET /api/db/health`

Os endpoints de dados são somente leitura por enquanto. Erros da API e rotas inexistentes são tratados pelos middlewares globais.

## Próximos passos

- Implementar operações de criação, edição e remoção.
- Adicionar autenticação real antes de disponibilizar o sistema.