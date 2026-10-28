import { getPrisma } from '../config/database.js';
import { ApiError } from '../errors/ApiError.js';
import { bodyRecord, nonNegativeNumber, requiredString, uuidParam } from '../utils/validation.js';

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

async function create(input: unknown): Promise<ServiceRow> {
  const body = bodyRecord(input);
  const service = await getPrisma().service.create({
    data: {
      name: requiredString(body, 'name', 160),
      category: requiredString(body, 'category', 100),
      basePrice: nonNegativeNumber(body.price, 'price'),
      active: body.status === undefined ? true : parseStatus(body.status),
    },
  });

  return mapService(service);
}

async function update(id: string, input: unknown): Promise<ServiceRow> {
  const body = bodyRecord(input);
  const data: { name?: string; category?: string; basePrice?: number; active?: boolean } = {};
  if ('name' in body) data.name = requiredString(body, 'name', 160);
  if ('category' in body) data.category = requiredString(body, 'category', 100);
  if ('price' in body) data.basePrice = nonNegativeNumber(body.price, 'price');
  if ('status' in body) data.active = parseStatus(body.status);
  if (Object.keys(data).length === 0) throw new ApiError(400, 'Informe ao menos um campo para atualizar');

  return mapService(await getPrisma().service.update({ where: { id: uuidParam(id) }, data }));
}

async function remove(id: string) {
  await getPrisma().service.delete({ where: { id: uuidParam(id) } });
}

function parseStatus(value: unknown): boolean {
  if (value === 'Available' || value === true) return true;
  if (value === 'Unavailable' || value === false) return false;
  throw new ApiError(400, 'Campo "status" deve ser Available ou Unavailable');
}

function mapService(service: {
  id: string;
  name: string;
  category: string;
  basePrice: unknown;
  active: boolean;
}): ServiceRow {
  return {
    id: service.id,
    name: service.name,
    category: service.category,
    price: Number(service.basePrice),
    status: service.active ? 'Available' : 'Unavailable',
  };
}

export const serviceService = { list, create, update, remove };