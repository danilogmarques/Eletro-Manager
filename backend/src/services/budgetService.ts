import { getPrisma } from '../config/database.js';
import { ApiError } from '../errors/ApiError.js';
import { bodyRecord, nonNegativeNumber, uuidParam } from '../utils/validation.js';

interface BudgetRow {
  id: string;
  client: string;
  service: string;
  price: number;
  status: boolean;
  data: Date;
}

type BudgetResponse = Omit<BudgetRow, 'data'> & { data: string };

async function list(): Promise<BudgetResponse[]> {
  const budgets = await getPrisma().budget.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      customer: { select: { name: true } },
      service: { select: { name: true } },
    },
  });

  return budgets.map((budget) => ({
    id: budget.id,
    client: budget.customer.name,
    service: budget.service.name,
    price: Number(budget.price),
    status: budget.status === 'approved',
    data: budget.createdAt.toISOString(),
  }));
}

async function create(input: unknown): Promise<BudgetResponse> {
  const body = bodyRecord(input);
  if (typeof body.customerId !== 'string' || typeof body.serviceId !== 'string') {
    throw new ApiError(400, 'Cliente e serviço são obrigatórios');
  }
  const status = parseStatus(body.status ?? false);
  const budget = await getPrisma().budget.create({
    data: {
      customerId: uuidParam(body.customerId),
      serviceId: uuidParam(body.serviceId),
      price: nonNegativeNumber(body.price, 'price'),
      status,
    },
    include: { customer: { select: { name: true } }, service: { select: { name: true } } },
  });
  return mapBudget(budget);
}

async function update(id: string, input: unknown): Promise<BudgetResponse> {
  const body = bodyRecord(input);
  const data: { price?: number; status?: string; customerId?: string; serviceId?: string } = {};
  if ('price' in body) data.price = nonNegativeNumber(body.price, 'price');
  if ('status' in body) data.status = parseStatus(body.status);
  if ('customerId' in body) {
    if (typeof body.customerId !== 'string') throw new ApiError(400, 'Cliente inválido');
    data.customerId = uuidParam(body.customerId);
  }
  if ('serviceId' in body) {
    if (typeof body.serviceId !== 'string') throw new ApiError(400, 'Serviço inválido');
    data.serviceId = uuidParam(body.serviceId);
  }
  if (Object.keys(data).length === 0) throw new ApiError(400, 'Informe ao menos um campo para atualizar');

  const budget = await getPrisma().budget.update({
    where: { id: uuidParam(id) },
    data,
    include: { customer: { select: { name: true } }, service: { select: { name: true } } },
  });
  return mapBudget(budget);
}

async function remove(id: string) {
  await getPrisma().budget.delete({ where: { id: uuidParam(id) } });
}

function parseStatus(value: unknown): 'approved' | 'pending' {
  if (value === true || value === 'approved') return 'approved';
  if (value === false || value === 'pending') return 'pending';
  throw new ApiError(400, 'Campo "status" deve ser booleano ou approved/pending');
}

function mapBudget(budget: {
  id: string;
  price: unknown;
  status: string;
  createdAt: Date;
  customer: { name: string };
  service: { name: string };
}): BudgetResponse {
  return {
    id: budget.id,
    client: budget.customer.name,
    service: budget.service.name,
    price: Number(budget.price),
    status: budget.status === 'approved',
    data: budget.createdAt.toISOString(),
  };
}

export const budgetService = { list, create, update, remove };