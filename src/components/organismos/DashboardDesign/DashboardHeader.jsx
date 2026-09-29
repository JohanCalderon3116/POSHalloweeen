import styled, { keyframes, css } from "styled-components";
import { Device } from "../../../styles/breakpoints";
import { DateRangeFilter } from "./DateRangeFilter";
import { Icon } from "@iconify/react";
import { useUsuariosStore } from "../../../store/UsuariosStore";
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";

const flotarFantasma = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-3px); }
`;

const brilloTexto = keyframes`
  to { background-position: 200% center; }
`;

const entrar = keyframes`
  from {
    opacity: 0;
    filter: blur(6px);
    transform: translate(var(--dx), var(--dy)) rotate(var(--rot)) scale(0.6);
  }
  to {
    opacity: 1;
    filter: blur(0);
    transform: translate(0, 0) rotate(0deg) scale(1);
  }
`;

const salir = keyframes`
  from {
    opacity: 1;
    filter: blur(0);
    transform: translate(0, 0) rotate(0deg) scale(1);
  }
  to {
    opacity: 0;
    filter: blur(6px);
    transform: translate(var(--dx), var(--dy)) rotate(var(--rot)) scale(0.6);
  }
`;

const respirar = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.015); }
`;

const brilloCristal = keyframes`
  0% { transform: translateX(-120%) skewX(-20deg); opacity: 0; }
  12% { opacity: 0.55; }
  30% { opacity: 0; }
  100% { transform: translateX(220%) skewX(-20deg); opacity: 0; }
`;

const flotarEmbers = keyframes`
  0% { transform: translateY(0) scale(1); opacity: 0; }
  12% { opacity: 0.55; }
  85% { opacity: 0; }
  100% { transform: translateY(-120px) scale(0.4); opacity: 0; }
`;

const saludos = [
  "¡Bienvenido",
  "Welcome",
  "Bienvenue",
  "Benvenuto",
  "Bem-vindo",
  "Willkommen",
  "Welkom",
  "ようこそ",
  "환영합니다",
  "欢迎",
];

const LAYOUTS = [
  [
    [1, 1, 4, 3],
    [5, 1, 4, 2],
    [5, 3, 2, 1],
    [7, 3, 2, 1],
  ],
  [
    [1, 3, 2, 1],
    [3, 2, 2, 2],
    [5, 1, 2, 3],
    [7, 1, 2, 3],
  ],
  [
    [1, 1, 2, 3],
    [3, 1, 2, 3],
    [5, 1, 2, 2],
    [7, 1, 2, 1],
  ],
  [
    [3, 1, 4, 1],
    [2, 2, 6, 1],
    [1, 3, 4, 1],
    [5, 3, 4, 1],
  ],
  [
    [1, 1, 8, 1],
    [3, 2, 2, 2],
    [5, 2, 2, 1],
    [5, 3, 2, 1],
  ],
  [
    [1, 1, 3, 3],
    [4, 3, 3, 1],
    [7, 3, 2, 1],
    [4, 2, 2, 1],
  ],
  [
    [3, 1, 4, 1],
    [1, 2, 4, 1],
    [5, 2, 4, 1],
    [3, 3, 4, 1],
  ],
  [
    [1, 1, 2, 3],
    [3, 3, 2, 1],
    [5, 3, 2, 1],
    [7, 1, 2, 3],
  ],
  [
    [1, 1, 8, 1],
    [1, 2, 2, 1],
    [7, 2, 2, 1],
    [1, 3, 8, 1],
  ],
  [
    [1, 1, 2, 1],
    [3, 1, 2, 1],
    [2, 2, 2, 1],
    [4, 2, 2, 1],
    [3, 3, 2, 1],
    [5, 3, 2, 1],
  ],
];

const EMBERS = Array.from({ length: 7 }).map(() => ({
  left: 4 + Math.random() * 92,
  size: 3 + Math.random() * 4,
  duration: 6 + Math.random() * 5,
  delay: Math.random() * 6,
}));

const azar = (rango) => (Math.random() - 0.5) * rango;

const peso = (texto) =>
  [...texto].reduce(
    (total, c) => total + (c.charCodeAt(0) > 0x2e80 ? 1.8 : 1),
    0,
  );

const generarCiclo = (previo) => {
  let idx = Math.floor(Math.random() * LAYOUTS.length);
  if (idx === previo.idx) idx = (idx + 1) % LAYOUTS.length;
  const tiles = LAYOUTS[idx];
  const orden = tiles
    .map((_, i) => i)
    .sort((a, b) => tiles[b][2] * tiles[b][3] - tiles[a][2] * tiles[a][3]);
  const anim = tiles.map((t) => ({
    dx: azar(30),
    dy: -(55 + Math.random() * 25),
    rot: azar(20),
    delay: (t[1] - 1) * 90 + Math.random() * 90,
  }));
  return { idx, orden, anim, key: previo.key + 1 };
};

const getPalabras = (nombre) => {
  const p = nombre.trim().split(/\s+/).filter(Boolean);
  if (p.length <= 4) return p;
  return [...p.slice(0, 3), p.slice(3).join(" ")];
};

export const DashboardHeader = () => {
  const { datausuarios } = useUsuariosStore();
  const nombre = datausuarios?.nombres || "";
  const [texto, setTexto] = useState("");
  const [idioma, setIdioma] = useState(0);
  const [borrando, setBorrando] = useState(false);
  const [esLargo, setEsLargo] = useState(false);
  const [ciclo, setCiclo] = useState(() => generarCiclo({ idx: -1, key: 0 }));
  const contenedorRef = useRef(null);
  const medidorRef = useRef(null);
  const bentoRef = useRef(null);

  const fase = borrando ? "out" : "in";
  const palabras = useMemo(() => getPalabras(nombre), [nombre]);
  const tiles = LAYOUTS[ciclo.idx];
  const masLargo = useMemo(
    () => saludos.reduce((a, b) => (peso(b) > peso(a) ? b : a)),
    [],
  );
  const mensajes = useMemo(
    () => saludos.map((s) => (esLargo ? s : `${s} ${nombre}!`)),
    [esLargo, nombre],
  );

  useLayoutEffect(() => {
    const contenedor = contenedorRef.current;
    const medidor = medidorRef.current;
    if (!contenedor || !medidor) return;
    const medir = () =>
      setEsLargo(medidor.offsetWidth > contenedor.clientWidth);
    medir();
    const observer = new ResizeObserver(medir);
    observer.observe(contenedor);
    return () => observer.disconnect();
  }, [nombre]);

  useEffect(() => {
    if (!nombre) return;
    const mensajeActual = mensajes[idioma];
    let timeout;

    if (!borrando) {
      if (texto.length < mensajeActual.length) {
        timeout = setTimeout(() => {
          setTexto(mensajeActual.slice(0, texto.length + 1));
        }, 45);
      } else {
        timeout = setTimeout(() => setBorrando(true), 1700);
      }
    } else if (texto.length > 0) {
      timeout = setTimeout(() => {
        setTexto(mensajeActual.slice(0, texto.length - 1));
      }, 28);
    } else {
      timeout = setTimeout(() => {
        setBorrando(false);
        setIdioma((prev) => (prev + 1) % mensajes.length);
        setCiclo((prev) => generarCiclo(prev));
      }, 450);
    }
    return () => clearTimeout(timeout);
  }, [texto, idioma, borrando, nombre, mensajes]);

  const seguirCursor = (e) => {
    const el = bentoRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <Container>
      <TextContainer ref={contenedorRef}>
        <Embers aria-hidden="true">
          {EMBERS.map((e, i) => (
            <i
              key={i}
              style={{
                left: `${e.left}%`,
                width: `${e.size}px`,
                height: `${e.size}px`,
                animationDuration: `${e.duration}s`,
                animationDelay: `${e.delay}s`,
              }}
            />
          ))}
        </Embers>
        <Title $medidor ref={medidorRef} aria-hidden="true">
          <span>{`${masLargo} ${nombre}!`}</span>
          <Icon icon="solar:ghost-bold" className="ghost-icon" />
        </Title>
        <Title $largo={esLargo}>
          <span>{texto}</span>
          <Icon icon="solar:ghost-bold" className="ghost-icon" />
        </Title>
        {esLargo && (
          <Bento key={ciclo.key} ref={bentoRef} onMouseMove={seguirCursor}>
            {tiles.map(([c, r, w, h], i) => {
              const palabra = palabras[ciclo.orden.indexOf(i)];
              const a = ciclo.anim[i];
              return (
                <Tile
                  key={i}
                  $c={c}
                  $r={r}
                  $w={w}
                  $h={h}
                  $i={i}
                  $fase={fase}
                  $delay={a.delay}
                  $deco={!palabra}
                  $chars={palabra ? Math.max(palabra.length, 3) : 3}
                  style={{
                    "--dx": `${a.dx}px`,
                    "--dy": `${a.dy}px`,
                    "--rot": `${a.rot}deg`,
                  }}
                >
                  {palabra ? (
                    <span>{palabra}</span>
                  ) : (
                    i % 2 === 0 && <Icon icon="solar:ghost-smile-bold" />
                  )}
                </Tile>
              );
            })}
          </Bento>
        )}
      </TextContainer>
      <ActionsContainer>
        <DateRangeFilter />
      </ActionsContainer>
    </Container>
  );
};

const Container = styled.div`
  --acento: ${({ theme }) => theme.halloweenPrimary || "#ff7a18"};
  --borde: ${({ theme }) => theme.halloweenBorder || theme.colortitlecard};
  --sombra: ${({ theme }) => theme.bgAlpha || "rgba(0, 0, 0, 0.1)"};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  @media ${Device.desktop} {
    flex-direction: row;
  }
`;

const TextContainer = styled.div`
  position: relative;
  flex: 1;
  min-width: 0;
  max-width: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Embers = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
  i {
    position: absolute;
    bottom: -10px;
    border-radius: 50%;
    background: radial-gradient(circle, var(--acento), transparent 70%);
    filter: blur(0.5px);
    animation: ${flotarEmbers} linear infinite;
  }
  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`;

const Title = styled.h1`
  position: relative;
  z-index: 1;
  font-size: ${({ $largo }) => ($largo ? 30 : 44)}px;
  font-weight: 900;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
  min-height: 1.2em;
  color: ${({ theme }) => theme.text};
  white-space: nowrap;
  ${({ $medidor }) =>
    $medidor &&
    css`
      position: absolute;
      top: 0;
      left: 0;
      width: max-content;
      visibility: hidden;
      pointer-events: none;
    `}
  span {
    display: inline-block;
    min-width: 0;
    background: linear-gradient(
      90deg,
      ${({ theme }) => theme.text},
      var(--acento),
      ${({ theme }) => theme.text}
    );
    background-size: 200% auto;
    color: transparent;
    -webkit-text-fill-color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
    animation: ${brilloTexto} 3s linear infinite;
    @media (prefers-reduced-motion: reduce) {
      animation: none;
      color: ${({ theme }) => theme.text};
      -webkit-text-fill-color: ${({ theme }) => theme.text};
    }
  }
  .ghost-icon {
    flex-shrink: 0;
    font-size: ${({ $largo }) => ($largo ? 28 : 38)}px;
    color: var(--acento);
    filter: drop-shadow(0 0 8px rgba(255, 122, 24, 0.4));
    animation: ${flotarFantasma} 3s ease-in-out infinite;
  }
  @media (max-width: 768px) {
    font-size: ${({ $largo }) => ($largo ? 26 : 34)}px;
    .ghost-icon {
      font-size: ${({ $largo }) => ($largo ? 24 : 30)}px;
    }
  }
  @media (max-width: 480px) {
    font-size: ${({ $largo }) => ($largo ? 22 : 28)}px;
    .ghost-icon {
      font-size: ${({ $largo }) => ($largo ? 20 : 26)}px;
    }
  }
`;

const Bento = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(8, minmax(0, 1fr));
  grid-template-rows: repeat(3, minmax(0, 1fr));
  gap: 6px;
  height: 96px;
  width: 100%;
  min-width: 0;
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: 12px;
    background: radial-gradient(
      160px circle at var(--mx, 50%) var(--my, 50%),
      rgba(255, 255, 255, 0.16),
      transparent 60%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }
  &:hover::after {
    opacity: 1;
  }
  @media (max-width: 480px) {
    height: 84px;
  }
`;

const Tile = styled.div`
  --chars: ${({ $chars }) => $chars};
  grid-column: ${({ $c, $w }) => `${$c} / span ${$w}`};
  grid-row: ${({ $r, $h }) => `${$r} / span ${$h}`};
  container-type: size;
  position: relative;
  min-width: 0;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 6px;
  border-radius: 10px;
  overflow: hidden;
  border: 1px solid var(--borde);
  background: ${({ theme, $i, $deco }) => {
    const acento = theme.halloweenPrimary || "#ff7a18";
    if ($deco) return `${acento}1f`;
    if ($i === 0) return `linear-gradient(135deg, ${acento}, ${acento}99)`;
    if ($i % 2 === 0) return `${acento}33`;
    return "transparent";
  }};
  color: ${({ theme, $i, $deco }) =>
    $i === 0 && !$deco ? "#fff" : theme.text};
  box-shadow:
    0 4px 12px var(--sombra),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
  animation:
    ${({ $fase, $delay }) =>
      $fase === "out"
        ? css`
            ${salir} 0.45s ease-in ${$delay * 0.4}ms both
          `
        : css`
            ${entrar} 0.65s cubic-bezier(0.34, 1.56, 0.64, 1) ${$delay}ms both
          `},
    ${respirar} 4s ease-in-out ${({ $delay }) => $delay}ms infinite alternate;
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 1;
    background: linear-gradient(
      100deg,
      transparent 40%,
      rgba(255, 255, 255, 0.35) 50%,
      transparent 60%
    );
    animation: ${brilloCristal} 5s ease-in-out infinite;
    animation-delay: ${({ $i }) => $i * 0.6 + 1.5}s;
  }
  span {
    position: relative;
    z-index: 2;
    font-weight: 800;
    line-height: 1;
    white-space: nowrap;
    font-size: clamp(
      9px,
      min(calc((100cqw - 12px) / (var(--chars) * 0.6)), 62cqh),
      30px
    );
    animation: ${flotarFantasma} 3s ease-in-out infinite;
    animation-delay: ${({ $i }) => $i * 250}ms;
  }
  svg {
    position: relative;
    z-index: 2;
    font-size: 20px;
    color: var(--acento);
    opacity: 0.7;
    animation: ${flotarFantasma} 3s ease-in-out infinite;
  }
  @media (prefers-reduced-motion: reduce) {
    animation: none;
    &::before {
      animation: none;
      display: none;
    }
    span,
    svg {
      animation: none;
    }
  }
`;

const ActionsContainer = styled.div`
  flex-shrink: 0;
  border: 1px solid var(--borde);
  border-radius: 12px;
  background-color: ${({ theme }) => theme.body};
  backdrop-filter: blur(8px);
  box-shadow: 0 4px 15px var(--sombra);
`;
