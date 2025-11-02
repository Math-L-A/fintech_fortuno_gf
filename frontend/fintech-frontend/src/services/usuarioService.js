import axios from "axios";

const API_URL = "http://localhost:8080/usuarios"; // URL do seu backend

// Listar todos
export const getUsuarios = () => axios.get(API_URL);

// Buscar por ID
export const getUsuarioById = (id) => axios.get(`${API_URL}/${id}`);

// Criar novo
export const createUsuario = (usuario) => axios.post(API_URL, usuario);

// Atualizar
export const updateUsuario = (id, usuario) => axios.put(`${API_URL}/${id}`, usuario);

// Deletar
export const deleteUsuario = (id) => axios.delete(`${API_URL}/${id}`);
