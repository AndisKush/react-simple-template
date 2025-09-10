import { createContext, useState, useContext, useEffect, useCallback } from 'react';
import api, { setupAuthInterceptor } from '../services/api';
import { useAlert } from './AlertContext'; // Certifique-se de que o caminho está correto

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const { showAlert } = useAlert(); // Pega a função de alerta do AlertContext

  // Criamos a função de logout com useCallback para estabilizá-la.
  const logout = useCallback((alertMessage) => {
    localStorage.removeItem('@Auth:token');
    localStorage.removeItem('@Auth:user');
    setToken(null);
    setUser(null);
    
    // Se uma mensagem de alerta foi passada pelo interceptor, exibe o nosso modal.
    if (alertMessage) {
      showAlert(alertMessage, 'Sessão Expirada');
    }
    // O redirecionamento para /login acontecerá automaticamente porque o
    // estado `isAuthenticated` mudará para `false` no App.jsx
  }, [showAlert]);

  // Este useEffect roda uma vez para configurar a ponte entre a API e o Contexto.
  useEffect(() => {
    setupAuthInterceptor(logout);
  }, [logout]);

  useEffect(() => {
    async function loadStoragedData() {
      const storagedToken = localStorage.getItem('@Auth:token');
      const storagedUser = localStorage.getItem('@Auth:user');

      if (storagedToken && storagedUser) {
        setToken(storagedToken);
        setUser(JSON.parse(storagedUser));
      }
      setLoading(false);
    }
    loadStoragedData();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      const { access_token, user } = response.data;
      
      localStorage.setItem('@Auth:token', access_token);
      localStorage.setItem('@Auth:user', JSON.stringify(user));

      setToken(access_token);
      setUser(user);
      
      return { success: true };
    } catch (error) {
      // Agora, este catch só receberá o erro 401 da tela de login.
      const message = error.response?.data?.message || 'Erro ao fazer login.';
      // Lida com o caso da API retornar um array de mensagens de erro
      const displayMessage = Array.isArray(message) ? message.join(', ') : message;
      return { success: false, message: displayMessage };
    }
  };

  const authContextValue = {
    isAuthenticated: !!user,
    user,
    token,
    loading,
    login,
    // Expomos uma versão do logout que pode ser chamada sem argumento (ex: por um botão)
    logout: () => logout(null),
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};