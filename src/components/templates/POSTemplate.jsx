import styled, { css, keyframes } from "styled-components";
import { Device } from "../../styles/breakpoints";
import {
  AreaDetalleventaPos,
  AreaTecladoPos,
  FooterPos,
  HeaderPos,
  MenuFlotante,
  PantallaCierreCaja,
  PantallaCobro,
  PantallaIngresoSalidaDinero,
  SelectAlmacen,
  useBuscarProductosCodigoQueryStack,
  useCierreCajaStore,
  useMostrarSerealizacionesVentasQueryStack,
  useMovimientosCreditosStore,
  useStockStore,
  useVentasStore,
} from "../../index";
import { Toaster } from "sonner";
import { useMostrarAlmacenesXSucursalQueryStack } from "../../tanstack/AlmacenesStack";
import { useMostrarStockAlmacenesyProductoQueryStack } from "../../tanstack/StockStack";
import { useMostrarImpresorasXCajaQueryStack } from "../../tanstack/ImpresorasStack";
import { PantallaAbonoCredito } from "../organismos/POSDesing/CajaDesing/PantallaAbonoCredito";
import { PantallaMuestraValoresVenta } from "../organismos/POSDesing/PantallaMuestraValoresVenta";

const ANG = [0, 18, 36, 54, 72, 90].map((a) => (a * Math.PI) / 180);

const pt = (r, a) =>
  `${(r * Math.cos(a)).toFixed(1)} ${(r * Math.sin(a)).toFixed(1)}`;

const RAYOS = ANG.map((a) => `M0 0 L${pt(200, a)}`).join(" ");

const ANILLOS = [38, 76, 114, 152, 190]
  .flatMap((r) =>
    ANG.slice(0, -1).map(
      (a, i) =>
        `M${pt(r, a)} Q${pt(r * 0.9, (a + ANG[i + 1]) / 2)} ${pt(r, ANG[i + 1])}`,
    ),
  )
  .join(" ");

const MURCIELAGOS = [
  { y: "12vh", t: "28s", d: "0s", w: 52, rev: false },
  { y: "32vh", t: "36s", d: "8s", w: 42, rev: true },
  { y: "8vh", t: "44s", d: "18s", w: 34, rev: false },
];

const ARANAS = [
  { x: "5%", largo: "18vh", ancho: 48, t: "4.6s", d: "0.3s" },
  { x: "94%", largo: "26vh", ancho: 58, t: "5.4s", d: "0.7s" },
  { x: "18%", largo: "10vh", ancho: 34, t: "3.8s", d: "1.1s" },
  { x: "82%", largo: "14vh", ancho: 40, t: "4.2s", d: "0.9s" },
];

const Telarana = (props) => (
  <svg
    viewBox="0 0 200 200"
    fill="none"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    aria-hidden="true"
    {...props}
  >
    <path d={RAYOS} />
    <path d={ANILLOS} strokeWidth="0.8" />
  </svg>
);

const AranaSvg = () => (
  <svg viewBox="0 0 60 60" width="100%" aria-hidden="true">
    <line
      x1="30"
      y1="0"
      x2="30"
      y2="17"
      stroke="currentColor"
      strokeWidth="0.8"
    />
    <g
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    >
      <path d="M36 24 L49 11 L56 19" />
      <path d="M37 28 L53 21 L58 31" />
      <path d="M37 32 L53 35 L57 47" />
      <path d="M35 36 L47 45 L49 55" />
      <path d="M24 24 L11 11 L4 19" />
      <path d="M23 28 L7 21 L2 31" />
      <path d="M23 32 L7 35 L3 47" />
      <path d="M25 36 L13 45 L11 55" />
    </g>
    <ellipse
      cx="30"
      cy="38"
      rx="10"
      ry="12"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.2"
    />
    <circle
      cx="30"
      cy="24"
      r="6.5"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.2"
    />
    <path d="M30 32 L34 38 L30 44 L26 38 Z" fill="#ff7a18" />
    <circle cx="27.5" cy="22.5" r="1.5" fill="#ff3b3b" />
    <circle cx="32.5" cy="22.5" r="1.5" fill="#ff3b3b" />
  </svg>
);

const MurcielagoSvg = (props) => (
  <svg
    viewBox="0 0 64 32"
    width="100%"
    height="100%"
    aria-hidden="true"
    {...props}
  >
    <path
      d="M32 10 C30 6 28 4 26 3 C26 7 25 9 23 10 C18 6 10 5 2 8 C6 10 7 13 6 17 C10 14 14 14 17 17 C19 14 22 14 24 16 C26 18 29 19 32 24 C35 19 38 18 40 16 C42 14 45 14 47 17 C50 14 54 14 58 17 C57 13 58 10 62 8 C54 5 46 6 41 10 C39 9 38 7 38 3 C36 4 34 6 32 10 Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="0.8"
      strokeLinejoin="round"
    />
    <circle cx="29.5" cy="13" r="0.9" fill="#ff3b3b" />
    <circle cx="34.5" cy="13" r="0.9" fill="#ff3b3b" />
  </svg>
);

export const POSTemplate = () => {
  const { statePantallaCobro } = useVentasStore();
  const { stateIngresoSalida, stateCierreCaja } = useCierreCajaStore();
  const { stateIngresoCredito } = useMovimientosCreditosStore();
  const { stateModal } = useStockStore();

  useBuscarProductosCodigoQueryStack();
  useMostrarAlmacenesXSucursalQueryStack();
  useMostrarStockAlmacenesyProductoQueryStack();
  useMostrarSerealizacionesVentasQueryStack();
  useMostrarImpresorasXCajaQueryStack();

  return (
    <>
      <FondoHalloweenPOS>
        <Telarana className="web izquierda" />
        <Telarana className="web derecha" />

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
                style={{
                  transform: b.rev ? "scaleX(-1)" : "none",
                }}
              />
            </Aleteo>
          </Murcielago>
        ))}

        <AranasContenedor>
          {ARANAS.map((a, i) => (
            <AranaHilo
              key={i}
              $x={a.x}
              $largo={a.largo}
              $ancho={a.ancho}
              $t={a.t}
              $d={a.d}
            >
              <AranaSvg />
            </AranaHilo>
          ))}
        </AranasContenedor>
      </FondoHalloweenPOS>

      <Container>
        {statePantallaCobro && <PantallaCobro />}
        <PantallaMuestraValoresVenta />
        <HeaderPos />
        <Main>
          <Toaster richColors />
          <AreaDetalleventaPos />
          <AreaTecladoPos />
          {stateModal && <SelectAlmacen />}
        </Main>
        <FooterPos />
        <MenuFlotante />
        {stateIngresoSalida && <PantallaIngresoSalidaDinero />}
        {stateIngresoCredito && <PantallaAbonoCredito />}
        {stateCierreCaja && <PantallaCierreCaja />}
      </Container>
    </>
  );
};

const caer = keyframes`
  from {
    transform: translateY(-70vh);
  }
  to {
    transform: translateY(0);
  }
`;

const columpio = keyframes`
  from {
    transform: rotate(-7deg);
  }
  to {
    transform: rotate(7deg);
  }
`;

const brilloTelarana = keyframes`
  0%, 100% {
    opacity: 0.18;
  }
  50% {
    opacity: 0.35;
  }
`;

const volar = keyframes`
  0% {
    transform: translate(-15vw, var(--y)) rotate(-4deg);
  }
  10% {
    transform: translate(20vw, calc(var(--y) - 6vh)) rotate(4deg);
  }
  20% {
    transform: translate(50vw, calc(var(--y) + 4vh)) rotate(-3deg);
  }
  30% {
    transform: translate(80vw, calc(var(--y) - 5vh)) rotate(3deg);
  }
  40%, 100% {
    transform: translate(118vw, var(--y)) rotate(-2deg);
  }
`;

const aletear = keyframes`
  0%, 100% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(0.5);
  }
`;

const FondoHalloweenPOS = styled.div`
  position: fixed;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background:
      radial-gradient(
        circle at 85% 10%,
        ${({ theme }) => theme.halloweenSoft || "rgba(255, 122, 24, 0.06)"},
        transparent 28%
      ),
      radial-gradient(
        circle at 10% 90%,
        ${({ theme }) => theme.halloweenSoft2 || "rgba(194, 87, 15, 0.05)"},
        transparent 30%
      );
  }

  .web {
    position: absolute;
    width: min(210px, 22vw);
    height: auto;
    color: ${({ theme }) =>
      theme.halloweenPrimary || "rgba(255, 122, 24, 0.35)"};
    filter: drop-shadow(
      0 0 6px
        ${({ theme }) => theme.halloweenGlow || "rgba(255, 122, 24, 0.15)"}
    );
    animation: ${brilloTelarana} 7s ease-in-out infinite;
    transform-origin: center;
    z-index: 1;
  }

  .izquierda {
    top: 0;
    left: 0;
    transform: scaleX(-1);
  }

  .derecha {
    top: 0;
    right: 0;
  }
`;

const Murcielago = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  --y: ${({ style }) => style?.["--y"]};
  animation: ${volar} 30s linear infinite;
  opacity: 0.7;
  z-index: 1;
  transform-origin: center;
  will-change: transform;

  .bat & {
    pointer-events: none;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    display: none;
  }
`;

const Aleteo = styled.div`
  animation: ${aletear} 0.32s ease-in-out infinite;
  filter: drop-shadow(0 0 2px rgba(255, 122, 24, 0.2));
  will-change: transform;
`;

const AranasContenedor = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
`;

const AranaHilo = styled.div`
  position: absolute;
  top: 0;
  left: ${({ $x }) => $x};
  width: ${({ $ancho }) => $ancho}px;
  height: ${({ $largo }) => $largo};
  color: ${({ theme }) => theme.halloweenPrimary || "#c2570f"};
  transform-origin: top center;
  animation:
    ${caer} 1.2s cubic-bezier(0.22, 1, 0.36, 1) ${({ $d }) => $d} both,
    ${columpio} ${({ $t }) => $t} ease-in-out infinite alternate;
  will-change: transform;

  svg {
    display: block;
  }

  @media (max-width: 768px) {
    &:nth-child(n + 3) {
      display: none;
    }
  }
`;

const Container = styled.div`
  height: calc(100vh - 60px);
  padding: 10px;
  padding-top: 50px;
  display: grid;
  gap: 10px;
  grid-template:
    "header" 220px
    "main" auto;
  position: relative;
  z-index: 1;

  @media ${Device.desktop} {
    grid-template:
      "header header" 140px
      "main main"
      "footer footer" 60px;
  }
`;

const Main = styled.div`
  grid-area: main;
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  overflow: hidden;
  gap: 10px;

  @media ${Device.desktop} {
    flex-direction: row;
  }
`;
