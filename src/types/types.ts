export type CustomerStatus = 'Active' | 'Inactive' | 'Pending';

export interface Customer {
  id: string; 
  name: string;
  phone: string;
  lastService: string;
  status: CustomerStatus;
  actions: string[]; 
}
