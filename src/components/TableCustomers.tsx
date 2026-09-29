import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "../components/ui/table" // Ajuste o caminho do import conforme seu projeto

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Pago",
    totalAmount: "R$ 250,00",
    paymentMethod: "Cartão de Crédito",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pendente",
    totalAmount: "R$ 150,00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Não Pago",
    totalAmount: "R$ 350,00",
    paymentMethod: "Boleto",
  },
  {
    invoice: "INV004",
    paymentStatus: "Pago",
    totalAmount: "R$ 450,00",
    paymentMethod: "Pix",
  },
]

export function InvoiceTableExample() {
  return (
    <Table className="bg-amber-50">
      <TableCaption>Lista das faturas recentes do sistema.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="">Fatura</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Método</TableHead>
          <TableHead className="text-right">Valor</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {invoices.map((inv) => (
          <TableRow key={inv.invoice}>
            <TableCell className="font-medium">{inv.invoice}</TableCell>
            <TableCell>{inv.paymentStatus}</TableCell>
            <TableCell>{inv.paymentMethod}</TableCell>
            <TableCell className="text-right">{inv.totalAmount}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">R$ 1.200,00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  )
}
