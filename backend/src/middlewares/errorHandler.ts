import type { ErrorRequestHandler } from 'express';
import { Prisma } from '@prisma/client';
import { ApiError } from '../errors/ApiError.js';

export const errorHandler: ErrorRequestHandler = (error, _request, response, next) => {
  if (response.headersSent) {
    next(error);
    return;
  }

  if (error instanceof SyntaxError && 'body' in error) {
    response.status(400).json({ error: 'JSON da requisição inválido' });
    return;
  }

  let statusCode = error instanceof ApiError ? error.statusCode : 500;
  let message = error instanceof ApiError ? error.message : 'Erro interno do servidor';

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    if (error.code === 'P2025') {
      statusCode = 404;
      message = 'Registro não encontrado';
    } else if (error.code === 'P2003') {
      statusCode = 409;
      message = 'Registro relacionado impede esta operação';
    } else if (error.code === 'P2000') {
      statusCode = 400;
      message = 'Um campo excede o limite permitido';
    }
  }

  if (statusCode >= 500) {
    console.error(error);
  }

  response.status(statusCode).json({ error: message });
};