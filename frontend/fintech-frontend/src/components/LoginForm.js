import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, senha)
      .then((res) => {
        const { token, usuario } = res.data;
        localStorage.setItem('authToken', token);
        if (usuario) localStorage.setItem('currentUser', JSON.stringify(usuario));
        navigate('/');
      })
      .catch((err) => {
        console.error('Erro ao logar', err);
        alert(err.response?.data?.message || 'Falha ao efetuar login');
      });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Senha:</label>
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required />
        </div>
        <button type="submit" style={{ marginTop: 10 }}>Entrar</button>
      </form>
    </div>
  );
}
