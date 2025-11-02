// src/api/investimentoService.js
import api from './api';

const PREFIX = '/investimentos';

export const investimentoService = {
  listar: () => api.get(PREFIX).then(r => r.data),
  buscarPorId: (id) => api.get(`${PREFIX}/${id}`).then(r => r.data),
  criar: (investimento) => api.post(PREFIX, investimento).then(r => r.data),
  atualizar: (id, investimento) => api.put(`${PREFIX}/${id}`, investimento).then(r => r.data),
  deletar: (id) => api.delete(`${PREFIX}/${id}`).then(r => r.status === 204),
  porUsuario: (usuarioId) => api.get(`${PREFIX}/usuario/${usuarioId}`).then(r => r.data),
};
