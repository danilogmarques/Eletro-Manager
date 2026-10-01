import type { RequestHandler } from 'express';
import { healthService } from '../services/healthService.js';

const getApiHealth: RequestHandler = (_request, response) => {
  response.json({
    status: 'ok',
    service: 'lumina-api',
    timestamp: new Date().toISOString(),
  });
};

const getDatabaseHealth: RequestHandler = async (_request, response) => {
  await healthService.checkDatabase();
  response.json({ status: 'connected' });
};

export const healthController = { getApiHealth, getDatabaseHealth };