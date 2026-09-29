import { BrowserRouter, Route, Routes } from "react-router-dom"
import { SideBar } from "./components/SideBar"


function App() {

  return (
    <BrowserRouter>
      <div className="bg-gray-900 h-screen w-screen flex items-center justify-center    ">
        <SideBar />
        <Routes>
          <Route path="/dashboard" element={<h1 className="text-4xl text-amber-600 font-bold" >Boa Noite</h1>} />
          <Route path="/clientes" element={<h1 className="text-2xl font-bold text-gray-800">Sobre Nós</h1>} />
          <Route path="/servicos" element={<h1 className="text-2xl font-bold text-gray-800">Serviços</h1>} />
          <Route path="/orcamentos" element={<h1 className="text-2xl font-bold text-gray-800">Orçamentos</h1>} />
          <Route path="/relatorios" element={<h1 className="text-2xl font-bold text-gray-800">Relatórios</h1>} />
          <Route path="/configuracoes" element={<h1 className="text-2xl font-bold text-gray-800">Configurações</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
