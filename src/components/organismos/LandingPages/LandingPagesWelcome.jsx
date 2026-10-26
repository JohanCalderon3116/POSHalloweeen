import styled, { css, keyframes } from "styled-components";
import { useMemo, useState } from "react";
import { Icon } from "@iconify/react";

/* =========================================================
   UTILIDADES & DIBUJO VECTORIAL (ESTRELLAS, TELARAÑA, ARAÑAS, ETC.)
========================================================= */
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

// Telaraña: 5 radios + hilos concéntricos
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

/* ---------- COMPONENTES SVG ---------- */
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

/* =========================================================
   COMPONENTE PRINCIPAL
========================================================= */
export const LandingPagesWelcome = () => {
  const [categoria, setCategoria] = useState("Todas");
  const [limite, setLimite] = useState(6);

  const mejoras = [
    // POS Y CAJA
    {
      categoria: "POS y caja",
      icon: "solar:wallet-money-bold",
      titulo: "Movimientos de caja por fecha y empresa",
      descripcion:
        "Nuevo apartado para consultar las entradas y salidas de caja filtradas por fecha y empresa.",
    },
    {
      categoria: "POS y caja",
      icon: "solar:document-text-bold",
      titulo: "Entradas y salidas en PDF",
      descripcion:
        "Se corrigió la generación y visualización de los documentos PDF correspondientes a los movimientos.",
    },
    {
      categoria: "POS y caja",
      icon: "solar:calculator-minimalistic-bold",
      titulo: "Total y vuelto al finalizar la venta",
      descripcion:
        "Ahora el sistema muestra claramente el total de la venta, el dinero recibido y el vuelto que se debe entregar.",
    },
    {
      categoria: "POS y caja",
      icon: "solar:card-bold",
      titulo: "Cobro con precio ingresado",
      descripcion:
        "El proceso de cobro cuenta con un campo específico para ingresar el valor recibido por el cliente.",
    },
    {
      categoria: "POS y caja",
      icon: "solar:lock-keyhole-minimalistic-unlocked-bold",
      titulo: "Cierre de caja detallado",
      descripcion:
        "El cierre de caja ahora permite identificar los nombres de las entradas y salidas registradas.",
    },
    {
      categoria: "POS y caja",
      icon: "solar:printer-minimalistic-bold",
      titulo: "Abrir cajón sin imprimir",
      descripcion:
        "Ahora es posible abrir el cajón de dinero sin necesidad de generar una impresión.",
    },
    {
      categoria: "POS y caja",
      icon: "solar:bill-list-bold",
      titulo: "Flujo de venta renovado",
      descripcion:
        "Después de confirmar la venta se abre la caja sin necesidad de imprimir inmediatamente.",
    },
    // CRÉDITOS
    {
      categoria: "Créditos",
      icon: "solar:card-2-bold",
      titulo: "Movimientos de crédito",
      descripcion:
        "Nuevo apartado para visualizar y consultar los movimientos realizados sobre los créditos.",
    },
    {
      categoria: "Créditos",
      icon: "solar:document-text-bold",
      titulo: "Historial de crédito por cliente",
      descripcion:
        "Consulta el historial de crédito de cada cliente y sus facturas asociadas.",
    },
    {
      categoria: "Créditos",
      icon: "solar:bill-check-bold",
      titulo: "Factura individual del crédito",
      descripcion:
        "Cada factura asociada puede abrirse para consultar el comprobante completo.",
    },
    {
      categoria: "Créditos",
      icon: "solar:hand-money-bold",
      titulo: "Abonos registrados como entradas",
      descripcion:
        "Los abonos realizados se reflejan correctamente como entradas de dinero.",
    },
    // DASHBOARD
    {
      categoria: "Dashboard",
      icon: "solar:buildings-2-bold",
      titulo: "Dashboard por sucursal",
      descripcion:
        "La información del dashboard puede consultarse según la sucursal correspondiente.",
    },
    {
      categoria: "Dashboard",
      icon: "solar:chart-2-bold",
      titulo: "Entradas y salidas integradas",
      descripcion:
        "Las operaciones de caja ahora forman parte del análisis general del dashboard.",
    },
    {
      categoria: "Dashboard",
      icon: "solar:wallet-money-bold",
      titulo: "Ganancias protegidas por permisos",
      descripcion:
        "Información sensible disponible únicamente para usuarios autorizados.",
    },
    {
      categoria: "Dashboard",
      icon: "solar:graph-up-bold",
      titulo: "Correcciones en ganancias",
      descripcion:
        "Revisión del cálculo de ganancias y merma por productos dañados.",
    },
    {
      categoria: "Dashboard",
      icon: "solar:card-2-bold",
      titulo: "Créditos diferenciados de ventas",
      descripcion:
        "Separación clara entre operaciones a crédito y ventas al contado.",
    },
    {
      categoria: "Dashboard",
      icon: "solar:tag-price-bold",
      titulo: "Precio de compra histórico",
      descripcion:
        "Ajuste para evitar que cambios actuales alteren registros pasados.",
    },
    // INVENTARIO
    {
      categoria: "Inventario",
      icon: "solar:magnifer-bold",
      titulo: "Buscador adaptado a modo oscuro",
      descripcion:
        "Mantiene contraste y legibilidad perfecta al usar el tema oscuro.",
    },
    {
      categoria: "Inventario",
      icon: "solar:tag-bold",
      titulo: "Categorías adaptadas al tema",
      descripcion:
        "Las categorías respetan los colores y superficies según el tema dinámico.",
    },
    {
      categoria: "Inventario",
      icon: "solar:magnifer-bold",
      titulo: "Buscador general renovado",
      descripcion:
        "Rediseño visual de buscadores en múltiples módulos del sistema.",
    },
    {
      categoria: "Inventario",
      icon: "solar:box-bold",
      titulo: "Stock bajo en el POS",
      descripcion:
        "Identifica alertas de stock bajo directamente desde la pantalla de venta.",
    },
    {
      categoria: "Inventario",
      icon: "solar:minus-square-bold",
      titulo: "Corrección al retirar stock",
      descripcion:
        "Comportamiento corregido al descontar existencias durante el registro.",
    },
    {
      categoria: "Inventario",
      icon: "solar:calendar-bold",
      titulo: "Fechas de inventario corregidas",
      descripcion:
        "Normalización en el manejo de fechas para evitar inconsistencias.",
    },
    // USUARIOS Y SEGURIDAD
    {
      categoria: "Usuarios y seguridad",
      icon: "solar:user-edit-bold",
      titulo: "Sucursal y caja al editar usuarios",
      descripcion:
        "Permite reasignar fácilmente la sucursal y caja de cualquier usuario.",
    },
    {
      categoria: "Usuarios y seguridad",
      icon: "solar:shield-check-bold",
      titulo: "Permisos para visualizar ganancias",
      descripcion:
        "Control granular para proteger métricas financieras sensibles.",
    },
    // EXPERIENCIA
    {
      categoria: "Experiencia",
      icon: "solar:logout-2-bold",
      titulo: "Confirmación al cerrar sesión",
      descripcion:
        "Modal interactivo para prevenir cierres accidentales en producción.",
    },
    {
      categoria: "Experiencia",
      icon: "solar:magic-stick-3-bold",
      titulo: "Animaciones renovadas",
      descripcion:
        "Transiciones fluidas para pestañas, formularios, cards y páneles.",
    },
    {
      categoria: "Experiencia",
      icon: "solar:code-bold",
      titulo: "Limpieza del código",
      descripcion:
        "Optimización de componentes e infraestructura para mayor velocidad.",
    },
    {
      categoria: "Experiencia",
      icon: "solar:ghost-bold",
      titulo: "Halloween Edition",
      descripcion:
        "Nueva identidad visual temática adaptada tanto a modo claro como oscuro.",
    },
  ];

  const categorias = [
    "Todas",
    "POS y caja",
    "Créditos",
    "Dashboard",
    "Inventario",
    "Usuarios y seguridad",
    "Experiencia",
  ];

  const mejorasFiltradas = useMemo(() => {
    if (categoria === "Todas") return mejoras;
    return mejoras.filter((item) => item.categoria === categoria);
  }, [categoria]);

  const novedadesVisibles = useMemo(() => {
    return mejorasFiltradas.slice(0, limite);
  }, [mejorasFiltradas, limite]);

  const handleTabChange = (cat) => {
    setCategoria(cat);
    setLimite(6);
  };

  return (
    <Container>
      {/* ---------- FONDO Y EFECTOS DE HALLOWEEN (LOGIN STYLE) ---------- */}
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

      {/* ---------- CONTENIDO PRINCIPAL DE LA LANDING ---------- */}
      <Content>
        {/* HERO & SHOWCASE */}
        <HeroSection>
          <HeroInfo>
            <HeroBadge>
              <Icon icon="solar:ghost-bold" />
              EDICIÓN ESPECIAL
            </HeroBadge>

            <HeroTitle>
              Halloween <span>2026</span>
            </HeroTitle>

            <HeroSubtitle>SoftCreate POS</HeroSubtitle>

            <HeroDescription>
              Descubre las novedades en caja, créditos, inventario, dashboard y
              una experiencia de interfaz optimizada.
            </HeroDescription>

            <HeroStats>
              <Stat>
                <strong>{mejoras.length}</strong>
                <span>Novedades</span>
              </Stat>

              <Stat>
                <strong>6</strong>
                <span>Áreas</span>
              </Stat>

              <Stat>
                <strong>☀ / ◐</strong>
                <span>Temas</span>
              </Stat>
            </HeroStats>
          </HeroInfo>

          <CompactShowcase>
            <PreviewCardHeader>
              <div>
                <PreviewSmall>SOFTCREATE POS</PreviewSmall>
                <PreviewTitle>Resumen de versión</PreviewTitle>
              </div>
              <Icon icon="solar:stars-bold" className="star-icon" />
            </PreviewCardHeader>

            <PreviewGrid>
              <MiniFeature>
                <Icon icon="solar:wallet-money-bold" />
                <div>
                  <strong>POS y Caja</strong>
                  <span>Flujo de cobro</span>
                </div>
              </MiniFeature>

              <MiniFeature>
                <Icon icon="solar:card-2-bold" />
                <div>
                  <strong>Créditos</strong>
                  <span>Historiales</span>
                </div>
              </MiniFeature>

              <MiniFeature>
                <Icon icon="solar:chart-2-bold" />
                <div>
                  <strong>Dashboard</strong>
                  <span>Reportes</span>
                </div>
              </MiniFeature>

              <MiniFeature>
                <Icon icon="solar:box-bold" />
                <div>
                  <strong>Inventario</strong>
                  <span>Control stock</span>
                </div>
              </MiniFeature>
            </PreviewGrid>
          </CompactShowcase>
        </HeroSection>

        {/* FILTROS Y CABECERA */}
        <SectionHeader>
          <SectionEyebrow>
            <Icon icon="solar:bolt-bold" />
            Novedades ({mejorasFiltradas.length})
          </SectionEyebrow>

          <Tabs>
            {categorias.map((item) => (
              <Tab
                key={item}
                $active={categoria === item}
                onClick={() => handleTabChange(item)}
              >
                {item}
              </Tab>
            ))}
          </Tabs>
        </SectionHeader>

        {/* CARDS GRID */}
        <Cards key={categoria}>
          {novedadesVisibles.map((mejora, index) => (
            <ImprovementCard
              key={`${categoria}-${mejora.titulo}`}
              style={{
                "--delay": `${(index % 6) * 40}ms`,
              }}
            >
              <CardHeader>
                <CardIcon>
                  <Icon icon={mejora.icon} />
                </CardIcon>
                <CardCategory>{mejora.categoria}</CardCategory>
                <CardNumber>
                  {(index + 1).toString().padStart(2, "0")}
                </CardNumber>
              </CardHeader>

              <CardTitle>{mejora.titulo}</CardTitle>
              <CardDescription>{mejora.descripcion}</CardDescription>
            </ImprovementCard>
          ))}
        </Cards>

        {/* BOTÓN VER MÁS */}
        {limite < mejorasFiltradas.length && (
          <LoadMoreWrapper>
            <LoadMoreButton onClick={() => setLimite((prev) => prev + 6)}>
              <span>
                Ver más novedades ({mejorasFiltradas.length - limite} restantes)
              </span>
              <Icon icon="solar:alt-arrow-down-bold" />
            </LoadMoreButton>
          </LoadMoreWrapper>
        )}
      </Content>
    </Container>
  );
};

/* =========================================================
   ANIMACIONES HALLOWEEN & UI
========================================================= */
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

const fadeUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const cardIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px) scale(.98);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

/* =========================================================
   ESTILOS DE FONDO HALLOWEEN (LOGIN STYLE)
========================================================= */
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
        ${({ theme }) => theme.halloweenSoft},
        transparent 30%
      ),
      radial-gradient(
        circle at 10% 85%,
        ${({ theme }) => theme.halloweenSoft2},
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

  /* Telarañas de esquina */
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

/* =========================================================
   ESTILOS DE UI / CONTENEDOR GENERAL
========================================================= */
const Container = styled.div`
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
  background: ${({ theme }) => theme.bgtotal};
  color: ${({ theme }) => theme.text};
  transition:
    background 0.35s ease,
    color 0.35s ease;
`;

const Content = styled.div`
  position: relative;
  z-index: 2;
  width: min(1200px, calc(100% - 40px));
  margin: 0 auto;
  padding: 40px 0 100px;

  @media (max-width: 600px) {
    width: min(100% - 24px, 1200px);
    padding-top: 24px;
    padding-bottom: 80px;
  }
`;

/* HERO INTEGRADO */
const HeroSection = styled.section`
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 32px;
  align-items: center;
  margin-bottom: 40px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
`;

const HeroInfo = styled.div`
  animation: ${fadeUp} 0.6s cubic-bezier(0.16, 1, 0.3, 1);
`;

const HeroBadge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  border-radius: 999px;
  background: ${({ theme }) => theme.halloweenSoft};
  border: 1px solid ${({ theme }) => theme.halloweenBorder};
  color: ${({ theme }) => theme.halloweenPrimary};
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 1px;
`;

const HeroTitle = styled.h1`
  margin: 12px 0 0;
  font-size: clamp(36px, 5vw, 58px);
  line-height: 1;
  letter-spacing: -2px;
  font-weight: 900;
  color: ${({ theme }) => theme.text};

  span {
    background: linear-gradient(
      100deg,
      ${({ theme }) => theme.halloweenPrimary},
      ${({ theme }) => theme.halloweenSecondary}
    );
    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
  }
`;

const HeroSubtitle = styled.div`
  margin-top: 6px;
  font-size: clamp(18px, 2.5vw, 24px);
  font-weight: 800;
  color: ${({ theme }) => theme.halloweenAccent};
`;

const HeroDescription = styled.p`
  margin: 12px 0 0;
  color: ${({ theme }) => theme.colorSubtitle};
  font-size: 15px;
  line-height: 1.5;
`;

const HeroStats = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  padding: 8px 16px;
  border-radius: 12px;
  background: ${({ theme }) => theme.bgcards};
  border: 1px solid ${({ theme }) => theme.color2};
  backdrop-filter: blur(8px);

  strong {
    color: ${({ theme }) => theme.halloweenPrimary};
    font-size: 16px;
  }

  span {
    color: ${({ theme }) => theme.colorSubtitle};
    font-size: 11px;
  }
`;

/* SHOWCASE DERECHA */
const CompactShowcase = styled.div`
  padding: 20px;
  border-radius: 20px;
  background: ${({ theme }) => theme.bgcards};
  border: 1px solid ${({ theme }) => theme.halloweenBorder};
  box-shadow: 0 15px 35px ${({ theme }) => theme.bgAlpha};
  backdrop-filter: blur(8px);
  animation: ${fadeUp} 0.6s 0.1s both cubic-bezier(0.16, 1, 0.3, 1);
`;

const PreviewCardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;

  .star-icon {
    font-size: 22px;
    color: ${({ theme }) => theme.halloweenPrimary};
  }
`;

const PreviewSmall = styled.div`
  font-size: 9px;
  letter-spacing: 1.5px;
  font-weight: 800;
  color: ${({ theme }) => theme.colorSubtitle};
`;

const PreviewTitle = styled.div`
  font-size: 18px;
  font-weight: 800;
`;

const PreviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const MiniFeature = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  border-radius: 12px;
  background: ${({ theme }) => theme.bgAlpha};

  svg {
    font-size: 18px;
    color: ${({ theme }) => theme.halloweenPrimary};
    flex-shrink: 0;
  }

  div {
    display: flex;
    flex-direction: column;
  }

  strong {
    font-size: 12px;
  }

  span {
    font-size: 10px;
    color: ${({ theme }) => theme.colorSubtitle};
  }
`;

/* FILTROS Y PESTAÑAS */
const SectionHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
`;

const SectionEyebrow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.halloweenPrimary};
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const Tabs = styled.div`
  display: flex;
  gap: 6px;
  padding: 4px;
  overflow-x: auto;
  scrollbar-width: none;
  border-radius: 12px;
  background: ${({ theme }) => theme.bgAlpha};
  border: 1px solid ${({ theme }) => theme.color2};
  backdrop-filter: blur(8px);

  &::-webkit-scrollbar {
    display: none;
  }
`;

const Tab = styled.button`
  border: none;
  border-radius: 8px;
  padding: 8px 14px;
  white-space: nowrap;
  cursor: pointer;
  background: ${({ $active, theme }) =>
    $active ? theme.halloweenPrimary : "transparent"};
  color: ${({ $active, theme }) => ($active ? "#FFFFFF" : theme.colorSubtitle)};
  font-size: 13px;
  font-weight: ${({ $active }) => ($active ? 700 : 500)};
  transition: all 0.2s ease;

  &:hover {
    color: ${({ $active, theme }) => ($active ? "#FFFFFF" : theme.text)};
  }
`;

/* CARDS */
const Cards = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 960px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const ImprovementCard = styled.article`
  display: flex;
  flex-direction: column;
  padding: 16px;
  border-radius: 16px;
  background: ${({ theme }) => theme.bgcards};
  border: 1px solid ${({ theme }) => theme.color2};
  backdrop-filter: blur(8px);
  animation: ${cardIn} 0.4s var(--delay) both cubic-bezier(0.16, 1, 0.3, 1);
  transition:
    transform 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-3px);
    border-color: ${({ theme }) => theme.halloweenBorder};
    box-shadow: 0 8px 20px ${({ theme }) => theme.bgAlpha};
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;

const CardIcon = styled.div`
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  background: ${({ theme }) => theme.halloweenSoft};
  color: ${({ theme }) => theme.halloweenPrimary};
  font-size: 18px;
  flex-shrink: 0;
`;

const CardCategory = styled.span`
  font-size: 9px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.8px;
  color: ${({ theme }) => theme.halloweenPrimary};
  flex-grow: 1;
`;

const CardNumber = styled.span`
  font-size: 10px;
  font-weight: 800;
  color: ${({ theme }) => theme.colorScroll};
`;

const CardTitle = styled.h3`
  margin: 0 0 6px 0;
  font-size: 15px;
  line-height: 1.3;
  color: ${({ theme }) => theme.colortitlecard};
`;

const CardDescription = styled.p`
  margin: 0;
  font-size: 12px;
  line-height: 1.45;
  color: ${({ theme }) => theme.colorSubtitle};
`;

/* BOTÓN "VER MÁS" */
const LoadMoreWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 28px;
`;

const LoadMoreButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.halloweenBorder};
  background: ${({ theme }) => theme.bgcards};
  color: ${({ theme }) => theme.text};
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  backdrop-filter: blur(8px);
  transition: all 0.25s ease;

  svg {
    font-size: 16px;
    color: ${({ theme }) => theme.halloweenPrimary};
    transition: transform 0.2s ease;
  }

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ theme }) => theme.halloweenPrimary};
    background: ${({ theme }) => theme.halloweenSoft};

    svg {
      transform: translateY(2px);
    }
  }

  &:active {
    transform: scale(0.98);
  }
`;
