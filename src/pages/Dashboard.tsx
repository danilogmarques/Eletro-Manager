import { Recharts } from "../components/Recharts";


export function Dashboard() {
  return (
    <div className="bg-gray-100 w-screen h-screen flex">
      <h1>Dashboard</h1>
      <p>Visão geral do seu negócio</p>
      <Recharts />
    </div>
  );
}