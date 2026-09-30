import { Link, useLocation } from "react-router-dom";

import { 
  LayoutDashboard, 
  Users, 
  Wrench, 
  FileText, 
  DollarSign, 
  Settings 
} from "lucide-react";

export function SideBar() {
  
  const routes = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/clientes', label: 'Clientes', icon: Users },
    { path: '/servicos', label: 'Serviços', icon: Wrench },
    { path: '/orcamentos', label: 'Orçamentos', icon: DollarSign },
    { path: '/relatorios', label: 'Relatórios', icon: FileText },
    { path: '/configuracoes', label: 'Configurações', icon: Settings }
  ];

  const location = useLocation();

  return (
    <nav className="flex w-56 bg-gray-800 h-screen text-white p-4">
      <ul className="flex flex-col space-y-3 w-full">
        {routes.map((route) => {
          const isPageActive = location.pathname === route.path;
          
          const Icon = route.icon;

          return (
            <li key={route.path}>
              <Link
                to={route.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors hover:bg-gray-700 hover:text-gray-200 ${
                  isPageActive ? 'bg-gray-700 text-blue-400 font-semibold' : 'text-gray-400'
                }`}
              >
                <Icon size={20} className={isPageActive ? 'text-blue-400' : 'text-gray-400'} />
                <span>{route.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
