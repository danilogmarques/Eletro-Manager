import { getPrisma } from '../config/database.js';
import { ApiError } from '../errors/ApiError.js';
import { bodyRecord, enumValue, isoDate, requiredString, uuidParam } from '../utils/validation.js';

const statuses = ['Agendada', 'Em andamento', 'Concluída'] as const;

interface WorkOrderResponse {
  id: string;
  customer: string;
  phone: string;
  service: string;
  description: string;
  address: string;
  scheduledAt: string;
  status: (typeof statuses)[number];
  createdAt: string;
}

async function list(): Promise<WorkOrderResponse[]> {
  const orders = await getPrisma().workOrder.findMany({
    orderBy: { createdAt: 'desc' },
    include: { customer: { select: { name: true, phone: true } }, service: { select: { name: true } } },
  });
  return orders.map(mapWorkOrder);
}

async function create(input: unknown): Promise<WorkOrderResponse> {
  const body = bodyRecord(input);
  const customerId = requiredId(body.customerId, 'customerId');
  const serviceId = requiredId(body.serviceId, 'serviceId');
  await requireActiveService(serviceId);
  const order = await getPrisma().workOrder.create({
    data: {
      customerId,
      serviceId,
      description: requiredString(body, 'description', 2000, 5),
      address: requiredString(body, 'address', 500),
      scheduledAt: isoDate(body.scheduledAt, 'scheduledAt'),
    },
    include: { customer: { select: { name: true, phone: true } }, service: { select: { name: true } } },
  });
  return mapWorkOrder(order);
}

async function update(id: string, input: unknown): Promise<WorkOrderResponse> {
  const body = bodyRecord(input);
  const data: {
    customerId?: string;
    serviceId?: string;
    description?: string;
    address?: string;
    scheduledAt?: Date;
    status?: (typeof statuses)[number];
  } = {};
  if ('customerId' in body) data.customerId = requiredId(body.customerId, 'customerId');
  if ('serviceId' in body) {
    data.serviceId = requiredId(body.serviceId, 'serviceId');
    await requireActiveService(data.serviceId);
  }
  if ('description' in body) data.description = requiredString(body, 'description', 2000, 5);
  if ('address' in body) data.address = requiredString(body, 'address', 500);
  if ('scheduledAt' in body) data.scheduledAt = isoDate(body.scheduledAt, 'scheduledAt');
  if ('status' in body) data.status = enumValue(body.status, statuses, 'status');
  if (Object.keys(data).length === 0) throw new ApiError(400, 'Informe ao menos um campo para atualizar');

  const order = await getPrisma().workOrder.update({
    where: { id: uuidParam(id) },
    data,
    include: { customer: { select: { name: true, phone: true } }, service: { select: { name: true } } },
  });
  return mapWorkOrder(order);
}

async function remove(id: string): Promise<void> {
  await getPrisma().workOrder.delete({ where: { id: uuidParam(id) } });
}

function requiredId(value: unknown, field: string): string {
  if (typeof value !== 'string') throw new ApiError(400, `Campo "${field}" obrigatório`);
  return uuidParam(value);
}

async function requireActiveService(id: string): Promise<void> {
  const service = await getPrisma().service.findUnique({ where: { id }, select: { active: true } });
  if (!service) throw new ApiError(404, 'Serviço não encontrado');
  if (!service.active) throw new ApiError(400, 'Não é possível agendar um serviço indisponível');
}

function mapWorkOrder(order: {
  id: string;
  description: string;
  address: string;
  scheduledAt: Date;
  status: string;
  createdAt: Date;
  customer: { name: string; phone: string };
  service: { name: string };
}): WorkOrderResponse {
  return {
    id: order.id,
    customer: order.customer.name,
    phone: order.customer.phone,
    service: order.service.name,
    description: order.description,
    address: order.address,
    scheduledAt: order.scheduledAt.toISOString(),
    status: enumValue(order.status, statuses, 'status'),
    createdAt: order.createdAt.toISOString(),
  };
}

export const workOrderService = { list, create, update, remove };
