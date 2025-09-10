import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  text-align: center;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

const ProductsScreen = () => {
  return (
    <Container>
      <h1>🛠️ Página de Fornecedor</h1>
      <p>A funcionalidade de cadastro e listagem de produtos será implementada aqui.</p>
    </Container>
  );
};

export default ProductsScreen;