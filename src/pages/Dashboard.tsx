import { Recharts } from "../components/Recharts";
import { CardTest } from "../components/CardInfo";
import { CardService } from "@/components/CardService";

export function Dashboard() { 
  return (
    <div className="flex flex-col bg-gray-100 p-4">
      <header className="flex flex-col p-4">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Visão geral do seu negócio</p>
      </header>
      <section className=" flex w-full p-2">
        <CardTest  title="Acessos" value={4000} percentage={10} />
        <CardTest title="Clientes" value={200} percentage={5} />
        <CardTest title="Serviços" value={50} percentage={2} />
        <CardTest title="Orçamentos" value={30} percentage={1} />
        <CardTest  title="Relatórios" value={10} percentage={0.5} />
      </section>
      <main className="flex h-screen p-4">
        <Recharts />
      </main>
      <footer className="p-4">
        <CardService name="John Doe" services="instalação" status="em andamento" />
      </footer>
    </div>
  );
}
