import styled, { keyframes, useTheme } from "styled-components";
import { Icon } from "@iconify/react";
import { InputText } from "../formularios/InputText";
import { FormatearNumeroDinero } from "../../../utils/Conversiones";
import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { Btn1 } from "../../moleculas/Btn1";
import { useUsuariosStore } from "../../../store/UsuariosStore";
import { useEmpresaStore } from "../../../store/EmpresaStore";
import { useVentasStore } from "../../../store/VentasStore";
import { useDetalleVentasStore } from "../../../store/DetalleVentasStore";
import { PanelBuscador } from "./PanelBuscador";
import { useClientesProveedoresStore } from "../../../store/ClientesProveedoresStore";
import { useMetodosPagoStore } from "../../../store/MetodosPagoStore";
import { RegistrarmovimientocreditoVenta } from "../formularios/RegistrarmovimientocreditoVenta";
import { Linea } from "../../atomos/Linea";
import { useSerealizacionesStore } from "../../../store/SerealizacionesStore";
import ticket from "../../../reports/TicketVenta";
import { useProductosStore } from "../../../store/ProductosStore";
import { useBuscarClientesQueryStack } from "../../../tanstack/ClientesProveedoresStack";
import { useConfirmarVentasMutationStack } from "../../../tanstack/VentasStack";
import { BeatLoader } from "react-spinners";
import { useMostrarMonedaQueryStack } from "../../../tanstack/MonedaStack";

/* =========================================================
   PALETA HALLOWEEN SUAVE
   ========================================================= */

const HALLOWEEN = {
  primary: "#c56a20",
  primaryDark: "#a85618",
  primarySoft: "rgba(197, 106, 32, 0.045)",
  primarySoft2: "rgba(197, 106, 32, 0.025)",
  border: "rgba(197, 106, 32, 0.14)",
  borderSoft: "rgba(197, 106, 32, 0.09)",
  glow: "rgba(197, 106, 32, 0.07)",
  glowStrong: "rgba(197, 106, 32, 0.11)",
};

const ANG = [0, 18, 36, 54, 72, 90].map((a) => (a * Math.PI) / 180);

const pt = (r, a) =>
  `${(r * Math.cos(a)).toFixed(1)} ${(r * Math.sin(a)).toFixed(1)}`;

const RAYOS = ANG.map((a) => `M0 0 L${pt(200, a)}`).join(" ");

const ANILLOS = [38, 76, 114, 152, 190]
  .flatMap((r) =>
    ANG.slice(0, -1).map(
      (a, i) =>
        `M${pt(r, a)} Q${pt(
          r * 0.9,
          (a + ANG[i + 1]) / 2,
        )} ${pt(r, ANG[i + 1])}`,
    ),
  )
  .join(" ");

const MURCIELAGOS = [
  { y: "10%", t: "28s", d: "0s", w: 48, rev: false },
  { y: "36%", t: "34s", d: "8s", w: 40, rev: true },
  { y: "18%", t: "42s", d: "18s", w: 32, rev: false },
];

const ARANAS = [
  { x: "2%", largo: "13vh", ancho: 42, t: "4.8s", d: "0.2s" },
  { x: "96%", largo: "19vh", ancho: 48, t: "5.4s", d: "0.6s" },
];

/* =========================================================
   SVG DECORACIONES
   ========================================================= */

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

    <path d="M30 32 L34 38 L30 44 L26 38 Z" fill="#a85d24" />

    <circle cx="27.5" cy="22.5" r="1.5" fill="#a94a42" />
    <circle cx="32.5" cy="22.5" r="1.5" fill="#a94a42" />
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

    <circle cx="29.5" cy="13" r="0.9" fill="#a94a42" />
    <circle cx="34.5" cy="13" r="0.9" fill="#a94a42" />
  </svg>
);

/* =========================================================
   ANIMACIONES
   ========================================================= */

const aparecer = keyframes`
  from {
    opacity: 0;
    transform: translateY(14px) scale(0.985);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const aparecerFila = keyframes`
  from {
    opacity: 0;
    transform: translateY(7px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

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

const volar = keyframes`
  0% {
    transform: translate(-15vw, var(--y)) rotate(-4deg);
  }

  10% {
    transform: translate(20vw, calc(var(--y) - 5vh)) rotate(4deg);
  }

  20% {
    transform: translate(50vw, calc(var(--y) + 3vh)) rotate(-3deg);
  }

  30% {
    transform: translate(80vw, calc(var(--y) - 4vh)) rotate(3deg);
  }

  40%,
  100% {
    transform: translate(118vw, var(--y)) rotate(-2deg);
  }
`;

const aletear = keyframes`
  0%,
  100% {
    transform: scaleY(1);
  }

  50% {
    transform: scaleY(0.5);
  }
`;

const parpadeo = keyframes`
  0%,
  100% {
    opacity: 0.055;
  }

  50% {
    opacity: 0.13;
  }
`;

const flotar = keyframes`
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-3px);
  }
`;

const LoaderAnim = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

/* =========================================================
   COMPONENTE PRINCIPAL
   ========================================================= */

export const IngresoCobro = forwardRef((props, ref) => {
  const [openRegistro, setOpenRegistro] = useState(false);
  const [stateBuscadorClientes, setStateBuscadorClientes] = useState(false);
  const [montoManualEfectivo, setMontoManualEfectivo] = useState("");
  const [recibido, setRecibido] = useState(0);

  const {
    tipocobro,
    restante,
    setRestante,
    valoresPago,
    setValoresPago,
    idventa,
    setVuelto,
    vuelto,
  } = useVentasStore();

  const { total, mostrardetalleventa } = useDetalleVentasStore();

  const [precioVenta] = useState(total);

  const { data: dataMonedas } = useMostrarMonedaQueryStack();

  const {
    dataComprobantes,
    itemSelectComprobanteSelect,
    setItemSelectComprobanteSelect,
  } = useSerealizacionesStore();

  const { ProductosItemSelect } = useProductosStore();
  const { datausuarios } = useUsuariosStore();
  const { dataMetodosPago } = useMetodosPagoStore();

  const theme = useTheme();

  const { dataempresa } = useEmpresaStore();

  const { setBuscador, selectCliPro, cliproItemSelect } =
    useClientesProveedoresStore();

  const usaEfectivo = tipocobro === "Efectivo";

  const denominacionesOrdenadas = [...(dataMonedas ?? [])].sort(
    (a, b) => a.numero - b.numero,
  );

  const calcularVueltoYRestante = () => {
    const totalPagado = Object.values(valoresPago).reduce(
      (acc, curr) => acc + curr,
      0,
    );

    const totalSinEfectivo = totalPagado - (valoresPago["Efectivo"] || 0);

    if (totalSinEfectivo > precioVenta) {
      setVuelto(0);
      setRestante(precioVenta - totalSinEfectivo);
    } else if (totalPagado >= precioVenta) {
      const exceso = totalPagado - precioVenta;

      setVuelto(valoresPago["Efectivo"] ? exceso : 0);

      setRestante(0);
    } else {
      setVuelto(0);
      setRestante(precioVenta - totalPagado);
    }
  };

  const { data: databuscadorcliente } = useBuscarClientesQueryStack();

  const mutation = useConfirmarVentasMutationStack({
    imprimirDirectoTicket,
    imprimirConVentanaEmergente,
  });

  const handleChangePago = (tipo, valor) => {
    setValoresPago((prev) => ({
      ...prev,
      [tipo]: parseFloat(valor) || 0,
    }));
  };

  const handleAgregarMontoEfectivo = (monto) => {
    if (!monto || monto <= 0) return;

    setRecibido((prev) => prev + monto);
  };

  const handleAgregarMontoManual = () => {
    const valor = parseFloat(montoManualEfectivo);

    if (!isNaN(valor) && valor > 0) {
      handleAgregarMontoEfectivo(valor);
      setMontoManualEfectivo("");
    }
  };

  const handleLimpiarEfectivo = () => {
    setRecibido(0);
    setMontoManualEfectivo("");
  };

  useImperativeHandle(ref, () => ({
    mutateAsync: mutation.mutateAsync,
  }));

  async function imprimirConVentanaEmergente(responseVentaConfirmada) {
    const items = await mostrardetalleventa({
      id_venta: idventa,
    });

    const ahora = new Date();

    const horaFormateada = ahora.toLocaleTimeString("en-US", {
      hour12: true,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

    const fechaFormateada = ahora.toLocaleDateString();

    const dataenv = {
      hora: horaFormateada,
      fecha: fechaFormateada,
      logo: dataempresa.logo,
      nombre: dataempresa.nombre,
      direccion_empresa: dataempresa.direccion_fiscal,
      pais: dataempresa.pais,
      id_venta: responseVentaConfirmada?.nro_comprobante,
      nombre_usuario: datausuarios?.nombres,
      nombre_cliente: cliproItemSelect?.nombres || "-",
      cc: cliproItemSelect?.identificador_nacional || "-",
      direccion_cliente: cliproItemSelect?.direccion || "-",
      codigo_producto: ProductosItemSelect?.codigo_barra,
      productos: items,
      tipo_de_pago: tipocobro,
      monto_total: total,
      pie_pagina: dataempresa?.pie_pagina_ticket,
      nombre_comprobante:
        itemSelectComprobanteSelect?.tipo_comprobantes?.nombre,
      telefono: dataempresa?.telefono_celular,
    };

    await ticket("print", dataenv);
  }

  function imprimirDirectoTicket() {}

  useEffect(() => {
    if (tipocobro === "Mixto") {
      setValoresPago({});
    } else if (tipocobro === "Efectivo") {
      setRecibido(0);

      setValoresPago({
        Efectivo: total,
      });
    } else {
      setValoresPago({
        [tipocobro]: total,
      });
    }
  }, [tipocobro]);

  useEffect(() => {
    if (tipocobro !== "Mixto" && tipocobro !== "Efectivo") {
      setValoresPago({
        [tipocobro]: total,
      });
    }
  }, [total]);

  useEffect(() => {
    if (tipocobro === "Efectivo") {
      setValoresPago({
        Efectivo: recibido > 0 ? recibido : total,
      });
    }
  }, [recibido, total]);

  useEffect(() => {
    calcularVueltoYRestante();
  }, [precioVenta, tipocobro, valoresPago]);

  return (
    <Container $ancho={usaEfectivo ? "1180px" : "700px"}>
      <HalloweenDecor>
        <Telarana className="web web-left" />
        <Telarana className="web web-right" />

        {MURCIELAGOS.map((b, i) => (
          <Murcielago
            key={i}
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

        {ARANAS.map((a, i) => (
          <AranaHilo
            key={i}
            style={{
              left: a.x,
              width: a.ancho,
              height: a.largo,
              animationDelay: a.d,
            }}
          >
            <AranaBalanceo
              style={{
                animationDuration: a.t,
                animationDelay: `-${i * 0.8}s`,
              }}
            >
              <AranaSvg />
            </AranaBalanceo>
          </AranaHilo>
        ))}
      </HalloweenDecor>

      <Contenido>
        {mutation.isPending ? (
          <ConteinerLoader>
            <span>
              <strong>Guardando</strong>
            </span>

            <BeatLoader color={HALLOWEEN.primary} size={8} />
          </ConteinerLoader>
        ) : (
          <>
            {mutation.isError && (
              <ErrorMessage>
                <Icon icon="solar:danger-triangle-bold" />
                Error: {mutation.error.message}
              </ErrorMessage>
            )}

            <TopBar>
              <TipoCobro>
                <Icon icon="solar:wallet-money-bold" />
                {tipocobro}
              </TipoCobro>
            </TopBar>

            <Libro>
              <PaginaIzquierda>
                {openRegistro && (
                  <ContentReg>
                    <RegistrarmovimientocreditoVenta
                      onClose={() => setOpenRegistro(!openRegistro)}
                    />
                  </ContentReg>
                )}

                <section className="cabecera">
                  <ComprobanteActual>
                    {itemSelectComprobanteSelect?.tipo_comprobantes?.nombre}

                    <strong>
                      {itemSelectComprobanteSelect?.serie}-
                      {itemSelectComprobanteSelect?.correlativos}
                    </strong>
                  </ComprobanteActual>

                  <section className="areacomprobantes">
                    {dataComprobantes?.map((item, index) => (
                      <article className="box" key={index}>
                        <Btn1
                          funcion={() => setItemSelectComprobanteSelect(item)}
                          border="1px"
                          height="48px"
                          width="100%"
                          titulo={item?.tipo_comprobantes?.nombre}
                          bgcolor={
                            theme.body === "#fff"
                              ? "rgba(0,0,0,0.025)"
                              : "rgba(255,255,255,0.018)"
                          }
                          color={theme.text}
                        />
                      </article>
                    ))}
                  </section>

                  <ClienteBox>
                    <ClienteTitulo>
                      <Icon icon="solar:user-id-bold" />
                      <span>Cliente</span>
                    </ClienteTitulo>

                    <EditButton
                      onClick={() =>
                        setStateBuscadorClientes(!stateBuscadorClientes)
                      }
                    >
                      <Icon className="icono" icon="line-md:pencil-twotone" />
                    </EditButton>

                    <span className="cliente">
                      {cliproItemSelect?.nombres || "Consumidor final"}
                    </span>
                  </ClienteBox>
                </section>

                <section className="metodos">
                  {dataMetodosPago?.map((item, index) => {
                    const mostrar =
                      (tipocobro === "Mixto" &&
                        item.nombre !== "Mixto" &&
                        item.nombre !== "Credito") ||
                      (tipocobro === item.nombre && item.nombre !== "Mixto");

                    if (!mostrar) return null;

                    if (item.nombre === "Efectivo") {
                      if (tipocobro === "Efectivo") {
                        return (
                          <EfectivoContainer key={index}>
                            <FilaMontos>
                              <MontoBox>
                                <label className="form__label">
                                  Total a cobrar
                                </label>

                                <DisplayEfectivo>
                                  {FormatearNumeroDinero(
                                    total,
                                    dataempresa?.currency,
                                    dataempresa?.iso,
                                  )}
                                </DisplayEfectivo>
                              </MontoBox>

                              <MontoBox>
                                <label className="form__label">Recibido</label>

                                <DisplayEfectivo $vacio={recibido === 0}>
                                  {FormatearNumeroDinero(
                                    recibido,
                                    dataempresa?.currency,
                                    dataempresa?.iso,
                                  )}
                                </DisplayEfectivo>
                              </MontoBox>
                            </FilaMontos>

                            {recibido === 0 && (
                              <Hint>
                                <Icon icon="solar:info-circle-bold" />
                                Pago exacto: presiona Cobrar directamente
                              </Hint>
                            )}

                            <ManualRow>
                              <input
                                type="number"
                                placeholder="Otro monto"
                                value={montoManualEfectivo}
                                onChange={(e) =>
                                  setMontoManualEfectivo(e.target.value)
                                }
                                onKeyDown={(e) => {
                                  if (e.key === "Enter") {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    handleAgregarMontoManual();
                                  }
                                }}
                              />

                              <button
                                type="button"
                                onClick={handleAgregarMontoManual}
                              >
                                <Icon icon="solar:add-circle-bold" />
                                Agregar
                              </button>

                              <button
                                type="button"
                                className="limpiar"
                                onClick={handleLimpiarEfectivo}
                              >
                                <Icon icon="solar:trash-bin-trash-bold" />
                                Limpiar
                              </button>
                            </ManualRow>
                          </EfectivoContainer>
                        );
                      }
                    }

                    return (
                      <InputText textaling="center" key={index}>
                        <input
                          onChange={(e) =>
                            handleChangePago(item.nombre, e.target.value)
                          }
                          defaultValue={tipocobro === item.nombre ? total : ""}
                          className="form__field"
                          type="number"
                          disabled={tipocobro === "Mixto" ? false : true}
                        />

                        <label className="form__label">{item.nombre}</label>
                      </InputText>
                    );
                  })}
                </section>

                <TotalesBox>
                  <article>
                    <span className="total">Total</span>

                    <span>Vuelto</span>
                    <span>Restante</span>
                  </article>

                  <article>
                    <span className="total">
                      {FormatearNumeroDinero(
                        total,
                        dataempresa?.currency,
                        dataempresa?.iso,
                      )}
                    </span>

                    <span>
                      {FormatearNumeroDinero(
                        vuelto,
                        dataempresa?.currency,
                        dataempresa?.iso,
                      )}
                    </span>

                    <span>
                      {FormatearNumeroDinero(
                        restante,
                        dataempresa?.currency,
                        dataempresa?.iso,
                      )}
                    </span>
                  </article>
                </TotalesBox>

                <section className="acciones">
                  {tipocobro === "Credito" ? (
                    <>
                      <Btn1
                        border="2px"
                        titulo="¿Fiado? Presiona"
                        bgcolor="#8f831c"
                        color="#ffffff"
                        width="100%"
                        funcion={() => setOpenRegistro(!openRegistro)}
                      />

                      <Linea />

                      <Btn1
                        border="2px"
                        titulo="Cobrar (Enter)"
                        bgcolor={HALLOWEEN.primary}
                        color={theme.body === "#fff" ? "#ffffff" : "#f4ebe4"}
                        width="100%"
                      />
                    </>
                  ) : (
                    <Btn1
                      funcion={() => {
                        if (mutation.isPending) return;

                        mutation.mutateAsync();
                      }}
                      border="2px"
                      titulo="Cobrar (Enter)"
                      bgcolor={HALLOWEEN.primary}
                      color={theme.body === "#fff" ? "#ffffff" : "#f4ebe4"}
                      width="100%"
                    />
                  )}
                </section>
              </PaginaIzquierda>

              {usaEfectivo && (
                <>
                  <Lomo />

                  <PaginaDerecha>
                    <h4>
                      <Icon icon="solar:money-bag-bold" />
                      Denominaciones
                    </h4>

                    <DenominacionesGrid>
                      {denominacionesOrdenadas.map((moneda) => (
                        <DenominacionBtn
                          key={moneda.id}
                          type="button"
                          onClick={() =>
                            handleAgregarMontoEfectivo(moneda.numero)
                          }
                        >
                          {moneda.icono ? (
                            <img
                              src={moneda.icono}
                              alt={`$${moneda.numero}`}
                              onError={(e) => {
                                e.currentTarget.style.display = "none";
                              }}
                            />
                          ) : null}

                          <span>
                            {FormatearNumeroDinero(
                              moneda.numero,
                              dataempresa?.currency,
                              dataempresa?.iso,
                            )}
                          </span>
                        </DenominacionBtn>
                      ))}
                    </DenominacionesGrid>
                  </PaginaDerecha>
                </>
              )}
            </Libro>

            {stateBuscadorClientes && (
              <PanelBuscador
                data={databuscadorcliente}
                selector={selectCliPro}
                setBuscador={setBuscador}
                displayField="nombres"
                setStateBuscador={() =>
                  setStateBuscadorClientes(!stateBuscadorClientes)
                }
              />
            )}
          </>
        )}
      </Contenido>
    </Container>
  );
});

/* =========================================================
   DECORACIÓN
   ========================================================= */

const HalloweenDecor = styled.div`
  position: absolute;
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
        circle at 10% 8%,
        rgba(197, 106, 32, 0.035),
        transparent 28%
      ),
      radial-gradient(
        circle at 90% 85%,
        rgba(115, 76, 50, 0.035),
        transparent 30%
      );
  }

  .web {
    position: absolute;
    width: min(180px, 20vw);

    color: ${HALLOWEEN.primary};

    opacity: 0.11;

    filter: drop-shadow(0 0 4px rgba(197, 106, 32, 0.05));

    animation: ${parpadeo} 7s ease-in-out infinite;

    transform-origin: center;
  }

  .web-left {
    top: -15px;
    left: -15px;
    transform: scaleX(-1);
  }

  .web-right {
    top: -15px;
    right: -15px;
    animation-delay: -3s;
  }

  @media (prefers-reduced-motion: reduce) {
    & * {
      animation: none !important;
    }
  }
`;

const Murcielago = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  --y: ${({ style }) => style?.["--y"]};

  color: ${HALLOWEEN.primary};

  animation: ${volar} 30s linear infinite;

  opacity: 0.23;

  will-change: transform;

  @media (prefers-reduced-motion: reduce) {
    display: none;
  }
`;

const Aleteo = styled.div`
  animation: ${aletear} 0.3s ease-in-out infinite alternate;

  filter: drop-shadow(0 0 2px rgba(197, 106, 32, 0.06));

  will-change: transform;
`;

const AranaHilo = styled.div`
  position: absolute;
  top: 0;

  color: ${HALLOWEEN.primaryDark};

  transform-origin: top center;

  animation: ${caer} 1.2s cubic-bezier(0.22, 1, 0.36, 1) both;

  will-change: transform;

  @media (max-width: 700px) {
    &:nth-last-child(-n + 1) {
      display: none;
    }
  }
`;

const AranaBalanceo = styled.div`
  width: 100%;
  height: 100%;

  transform-origin: top center;

  animation: ${columpio} 4.8s ease-in-out infinite alternate;

  svg {
    display: block;
  }
`;

/* =========================================================
   CONTENEDOR PRINCIPAL
   ========================================================= */

const Container = styled.div`
  position: relative;
  box-sizing: border-box;

  width: ${({ $ancho }) => $ancho || "480px"};
  max-width: 96vw;

  margin: 0 auto;
  align-self: center;

  max-height: calc(100vh - 60px);

  padding: 20px 24px;

  border-radius: 16px;

  box-shadow: ${({ theme }) =>
    theme.body === "#fff"
      ? "0 18px 45px rgba(0,0,0,0.10)"
      : "0 18px 45px rgba(0,0,0,0.42)"};

  display: flex;
  flex-direction: column;

  background-color: ${({ theme }) => theme.bg2 || theme.bgtotal};

  color: ${({ theme }) => theme.text};

  align-items: center;
  justify-content: flex-start;

  font-size: 22px;

  overflow-y: auto;
  overflow-x: hidden;

  scrollbar-width: thin;

  scrollbar-color: ${HALLOWEEN.primary} transparent;

  border: 1px solid ${HALLOWEEN.border};

  animation: ${aparecer} 0.28s ease both;

  &::before {
    content: "";

    position: absolute;
    inset: 0;

    border-radius: inherit;

    pointer-events: none;

    border-top: 2px solid ${HALLOWEEN.primary};

    opacity: 0.9;

    z-index: 1;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${HALLOWEEN.primary};

    border-radius: 10px;
  }

  @media (max-height: 760px) {
    padding: 14px 20px;
  }

  @media (max-width: 700px) {
    width: 100%;
    max-width: 95vw;

    max-height: calc(100vh - 40px);

    padding: 14px;
  }
`;

const Contenido = styled.div`
  position: relative;
  z-index: 3;

  width: 100%;
  min-height: 0;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: flex-end;

  margin-bottom: 5px;
`;

const TipoCobro = styled.span`
  display: flex;
  align-items: center;

  gap: 5px;

  padding: 5px 9px;

  border-radius: 8px;

  font-size: 12px;
  font-weight: 750;

  color: ${HALLOWEEN.primary};

  background: ${({ theme }) =>
    theme.body === "#fff" ? "rgba(0,0,0,0.025)" : "rgba(255,255,255,0.025)"};

  border: 1px solid ${HALLOWEEN.borderSoft};

  animation: ${flotar} 3s ease-in-out infinite;
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;

  gap: 8px;

  width: 100%;
  box-sizing: border-box;

  padding: 8px 10px;

  margin-bottom: 6px;

  border-radius: 8px;

  color: #e04040;

  background: rgba(224, 64, 64, 0.07);

  border: 1px solid rgba(224, 64, 64, 0.15);

  font-size: 12px;
`;

const Libro = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;

  align-items: stretch;

  gap: 0;

  padding: 4px;

  border-radius: 12px;

  background: ${({ theme }) =>
    theme.body === "#fff"
      ? "rgba(255,255,255,0.35)"
      : "rgba(255,255,255,0.012)"};

  animation: ${aparecerFila} 0.35s ease both;

  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const Lomo = styled.div`
  width: 2px;

  align-self: stretch;

  background: ${HALLOWEEN.borderSoft};

  box-shadow: 0 0 6px 1px ${HALLOWEEN.glow};

  margin: 0 14px;

  @media (max-width: 700px) {
    display: none;
  }
`;

const PaginaIzquierda = styled.div`
  position: relative;

  flex: 1 1 0;

  min-width: 0;

  display: flex;
  flex-direction: column;

  align-items: center;

  padding: 6px 8px;

  .cabecera {
    display: flex;
    flex-direction: column;

    align-items: center;

    width: 100%;

    margin-bottom: 8px;

    .areacomprobantes {
      display: flex;

      flex-wrap: wrap;

      gap: 9px;

      padding: 9px 0;

      width: 100%;

      .box {
        flex: 1 1 40%;

        min-width: 150px;

        display: flex;
      }
    }
  }

  .metodos {
    margin-top: 8px;

    width: 100%;

    min-height: 70px;

    display: flex;
    flex-direction: column;

    justify-content: center;

    gap: 10px;

    animation: ${aparecerFila} 0.3s ease both;

    input {
      color: ${({ theme }) => theme.text} !important;

      font-weight: 700;

      font-size: 30px;

      background: transparent;

      border-bottom: 2px solid ${HALLOWEEN.borderSoft};

      transition:
        border-color 0.2s ease,
        transform 0.2s ease;

      &:focus {
        border-color: ${HALLOWEEN.primary};

        transform: translateY(-1px);

        outline: none;
      }
    }

    .form__label {
      color: ${({ theme }) => theme.text} !important;

      opacity: 0.65;
    }
  }

  .acciones {
    width: 100%;

    margin-top: 12px;

    flex-shrink: 0;

    button {
      transition:
        transform 0.18s ease,
        filter 0.18s ease,
        box-shadow 0.18s ease;

      &:hover {
        transform: translateY(-2px);

        filter: brightness(1.04);

        box-shadow: 0 7px 18px rgba(197, 106, 32, 0.08);
      }

      &:active {
        transform: scale(0.985);
      }
    }
  }

  @media (max-width: 700px) {
    padding: 4px;
  }
`;

const ComprobanteActual = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;

  gap: 7px;

  font-size: 13px;

  opacity: 0.72;

  margin-bottom: 2px;

  strong {
    color: ${HALLOWEEN.primary};

    font-weight: 800;
  }
`;

const ClienteBox = styled.section`
  width: 100%;

  box-sizing: border-box;

  display: flex;

  align-items: center;

  gap: 9px;

  padding: 9px 11px;

  margin-top: 2px;

  border-radius: 9px;

  background: ${({ theme }) =>
    theme.body === "#fff" ? "rgba(0,0,0,0.025)" : "rgba(255,255,255,0.018)"};

  border: 1px solid ${HALLOWEEN.borderSoft};
`;

const ClienteTitulo = styled.div`
  display: flex;

  align-items: center;

  gap: 5px;

  font-size: 13px;

  opacity: 0.6;

  white-space: nowrap;
`;

const EditButton = styled.button`
  flex-shrink: 0;

  background-color: ${({ theme }) =>
    theme.body === "#fff" ? "rgba(0,0,0,0.025)" : "rgba(255,255,255,0.025)"};

  color: ${HALLOWEEN.primary};

  border: 1px solid ${HALLOWEEN.borderSoft};

  border-radius: 50%;

  cursor: pointer;

  width: 29px;
  height: 29px;

  display: flex;

  justify-content: center;
  align-items: center;

  margin: 0;

  transition:
    transform 0.18s ease,
    box-shadow 0.18s ease;

  .icono {
    font-size: 18px;
  }

  &:hover {
    transform: rotate(7deg) scale(1.05);

    box-shadow: 0 4px 12px rgba(197, 106, 32, 0.08);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const ContentReg = styled.div`
  position: relative;

  z-index: 10;

  width: 100%;

  color: ${HALLOWEEN.primary};

  animation: ${aparecer} 0.2s ease both;
`;

const TotalesBox = styled.section`
  width: 100%;

  box-sizing: border-box;

  display: flex;

  justify-content: space-between;

  margin-top: 12px;

  padding: 12px 15px;

  border-radius: 10px;

  background: ${({ theme }) =>
    theme.body === "#fff"
      ? "rgba(255,255,255,0.55)"
      : "rgba(255,255,255,0.02)"};

  border: 1px solid ${HALLOWEEN.borderSoft};

  article {
    display: flex;

    flex-direction: column;

    gap: 4px;

    line-height: 1.15;
  }

  article:last-child {
    text-align: right;
  }

  .total {
    color: ${HALLOWEEN.primary};

    font-weight: 800;
  }
`;

const ConteinerLoader = styled.div`
  display: flex;

  align-items: center;
  justify-content: center;

  flex-direction: column;

  gap: 8px;

  min-height: 280px;

  animation: ${LoaderAnim} 0.25s ease both;

  strong {
    color: ${HALLOWEEN.primary};
  }
`;

const EfectivoContainer = styled.div`
  width: 100%;

  display: flex;

  flex-direction: column;

  gap: 10px;

  margin-top: 6px;

  padding: 3px 0;

  animation: ${aparecerFila} 0.25s ease both;
`;

const FilaMontos = styled.div`
  display: grid;

  grid-template-columns: 1fr 1fr;

  gap: 14px;
`;

const MontoBox = styled.div`
  padding: 10px 12px;

  min-height: 76px;

  display: flex;

  flex-direction: column;

  justify-content: center;

  border-radius: 10px;

  background: ${({ theme }) =>
    theme.body === "#fff" ? "rgba(0,0,0,0.018)" : "rgba(255,255,255,0.018)"};

  border: 1px solid ${HALLOWEEN.borderSoft};

  .form__label {
    display: block;

    text-align: center;

    color: ${({ theme }) => theme.text};

    opacity: 0.55;

    font-size: 12px;

    margin-bottom: 5px;
  }
`;

const DisplayEfectivo = styled.div`
  font-weight: 800;

  font-size: 28px;

  line-height: 1.1;

  text-align: center;

  color: ${({ theme }) => theme.text};

  padding-bottom: 2px;

  user-select: none;

  opacity: ${({ $vacio }) => ($vacio ? 0.42 : 1)};

  transition: opacity 0.2s ease;
`;

const Hint = styled.span`
  display: flex;

  align-items: center;

  justify-content: center;

  gap: 5px;

  font-size: 12px;

  text-align: center;

  color: ${HALLOWEEN.primary};

  opacity: 0.58;
`;

const ManualRow = styled.div`
  display: flex;

  gap: 7px;

  align-items: center;

  input {
    flex: 1;

    min-width: 0;

    padding: 8px 10px;

    border-radius: 8px;

    font-size: 15px !important;

    font-weight: 500 !important;

    border: 1px solid ${HALLOWEEN.borderSoft};

    background: transparent;

    color: ${({ theme }) => theme.text} !important;

    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease;

    &:focus {
      outline: none;

      border-color: ${HALLOWEEN.primary};

      box-shadow: 0 0 0 3px rgba(197, 106, 32, 0.04);
    }
  }

  button {
    display: flex;

    align-items: center;
    justify-content: center;

    gap: 4px;

    padding: 8px 12px;

    border-radius: 8px;

    border: none;

    cursor: pointer;

    font-weight: 700;

    background-color: ${HALLOWEEN.primary};

    color: ${({ theme }) => (theme.body === "#fff" ? "#fff" : "#f4ebe4")};

    transition:
      transform 0.18s ease,
      filter 0.18s ease,
      box-shadow 0.18s ease;

    &:hover {
      transform: translateY(-2px);

      filter: brightness(1.04);

      box-shadow: 0 5px 12px rgba(197, 106, 32, 0.08);
    }

    &:active {
      transform: scale(0.97);
    }

    &.limpiar {
      background-color: #c34a4a;

      color: #fff;
    }
  }
`;

const PaginaDerecha = styled.div`
  flex: 1 1 0;

  min-width: 0;

  display: flex;

  flex-direction: column;

  align-items: center;

  padding: 8px 10px;

  h4 {
    display: flex;

    align-items: center;

    gap: 6px;

    margin: 0 0 12px;

    color: ${HALLOWEEN.primary};

    font-size: 16px;

    align-self: center;

    animation: ${flotar} 3s ease-in-out infinite;
  }

  @media (max-width: 700px) {
    margin-top: 16px;

    padding: 4px;

    width: 100%;
  }
`;

const DenominacionesGrid = styled.div`
  width: 100%;

  display: grid;

  grid-template-columns: repeat(3, 1fr);

  gap: 10px;

  max-height: 330px;

  overflow-y: auto;

  padding: 2px 4px 2px 2px;

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background: ${HALLOWEEN.primary};

    border-radius: 10px;
  }

  @media (max-height: 760px) {
    max-height: 270px;
  }

  @media (max-width: 700px) {
    max-height: 260px;
  }
`;

const DenominacionBtn = styled.button`
  display: flex;

  flex-direction: column;

  align-items: center;
  justify-content: center;

  gap: 5px;

  padding: 9px 5px;

  min-height: 78px;

  border-radius: 9px;

  border: 1px solid ${HALLOWEEN.borderSoft};

  background-color: ${({ theme }) =>
    theme.body === "#fff" ? "rgba(0,0,0,0.018)" : "rgba(255,255,255,0.018)"};

  color: ${({ theme }) => theme.text};

  font-weight: 700;

  font-size: 13px;

  cursor: pointer;

  transition:
    transform 0.16s ease,
    background-color 0.16s ease,
    border-color 0.16s ease,
    box-shadow 0.16s ease;

  img {
    width: 38px;

    height: 38px;

    object-fit: contain;

    pointer-events: none;

    transition: transform 0.16s ease;
  }

  &:hover {
    transform: translateY(-2px);

    background-color: ${({ theme }) =>
      theme.body === "#fff" ? "rgba(0,0,0,0.03)" : "rgba(255,255,255,0.03)"};

    border-color: ${HALLOWEEN.primary};

    box-shadow: 0 5px 12px rgba(197, 106, 32, 0.06);

    img {
      transform: scale(1.05);
    }
  }

  &:active {
    transform: scale(0.96);
  }
`;
