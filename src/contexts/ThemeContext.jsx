import React, { createContext, useState, useContext, useEffect } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from '../styles/theme';

const ThemeContext = createContext(null);

export const ThemeModeProvider = ({ children }) => {
  // Inicializa o estado lendo o tema salvo no localStorage, ou 'light' como padrão
  const [themeMode, setThemeMode] = useState(() => {
    const savedMode = localStorage.getItem('@App:theme');
    return savedMode || 'light';
  });

  // Salva a escolha no localStorage sempre que o tema mudar
  useEffect(() => {
    localStorage.setItem('@App:theme', themeMode);
  }, [themeMode]);

  // Função para alternar entre os temas
  const toggleTheme = () => {
    setThemeMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  // Seleciona o objeto de tema correto com base no estado
  const currentTheme = themeMode === 'light' ? lightTheme : darkTheme;

  return (
    <ThemeContext.Provider value={{ themeMode, toggleTheme }}>
      <StyledThemeProvider theme={currentTheme}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

// Hook customizado para facilitar o uso do contexto
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de um ThemeModeProvider');
  }
  return context;
};