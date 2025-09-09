// Vamos criar uma função para gerar mais dados
const createProduct = (id, description, brand, stock, price, status) => ({
  id: `P${id.toString().padStart(3, '0')}`,
  description,
  manufacturerCode: `${brand.substring(0,2).toUpperCase()}${id*3}`,
  brand,
  stock,
  price,
  status,
});

export const mockProducts = [
  createProduct(1, 'Filtro de Óleo Motor 1.6 Flex', 'Wega', 42, 35.50, 'ativo'),
  createProduct(2, 'Pastilha de Freio Dianteira Cerâmica', 'Ferodo', 15, 189.90, 'ativo'),
  createProduct(3, 'Vela de Ignição Iridium (Jogo 4un)', 'NGK', 8, 215.00, 'ativo'),
  createProduct(4, 'Amortecedor Dianteiro (Par)', 'Cofap', 3, 550.80, 'critico'),
  createProduct(5, 'Óleo Motor 5W30 Sintético', 'Mobil', 60, 45.90, 'ativo'),
  createProduct(6, 'Lâmpada Super Branca H4 (Par)', 'Osram', 25, 69.99, 'ativo'),
  createProduct(7, 'Correia Dentada CT488', 'Gates', 12, 112.00, 'ativo'),
  createProduct(8, 'Bateria 60Ah ZMF60DD', 'Zetta', 7, 399.00, 'critico'),
  createProduct(9, 'Disco de Freio Dianteiro Ventilado', 'Fremax', 18, 155.40, 'ativo'),
  createProduct(10, 'Pneu Aro 15 185/60R15', 'Pirelli', 22, 380.00, 'ativo'),
  createProduct(11, 'Filtro de Ar Condicionado AKX3531', 'Wega', 33, 28.00, 'ativo'),
  createProduct(12, 'Kit Embreagem Placa/Disco/Rolamento', 'Luk', 5, 650.00, 'critico'),
  createProduct(13, 'Bomba de Combustível Elétrica', 'Bosch', 9, 320.00, 'ativo'),
  createProduct(14, 'Terminal de Direção LD/LE', 'Nakata', 14, 88.50, 'ativo'),
  createProduct(15, 'Fluido de Freio DOT4 500ml', 'Varga', 50, 22.90, 'ativo'),
];