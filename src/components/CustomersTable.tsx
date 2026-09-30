import { useLocation } from 'react-router-dom'
import {
    Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableHead,
    TableRow,
    TableCell,
    TableCaption,
} from "./ui/table" 


const customers = [
    {
        id: "INV001",
        name: "Danilo",
        service: {
            instalacao: true,
            manutencao: false,
            trocaDeDisjuntor: false,
            iluminacao: false,
            tomadasEPontos: false
        },
        status: "Em andamento",
        data: "2026-09-29",
        telefone: "(11) 99999-9999"
    }
];

export function CustomersTable() {

    const location = useLocation();

    const isClientesPage = location.pathname === "/clientes";

    return (
        <Table className="bg-amber-50">
            <TableCaption> 
            {isClientesPage ? 
            "Lista de clientes." : 
            "Lista das faturas recentes do sistema."} 
            </TableCaption>

            <TableHeader>
                <TableRow>
                    <TableHead>Id</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Serviço</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Data</TableHead>
                    <TableHead>Telefone</TableHead>
                </TableRow>
            </TableHeader>

            <TableBody>
                {customers.map((customer) => (
                    <TableRow key={customer.id}>
                        <TableCell className="font-medium">{customer.id}</TableCell>
                        <TableCell className="font-medium">{customer.name}</TableCell>
                        <TableCell>{customer.service.instalacao}</TableCell>
                        <TableCell>{customer.status}</TableCell>
                        <TableCell className="font-medium">{customer.data}</TableCell>
                        <TableCell>{customer.telefone}</TableCell>
                    </TableRow>
                ))}
            </TableBody>

            <TableFooter>
                <TableRow>
                </TableRow>
            </TableFooter>

        </Table>
    )
}
                       



  
                    
