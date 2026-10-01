import type { RequestHandler } from 'express';
import { customerService } from '../services/customerService.js';

const list: RequestHandler = async (_request, response) => {
  response.json(await customerService.list());
};

export const customerController = { list };