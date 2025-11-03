import api from "./api";

const API_URL = "/usuarios";

// Listar todos
export const getUsuarios = () => api.get(API_URL);

// Buscar por ID
export const getUsuarioById = (id) => api.get(`${API_URL}/${id}`);

// Buscar por nome parcial
export const searchUsuariosPorNome = (nome) => api.get(`${API_URL}/search`, { params: { nome } });

// Buscar por email
export const getUsuarioByEmail = (email) => api.get(`${API_URL}/email/${encodeURIComponent(email)}`);

// Criar novo
export const createUsuario = (usuario) => api.post(API_URL, usuario);

// Atualizar
export const updateUsuario = (id, usuario) => api.put(`${API_URL}/${id}`, usuario);

// Deletar
export const deleteUsuario = (id) => api.delete(`${API_URL}/${id}`);
