import { getPrisma } from '../config/database.js';

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
    },
  });

  return customers.map((customer) => ({
    id: customer.id,
    name: customer.name,
    phone: customer.phone,
    lastService: customer.budgets[0]?.service.name ?? '',
    status: customer.status,
    actions: [],
  }));
}

export const customerService = { list };