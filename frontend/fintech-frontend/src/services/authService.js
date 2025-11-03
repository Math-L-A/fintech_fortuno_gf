import api from './api';

const PREFIX = '/auth';

export const login = (email, senha) => api.post(`${PREFIX}/login`, { email, senha });

export default { login };
