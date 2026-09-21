import halloween from "../../assets/Frankenstein.json";
import halloween2 from "../../assets/halloween pumpkin.json";
import styled, { createGlobalStyle, keyframes } from "styled-components";
import {
  Btn1,
  Footer,
  InputText2,
  Linea,
  Lottieanimation,
  Title,
  useAuthStore,
  VolverBtn,
} from "../../index";
import { v } from "../../styles/variables";
import { Device } from "../../styles/breakpoints";
import cart from "../../assets/add to cart.json";
import { useForm } from "react-hook-form";
import { toast, Toaster } from "sonner";
import { useState } from "react";
import { CardModos } from "../organismos/LoginDesing/CardModos";
import {
  EscenaHalloween,
  Sombrero,
  Telarana,
} from "../organismos/LoginDesing/EscenaHalloween";
import { useContraseñaStore } from "../../store/ContraseñaStore";
import {
  useIniciarSesionConEmailMutationStack,
  useMostrarContraseñaQueryStack,
} from "../../tanstack/LoginStack";
export const LoginTemplate = () => {
  const [stateModos, setStateModos] = useState(true);
  const [stateModo, setStateModo] = useState(null);
  const [contraseñaOk, setContraseñaOk] = useState(false);
  const [inputContraseña, setInputContraseña] = useState("");
  const { loginGoogle } = useAuthStore();
  const { dataContraseña } = useContraseñaStore();
  const { register, handleSubmit } = useForm();
  useMostrarContraseñaQueryStack();
  const validarContraseña = () => {
    const data = dataContraseña;
    const contraseñaReal = data[0]?.contraseña;
    if (Number(inputContraseña) === contraseñaReal) {
      setContraseñaOk(true);
      toast.success("Contraseña correcta, entrando al modo SuperAdmin");
    } else {
      toast.error("Contraseña incorrecta");
    }
  };
  const { mutate } = useIniciarSesionConEmailMutationStack();
  const manejadorEmailSesion = (data) => {
    mutate({ email: data.email, password: data.password });
  };
  const manejadorEmailSesionTester = (data) => {
    mutate({ email: "tester1@gmail.com", password: "123456" });
  };
  return (
    <Container>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Creepster&display=swap"
      />
      <Globales />
      <EscenaHalloween />
      <Toaster richColors></Toaster>
      <div className="card">
        <CardWeb className="izq">
          <Telarana />
        </CardWeb>
        <CardWeb className="der">
          <Telarana />
        </CardWeb>
        <ContentLogo>
          <span className="marca">
            <img src={v.logo} alt="" />
            <Sombrero className="sombrero" />
          </span>
          <span className="nombre">SoftCreate POS</span>
        </ContentLogo>
        <TituloWrap>
          <Title $paddingBottom="20px">Iniciar sesión</Title>
        </TituloWrap>
        <LottieHalo>
          <Lottieanimation
            ancho={200}
            alto={200}
            animacion={halloween}
          ></Lottieanimation>
        </LottieHalo>
        {stateModos && (
          <ContentModos>
            <CardModos
              title={"Super admin"}
              subtitle={"Crea y gestiona tu empresa."}
              bgcolor={"#5b21b6"}
              img={"https://i.ibb.co/v6c45GD9/admin.png"}
              funcion={() => {
                setStateModo("superadmin");
                setStateModos(!stateModos);
              }}
            ></CardModos>
            <CardModos
              title={"Empleado"}
              subtitle={"Vende y haz crecer tu negocio."}
              bgcolor={"#c2410c"}
              img={"https://i.ibb.co/xqyKYrX6/trabajando.png"}
              funcion={() => {
                setStateModo("empleado");
                setStateModos(!stateModos);
              }}
            ></CardModos>
            <CardModos
              title={"Invitado"}
              subtitle={"Obten una prueba de 30 días gratis."}
              bgcolor={"#166534"}
              img={"https://i.ibb.co/SDphqvqL/damas-de-honor.png"}
              funcion={() => {
                setStateModo("invitado");
                setStateModos(!stateModos);
              }}
            ></CardModos>
          </ContentModos>
        )}
        {stateModo === "empleado" && stateModos === false && (
          <PanelModo>
            <VolverBtn funcion={() => setStateModos(!stateModos)}></VolverBtn>
            <span>Modo empleado</span>
            <form onSubmit={handleSubmit(manejadorEmailSesion)} action="">
              <InputText2>
                <input
                  className="form__field"
                  placeholder="Correo"
                  type="text"
                  {...register("email", { required: true })}
                ></input>
              </InputText2>
              <InputText2>
                <input
                  className="form__field"
                  placeholder="Contraseña"
                  type="password"
                  {...register("password", { required: true })}
                ></input>
              </InputText2>
              <Btn1
                border="2px"
                titulo="Ingresar"
                bgcolor="#e8590c"
                color="255,255,255"
                width="100%"
              ></Btn1>
            </form>
          </PanelModo>
        )}
        {stateModo === "superadmin" && stateModos === false && (
          <PanelModo>
            <VolverBtn funcion={() => setStateModos(!stateModos)}></VolverBtn>
            <span>Modo Super Admin</span>
            {!contraseñaOk ? (
              <>
                <InputText2>
                  <input
                    className="form__field"
                    placeholder="Contraseña de acceso"
                    type="password"
                    value={inputContraseña}
                    onChange={(e) => setInputContraseña(e.target.value)}
                  />
                </InputText2>
                <Btn1
                  titulo="Verificar"
                  funcion={validarContraseña}
                  width="100%"
                />
              </>
            ) : (
              <>
                <Btn1
                  border="2px"
                  funcion={loginGoogle}
                  titulo="Google"
                  color={(theme) => theme.bgtotal}
                  icono={<v.iconogoogle />}
                />
                <Linea>
                  <span>O</span>
                </Linea>
              </>
            )}
          </PanelModo>
        )}
        {stateModo === "invitado" && stateModos === false && (
          <PanelModo>
            <VolverBtn funcion={() => setStateModos(!stateModos)}></VolverBtn>
            <span>Modo Invitado</span>
            <Btn1
              border="2px"
              funcion={manejadorEmailSesionTester}
              titulo="Invitado"
              bgcolor="#7c3aed"
            />
          </PanelModo>
        )}
      </div>
      <FooterWrap>
        <Footer></Footer>
      </FooterWrap>
    </Container>
  );
};

/* ---------- animaciones ---------- */
const Globales = createGlobalStyle`
  @property --ang {
    syntax: "<angle>";
    inherits: false;
    initial-value: 0deg;
  }
`;

const surgir = keyframes`
  from { opacity: 0; transform: translateY(40px) scale(0.96); filter: blur(10px); }
  to { opacity: 1; transform: none; filter: none; }
`;

const girar = keyframes`
  to { --ang: 360deg; }
`;

const titilar = keyframes`
  0%, 100% {
    opacity: 1;
    text-shadow: 0 0 8px rgba(255, 122, 24, 0.9), 0 0 24px rgba(255, 122, 24, 0.55),
      0 0 48px rgba(139, 92, 246, 0.5);
  }
  46% { opacity: 0.9; }
  50% { opacity: 0.5; text-shadow: 0 0 4px rgba(255, 122, 24, 0.5); }
  54% { opacity: 1; }
  78% { opacity: 0.85; }
`;

const entrar = keyframes`
  from { opacity: 0; transform: translateY(18px); }
  to { opacity: 1; transform: none; }
`;

const latido = keyframes`
  0%, 100% { transform: translate(-50%, -50%) scale(0.9); opacity: 0.6; }
  50% { transform: translate(-50%, -50%) scale(1.12); opacity: 1; }
`;

const respirar = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.07); }
`;

/* ---------- estilos ---------- */
const Container = styled.div`
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  padding: 20px;
  overflow-x: hidden;
  color: #f4ecd8;
  background: radial-gradient(
    ellipse at 50% -10%,
    #341659 0%,
    #170b29 42%,
    #07030d 100%
  );

  .card {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    margin: 20px;
    padding: 22px 22px 26px;
    border-radius: 24px;
    background: linear-gradient(
      160deg,
      rgba(38, 18, 62, 0.82),
      rgba(14, 7, 24, 0.9)
    );
    backdrop-filter: blur(14px) saturate(140%);
    -webkit-backdrop-filter: blur(14px) saturate(140%);
    border: 1px solid rgba(139, 92, 246, 0.28);
    box-shadow:
      0 30px 80px -20px rgba(0, 0, 0, 0.85),
      0 0 60px rgba(255, 122, 24, 0.16),
      inset 0 1px 0 rgba(255, 255, 255, 0.08);
    animation: ${surgir} 0.9s cubic-bezier(0.16, 1, 0.3, 1) backwards;

    /* borde de luz giratorio */
    &::before {
      content: "";
      position: absolute;
      inset: -1.5px;
      padding: 1.5px;
      border-radius: 25.5px;
      pointer-events: none;
      background: conic-gradient(
        from var(--ang),
        transparent 0 55%,
        #ff7a18 72%,
        #8b5cf6 88%,
        transparent 100%
      );
      -webkit-mask:
        linear-gradient(#000 0 0) content-box,
        linear-gradient(#000 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      animation: ${girar} 6s linear infinite;
    }

    @media ${Device.tablet} {
      width: 400px;
    }
    form {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    &,
    & *,
    & *::before {
      animation: none !important;
    }
  }
`;

const CardWeb = styled.div`
  position: absolute;
  top: 0;
  width: 96px;
  color: rgba(244, 236, 216, 0.3);
  overflow: hidden;
  pointer-events: none;
  border-top-left-radius: 24px;
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

const ContentLogo = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin: 10px 0 14px;

  .marca {
    position: relative;
    display: inline-flex;
  }
  img {
    width: 46px;
    filter: drop-shadow(0 0 10px rgba(255, 122, 24, 0.65));
    animation: ${respirar} 3.6s ease-in-out infinite;
  }
  .sombrero {
    position: absolute;
    top: -20px;
    left: -8px;
    width: 34px;
    transform: rotate(-16deg);
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.6));
  }
  .nombre {
    font-family: "Creepster", cursive;
    font-size: 24px;
    letter-spacing: 2px;
    background: linear-gradient(90deg, #ff8a2b, #c084fc);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
  }
`;

const TituloWrap = styled.div`
  && * {
    font-family: "Creepster", cursive;
    font-size: 44px;
    font-weight: 400;
    line-height: 1.1;
    letter-spacing: 3px;
    color: #ff8a2b;
    animation: ${titilar} 4.5s infinite;
  }
`;

const LottieHalo = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 190px;
    height: 190px;
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(255, 122, 24, 0.38),
      rgba(139, 92, 246, 0.15) 45%,
      transparent 70%
    );
    animation: ${latido} 3.2s ease-in-out infinite;
  }
  > * {
    position: relative;
  }
`;

const ContentModos = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  > * {
    animation: ${entrar} 0.6s cubic-bezier(0.16, 1, 0.3, 1) backwards;
    transition:
      transform 0.2s ease,
      filter 0.2s ease;
  }
  > *:nth-child(1) {
    animation-delay: 0.25s;
  }
  > *:nth-child(2) {
    animation-delay: 0.4s;
  }
  > *:nth-child(3) {
    animation-delay: 0.55s;
  }
  > *:hover {
    transform: translateY(-4px) scale(1.02);
    filter: drop-shadow(0 10px 20px rgba(255, 122, 24, 0.35));
  }
`;

const PanelModo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  animation: ${entrar} 0.5s cubic-bezier(0.16, 1, 0.3, 1) backwards;

  > span {
    font-family: "Creepster", cursive;
    font-size: 28px;
    letter-spacing: 2px;
    color: #ff8a2b;
    text-shadow: 0 0 14px rgba(255, 122, 24, 0.6);
  }

  .form__field {
    color: #f4ecd8 !important;
    background: rgba(255, 255, 255, 0.06) !important;
    border: 1px solid rgba(139, 92, 246, 0.5) !important;
    border-radius: 12px;
    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease;

    &::placeholder {
      color: rgba(244, 236, 216, 0.5);
    }
    &:focus {
      outline: none;
      border-color: #ff7a18 !important;
      box-shadow:
        0 0 0 3px rgba(255, 122, 24, 0.25),
        0 0 22px rgba(255, 122, 24, 0.3);
    }
  }

  button {
    transition:
      transform 0.15s ease,
      filter 0.15s ease;
    &:hover {
      transform: translateY(-2px);
      filter: drop-shadow(0 6px 14px rgba(255, 122, 24, 0.4));
    }
    &:active {
      transform: scale(0.98);
    }
  }
`;

const FooterWrap = styled.div`
  position: relative;
  z-index: 2;
  color: #cbb8ff;
  opacity: 0.8;
  a {
    color: #ff8a2b;
  }
`;
