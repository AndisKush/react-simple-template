// Vamos criar uma função para gerar mais dados
const createProduct = (id, name, email, status) => ({
  id: `P${id.toString().padStart(3, '0')}`,
  name,
  email,
  status,
});

export const mockUsers = [
  createProduct(1, 'Teste 1', 'teste1@teste.com', 'ativo'),
  createProduct(2, 'Teste 2', 'teste2@teste.com', 'inativo')
];