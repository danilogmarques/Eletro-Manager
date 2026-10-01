// src/mocks/orcamentosMock.ts
import { Orcamento } from '../types/types';

export const MOCK_ORCAMENTOS: Orcamento[] = [
  {
    id: "orc-101",
    client: "João Silva",
    service: "Instalação de iluminação",
    price: 850,
    status: true,
    data: "2026-09-28T14:30:00.000Z",
  },
  {
    id: "orc-102",
    client: "Maria Oliveira",
    service: "Revisão de quadro elétrico",
    price: 1200,
    status: false,
    data: "2026-09-30T10:00:00.000Z",
  },
  {
    id: "orc-103",
    client: "Empresa ABC",
    service: "Manutenção preventiva",
    price: 2500,
    status: true,
    data: "2026-10-02T16:15:00.000Z",
  },
  {
    id: "orc-104",
    client: "Carlos Souza",
    service: "Reparo de instalação",
    price: 180,
    status: false,
    data: "2026-10-03T09:00:00.000Z",
  },
];
