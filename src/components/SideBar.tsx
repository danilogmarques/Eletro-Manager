import { Link, useLocation } from "react-router-dom";

import { 
  LayoutDashboard, 
  Users, 
  Wrench, 
  FileText, 
  DollarSign, 
  Settings,
  LogOut,
  Zap,
} from "lucide-react";

export function SideBar({ onLogout }: { onLogout: () => void }) {
  
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
    <nav className="app-sidebar">
      <div className="sidebar-brand"><span className="sidebar-brand-mark"><Zap size={17} fill="currentColor" /></span><span>LUMINA<small>GESTÃO</small></span></div>
      <p className="sidebar-section-label">MENU PRINCIPAL</p>
      <ul className="sidebar-links">
        {routes.map((route) => {
          const isPageActive = location.pathname === route.path;
          
          const Icon = route.icon;

          return (
            <li key={route.path}>
              <Link
                to={route.path}
                className={isPageActive ? 'active' : ''}
              >
                <Icon size={18} />
                <span>{route.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
      <div className="sidebar-bottom">
        <span className="sidebar-user-avatar">EL</span>
        <span className="sidebar-user-name">Eletricista<small>Conta demonstrativa</small></span>
        <button type="button" className="sidebar-logout" onClick={onLogout} title="Sair" aria-label="Sair"><LogOut size={18} /></button>
      </div>
    </nav>
  );
}
