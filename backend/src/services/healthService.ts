import { getPrisma } from '../config/database.js';

async function checkDatabase(): Promise<void> {
  await getPrisma().$queryRaw`SELECT 1`;
}

export const healthService = { checkDatabase };