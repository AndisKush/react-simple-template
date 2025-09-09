import { useState, useMemo } from 'react';
import styled from 'styled-components';
import { useDevice } from '../../hooks/useDevice';
import { Input } from '../Input';
import { Card } from '../Card';

// --- Estilos ---
const DataTableContainer = styled.div`
  width: 100%;
`;

const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.md};

  @media (max-width: 768px) {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing.md};
  }
`;

const SearchInput = styled(Input)`
  max-width: 300px;
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

// Estilos para a visualização WIDESCREEN (Tabela)
const TableWrapper = styled.div`
  overflow-x: auto;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: ${({ theme }) => theme.spacing.md};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
  th {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-weight: 500;
  }
`;

// Estilos para a visualização MOBILE (Cards)
const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const DataCard = styled(Card)`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const CardRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;

  strong {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

// Estilos para a PAGINAÇÃO
const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: ${({ theme }) => theme.spacing.lg};
  gap: ${({ theme }) => theme.spacing.sm};
`;
const PageButton = styled.button`
  border: 1px solid ${({ theme, active }) => (active ? theme.colors.primary : theme.colors.border)};
  background-color: ${({ theme, active }) => (active ? theme.colors.primary : 'transparent')};
  color: ${({ theme, active }) => (active ? 'white' : theme.colors.text)};
  padding: 8px 12px;
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

// --- Componente Principal ---
const DataTable = ({ data, columns, itemsPerPage = 5 }) => {
  const { isMobile } = useDevice();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  // Lógica de busca e filtragem com useMemo para performance
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    const lowercasedFilter = searchTerm.toLowerCase();
    
    return data.filter(item => 
      columns.some(column => {
        if (!column.accessor) return false;
        const value = item[column.accessor];
        return String(value).toLowerCase().includes(lowercasedFilter);
      })
    );
  }, [data, columns, searchTerm]);

  // Lógica de paginação
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  // --- Funções de Renderização ---
  const renderCell = (item, column) => {
    const value = item[column.accessor];
    // Se a coluna tem uma função de renderização customizada (Cell), usa ela
    if (column.Cell) {
      return column.Cell({ value, row: item });
    }
    // Senão, renderiza o valor padrão
    return value;
  };
  
  return (
    <DataTableContainer>
      <Controls>
        <SearchInput 
          placeholder="Buscar..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reseta para a primeira página ao buscar
          }}
        />
      </Controls>

      {isMobile ? (
        // RENDERIZAÇÃO MOBILE (CARDS)
        <CardsContainer>
          {paginatedData.map((item, index) => (
            <DataCard key={index}>
              {columns.map(column => (
                <CardRow key={column.accessor}>
                  <strong>{column.Header}:</strong>
                  <span>{renderCell(item, column)}</span>
                </CardRow>
              ))}
            </DataCard>
          ))}
        </CardsContainer>
      ) : (
        // RENDERIZAÇÃO WIDESCREEN (TABELA)
        <Card>
          <TableWrapper>
            <StyledTable>
              <thead>
                <tr>{columns.map((col, index) => <th key={index+col.accessor} style={{ textAlign: col.align || 'left' }}>{col.Header}</th>)}</tr>
              </thead>
              <tbody>
                {paginatedData.map((item, index) => (
                  <tr key={index}>
                    {columns.map(col => <td key={index+col.accessor} style={{ textAlign: col.align || 'left' }}>{renderCell(item, col)}</td>)}
                  </tr>
                ))}
              </tbody>
            </StyledTable>
          </TableWrapper>
        </Card>
      )}

      {/* RENDERIZAÇÃO DA PAGINAÇÃO */}
      {totalPages > 1 && (
        <PaginationContainer>
          <PageButton onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>Anterior</PageButton>
          <span>Página {currentPage} de {totalPages}</span>
          <PageButton onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>Próxima</PageButton>
        </PaginationContainer>
      )}
    </DataTableContainer>
  );
};

export default DataTable;