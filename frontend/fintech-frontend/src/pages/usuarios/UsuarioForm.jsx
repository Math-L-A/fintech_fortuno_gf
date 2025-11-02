// src/pages/Usuarios/UsuarioForm.jsx
import React, { useEffect, useState } from 'react';
import { usuarioService } from '../../services/usuarioService';
import { useNavigate, useParams } from 'react-router-dom';
import { toISODate } from '../../utils/dateUtils';

export default function UsuarioForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = !!id;

  const [form, setForm] = useState({
    nomeCompleto: '',
    dataNascimento: '',
    genero: '',
    email: '',
    senha: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEdit) {
      usuarioService.buscarPorId(id).then(u => {
        setForm({
          nomeCompleto: u.nomeCompleto || '',
          dataNascimento: u.dataNascimento ? toISODate(u.dataNascimento) : '',
          genero: u.genero || '',
          email: u.email || '',
          senha: '' // não preencher senha por segurança
        });
      }).catch(err => {
        console.error(err);
        alert('Erro ao carregar usuário');
      });
    }
  }, [id, isEdit]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // validações simples
    if (!form.nomeCompleto || !form.email) {
      alert('Nome e email são obrigatórios');
      return;
    }
    setLoading(true);
    try {
      if (isEdit) {
        await usuarioService.atualizar(id, form);
      } else {
        await usuarioService.criar(form);
      }
      navigate('/usuarios');
    } catch (err) {
      console.error(err);
      alert('Erro ao salvar usuário');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isEdit ? 'Editar Usuário' : 'Novo Usuário'}</h2>
      <div>
        <label>Nome</label>
        <input name="nomeCompleto" value={form.nomeCompleto} onChange={handleChange} />
      </div>
      <div>
        <label>Data Nascimento</label>
        <input type="date" name="dataNascimento" value={form.dataNascimento} onChange={handleChange} />
      </div>
      <div>
        <label>Gênero</label>
        <input name="genero" value={form.genero} onChange={handleChange} />
      </div>
      <div>
        <label>Email</label>
        <input name="email" type="email" value={form.email} onChange={handleChange} />
      </div>
      <div>
        <label>Senha</label>
        <input name="senha" type="password" value={form.senha} onChange={handleChange} />
      </div>
      <button type="submit" disabled={loading}>{loading ? 'Salvando...' : 'Salvar'}</button>
    </form>
  );
}
