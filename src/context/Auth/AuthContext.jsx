import axios from 'axios';
import PropTypes from 'prop-types';
import { createContext, useState } from 'react';
import { toast } from 'react-toastify';
import { BACKEND_DEFAULT_URL } from '../../backendPaths';

const AuthContext = createContext();

const defaultAuthenticationState = localStorage.getItem('authToken') ? true : false;
const defaultUserInfo = JSON.parse(localStorage.getItem('userInfo'));

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(defaultAuthenticationState);
  const [userInfo, setUserInfo] = useState(defaultUserInfo);

  const login = async (data) => {
    try {
      const response = await axios.post(`${BACKEND_DEFAULT_URL}/login`, data);
      const { token, user_id } = response.data;

      const user = {id: user_id};

      localStorage.setItem('authToken', JSON.stringify({token: token}));
      localStorage.setItem('userInfo', JSON.stringify({id: user_id}));

      setUserInfo(user)
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
    }, 2000)    
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, userInfo }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;