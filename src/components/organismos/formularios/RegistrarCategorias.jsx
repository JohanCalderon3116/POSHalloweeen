import { useEffect, useRef, useState } from "react";
import styled, { keyframes, useTheme } from "styled-components";
import { v } from "../../../styles/variables";
import {
  InputText,
  Btn1,
  Icono,
  BtnClose,
  useCategoriasStore,
  useInsertarCategoriasMutationStack,
} from "../../../index";
import { useForm } from "react-hook-form";
import { CirclePicker } from "react-color";
import { BeatLoader } from "react-spinners";
const telaranaAnim = keyframes`
  0% { opacity: 0; transform: scale(0.85); }
  100% { opacity: 1; transform: scale(1); }
`;
const murcielagoVolar = keyframes`
  0% { transform: translateX(-120px) translateY(0); }
  50% { transform: translateX(40px) translateY(-20px); }
  100% { transform: translateX(200px) translateY(0); }
`;
const aletar = keyframes`
  0%, 100% { transform: scaleY(1); }
  50% { transform: scaleY(0.75); }
`;
const arañaCaer = keyframes`
  0% { transform: translateY(-120px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
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
  M0 0 Q40 40 80 0
  M0 0 Q40 80 80 0
  M0 0 Q40 120 80 0
  M0 0 Q40 160 80 0
  M0 20 Q40 60 80 20
  M0 40 Q40 80 80 40
  M0 60 Q40 100 80 60
`
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
  opacity: 0.35;
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
  opacity: 0.55;
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
  opacity: 0.6;
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
    opacity: 0.5;
  }
  svg {
    width: 100%;
  }
`;
const SpiderSecond = styled(Spider)`
  right: auto;
  left: 8%;
  width: 38px;
  opacity: 0.45;
  animation:
    ${arañaCaer} 1.3s ease forwards,
    ${arañaBalancear} 5s ease-in-out infinite 1.3s;
`;

export function RegistrarCategorias({
  onClose,
  dataSelect,
  accion,
  setIsExploding,
}) {
  const { currentColor, setColor, setFile } = useCategoriasStore();
  const theme = useTheme();
  const ref = useRef(null);
  const [fileurl, setFileurl] = useState();
  function elegirColor(color) {
    setColor(color.hex);
  }
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { isPending, mutate: doInsertar } = useInsertarCategoriasMutationStack({
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
  function abrirImagenes() {
    ref.current.click();
  }
  function prepararImagen(e) {
    let filelocal = e.target.files;
    let fileReaderlocal = new FileReader();
    fileReaderlocal.readAsDataURL(filelocal[0]);
    const tipoimg = e.target.files[0];
    setFile(tipoimg);
    if (fileReaderlocal && filelocal && filelocal.length) {
      fileReaderlocal.onload = function load() {
        setFileurl(fileReaderlocal.result);
      };
    }
  }
  useEffect(() => {
    if (accion === "Editar") {
      setColor(dataSelect.color);
      setFileurl(dataSelect.icono);
    } else {
      setColor("#F44336");
      setFileurl(null);
    }
    setFile([]);
  }, []);
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
                  ? "Editar categoría"
                  : "Registrar nueva categoría"}
              </h1>
            </section>
            <section>
              <BtnClose funcion={onClose}></BtnClose>
            </section>
          </div>
          <PictureContainer>
            {fileurl != "-" ? (
              <div className="ContentImage">
                <img src={fileurl}></img>
              </div>
            ) : (
              <Icono>{<v.iconoimagenvacia />}</Icono>
            )}
            <Btn1
              funcion={abrirImagenes}
              titulo="+imagen(opcional)"
              color="#5f5f5f"
              bgcolor="rgb(183, 183, 182)"
              icono={<v.iconosupabase />}
            />
            <input
              type="file"
              ref={ref}
              onChange={(e) => prepararImagen(e)}
            ></input>
          </PictureContainer>
          <form className="formulario" onSubmit={handleSubmit(handlesub)}>
            <section className="form-subcontainer">
              <article>
                <InputText icono={<v.iconoflechaderecha />}>
                  <input
                    className="form__field"
                    defaultValue={dataSelect.nombre}
                    type="text"
                    placeholder="categoria"
                    {...register("descripcion", { required: true })}
                  />
                  <label className="form__label">categoría</label>
                  {errors.descripcion?.type === "required" && (
                    <p>Campo requerido</p>
                  )}
                </InputText>
              </article>
              <article className="colorContainer">
                <ContentTitle>
                  {<v.paletacolores />}
                  <span>Color</span>
                </ContentTitle>
                <div className="colorPickerContent">
                  <CirclePicker onChange={elegirColor} color={currentColor} />
                </div>
              </article>
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
  background-color: transparent;
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
    width: 500px;
    max-width: 85%;
    border-radius: 20px;
    background: ${({ theme }) => theme.body};
    box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
    padding: 13px 36px 20px 36px;
    z-index: 100;
    overflow: hidden;
    animation: ${aparecer} 0.4s ease forwards;
    .headers {
      position: relative;
      z-index: 5;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
      h1 {
        font-size: 20px;
        font-weight: 700;
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
      .form-subcontainer {
        gap: 20px;
        display: flex;
        flex-direction: column;
        .colorContainer {
          padding: 8px;
          border-radius: 8px;
          border: 1px solid rgba(184, 92, 24, 0.18);
          background: transparent;
          .colorPickerContent {
            padding-top: 15px;
            min-height: 50px;
          }
        }
      }
    }
    @media ${v.bplisa} {
      width: 450px;
      max-width: 90%;
      padding: 13px 25px 20px 25px;
    }
    @media ${v.bpmarge} {
      width: 95%;
      max-width: 95%;
      padding: 13px 18px 20px 18px;
      .headers {
        h1 {
          font-size: 18px;
        }
      }
    }
  }
`;

const ContentTitle = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 20px;
  color: ${({ theme }) => theme.text};
  svg {
    font-size: 25px;
    color: ${({ theme }) => theme.halloweenPrimary || "#b85c18"};
    opacity: 0.8;
  }
  input {
    border: none;
    outline: none;
    background: transparent;
    padding: 2px;
    width: 40px;
    font-size: 28px;
  }
`;

const PictureContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  border: 1px dashed ${({ theme }) => theme.halloweenPrimary || "#b85c18"};
  border-radius: 6px;
  background-color: transparent;
  padding: 8px;
  position: relative;
  gap: 3px;
  margin-bottom: 8px;
  .ContentImage {
    overflow: hidden;
    img {
      width: 100%;
      object-fit: contain;
    }
  }
  input {
    display: none;
  }
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
