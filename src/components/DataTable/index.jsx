import { useState, useMemo } from "react";
import styled from "styled-components";
import { useDevice } from "../../hooks/useDevice";
import { Input } from "../Input";
import { Card } from "../Card";

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

  th,
  td {
    padding: ${({ theme }) => theme.spacing.md};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }
  th {
    color: ${({ theme }) => theme.colors.textSecondary};
    font-weight: 500;
  }
  /* Estilo para o rodapé da tabela */
  tfoot td {
    font-weight: bold;
    color: ${({ theme }) => theme.colors.text};
    border-top: 2px solid ${({ theme }) => theme.colors.border};
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
  border: 1px solid
    ${({ theme, active }) =>
      active ? theme.colors.primary : theme.colors.border};
  background-color: ${({ theme, active }) =>
    active ? theme.colors.primary : "transparent"};
  color: ${({ theme, active }) => (active ? "white" : theme.colors.text)};
  padding: 8px 12px;
  border-radius: ${({ theme }) => theme.borderRadius};
  cursor: pointer;
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;

const SummaryCard = styled(Card)`
  margin-top: ${({ theme }) => theme.spacing.lg};
  padding: ${({ theme }) => theme.spacing.md};
  background-color: ${({ theme }) => theme.colors.background};
`;

const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-weight: 500;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

// --- Componente Principal ---
const DataTable = ({ data, columns, itemsPerPage = 5 }) => {
  const { isMobile } = useDevice();
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  // Lógica de busca e filtragem com useMemo para performance
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;
    const lowercasedFilter = searchTerm.toLowerCase();

    return data.filter((item) =>
      columns.some((column) => {
        if (!column.accessor) return false;
        const value = item[column.accessor];
        return String(value).toLowerCase().includes(lowercasedFilter);
      })
    );
  }, [data, columns, searchTerm]);

  // NOVO: Lógica para calcular os resumos do rodapé
  const summaryData = useMemo(() => {
    const columnsToSummarize = columns.filter((col) => col.summarize);
    if (columnsToSummarize.length === 0) return null;

    return columnsToSummarize.map((col) => {
      const total = filteredData.reduce((acc, item) => {
        const value = parseFloat(item[col.accessor]);
        return !isNaN(value) ? acc + value : acc;
      }, 0);

      let formattedTotal;
      if (col.summarize.format === "currency") {
        formattedTotal = total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
      } else {
        formattedTotal = total.toLocaleString("pt-BR");
      }

      return {
        Header: `${col.Header} Total`,
        total: formattedTotal,
        align: col.align,
      };
    });
  }, [filteredData, columns]);

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
        <CardsContainer>
          {paginatedData.length > 0 ? (
            paginatedData.map((item, index) => (
              <DataCard key={index}>
                {columns.map((column) => (
                  <CardRow key={column.accessor}>
                    <strong>{column.Header}:</strong>
                    <span>{renderCell(item, column)}</span>
                  </CardRow>
                ))}
              </DataCard>
            ))
          ) : (
            <p style={{ textAlign: "center" }}>Nenhum resultado encontrado.</p>
          )}
        </CardsContainer>
      ) : (
        <Card>
          <TableWrapper>
            <StyledTable>
              <thead>
                <tr>
                  {columns.map((col) => (
                    <th
                      key={col.accessor}
                      style={{ textAlign: col.align || "left" }}
                    >
                      {col.Header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedData.length > 0 ? (
                  paginatedData.map((item, index) => (
                    <tr key={index}>
                      {columns.map((col) => (
                        <td
                          key={col.accessor}
                          style={{ textAlign: col.align || "left" }}
                        >
                          {renderCell(item, col)}
                        </td>
                      ))}
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={columns.length}
                      style={{ textAlign: "center", padding: "2rem" }}
                    >
                      Nenhum resultado encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
              {summaryData && (
                <tfoot>
                  <tr>
                    <td colSpan={columns.length}>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "0 1rem",
                        }}
                      >
                        <span>
                          <strong>Registros:</strong> {filteredData.length}
                        </span>
                        {summaryData.map((summary) => (
                          <span key={summary.Header}>
                            <strong>{summary.Header}:</strong> {summary.total}
                          </span>
                        ))}
                      </div>
                    </td>
                  </tr>
                </tfoot>
              )}
            </StyledTable>
          </TableWrapper>
        </Card>
      )}

      {/* RENDERIZAÇÃO DO RODAPÉ MOBILE */}
      {isMobile && summaryData && (
        <SummaryCard>
          <SummaryRow>
            <strong>Registros:</strong>
            <span>{filteredData.length}</span>
          </SummaryRow>
          {summaryData.map((summary) => (
            <SummaryRow key={summary.Header}>
              <strong>{summary.Header}:</strong>
              <span>{summary.total}</span>
            </SummaryRow>
          ))}
        </SummaryCard>
      )}

      {/* RENDERIZAÇÃO DA PAGINAÇÃO */}
      {totalPages > 1 && (
        <PaginationContainer>
          <PageButton
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </PageButton>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <PageButton
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Próxima
          </PageButton>
        </PaginationContainer>
      )}
    </DataTableContainer>
  );
};

export default DataTable;
