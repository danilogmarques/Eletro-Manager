import { useAsyncData } from "@/hooks/useAsyncData";
import { dataService } from "@/services/dataService";
import { Recharts } from "../components/Recharts";
import { CardTest } from "../components/CardInfo";
import { CardService } from "@/components/CardService";

const loadDashboard = async () => {
  const [customers, services, budgets, analytics] = await Promise.all([
    dataService.listCustomers(), dataService.listServices(), dataService.listBudgets(), dataService.listAnalytics(),
  ]);
  return { customers, services, budgets, analytics };
};

export function Dashboard() { 
  const { data, loading, error } = useAsyncData(loadDashboard, { customers: [], services: [], budgets: [], analytics: [] });
  const approved = data.budgets.filter((budget) => budget.status);
  const totalApproved = approved.reduce((total, budget) => total + budget.price, 0);
  return (
    <div className="page-shell">
      <header className="page-heading">
        <div><p className="eyebrow">VISÃO GERAL</p><h1>Dashboard</h1>
        <p className="text-muted-foreground">Acompanhe o ritmo do seu negócio.</p></div>
      </header>
      {error && <p className="page-error" role="alert">{error}</p>}
      <section className="dashboard-metrics">
        <CardTest title="Clientes" value={loading ? 0 : data.customers.length} />
        <CardTest title="Serviços ativos" value={loading ? 0 : data.services.filter((service) => service.status === 'Available').length} />
        <CardTest title="Orçamentos" value={loading ? 0 : data.budgets.length} />
        <CardTest title="Aprovados" value={loading ? 0 : approved.length} detail={totalApproved.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} />
      </section>
      <main className="dashboard-chart">
        <Recharts data={data.analytics} />
      </main>
      <footer className="dashboard-recent">
        <CardService name={data.budgets.at(-1)?.client ?? 'Nenhum cliente'} services={data.budgets.at(-1)?.service ?? 'Sem serviços'} status={data.budgets.at(-1)?.status ? 'aprovado' : 'aguardando'} />
      </footer>
    </div>
  );
}
