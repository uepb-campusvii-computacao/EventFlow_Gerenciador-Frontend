import { createContext, ReactNode, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { IUserDataLogin } from '../domain/entities/userEntity';

import { env } from '@/env';
import { api } from '@/core/lib/axios';

const defaultAuthenticationState = localStorage.getItem('authToken')
  ? true
  : false;

// qual o sentido dessa linha sendo que o objeto vai ser carregado apenas no login -> não entendi mto bem
const defaultUserInfo = JSON.parse(localStorage.getItem('userInfo')!);

interface IAuthContext {
  isAuthenticated: boolean;
  userInfo: any; // qual o tipo desse dado ?
  login: (data: IUserDataLogin) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext({} as IAuthContext);

interface IAuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: IAuthProviderProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    defaultAuthenticationState
  );
  const [userInfo, setUserInfo] = useState(defaultUserInfo);

  const login = async (data: IUserDataLogin) => {
    try {
      const response = await api.post(`${env.VITE_API_URL}/login`, data);
      const { token, user_id } = response.data;

      const user = { id: user_id };

      localStorage.setItem('authToken', JSON.stringify({ token: token }));
      localStorage.setItem('userInfo', JSON.stringify({ id: user_id }));

      setUserInfo(user);
      setIsAuthenticated(true);
      toast.success('Login bem-sucedido!');
    } catch (error) {
      toast.error('Erro ao tentar logar.');
    }
  };

  const logout = () => {
    toast.info('Chauzinho 😺');
    setTimeout(() => {
      setIsAuthenticated(false);
      localStorage.removeItem('authToken');
      localStorage.removeItem('userInfo');
    }, 2000);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, userInfo }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  return context;
}
