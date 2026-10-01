import { getPool } from '../config/database.js';

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
  const result = await getPool().query<BudgetRow>(`
    SELECT
      budget.id::text AS id,
      customer.name AS client,
      service.name AS service,
      budget.price::float8 AS price,
      (budget.status = 'approved') AS status,
      budget.created_at AS data
    FROM budgets AS budget
    JOIN customers AS customer ON customer.id = budget.customer_id
    JOIN services AS service ON service.id = budget.service_id
    ORDER BY budget.created_at DESC
  `);

  return result.rows.map((budget) => ({
    ...budget,
    data: budget.data.toISOString(),
  }));
}

export const budgetService = { list };