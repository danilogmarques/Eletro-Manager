import { Link } from "react-router-dom";

export function SideBar() {
  return (
    <nav className=" flex w-48 
     bg-gray-800 text-white p-4">
      <ul className="flex flex-col space-y-4">
        <li>
          <Link to="/dashboard" className="hover:text-gray-400">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/clientes" className="hover:text-gray-400">
            Clientes
          </Link>
        </li>
        <li>
          <Link to="/servicos" className="hover:text-gray-400">
            Serviços
          </Link>
        </li>
        <li>
          <Link to="/orcamentos" className="hover:text-gray-400">
            Orçamentos
          </Link>
        </li>
        <li>
          <Link to="/relatorios" className="hover:text-gray-400">
            Relatórios
          </Link>
        </li>
        <li>
          <Link to="/configuracoes" className="hover:text-gray-400">
            Configurações 
          </Link>
        </li>
      </ul>
    </nav>
  )
};