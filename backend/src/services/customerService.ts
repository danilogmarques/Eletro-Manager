import { getPrisma } from '../config/database.js';
import { ApiError } from '../errors/ApiError.js';
import { bodyRecord, enumValue, requiredString, uuidParam } from '../utils/validation.js';

const customerStatuses = ['Active', 'Inactive', 'Pending'] as const;

interface CustomerRow {
  id: string;
  name: string;
  phone: string;
  lastService: string;
  status: string;
  actions: never[];
}

async function list(): Promise<CustomerRow[]> {
  const customers = await getPrisma().customer.findMany({
    orderBy: { name: 'asc' },
    include: {
      budgets: {
        orderBy: { createdAt: 'desc' },
        take: 1,
        include: { service: true },
      },
      workOrders: {
        orderBy: { createdAt: 'desc' },
        take: 1,
        include: { service: true },
      },
    },
  });

  return customers.map((customer) => ({
    id: customer.id,
    name: customer.name,
    phone: customer.phone,
    lastService: customer.workOrders[0]
      && (!customer.budgets[0] || customer.workOrders[0].createdAt > customer.budgets[0].createdAt)
      ? customer.workOrders[0].service.name
      : customer.budgets[0]?.service.name ?? '',
    status: customer.status,
    actions: [],
  }));
}

async function create(input: unknown) {
  const body = bodyRecord(input);
  const customer = await getPrisma().customer.create({
    data: {
      name: requiredString(body, 'name', 160),
      phone: requiredString(body, 'phone', 40),
      status: enumValue(body.status ?? 'Active', customerStatuses, 'status'),
    },
  });

  return { ...customer, lastService: '', actions: [] };
}

async function update(id: string, input: unknown) {
  const body = bodyRecord(input);
  const data: { name?: string; phone?: string; status?: string } = {};
  if ('name' in body) data.name = requiredString(body, 'name', 160);
  if ('phone' in body) data.phone = requiredString(body, 'phone', 40);
  if ('status' in body) data.status = enumValue(body.status, customerStatuses, 'status');
  if (Object.keys(data).length === 0) throw new ApiError(400, 'Informe ao menos um campo para atualizar');

  const customer = await getPrisma().customer.update({ where: { id: uuidParam(id) }, data });
  return { ...customer, lastService: '', actions: [] };
}

async function remove(id: string) {
  await getPrisma().customer.delete({ where: { id: uuidParam(id) } });
}

export const customerService = { list, create, update, remove };