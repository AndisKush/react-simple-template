// Vamos pré-definir os ícones aqui para facilitar
const HomeIcon = () => '🏠';
const UserIcon = () => '👥';
const ProductIcon = () => '📦';
const CustomerIcon = () => '👥';
const SupplierIcon = () => '🚚';
const RegisterIcon = () => '📝';

export const menuItems = [
  {
    id: 'home',
    label: 'Home',
    path: '/', // O react-router usará este path
    icon: <HomeIcon />,
    showOnWide: true,
    showOnMobile: true,
  },
  {
    id: 'register',
    label: 'Cadastro',
    icon: <RegisterIcon />,
    showOnWide: true,
    showOnMobile: true,
    // Submenus são definidos em um array 'children'
    children: [
      {
        id: 'users',
        label: 'Usuários',
        path: '/users',
        icon: <UserIcon />,
        showOnWide: true,
        // No mobile, este item não aparecerá na barra principal,
        // mas sim na tela de "Cadastro".
        showOnMobile: false, 
      },
      {
        id: 'products',
        label: 'Produtos',
        path: '/products',
        icon: <ProductIcon />,
        showOnWide: true,
        // No mobile, este item não aparecerá na barra principal,
        // mas sim na tela de "Cadastro".
        showOnMobile: false, 
      },
      {
        id: 'customers',
        label: 'Clientes',
        path: '/customers',
        icon: <CustomerIcon />,
        showOnWide: true,
        showOnMobile: false,
      },
      {
        id: 'suppliers',
        label: 'Fornecedores',
        path: '/suppliers',
        icon: <SupplierIcon />,
        showOnWide: true,
        showOnMobile: false,
      },
    ],
  },
];