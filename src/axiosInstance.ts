import axios from 'axios';
import { toast } from 'react-toastify';

import { BACKEND_DEFAULT_URL } from './backendPaths';

const axiosInstance = axios.create({
  baseURL: BACKEND_DEFAULT_URL,
});

axiosInstance.interceptors.request.use(
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

axiosInstance.interceptors.response.use(
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

export default axiosInstance;
