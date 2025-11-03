import { useEffect, useState } from "react";
import { createInvestimento, getInvestimentoById, updateInvestimento } from "../services/investimentoService";
import { getUsuarios } from "../services/usuarioService";
import { useNavigate, useParams } from "react-router-dom";

export default function InvestimentoForm() {
  const [inv, setInv] = useState({ usuario: null, tipoInvestimento: "", nomeAplicacao: "", nomeBanco: "", valor: "", dataAplicacao: "", dataVencimento: "" });
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    getUsuarios().then((res) => setUsuarios(res.data)).catch((err) => console.error(err));
    if (id) {
      getInvestimentoById(id).then((res) => setInv(res.data)).catch((err) => console.error(err));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "usuario") setInv({ ...inv, usuario: { id_usuario: parseInt(value) } });
    else setInv({ ...inv, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { ...inv };
    const action = id ? updateInvestimento(id, payload) : createInvestimento(payload);
    action
      .then(() => {
        alert("Investimento salvo com sucesso!");
        navigate("/investimentos");
      })
      .catch((err) => {
        console.error("Erro ao salvar investimento:", err);
        if (err.response?.data?.message) alert(err.response.data.message);
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>{id ? "Editar Investimento" : "Novo Investimento"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Usuário:</label>
          <select name="usuario" value={inv.usuario?.id_usuario || ""} onChange={handleChange} required>
            <option value="">Selecione</option>
            {usuarios.map((u) => (
              <option key={u.id_usuario} value={u.id_usuario}>{u.nomeCompleto}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Tipo:</label>
          <input type="text" name="tipoInvestimento" value={inv.tipoInvestimento || ""} onChange={handleChange} required />
        </div>

        <div>
          <label>Nome Aplicação:</label>
          <input type="text" name="nomeAplicacao" value={inv.nomeAplicacao || ""} onChange={handleChange} />
        </div>

        <div>
          <label>Nome Banco:</label>
          <input type="text" name="nomeBanco" value={inv.nomeBanco || ""} onChange={handleChange} />
        </div>

        <div>
          <label>Valor:</label>
          <input type="number" step="0.01" name="valor" value={inv.valor || ""} onChange={handleChange} required />
        </div>

        <div>
          <label>Data Aplicação:</label>
          <input type="date" name="dataAplicacao" value={inv.dataAplicacao || ""} onChange={handleChange} />
        </div>

        <div>
          <label>Data Vencimento:</label>
          <input type="date" name="dataVencimento" value={inv.dataVencimento || ""} onChange={handleChange} />
        </div>

        <button type="submit" style={{ marginTop: "10px" }}>Salvar</button>
      </form>
    </div>
  );
}
