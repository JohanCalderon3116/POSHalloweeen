import styled, { keyframes, useTheme } from "styled-components";
import { v } from "../../../styles/variables";
import {
  InputText,
  Btn1,
  useClientesProveedoresStore,
  BtnClose,
  useInsertarClientesProveedoresMutationStack,
} from "../../../index";
import { useForm } from "react-hook-form";
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

export function RegistrarClientesProveedores({
  onClose,
  dataSelect,
  accion,
  setIsExploding,
}) {
  const { tipo } = useClientesProveedoresStore();
  const theme = useTheme();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { isPending, mutate: doInsertar } =
    useInsertarClientesProveedoresMutationStack({
      accion,
      dataSelect,
      cerrarFormulario,
    });
  const handlesub = (data) => {
    doInsertar(data);
  };
  function cerrarFormulario() {
    onClose();
    setIsExploding(true);
  }
  
  return (
    <Container>
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
              <h1>
                {accion === "Editar"
                  ? "Editar " + tipo
                  : "Registrar nuevo " + tipo}
              </h1>
            </section>
            <section>
              <BtnClose funcion={onClose} />
            </section>
          </div>
          <form className="formulario" onSubmit={handleSubmit(handlesub)}>
            <section className="form-subcontainer">
              <article>
                <InputText icono={<v.iconoflechaderecha />}>
                  <input
                    className="form__field"
                    defaultValue={dataSelect.nombres}
                    type="text"
                    placeholder="Nombre"
                    {...register("nombres", { required: true })}
                  />
                  <label className="form__label">Nombre</label>
                  {errors.nombres?.type === "required" && (
                    <p>Campo requerido</p>
                  )}
                </InputText>
              </article>
              <article>
                <InputText icono={<v.iconoflechaderecha />}>
                  <input
                    className="form__field"
                    defaultValue={dataSelect.direccion}
                    type="text"
                    placeholder="Dirección"
                    {...register("direccion", { required: true })}
                  />
                  <label className="form__label">Dirección</label>
                  {errors.direccion?.type === "required" && (
                    <p>Campo requerido</p>
                  )}
                </InputText>
              </article>
              <article>
                <InputText icono={<v.iconoflechaderecha />}>
                  <input
                    className="form__field"
                    defaultValue={dataSelect.telefono}
                    type="number"
                    placeholder="Telefono"
                    {...register("telefono", { required: true })}
                  />
                  <label className="form__label">Telefono</label>
                  {errors.telefono?.type === "required" && (
                    <p>Campo requerido</p>
                  )}
                </InputText>
              </article>
              <article>
                <InputText icono={<v.iconoflechaderecha />}>
                  <input
                    className="form__field"
                    defaultValue={dataSelect.email}
                    type="email"
                    placeholder="Email"
                    {...register("email", { required: true })}
                  />
                  <label className="form__label">Email</label>
                  {errors.email?.type === "required" && <p>Campo requerido</p>}
                </InputText>
              </article>
              <article>
                <InputText icono={<v.iconoflechaderecha />}>
                  <input
                    className="form__field"
                    defaultValue={dataSelect.identificador_nacional}
                    type="number"
                    placeholder="Identificador_nacional"
                    {...register("identificador_nacional", { required: true })}
                  />
                  <label className="form__label">C.C</label>
                  {errors.identificador_nacional?.type === "required" && (
                    <p>Campo requerido</p>
                  )}
                </InputText>
              </article>
              <article>
                <InputText icono={<v.iconoflechaderecha />}>
                  <input
                    className="form__field"
                    defaultValue={dataSelect.identificador_fiscal}
                    type="number"
                    placeholder="Identificador_fiscal"
                    {...register("identificador_fiscal")}
                  />
                  <label className="form__label">
                    Identificador Empresa (NIT) (Opcional)
                  </label>
                </InputText>
              </article>
              <Btn1
                icono={<v.iconoguardar />}
                titulo="Guardar"
                bgcolor={theme.halloweenPrimary || "#b85c18"}
                color={theme.body === "#fff" ? "#ffffff" : "#111111"}
              />
            </section>
          </form>
        </div>
      )}
    </Container>
  );
}

const Container = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 20px;
  box-sizing: border-box;
  backdrop-filter: blur(5px);
  .sub-contenedor {
    position: relative;
    width: 500px;
    max-width: 90vw;
    max-height: calc(100vh - 40px);
    overflow-y: auto;
    overflow-x: hidden;
    border-radius: 18px;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
    padding: 18px 36px 24px;
    z-index: 5;
    animation: ${aparecer} 0.4s ease forwards;
    scrollbar-width: thin;
    scrollbar-color: ${({ theme }) => theme.halloweenPrimary || "#a8a8a8"}
      transparent;
    &::-webkit-scrollbar {
      width: 6px;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) => theme.halloweenPrimary || "#777777"};
      border-radius: 10px;
    }
    .headers {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      position: relative;
      z-index: 2;
      h1 {
        font-size: 20px;
        font-weight: 700;
        margin: 0;
        color: ${({ theme }) => theme.text};
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
        article {
          animation: ${aparecer} 0.25s ease both;
        }
        article:nth-child(1) {
          animation-delay: 0.03s;
        }
        article:nth-child(2) {
          animation-delay: 0.06s;
        }
        article:nth-child(3) {
          animation-delay: 0.09s;
        }
        article:nth-child(4) {
          animation-delay: 0.12s;
        }
        article:nth-child(5) {
          animation-delay: 0.15s;
        }
        article:nth-child(6) {
          animation-delay: 0.18s;
        }
        p {
          color: #eb5360;
          font-size: 12px;
          font-weight: 700;
          margin: 5px 0 0;
        }
        > button {
          margin-top: 3px;
          transition:
            transform 0.18s ease,
            filter 0.18s ease,
            box-shadow 0.18s ease;
          &:hover {
            transform: translateY(-2px);
            filter: brightness(1.04);
            box-shadow: 0 7px 18px rgba(255, 122, 24, 0.1);
          }
          &:active {
            transform: scale(0.98);
          }
        }
      }
    }
  }
  @media (max-width: 700px) {
    padding: 12px;
    .sub-contenedor {
      width: 100%;
      max-width: 96vw;
      max-height: calc(100vh - 24px);
      padding: 16px 20px 22px;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .sub-contenedor,
    .sub-contenedor .form-subcontainer article,
    .sub-contenedor .form-subcontainer > button {
      animation: none !important;
    }
  }
`;

const Decoracion = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 1;
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background:
      radial-gradient(
        circle at 8% 12%,
        rgba(255, 122, 24, 0.035),
        transparent 26%
      ),
      radial-gradient(
        circle at 92% 86%,
        rgba(194, 87, 15, 0.025),
        transparent 28%
      );
  }
  @media (prefers-reduced-motion: reduce) {
    & * {
      animation: none !important;
    }
  }
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

const ConteinerLoader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 8px;
  min-height: 320px;
  strong {
    color: ${({ theme }) => theme.text};
  }
`;
