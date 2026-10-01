// src/mocks/orcamentosMock.ts
import { Orcamento } from '../types/types';

export const MOCK_ORCAMENTOS: Orcamento[] = [
  {
    id: "orc-101",
    client: "TechSolutions Ltda",
    service: "Desenvolvimento de Landing Page",
    price: 3500.00,
    status: true, 
    data: "2026-09-28T14:30:00.000Z"
  },
  {
    id: "orc-102",
    client: "Clínica Sorriso",
    service: "Consultoria de SEO e Tráfego Pago",
    price: 1800.50,
    status: false, 
    data: "2026-09-30T10:00:00.000Z"
  },
  {
    id: "orc-103",
    client: "Restaurante Sabor Local",
    service: "Identidade Visual e Menu Digital",
    price: 2400.00,
    status: true,
    data: "2026-10-02T16:15:00.000Z"
  }
];
