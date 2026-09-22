import styled, { keyframes, useTheme } from "styled-components";
import {
  LinksArray,
  SecondarylinksArray,
  ToggleTema,
  useAuthStore,
  v,
} from "../../../../index";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import Swal from "sweetalert2";

export function Sidebar({ state, setState }) {
  const { cerrarSesion } = useAuthStore();
  const theme = useTheme();
  function cerrarSesionConfirmacion() {
    Swal.fire({
      title: "¿Estás seguro(a)?",
      text: "Una vez cerrada la sesión, tendrá que volver a iniciar sesión.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: theme.halloweenPrimary,
      cancelButtonColor: theme.halloweenDanger,
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
      background: theme.bg2,
      color: theme.text,
      customClass: {
        popup: "softcreate-swal-popup",
        confirmButton: "softcreate-swal-confirm",
        cancelButton: "softcreate-swal-cancel",
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        cerrarSesion();
      }
    });
  }
  return (
    <Main $isopen={state.toString()}>
      <SidebarButton
        $isopen={state.toString()}
        onClick={() => setState(!state)}
      >
        <Icon icon="solar:alt-arrow-right-bold" />
      </SidebarButton>
      <SidebarContainer
        $isopen={state.toString()}
        className={state ? "active" : ""}
      >
        <LogoContent $isopen={state.toString()}>
          <LogoWrapper $isopen={state.toString()}>
            <img src={v.logo} alt="SoftCreate POS" />
          </LogoWrapper>
          <LogoTitle $isopen={state.toString()}>SoftCreate POS</LogoTitle>
        </LogoContent>
        {LinksArray.map(({ icon, label, to }) => (
          <LinkContainer key={label}>
            <StyledNavLink
              to={to}
              className={({ isActive }) => `Links ${isActive ? "active" : ""}`}
            >
              <LinkContent $isopen={state.toString()}>
                <StyledIcon className="Linkicon" icon={icon} />{" "}
                <Label $isopen={state.toString()}>{label}</Label>{" "}
              </LinkContent>{" "}
            </StyledNavLink>{" "}
          </LinkContainer>
        ))}{" "}
        <Divider />
        {SecondarylinksArray.map(({ icon, label, to, color }) => (
          <LinkContainer key={label}>
            <StyledNavLink
              to={to}
              className={({ isActive }) => `Links ${isActive ? "active" : ""}`}
            >
              <LinkContent $isopen={state.toString()}>
                <StyledIcon
                  className="Linkicon"
                  icon={icon}
                  $customcolor={color}
                />
                <Label $isopen={state.toString()}>{label}</Label>
              </LinkContent>
            </StyledNavLink>
          </LinkContainer>
        ))}
        <LinkContainer>
          <LogoutButton className="Links" onClick={cerrarSesionConfirmacion}>
            <LinkContent $isopen={state.toString()}>
              <StyledIcon
                className="Linkicon"
                icon="solar:logout-2-bold"
                $customcolor="#CE82FF"
              />
              <Label $isopen={state.toString()}>Cerrar sesión</Label>
            </LinkContent>
          </LogoutButton>
        </LinkContainer>
        <ThemeContainer $isopen={state.toString()}>
          <ToggleTema />
        </ThemeContainer>
      </SidebarContainer>
    </Main>
  );
}

const logoFloat = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
`;

const LogoContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${({ $isopen }) =>
    $isopen === "true" ? "flex-start" : "center"};
  width: 100%;
  min-height: 72px;
  padding: ${({ $isopen }) =>
    $isopen === "true" ? "0 16px 25px" : "0 0 25px"};
  overflow: hidden;
  transition:
    justify-content 0.3s ease,
    padding 0.3s ease;
`;

const LogoWrapper = styled.div`
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
  transform: ${({ $isopen }) =>
    $isopen === "true" ? "scale(0.9)" : "scale(1.1)"};
  img {
    display: block;
    width: 100%;
    animation: ${logoFloat} 2.4s ease-in-out infinite;
  }
`;

const LogoTitle = styled.h2`
  margin: 0 0 0 12px;
  white-space: nowrap;
  color: ${({ theme }) => theme.halloweenPrimary};
  font-size: 18px;
  font-weight: 800;
  display: ${({ $isopen }) => ($isopen === "true" ? "block" : "none")};
  opacity: ${({ $isopen }) => ($isopen === "true" ? 1 : 0)};
  transform: ${({ $isopen }) =>
    $isopen === "true" ? "translateX(0)" : "translateX(-10px)"};
  transition:
    opacity 0.25s ease,
    transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
`;

const SidebarContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  width: 88px;
  height: 100%;
  padding-top: 20px;
  overflow-x: hidden;
  overflow-y: auto;
  color: ${({ theme }) => theme.text};
  background: ${({ theme }) => theme.bgtotal};
  border-right: 1px solid ${({ theme }) => theme.color2};
  transition:
    width 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    background 0.3s ease,
    border-color 0.3s ease;
  &.active {
    width: 260px;
  }
  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colorScroll};
    border-radius: 10px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  @media (prefers-reduced-motion: reduce) {
    transition: none;
    * {
      transition-duration: 0.01ms !important;
      animation-duration: 0.01ms !important;
    }
  }
`;

const LinkContainer = styled.div`
  margin: 7px 8px;
  position: relative;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 52px;
  text-decoration: none;
  color: ${({ theme }) => theme.text};
  border-radius: 14px;
  border: 1px solid transparent;
  transition:
    background 0.25s ease,
    border-color 0.25s ease,
    color 0.25s ease,
    transform 0.2s ease,
    box-shadow 0.25s ease;
  &:hover {
    background: ${({ theme }) => theme.bgAlpha};
    transform: translateX(2px);
  }
  &.active {
    background: ${({ theme }) => theme.halloweenSoft};
    border-color: ${({ theme }) => theme.halloweenBorder};
    color: ${({ theme }) => theme.halloweenPrimary};
    box-shadow: inset 3px 0 0 ${({ theme }) => theme.halloweenPrimary};
  }
`;

const LogoutButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 52px;
  padding: 0;
  border: 1px solid transparent;
  border-radius: 14px;
  background: transparent;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  transition:
    background 0.25s ease,
    transform 0.2s ease,
    border-color 0.25s ease;
  &:hover {
    background: ${({ theme }) => theme.bgAlpha};
    transform: translateX(2px);
  }
`;

const LinkContent = styled.section`
  display: flex;
  align-items: center;
  justify-content: ${({ $isopen }) =>
    $isopen === "true" ? "flex-start" : "center"};
  width: 100%;
  height: 100%;
  gap: ${({ $isopen }) => ($isopen === "true" ? "16px" : "0")};
  padding: ${({ $isopen }) => ($isopen === "true" ? "0 16px" : "0")};
  overflow: hidden;
  transition:
    justify-content 0.3s ease,
    gap 0.3s ease,
    padding 0.3s ease;
`;

const StyledIcon = styled(Icon)`
  flex-shrink: 0;
  width: 26px;
  min-width: 26px;
  height: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  color: ${({ $customcolor, theme }) => $customcolor || theme.text};
  transition:
    transform 0.25s ease,
    color 0.25s ease,
    filter 0.25s ease;
  .Links:hover &,
  button:hover & {
    transform: scale(1.08);
  }
`;

const Label = styled.span`
  white-space: nowrap;
  overflow: hidden;
  font-size: 16px;
  display: ${({ $isopen }) => ($isopen === "true" ? "inline-block" : "none")};
  opacity: ${({ $isopen }) => ($isopen === "true" ? 1 : 0)};
  transform: ${({ $isopen }) =>
    $isopen === "true" ? "translateX(0)" : "translateX(-8px)"};
  transition:
    opacity 0.2s ease 0.08s,
    transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
`;

const Divider = styled.div`
  width: calc(100% - 24px);
  height: 1px;
  margin: 18px auto;
  background: ${({ theme }) => theme.color2};
  opacity: 0.8;
`;

const ThemeContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 15px 8px 30px;
`;

const Main = styled.div``;

const SidebarButton = styled.button`
  position: fixed;
  top: 67px;
  left: 71px;
  z-index: 30;
  width: 34px;
  height: 34px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.color2};
  background: ${({ theme }) => theme.bgtgderecha};
  color: ${({ theme }) => theme.text};
  box-shadow: 0 5px 18px ${({ theme }) => theme.bgAlpha};
  cursor: pointer;
  transform: ${({ $isopen }) =>
    $isopen === "true" ? "translateX(172px) rotate(180deg)" : "translateX(0)"};
  transition:
    transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
    background 0.25s ease,
    box-shadow 0.25s ease,
    border-color 0.25s ease;
  &:hover {
    border-color: ${({ theme }) => theme.halloweenBorder};
    box-shadow: 0 8px 25px ${({ theme }) => theme.halloweenGlow};
    color: ${({ theme }) => theme.halloweenPrimary};
  }
  &:active {
    transform: ${({ $isopen }) =>
      $isopen === "true"
        ? "translateX(172px) rotate(180deg) scale(.92)"
        : "scale(.92)"};
  }
`;
