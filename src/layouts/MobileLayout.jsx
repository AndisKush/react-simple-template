import { useState } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { menuItems } from "../config/menuConfig";
import ThemeToggle from "../components/ThemeToggle";

// --- ÍCONES SVG ---
const ProfileIcon = () => (
  <svg viewBox="0 0 24 24" width="24" height="24">
    <path
      d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="12"
      cy="7"
      r="4"
      stroke="currentColor"
      strokeWidth="2"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LayoutContainer = styled.div`
  /* Este container não precisa mais de estilos complexos de altura */
  position: relative;
  width: 100vw;
  height: 100vh;
`;

const MainContent = styled.main`
  /* O conteúdo agora rola por toda a altura da tela... */
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;

  /* ...mas com um preenchimento no final para não ficar atrás do menu */
  /* 65px (altura do menu) + 16px (um respiro) */
  padding: ${({ theme }) => theme.spacing.md};
  padding-bottom: 81px; // <-- AJUSTE IMPORTANTE
`;

const BottomNav = styled.nav`
  position: fixed; // <-- MUDANÇA PRINCIPAL
  bottom: 0;
  left: 0;
  right: 0; // Garante que ocupe toda a largura

  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 65px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  z-index: 100; // Garante que fique por cima de tudo
`;

const NavButton = styled(NavLink)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  flex: 1;
  height: 100%;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 10px;
  cursor: pointer;
  text-decoration: none;

  &.active {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ProfileButton = styled.button`
  all: unset;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
  height: 100%;
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: 10px;
  cursor: pointer;
`;

// O código do Modal de Perfil não precisa de alterações
const ProfileModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 1000;
`;
const ProfileModalContent = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.colors.surface};
  padding: ${({ theme }) => theme.spacing.lg};
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;
const LogoutButton = styled.button`
  width: 100%;
  padding: 12px;
  border: 1px solid ${({ theme }) => theme.colors.error};
  border-radius: ${({ theme }) => theme.borderRadius};
  background-color: transparent;
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-weight: bold;
  cursor: pointer;
  margin-top: ${({ theme }) => theme.spacing.md};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background-color: ${({ theme }) => theme.colors.error};
    color: white;
  }
`;

const MobileLayout = ({ children }) => {
  const [isProfileOpen, setProfileOpen] = useState(false);
  const { user, logout } = useAuth();

  const mobileNavItems = menuItems.filter((item) => item.showOnMobile);

  return (
    <LayoutContainer>
      <MainContent>{children}</MainContent>

      {isProfileOpen && (
        <ProfileModalOverlay onClick={() => setProfileOpen(false)}>
          <ProfileModalContent onClick={(e) => e.stopPropagation()}>
            <div>
              <h3>{user?.name}</h3>
              <p>{user?.email}</p>
            </div>
            <ThemeToggle isSidebarOpen={true} />{" "}
            {/* Passamos true para sempre mostrar o texto */}
            <LogoutButton onClick={logout}>Sair da Conta</LogoutButton>
          </ProfileModalContent>
        </ProfileModalOverlay>
      )}

      <BottomNav>
        {mobileNavItems.map((item) => (
          <NavButton
            key={item.id}
            to={item.children ? `/menu/${item.id}` : item.path}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavButton>
        ))}
        <ProfileButton onClick={() => setProfileOpen(true)}>
          <ProfileIcon />
          <span>Perfil</span>
        </ProfileButton>
      </BottomNav>
    </LayoutContainer>
  );
};

export default MobileLayout;
