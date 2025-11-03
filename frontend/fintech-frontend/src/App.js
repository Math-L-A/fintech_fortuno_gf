import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UsuarioList from "./components/UsuarioList";
import UsuarioForm from "./components/UsuarioForm";
import CategoriaList from "./components/CategoriaList";
import CategoriaForm from "./components/CategoriaForm";
import GastoList from "./components/GastoList";
import GastoForm from "./components/GastoForm";
import GastoSearchByUserName from "./components/GastoSearchByUserName";
import GastoQueries from "./components/GastoQueries";
import InvestimentoList from "./components/InvestimentoList";
import InvestimentoForm from "./components/InvestimentoForm";
import InvestimentoQueries from "./components/InvestimentoQueries";
import LoginForm from "./components/LoginForm";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="main-content">
        <Routes>
  <Route path="/" element={<UsuarioList />} />
  <Route path="/novo" element={<UsuarioForm />} />
  <Route path="/editar/:id" element={<UsuarioForm />} />

  <Route path="/categorias" element={<CategoriaList />} />
  <Route path="/categorias/novo" element={<CategoriaForm />} />
  <Route path="/categorias/editar/:id" element={<CategoriaForm />} />

  <Route path="/gastos" element={<GastoList />} />
  <Route path="/gastos/novo" element={<GastoForm />} />
  <Route path="/gastos/editar/:id" element={<GastoForm />} />
  <Route path="/gastos/busca-usuario" element={<GastoSearchByUserName />} />
  <Route path="/gastos/consultas" element={<GastoQueries />} />

  <Route path="/login" element={<LoginForm />} />

  <Route path="/investimentos" element={<InvestimentoList />} />
  <Route path="/investimentos/novo" element={<InvestimentoForm />} />
  <Route path="/investimentos/editar/:id" element={<InvestimentoForm />} />
  <Route path="/investimentos/consultas" element={<InvestimentoQueries />} />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
