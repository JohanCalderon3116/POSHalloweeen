import { useState } from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import { CardTotales } from "./CardTotales";
import { useDetalleVentasStore } from "../../../store/DetalleVentasStore";
import {
  FormatearNumeroDineroSinIsoYCurrency,
  useMostrarGanaciasXEmpresaQueryStack,
  useValidarPermisosOpertivos,
} from "../../..";
import { BarLoader } from "react-spinners";

export const Ganacias = () => {
  const [visible, setVisible] = useState(false);
  const { validarPermiso } = useValidarPermisosOpertivos();
  const { totalGanancias, porcentajeCambioGanancias } = useDetalleVentasStore();
  const { isLoading } = useMostrarGanaciasXEmpresaQueryStack();
  const desbloquear = () => {
    const permitido = validarPermiso("Ver ganancias");
    if (!permitido) return;
    setVisible(true);
  };
  if (isLoading) {
    return <BarLoader color="#ff7a18" />;
  }

  return (
    <Contenedor>
      <Tarjeta $oculta={!visible}>
        <CardTotales
          title="Ganancias"
          icon="solar:wallet-money-bold"
          value={FormatearNumeroDineroSinIsoYCurrency(totalGanancias)}
          porcentage={porcentajeCambioGanancias}
        />
      </Tarjeta>
      {!visible && (
        <Candado type="button" onClick={desbloquear}>
          <Icon
            icon="solar:lock-keyhole-minimalistic-unlocked-bold"
            width="28"
            height="28"
          />
          <span>Ver ganancias</span>
        </Candado>
      )}
    </Contenedor>
  );
};

const Contenedor = styled.div`
  position: relative;
`;

const Tarjeta = styled.div`
  transition: filter 0.25s ease;
  filter: ${({ $oculta }) => ($oculta ? "blur(10px)" : "none")};
  pointer-events: ${({ $oculta }) => ($oculta ? "none" : "auto")};
  user-select: ${({ $oculta }) => ($oculta ? "none" : "auto")};
`;

const Candado = styled.button`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  border: none;
  background: transparent;
  color: ${({ theme }) => theme.halloweenPrimary || theme.text};
  font-weight: 700;
  cursor: pointer;
  transition:
    transform 0.2s ease,
    color 0.2s ease;
  svg {
    filter: drop-shadow(0 0 6px rgba(255, 122, 24, 0.4));
  }

  &:hover {
    transform: scale(1.05);
    color: ${({ theme }) => theme.text};
  }
`;
