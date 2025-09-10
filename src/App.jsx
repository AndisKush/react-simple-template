import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { GlobalStyle } from './styles/GlobalStyle';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { ThemeModeProvider } from './contexts/ThemeContext'; // <-- IMPORTADO AQUI

// Layouts e Telas
import ResponsiveLayout from './layouts/ResponsiveLayout';
import LoginScreen from './screens/Login';
import HomeScreen from './screens/Home';
import UsersScreen from './screens/Register/Users';
import ProductsScreen from './screens/Register/Products';
import CustomersScreen from './screens/Register/Customers';
import SuppliersScreen from './screens/Register/Suppliers';
import RegisterMenuScreen from './screens/Register/RegisterMenu';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  return (
    // O ThemeModeProvider agora gerencia o tema e o StyledThemeProvider
    <ThemeModeProvider>
      <GlobalStyle />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/*" element={
              <ProtectedRoute>
                <ResponsiveLayout>
                  <Routes>
                    <Route path="/" element={<HomeScreen />} />
                    <Route path="/users" element={<UsersScreen />} />
                    <Route path="/products" element={<ProductsScreen />} />
                    <Route path="/customers" element={<CustomersScreen />} />
                    <Route path="/suppliers" element={<SuppliersScreen />} />
                    <Route path="/menu/register" element={<RegisterMenuScreen />} />
                    <Route path="*" element={<Navigate to="/" />} />
                  </Routes>
                </ResponsiveLayout>
              </ProtectedRoute>
            }/>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </ThemeModeProvider>
  );
}

export default App;