import styled, { keyframes, useTheme } from "styled-components";
import {
  LinksArray,
  SecondarylinksArray,
  ToggleTema,
  useAuthStore,
} from "../../../../index";
import { v } from "../../../../styles/variables";
import { NavLink } from "react-router-dom";
import { Icon } from "@iconify/react";
import Swal from "sweetalert2";
import React from "react";

export const MenuMovil = ({ setState }) => {
  const [state, setstate] = React.useState(true);
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
      color: theme.text,
    }).then(async (result) => {
      if (result.isConfirmed) {
        cerrarSesion();
      }
    });
  }
  function cerrarMenu() {
    setstate(false);
    if (typeof setState === "function") {
      setState();
    }
  }
  return (
    <Overlay $isopen={state.toString()}>
      <Backdrop $isopen={state.toString()} onClick={cerrarMenu} />
      <Drawer $isopen={state.toString()}>
        <DrawerHeader>
          <LogoContent>
            <LogoWrapper>
              <img src={v.logo} alt="SoftCreate POS" />
            </LogoWrapper>
            <LogoTitle>SoftCreate POS</LogoTitle>
          </LogoContent>
          <CloseButton onClick={cerrarMenu} aria-label="Cerrar menú">
            <Icon icon="solar:close-circle-bold" />
          </CloseButton>
        </DrawerHeader>
        <LinksWrapper>
          {LinksArray.map(({ icon, label, to }) => (
            <MobileLinkContainer key={label}>
              <StyledNavLink
                to={to}
                onClick={cerrarMenu}
                className={({ isActive }) =>
                  `Links ${isActive ? "active" : ""}`
                }
              >
                <MobileLinkContent>
                  <MobileIcon className="Linkicon" icon={icon} />

                  <span>{label}</span>
                </MobileLinkContent>
              </StyledNavLink>
            </MobileLinkContainer>
          ))}
          <Divider />
          {SecondarylinksArray.map(({ icon, label, to, color }) => (
            <MobileLinkContainer key={label}>
              <StyledNavLink
                to={to}
                onClick={cerrarMenu}
                className={({ isActive }) =>
                  `Links ${isActive ? "active" : ""}`
                }
              >
                <MobileLinkContent>
                  <MobileIcon
                    className="Linkicon"
                    icon={icon}
                    $customcolor={color}
                  />
                  <span>{label}</span>
                </MobileLinkContent>
              </StyledNavLink>
            </MobileLinkContainer>
          ))}
          <MobileLinkContainer>
            <LogoutButton onClick={cerrarSesionConfirmacion}>
              <MobileLinkContent>
                <MobileIcon icon="solar:logout-2-bold" $customcolor="#CE82FF" />
                <span>Cerrar sesión</span>
              </MobileLinkContent>
            </LogoutButton>
          </MobileLinkContainer>
        </LinksWrapper>
        <ThemeContainer>
          <ToggleTema />
        </ThemeContainer>
      </Drawer>
    </Overlay>
  );
};
const itemIn = keyframes`
from{opacity:0;transform:translateX(-15px);}
to{opacity:1;transform:translateX(0);}
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 100;
  pointer-events: ${({ $isopen }) => ($isopen === "true" ? "auto" : "none")};
  visibility: ${({ $isopen }) => ($isopen === "true" ? "visible" : "hidden")};
  transition: visibility 0s linear
    ${({ $isopen }) => ($isopen === "true" ? "0s" : ".4s")};
  @media (prefers-reduced-motion: reduce) {
    &,
    & * {
      animation-duration: 0.01ms !important;
      transition-duration: 0.01ms !important;
    }
  }
`;

const Backdrop = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.38);
  backdrop-filter: blur(2px);
  opacity: ${({ $isopen }) => ($isopen === "true" ? 1 : 0)};
  transition: opacity 0.3s ease;
`;

const Drawer = styled.aside`
  position: relative;
  z-index: 2;
  width: min(88%, 360px);
  height: 100%;
  overflow-y: auto;
  padding: 20px 16px 30px;
  background: ${({ theme }) => theme.bgtotal};
  color: ${({ theme }) => theme.text};
  border-right: 1px solid ${({ theme }) => theme.color2};
  box-shadow: 20px 0 60px rgba(0, 0, 0, 0.15);
  transform: ${({ $isopen }) =>
    $isopen === "true" ? "translateX(0)" : "translateX(-105%)"};
  transition:
    transform 0.42s cubic-bezier(0.16, 1, 0.3, 1),
    background 0.3s ease,
    border-color 0.3s ease;
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
`;

const DrawerHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 15px;
  margin-bottom: 30px;
`;

const LogoContent = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
`;

const LogoWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 42px;
  height: 42px;
  flex-shrink: 0;
  img {
    width: 100%;
    animation: mobileLogoFloat 2.5s ease-in-out infinite;
  }
`;

const LogoTitle = styled.h2`
  margin: 0;
  white-space: nowrap;
  font-size: 18px;
  font-weight: 800;
  color: ${({ theme }) => theme.halloweenPrimary};
`;

const CloseButton = styled.button`
  width: 38px;
  height: 38px;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 50%;
  border: 1px solid ${({ theme }) => theme.color2};
  background: ${({ theme }) => theme.bgAlpha};
  color: ${({ theme }) => theme.text};
  font-size: 24px;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease,
    background 0.2s ease;
  &:hover {
    color: ${({ theme }) => theme.halloweenPrimary};
    border-color: ${({ theme }) => theme.halloweenBorder};
    transform: rotate(90deg);
  }
  &:active {
    transform: scale(0.92);
  }
`;

const LinksWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const MobileLinkContainer = styled.div`
  animation: ${itemIn} 0.35s cubic-bezier(0.16, 1, 0.3, 1) both;
  &:nth-child(1) {
    animation-delay: 0.04s;
  }
  &:nth-child(2) {
    animation-delay: 0.08s;
  }
  &:nth-child(3) {
    animation-delay: 0.12s;
  }
  &:nth-child(4) {
    animation-delay: 0.16s;
  }
  &:nth-child(5) {
    animation-delay: 0.2s;
  }
  &:nth-child(6) {
    animation-delay: 0.24s;
  }
  &:nth-child(7) {
    animation-delay: 0.28s;
  }
`;

const StyledNavLink = styled(NavLink)`
  display: block;
  width: 100%;
  min-height: 56px;
  border-radius: 14px;
  text-decoration: none;
  color: ${({ theme }) => theme.text};
  border: 1px solid transparent;
  transition:
    background 0.25s ease,
    color 0.25s ease,
    transform 0.2s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;
  &:hover {
    background: ${({ theme }) => theme.bgAlpha};
    transform: translateX(3px);
  }
  &.active {
    background: ${({ theme }) => theme.halloweenSoft};
    color: ${({ theme }) => theme.halloweenPrimary};
    border-color: ${({ theme }) => theme.halloweenBorder};
    box-shadow: inset 3px 0 0 ${({ theme }) => theme.halloweenPrimary};
  }
`;

const MobileLinkContent = styled.section`
  display: flex;
  align-items: center;
  gap: 17px;
  width: 100%;
  min-height: 56px;
  padding: 0 16px;
  font-weight: 600;
  .Linkicon {
    font-size: 28px;
  }
  span {
    white-space: nowrap;
  }
`;

const MobileIcon = styled(Icon)`
  flex-shrink: 0;
  width: 28px;
  min-width: 28px;
  height: 28px;
  color: ${({ $customcolor, theme }) => $customcolor || "currentColor"};
  transition:
    transform 0.25s ease,
    color 0.25s ease;
  .Links:hover & {
    transform: scale(1.08);
  }
`;

const LogoutButton = styled.button`
  display: block;
  width: 100%;
  min-height: 56px;
  padding: 0;
  border: 1px solid transparent;
  border-radius: 14px;
  background: transparent;
  color: ${({ theme }) => theme.text};
  cursor: pointer;
  text-align: left;
  transition:
    background 0.25s ease,
    transform 0.2s ease,
    border-color 0.25s ease;
  &:hover {
    background: ${({ theme }) => theme.bgAlpha};
    transform: translateX(3px);
    border-color: ${({ theme }) => theme.color2};
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  margin: 18px 0;
  background: ${({ theme }) => theme.color2};
`;

const ThemeContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 28px 0 10px;
`;
