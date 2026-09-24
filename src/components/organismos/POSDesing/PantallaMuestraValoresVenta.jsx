import styled, { keyframes } from "styled-components";
import { useEffect } from "react";
import { Icon } from "@iconify/react";
import { useResumenVentaStore } from "../../../store/ResumenVentaStore";
import { useEmpresaStore } from "../../../store/EmpresaStore";
import { FormatearNumeroDinero } from "../../../utils/Conversiones";
const ACCENT = {
  primary: "#1f7a5c",
  primaryDark: "#155a44",
  primarySoft: "rgba(31, 122, 92, 0.10)",
  borderSoft: "rgba(31, 122, 92, 0.13)",
};
const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
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

export const PantallaMuestraValoresVenta = () => {
  const { open, datos, cerrarResumenVenta } = useResumenVentaStore();
  const { dataempresa } = useEmpresaStore();

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
        <Contenido>
          <Cabecera>
            <IconoExito>
              <Icon icon="solar:check-circle-bold" />
            </IconoExito>
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
          <Boton onClick={cerrarResumenVenta}>
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
  background: rgba(0, 0, 0, 0.55);
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
  border-radius: 18px;
  color: ${({ theme }) => theme.text};
  background-color: ${({ theme }) => theme.bgtotal || theme.bg2};
  border: 1px solid
    ${({ theme }) =>
      theme.body === "#fff" ? "rgba(15,23,42,0.08)" : "rgba(255,255,255,0.08)"};
  box-shadow: ${({ theme }) =>
    theme.body === "#fff"
      ? "0 24px 55px rgba(15,23,42,0.16)"
      : "0 24px 55px rgba(0,0,0,0.65)"};
  animation: ${subir} 0.24s cubic-bezier(0.22, 1, 0.36, 1) both;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${ACCENT.primary};
  }
`;

const Contenido = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 28px 26px 26px;
`;

const Cabecera = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  text-align: center;
  span {
    font-size: 19px;
    font-weight: 800;
    color: ${({ theme }) => theme.text};
  }
  small {
    font-size: 12px;
    opacity: 0.5;
  }
`;

const IconoExito = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 54px;
  height: 54px;
  border-radius: 50%;
  background: ${ACCENT.primarySoft};
  color: ${ACCENT.primary};
  font-size: 28px;
  margin-bottom: 2px;
`;

const Separador = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) =>
    theme.body === "#fff" ? "rgba(15,23,42,0.08)" : "rgba(255,255,255,0.08)"};
`;

const Fila = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  span {
    font-size: 14px;
    opacity: 0.6;
  }
  strong {
    font-size: 18px;
    font-variant-numeric: tabular-nums;
    font-weight: 800;
  }
  &.suave {
    opacity: 0.55;
  }
`;

const Vuelto = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 4px;
  min-height: 104px;
  padding: 14px;
  box-sizing: border-box;
  border-radius: 14px;
  background: ${ACCENT.primarySoft};
  border: 1px solid ${ACCENT.borderSoft};

  span {
    font-size: 12px;
    font-weight: 700;
    opacity: 0.65;
    color: ${ACCENT.primary};
  }

  strong {
    font-size: 38px;
    line-height: 1;
    font-weight: 850;
    font-variant-numeric: tabular-nums;
    color: ${ACCENT.primary};
  }
`;

const Boton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  width: 100%;
  padding: 13px 14px;
  margin-top: 4px;
  border: none;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 800;
  color: #ffffff;
  background-color: ${ACCENT.primary};
  cursor: pointer;
  transition:
    transform 0.15s ease,
    filter 0.15s ease;
  span {
    opacity: 0.65;
    font-size: 12px;
    font-weight: 600;
  }
  &:hover {
    filter: brightness(1.06);
  }
  &:active {
    transform: scale(0.98);
  }
  &:focus-visible {
    outline: 2px solid ${ACCENT.primaryDark};
    outline-offset: 2px;
  }
`;
