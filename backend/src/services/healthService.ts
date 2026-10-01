import { getPool } from '../config/database.js';

async function checkDatabase(): Promise<void> {
  await getPool().query('SELECT 1');
}

export const healthService = { checkDatabase };