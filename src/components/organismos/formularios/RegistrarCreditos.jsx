import { useEffect, useState } from "react";
import styled, { keyframes, useTheme } from "styled-components";
import { v } from "../../../styles/variables";
import {
  InputText,
  Btn1,
  SelectList,
  Switch1,
  BtnClose,
  useInsetarCreditosMutationStack,
  useMostrarClientesQueryStack,
} from "../../../index";
import { useForm } from "react-hook-form";
import { Toaster } from "sonner";
import { BeatLoader } from "react-spinners";

const telaranaAnim = keyframes`
  0%, 100% { opacity: 0.025; transform: rotate(0deg) scale(1); }
  50% { opacity: 0.055; transform: rotate(1.5deg) scale(1.015); }
`;

const murcielagoVolar = keyframes`
  0% { transform: translateX(-120px) translateY(0) rotate(-3deg); }
  20% { transform: translateX(20vw) translateY(-8px) rotate(3deg); }
  40% { transform: translateX(45vw) translateY(6px) rotate(-2deg); }
  60% { transform: translateX(70vw) translateY(-6px) rotate(2deg); }
  80% { transform: translateX(90vw) translateY(4px) rotate(-2deg); }
  100% { transform: translateX(calc(100vw + 120px)) translateY(0) rotate(2deg); }
`;

const aletear = keyframes`
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(0.55); }
`;

const arañaCaer = keyframes`
  from { transform: translateY(-45px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
`;

const arañaBalancear = keyframes`
  0%, 100% { transform: rotate(-5deg); }
  50% { transform: rotate(5deg); }
`;

const aparecer = keyframes`
  from { opacity: 0; margin-top: 10px; }
  to { opacity: 1; margin-top: 0; }
`;

const telaranaPaths = `
M0 0 L180 0
M0 0 L165 70
M0 0 L125 125
M0 0 L70 165
M0 0 L0 180
M30 0 Q28 18 0 30
M60 0 Q58 34 0 60
M90 0 Q86 50 0 90
M120 0 Q114 68 0 120
M150 0 Q144 85 0 150
`;

const WebSvg = ({ flip = false }) => (
  <svg
    viewBox="0 0 180 180"
    width="180"
    height="180"
    aria-hidden="true"
    style={{ transform: flip ? "scaleX(-1)" : "none" }}
  >
    <path
      d={telaranaPaths}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
    />
  </svg>
);

const MurcielagoSvg = () => (
  <svg viewBox="0 0 64 32" width="100%" height="100%" aria-hidden="true">
    <path
      d="M32 10 C30 6 28 4 26 3 C26 7 25 9 23 10 C18 6 10 5 2 8 C6 10 7 13 6 17 C10 14 14 14 17 17 C19 14 22 14 24 16 C26 18 29 19 32 24 C35 19 38 18 40 16 C42 14 45 14 47 17 C50 14 54 14 58 17 C57 13 58 10 62 8 C54 5 46 6 41 10 C39 9 38 7 38 3 C36 4 34 6 32 10 Z"
      fill="currentColor"
    />
    <circle cx="29.5" cy="13" r="0.9" fill="#ff4b55" />
    <circle cx="34.5" cy="13" r="0.9" fill="#ff4b55" />
  </svg>
);

const AranaSvg = () => (
  <svg viewBox="0 0 60 60" width="100%" height="100%" aria-hidden="true">
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
      strokeWidth="1.5"
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
    <path d="M30 32 L34 38 L30 44 L26 38 Z" fill="#d56b18" />
    <circle cx="27.5" cy="22.5" r="1.5" fill="#e9424f" />
    <circle cx="32.5" cy="22.5" r="1.5" fill="#e9424f" />
  </svg>
);

export function RegistrarCreditos({
  onClose,
  dataSelect,
  setIsExploding,
  accion,
}) {
  const [stateCreditos, setStateCreditos] = useState(false);
  const [clienteSeleccionado, setClienteSeleccionado] = useState(null);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const theme = useTheme();
  const { data: dataclipro } = useMostrarClientesQueryStack();
  const { isPending, mutate: doInsertar } = useInsetarCreditosMutationStack({
    cerrarFormulario,
    accion,
    dataSelect,
    clienteSeleccionado,
  });
  const handlesub = (data) => {
    doInsertar(data);
  };
  function cerrarFormulario() {
    onClose();
    setIsExploding(true);
  }
  useEffect(() => {
    if (!dataclipro) return;
    if (accion === "Editar" && dataSelect) {
      const clienteDelCredito = dataclipro.find(
        (c) => c.id === dataSelect.id_cliente,
      );
      setClienteSeleccionado(clienteDelCredito || dataclipro[0]);
    } else {
      setClienteSeleccionado(dataclipro[0]);
    }
  }, [accion, dataSelect, dataclipro]);
  return (
    <Container>
      <Toaster richColors />
      <Decoracion>
        <WebCorner className="web-left">
          <WebSvg />
        </WebCorner>
        <WebCorner className="web-right">
          <WebSvg flip />
        </WebCorner>
        <Bat style={{ animationDuration: "34s", animationDelay: "-8s" }}>
          <BatInner>
            <MurcielagoSvg />
          </BatInner>
        </Bat>
        <Spider style={{ left: "4%", height: "115px", animationDelay: "0.2s" }}>
          <SpiderInner>
            <AranaSvg />
          </SpiderInner>
        </Spider>
        <Spider
          style={{ right: "4%", height: "145px", animationDelay: "0.5s" }}
        >
          <SpiderInner>
            <AranaSvg />
          </SpiderInner>
        </Spider>
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
              {accion == "Editar"
                ? "Editar crédito"
                : "Registrar nuevo crédito "}
            </section>
            <section>
              <BtnClose funcion={onClose} />
            </section>
          </div>
          <form className="formulario" onSubmit={handleSubmit(handlesub)}>
            <section className="form-subcontainer">
              <ContainerSelector>
                <label>Clientes: </label>
                <SelectList
                  data={dataclipro}
                  itemSelect={clienteSeleccionado}
                  onSelect={setClienteSeleccionado}
                  displayField="nombres"
                />
              </ContainerSelector>
              <article>
                <InputText icono={<v.iconoflechaderecha />}>
                  <input
                    className="form__field"
                    type="number"
                    placeholder="Cupo maximno"
                    defaultValue={dataSelect.cupo_maximo}
                    {...register("cupo_maximo", { required: true })}
                  />
                  <label className="form__label">Cupo Maximo</label>
                  {errors.cupo_maximo?.type === "required" && (
                    <p>Campo requerido</p>
                  )}
                </InputText>
              </article>
              <span>
                <strong>¿Crédito antiguo?</strong>
              </span>
              <Switch1
                state={stateCreditos}
                setState={() => setStateCreditos(!stateCreditos)}
              />
              {stateCreditos && (
                <article>
                  <InputText icono={<v.iconoflechaderecha />}>
                    <input
                      className="form__field"
                      type="number"
                      placeholder="Debe..."
                      defaultValue={dataSelect.saldo_actual}
                      {...register("saldo_actual", { required: true })}
                    />
                    <label className="form__label">Debe...</label>
                    {errors.saldo_actual?.type === "required" && (
                      <p>Campo requerido</p>
                    )}
                  </InputText>
                </article>
              )}
              <Btn1
                icono={<v.iconoguardar />}
                titulo="Guardar"
                bgcolor="#b85c18"
              />
            </section>
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
  display: flex;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  overflow: hidden;
  .sub-contenedor {
    position: relative;
    width: 500px;
    max-width: 85%;
    border-radius: 20px;
    background: ${({ theme }) => theme.body};
    box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
    padding: 13px 36px 20px 36px;
    z-index: 100;
    animation: ${aparecer} 0.4s ease forwards;
    .headers {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      position: relative;
      z-index: 2;
      h1 {
        font-size: 20px;
        font-weight: 500;
      }
      span {
        font-size: 20px;
        cursor: pointer;
      }
    }
    .formulario {
      position: relative;
      z-index: 2;
      .form-subcontainer {
        gap: 20px;
        display: flex;
        flex-direction: column;
      }
    }
  }
`;

const Decoracion = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 1;
`;

const WebCorner = styled.div`
  position: absolute;
  top: -12px;
  width: 180px;
  height: 180px;
  color: ${({ theme }) => theme.halloweenPrimary || "#a85b20"};
  opacity: 0.05;
  animation: ${telaranaAnim} 8s ease-in-out infinite;
  transform-origin: top center;
  &.web-left {
    left: -12px;
  }
  &.web-right {
    right: -12px;
    animation-delay: -3s;
  }
`;

const Bat = styled.div`
  position: absolute;
  top: 14%;
  left: -120px;
  width: 48px;
  height: 24px;
  color: ${({ theme }) => theme.halloweenPrimary || "#7d5d43"};
  opacity: 0.14;
  animation: ${murcielagoVolar} 34s linear infinite;
  will-change: transform;
`;

const BatInner = styled.div`
  width: 100%;
  height: 100%;
  animation: ${aletear} 0.3s ease-in-out infinite alternate;
  filter: drop-shadow(0 0 3px rgba(255, 122, 24, 0.08));
  will-change: transform;
`;

const Spider = styled.div`
  position: absolute;
  top: 0;
  color: ${({ theme }) => theme.halloweenPrimary || "#765438"};
  opacity: 0.1;
  transform-origin: top center;
  animation: ${arañaCaer} 1s cubic-bezier(0.22, 1, 0.36, 1) both;
  will-change: transform;
`;

const SpiderInner = styled.div`
  width: 100%;
  height: 100%;
  transform-origin: top center;
  animation: ${arañaBalancear} 5s ease-in-out infinite alternate;
  svg {
    display: block;
  }
`;

export const ContainerSelector = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  position: relative;
`;

const ConteinerLoader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 8px;
`;
