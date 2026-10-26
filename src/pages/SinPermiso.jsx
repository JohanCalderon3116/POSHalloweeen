import styled from "styled-components";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

export const SinPermiso = () => {
  return (
    <Container>
      <Icon icon="fluent-emoji:jack-o-lantern" width="90" height="90" />
      <Title>¡Acceso Denegado por los Espíritus!</Title>
      <Subtitle>
        Esta zona está maldita o no tienes el nivel de magia suficiente.
        Contacta a un administrador.
      </Subtitle>
      <StyledLink to="/">Huir al inicio</StyledLink>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  text-align: center;
  padding: 20px;
  background-color: ${({ theme }) => theme.body2};
  color: ${({ theme }) => theme.text};
`;

const Title = styled.h2`
  font-size: ${({ theme }) => theme.fontxxl};
  margin: 0;
  color: ${({ theme }) => theme.halloweenPrimary};
  text-shadow: 0 0 12px ${({ theme }) => theme.halloweenGlow};
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colorsubtitlecard};
  margin: 0;
  max-width: 400px;
  font-size: ${({ theme }) => theme.fontmd};
`;

const StyledLink = styled(Link)`
  margin-top: 15px;
  padding: 12px 24px;
  border-radius: 8px;
  background-color: ${({ theme }) => theme.halloweenSecondary};
  color: ${({ theme }) => theme.color3};
  text-decoration: none;
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontButton};
  box-shadow: 0 0 15px ${({ theme }) => theme.halloweenSoft2};
  transition: all 0.3s ease;
  &:hover {
    background-color: ${({ theme }) => theme.halloweenPrimary};
    box-shadow: 0 0 20px ${({ theme }) => theme.halloweenGlow};
    transform: scale(1.05);
  }
`;
