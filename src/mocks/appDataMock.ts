import type { AnalyticsData, Customer, Service } from '../types/types';

export const MOCK_CUSTOMERS: Customer[] = [
  { id: 'cli-101', name: 'João Silva', phone: '(11) 99912-3401', lastService: 'Instalação de iluminação', status: 'Active', actions: [] },
  { id: 'cli-102', name: 'Maria Oliveira', phone: '(11) 99876-2310', lastService: 'Revisão de quadro elétrico', status: 'Pending', actions: [] },
  { id: 'cli-103', name: 'Empresa ABC', phone: '(11) 4002-8922', lastService: 'Manutenção preventiva', status: 'Active', actions: [] },
  { id: 'cli-104', name: 'Carlos Souza', phone: '(11) 99771-0456', lastService: 'Reparo de instalação', status: 'Inactive', actions: [] },
];

export const MOCK_SERVICES: Service[] = [
  { id: 'srv-101', name: 'Instalação de iluminação', category: 'Instalação', price: 850, status: 'Available' },
  { id: 'srv-102', name: 'Revisão de quadro elétrico', category: 'Manutenção', price: 420, status: 'Available' },
  { id: 'srv-103', name: 'Manutenção preventiva', category: 'Manutenção', price: 650, status: 'Available' },
  { id: 'srv-104', name: 'Reparo de instalação', category: 'Reparo', price: 180, status: 'Unavailable' },
];

export const MOCK_ANALYTICS: AnalyticsData[] = [
  { mes: 'Abr', acessos: 28, conversoes: 12 },
  { mes: 'Mai', acessos: 34, conversoes: 17 },
  { mes: 'Jun', acessos: 31, conversoes: 14 },
  { mes: 'Jul', acessos: 42, conversoes: 21 },
  { mes: 'Ago', acessos: 38, conversoes: 19 },
  { mes: 'Set', acessos: 49, conversoes: 27 },
];