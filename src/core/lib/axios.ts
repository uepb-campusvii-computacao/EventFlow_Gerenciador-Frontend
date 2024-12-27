import axios from 'axios';
import { toast } from 'react-toastify';

import { env } from '@/env';

// @TODO: acredito que usar o cookies hoje é um pouco mais seguro que o localstorage

const api = axios.create({
  baseURL: env.VITE_API_URL,
});

api.interceptors.request.use(
  config => {
    const tokenData = localStorage.getItem('authToken');
    if (tokenData) {
      const { token } = JSON.parse(tokenData);
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    console.error('Erro ao configurar request:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    const status = error.response ? error.response.status : null;

    if (status === 401) {
      toast.error('Token inválido ou expirado. Faça login novamente.');

      localStorage.removeItem('authToken');
      localStorage.removeItem('userInfo');
    } else {
      const errorMessage = error.response?.data?.message || 'Ocorreu um erro.';
      toast.error(errorMessage);
    }

    return Promise.reject(error);
  }
);

export { api };
