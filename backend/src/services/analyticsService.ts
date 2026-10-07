import { getPrisma } from '../config/database.js';

const monthLabels = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

async function list() {
  const analytics = await getPrisma().monthlyAnalytics.findMany({
    orderBy: { month: 'asc' },
  });

  return analytics.map((row) => ({
    mes: monthLabels[row.month.getUTCMonth()],
    acessos: row.accesses,
    conversoes: row.conversions,
  }));
}

export const analyticsService = { list };