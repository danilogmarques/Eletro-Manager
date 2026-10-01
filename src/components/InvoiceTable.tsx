import { useState } from "react";
import { Search, Wrench } from "lucide-react";
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

export function InvoiceTable() {
  const [search, setSearch] = useState('');
  const { data: services, loading, error } = useAsyncData(dataService.listServices, []);
  const filteredServices = services.filter((service) => `${service.name} ${service.category}`.toLowerCase().includes(search.toLowerCase()));

  return (
    <section className="page-shell">
      <header className="page-heading"><div><p className="eyebrow">CATÁLOGO</p><h1>Serviços</h1><p className="text-muted-foreground">Serviços oferecidos e valores de referência.</p></div></header>
      <div className="table-toolbar"><div className="search-field"><Search size={17} /><Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar serviço ou categoria" aria-label="Buscar serviços" /></div><span className="result-count"><Wrench size={16} /> {filteredServices.length} serviços</span></div>
      {error && <p className="page-error" role="alert">{error}</p>}
      <div className="data-table-wrap"><Table>
          <TableHeader>
            <TableRow>
              <TableHead>Serviço</TableHead>
              <TableHead>Categoria</TableHead>
              <TableHead>Valor base</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? <TableRow><TableCell colSpan={4}>Carregando serviços...</TableCell></TableRow> : filteredServices.map((service) => <TableRow key={service.id}>
              <TableCell className="font-medium">{service.name}</TableCell><TableCell>{service.category}</TableCell><TableCell>{service.price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</TableCell>
              <TableCell><Badge variant="outline" className={service.status === 'Available' ? 'status-approved' : 'status-inactive'}>{service.status === 'Available' ? 'Disponível' : 'Indisponível'}</Badge></TableCell>
            </TableRow>)}
            {!loading && filteredServices.length === 0 && <TableRow><TableCell colSpan={4}>Nenhum serviço encontrado.</TableCell></TableRow>}
          </TableBody>
        </Table></div>
    </section>
  );
}
