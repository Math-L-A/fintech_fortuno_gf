import { useEffect, useState } from "react";
import { createCategoria, getCategoriaById, updateCategoria } from "../services/categoriaGastoService";
import { useNavigate, useParams } from "react-router-dom";

export default function CategoriaForm() {
  const [categoria, setCategoria] = useState({ nomeCategoria: "" });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getCategoriaById(id).then((res) => setCategoria(res.data)).catch((err) => console.error(err));
    }
  }, [id]);

  const handleChange = (e) => setCategoria({ ...categoria, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const action = id ? updateCategoria(id, categoria) : createCategoria(categoria);
    action
      .then(() => {
        alert("Categoria salva com sucesso!");
        navigate("/categorias");
      })
      .catch((err) => console.error("Erro ao salvar categoria:", err));
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>{id ? "Editar Categoria" : "Nova Categoria"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nome:</label>
          <input type="text" name="nomeCategoria" value={categoria.nomeCategoria || ""} onChange={handleChange} required />
        </div>
        <button type="submit" style={{ marginTop: "10px" }}>Salvar</button>
      </form>
    </div>
  );
}
