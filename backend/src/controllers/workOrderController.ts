import type { RequestHandler } from 'express';
import { workOrderService } from '../services/workOrderService.js';
import { uuidParam } from '../utils/validation.js';

const list: RequestHandler = async (_request, response) => {
  response.json(await workOrderService.list());
};

const create: RequestHandler = async (request, response) => {
  response.status(201).json(await workOrderService.create(request.body));
};

const update: RequestHandler = async (request, response) => {
  const id = uuidParam(request.params.id);
  response.json(await workOrderService.update(id, request.body));
};

const remove: RequestHandler = async (request, response) => {
  const id = uuidParam(request.params.id);
  await workOrderService.remove(id);
  response.status(204).end();
};

export const workOrderController = { list, create, update, remove };
