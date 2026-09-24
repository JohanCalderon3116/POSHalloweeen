import styled, { keyframes, useTheme } from "styled-components";
import { v } from "../../../styles/variables";
import {
  InputText,
  Btn1,
  useProductosStore,
  Switch1,
  useSucursalesStore,
  Checkbox1,
  Btngenerarcodigo,
  useAlmacenesStore,
  SelectList,
  BtnClose,
  useCategoriasStore,
  useMostrarStckAlmacenYProductoQueryStack,
  useInsertarProductosMutationStack,
  useMostrarAlmacenesXSucursalItemSelectQueryStack,
  EliminarStock,
} from "../../../index";
import { useForm } from "react-hook-form";
import { Device } from "../../../styles/breakpoints";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { ContainerSelector } from "./RegistrarInventario";
import { BeatLoader } from "react-spinners";
import { toast } from "sonner";
const telaranaAnim = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.85);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;
const murcielagoVolar = keyframes`
  0% {
    transform: translateX(-120px) translateY(0);
  }
  50% {
    transform: translateX(40px) translateY(-20px);
  }
  100% {
    transform: translateX(200px) translateY(0);
  }
`;
const aletar = keyframes`
  0%,
  100% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(0.75);
  }
`;
const arañaCaer = keyframes`
  0% {
    transform: translateY(-120px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
`;
const arañaBalancear = keyframes`
  0%,
  100% {
    transform: rotate(-5deg);
  }
  50% {
    transform: rotate(5deg);
  }
`;
const aparecer = keyframes`
  from {
    opacity: 0;
    margin-top: 10px;
  }
  to {
    opacity: 1;
    margin-top: 0;
  }
`;
const telaranaPaths = `
  M0 0 Q40 40 80 0
  M0 0 Q40 80 80 0
  M0 0 Q40 120 80 0
  M0 0 Q40 160 80 0
  M0 20 Q40 60 80 20
  M0 40 Q40 80 80 40
  M0 60 Q40 100 80 60
`;
function WebSvg({ flip = false }) {
  return (
    <svg
      viewBox="0 0 80 160"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: flip ? "scaleX(-1)" : "none" }}
    >
      <g fill="none" stroke="currentColor" strokeWidth="1.2" opacity="0.7">
        <path d="M0 0 L80 0" />
        <path d="M0 0 L0 160" />
        <path d={telaranaPaths} />
      </g>
    </svg>
  );
}
function MurcielagoSvg() {
  return (
    <svg viewBox="0 0 120 60" xmlns="http://www.w3.org/2000/svg">
      <g fill="currentColor">
        <ellipse cx="60" cy="32" rx="10" ry="17" />
        <path d="M52 25 C38 10 25 8 5 5 C17 18 18 31 34 38 C42 41 48 36 52 32 Z" />
        <path d="M68 25 C82 10 95 8 115 5 C103 18 102 31 86 38 C78 41 72 36 68 32 Z" />
        <circle cx="55" cy="17" r="3" />
        <circle cx="65" cy="17" r="3" />
      </g>
    </svg>
  );
}
function AranaSvg() {
  return (
    <svg viewBox="0 0 100 120" xmlns="http://www.w3.org/2000/svg">
      <g fill="currentColor">
        <ellipse cx="50" cy="60" rx="17" ry="25" />
        <circle cx="50" cy="32" r="14" />
        <circle cx="45" cy="29" r="2" fill="white" />
        <circle cx="55" cy="29" r="2" fill="white" />
        <path
          d="M35 48 C15 38 10 25 4 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M34 58 C15 55 8 48 2 42"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M34 68 C15 70 8 78 2 86"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M35 78 C18 86 12 98 8 108"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M65 48 C85 38 90 25 96 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M66 58 C85 55 92 48 98 42"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M66 68 C85 70 92 78 98 86"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d="M65 78 C82 86 88 98 92 108"
          fill="none"
          stroke="currentColor"
          strokeWidth="5"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
const Decoracion = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
`;
const WebCorner = styled.div`
  position: absolute;
  top: 0;
  width: 120px;
  height: 160px;
  color: ${({ theme }) => theme.halloweenPrimary || "#b85c18"};
  opacity: 0.32;
  animation: ${telaranaAnim} 0.8s ease forwards;
  svg {
    width: 100%;
    height: 100%;
  }
  &.web-left {
    left: 0;
  }
  &.web-right {
    right: 0;
  }
`;
const Bat = styled.div`
  position: absolute;
  top: 10%;
  left: -100px;
  width: 65px;
  color: ${({ theme }) => theme.halloweenPrimary || "#b85c18"};
  opacity: 0.5;
  animation: ${murcielagoVolar} 10s ease-in-out infinite;
`;
const BatInner = styled.div`
  animation: ${aletar} 0.4s ease-in-out infinite;
  svg {
    width: 100%;
  }
`;
const Spider = styled.div`
  position: absolute;
  top: 0;
  right: 7%;
  width: 45px;
  color: ${({ theme }) => theme.halloweenPrimary || "#b85c18"};
  opacity: 0.55;
  transform-origin: top center;
  animation:
    ${arañaCaer} 1s ease forwards,
    ${arañaBalancear} 4s ease-in-out infinite 1s;
  &::before {
    content: "";
    position: absolute;
    top: -90px;
    left: 50%;
    width: 1px;
    height: 90px;
    background: ${({ theme }) => theme.halloweenPrimary || "#b85c18"};
    opacity: 0.45;
  }
  svg {
    width: 100%;
  }
`;
const SpiderSecond = styled(Spider)`
  right: auto;
  left: 8%;
  width: 38px;
  opacity: 0.4;
  animation:
    ${arañaCaer} 1.3s ease forwards,
    ${arañaBalancear} 5s ease-in-out infinite 1.3s;
`;

export function RegistrarProductos({
  onClose,
  dataSelect,
  accion,
  setIsExploding,
  state,
}) {
  if (!state) {
    return;
  }
  const [isCheked1, setIsCheked1] = useState(true);
  const [isCheked2, setIsCheked2] = useState(false);
  const [stockMinimo, setStockMinimo] = useState("");
  const [stock, setStock] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const handleCheckboxChange = (cheboxNumber) => {
    if (cheboxNumber === 1) {
      setIsCheked1(true);
      setIsCheked2(false);
      setSevendePor("Unidad");
    } else {
      setIsCheked1(false);
      setIsCheked2(true);
      setSevendePor("Peso (Kg)");
    }
  };
  const {
    generarCodigo,
    codigogenerado,
    refetchs,
    setRandomCodeInterno,
    randomCodeInterno,
    randomCodeBarras,
    setRandomCodeBarras,
    setSevendePor,
    stateInventarios,
    setStateInventarios,
  } = useProductosStore();
  const { dataalmacen, almacenSelelctItem, setAlmacenSelelctItem } =
    useAlmacenesStore();
  const [stateEnabledStock, setstatEEnabledStock] = useState(false);
  const { datacategorias, selectCategoria, categoriaItemSelect } =
    useCategoriasStore();
  const { sucursalesItemSelect, dataSucursales, selectSucursal } =
    useSucursalesStore();
  const theme = useTheme();
  const { data: dataStockXAlamacenYProducto } =
    useMostrarStckAlmacenYProductoQueryStack({
      dataSelect,
    });
  const { data: dataAlmacenes } =
    useMostrarAlmacenesXSucursalItemSelectQueryStack();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { isPending, mutate: doInsertar } = useInsertarProductosMutationStack({
    accion,
    dataSelect,
    validarVacios,
    cerrarFormulario,
  });
  const handlesub = (data) => {
    doInsertar(data);
  };
  function cerrarFormulario() {
    onClose();
    setIsExploding(true);
  }
  function validarVacios(data) {
    if (!randomCodeInterno) {
      generarCodigoInterno();
    }
    if (!randomCodeBarras) {
      generarCodigoBarras();
    }
    if (data.precio_venta.trim() === "") {
      data.precio_venta = 0;
    }
    if (data.precio_compra.trim() === "") {
      data.precio_compra = 0;
    }
    if (stateInventarios) {
      if (!dataalmacen) {
        if (data.stock.trim() === "") {
          data.stock = 0;
        }
        if (data.stock_minimo.trim() === "") {
          data.stock_minimo = 0;
        }
      }
    }
  }
  function generarCodigoInterno() {
    generarCodigo();
    setRandomCodeInterno(codigogenerado);
    dataSelect.codigo_interno = codigogenerado;
  }
  function generarCodigoBarras() {
    generarCodigo();
    setRandomCodeBarras(codigogenerado);
    dataSelect.codigo_barra = codigogenerado;
  }
  const handleChangeinterno = (event) => {
    setRandomCodeInterno(event.target.value);
  };
  const handleChangebarras = (event) => {
    setRandomCodeBarras(event.target.value);
  };
  useEffect(() => {
    if (accion != "Editar") {
      generarCodigoInterno();
      setRandomCodeBarras("");
    } else {
      selectCategoria({
        id: dataSelect.id_categoria,
        nombre: dataSelect.categoria,
      });
      setRandomCodeInterno(dataSelect.codigo_interno);
      setRandomCodeBarras(dataSelect.codigo_barra);
      if (dataSelect.sevende_por === "Unidad") {
        handleCheckboxChange(1);
      } else {
        handleCheckboxChange(0);
      }
      dataSelect.maneja_inventarios
        ? setStateInventarios(true)
        : setStateInventarios(false);
      dataSelect.maneja_inventarios
        ? setstatEEnabledStock(true)
        : setstatEEnabledStock(false);
    }
  }, []);
  function checkUseInventarios() {
    if (accion === "Editar") {
      if (dataalmacen) {
        if (stateInventarios) {
          Swal.fire({
            title: "¿Estás seguro(a)?",
            text: "Si desactiva esta opción se elimina el stock",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: theme.halloweenPrimary,
            cancelButtonColor: theme.halloweenDanger,
            confirmButtonText: "Si, eliminar",
            background: theme.bg2,
            color: theme.text,
          }).then(async (result) => {
            if (result.isConfirmed) {
              setStateInventarios(false);
              await EliminarStock({
                id: dataStockXAlamacenYProducto.id,
              });
              toast.success("¡Listo! Borraste el stock correctamente 🗑️");
            }
          });
        } else {
          setStateInventarios(true);
        }
      } else {
        setStateInventarios(!stateInventarios);
      }
    } else {
      setStateInventarios(!stateInventarios);
    }
  }
  useEffect(() => {
    setStock("");
    setStockMinimo("");
    setUbicacion("");
  }, [almacenSelelctItem]);

  return (
    <Container>
      <Decoracion>
        <WebCorner className="web-left">
          <WebSvg />
        </WebCorner>
        <WebCorner className="web-right">
          <WebSvg flip />
        </WebCorner>
        <Bat>
          <BatInner>
            <MurcielagoSvg />
          </BatInner>
        </Bat>
        <Spider>
          <AranaSvg />
        </Spider>
        <SpiderSecond>
          <AranaSvg />
        </SpiderSecond>
      </Decoracion>
      {isPending ? (
        <ConteinerLoader>
          <span>
            <strong>Guardando</strong>
          </span>
          <BeatLoader color={theme.halloweenPrimary || theme.text} size={8} />
        </ConteinerLoader>
      ) : (
        <div className="sub-contenedor">
          <div className="headers">
            <section>
              <h1>
                {accion == "Editar"
                  ? "Editar producto"
                  : "Registrar nuevo producto"}
              </h1>
            </section>
            <section>
              <BtnClose
                funcion={() => {
                  onClose();
                  refetchs;
                }}
              ></BtnClose>
            </section>
          </div>
          <form className="formulario" onSubmit={handleSubmit(handlesub)}>
            <section className="section1">
              <article>
                <InputText icono={<v.iconoflechaderecha />}>
                  <input
                    className="form__field"
                    defaultValue={dataSelect.nombre}
                    type="text"
                    placeholder="nombre"
                    {...register("nombre", { required: true })}
                  />
                  <label className="form__label">Nombre</label>
                  {errors.nombre?.type === "required" && <p>Campo requerido</p>}
                </InputText>
              </article>
              <article>
                <InputText icono={<v.iconoflechaderecha />}>
                  <input
                    className="form__field"
                    defaultValue={dataSelect.precio_venta}
                    type="number"
                    step="0.01"
                    placeholder="precio venta"
                    {...register("precio_venta", {})}
                  />
                  <label className="form__label">Precio venta</label>
                </InputText>
              </article>
              <article>
                <InputText icono={<v.iconoflechaderecha />}>
                  <input
                    className="form__field"
                    defaultValue={dataSelect.precio_compra}
                    type="number"
                    step="0.01"
                    placeholder="precio compra"
                    {...register("precio_compra", {})}
                  />
                  <label className="form__label">Precio compra</label>
                </InputText>
              </article>
              <article className="contentPadregenerar">
                <InputText icono={<v.iconoflechaderecha />}>
                  <input
                    className="form__field"
                    value={randomCodeBarras}
                    onChange={handleChangebarras}
                    type="number"
                    placeholder="codigo de barras"
                  />
                  <label className="form__label">Codigo de barras</label>
                </InputText>
                <ContainerBtnGenerar>
                  <Btngenerarcodigo
                    titulo="Generar"
                    funcion={generarCodigoBarras}
                  ></Btngenerarcodigo>
                </ContainerBtnGenerar>
              </article>
              <article className="contentPadregenerar">
                <InputText icono={<v.iconoflechaderecha />}>
                  <input
                    className="form__field"
                    value={randomCodeInterno}
                    onChange={handleChangeinterno}
                    type="text"
                    placeholder="codigo interno"
                  />
                  <label className="form__label">Codigo interno</label>
                </InputText>
                <ContainerBtnGenerar>
                  <Btngenerarcodigo
                    titulo="Generar"
                    funcion={generarCodigoInterno}
                  ></Btngenerarcodigo>
                </ContainerBtnGenerar>
              </article>
            </section>
            <section className="section2">
              <label>Se vende por: </label>
              <ContainerSelector>
                <label>Unidad</label>
                <Checkbox1
                  isChecked={isCheked1}
                  onChange={() => handleCheckboxChange(1)}
                ></Checkbox1>
                <label>Pesado (decimales)</label>
                <Checkbox1
                  isChecked={isCheked2}
                  onChange={() => handleCheckboxChange(2)}
                ></Checkbox1>
              </ContainerSelector>
              <ContainerSelector>
                <label>Categoria</label>
                <SelectList
                  data={datacategorias}
                  itemSelect={categoriaItemSelect}
                  onSelect={selectCategoria}
                  displayField="nombre"
                ></SelectList>
              </ContainerSelector>
              <ContainerSelector>
                <label>Controlar stock:</label>
                <Switch1
                  state={stateInventarios}
                  setState={checkUseInventarios}
                ></Switch1>
              </ContainerSelector>
              {stateInventarios && (
                <ContainerStock>
                  <ContainerSelector>
                    <label>Sucursal: </label>
                    <SelectList
                      data={dataSucursales}
                      itemSelect={sucursalesItemSelect}
                      onSelect={selectSucursal}
                      displayField="nombre"
                    ></SelectList>
                  </ContainerSelector>
                  <br />
                  <ContainerSelector>
                    <label>Almacen: </label>
                    <SelectList
                      data={dataAlmacenes}
                      itemSelect={almacenSelelctItem}
                      onSelect={setAlmacenSelelctItem}
                      displayField="nombre"
                    ></SelectList>
                  </ContainerSelector>
                  {stateEnabledStock && dataStockXAlamacenYProducto && (
                    <ContainerMensajeStock>
                      💀 Para poder editar el stock, te toca en el modulo
                      'Inventario' 💀 XD
                    </ContainerMensajeStock>
                  )}
                  <article>
                    <InputText icono={<v.iconoflechaderecha />}>
                      <input
                        disabled={!!dataStockXAlamacenYProducto}
                        className="form__field"
                        value={
                          dataStockXAlamacenYProducto
                            ? (dataStockXAlamacenYProducto.stock ?? "")
                            : stock
                        }
                        type="number"
                        step="0.01"
                        placeholder="stock "
                        {...register("stock", {})}
                        onChange={(e) => setStock(e.target.value)}
                      />
                      <label className="form__label">Stock</label>
                    </InputText>
                  </article>
                  <article>
                    <InputText icono={<v.iconoflechaderecha />}>
                      <input
                        disabled={!!dataStockXAlamacenYProducto}
                        className="form__field"
                        value={
                          dataStockXAlamacenYProducto
                            ? (dataStockXAlamacenYProducto.stock_minimo ?? "")
                            : stockMinimo
                        }
                        type="number"
                        step="0.01"
                        placeholder="stock minimo"
                        {...register("stock_minimo", {})}
                        onChange={(e) => setStockMinimo(e.target.value)}
                      />
                      <label className="form__label">Stock minimo</label>
                    </InputText>
                  </article>
                  <article>
                    <InputText icono={<v.iconoflechaderecha />}>
                      <input
                        disabled={!!dataStockXAlamacenYProducto}
                        className="form__field"
                        value={
                          dataStockXAlamacenYProducto
                            ? (dataStockXAlamacenYProducto.ubicacion ?? "")
                            : ubicacion
                        }
                        type="text"
                        placeholder="ubicacion"
                        {...register("ubicacion", {})}
                        onChange={(e) => setUbicacion(e.target.value)}
                      />
                      <label className="form__label">Ubicación</label>
                    </InputText>
                  </article>
                </ContainerStock>
              )}
            </section>
            <Btn1
              icono={<v.iconoguardar />}
              titulo="Guardar"
              bgcolor="#b85c18"
            />
          </form>
        </div>
      )}
    </Container>
  );
}

const Container = styled.div`
  transition: 0.5s;
  top: 0;
  left: 0;
  position: fixed;
  backdrop-filter: blur(3px);
  display: flex;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  overflow: hidden;
  .sub-contenedor {
    position: relative;
    max-width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    border-radius: 18px;
    background: ${({ theme }) => theme.body};
    box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
    padding: 13px 36px 20px 36px;
    z-index: 100;
    overflow-x: hidden;
    animation: ${aparecer} 0.4s ease forwards;
    .headers {
      position: relative;
      z-index: 5;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      h1 {
        font-size: 25px;
        font-weight: 500;
        color: ${({ theme }) => theme.text};
      }
      span {
        font-size: 20px;
        cursor: pointer;
      }
    }
    .formulario {
      position: relative;
      z-index: 5;
      display: grid;
      grid-template-columns: 1fr;
      gap: 15px;
      @media ${Device.tablet} {
        grid-template-columns: repeat(2, 1fr);
      }
      .section1,
      .section2 {
        gap: 20px;
        display: flex;
        flex-direction: column;
      }
      .contentPadregenerar {
        position: relative;
      }
    }
    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.halloweenPrimary || "#b85c18"};
      border-radius: 10px;
      opacity: 0.5;
    }
    @media ${v.bplisa} {
      max-width: 92%;
      padding: 13px 25px 20px 25px;
    }
    @media ${v.bpmarge} {
      max-width: 95%;
      padding: 13px 18px 20px 18px;
      .headers {
        h1 {
          font-size: 20px;
        }
      }
    }
  }
`;

const ContainerStock = styled.div`
  border: 1px solid rgba(184, 92, 24, 0.35);
  display: flex;
  border-radius: 12px;
  padding: 12px;
  flex-direction: column;
  background-color: transparent;
  transition: 0.3s;
  &:hover {
    border-color: rgba(184, 92, 24, 0.5);
  }
`;

const ContainerBtnGenerar = styled.div`
  position: absolute;
  right: 0px;
  top: 10%;
`;

const ContainerMensajeStock = styled.div`
  text-align: center;
  color: #f9184c;
  background-color: rgba(249, 24, 35, 0.12);
  border: 1px solid rgba(249, 24, 35, 0.18);
  border-radius: 10px;
  padding: 5px;
  margin: 10px;
`;

const ConteinerLoader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 8px;
  height: 100vh;
  color: ${({ theme }) => theme.text};
  span {
    strong {
      font-size: 18px;
    }
  }
`;
