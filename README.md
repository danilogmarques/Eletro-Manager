# React + Vite

## Lumina Gestão

Execute `npm install` e `npm run dev` para iniciar o painel. O login demonstrativo usa `eletricista@lumina.com` e `eletrica2026`; ele não substitui autenticação real e não deve ser usado em produção.

## Ambiente local com Docker Compose

Com Docker e o plugin Docker Compose instalados, inicie o dashboard, a API e o PostgreSQL na raiz do projeto:

```sh
docker compose up --build
```

Acesse o dashboard em `http://localhost:5173` e a API em `http://localhost:3000/api`. A API aplica as migrações do Prisma quando inicia, após o banco ficar pronto. Os dados do PostgreSQL ficam no volume `postgres_data` e são preservados ao parar os serviços com `docker compose down`.

Para remover também os dados locais do banco, use `docker compose down --volumes`. As credenciais definidas no Compose são apenas para desenvolvimento local; não as reutilize em produção.

Sem configuração, os módulos usam os dados compartilhados em `src/mocks/orcamentosMock.ts` e `src/mocks/appDataMock.ts`. Para conectar uma API, defina `VITE_API_URL` no ambiente do Vite. O adaptador em `src/services/dataService.ts` espera respostas JSON em:

- `GET /orcamentos`
- `GET /clientes`
- `GET /servicos`
- `GET /relatorios/analytics`

As respostas devem seguir os tipos de `src/types/types.ts`. As páginas consomem a interface `DataService`, permitindo trocar o adaptador sem alterar os componentes.

O menu **Ordens de serviço** permite cadastrar e acompanhar ordens pelo dashboard. Por enquanto, essas ordens são armazenadas no `localStorage` do navegador; a API ainda não oferece endpoints para criá-las nem compartilhá-las com o app mobile.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
