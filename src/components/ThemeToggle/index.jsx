import React from 'react';
import styled from 'styled-components';
import { useTheme } from '../../contexts/ThemeContext';

const ToggleButton = styled.button`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  border-radius: 30px;
  cursor: pointer;
  font-size: 0.8rem;
  padding: 0.6rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;
  position: relative;
  width: 100%;
  transition: all 0.2s ease-in-out;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  span {
    white-space: nowrap;
    margin-left: 8px;
    margin-right: 8px;
  }
`;

const SunIcon = () => '☀️';
const MoonIcon = () => '🌙';

const ThemeToggle = ({ isSidebarOpen }) => {
  const { themeMode, toggleTheme } = useTheme();
  const isLight = themeMode === 'light';

  return (
    <ToggleButton onClick={toggleTheme}>
      {isLight ? <SunIcon /> : <MoonIcon />}
      {isSidebarOpen && <span>{isLight ? 'Modo Claro' : 'Modo Escuro'}</span>}
    </ToggleButton>
  );
};

export default ThemeToggle;