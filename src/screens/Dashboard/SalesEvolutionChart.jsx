import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Line } from 'recharts';
import { Card, CardTitle } from '../../components/Card';
import { salesEvolutionData } from '../../data/mockDashboard';

const SalesEvolutionChart = () => {
  return (
    <Card>
      <CardTitle>Evolução de Vendas (Semana)</CardTitle>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={salesEvolutionData}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1A233A', // Cor do Dark Mode para o tooltip
              borderRadius: '8px',
              borderColor: '#343A40',
            }}
          />
          <Legend />
          <Bar dataKey="anterior" fill="#6C757D" name="Semana Anterior" />
          <Bar dataKey="atual" fill="#007BFF" name="Semana Atual" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default SalesEvolutionChart;