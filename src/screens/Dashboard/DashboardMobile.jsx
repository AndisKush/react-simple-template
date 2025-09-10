import styled from 'styled-components';
import { kpiData } from '../../data/mockDashboard';
import { Card, CardTitle } from '../../components/Card';
import SalesEvolutionChart from './SalesEvolutionChart';

// Usaremos flexbox para empilhar os elementos verticalmente
const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md}; /* Espaçamento menor para mobile */
`;

const KpiCard = styled(Card)`
  text-align: center;
`;

const KpiValue = styled.p`
  font-size: 2rem; /* Um pouco menor para mobile */
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
`;

const KpiComparison = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ value }) => value > 0 ? '#28A745' : '#DC3545'};
`;

const DashboardMobile = () => {
  return (
    <div>
      
      <DashboardContainer>
        <KpiCard>
          <CardTitle>Vendas do Dia</CardTitle>
          <KpiValue>{kpiData.dailySales.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</KpiValue>
          <KpiComparison value={kpiData.dailySales.comparison}>
            {kpiData.dailySales.comparison > 0 ? '▲' : '▼'} {kpiData.dailySales.comparison}% vs ontem
          </KpiComparison>
        </KpiCard>
        
        <KpiCard>
          <CardTitle>Vendas do Mês</CardTitle>
          <KpiValue>{kpiData.monthlySales.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</KpiValue>
          <KpiComparison value={kpiData.monthlySales.comparison}>
             {kpiData.monthlySales.comparison > 0 ? '▲' : '▼'} {kpiData.monthlySales.comparison}% vs ano anterior
          </KpiComparison>
        </KpiCard>

        <KpiCard>
          <CardTitle>Pedidos em Aberto</CardTitle>
          <KpiValue>{kpiData.openOrders.value}</KpiValue>
        </KpiCard>

        <KpiCard>
          <CardTitle>Estoque Crítico</CardTitle>
          <KpiValue>{kpiData.criticalStock.value}</KpiValue>
        </KpiCard>

        {/* O gráfico ocupará a largura total naturalmente */}
        <SalesEvolutionChart />
        
      </DashboardContainer>
    </div>
  );
};

export default DashboardMobile;