import type { RequestHandler } from 'express';
import { serviceService } from '../services/serviceService.js';
import { uuidParam } from '../utils/validation.js';

const list: RequestHandler = async (_request, response) => {
  response.json(await serviceService.list());
};

const create: RequestHandler = async (request, response) => {
  response.status(201).json(await serviceService.create(request.body));
};

const update: RequestHandler = async (request, response) => {
  const id = uuidParam(request.params.id);
  response.json(await serviceService.update(id, request.body));
};

const remove: RequestHandler = async (request, response) => {
  const id = uuidParam(request.params.id);
  await serviceService.remove(id);
  response.status(204).end();
};

export const serviceController = { list, create, update, remove };