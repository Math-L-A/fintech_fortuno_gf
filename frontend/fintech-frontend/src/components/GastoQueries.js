import { useState } from "react";
import { getGastosMaioresQue, getGastosPorAno } from "../services/gastoService";

export default function GastoQueries() {
  const [valor, setValor] = useState("");
  const [ano, setAno] = useState("");
  const [resultados, setResultados] = useState([]);

  const buscarMaiores = (e) => {
    e.preventDefault();
    getGastosMaioresQue(parseFloat(valor))
      .then((res) => setResultados(res.data))
      .catch((err) => {
        console.error(err);
        alert("Erro ao buscar gastos");
      });
  };

  const buscarPorAno = (e) => {
    e.preventDefault();
    getGastosPorAno(parseInt(ano))
      .then((res) => setResultados(res.data))
      .catch((err) => {
        console.error(err);
        alert("Erro ao buscar gastos por ano");
      });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Consultas de Gastos</h2>
      <form onSubmit={buscarMaiores} style={{ marginBottom: 12 }}>
        <label>Maiores que: </label>
        <input type="number" step="0.01" value={valor} onChange={(e) => setValor(e.target.value)} />
        <button type="submit" style={{ marginLeft: 8 }}>Buscar</button>
      </form>

      <form onSubmit={buscarPorAno} style={{ marginBottom: 12 }}>
        <label>Ano: </label>
        <input type="number" value={ano} onChange={(e) => setAno(e.target.value)} />
        <button type="submit" style={{ marginLeft: 8 }}>Buscar por Ano</button>
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
