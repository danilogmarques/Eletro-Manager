import { Pool } from 'pg';
import { ApiError } from '../errors/ApiError.js';

const connectionString = process.env.DATABASE_URL;

export const pool = connectionString
  ? new Pool({ connectionString })
  : null;

pool?.on('error', (error) => {
  console.error('Erro inesperado no pool PostgreSQL:', error.message);
});

export function getPool(): Pool {
  if (!pool) {
    throw new ApiError(503, 'Banco de dados não configurado');
  }

  return pool;
}