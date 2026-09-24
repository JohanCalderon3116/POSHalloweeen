import styled, { keyframes } from "styled-components";
import { Device } from "../../../styles/breakpoints";
import { DateRangeFilter } from "./DateRangeFilter";
import { Icon } from "@iconify/react";
import { useUsuariosStore } from "../../../store/UsuariosStore";
import { useEffect, useState } from "react";
const flotarFantasma = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
`;

export const DashboardHeader = () => {
  const { datausuarios } = useUsuariosStore();
  const nombre = datausuarios?.nombres || "";
  const [texto, setTexto] = useState("");
  const [idioma, setIdioma] = useState(0);
  const [borrando, setBorrando] = useState(false);
  const mensajes = [
    `¡Bienvenido ${nombre}!`,
    `Welcome ${nombre}!`,
    `Bienvenue ${nombre}!`,
    `Benvenuto ${nombre}!`,
    `Bem-vindo ${nombre}!`,
    `Willkommen ${nombre}!`,
    `Welkom ${nombre}!`,
    `ようこそ ${nombre}!`,
    `환영합니다 ${nombre}!`,
    `欢迎 ${nombre}!`,
  ];
  useEffect(() => {
    if (!nombre) return;
    const mensajeActual = mensajes[idioma];
    let timeout;

    if (!borrando) {
      if (texto.length < mensajeActual.length) {
        timeout = setTimeout(() => {
          setTexto(mensajeActual.slice(0, texto.length + 1));
        }, 42);
      } else {
        timeout = setTimeout(() => {
          setBorrando(true);
        }, 1600);
      }
    } else {
      if (texto.length > 0) {
        timeout = setTimeout(() => {
          setTexto(mensajeActual.slice(0, texto.length - 1));
        }, 25);
      } else {
        timeout = setTimeout(() => {
          setBorrando(false);
          setIdioma((prev) => (prev + 1) % mensajes.length);
        }, 250);
      }
    }
    return () => clearTimeout(timeout);
  }, [texto, idioma, borrando, nombre]);

  return (
    <Container>
      <TextContainer>
        <Title>
          <span>{texto}</span>
          <Icon icon="solar:ghost-bold" className="ghost-icon" />
        </Title>
      </TextContainer>
      <ActionsContainer>
        <DateRangeFilter />
      </ActionsContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  @media ${Device.desktop} {
    flex-direction: row;
  }
`;
const TextContainer = styled.div`
  min-width: 0;
`;

const Title = styled.h1`
  font-size: 44px;
  font-weight: 900;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
  color: ${({ theme }) => theme.text};
  white-space: nowrap;
  span {
    display: inline-block;
  }
  .ghost-icon {
    flex-shrink: 0;
    font-size: 38px;
    color: ${({ theme }) => theme.halloweenPrimary || "#ff7a18"};
    filter: drop-shadow(0 0 8px rgba(255, 122, 24, 0.4));
    animation: ${flotarFantasma} 3s ease-in-out infinite;
  }
  @media (max-width: 768px) {
    font-size: 34px;

    .ghost-icon {
      font-size: 30px;
    }
  }
  @media (max-width: 480px) {
    font-size: 28px;

    .ghost-icon {
      font-size: 26px;
    }
  }
`;

const ActionsContainer = styled.div`
  border: 1px solid
    ${({ theme }) => theme.halloweenBorder || theme.colortitlecard};
  border-radius: 12px;
  background-color: ${({ theme }) => theme.body};
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 15px ${({ theme }) => theme.bgAlpha || "rgba(0, 0, 0, 0.1)"};
`;
