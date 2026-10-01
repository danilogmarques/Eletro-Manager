import 'dotenv/config';
import { app } from './app.js';
import { pool } from './config/database.js';

const port = Number(process.env.PORT ?? 3000);
const server = app.listen(port, () => {
  console.log(`Lumina API disponível em http://localhost:${port}`);
});

for (const signal of ['SIGINT', 'SIGTERM'] as const) {
  process.once(signal, () => {
    server.close(() => {
      void pool?.end().finally(() => process.exit(0));
    });
  });
}