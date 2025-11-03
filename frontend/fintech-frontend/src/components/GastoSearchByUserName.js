import { useState } from "react";
import { getGastosPorNomeUsuario } from "../services/gastoService";

export default function GastoSearchByUserName() {
  const [nome, setNome] = useState("");
  const [resultados, setResultados] = useState([]);

  const handleSearch = (e) => {
    e.preventDefault();
    getGastosPorNomeUsuario(nome)
      .then((res) => setResultados(res.data))
      .catch((err) => {
        console.error("Erro ao buscar gastos por nome do usuário:", err);
        alert(err.response?.data?.message || "Erro ao buscar gastos");
      });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Buscar Gastos por Nome do Usuário</h2>
      <form onSubmit={handleSearch} style={{ marginBottom: 12 }}>
        <input placeholder="Nome do usuário" value={nome} onChange={(e) => setNome(e.target.value)} />
        <button type="submit" style={{ marginLeft: 8 }}>Buscar</button>
      </form>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuário</th>
            <th>Categoria</th>
            <th>Valor</th>
            <th>Data</th>
            <th>Descrição</th>
          </tr>
        </thead>
        <tbody>
          {resultados.map((g) => (
            <tr key={g.id_gasto}>
              <td>{g.id_gasto}</td>
              <td>{g.usuario?.nomeCompleto}</td>
              <td>{g.categoria?.nomeCategoria}</td>
              <td>{g.valor}</td>
              <td>{g.data_hora}</td>
              <td>{g.descricao}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
