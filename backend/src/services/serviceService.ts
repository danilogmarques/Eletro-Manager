import { getPrisma } from '../config/database.js';

interface ServiceRow {
  id: string;
  name: string;
  category: string;
  price: number;
  status: 'Available' | 'Unavailable';
}

async function list(): Promise<ServiceRow[]> {
  const services = await getPrisma().service.findMany({
    orderBy: { name: 'asc' },
  });

  return services.map((service) => ({
    id: service.id,
    name: service.name,
    category: service.category,
    price: Number(service.basePrice),
    status: service.active ? 'Available' : 'Unavailable',
  }));
}

export const serviceService = { list };