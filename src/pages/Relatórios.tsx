import CameraInput from "@/components/CameraInput"
import { useAsyncData } from "@/hooks/useAsyncData";
import { dataService } from "@/services/dataService";
import { Recharts } from "@/components/Recharts";



export function Relatórios() {
  const { data, error } = useAsyncData(dataService.listAnalytics, []);
  return (
    <section className="page-shell"><header className="page-heading"><div><p className="eyebrow">ACOMPANHAMENTO</p><h1>Relatórios</h1><p className="text-muted-foreground">Movimento e conversões do período.</p></div></header>
      {error && <p className="page-error" role="alert">{error}</p>}<div className="report-chart"><Recharts data={data} /></div><div className="report-capture"><CameraInput /></div>
    </section>
  )
}

export default Relatórios