import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button } from '../Button';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  flex-wrap: wrap;
  gap: 1rem;
`;

// O componente agora aceita as duas props e decide o que renderizar
export const PageHeader = ({ title, buttonLabel, buttonTo, onClickButton }) => {
  const renderButton = () => {
    if (!buttonLabel) return null;

    if (buttonTo) {
      return (
        <Link to={buttonTo} style={{ textDecoration: 'none', minWidth: '200px' }}>
          <Button>{buttonLabel}</Button>
        </Link>
      );
    }
    
    if (onClickButton) {
      return (
        <Button onClick={onClickButton} style={{ minWidth: '200px' }}>
          {buttonLabel}
        </Button>
      );
    }

    return null;
  };

  return (
    <HeaderContainer>
      <h1>{title}</h1>
      {renderButton()}
    </HeaderContainer>
  );
};