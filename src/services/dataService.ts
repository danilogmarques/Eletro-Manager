import { MOCK_ANALYTICS, MOCK_CUSTOMERS, MOCK_SERVICES } from '../mocks/appDataMock';
import { MOCK_ORCAMENTOS } from '../mocks/orcamentosMock';
import type { AnalyticsData, Customer, Orcamento, Service } from '../types/types';

export interface DataService {
  listBudgets(): Promise<Orcamento[]>;
  listCustomers(): Promise<Customer[]>;
  listServices(): Promise<Service[]>;
  listAnalytics(): Promise<AnalyticsData[]>;
}

export const mockDataService: DataService = {
  async listBudgets() { return MOCK_ORCAMENTOS; },
  async listCustomers() { return MOCK_CUSTOMERS; },
  async listServices() { return MOCK_SERVICES; },
  async listAnalytics() { return MOCK_ANALYTICS; },
};

export function createApiDataService(baseUrl: string): DataService {
  async function get<T>(resource: string): Promise<T> {
    const response = await fetch(`${baseUrl.replace(/\/$/, '')}/${resource}`);
    if (!response.ok) throw new Error(`Falha ao carregar ${resource}: ${response.status}`);
    return response.json() as Promise<T>;
  }

  return {
    listBudgets: () => get<Orcamento[]>('orcamentos'),
    listCustomers: () => get<Customer[]>('clientes'),
    listServices: () => get<Service[]>('servicos'),
    listAnalytics: () => get<AnalyticsData[]>('relatorios/analytics'),
  };
}

const apiUrl = import.meta.env.VITE_API_URL;
export const dataService: DataService = apiUrl ? createApiDataService(apiUrl) : mockDataService;
export const dataSource = apiUrl ? 'API conectada' : 'Dados demonstrativos';