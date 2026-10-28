import { Router } from 'express';
import { analyticsController, budgetController, customerController, serviceController, workOrderController } from '../controllers/index.js';
import { healthRoutes } from './healthRoutes.js';

export const apiRoutes = Router();

apiRoutes.use(healthRoutes);
apiRoutes.get('/clientes', customerController.list);
apiRoutes.post('/clientes', customerController.create);
apiRoutes.patch('/clientes/:id', customerController.update);
apiRoutes.delete('/clientes/:id', customerController.remove);
apiRoutes.get('/servicos', serviceController.list);
apiRoutes.post('/servicos', serviceController.create);
apiRoutes.patch('/servicos/:id', serviceController.update);
apiRoutes.delete('/servicos/:id', serviceController.remove);
apiRoutes.get('/orcamentos', budgetController.list);
apiRoutes.post('/orcamentos', budgetController.create);
apiRoutes.patch('/orcamentos/:id', budgetController.update);
apiRoutes.delete('/orcamentos/:id', budgetController.remove);
apiRoutes.get('/ordens-servico', workOrderController.list);
apiRoutes.post('/ordens-servico', workOrderController.create);
apiRoutes.patch('/ordens-servico/:id', workOrderController.update);
apiRoutes.delete('/ordens-servico/:id', workOrderController.remove);
apiRoutes.get('/relatorios/analytics', analyticsController.list);