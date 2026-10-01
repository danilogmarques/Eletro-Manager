import { useState } from "react";
import { Plus, Search, FileText, CheckCircle, Clock, MoreVertical } from "lucide-react";

// Importações dos componentes nativos do shadcn/ui
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  // Dados fictícios simulados
  const [orcamentos] = useState([
    { id: "ORC-001", cliente: "João Silva", servico: "Manutenção de Ar", valor: 350.00, status: "Aprovado", data: "12/05/2026" },
    { id: "ORC-002", cliente: "Maria Oliveira", servico: "Instalação Elétrica", valor: 1200.00, status: "Pendente", data: "14/05/2026" },
    { id: "ORC-003", cliente: "Empresa ABC", servico: "Consultoria Técnica", valor: 2500.00, status: "Aprovado", data: "15/05/2026" },
    { id: "ORC-004", cliente: "Carlos Souza", servico: "Reparo Hidráulico", valor: 180.00, status: "Cancelado", data: "16/05/2026" },
  ]);

  // Função utilitária para renderizar as cores das Badges do shadcn de forma condicional
  const getStatusBadge = (status) => {
    const styles = {
      Aprovado: "bg-green-100 text-green-800 hover:bg-green-100 border-transparent",
      Pendente: "bg-amber-100 text-amber-800 hover:bg-amber-100 border-transparent",
      Cancelado: "bg-red-100 text-red-800 hover:bg-red-100 border-transparent",
    };
    return styles[status] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen w-full">
      
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orçamentos</h1>
          <p className="text-sm text-muted-foreground">Gerencie e envie propostas para seus clientes.</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Novo Orçamento
        </Button>
      </div>

      {/* Cards de Resumo usando Card do shadcn */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card shadow="sm">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg dark:bg-blue-950 dark:text-blue-400">
              <FileText className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Emitido</p>
              <p className="text-2xl font-bold">R\$ 4.230,00</p>
            </div>
          </CardContent>
        </Card>

        <Card shadow="sm">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="p-3 bg-green-100 text-green-600 rounded-lg dark:bg-green-950 dark:text-green-400">
              <CheckCircle className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Aprovados</p>
              <p className="text-2xl font-bold">R\$ 2.850,00</p>
            </div>
          </CardContent>
        </Card>

        <Card shadow="sm">
          <CardContent className="flex items-center gap-4 p-6">
            <div className="p-3 bg-amber-100 text-amber-600 rounded-lg dark:bg-amber-950 dark:text-amber-400">
              <Clock className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Aguardando</p>
              <p className="text-2xl font-bold">R\$ 1.200,00</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Barra de Filtro e Tabela */}
      <Card className="overflow-hidden">
        <CardHeader className="px-6 py-4 border-b">
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              type="text" 
              placeholder="Buscar por cliente ou serviço..." 
              className="pl-9"
            />
          </div>
        </CardHeader>
        
        {/* Tabela do shadcn */}
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Cód.</TableHead>
              <TableHead>Cliente</TableHead>
              <TableHead>Serviço</TableHead>
              <TableHead>Valor</TableHead>
              <TableHead>Data</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orcamentos.map((orcamento) => (
              <TableRow key={orcamento.id}>
                <TableCell className="font-medium">{orcamento.id}</TableCell>
                <TableCell>{orcamento.cliente}</TableCell>
                <TableCell className="text-muted-foreground">{orcamento.servico}</TableCell>
                <TableCell className="font-semibold">
                  {orcamento.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </TableCell>
                <TableCell className="text-muted-foreground">{orcamento.data}</TableCell>
                <TableCell>
                  {/* Utilizando o Badge do shadcn com estilização condicional */}
                  <Badge variant="outline" className={getStatusBadge(orcamento.status)}>
                    {orcamento.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

    </div>
  );
}
