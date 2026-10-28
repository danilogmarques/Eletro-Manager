import { MOCK_ANALYTICS, MOCK_CUSTOMERS, MOCK_SERVICES } from '../mocks/appDataMock';
import { MOCK_ORCAMENTOS } from '../mocks/orcamentosMock';
import type { AnalyticsData, Customer, Orcamento, Service, WorkOrder } from '../types/types';

export type WorkOrderInput = {
  customerId: string;
  serviceId: string;
  description: string;
  address: string;
  scheduledAt: string;
};

export interface DataService {
  listBudgets(): Promise<Orcamento[]>;
  listCustomers(): Promise<Customer[]>;
  listServices(): Promise<Service[]>;
  listAnalytics(): Promise<AnalyticsData[]>;
  listWorkOrders(): Promise<WorkOrder[]>;
  createWorkOrder(input: WorkOrderInput): Promise<WorkOrder>;
}

const WORK_ORDERS_STORAGE_KEY = 'lumina-work-orders';

function isWorkOrder(value: unknown): value is WorkOrder {
  if (!value || typeof value !== 'object') return false;
  const order = value as Record<string, unknown>;
  return typeof order.id === 'string'
    && typeof order.customer === 'string'
    && typeof order.phone === 'string'
    && typeof order.service === 'string'
    && typeof order.description === 'string'
    && typeof order.address === 'string'
    && typeof order.scheduledAt === 'string'
    && typeof order.createdAt === 'string'
    && (order.status === 'Agendada' || order.status === 'Em andamento' || order.status === 'Concluída');
}

function getStoredWorkOrders(): WorkOrder[] {
  const stored = localStorage.getItem(WORK_ORDERS_STORAGE_KEY);
  if (!stored) return [];

  let parsed: unknown;
  try {
    parsed = JSON.parse(stored);
  } catch {
    throw new Error('Não foi possível ler as ordens salvas neste navegador.');
  }
  if (!Array.isArray(parsed) || !parsed.every(isWorkOrder)) {
    throw new Error('Os dados locais das ordens estão inválidos. Remova os dados locais para continuar.');
  }

  return parsed;
}

export const mockDataService: DataService = {
  async listBudgets() { return MOCK_ORCAMENTOS; },
  async listCustomers() { return MOCK_CUSTOMERS; },
  async listServices() { return MOCK_SERVICES; },
  async listAnalytics() { return MOCK_ANALYTICS; },
  async listWorkOrders() { return getStoredWorkOrders(); },
  async createWorkOrder(input) {
    const customer = MOCK_CUSTOMERS.find((item) => item.id === input.customerId);
    const service = MOCK_SERVICES.find((item) => item.id === input.serviceId);
    if (!customer || !service) throw new Error('Selecione um cliente e um serviço disponíveis.');

    const order: WorkOrder = {
      id: `OS-${Date.now().toString().slice(-6)}`,
      customer: customer.name,
      phone: customer.phone,
      service: service.name,
      description: input.description,
      address: input.address,
      scheduledAt: input.scheduledAt,
      status: 'Agendada',
      createdAt: new Date().toISOString(),
    };
    localStorage.setItem(WORK_ORDERS_STORAGE_KEY, JSON.stringify([order, ...getStoredWorkOrders()]));
    return order;
  },
};

export function createApiDataService(baseUrl: string): DataService {
  async function get<T>(resource: string): Promise<T> {
    const response = await fetch(`${baseUrl.replace(/\/$/, '')}/${resource}`);
    if (!response.ok) throw new Error(`Falha ao carregar ${resource}: ${response.status}`);
    return response.json() as Promise<T>;
  }

  async function send<T>(resource: string, method: string, body?: unknown): Promise<T> {
    const response = await fetch(`${baseUrl.replace(/\/$/, '')}/${resource}`, {
      method,
      headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
    if (!response.ok) {
      const payload = await response.json().catch(() => null) as { error?: string } | null;
      throw new Error(payload?.error ?? `Falha ao salvar ${resource}: ${response.status}`);
    }
    return response.json() as Promise<T>;
  }

  return {
    listBudgets: () => get<Orcamento[]>('orcamentos'),
    listCustomers: () => get<Customer[]>('clientes'),
    listServices: () => get<Service[]>('servicos'),
    listAnalytics: () => get<AnalyticsData[]>('relatorios/analytics'),
    listWorkOrders: () => get<WorkOrder[]>('ordens-servico'),
    createWorkOrder: (input) => send<WorkOrder>('ordens-servico', 'POST', input),
  };
}

const apiUrl = import.meta.env.VITE_API_URL;
export const dataService: DataService = apiUrl ? createApiDataService(apiUrl) : mockDataService;
export const dataSource = apiUrl ? 'API conectada' : 'Dados demonstrativos';