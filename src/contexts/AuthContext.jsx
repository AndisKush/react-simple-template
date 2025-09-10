import { createContext, useState, useContext, useEffect } from 'react';
import { login as apiLogin } from '../services/authService'; // Nosso serviço mock

// 1. Criar o Contexto
const AuthContext = createContext(null);

// 2. Criar o Provedor do Contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // Para verificar a sessão inicial

  // Efeito que roda quando a aplicação carrega
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

  // Função de Login
  const login = async (credentials) => {
    try {
      const response = await apiLogin(credentials); // Chama nosso serviço mock
      const { token, user } = response.data;

      // Armazena no localStorage para persistir a sessão
      localStorage.setItem('@Auth:token', token);
      localStorage.setItem('@Auth:user', JSON.stringify(user));

      // Atualiza o estado
      setToken(token);
      setUser(user);
      
      return { success: true };
    } catch (error) {
      console.error('Falha no login:', error.message);
      return { success: false, message: error.message || 'Credenciais inválidas' };
    }
  };

  // Função de Logout
  const logout = () => {
    // Limpa o localStorage
    localStorage.removeItem('@Auth:token');
    localStorage.removeItem('@Auth:user');

    // Reseta o estado
    setToken(null);
    setUser(null);
  };

  // 3. Valor que o contexto vai prover
  const authContextValue = {
    isAuthenticated: !!user, // Converte o objeto user para um booleano
    user,
    token,
    loading,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// 4. Hook customizado para facilitar o uso do contexto
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};