// Definição das paletas de cores
const colors = {
  blueDynamic: '#007BFF',
  orangeChrome: '#FFA500',
  whiteSnow: '#F8F9FA',
  white: '#FFFFFF',
  graphite: '#212529',
  lead: '#6C757D',
  emerald: '#28A745',
  ruby: '#DC3545',
  platinum: '#DEE2E6',
  // Dark Mode Colors
  skyBlue: '#3399FF',
  amber: '#FFC107',
  darkPetroleum: '#121A2A',
  navyBlue: '#1A233A',
  iceWhite: '#E9ECEF',
  silver: '#ADB5BD',
  lime: '#20C997',
  coral: '#FA5252',
  spaceGray: '#343A40',
};

// Objeto base do tema
const baseTheme = {
  fonts: {
    primary: '"Roboto", sans-serif',
    secondary: '"Montserrat", sans-serif',
  },
  fontSizes: {
    small: '0.8rem',
    medium: '1rem',
    large: '1.2rem',
    xlarge: '1.5rem',
    xxlarge: '2rem',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
  },
  borderRadius: '8px',
  transitions: {
    fast: '0.2s ease-in-out',
  },
};

// Temas específicos para Light e Dark mode
export const lightTheme = {
  ...baseTheme,
  colors: {
    primary: colors.blueDynamic,
    secondary: colors.orangeChrome,
    background: colors.whiteSnow,
    surface: colors.white, // Para cards, inputs, etc.
    text: colors.graphite,
    textSecondary: colors.lead,
    success: colors.emerald,
    error: colors.ruby,
    border: colors.platinum,
  },
};

export const darkTheme = {
  ...baseTheme,
  colors: {
    primary: colors.skyBlue,
    secondary: colors.amber,
    background: colors.darkPetroleum,
    surface: colors.navyBlue,
    text: colors.iceWhite,
    textSecondary: colors.silver,
    success: colors.lime,
    error: colors.coral,
    border: colors.spaceGray,
  },
};