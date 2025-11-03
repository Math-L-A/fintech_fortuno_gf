import api from "./api";

const API_URL = "/investimentos";

export const getInvestimentos = () => api.get(API_URL);

export const getInvestimentoById = (id) => api.get(`${API_URL}/${id}`);

export const createInvestimento = (inv) => api.post(API_URL, inv);

export const updateInvestimento = (id, inv) => api.put(`${API_URL}/${id}`, inv);

export const deleteInvestimento = (id) => api.delete(`${API_URL}/${id}`);

export const getInvestimentosPorValorMinimo = (valor) => api.get(`${API_URL}/por-valor-minimo`, { params: { valor } });

export const getInvestimentosVencemAntes = (data) => api.get(`${API_URL}/vencem-antes`, { params: { data } });

export const getInvestimentosPorTipo = (tipo) => api.get(`${API_URL}/tipo/${encodeURIComponent(tipo)}`);
