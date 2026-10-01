import type { RequestHandler } from 'express';
import { budgetService } from '../services/budgetService.js';

const list: RequestHandler = async (_request, response) => {
  response.json(await budgetService.list());
};

export const budgetController = { list };