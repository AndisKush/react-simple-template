import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

// ==> 1. Interceptor de Requisição (Permanece o Mesmo)
// Este interceptor é executado ANTES de cada requisição ser enviada.
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('@Auth:token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


// ==> 2. Interceptor de Resposta (Refatorado)
// Esta função será chamada pelo nosso AuthContext para configurar o tratamento de erros.
export const setupAuthInterceptor = (logoutUser) => {
  api.interceptors.response.use(
    // A primeira função (sucesso) simplesmente retorna a resposta.
    (response) => {
      return response;
    },
    // A segunda função (erro) agora tem uma lógica mais inteligente.
    (error) => {
      // Verifica se o erro é 401 E se a URL da requisição NÃO é a de login.
      if (error.response?.status === 401 && error.config.url !== '/auth/login') {
        // Se for um erro de token expirado em uma rota protegida,
        // chama a função de logout que foi injetada pelo AuthContext.
        logoutUser('Sua sessão expirou. Por favor, faça login novamente.');
      }
      
      // Propaga o erro para que possa ser tratado no local da chamada 
      // (ex: no catch do formulário de login).
      return Promise.reject(error);
    }
  );
};


export default api;