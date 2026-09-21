import styled, { keyframes, useTheme } from "styled-components";
import { useEffect } from "react";
import { Icon } from "@iconify/react";
import { useResumenVentaStore } from "../../../store/ResumenVentaStore";
import { useEmpresaStore } from "../../../store/EmpresaStore";
import { FormatearNumeroDinero } from "../../../utils/Conversiones";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const subir = keyframes`
  from {
    opacity: 0;
    transform: translateY(16px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const flotar = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
`;

const pulsar = keyframes`
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.025);
  }
`;

const aparecerFila = keyframes`
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Telarana = ({ className }) => (
  <svg
    className={className}
    viewBox="0 0 200 200"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    aria-hidden="true"
  >
    <path d="M0 0 L200 0 M0 0 L190 38 M0 0 L152 76 M0 0 L114 114 M0 0 L76 152 M0 0 L38 190" />
    <path d="M32 0 Q28 15 32 32" />
    <path d="M64 0 Q52 28 64 64" />
    <path d="M96 0 Q78 42 96 96" />
    <path d="M128 0 Q104 55 128 128" />
    <path d="M160 0 Q130 70 160 160" />
  </svg>
);

export const PantallaMuestraValoresVenta = () => {
  const { open, datos, cerrarResumenVenta } = useResumenVentaStore();
  const { dataempresa } = useEmpresaStore();
  const theme = useTheme();

  useEffect(() => {
    if (!open) return;

    const onKey = (e) => {
      if (e.key === "Escape") {
        cerrarResumenVenta();
      }
    };

    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, [open, cerrarResumenVenta]);

  if (!open) return null;

  const fmt = (v) =>
    FormatearNumeroDinero(v, dataempresa?.currency, dataempresa?.iso);

  return (
    <Overlay onClick={cerrarResumenVenta}>
      <Container onClick={(e) => e.stopPropagation()}>
        <Decoracion>
          <Telarana className="web-left" />
          <Telarana className="web-right" />
        </Decoracion>

        <Contenido>
          <Cabecera>
            <Icon icon="noto:money-bag" className="money-icon" />
            <span>Venta registrada</span>
            <small>La operación se completó correctamente</small>
          </Cabecera>

          <Separador />

          <Fila>
            <span>Total</span>
            <strong>{fmt(datos?.total)}</strong>
          </Fila>

          <Vuelto>
            <span>Vuelto</span>
            <strong>{fmt(datos?.vuelto)}</strong>
          </Vuelto>

          <Fila className="suave">
            <span>Restante</span>
            <strong>{fmt(datos?.restante)}</strong>
          </Fila>

          <Boton onClick={cerrarResumenVenta} $primary={theme.halloweenPrimary}>
            <Icon icon="solar:check-circle-bold" />
            Cerrar
            <span>(Esc)</span>
          </Boton>
        </Contenido>
      </Container>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: rgba(0, 0, 0, 0.68);
  backdrop-filter: blur(5px);
  -webkit-backdrop-filter: blur(5px);
  animation: ${fadeIn} 0.18s ease both;

  @media (prefers-reduced-motion: reduce) {
    &,
    & * {
      animation: none !important;
    }
  }
`;

const Container = styled.div`
  position: relative;
  box-sizing: border-box;
  width: 400px;
  max-width: 94vw;
  overflow: hidden;
  border-radius: 16px;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.bgtotal || theme.bg2};
  border: 1px solid
    ${({ theme }) =>
      theme.body === "#fff"
        ? "rgba(255, 122, 24, 0.1)"
        : "rgba(255, 255, 255, 0.08)"};
  box-shadow: ${({ theme }) =>
    theme.body === "#fff"
      ? "0 20px 45px rgba(0, 0, 0, 0.14)"
      : "0 20px 45px rgba(0, 0, 0, 0.7)"};
  animation: ${subir} 0.24s cubic-bezier(0.22, 1, 0.36, 1) both;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${({ theme }) => theme.halloweenPrimary || "#ff7a18"};
    z-index: 4;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      radial-gradient(
        circle at 12% 8%,
        rgba(255, 122, 24, 0.02),
        transparent 28%
      ),
      radial-gradient(
        circle at 90% 90%,
        rgba(70, 60, 80, 0.025),
        transparent 35%
      );
  }
`;

const Decoracion = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 1;

  .web-left,
  .web-right {
    position: absolute;
    width: 145px;
    height: 145px;
    color: ${({ theme }) => theme.halloweenPrimary || "#ff7a18"};
    opacity: 0.1;
    filter: drop-shadow(0 0 5px rgba(255, 122, 24, 0.05));
    animation: ${flotar} 7s ease-in-out infinite;
  }

  .web-left {
    top: -8px;
    left: -8px;
    transform: scaleX(-1);
  }

  .web-right {
    top: -8px;
    right: -8px;
    animation-delay: -3s;
  }
`;

const Contenido = styled.div`
  position: relative;
  z-index: 3;
  display: flex;
  flex-direction: column;
  gap: 13px;
  padding: 26px;
`;

const Cabecera = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding-top: 4px;
  text-align: center;

  .money-icon {
    font-size: 42px;
    color: ${({ theme }) => theme.halloweenPrimary || "#ff7a18"};
    filter: drop-shadow(0 0 6px rgba(255, 122, 24, 0.1));
    animation: ${flotar} 3s ease-in-out infinite;
  }

  span {
    font-size: 19px;
    font-weight: 800;
    color: ${({ theme }) => theme.text};
  }

  small {
    font-size: 12px;
    opacity: 0.42;
  }
`;

const Separador = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) =>
    theme.body === "#fff"
      ? "rgba(0, 0, 0, 0.08)"
      : "rgba(255, 255, 255, 0.08)"};
`;

const Fila = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  font-size: 20px;
  animation: ${aparecerFila} 0.25s ease both;

  strong {
    font-variant-numeric: tabular-nums;
    font-weight: 800;
  }

  &.suave {
    opacity: 0.5;
  }
`;

const Vuelto = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  min-height: 105px;
  padding: 14px;
  box-sizing: border-box;
  border-radius: 13px;
  background-color: ${({ theme }) =>
    theme.body === "#fff"
      ? "rgba(0, 0, 0, 0.025)"
      : "rgba(255, 255, 255, 0.025)"};
  border: 1px solid
    ${({ theme }) =>
      theme.body === "#fff"
        ? "rgba(0, 0, 0, 0.07)"
        : "rgba(255, 255, 255, 0.07)"};
  animation: ${aparecerFila} 0.3s ease both;

  span {
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    opacity: 0.52;
  }

  strong {
    font-size: 39px;
    line-height: 1;
    font-weight: 850;
    font-variant-numeric: tabular-nums;
    color: ${({ theme }) => theme.halloweenPrimary || "#ff7a18"};
    animation: ${pulsar} 2.5s ease-in-out infinite;
  }
`;

const Boton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  width: 100%;
  padding: 13px 14px;
  margin-top: 2px;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 800;
  color: ${({ theme }) => (theme.body === "#fff" ? "#fff" : "#080808")};
  background-color: ${({ $primary, theme }) => $primary || "#ff7a18"};
  cursor: pointer;
  box-shadow: 0 7px 16px rgba(0, 0, 0, 0.18);
  transition:
    transform 0.16s ease,
    filter 0.16s ease,
    box-shadow 0.16s ease;

  span {
    opacity: 0.58;
    font-size: 12px;
  }

  &:hover {
    transform: translateY(-2px);
    filter: brightness(1.05);
    box-shadow: 0 9px 20px rgba(0, 0, 0, 0.24);
  }

  &:active {
    transform: scale(0.98);
  }
`;
