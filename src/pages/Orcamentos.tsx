import { useState } from "react";
import { Search, FileText } from "lucide-react";
import { dataService } from "@/services/dataService";
import { useAsyncData } from "@/hooks/useAsyncData";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function Orcamentos() {
  const [search, setSearch] = useState('');
  const { data: budgets, loading, error } = useAsyncData(dataService.listBudgets, []);
  const filteredBudgets = budgets.filter((budget) => `${budget.id} ${budget.client} ${budget.service}`.toLowerCase().includes(search.toLowerCase()));
  const approved = budgets.filter((budget) => budget.status);
  const pending = budgets.filter((budget) => !budget.status);
  const formatCurrency = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <section className="page-shell">
      <header className="page-heading"><div><p className="eyebrow">PROPOSTAS COMERCIAIS</p><h1>Orçamentos</h1><p className="text-muted-foreground">Acompanhe valores e aprovação de propostas.</p></div></header>
      <section className="budget-summary">
        <article className="summary-item"><span className="summary-icon"><FileText size={19} /></span><div><p>Total emitido</p><strong>{formatCurrency(budgets.reduce((total, budget) => total + budget.price, 0))}</strong></div></article>
        <article className="summary-item"><span className="summary-icon summary-icon-green">✓</span><div><p>Aprovados</p><strong>{formatCurrency(approved.reduce((total, budget) => total + budget.price, 0))}</strong></div></article>
        <article className="summary-item"><span className="summary-icon summary-icon-amber">◷</span><div><p>Aguardando</p><strong>{formatCurrency(pending.reduce((total, budget) => total + budget.price, 0))}</strong></div></article>
      </section>
      <div className="table-toolbar"><div className="search-field"><Search size={17} /><Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar cliente ou serviço" aria-label="Buscar orçamentos" /></div><span className="result-count">{filteredBudgets.length} propostas</span></div>
      {error && <p className="page-error" role="alert">{error}</p>}
      <div className="data-table-wrap"><Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-25">Cód.</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Serviço</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? <TableRow><TableCell colSpan={7}>Carregando orçamentos...</TableCell></TableRow> : filteredBudgets.map((budget) => <TableRow key={budget.id}>
              <TableCell className="font-medium">{budget.id.toUpperCase()}</TableCell><TableCell>{budget.client}</TableCell><TableCell className="text-muted-foreground">{budget.service}</TableCell><TableCell className="font-semibold">{formatCurrency(budget.price)}</TableCell><TableCell>{new Date(budget.data).toLocaleDateString('pt-BR')}</TableCell>
              <TableCell><Badge variant="outline" className={budget.status ? 'status-approved' : 'status-pending'}>{budget.status ? 'Aprovado' : 'Pendente'}</Badge></TableCell><TableCell className="text-right">—</TableCell>
            </TableRow>)}
            {!loading && filteredBudgets.length === 0 && <TableRow><TableCell colSpan={7}>Nenhum orçamento encontrado.</TableCell></TableRow>}
          </TableBody>
          </Table></div>
      </section>
  );
}
