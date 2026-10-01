import { getPool } from '../config/database.js';

interface AnalyticsRow {
  month: Date;
  accesses: number;
  conversions: number;
}

const monthLabels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

async function list() {
  const result = await getPool().query<AnalyticsRow>(`
    SELECT month, accesses, conversions
    FROM monthly_analytics
    ORDER BY month
  `);

  return result.rows.map((row) => ({
    mes: monthLabels[row.month.getUTCMonth()],
    acessos: row.accesses,
    conversoes: row.conversions,
  }));
}

export const analyticsService = { list };