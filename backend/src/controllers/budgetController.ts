import type { RequestHandler } from 'express';
import { budgetService } from '../services/budgetService.js';
import { uuidParam } from '../utils/validation.js';

const list: RequestHandler = async (_request, response) => {
  response.json(await budgetService.list());
};

const create: RequestHandler = async (request, response) => {
  response.status(201).json(await budgetService.create(request.body));
};

const update: RequestHandler = async (request, response) => {
  const id = uuidParam(request.params.id);
  response.json(await budgetService.update(id, request.body));
};

const remove: RequestHandler = async (request, response) => {
  const id = uuidParam(request.params.id);
  await budgetService.remove(id);
  response.status(204).end();
};

export const budgetController = { list, create, update, remove };