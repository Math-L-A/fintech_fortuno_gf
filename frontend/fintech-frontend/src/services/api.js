// src/api/api.js
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8080';

export const api = axios.create({
  baseURL: API_BASE,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true, // habilite se usar cookies / sessão
});

// Interceptor para anexar token de autenticação (se houver)
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Interceptor para tratamento global de respostas/erros
api.interceptors.response.use(
  response => response,
  error => {
    // exemplo de tratamento: se 401 -> redirecionar para login
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        // limpar token e redirecionar
        localStorage.removeItem('authToken');
        // opcional: window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
