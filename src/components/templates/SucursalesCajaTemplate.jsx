import styled, { keyframes } from "styled-components";
import { ButtonDashed } from "../ui/buttons/ButtonDashed";
import { ListSucursales } from "../organismos/SucursalesDesign/ListSucursales";
import {
  RegistrarSucursal,
  useCajasStore,
  useSucursalesStore,
} from "../../index";
import { Toaster } from "sonner";
import { RegistrarCaja } from "../organismos/formularios/RegistrarCaja";
import { AnimatedGrid } from "../ui/animated/AnimatedGrid";
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
const aparecer = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const SucursalesCajaTemplate = () => {
  const { stateSucursal, setStateSucursal, selectSucursal, setAccion } =
    useSucursalesStore();
  const { stateCaja } = useCajasStore();
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
      <Toaster richColors></Toaster>
      {stateSucursal && <RegistrarSucursal></RegistrarSucursal>}
      {stateCaja && <RegistrarCaja></RegistrarCaja>}
      <section className="area1">
        <Header>
          <Title>Cajas por Sucursal</Title>
          <Subtitle>Gestiona tus sucursales y cajas</Subtitle>
          <ButtonDashed
            funcion={() => {
              selectSucursal(null);
              setAccion("Nuevo");
              setStateSucursal(true);
            }}
            title="Agregar sucursal"
          ></ButtonDashed>
        </Header>
      </section>
      <section className="area2">
        <ListSucursales></ListSucursales>
      </section>
      <AnimatedGrid></AnimatedGrid>
    </Container>
  );
};

const Container = styled.div`
  height: 100vh;
  display: grid;
  position: relative;
  grid-template:
    "area1" 300px
    "area2" auto;
  overflow: auto;
  animation: ${aparecer} 0.3s ease both;

  .decorations {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    z-index: 0;
  }

  .area1 {
    grid-area: area1;
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
  }
  .area2 {
    grid-area: area2;
    position: relative;
    z-index: 2;
    padding-bottom: 20px;
  }
`;
const Header = styled.div`
  margin-bottom: 20px;
  text-align: center;
  justify-content: center;
  margin: auto;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const Title = styled.h3`
  font-size: 25px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
  margin: 0;
`;
const Subtitle = styled.p`
  font-size: 18px;
  color: #6b7280;
  margin: 5px 0 0;
`;
