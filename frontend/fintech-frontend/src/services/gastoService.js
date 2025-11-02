// src/api/gastoService.js
import api from './api';

const PREFIX = '/gastos';

export const gastoService = {
  listar: () => api.get(PREFIX).then(r => r.data),
  buscarPorId: (id) => api.get(`${PREFIX}/${id}`).then(r => r.data),
  criar: (gasto) => api.post(PREFIX, gasto).then(r => r.data),
  atualizar: (id, gasto) => api.put(`${PREFIX}/${id}`, gasto).then(r => r.data),
  deletar: (id) => api.delete(`${PREFIX}/${id}`).then(r => r.status === 204),
  listarPorUsuario: (usuarioId) => api.get(`${PREFIX}/usuario/${usuarioId}`).then(r => r.data),
};
