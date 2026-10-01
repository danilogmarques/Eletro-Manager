import { useState } from "react";
import { Search, Users } from "lucide-react";
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

export function CustomersTable() {
  const [search, setSearch] = useState('');
  const { data: customers, loading, error } = useAsyncData(dataService.listCustomers, []);
  const filteredCustomers = customers.filter((customer) => `${customer.name} ${customer.phone} ${customer.lastService}`.toLowerCase().includes(search.toLowerCase()));

  return (
    <section className="page-shell">
      <header className="page-heading"><div><p className="eyebrow">RELACIONAMENTO</p><h1>Clientes</h1><p className="text-muted-foreground">Seus contatos e atendimentos recentes.</p></div></header>
      <div className="table-toolbar"><div className="search-field"><Search size={17} /><Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar cliente ou serviço" aria-label="Buscar clientes" /></div><span className="result-count"><Users size={16} /> {filteredCustomers.length} clientes</span></div>
      {error && <p className="page-error" role="alert">{error}</p>}
      <div className="data-table-wrap"><Table>
          <TableHeader>
            <TableRow>
              <TableHead>Cliente</TableHead>
              <TableHead>Telefone</TableHead>
              <TableHead>Último serviço</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? <TableRow><TableCell colSpan={4}>Carregando clientes...</TableCell></TableRow> : filteredCustomers.map((customer) => <TableRow key={customer.id}>
              <TableCell className="font-medium">{customer.name}</TableCell><TableCell>{customer.phone}</TableCell><TableCell className="text-muted-foreground">{customer.lastService}</TableCell>
              <TableCell><Badge variant="outline" className={customer.status === 'Active' ? 'status-approved' : customer.status === 'Pending' ? 'status-pending' : 'status-inactive'}>{customer.status === 'Active' ? 'Ativo' : customer.status === 'Pending' ? 'Pendente' : 'Inativo'}</Badge></TableCell>
            </TableRow>)}
            {!loading && filteredCustomers.length === 0 && <TableRow><TableCell colSpan={4}>Nenhum cliente encontrado.</TableCell></TableRow>}
          </TableBody>
        </Table></div>
    </section>
  );
}
