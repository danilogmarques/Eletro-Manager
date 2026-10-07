import { getPrisma } from '../config/database.js';

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

export const budgetService = { list };