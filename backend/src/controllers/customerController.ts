import type { RequestHandler } from 'express';
import { customerService } from '../services/customerService.js';
import { uuidParam } from '../utils/validation.js';

const list: RequestHandler = async (_request, response) => {
  response.json(await customerService.list());
};

const create: RequestHandler = async (request, response) => {
  response.status(201).json(await customerService.create(request.body));
};

const update: RequestHandler = async (request, response) => {
  const id = uuidParam(request.params.id);
  response.json(await customerService.update(id, request.body));
};

const remove: RequestHandler = async (request, response) => {
  const id = uuidParam(request.params.id);
  await customerService.remove(id);
  response.status(204).end();
};

export const customerController = { list, create, update, remove };