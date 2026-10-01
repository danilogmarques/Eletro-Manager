import type { ErrorRequestHandler } from 'express';
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

  const statusCode = error instanceof ApiError ? error.statusCode : 500;
  const message = error instanceof ApiError ? error.message : 'Erro interno do servidor';

  if (statusCode >= 500) {
    console.error(error);
  }

  response.status(statusCode).json({ error: message });
};