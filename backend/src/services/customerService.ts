import { getPool } from '../config/database.js';

interface CustomerRow {
  id: string;
  name: string;
  phone: string;
  lastService: string;
  status: 'Active' | 'Inactive' | 'Pending';
}

async function list(): Promise<CustomerRow[]> {
  const result = await getPool().query<CustomerRow>(`
    SELECT
      customer.id::text AS id,
      customer.name,
      customer.phone,
      COALESCE((
        SELECT service.name
        FROM budgets AS budget
        JOIN services AS service ON service.id = budget.service_id
        WHERE budget.customer_id = customer.id
        ORDER BY budget.created_at DESC
        LIMIT 1
      ), '') AS "lastService",
      customer.status
    FROM customers AS customer
    ORDER BY customer.name
  `);

  return result.rows.map((customer) => ({ ...customer, actions: [] }));
}

export const customerService = { list };