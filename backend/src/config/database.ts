import { PrismaClient } from '@prisma/client';
import { ApiError } from '../errors/ApiError.js';

export const prisma = new PrismaClient();

export function getPrisma(): PrismaClient {
  if (!process.env.DATABASE_URL) {
    throw new ApiError(503, 'Banco de dados não configurado');
  }

  return prisma;
}