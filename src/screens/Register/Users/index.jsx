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

const UserScreen = () => {
  return (
    <Container>
      <h1>🛠️ Página de Usuários</h1>
      <p>A funcionalidade de cadastro e listagem de Usuários será implementada aqui.</p>
    </Container>
  );
};

export default UserScreen;