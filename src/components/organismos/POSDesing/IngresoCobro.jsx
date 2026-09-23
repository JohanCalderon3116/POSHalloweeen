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

const ACCENT = {
  primary: "#1f7a5c",
  primaryDark: "#155a44",
  primarySoft: "rgba(31, 122, 92, 0.10)",
  primarySoft2: "rgba(31, 122, 92, 0.05)",
  border: "rgba(31, 122, 92, 0.22)",
  borderSoft: "rgba(31, 122, 92, 0.13)",
  pending: "#b7791f",
  pendingSoft: "rgba(183, 121, 31, 0.10)",
  pendingBorder: "rgba(183, 121, 31, 0.22)",
  danger: "#b3402f",
  dangerSoft: "rgba(179, 64, 47, 0.08)",
};

const aparecer = keyframes`
  from { opacity: 0; transform: translateY(14px) scale(0.985); }
  to { opacity: 1; transform: translateY(0) scale(1); }
`;

const aparecerFila = keyframes`
  from { opacity: 0; transform: translateY(7px); }
  to { opacity: 1; transform: translateY(0); }
`;

const LoaderAnim = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

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
  const estadoRecibido =
    recibido === 0 ? "neutro" : recibido >= total ? "completo" : "pendiente";

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
    setValoresPago((prev) => ({ ...prev, [tipo]: parseFloat(valor) || 0 }));
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

  useImperativeHandle(ref, () => ({ mutateAsync: mutation.mutateAsync }));

  async function imprimirConVentanaEmergente(responseVentaConfirmada) {
    const items = await mostrardetalleventa({ id_venta: idventa });
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
      setValoresPago({ Efectivo: total });
    } else {
      setValoresPago({ [tipocobro]: total });
    }
  }, [tipocobro]);

  useEffect(() => {
    if (tipocobro !== "Mixto" && tipocobro !== "Efectivo") {
      setValoresPago({ [tipocobro]: total });
    }
  }, [total]);

  useEffect(() => {
    if (tipocobro === "Efectivo") {
      setValoresPago({ Efectivo: recibido > 0 ? recibido : total });
    }
  }, [recibido, total]);

  useEffect(() => {
    calcularVueltoYRestante();
  }, [precioVenta, tipocobro, valoresPago]);

  return (
    <Container $ancho={usaEfectivo ? "1180px" : "480px"}>
      <Contenido>
        {mutation.isPending ? (
          <ConteinerLoader>
            <span>
              <strong>Guardando</strong>
            </span>
            <BeatLoader color={ACCENT.primary} size={8} />
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
                    <span className="label">
                      {itemSelectComprobanteSelect?.tipo_comprobantes?.nombre}
                    </span>
                    <strong>
                      {itemSelectComprobanteSelect?.serie}-
                      {itemSelectComprobanteSelect?.correlativos}
                    </strong>
                  </ComprobanteActual>
                  <section className="areacomprobantes">
                    {dataComprobantes?.map((item, index) => {
                      const seleccionado = item === itemSelectComprobanteSelect;
                      return (
                        <article
                          className={seleccionado ? "box seleccionado" : "box"}
                          key={index}
                        >
                          <Btn1
                            funcion={() => setItemSelectComprobanteSelect(item)}
                            border="1px"
                            height="48px"
                            width="100%"
                            titulo={item?.tipo_comprobantes?.nombre}
                            bgcolor={
                              seleccionado
                                ? ACCENT.primarySoft
                                : theme.body === "#fff"
                                  ? "rgba(0,0,0,0.025)"
                                  : "rgba(255,255,255,0.018)"
                            }
                            color={seleccionado ? ACCENT.primary : theme.text}
                          />
                        </article>
                      );
                    })}
                  </section>
                  <ClienteBox>
                    <ClienteTitulo>
                      <Icon icon="solar:user-id-bold" />
                      <span>Cliente</span>
                    </ClienteTitulo>
                    <span className="cliente">
                      {cliproItemSelect?.nombres || "Consumidor final"}
                    </span>
                    <EditButton
                      type="button"
                      onClick={() =>
                        setStateBuscadorClientes(!stateBuscadorClientes)
                      }
                      aria-label="Cambiar cliente"
                    >
                      <Icon icon="line-md:pencil-twotone" />
                    </EditButton>
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
                              <MontoBox $estado={estadoRecibido}>
                                <label className="form__label">Recibido</label>
                                <DisplayEfectivo $estado={estadoRecibido}>
                                  {FormatearNumeroDinero(
                                    recibido,
                                    dataempresa?.currency,
                                    dataempresa?.iso,
                                  )}
                                  {estadoRecibido === "completo" && (
                                    <Icon icon="solar:check-circle-bold" />
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
                    <span className="label">Total</span>
                    <span className="valor total">
                      {FormatearNumeroDinero(
                        total,
                        dataempresa?.currency,
                        dataempresa?.iso,
                      )}
                    </span>
                  </article>
                  <article>
                    <span className="label">Vuelto</span>
                    <span
                      className={
                        vuelto > 0 ? "valor vuelto activo" : "valor vuelto"
                      }
                    >
                      {FormatearNumeroDinero(
                        vuelto,
                        dataempresa?.currency,
                        dataempresa?.iso,
                      )}
                    </span>
                  </article>
                  <article>
                    <span className="label">Restante</span>
                    <span
                      className={
                        restante > 0
                          ? "valor restante activo"
                          : "valor restante"
                      }
                    >
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
                        bgcolor={ACCENT.pending}
                        color="#ffffff"
                        width="100%"
                        funcion={() => setOpenRegistro(!openRegistro)}
                      />
                      <Linea />
                      <Btn1
                        funcion={() => {
                          if (mutation.isPending) return;
                          mutation.mutateAsync();
                        }}
                        border="2px"
                        titulo="Cobrar (Enter)"
                        bgcolor={ACCENT.primary}
                        color="#ffffff"
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
                      bgcolor={ACCENT.primary}
                      color="#ffffff"
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

const Container = styled.div`
  position: relative;
  box-sizing: border-box;
  width: ${({ $ancho }) => $ancho};
  max-width: 96vw;
  margin: 0 auto;
  align-self: center;
  max-height: 100vh;
  padding: 24px 28px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.bg2 || theme.bgtotal};
  color: ${({ theme }) => theme.text};
  border: 1px solid
    ${({ theme }) =>
      theme.body === "#fff" ? "rgba(15,23,42,0.08)" : "rgba(255,255,255,0.08)"};
  box-shadow: ${({ theme }) =>
    theme.body === "#fff"
      ? "0 24px 60px rgba(15,23,42,0.14)"
      : "0 24px 60px rgba(0,0,0,0.5)"};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  font-size: 22px;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: thin;
  scrollbar-color: ${ACCENT.primary} transparent;
  animation: ${aparecer} 0.28s ease both;
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 24px;
    right: 24px;
    height: 3px;
    border-radius: 0 0 3px 3px;
    background: ${ACCENT.primary};
    opacity: 0.85;
  }
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${ACCENT.primary};
    border-radius: 10px;
  }
  @media (max-height: 760px) {
    padding: 16px 20px;
  }
  @media (max-width: 700px) {
    width: 100%;
    max-width: 95vw;
    max-height: calc(100vh - 40px);
    padding: 16px;
  }
`;

const Contenido = styled.div`
  position: relative;
  width: 100%;
  min-height: 0;
`;

const TopBar = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 8px;
`;

const TipoCobro = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  color: ${ACCENT.primary};
  background: ${ACCENT.primarySoft};
  border: 1px solid ${ACCENT.borderSoft};
`;

const ErrorMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  box-sizing: border-box;
  padding: 10px 12px;
  margin-bottom: 10px;
  border-radius: 10px;
  border-left: 3px solid ${ACCENT.danger};
  color: ${ACCENT.danger};
  background: ${ACCENT.dangerSoft};
  font-size: 12px;
  svg {
    flex-shrink: 0;
    font-size: 16px;
  }
`;

const Libro = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: stretch;
  gap: 0;
  @media (max-width: 700px) {
    flex-direction: column;
  }
`;

const Lomo = styled.div`
  position: relative;
  width: 0;
  align-self: stretch;
  margin: 6px 20px;
  border-left: 1.5px dashed
    ${({ theme }) =>
      theme.body === "#fff" ? "rgba(15,23,42,0.16)" : "rgba(255,255,255,0.16)"};
  &::before,
  &::after {
    content: "";
    position: absolute;
    left: -6px;
    width: 11px;
    height: 11px;
    border-radius: 50%;
    background: ${({ theme }) => theme.bg2 || theme.bgtotal};
    border: 1.5px solid
      ${({ theme }) =>
        theme.body === "#fff"
          ? "rgba(15,23,42,0.16)"
          : "rgba(255,255,255,0.16)"};
  }
  &::before {
    top: -6px;
  }
  &::after {
    bottom: -6px;
  }
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
  padding: 4px 6px;
  .cabecera {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-bottom: 10px;
  }
  .cabecera .areacomprobantes {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    padding: 10px 0;
    width: 100%;
  }
  .cabecera .areacomprobantes .box {
    position: relative;
    flex: 1 1 40%;
    min-width: 150px;
    display: flex;
  }
  .cabecera .areacomprobantes .box.seleccionado::after {
    content: "";
    position: absolute;
    left: 10px;
    right: 10px;
    bottom: -2px;
    height: 2px;
    background: ${ACCENT.primary};
    border-radius: 2px;
  }
  .metodos {
    margin-top: 8px;
    width: 100%;
    min-height: 70px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 10px;
  }
  .metodos input {
    color: ${({ theme }) => theme.text} !important;
    font-weight: 700;
    font-size: 28px;
    font-variant-numeric: tabular-nums;
    background: transparent;
    border-bottom: 2px solid
      ${({ theme }) =>
        theme.body === "#fff"
          ? "rgba(15,23,42,0.12)"
          : "rgba(255,255,255,0.12)"};
    transition: border-color 0.2s ease;
  }
  .metodos input:focus {
    border-color: ${ACCENT.primary};
    outline: none;
  }
  .metodos .form__label {
    color: ${({ theme }) => theme.text} !important;
    opacity: 0.6;
  }
  .acciones {
    width: 100%;
    margin-top: 14px;
    flex-shrink: 0;
  }
  .acciones button {
    transition:
      transform 0.15s ease,
      filter 0.15s ease;
  }
  .acciones button:hover {
    filter: brightness(1.05);
  }
  .acciones button:active {
    transform: scale(0.98);
  }
  .acciones button:focus-visible {
    outline: 2px solid ${ACCENT.primary};
    outline-offset: 2px;
  }
  @media (max-width: 700px) {
    padding: 4px;
  }
`;

const ComprobanteActual = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  margin-bottom: 4px;
  .label {
    font-size: 12px;
    opacity: 0.6;
  }
  strong {
    font-size: 15px;
    font-weight: 800;
    font-variant-numeric: tabular-nums;
    color: ${ACCENT.primary};
  }
`;

const ClienteBox = styled.section`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  margin-top: 4px;
  border-radius: 10px;
  background: ${ACCENT.primarySoft2};
  border: 1px solid ${ACCENT.borderSoft};
  .cliente {
    flex: 1;
    min-width: 0;
    font-weight: 700;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const ClienteTitulo = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 13px;
  opacity: 0.6;
  white-space: nowrap;
  svg {
    color: ${ACCENT.primary};
  }
`;

const EditButton = styled.button`
  flex-shrink: 0;
  background: transparent;
  color: ${ACCENT.primary};
  border: 1px solid ${ACCENT.borderSoft};
  border-radius: 50%;
  cursor: pointer;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition:
    background 0.15s ease,
    transform 0.15s ease;
  svg {
    font-size: 16px;
  }
  &:hover {
    background: ${ACCENT.primarySoft};
  }
  &:active {
    transform: scale(0.94);
  }
  &:focus-visible {
    outline: 2px solid ${ACCENT.primary};
    outline-offset: 2px;
  }
`;

const ContentReg = styled.div`
  position: relative;
  z-index: 10;
  width: 100%;
  color: ${ACCENT.primary};
  animation: ${aparecer} 0.2s ease both;
`;

const TotalesBox = styled.section`
  width: 100%;
  box-sizing: border-box;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin-top: 14px;
  border-radius: 10px;
  border: 1px solid
    ${({ theme }) =>
      theme.body === "#fff" ? "rgba(15,23,42,0.08)" : "rgba(255,255,255,0.08)"};
  article {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4px;
    padding: 12px 8px;
    border-right: 1px solid
      ${({ theme }) =>
        theme.body === "#fff"
          ? "rgba(15,23,42,0.08)"
          : "rgba(255,255,255,0.08)"};
  }
  article:last-child {
    border-right: none;
  }
  .label {
    font-size: 11px;
    opacity: 0.55;
  }
  .valor {
    font-size: 16px;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    opacity: 0.55;
  }
  .valor.total {
    color: ${ACCENT.primary};
    opacity: 1;
    font-size: 18px;
  }
  .valor.vuelto.activo {
    opacity: 1;
    color: ${ACCENT.primary};
  }
  .valor.restante.activo {
    opacity: 1;
    color: ${ACCENT.pending};
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
    color: ${ACCENT.primary};
  }
`;

const EfectivoContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 6px;
  padding: 2px 0;
  animation: ${aparecerFila} 0.22s ease both;
`;

const FilaMontos = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

const MontoBox = styled.div`
  padding: 10px 12px;
  min-height: 76px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
  background: ${({ $estado }) =>
    $estado === "completo"
      ? ACCENT.primarySoft
      : $estado === "pendiente"
        ? ACCENT.pendingSoft
        : "transparent"};
  border: 1px solid
    ${({ $estado, theme }) =>
      $estado === "completo"
        ? ACCENT.borderSoft
        : $estado === "pendiente"
          ? ACCENT.pendingBorder
          : theme.body === "#fff"
            ? "rgba(15,23,42,0.08)"
            : "rgba(255,255,255,0.08)"};
  transition:
    background 0.2s ease,
    border-color 0.2s ease;
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-weight: 800;
  font-size: 26px;
  line-height: 1.1;
  font-variant-numeric: tabular-nums;
  text-align: center;
  color: ${({ $estado, theme }) =>
    $estado === "completo"
      ? ACCENT.primary
      : $estado === "pendiente"
        ? ACCENT.pending
        : theme.text};
  opacity: ${({ $estado }) => ($estado === "neutro" ? 0.42 : 1)};
  user-select: none;
  transition:
    opacity 0.2s ease,
    color 0.2s ease;
  svg {
    font-size: 18px;
  }
`;

const Hint = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  font-size: 12px;
  text-align: center;
  color: ${ACCENT.primary};
  opacity: 0.6;
`;

const ManualRow = styled.div`
  display: flex;
  gap: 7px;
  align-items: center;
  input {
    flex: 1;
    min-width: 0;
    padding: 9px 11px;
    border-radius: 8px;
    font-size: 15px !important;
    font-weight: 500 !important;
    font-variant-numeric: tabular-nums;
    border: 1px solid
      ${({ theme }) =>
        theme.body === "#fff"
          ? "rgba(15,23,42,0.12)"
          : "rgba(255,255,255,0.12)"};
    background: transparent;
    color: ${({ theme }) => theme.text} !important;
    transition: border-color 0.2s ease;
  }
  input:focus {
    outline: none;
    border-color: ${ACCENT.primary};
  }
  input:focus-visible {
    outline: 2px solid ${ACCENT.primary};
    outline-offset: 1px;
  }
  button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 9px 13px;
    border-radius: 8px;
    border: 1px solid transparent;
    cursor: pointer;
    font-weight: 700;
    font-size: 13px;
    background-color: ${ACCENT.primary};
    color: #ffffff;
    transition:
      filter 0.15s ease,
      transform 0.15s ease;
  }
  button:hover {
    filter: brightness(1.06);
  }
  button:active {
    transform: scale(0.97);
  }
  button:focus-visible {
    outline: 2px solid ${ACCENT.primary};
    outline-offset: 2px;
  }
  button.limpiar {
    background-color: transparent;
    border-color: ${ACCENT.dangerSoft};
    color: ${ACCENT.danger};
  }
  button.limpiar:hover {
    background-color: ${ACCENT.dangerSoft};
  }
`;

const PaginaDerecha = styled.div`
  flex: 1 1 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 6px 10px;
  h4 {
    display: flex;
    align-items: center;
    gap: 6px;
    margin: 0 0 12px;
    color: ${ACCENT.primary};
    font-size: 15px;
    font-weight: 700;
    align-self: center;
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
    background: ${ACCENT.primary};
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
  min-height: 76px;
  border-radius: 10px;
  border: 1px solid
    ${({ theme }) =>
      theme.body === "#fff" ? "rgba(15,23,42,0.08)" : "rgba(255,255,255,0.08)"};
  background-color: transparent;
  color: ${({ theme }) => theme.text};
  font-weight: 700;
  font-size: 13px;
  font-variant-numeric: tabular-nums;
  cursor: pointer;
  transition:
    transform 0.15s ease,
    background-color 0.15s ease,
    border-color 0.15s ease;
  img {
    width: 34px;
    height: 34px;
    object-fit: contain;
    pointer-events: none;
  }
  &:hover {
    background-color: ${ACCENT.primarySoft2};
    border-color: ${ACCENT.borderSoft};
    transform: translateY(-2px);
  }
  &:active {
    transform: scale(0.96);
  }
  &:focus-visible {
    outline: 2px solid ${ACCENT.primary};
    outline-offset: 2px;
  }
`;
