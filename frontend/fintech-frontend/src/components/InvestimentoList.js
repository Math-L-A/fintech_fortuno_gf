import { useEffect, useState } from "react";
import { getInvestimentos, deleteInvestimento } from "../services/investimentoService";
import { Link, useNavigate } from "react-router-dom";
import LoginRequiredMessage from "./LoginRequiredMessage";

export default function InvestimentoList() {
  const [investimentos, setInvestimentos] = useState([]);
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
    getInvestimentos()
      .then((res) => setInvestimentos(res.data))
      .catch((err) => console.error("Erro ao buscar investimentos:", err));
  };

  useEffect(() => {
    carregar();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm("Deseja excluir este investimento?")) {
      deleteInvestimento(id)
        .then(() => carregar())
        .catch((err) => console.error("Erro ao excluir investimento:", err));
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Investimentos</h2>
      <Link to="/investimentos/novo">Novo Investimento</Link>
      <table border="1" cellPadding="10" style={{ marginTop: "10px" }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuário</th>
            <th>Tipo</th>
            <th>Aplicação</th>
            <th>Banco</th>
            <th>Valor</th>
            <th>Data Aplicação</th>
            <th>Data Vencimento</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {investimentos.map((i) => (
            <tr key={i.id_investimento}>
              <td>{i.id_investimento}</td>
              <td>{i.usuario?.nomeCompleto || i.usuario?.id_usuario}</td>
              <td>{i.tipoInvestimento}</td>
              <td>{i.nomeAplicacao}</td>
              <td>{i.nomeBanco}</td>
              <td>{i.valor}</td>
              <td>{i.dataAplicacao}</td>
              <td>{i.dataVencimento}</td>
              <td>
                <button onClick={() => handleView(`/investimentos/editar/${i.id_investimento}`)}>Editar</button> | {" "}
                <button onClick={() => handleDelete(i.id_investimento)}>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <LoginRequiredMessage open={showLoginPrompt} onClose={() => setShowLoginPrompt(false)} redirectPath={redirectPath} />
    </div>
  );
}
