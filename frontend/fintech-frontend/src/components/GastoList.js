import { useEffect, useState } from "react";
import { getGastos, deleteGasto } from "../services/gastoService";
import { Link, useNavigate } from "react-router-dom";
import LoginRequiredMessage from "./LoginRequiredMessage";

export default function GastoList() {
  const [gastos, setGastos] = useState([]);
  const navigate = useNavigate();
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [redirectPath, setRedirectPath] = useState(null);

  const handleView = (path) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setRedirectPath(path);
      setShowLoginPrompt(true);
      return;
    }
    navigate(path);
  };

  const carregar = () => {
    getGastos()
      .then((res) => setGastos(res.data))
      .catch((err) => console.error("Erro ao buscar gastos:", err));
  };

  useEffect(() => {
    carregar();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Deseja excluir este gasto?")) {
      deleteGasto(id)
        .then(() => carregar())
        .catch((err) => console.error("Erro ao excluir gasto:", err));
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Gastos</h2>
      <Link to="/gastos/novo">Novo Gasto</Link>
      <table border="1" cellPadding="10" style={{ marginTop: "10px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuário</th>
            <th>Categoria</th>
            <th>Valor</th>
            <th>Data</th>
            <th>Descrição</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {gastos.map((g) => (
            <tr key={g.id_gasto}>
              <td>{g.id_gasto}</td>
              <td>{g.usuario?.nomeCompleto || g.usuario?.id_usuario}</td>
              <td>{g.categoria?.nomeCategoria || g.categoria?.id_categoria}</td>
              <td>{g.valor}</td>
              <td>{g.data_hora}</td>
              <td>{g.descricao}</td>
              <td>
                <button onClick={() => handleView(`/gastos/editar/${g.id_gasto}`)}>Editar</button> | {" "}
                <button onClick={() => handleDelete(g.id_gasto)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <LoginRequiredMessage open={showLoginPrompt} onClose={() => setShowLoginPrompt(false)} redirectPath={redirectPath} />
    </div>
  );
}
