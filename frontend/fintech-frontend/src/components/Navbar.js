import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('authToken');
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  return (
    <nav style={{ padding: "10px", backgroundColor: "#282c34" }}>
      <Link to="/" style={{ color: "white", marginRight: "20px" }}>
        Usuários
      </Link>
      <Link to="/novo" style={{ color: "white", marginRight: "20px" }}>
        Novo Usuário
      </Link>
      <Link to="/categorias" style={{ color: "white", marginRight: "20px" }}>
        Categorias
      </Link>
      <Link to="/gastos" style={{ color: "white", marginRight: "20px" }}>
        Gastos
      </Link>
      <Link to="/investimentos" style={{ color: "white", marginRight: "20px" }}>
        Investimentos
      </Link>

      {token ? (
        <span style={{ color: 'white', marginLeft: 20 }}>
          Olá, {currentUser?.nomeCompleto || 'usuário'}
          <button onClick={handleLogout} style={{ marginLeft: 10 }}>Sair</button>
        </span>
      ) : (
        <Link to="/login" style={{ color: 'white', marginLeft: 20 }}>Login</Link>
      )}
    </nav>
  );
}
