export const kpiData = {
  dailySales: { value: 7850.50, comparison: 15 }, // 15% a mais que ontem
  monthlySales: { value: 152300.75, comparison: -5 }, // 5% a menos que ano passado
  dailyTicket: { value: 253.24 },
  monthlyTicket: { value: 312.45 },
  openOrders: { value: 22 },
  criticalStock: { value: 147 }, // 147 itens com estoque baixo
  activeClients: { value: 489 },
};

export const salesEvolutionData = [
  { name: 'Seg', atual: 4000, anterior: 2400 },
  { name: 'Ter', atual: 3000, anterior: 1398 },
  { name: 'Qua', atual: 5000, anterior: 6800 },
  { name: 'Qui', atual: 2780, anterior: 3908 },
  { name: 'Sex', atual: 1890, anterior: 4800 },
  { name: 'Sáb', atual: 2390, anterior: 3800 },
  { name: 'Dom', atual: 940, anterior: 1300 },
];

export const topProductsData = [
    { name: 'Filtro de Óleo Bosch', vendidos: 124 },
    { name: 'Pastilha Freio Cobreq', vendidos: 98 },
    { name: 'Vela Ignição NGK', vendidos: 85 },
    { name: 'Amortecedor Cofap', vendidos: 72 },
    { name: 'Óleo Motor 5W30', vendidos: 66 },
    { name: 'Lâmpada H4 Philips', vendidos: 51 },
    { name: 'Correia Dentada Gates', vendidos: 45 },
    { name: 'Bateria Moura 60Ah', vendidos: 39 },
    { name: 'Disco de Freio Fremax', vendidos: 32 },
    { name: 'Pneu Pirelli 175/65', vendidos: 28 },
].sort((a, b) => a.vendidos - b.vendidos); // sort para a barra horizontal

// Adicione aqui os dados para os outros gráficos (Fornecedores, Categoria, Fluxo de Caixa)