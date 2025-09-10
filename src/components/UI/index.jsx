import styled from 'styled-components';

export const StatusBadge = styled.span`
  padding: 4px 12px;
  border-radius: 16px;
  font-size: 12px;
  font-weight: 500;
  color: white;
  background-color: ${({ status, theme }) =>
    status === 'ativo' ? theme.colors.success : theme.colors.error};
`;

export const ActionButtons = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;

  button {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    padding: 4px;
    border-radius: 4px;
    transition: background-color 0.2s;

    &:hover {
      background-color: ${({ theme }) => theme.colors.background};
    }
  }
`;