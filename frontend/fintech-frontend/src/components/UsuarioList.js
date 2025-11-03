import { useEffect, useState } from "react";
import { getUsuarios, deleteUsuario, searchUsuariosPorNome } from "../services/usuarioService";
import { Link, useNavigate } from "react-router-dom";
import LoginRequiredMessage from "./LoginRequiredMessage";

export default function UsuarioList() {
  const [usuarios, setUsuarios] = useState([]);
  const [query, setQuery] = useState("");
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

  const carregarUsuarios = () => {
    const action = query ? searchUsuariosPorNome(query) : getUsuarios();
    action
      .then((response) => setUsuarios(response.data))
      .catch((error) => console.error("Erro ao buscar usuários:", error));
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    carregarUsuarios();
  };

  const handleDelete = (id) => {
    if (window.confirm("Deseja excluir este usuário?")) {
      deleteUsuario(id)
        .then(() => carregarUsuarios())
        .catch((error) => console.error("Erro ao excluir usuário:", error));
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Usuários Cadastrados</h2>
      <form onSubmit={handleSearch} style={{ marginBottom: "10px" }}>
        <input placeholder="Buscar por nome" value={query} onChange={(e) => setQuery(e.target.value)} />
        <button type="submit">Buscar</button>
        <button type="button" onClick={() => { setQuery(""); carregarUsuarios(); }} style={{ marginLeft: 8 }}>Limpar</button>
      </form>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome Completo</th>
            <th>Email</th>
            <th>Gênero</th>
            <th>Data de Nascimento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id_usuario}>
              <td>{u.id_usuario}</td>
              <td>{u.nomeCompleto}</td>
              <td>{u.email}</td>
              <td>{u.genero}</td>
              <td>{u.dataNascimento}</td>
              <td>
                <button onClick={() => handleView(`/editar/${u.id_usuario}`)}>Editar</button> |{" "}
                <button onClick={() => handleDelete(u.id_usuario)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <LoginRequiredMessage open={showLoginPrompt} onClose={() => setShowLoginPrompt(false)} redirectPath={redirectPath} />
    </div>
  );
}

