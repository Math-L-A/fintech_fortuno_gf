import { useEffect, useState } from "react";
import { getUsuarios, deleteUsuario } from "../services/usuarioService";
import { Link } from "react-router-dom";

export default function UsuarioList() {
  const [usuarios, setUsuarios] = useState([]);

  const carregarUsuarios = () => {
    getUsuarios()
      .then((response) => setUsuarios(response.data))
      .catch((error) => console.error("Erro ao buscar usuários:", error));
  };

  useEffect(() => {
    carregarUsuarios();
  }, []);

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
                <Link to={`/editar/${u.id_usuario}`}>Editar</Link> |{" "}
                <button onClick={() => handleDelete(u.id_usuario)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
