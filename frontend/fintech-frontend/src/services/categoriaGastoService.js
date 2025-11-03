import api from "./api";

const API_URL = "/categorias";

export const getCategorias = () => api.get(API_URL);

export const getCategoriaById = (id) => api.get(`${API_URL}/${id}`);

export const createCategoria = (categoria) => api.post(API_URL, categoria);

export const updateCategoria = (id, categoria) => api.put(`${API_URL}/${id}`, categoria);

export const deleteCategoria = (id) => api.delete(`${API_URL}/${id}`);
