import { useState } from "react";
import styled, { css } from "styled-components";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { menuItems } from "../config/menuConfig";
import ThemeToggle from "../components/ThemeToggle"; // <-- IMPORTADO AQUI

// --- ÍCONE SVG PARA O BOTÃO DE TOGGLE ---
const MenuIcon = ({ isOpen }) => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{
      transition: "transform 0.2s ease-in-out",
      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
    }}
  >
    <path
      d="M15.5 19L8.5 12L15.5 5"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const LayoutContainer = styled.div`
  display: flex;
`;

const Sidebar = styled.aside`
  width: ${({ $isOpen }) => ($isOpen ? "250px" : "80px")};
  background-color: ${({ theme }) => theme.colors.surface};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.md};
  transition: width 0.3s ease-in-out;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 100;
`;

const MainContent = styled.main`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.lg};
  overflow-y: auto;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  transition: all 0.3s ease-in-out;
  width: ${({ $isOpen }) =>
    $isOpen ? "calc(100vw - 250px)" : "calc(100vw - 80px)"};
  margin-left: ${({ $isOpen }) => ($isOpen ? "250px" : "80px")};
`;

const UserProfile = styled.div`
  padding: ${({ theme }) => theme.spacing.md} 0;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  text-align: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  transition: opacity 0.2s ease-in-out;
  height: 80px;
  overflow: hidden;
`;

const UserName = styled.h4`
  color: ${({ theme }) => theme.colors.text};
  margin: 0;
`;

const UserEmail = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.small};
  color: ${({ theme }) => theme.colors.textSecondary};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const NavMenu = styled.nav`
  flex: 1;
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const ToggleButton = styled.button`
  position: absolute;
  top: 20px;
  right: -15px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  color: white;
  border: 2px solid ${({ theme }) => theme.colors.background};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  z-index: 10;
`;

const commonLinkStyles = css`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 12px;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  border: none;
  background-color: transparent;
  color: ${({ theme }) => theme.colors.textSecondary};
  border-radius: ${({ theme }) => theme.borderRadius};
  font-size: ${({ theme }) => theme.fontSizes.medium};
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.2s ease-in-out;

  ${({ $isOpen }) =>
    !$isOpen &&
    css`
      justify-content: center;
    `}

  &:hover {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.primary};
  }

  span {
    margin-left: ${({ theme }) => theme.spacing.md};
    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    transition: opacity 0.2s;
    white-space: nowrap;
  }
`;

const StyledNavLink = styled(NavLink)`
  ${commonLinkStyles}
  &.active {
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.primary};
    font-weight: 700;
  }
`;

const MenuButton = styled.button`
  ${commonLinkStyles}
  color: ${({ theme, $active }) =>
    $active ? theme.colors.primary : theme.colors.textSecondary};
  font-weight: ${({ $active }) => ($active ? 700 : 500)};
`;

const SubMenu = styled.div`
  overflow: hidden;
  max-height: ${({ $isOpen }) => ($isOpen ? "200px" : "0")};
  transition: max-height 0.3s ease-in-out;
  padding-left: ${({ theme }) => theme.spacing.lg};
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
  transition: all ${({ theme }) => theme.transitions.fast};
  white-space: nowrap;

  &:hover {
    background-color: ${({ theme }) => theme.colors.error};
    color: white;
  }
`;

const FooterActions = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const WidescreenLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const activeParentMenu = menuItems.find((item) =>
    item.children?.some((child) => child.path === location.pathname)
  )?.id;
  const [openSubMenu, setOpenSubMenu] = useState(activeParentMenu || null);

  const wideNavItems = menuItems.filter((item) => item.showOnWide);

  const handleMenuClick = (id) => {
    setOpenSubMenu(openSubMenu === id ? null : id);
  };

  return (
    <LayoutContainer>
      <Sidebar $isOpen={isSidebarOpen}>
        <ToggleButton onClick={() => setSidebarOpen(!isSidebarOpen)}>
          <MenuIcon isOpen={isSidebarOpen} />
        </ToggleButton>

        {user && (
          <UserProfile $isOpen={isSidebarOpen}>
            <UserName>
              {isSidebarOpen ? user.name : user.name.charAt(0).toUpperCase()}
            </UserName>
            {isSidebarOpen && <UserEmail>{user.email}</UserEmail>}
          </UserProfile>
        )}
        <NavMenu>
          {wideNavItems.map((item) => (
            <div key={item.id}>
              {item.children ? (
                <MenuButton
                  $isOpen={isSidebarOpen}
                  onClick={() => handleMenuClick(item.id)}
                  $active={activeParentMenu === item.id}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </MenuButton>
              ) : (
                <StyledNavLink to={item.path} $isOpen={isSidebarOpen}>
                  {item.icon}
                  <span>{item.label}</span>
                </StyledNavLink>
              )}
              {item.children && isSidebarOpen && (
                <SubMenu $isOpen={openSubMenu === item.id}>
                  {item.children.map((child) => (
                    <StyledNavLink
                      key={child.id}
                      to={child.path}
                      $isOpen={isSidebarOpen}
                    >
                      {child.icon}
                      <span>{child.label}</span>
                    </StyledNavLink>
                  ))}
                </SubMenu>
              )}
            </div>
          ))}
        </NavMenu>
        <FooterActions>
          <ThemeToggle isSidebarOpen={isSidebarOpen} />
          <LogoutButton onClick={logout}>
            {isSidebarOpen ? "Sair" : "🚪"}
          </LogoutButton>
        </FooterActions>
      </Sidebar>
      <MainContent $isOpen={isSidebarOpen}>{children}</MainContent>
    </LayoutContainer>
  );
};

export default WidescreenLayout;
