import type { RequestHandler } from 'express';
import { serviceService } from '../services/serviceService.js';

const list: RequestHandler = async (_request, response) => {
  response.json(await serviceService.list());
};

export const serviceController = { list };