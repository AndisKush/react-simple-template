import styled from "styled-components";
import { Link } from "react-router-dom";
import { mockProducts } from "../../../data/mockProducts";
import { Button } from "../../../components/Button";
import DataTable from "../../../components/DataTable"; // <-- IMPORTAMOS NOSSO NOVO COMPONENTE

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  flex-wrap: wrap;
  gap: 1rem;
`;

const StatusBadge = styled.span`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  color: white;
  background-color: ${({ status, theme }) =>
    status === "ativo" ? theme.colors.success : theme.colors.error};
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const ProductsScreen = () => {
  // CONFIGURAÇÃO DAS COLUNAS PARA O NOSSO DATATABLE
  const columns = [
    {
      Header: "Descrição",
      accessor: "description",
    },
    {
      Header: "Marca",
      accessor: "brand",
    },
    {
      Header: "Estoque",
      accessor: "stock",
      align: "center", // Alinhamento da coluna
      summarize: { format: "number" }, // Totalizar o valor
    },
    {
      Header: "Preço",
      accessor: "price",
      // Função de renderização customizada para formatar como moeda
      Cell: ({ value }) =>
        value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }),
      summarize: { format: "number" },
    },
    {
      Header: "Status",
      accessor: "status",
      // Função de renderização customizada para mostrar um badge
      Cell: ({ value }) => <StatusBadge status={value}>{value}</StatusBadge>,
    },
    {
      Header: "Ações",
      // Coluna sem 'accessor', apenas com renderização customizada
      Cell: ({ row }) => (
        <ActionButtons>
          <button>✏️</button>
          <button>🗑️</button>
        </ActionButtons>
      ),
    },
  ];

  return (
    <div>
      <Header>
        <h1>Produtoos</h1>
        <Link
          to="/products/new"
          style={{ textDecoration: "none", minWidth: "200px" }}
        >
          <Button>Adicionar Produto</Button>
        </Link>
      </Header>

      {/* USANDO O COMPONENTE */}
      <DataTable data={mockProducts} columns={columns} itemsPerPage={15} />
    </div>
  );
};

export default ProductsScreen;
