import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");
  const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  return (
    <>
      <aside className="sidebar">
        <div className="brand">
          <div className="avatar">U</div>
          <div>
            <h1>Dashboard</h1>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)' }}>Bem-vindo</div>
          </div>
        </div>

        <ul className="nav-list">
          <li>
            <Link to="/" className="nav-item">
              <span className="icon">👤</span>
              <span>Usuários</span>
            </Link>
          </li>
          <li>
            <Link to="/novo" className="nav-item">
              <span className="icon">＋</span>
              <span>Novo Usuário</span>
            </Link>
          </li>
          <li>
            <Link to="/categorias" className="nav-item">
              <span className="icon">📁</span>
              <span>Categorias</span>
            </Link>
          </li>
          <li>
            <Link to="/gastos" className="nav-item">
              <span className="icon">⬇️</span>
              <span>Gastos</span>
            </Link>
          </li>
          <li>
            <Link to="/investimentos" className="nav-item">
              <span className="icon">💹</span>
              <span>Investimentos</span>
            </Link>
          </li>
        </ul>

        <div className="nav-footer">
          {token ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div className="login-info">{currentUser?.nomeCompleto || 'Usuário'}</div>
              <button className="nav-item" onClick={handleLogout} style={{ width: '100%', textAlign: 'left' }}>
                <span className="icon">⎋</span>
                <span>Sair</span>
              </button>
            </div>
          ) : (
            <Link to="/login" className="nav-item" style={{ marginTop: 6 }}>
              <span className="icon">🔐</span>
              <span>Login</span>
            </Link>
          )}
        </div>
  </aside>
    </>
  );
}
