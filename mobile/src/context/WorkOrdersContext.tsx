import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

export type WorkOrder = {
  id: string;
  service: string;
  customer: string;
  address: string;
  scheduledFor: string;
  status: 'pending' | 'inProgress' | 'completed';
  description: string;
  report: string;
  photos: string[];
};

const initialOrders: WorkOrder[] = [
  {
    id: 'OS-2048',
    service: 'Instalação de luminárias',
    customer: 'Mariana Costa',
    address: 'Rua das Acácias, 184 · Centro',
    scheduledFor: 'Hoje, 09:00',
    status: 'inProgress',
    description: 'Instalação de 4 luminárias de teto na sala e nos quartos.',
    report: '',
    photos: [],
  },
  {
    id: 'OS-2049',
    service: 'Revisão do quadro elétrico',
    customer: 'Rafael Mendes',
    address: 'Av. Brasil, 920 · Jardim América',
    scheduledFor: 'Hoje, 14:30',
    status: 'pending',
    description: 'Verificar disjuntores e identificar a causa das quedas de energia.',
    report: '',
    photos: [],
  },
  {
    id: 'OS-2047',
    service: 'Troca de tomadas',
    customer: 'Luciana Prado',
    address: 'Rua Ipê Roxo, 55 · Vila Nova',
    scheduledFor: 'Ontem, 16:00',
    status: 'completed',
    description: 'Substituição de tomadas antigas na cozinha.',
    report: 'Tomadas substituídas e funcionamento testado.',
    photos: [],
  },
];

type WorkOrdersContextValue = {
  orders: WorkOrder[];
  saveReport: (orderId: string, report: string, photos: string[]) => void;
};

const WorkOrdersContext = createContext<WorkOrdersContextValue | null>(null);

export function WorkOrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState(initialOrders);

  const value = useMemo(
    () => ({
      orders,
      saveReport: (orderId: string, report: string, photos: string[]) => {
        setOrders((currentOrders) =>
          currentOrders.map((order) =>
            order.id === orderId
              ? { ...order, report, photos, status: 'completed' }
              : order,
          ),
        );
      },
    }),
    [orders],
  );

  return <WorkOrdersContext.Provider value={value}>{children}</WorkOrdersContext.Provider>;
}

export function useWorkOrders() {
  const context = useContext(WorkOrdersContext);
  if (!context) {
    throw new Error('useWorkOrders deve ser usado dentro de WorkOrdersProvider.');
  }
  return context;
}
