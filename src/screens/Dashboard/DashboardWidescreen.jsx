import React from 'react';
import styled from 'styled-components';
import { kpiData } from '../../data/mockDashboard';
import { Card, CardTitle } from '../../components/Card';
import SalesEvolutionChart from './SalesEvolutionChart';
// Importe aqui os outros componentes de gráfico quando forem criados

const DashboardGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
  
  // Layout para Widescreen
  grid-template-columns: repeat(4, 1fr);

  // Layout para Mobile
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
  
  @media (max-width: 1200px) and (min-width: 769px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const KpiCard = styled(Card)`
  text-align: center;
`;

const KpiValue = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.xxlarge};
  font-weight: 700;
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
`;

const KpiComparison = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ value }) => value > 0 ? '#28A745' : '#DC3545'};
`;

const DashboardScreen = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <DashboardGrid>
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

        {/* Gráficos */}
        <div style={{ gridColumn: '1 / -1' }}> {/* Ocupa a linha toda */}
          <SalesEvolutionChart />
        </div>
        
        {/* Outros gráficos viriam aqui */}
        
      </DashboardGrid>
    </div>
  );
};

export default DashboardScreen;