import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UsuarioList from "./components/UsuarioList";
import UsuarioForm from "./components/UsuarioForm";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<UsuarioList />} />
        <Route path="/novo" element={<UsuarioForm />} />
        <Route path="/editar/:id" element={<UsuarioForm />} />
      </Routes>
    </Router>
  );
}

export default App;
