import styled, { useTheme } from "styled-components";
import { VolverBtn } from "../../../moleculas/VolverBtn";
import { Btn1 } from "../../../moleculas/Btn1";
import { Device } from "../../../../styles/breakpoints";
import { useCierreCajaStore } from "../../../../store/CierreCajaStore";
import { useFormattedDate } from "../../../../hooks/useFormattedDate";
import { format } from "date-fns";
import { useMovCajaStore } from "../../../../store/MovCajaStore";
import { FormatearNumeroDinero } from "../../../../utils/Conversiones";
import { useEmpresaStore } from "../../../../store/EmpresaStore";
import { PantallaConteoCaja } from "./PantallaConteoCaja";
import { BeatLoader } from "react-spinners";
import {
  useMostrarEfectivoSinVentasMovCajasQueryStack,
  useMostrarVentasMetodoPagoMovCajaQueryStack,
  useMostrarDetalleEfectivoSinVentasMovCajasQueryStack,
} from "../../../../tanstack/MovimientosCajaStack";
const HALLOWEEN = {
  primary: "#b86627",
  border: "rgba(184,102,39,0.11)",
  divider: "rgba(184,102,39,0.08)",
};

export const PantallaCierreCaja = () => {
  const {
    setStateCierreCaja,
    dataCierreCaja,
    stateConteoCaja,
    setStateConteoCaja,
  } = useCierreCajaStore();
  const fechaActual = useFormattedDate();
  const theme = useTheme();
  const {
    totalVentasMetodoPago,
    totalVentasEfectivo,
    totalAperturaCaja,
    totalGastosVariosCaja,
    totalIngresosVariosCaja,
    totalEfectivoTotalCaja,
  } = useMovCajaStore();
  const { dataempresa } = useEmpresaStore();
  const fechaInicioFormateada = format(
    new Date(dataCierreCaja?.fechainicio),
    "dd/MM/yyyy:HH:mm:ss",
  );
  const { isLoading: isLoading1 } =
    useMostrarEfectivoSinVentasMovCajasQueryStack();
  const { isLoading: isLoading2, data: dataventasmetodospago } =
    useMostrarVentasMetodoPagoMovCajaQueryStack();
  const { isLoading: isLoading3, data: dataDetalleMovs } =
    useMostrarDetalleEfectivoSinVentasMovCajasQueryStack();
  const isLoading = isLoading1 || isLoading2 || isLoading3;
  const formatearDescripcion = (descripcion) =>
    !descripcion || descripcion === "-" ? "Sin detalle" : descripcion;
  const entradasDetalle =
    dataDetalleMovs?.filter((m) => m.tipo_movimiento === "ingreso") ?? [];
  const salidasDetalle =
    dataDetalleMovs?.filter((m) => m.tipo_movimiento === "salida") ?? [];

  if (isLoading) {
    return (
      <ConteinerLoader>
        <span>
          <strong>Cargando</strong>
        </span>
        <BeatLoader color={theme.text} size={8} />
      </ConteinerLoader>
    );
  }

  return (
    <Container>
      <VolverBtn funcion={() => setStateCierreCaja(false)} />
      <Fechas>
        Corte de caja desde: {fechaInicioFormateada} Hasta: {fechaActual}
      </Fechas>
      <Datos>
        <section>
          Ventas Totales:
          <span>
            {FormatearNumeroDinero(
              totalVentasMetodoPago,
              dataempresa?.currency,
              dataempresa?.iso,
            )}
          </span>
        </section>
        <section>
          Efectivo en caja:
          <span>
            {FormatearNumeroDinero(
              totalEfectivoTotalCaja,
              dataempresa?.currency,
              dataempresa?.iso,
            )}
          </span>
        </section>
      </Datos>
      <Division />
      <Resumen>
        <Tablas>
          <Tabla>
            <h4>Dinero en caja</h4>
            <ul>
              <li>
                Base de caja:
                <span>
                  {FormatearNumeroDinero(
                    totalAperturaCaja,
                    dataempresa?.currency,
                    dataempresa?.iso,
                  )}
                </span>
              </li>
              <li>
                Ventas (Efectivo):
                <span>
                  {FormatearNumeroDinero(
                    totalVentasEfectivo,
                    dataempresa?.currency,
                    dataempresa?.iso,
                  )}
                </span>
              </li>
              <li className="conDetalle">
                Entradas:
                <span>
                  {FormatearNumeroDinero(
                    totalIngresosVariosCaja,
                    dataempresa?.currency,
                    dataempresa?.iso,
                  )}
                </span>
              </li>
              {entradasDetalle.length > 0 && (
                <DetalleList>
                  {entradasDetalle.map((mov) => (
                    <li key={mov.id}>
                      <span className="concepto">
                        {formatearDescripcion(mov.descripcion)}
                      </span>
                      <span className="monto ingreso">
                        +
                        {FormatearNumeroDinero(
                          mov.monto,
                          dataempresa?.currency,
                          dataempresa?.iso,
                        )}
                      </span>
                    </li>
                  ))}
                </DetalleList>
              )}
              <li className="conDetalle">
                Salidas / Gastos:
                <span className="gasto">
                  -
                  {FormatearNumeroDinero(
                    totalGastosVariosCaja,
                    dataempresa?.currency,
                    dataempresa?.iso,
                  )}
                </span>
              </li>
              {salidasDetalle.length > 0 && (
                <DetalleList>
                  {salidasDetalle.map((mov) => (
                    <li key={mov.id}>
                      <span className="concepto">
                        {formatearDescripcion(mov.descripcion)}
                      </span>
                      <span className="monto gasto">
                        -
                        {FormatearNumeroDinero(
                          mov.monto,
                          dataempresa?.currency,
                          dataempresa?.iso,
                        )}
                      </span>
                    </li>
                  ))}
                </DetalleList>
              )}
              <li className="total">
                <Divider />
                {FormatearNumeroDinero(
                  totalEfectivoTotalCaja,
                  dataempresa?.currency,
                  dataempresa?.iso,
                )}
              </li>
            </ul>
          </Tabla>
          <DivisionY />
          <Tabla>
            <h4>Ventas Totales</h4>
            <ul>
              {dataventasmetodospago?.map((item, index) => (
                <li key={index}>
                  En {item?.metodo_pago}:
                  <span>
                    {FormatearNumeroDinero(
                      item.monto,
                      dataempresa?.currency,
                      dataempresa?.iso,
                    )}
                  </span>
                </li>
              ))}
              <li className="total">
                <Divider />
                {FormatearNumeroDinero(
                  totalVentasMetodoPago,
                  dataempresa?.currency,
                  dataempresa?.iso,
                )}
              </li>
            </ul>
          </Tabla>
          <DivisionY />
        </Tablas>
      </Resumen>
      <Btn1
        funcion={() => setStateConteoCaja(true)}
        titulo="Cerrar caja"
        color="#ffffff"
        border="2px"
        bgcolor={HALLOWEEN.primary}
      />
      {stateConteoCaja && <PantallaConteoCaja />}
    </Container>
  );
};

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: ${({ theme }) =>
    theme.body === "#fff" ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)"};
  margin-right: 10px;
`;

const DivisionY = styled.span`
  width: 1px;
  height: 95%;
  margin: 20px 0;
  position: relative;
  display: none;
  border-left: 1px dashed
    ${({ theme }) =>
      theme.body === "#fff" ? "rgba(0,0,0,0.09)" : "rgba(255,255,255,0.07)"};

  @media ${Device.tablet} {
    display: block;
  }
`;

const Division = styled.span`
  width: 95%;
  height: 1px;
  margin: 20px 0;
  border-radius: 15px;
  background: ${({ theme }) =>
    theme.body === "#fff" ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.08)"};
  position: relative;
  &::after {
    content: "";
    position: absolute;
    left: 35%;
    right: 35%;
    top: 0;
    height: 1px;
    background: ${HALLOWEEN.divider};
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  position: absolute;
  width: 100%;
  min-height: 100vh;
  box-sizing: border-box;
  padding: 20px;
  background-color: ${({ theme }) => theme.bgtotal || "#fff"};
  color: ${({ theme }) => theme.text};
  z-index: 10;
  & > button {
    transition:
      transform 0.18s ease,
      filter 0.18s ease,
      box-shadow 0.18s ease;
    &:hover {
      transform: translateY(-2px);
      filter: brightness(1.03);
      box-shadow: 0 6px 16px rgba(184, 102, 39, 0.07);
    }
    &:active {
      transform: scale(0.98);
    }
  }
  @media (max-width: 768px) {
    overflow-y: auto;
    justify-content: flex-start;
    padding-top: 30px;
    padding-bottom: 30px;
  }
`;

const Fechas = styled.p`
  margin: 0;
  font-size: 14px;
  text-align: center;
  opacity: 0.7;
  @media (max-width: 768px) {
    padding: 0 10px;
  }
`;

const Datos = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 12px;
  width: min(900px, 92%);
  section {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
    padding: 13px 16px;
    border-radius: 10px;
    font-size: 14px;
    background: ${({ theme }) =>
      theme.body === "#fff" ? "rgba(0,0,0,0.018)" : "rgba(255,255,255,0.015)"};
    border: 1px solid
      ${({ theme }) =>
        theme.body === "#fff" ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.05)"};
    span {
      font-weight: 700;
      white-space: nowrap;
      color: ${HALLOWEEN.primary};
      opacity: 0.9;
    }
  }
  @media (max-width: 768px) {
    flex-direction: column;
    width: 92%;
  }
`;

const Resumen = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  gap: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const Tablas = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: center;
  gap: 30px;
  width: min(900px, 92%);
  @media (max-width: 768px) {
    flex-direction: column;
    width: 92%;
    gap: 12px;
  }
`;

const Tabla = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  max-width: 410px;
  padding: 15px;
  box-sizing: border-box;
  border-radius: 10px;
  background: ${({ theme }) =>
    theme.body === "#fff" ? "rgba(0,0,0,0.012)" : "rgba(255,255,255,0.01)"};
  border: 1px solid
    ${({ theme }) =>
      theme.body === "#fff" ? "rgba(0,0,0,0.055)" : "rgba(255,255,255,0.045)"};
  h4 {
    margin: 0 0 12px;
    font-size: 18px;
    font-weight: 700;
    color: ${({ theme }) => theme.text};
  }
  ul {
    width: 100%;
    padding: 0;
    margin: 0;
    list-style: none;
  }
  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 15px;
    margin-bottom: 6px;
    font-size: 14px;
    color: ${({ theme }) => theme.text};
    opacity: 0.8;
    span {
      white-space: nowrap;
      font-weight: 600;
    }
  }
  li .gasto {
    color: #c95858;
    font-weight: 700;
  }
  .total {
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    width: 100%;
    margin-top: 9px;
    font-weight: 700;
    color: ${HALLOWEEN.primary};
    opacity: 1;
  }
`;

const DetalleList = styled.ul`
  width: 100%;
  padding: 0 0 6px 10px !important;
  margin: -2px 0 6px !important;
  list-style: none;
  border-left: 2px solid ${HALLOWEEN.border};
  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    opacity: 0.75;
    margin-bottom: 4px;
  }
  .concepto {
    opacity: 0.85;
    font-weight: 400;
  }
  .monto {
    font-weight: 600;
    white-space: nowrap;
  }
  .monto.ingreso {
    color: #4caf83;
  }
  .monto.gasto {
    color: #c95858;
  }
`;

const ConteinerLoader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  height: 100vh;
  color: ${({ theme }) => theme.text};
  strong {
    font-size: 14px;
    opacity: 0.7;
  }
`;
