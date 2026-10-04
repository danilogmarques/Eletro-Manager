import { useState } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { SideBar } from "./components/SideBar"
import { Dashboard } from "./pages/Dashboard"
import Customers from "./pages/Customers"
import Serviços from"./pages/Serviços"
import Relatórios from "./pages/Relatórios"
import { Orcamentos } from "./pages/Orcamentos"
import { Login } from "./pages/Login"
import Configurações from "./pages/Configurações"
import { OrdensServico } from "./pages/OrdensServico"

function App() {
  const [authenticated, setAuthenticated] = useState(() => localStorage.getItem('eletricista-session') === 'active')
  const logout = () => {
    localStorage.removeItem('eletricista-session')
    setAuthenticated(false)
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={authenticated ? <Navigate to="/dashboard" replace /> : <Login onLogin={() => setAuthenticated(true)} />} />
        <Route path="*" element={authenticated ? (
          <div className="app-shell">
            <SideBar onLogout={logout} />
            <main className="app-content">
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/clientes" element={<Customers />} />
                <Route path="/servicos" element={<Serviços />} />
                <Route path="/ordens-servico" element={<OrdensServico />} />
                <Route path="/orcamentos" element={<Orcamentos />} />
                <Route path="/relatorios" element={<Relatórios />} />
                <Route path="/configuracoes" element={<Configurações />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </main>
          </div>
        ) : <Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
