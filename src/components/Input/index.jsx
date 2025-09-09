import styled from 'styled-components';

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  transition: border-color ${({ theme }) => theme.transitions.fast}, box-shadow ${({ theme }) => theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 3px ${({ theme, error }) => (error ? 'rgba(220, 53, 69, 0.25)' : `rgba(0, 123, 255, 0.25)`)};
  }
  
  // Adicionando estilo para erro
  ${({ error }) => error && `
    border-color: ${theme.colors.error};
  `}
`;