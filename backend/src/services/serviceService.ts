import { getPool } from '../config/database.js';

interface ServiceRow {
  id: string;
  name: string;
  category: string;
  price: number;
  status: 'Available' | 'Unavailable';
}

async function list(): Promise<ServiceRow[]> {
  const result = await getPool().query<ServiceRow>(`
    SELECT
      id::text AS id,
      name,
      category,
      base_price::float8 AS price,
      CASE WHEN active THEN 'Available' ELSE 'Unavailable' END AS status
    FROM services
    ORDER BY name
  `);

  return result.rows;
}

export const serviceService = { list };