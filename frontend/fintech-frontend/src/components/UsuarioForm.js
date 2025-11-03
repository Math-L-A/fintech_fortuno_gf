import { useEffect, useState } from "react";
import { createUsuario, getUsuarioById, updateUsuario } from "../services/usuarioService";
import { useNavigate, useParams } from "react-router-dom";

export default function UsuarioForm() {
  const [usuario, setUsuario] = useState({
    nomeCompleto: "",
    email: "",
    genero: "",
    dataNascimento: "",
    senha: ""
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getUsuarioById(id)
        .then((res) => setUsuario(res.data))
        .catch((err) => console.error("Erro ao carregar usuário:", err));
    }
  }, [id]);

  const handleChange = (e) => {
    setUsuario({ ...usuario, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // basic client-side validation
    if (!usuario.nomeCompleto || !usuario.email || !usuario.senha) {
      alert('Nome, email e senha são obrigatórios.');
      return;
    }

    const action = id ? updateUsuario(id, usuario) : createUsuario(usuario);

    action
      .then(() => {
        alert("Usuário salvo com sucesso!");
        navigate("/");
      })
      .catch((error) => {
        console.error("Erro ao salvar usuário:", error);
        const msg = error?.response?.data?.message || error.message || 'Erro desconhecido';
        alert(`Falha ao salvar usuário: ${msg}`);
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>{id ? "Editar Usuário" : "Novo Usuário"}</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome Completo:</label>
          <input
            type="text"
            name="nomeCompleto"
            value={usuario.nomeCompleto}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={usuario.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Gênero:</label>
          <input
            type="text"
            name="genero"
            value={usuario.genero}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Data de Nascimento:</label>
          <input
            type="date"
            name="dataNascimento"
            value={usuario.dataNascimento}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Senha:</label>
          <input
            type="password"
            name="senha"
            value={usuario.senha}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" style={{ marginTop: "15px" }}>
          Salvar
        </button>
      </form>
    </div>
  );
}
