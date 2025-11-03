import { useEffect, useState } from "react";
import { createGasto, getGastoById, updateGasto } from "../services/gastoService";
import { getUsuarios } from "../services/usuarioService";
import { getCategorias } from "../services/categoriaGastoService";
import { useNavigate, useParams } from "react-router-dom";

export default function GastoForm() {
  const [gasto, setGasto] = useState({ usuario: null, categoria: null, valor: "", data_hora: "", descricao: "" });
  const [usuarios, setUsuarios] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getUsuarios().then((res) => setUsuarios(res.data)).catch((err) => console.error(err));
    getCategorias().then((res) => setCategorias(res.data)).catch((err) => console.error(err));
    if (id) {
      getGastoById(id).then((res) => setGasto(res.data)).catch((err) => console.error(err));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "usuario") setGasto({ ...gasto, usuario: { id_usuario: parseInt(value) } });
    else if (name === "categoria") setGasto({ ...gasto, categoria: { id_categoria: parseInt(value) } });
    else setGasto({ ...gasto, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...gasto };
    const action = id ? updateGasto(id, payload) : createGasto(payload);
    action
      .then(() => {
        alert("Gasto salvo com sucesso!");
        navigate("/gastos");
      })
      .catch((err) => {
        console.error("Erro ao salvar gasto:", err);
        if (err.response?.data?.message) alert(err.response.data.message);
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>{id ? "Editar Gasto" : "Novo Gasto"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuário:</label>
          <select name="usuario" value={gasto.usuario?.id_usuario || ""} onChange={handleChange} required>
            <option value="">Selecione</option>
            {usuarios.map((u) => (
              <option key={u.id_usuario} value={u.id_usuario}>{u.nomeCompleto}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Categoria:</label>
          <select name="categoria" value={gasto.categoria?.id_categoria || ""} onChange={handleChange} required>
            <option value="">Selecione</option>
            {categorias.map((c) => (
              <option key={c.id_categoria} value={c.id_categoria}>{c.nomeCategoria}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Valor:</label>
          <input type="number" step="0.01" name="valor" value={gasto.valor || ""} onChange={handleChange} required />
        </div>

        <div>
          <label>Data:</label>
          <input type="date" name="data_hora" value={gasto.data_hora || ""} onChange={handleChange} required />
        </div>

        <div>
          <label>Descrição:</label>
          <input type="text" name="descricao" value={gasto.descricao || ""} onChange={handleChange} />
        </div>

        <button type="submit" style={{ marginTop: "10px" }}>Salvar</button>
      </form>
    </div>
  );
}
