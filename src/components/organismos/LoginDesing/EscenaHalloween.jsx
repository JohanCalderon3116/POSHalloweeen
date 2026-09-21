import styled, { css, keyframes } from "styled-components";

/* ---------- utilidades ---------- */
const semilla = (s) => () => (s = (s * 16807) % 2147483647) / 2147483647;

const campoEstrellas = (cantidad, seed) => {
  const azar = semilla(seed);
  return Array.from(
    { length: cantidad },
    () =>
      `${(azar() * 100).toFixed(1)}vw ${(azar() * 75).toFixed(1)}vh 0 0 rgba(255, 244, 225, ${(0.35 + azar() * 0.65).toFixed(2)})`,
  ).join(",");
};
const ESTRELLAS_A = campoEstrellas(45, 7);
const ESTRELLAS_B = campoEstrellas(35, 13);

// Telaraña: 5 radios + hilos concéntricos combados
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
  { y: "16vh", t: "28s", d: "2s", w: 54, rev: false },
  { y: "34vh", t: "36s", d: "11s", w: 40, rev: true },
  { y: "8vh", t: "44s", d: "20s", w: 34, rev: false },
];

const ARANAS = [
  { x: "8%", largo: "17vh", ancho: 52, t: "4.6s", d: "0.3s" },
  { x: "91%", largo: "27vh", ancho: 66, t: "5.4s", d: "0.7s" },
  { x: "23%", largo: "8vh", ancho: 34, t: "3.8s", d: "1.1s", extra: true },
  { x: "74%", largo: "13vh", ancho: 42, t: "4.2s", d: "0.9s", extra: true },
  { x: "97%", largo: "7vh", ancho: 30, t: "3.4s", d: "1.4s", extra: true },
];

/* ---------- SVGs ---------- */
export const Telarana = (props) => (
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

export const Sombrero = (props) => (
  <svg viewBox="0 0 40 40" aria-hidden="true" {...props}>
    <ellipse
      cx="20"
      cy="33"
      rx="18"
      ry="5"
      fill="#120a05"
      stroke="#c2570f"
      strokeWidth="1"
    />
    <path
      d="M11 31 Q18 22 21 7 Q23 3 26 9 Q27 21 29 31 Z"
      fill="#1c0f07"
      stroke="#c2570f"
      strokeWidth="1"
      strokeLinejoin="round"
    />
    <path d="M11.5 29 Q20 34 28.5 29 L29 32 Q20 37 11 32 Z" fill="#ff7a18" />
    <rect
      x="18"
      y="30"
      width="5"
      height="4.5"
      rx="1"
      fill="none"
      stroke="#ffe27a"
      strokeWidth="1"
    />
  </svg>
);

export const AranaSvg = () => (
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

export const MurcielagoSvg = (props) => (
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

export const CalabazaSvg = () => (
  <svg viewBox="0 0 120 100" width="100%" aria-hidden="true">
    <defs>
      <radialGradient id="cal-g" cx="50%" cy="40%" r="65%">
        <stop offset="0" stopColor="#ffa53a" />
        <stop offset="1" stopColor="#d4500a" />
      </radialGradient>
    </defs>
    <path d="M55 20 C55 11 60 6 68 3 C65 9 67 14 69 20 Z" fill="#3f7d20" />
    <g fill="url(#cal-g)" stroke="#a23a05" strokeWidth="1.5">
      <ellipse cx="32" cy="62" rx="26" ry="32" />
      <ellipse cx="88" cy="62" rx="26" ry="32" />
      <ellipse cx="60" cy="62" rx="28" ry="36" />
    </g>
    <g className="cara" fill="#ffe27a">
      <path d="M38 54 L52 54 L45 41 Z" />
      <path d="M68 54 L82 54 L75 41 Z" />
      <path d="M56 64 L64 64 L60 57 Z" />
      <path d="M36 68 L46 76 L52 70 L60 78 L68 70 L74 76 L84 68 L80 82 L70 90 L60 86 L50 90 L40 82 Z" />
    </g>
  </svg>
);

export const FantasmaSvg = () => (
  <svg viewBox="0 0 60 70" aria-hidden="true">
    <path
      d="M8 62 V28 C8 12 18 4 30 4 C42 4 52 12 52 28 V62 L45 55 L38 62 L30 55 L22 62 L15 55 Z"
      fill="rgba(255,255,255,0.88)"
    />
    <ellipse cx="23" cy="28" rx="3" ry="5" fill="#120a05" />
    <ellipse cx="37" cy="28" rx="3" ry="5" fill="#120a05" />
    <ellipse cx="30" cy="42" rx="4" ry="5" fill="#120a05" />
  </svg>
);

export const CementerioSvg = (props) => (
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

/* ---------- animaciones ---------- */
const parpadeo = keyframes`
  0%, 100% { opacity: 0.35; }
  50% { opacity: 1; }
`;
const flotar = keyframes`
  0%, 100% { transform: translateY(0) rotate(-2deg); }
  50% { transform: translateY(-14px) rotate(2deg); }
`;
const deriva = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-25%); }
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
const llama = keyframes`
  0%, 100% { opacity: 1; }
  30% { opacity: 0.8; }
  55% { opacity: 0.95; }
  75% { opacity: 0.68; }
`;
const brillo = keyframes`
  0%, 100% { filter: drop-shadow(0 0 6px rgba(255, 150, 30, 0.25)) brightness(0.6); }
  50% { filter: drop-shadow(0 0 12px rgba(255, 170, 40, 0.4)) brightness(0.7); }
`;

/* ---------- estilos ---------- */
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

const Fondo = styled.div`
  ${capa}
  z-index: 0;
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
      ellipse at center,
      transparent 30%,
      rgba(0, 0, 0, 0.75) 100%
    );
  }
`;

const Frente = styled.div`
  ${capa}
  z-index: 3;
`;

const Estrellas = styled.i`
  position: absolute;
  top: 0;
  left: 0;
  width: 2px;
  height: 2px;
  border-radius: 50%;
  opacity: 0.6;
  box-shadow: ${({ $sombras }) => $sombras};
  animation: ${parpadeo} 3.4s ease-in-out infinite
    ${({ $retraso }) => $retraso || "0s"};
`;

const Luna = styled.div`
  position: absolute;
  top: 5vh;
  right: 9vw;
  width: clamp(90px, 11vw, 170px);
  aspect-ratio: 1;
  border-radius: 50%;
  opacity: 0.55;
  background:
    radial-gradient(
      circle at 62% 28%,
      rgba(60, 30, 0, 0.3) 0 9%,
      transparent 10%
    ),
    radial-gradient(
      circle at 34% 58%,
      rgba(60, 30, 0, 0.28) 0 12%,
      transparent 13%
    ),
    radial-gradient(
      circle at 70% 70%,
      rgba(60, 30, 0, 0.25) 0 7%,
      transparent 8%
    ),
    radial-gradient(circle at 35% 30%, #c9b27a, #a06a20 55%, #6b3a0a);
  box-shadow:
    0 0 20px 4px rgba(255, 150, 50, 0.12),
    0 0 60px 20px rgba(255, 110, 30, 0.05);
  animation: ${flotar} 9s ease-in-out infinite;
`;

const Rincon = styled.div`
  position: absolute;
  top: 0;
  width: clamp(140px, 22vw, 300px);
  color: rgba(255, 190, 130, 0.12);
  svg {
    display: block;
    width: 100%;
  }
  &.izq {
    left: 0;
  }
  &.der {
    right: 0;
    transform: scaleX(-1);
  }
`;

const Niebla = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 200%;
  opacity: 0.4;
  background:
    radial-gradient(
      ellipse at 20% 100%,
      rgba(255, 110, 30, 0.1),
      transparent 60%
    ),
    radial-gradient(
      ellipse at 70% 100%,
      rgba(255, 140, 60, 0.05),
      transparent 55%
    ),
    radial-gradient(
      ellipse at 45% 100%,
      rgba(200, 200, 200, 0.04),
      transparent 60%
    );
  filter: blur(14px);
  will-change: transform;
  animation: ${deriva} 40s linear infinite alternate;
`;

const Cementerio = styled(CementerioSvg)`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 24vh;
  display: block;
  filter: drop-shadow(0 -2px 8px rgba(255, 110, 30, 0.08));
`;

const Farol = styled.div`
  position: absolute;
  bottom: 1.5vh;
  width: clamp(80px, 10vw, 150px);
  animation: ${brillo} 3s ease-in-out infinite;
  .cara {
    animation: ${llama} 2.6s linear infinite;
  }
  &.izq {
    left: 3vw;
  }
  &.der {
    right: 3vw;
    transform: scaleX(-1);
  }
  @media (max-width: 640px) {
    &.der {
      display: none;
    }
  }
`;

const Fantasma = styled.div`
  position: absolute;
  width: clamp(46px, 5vw, 76px);
  opacity: 0.12;
  animation: ${flotar} 7s ease-in-out infinite;
  svg {
    display: block;
    width: 100%;
    filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.25));
  }
  @media (max-width: 640px) {
    display: none;
  }
`;

const Murcielago = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  will-change: transform;
  animation: ${volar} 30s linear infinite;
`;

const Aleteo = styled.div`
  animation: ${aletear} 0.32s ease-in-out infinite;
  filter: drop-shadow(0 0 2px rgba(255, 122, 24, 0.25));
`;

const Colgante = styled.div`
  position: absolute;
  top: 0;
  width: 0;
  display: flex;
  justify-content: center;
  animation: ${caer} 1.8s cubic-bezier(0.34, 1.4, 0.64, 1) backwards;
  @media (max-width: 640px) {
    &.extra {
      display: none;
    }
  }
`;

const Pendulo = styled.div`
  transform-origin: top center;
  animation: ${columpio} 4s ease-in-out infinite alternate;
`;

const Hilo = styled.div`
  width: 1px;
  margin: 0 auto;
  background: linear-gradient(#8a7f70, rgba(138, 127, 112, 0.55));
`;

const Cuerpo = styled.div`
  filter: drop-shadow(0 0 3px rgba(255, 122, 24, 0.2));
`;

/* ---------- escena ---------- */
export const EscenaHalloween = () => (
  <>
    <Fondo aria-hidden="true">
      <Estrellas $sombras={ESTRELLAS_A} />
      <Estrellas $sombras={ESTRELLAS_B} $retraso="1.7s" />
      <Luna />
      <Rincon className="izq">
        <Telarana />
      </Rincon>
      <Rincon className="der">
        <Telarana />
      </Rincon>
      <Niebla style={{ height: "30vh", animationDuration: "46s" }} />
      <Cementerio />
      <Farol className="izq">
        <CalabazaSvg />
      </Farol>
      <Farol className="der">
        <CalabazaSvg />
      </Farol>
      <Fantasma style={{ left: "5%", top: "34vh" }}>
        <FantasmaSvg />
      </Fantasma>
      <Fantasma style={{ right: "6%", top: "48vh", animationDelay: "-3s" }}>
        <FantasmaSvg />
      </Fantasma>
      <Niebla
        style={{ height: "16vh", animationDuration: "30s", opacity: 0.8 }}
      />
    </Fondo>

    <Frente aria-hidden="true">
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
            style={{ animationDuration: a.t, animationDelay: `-${i * 0.9}s` }}
          >
            <Hilo style={{ height: a.largo }} />
            <Cuerpo style={{ width: a.ancho }}>
              <AranaSvg />
            </Cuerpo>
          </Pendulo>
        </Colgante>
      ))}
    </Frente>
  </>
);