import api from "./api";

const API_URL = "/gastos";

export const getGastos = () => api.get(API_URL);

export const getGastoById = (id) => api.get(`${API_URL}/${id}`);

export const createGasto = (gasto) => api.post(API_URL, gasto);

export const updateGasto = (id, gasto) => api.put(`${API_URL}/${id}`, gasto);

export const deleteGasto = (id) => api.delete(`${API_URL}/${id}`);

export const getGastosPorUsuario = (usuarioId) => api.get(`${API_URL}/por-usuario/${usuarioId}`);

export const getGastosPorCategoria = (categoriaId) => api.get(`${API_URL}/por-categoria/${categoriaId}`);

export const getGastosMaioresQue = (valor) => api.get(`${API_URL}/maiores-que`, { params: { valor } });

export const getGastosPorAno = (ano) => api.get(`${API_URL}/ano/${ano}`);

export const getGastosPorNomeUsuario = (nome) => api.get(`${API_URL}/por-usuario-nome`, { params: { nome } });
