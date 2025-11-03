import { useEffect, useState } from "react";
import { getCategorias, deleteCategoria } from "../services/categoriaGastoService";
import { Link, useNavigate } from "react-router-dom";
import LoginRequiredMessage from "./LoginRequiredMessage";

export default function CategoriaList() {
  const [categorias, setCategorias] = useState([]);
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
    getCategorias()
      .then((res) => setCategorias(res.data))
      .catch((err) => console.error("Erro ao buscar categorias:", err));
  };

  useEffect(() => {
    carregar();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Deseja excluir esta categoria?")) {
      deleteCategoria(id)
        .then(() => carregar())
        .catch((err) => console.error("Erro ao excluir categoria:", err));
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Categoria de Gastos</h2>
      <Link to="/categorias/novo">Nova Categoria</Link>
      <table border="1" cellPadding="10" style={{ marginTop: "10px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((c) => (
            <tr key={c.id_categoria}>
              <td>{c.id_categoria}</td>
              <td>{c.nomeCategoria}</td>
              <td>
                <button onClick={() => handleView(`/categorias/editar/${c.id_categoria}`)}>Editar</button> | {" "}
                <button onClick={() => handleDelete(c.id_categoria)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <LoginRequiredMessage open={showLoginPrompt} onClose={() => setShowLoginPrompt(false)} redirectPath={redirectPath} />
    </div>
  );
}
