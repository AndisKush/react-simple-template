import React from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import { menuItems } from '../../../config/menuConfig';

const MenuContainer = styled.div`
  padding: ${({ theme }) => theme.spacing.md};
`;

const Title = styled.h1`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const MenuList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const MenuButton = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => theme.spacing.lg};
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius};
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.large};
  font-weight: 500;
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    background-color: ${({ theme }) => theme.colors.background};
  }
`;

const RegisterMenuScreen = () => {
  // Encontra o item "Cadastro" na nossa configuração para pegar os sub-itens
  const registerSubItems = menuItems.find(item => item.id === 'register')?.children || [];

  return (
    <MenuContainer>
      <Title>Cadastros</Title>
      <MenuList>
        {registerSubItems.map(item => (
          <MenuButton key={item.id} to={item.path}>
            {item.icon}
            <span>{item.label}</span>
          </MenuButton>
        ))}
      </MenuList>
    </MenuContainer>
  );
};

export default RegisterMenuScreen;