import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: "10px", backgroundColor: "#282c34" }}>
      <Link to="/" style={{ color: "white", marginRight: "20px" }}>
        Lista de Usuários
      </Link>
      <Link to="/novo" style={{ color: "white" }}>
        Novo Usuário
      </Link>
    </nav>
  );
}
