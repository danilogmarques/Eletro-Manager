export type CustomerStatus = 'Active' | 'Inactive' | 'Pending';

export interface Customer {
  id: string; 
  name: string;
  phone: string;
  lastService: string;
  status: CustomerStatus;
  actions: string[]; 
}

export interface Orcamento {
  id: string;
  client: string;
  service: string;
  price: number;
  status: boolean;
  data: string;
};

export interface Service {
  id: string;
  name: string;
  category: string;
  price: number;
  status: 'Available' | 'Unavailable';
}

export interface AnalyticsData {
  mes: string;
  acessos: number;
  conversoes: number;
}
