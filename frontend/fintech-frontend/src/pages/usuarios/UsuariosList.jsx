// src/pages/Usuarios/UsuariosList.jsx
import React, { useEffect } from 'react';
import { usuarioService } from '../../services/usuarioService';
import useFetch from '../../hooks/useFetch';
import { useNavigate } from 'react-router-dom';

export default function UsuariosList() {
  const navigate = useNavigate();
  const { data: usuarios, loading, error, setData } = useFetch(() => usuarioService.listar(), []);

  const handleDelete = async (id) => {
    if (!confirm('Tem certeza que deseja deletar este usuário?')) return;
    try {
      await usuarioService.deletar(id);
      // atualizar lista local sem nova requisição
      setData(prev => prev.filter(u => u.id_usuario !== id));
      alert('Usuário deletado');
    } catch (err) {
      console.error(err);
      alert('Erro ao deletar usuário');
    }
  };

  if (loading) return <div>Carregando usuários...</div>;
  if (error) return <div>Erro: {error.message}</div>;

  return (
    <div>
      <h2>Usuários</h2>
      <button onClick={() => navigate('/usuarios/novo')}>Novo Usuário</button>
      <table>
        <thead>
          <tr><th>ID</th><th>Nome</th><th>Email</th><th>Ações</th></tr>
        </thead>
        <tbody>
          {usuarios?.map(u => (
            <tr key={u.id_usuario}>
              <td>{u.id_usuario}</td>
              <td>{u.nomeCompleto}</td>
              <td>{u.email}</td>
              <td>
                <button onClick={() => navigate(`/usuarios/${u.id_usuario}`)}>Editar</button>
                <button onClick={() => handleDelete(u.id_usuario)}>Deletar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
