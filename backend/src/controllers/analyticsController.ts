import type { RequestHandler } from 'express';
import { analyticsService } from '../services/analyticsService.js';

const list: RequestHandler = async (_request, response) => {
  response.json(await analyticsService.list());
};

export const analyticsController = { list };