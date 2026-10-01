import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"

type CardProps = {
    name: string;
    services?: "instalação" | "manutenção" | "reparo";
    status?: "aprovado" | "aguardando";
};

export function CardService({ name, services, status }: CardProps) {
    return (
        <Card className="flex-1 w-full max-w-md h-auto">

            <CardHeader>
                <CardTitle>Serviços recentes</CardTitle>
            </CardHeader>

            <CardContent className="space-y-2">
                <p className="text-sm font-medium text-slate-900">
                    {name} · {services} · {status}
                </p>
            </CardContent>

        </Card>
    )
}
