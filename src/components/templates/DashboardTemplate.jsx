import styled, { css, keyframes } from "styled-components";
import { Device } from "../../styles/breakpoints";
import { DashboardHeader } from "../organismos/DashboardDesign/DashboardHeader";
import { ChartVentas } from "../organismos/DashboardDesign/ChartVentas";
import { ChartProductosTop5 } from "../organismos/DashboardDesign/ChartProductosTop5";
import { CardMovimientosCajaLive } from "../organismos/DashboardDesign/CardMovimientosCajaLive";
import { CardMovimientosProductosTopMonto } from "../organismos/DashboardDesign/CardMovimientosProductosTopMonto";
import { Ganacias } from "../..";
import { CantidadVentas } from "../organismos/DashboardDesign/CantidadVentas";
import { SumarVentas } from "../organismos/DashboardDesign/SumarVentas";
const semilla = (s) => () => (s = (s * 16807) % 2147483647) / 2147483647;
const campoEstrellas = (cantidad, seed) => {
  const azar = semilla(seed);
  return Array.from(
    { length: cantidad },
    () =>
      `${(azar() * 100).toFixed(1)}vw ${(azar() * 75).toFixed(1)}vh 0 0 rgba(255, 244, 225,${(0.35 + azar() * 0.65).toFixed(2)})`,
  ).join(",");
};
const ESTRELLAS_A = campoEstrellas(45, 7);
const ESTRELLAS_B = campoEstrellas(35, 13);
const ANG = [0, 18, 36, 54, 72, 90].map((a) => (a * Math.PI) / 180);
const pt = (r, a) =>
  `${(r * Math.cos(a)).toFixed(1)}${(r * Math.sin(a)).toFixed(1)}`;
const RAYOS = ANG.map((a) => `M0 0 L${pt(200, a)}`).join(" ");
const ANILLOS = [38, 76, 114, 152, 190]
  .flatMap((r) =>
    ANG.slice(0, -1).map(
      (a, i) =>
        `M${pt(r, a)} Q${pt(r * 0.9, (a + ANG[i + 1]) / 2)}${pt(r, ANG[i + 1])}`,
    ),
  )
  .join(" ");
const MURCIELAGOS = [
  { y: "16vh", t: "28s", d: "2s", w: 54, rev: false },
  { y: "34vh", t: "36s", d: "11s", w: 40, rev: true },
  { y: "8vh", t: "44s", d: "20s", w: 34, rev: false },
];
const ARANAS = [
  { x: "8%", largo: "17vh", ancho: 52, t: "4.6s", d: "0.3s" },
  { x: "91%", largo: "27vh", ancho: 66, t: "5.4s", d: "0.7s" },
  { x: "23%", largo: "8vh", ancho: 34, t: "3.8s", d: "1.1s" },
  { x: "74%", largo: "13vh", ancho: 42, t: "4.2s", d: "0.9s" },
  { x: "97%", largo: "7vh", ancho: 30, t: "3.4s", d: "1.4s" },
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
    <line x1="30" y1="0" x2="30" y2="17" stroke="#8a7f70" strokeWidth="0.8" />
    <g
      stroke="#c2570f"
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
      fill="#120a05"
      stroke="#c2570f"
      strokeWidth="1.2"
    />
    <circle
      cx="30"
      cy="24"
      r="6.5"
      fill="#120a05"
      stroke="#c2570f"
      strokeWidth="1.2"
    />
    <path d="M30 32 L34 38 L30 44 L26 38 Z" fill="#ff7a18" />
    <circle cx="27.5" cy="22.5" r="1.5" fill="#ff3b3b" />
    <circle cx="32.5" cy="22.5" r="1.5" fill="#ff3b3b" />
  </svg>
);
const MurcielagoSvg = (props) => (
  <svg viewBox="0 0 64 32" width="100%" aria-hidden="true" {...props}>
    <path
      d="M32 10 C30 6 28 4 26 3 C26 7 25 9 23 10 C18 6 10 5 2 8 C6 10 7 13 6 17 C10 14 14 14 17 17 C19 14 22 14 24 16 C26 18 29 19 32 24 C35 19 38 18 40 16 C42 14 45 14 47 17 C50 14 54 14 58 17 C57 13 58 10 62 8 C54 5 46 6 41 10 C39 9 38 7 38 3 C36 4 34 6 32 10 Z"
      fill="#0c0604"
      stroke="#c2570f"
      strokeWidth="0.8"
      strokeLinejoin="round"
    />
    <circle cx="29.5" cy="13" r="0.9" fill="#ff3b3b" />
    <circle cx="34.5" cy="13" r="0.9" fill="#ff3b3b" />
  </svg>
);
const CementerioSvg = (props) => (
  <svg
    viewBox="0 0 1440 200"
    preserveAspectRatio="xMidYMax slice"
    aria-hidden="true"
    {...props}
  >
    <g fill="#08040f" stroke="#08040f">
      <path
        d="M0 200 V152 C120 136 240 158 360 150 C520 140 640 160 800 152 C960 144 1100 158 1240 148 C1330 142 1400 152 1440 148 V200 Z"
        stroke="none"
      />
      <path d="M110 154 V112 Q110 96 128 96 Q146 96 146 112 V154 Z" />
      <path d="M232 156 V122 Q232 110 244 110 Q256 110 256 122 V156 Z" />
      <path d="M420 152 V106 Q420 88 440 88 Q460 88 460 106 V152 Z" />
      <path d="M700 158 V126 Q700 114 712 114 Q724 114 724 126 V158 Z" />
      <path d="M980 154 V110 Q980 94 998 94 Q1016 94 1016 110 V154 Z" />
      <path
        d="M330 152 V104 M314 118 H346"
        strokeWidth="7"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M880 156 V116 M866 128 H894"
        strokeWidth="6"
        strokeLinecap="round"
        fill="none"
      />
      <g fill="none" strokeLinecap="round">
        <path d="M1290 152 C1292 122 1286 98 1298 60" strokeWidth="9" />
        <path d="M1294 100 C1312 88 1328 84 1344 68" strokeWidth="5" />
        <path d="M1292 86 C1276 76 1262 74 1250 58" strokeWidth="5" />
        <path d="M1298 60 C1306 48 1318 42 1326 28" strokeWidth="4" />
        <path d="M1298 62 C1290 46 1282 40 1276 24" strokeWidth="4" />
        <path d="M1344 68 C1352 66 1358 60 1364 52" strokeWidth="3" />
        <path d="M1250 58 C1242 56 1236 50 1232 42" strokeWidth="3" />
      </g>
    </g>
  </svg>
);
export const DashboardTemplate = () => {
  return (
    <Container>
      <FondoHalloween>
        <div className="estrellas-a" />
        <div className="estrellas-b" />
        <Telarana className="web web-esq-izq" />
        <Telarana className="web web-esq-der" />
        {MURCIELAGOS.map((m, i) => (
          <MurcielagoWrapper
            key={i}
            className="bat"
            $y={m.y}
            $time={m.t}
            $delay={m.d}
            $w={m.w}
            $rev={m.rev}
          >
            <MurcielagoSvg />
          </MurcielagoWrapper>
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
        <CementerioHalloween />
      </FondoHalloween>
      <DashboardHeader />
      <MainContent>
        <Area1>
          <ContentTotales $accent="#ff7a18">
            <CantidadVentas />
          </ContentTotales>
          <ContentTotales $accent="#ff3b3b">
            <SumarVentas />
          </ContentTotales>
          <ContentTotales $accent="#c2570f">
            <Ganacias />
          </ContentTotales>
        </Area1>
        <Area2>
          <ChartVentas />
        </Area2>
        <Area3>
          <ChartProductosTop5 />
        </Area3>
        <Area4>
          <CardMovimientosCajaLive />
          <CardMovimientosProductosTopMonto />
        </Area4>
      </MainContent>
    </Container>
  );
};
const parpadeo = keyframes`
  0%, 100% { opacity: 0.35; }
  50% { opacity: 1; }
`;
const columpio = keyframes`
  from { transform: rotate(-7deg); }
  to { transform: rotate(7deg); }
`;
const caer = keyframes`
  from { transform: translateY(-70vh); }
  to { transform: translateY(0); }
`;
const volar = keyframes`
  0% { transform: translate(-15vw, var(--y)) rotate(-4deg); }
  10% { transform: translate(20vw, calc(var(--y) - 6vh)) rotate(4deg); }
  20% { transform: translate(50vw, calc(var(--y) + 4vh)) rotate(-3deg); }
  30% { transform: translate(80vw, calc(var(--y) - 5vh)) rotate(3deg); }
  40%, 100% { transform: translate(118vw, var(--y)) rotate(-2deg); }
`;
const aletear = keyframes`
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(0.5); }
`;
const capa = css`
  position: fixed;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  @media print {
    display: none;
  }
  @media (prefers-reduced-motion: reduce) {
    &,
    & * {
      animation: none !important;
    }
    .bat {
      display: none;
    }
  }
`;
const FondoHalloween = styled.div`
  ${capa}
  z-index: 0;
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background:
      radial-gradient(
        circle at 85% 15%,
        ${({ theme }) => theme.halloweenSoft || "rgba(255, 122, 24, 0.08)"},
        transparent 30%
      ),
      radial-gradient(
        circle at 10% 85%,
        ${({ theme }) => theme.halloweenSoft2 || "rgba(194, 87, 15, 0.08)"},
        transparent 30%
      );
  }
  .estrellas-a,
  .estrellas-b {
    position: absolute;
    top: 0;
    left: 0;
    width: 2px;
    height: 2px;
    border-radius: 50%;
  }
  .estrellas-a {
    box-shadow: ${ESTRELLAS_A};
    animation: ${parpadeo} 4s ease-in-out infinite;
  }
  .estrellas-b {
    box-shadow: ${ESTRELLAS_B};
    animation: ${parpadeo} 6s ease-in-out infinite 2s;
  }
  .web {
    position: absolute;
    width: min(220px, 30vw);
    height: auto;
    color: rgba(255, 122, 24, 0.28);
    filter: drop-shadow(0 0 6px rgba(255, 122, 24, 0.15));
    z-index: 1;
  }
  .web-esq-izq {
    top: -10px;
    left: -10px;
    transform: scaleX(-1);
  }
  .web-esq-der {
    top: -10px;
    right: -10px;
  }
`;
const MurcielagoWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: ${(props) => props.$w}px;
  --y: ${(props) => props.$y};
  animation: ${volar} ${(props) => props.$time} linear infinite;
  animation-delay: ${(props) => props.$delay};
  opacity: 0.7;
  z-index: 1;
  transform-origin: center;
  ${(props) =>
    props.$rev &&
    css`
      transform: scaleX(-1);
    `}
  svg {
    animation: ${aletear} 0.28s ease-in-out infinite alternate;
  }
`;
const AranasContenedor = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
`;
const AranaHilo = styled.div`
  position: absolute;
  top: 0;
  left: ${(props) => props.$x};
  width: ${(props) => props.$ancho}px;
  height: ${(props) => props.$largo};
  transform-origin: top center;
  animation:
    ${caer} 1.2s cubic-bezier(0.22, 1, 0.36, 1) ${(props) => props.$d} both,
    ${columpio} ${(props) => props.$t} ease-in-out infinite alternate;
  svg {
    display: block;
  }
`;
const CementerioHalloween = styled(CementerioSvg)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: auto;
  min-height: 80px;
  max-height: 160px;
  opacity: 0.65;
  z-index: 1;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 1400px;
  margin: auto;
  gap: 22px;
  padding: 24px;
  position: relative;
  &::before {
    content: "";
    position: absolute;
    top: -80px;
    left: 50%;
    transform: translateX(-50%);
    width: 700px;
    height: 320px;
    background: radial-gradient(
      ellipse at center,
      rgba(255, 122, 24, 0.16) 0%,
      rgba(194, 87, 15, 0.08) 45%,
      transparent 75%
    );
    pointer-events: none;
    z-index: 0;
  }
  > * {
    position: relative;
    z-index: 1;
  }
`;
const MainContent = styled.div`
  display: grid;
  grid-template-areas:
    "area1"
    "area2"
    "area3"
    "area4";
  grid-template-columns: 1fr;
  gap: 18px;
  @media ${Device.desktop} {
    grid-template-areas:
      "area1 area1 area3"
      "area2 area2 area3"
      "area4 area4 area4";
    grid-template-columns: 2fr 1fr 1fr;
    gap: 22px;
  }
`;
const Area1 = styled.section`
  grid-area: area1;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
  @media ${Device.desktop} {
    grid-template-columns: repeat(3, 1fr);
  }
`;
const Area2 = styled.section`
  grid-area: area2;
  border: 1px solid
    ${({ theme }) => theme.halloweenBorder || theme.colortitlecard};
  box-shadow: 0 12px 30px -12px rgba(255, 122, 24, 0.18);
  border-radius: 22px;
  background-color: ${({ theme }) => theme.body};
  backdrop-filter: blur(8px);
  position: relative;
  overflow: hidden;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #ff7a18, #c2570f, #ff3b3b);
  }
`;
const Area3 = styled.section`
  grid-area: area3;
  background-color: ${({ theme }) => theme.body};
  border: 1px solid
    ${({ theme }) => theme.halloweenBorder || theme.colortitlecard};
  box-shadow: 0 12px 30px -12px rgba(255, 122, 24, 0.18);
  border-radius: 22px;
  backdrop-filter: blur(8px);
  position: relative;
  overflow: hidden;
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #ff3b3b, #c2570f, #ff7a18);
  }
`;
const Area4 = styled.section`
  grid-area: area4;
  display: flex;
  gap: 18px;
  flex-wrap: wrap;
  @media ${Device.desktop} {
    flex-wrap: nowrap;
  }
`;
const ContentTotales = styled.div`
  background-color: ${({ theme }) => theme.body};
  padding: 16px;
  border-radius: 18px;
  text-align: center;
  border: 1px solid
    ${({ theme }) => theme.halloweenBorder || theme.colortitlecard};
  box-shadow: 0 10px 24px -14px rgba(255, 122, 24, 0.2);
  backdrop-filter: blur(8px);
  position: relative;
  overflow: hidden;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 4px;
    background: ${(props) => props.$accent || "#ff7a18"};
  }
  &:hover {
    transform: translateY(-3px);
    border-color: ${({ theme }) => theme.halloweenPrimary || "#ff7a18"};
    box-shadow: 0 16px 30px -14px rgba(255, 122, 24, 0.28);
  }
`;
