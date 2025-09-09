// Este arquivo irá, no futuro, conter as chamadas reais com axios.
// Por agora, ele apenas simula a comunicação.

export const login = (credentials) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (credentials.email === 'admin@teste.com' && credentials.password === '1234') {
        resolve({
          status: 200,
          data: {
            token: 'fake-jwt-token-string',
            user: { name: 'Admin', email: 'admin@teste.com' },
          },
        });
      } else {
        reject({
          status: 401,
          message: 'Credenciais inválidas',
        });
      }
    }, 1000);
  });
};