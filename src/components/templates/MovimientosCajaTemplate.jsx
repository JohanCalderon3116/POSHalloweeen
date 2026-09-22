import styled, { useTheme } from "styled-components";
import { Title } from "../atomos/Titles";
import { TablaMovimientosCaja } from "../organismos/tablas/TablaMovimientosCaja";
import { useMostrarMovimientosCajaXEmpresYFechaQueryStack } from "../../tanstack/MovimientosCajaStack";
import { useEmpresaStore } from "../../store/EmpresaStore";
import { BeatLoader } from "react-spinners";
import { DateRangeFilterMovCajas } from "../organismos/DashboardDesign/DateRangeFilterMovCajas";
import { useMovCajaStore } from "../../store/MovCajaStore";
import { useVentasStore } from "../../store/VentasStore";
import { TicketModal } from "../moleculas/TicketModal";
import {
  Telarana,
  AranaSvg,
  MurcielagoSvg,
  Rincon,
  Colgante,
  Pendulo,
  Hilo,
  Cuerpo,
  Murcielago,
  Aleteo,
  ARANAS,
  MURCIELAGOS,
} from "../organismos/LoginDesing/EscenaHalloween";

export const MovimientosCajaTemplate = () => {
  const { fechaInicio, fechaFin } = useMovCajaStore();
  const { data: dataMovCajasxEmpres, isLoading } =
    useMostrarMovimientosCajaXEmpresYFechaQueryStack(fechaInicio, fechaFin);
  const { dataempresa } = useEmpresaStore();
  const { abrirTicket } = useVentasStore();
  const theme = useTheme();

  return (
    <Container>
      <div className="decorations" aria-hidden="true">
        <Rincon className="izq">
          <Telarana />
        </Rincon>
        <Rincon className="der">
          <Telarana />
        </Rincon>
        {MURCIELAGOS.map((b, i) => (
          <Murcielago
            key={i}
            className="bat"
            style={{
              "--y": b.y,
              width: b.w,
              animationDuration: b.t,
              animationDelay: b.d,
              animationDirection: b.rev ? "reverse" : "normal",
            }}
          >
            <Aleteo>
              <MurcielagoSvg
                style={{ transform: b.rev ? "scaleX(-1)" : "none" }}
              />
            </Aleteo>
          </Murcielago>
        ))}
        {ARANAS.map((a, i) => (
          <Colgante
            key={i}
            className={a.extra ? "extra" : ""}
            style={{ left: a.x, animationDelay: a.d }}
          >
            <Pendulo
              style={{
                animationDuration: a.t,
                animationDelay: `-${i * 0.9}s`,
              }}
            >
              <Hilo style={{ height: a.largo }} />
              <Cuerpo style={{ width: a.ancho }}>
                <AranaSvg />
              </Cuerpo>
            </Pendulo>
          </Colgante>
        ))}
      </div>
      <section className="area1">
        <Title>Movimientos de caja por fecha</Title>{" "}
      </section>
      <ActionsContainer>
        <DateRangeFilterMovCajas></DateRangeFilterMovCajas>
      </ActionsContainer>
      <section className="main">
        {isLoading ? (
          <ConteinerLoader>
            <span>
              <strong>Cargando</strong>
            </span>
            <BeatLoader color={theme.text} size={8} />
          </ConteinerLoader>
        ) : (
          <TablaMovimientosCaja
            data={dataMovCajasxEmpres}
            dataempresa={dataempresa}
            onVerVenta={abrirTicket}
          ></TablaMovimientosCaja>
        )}
      </section>
      <TicketModal></TicketModal>
    </Container>
  );
};

const Container = styled.div`
  height: calc(100vh - 30px);
  padding: 15px;
  display: grid;
  .decorations {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    z-index: 0;
  }
  grid-template:
    "area1" 60px
    "area2" 60px
    "main" auto;
  .area1 {
    grid-area: area1;
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 15px;
  }
  .main {
    grid-area: main;
  }
`;
const ConteinerLoader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 8px;
  height: 100vh;
`;
const ActionsContainer = styled.div`
  border: 2px solid ${({ theme }) => theme.colortitlecard};
  border-radius: 10px;
  background-color: ${({ theme }) => theme.body};
`;
