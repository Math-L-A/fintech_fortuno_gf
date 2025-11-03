import { useState } from "react";
import { getInvestimentosPorValorMinimo, getInvestimentosVencemAntes, getInvestimentosPorTipo } from "../services/investimentoService";

export default function InvestimentoQueries() {
  const [valor, setValor] = useState("");
  const [data, setData] = useState("");
  const [tipo, setTipo] = useState("");
  const [resultados, setResultados] = useState([]);

  const buscarPorValor = (e) => {
    e.preventDefault();
    getInvestimentosPorValorMinimo(parseFloat(valor))
      .then((res) => setResultados(res.data))
      .catch((err) => {
        console.error(err);
        alert("Erro ao buscar investimentos por valor");
      });
  };

  const buscarPorData = (e) => {
    e.preventDefault();
    getInvestimentosVencemAntes(data)
      .then((res) => setResultados(res.data))
      .catch((err) => {
        console.error(err);
        alert("Erro ao buscar investimentos por data");
      });
  };

  const buscarPorTipo = (e) => {
    e.preventDefault();
    getInvestimentosPorTipo(tipo)
      .then((res) => setResultados(res.data))
      .catch((err) => {
        console.error(err);
        alert("Erro ao buscar investimentos por tipo");
      });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Consultas de Investimentos</h2>
      <form onSubmit={buscarPorValor} style={{ marginBottom: 12 }}>
        <label>Valor mínimo: </label>
        <input type="number" step="0.01" value={valor} onChange={(e) => setValor(e.target.value)} />
        <button type="submit" style={{ marginLeft: 8 }}>Buscar</button>
      </form>

      <form onSubmit={buscarPorData} style={{ marginBottom: 12 }}>
        <label>Vencem antes de: </label>
        <input type="date" value={data} onChange={(e) => setData(e.target.value)} />
        <button type="submit" style={{ marginLeft: 8 }}>Buscar</button>
      </form>

      <form onSubmit={buscarPorTipo} style={{ marginBottom: 12 }}>
        <label>Tipo: </label>
        <input value={tipo} onChange={(e) => setTipo(e.target.value)} />
        <button type="submit" style={{ marginLeft: 8 }}>Buscar</button>
      </form>

      <table border="1" cellPadding="8">
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
          </tr>
        </thead>
        <tbody>
          {resultados.map((i) => (
            <tr key={i.id_investimento}>
              <td>{i.id_investimento}</td>
              <td>{i.usuario?.nomeCompleto}</td>
              <td>{i.tipoInvestimento}</td>
              <td>{i.nomeAplicacao}</td>
              <td>{i.nomeBanco}</td>
              <td>{i.valor}</td>
              <td>{i.dataAplicacao}</td>
              <td>{i.dataVencimento}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
