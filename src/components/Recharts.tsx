import { ResponsiveContainer, ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// 1. Definição da interface de dados para o TypeScript
interface AnalyticsData {
  mes: string;
  acessos: number;
  conversoes: number;
}

// 2. Mock de dados estruturado
const dados: AnalyticsData[] = [
  { mes: 'Jan', acessos: 4000, conversoes: 2400 },
  { mes: 'Fev', acessos: 3000, conversoes: 1398 },
  { mes: 'Mar', acessos: 2000, conversoes: 9800 },
  { mes: 'Abr', acessos: 2780, conversoes: 3908 },
  { mes: 'Mai', acessos: 1890, conversoes: 4800 },
  { mes: 'Jun', acessos: 2390, conversoes: 3800 },
];

export function Recharts() {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 w-full h-full ">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Desempenho Semestral</h2>
      
      {/* ResponsiveContainer garante que o gráfico se ajuste ao tamanho da div pai */}
      <ResponsiveContainer width="100%" height="90%">
        <ComposedChart data={dados} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="mes" stroke="#9ca3af" fontSize={12} tickLine={false} />
          <YAxis stroke="#9ca3af" fontSize={12} tickLine={false} />
          
          {/* Tooltip estilizado nativamente */}
          <Tooltip 
            contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #f3f4f6' }}
          />
          <Legend />
          
          {/* Barras representando acessos */}
          <Bar dataKey="acessos" name="Acessos Totais" fill="#3b82f6" radius={[4, 4, 0, 0]} barSize={30} />
          
          {/* Linha representando conversões */}
          <Line type="monotone" dataKey="conversoes" name="Conversões" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
