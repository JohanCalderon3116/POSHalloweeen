import styled, { keyframes } from "styled-components";
import {
  Btn1,
  Buscador,
  RegistrarCategorias,
  TablaCategorias,
  Title,
  useCategoriasStore,
} from "../../index";
import { useState } from "react";
import Confetti from "react-confetti-boom";
import { Toaster } from "sonner";
import { Icon } from "@iconify/react";
import {
  Telarana,
  AranaSvg,
  MurcielagoSvg,
  Rincon,
  Colgante,
  Pendulo,
  Hilo,
  Cuerpo,
  Murcielago,
  Aleteo,
  ARANAS,
  MURCIELAGOS,
} from "../organismos/LoginDesing/EscenaHalloween";
const aparecer = keyframes`
  from { opacity: 0; margin-top: 8px; }
  to { opacity: 1; margin-top: 0; }
`;

export const CategoriasTemplate = () => {
  const { datacategorias, setBuscador } = useCategoriasStore();
  const [openRegistro, setOpenRegistro] = useState(false);
  const [accion, setAccion] = useState("");
  const [dataSelect, setDataSelect] = useState([]);
  const [isExploding, setIsExploding] = useState(false);
  function nuevoRegistro() {
    setOpenRegistro(!openRegistro);
    setAccion("Nuevo");
    setDataSelect([]);
    setIsExploding(false);
  }
  return (
    <Container>
      <div className="decorations" aria-hidden="true">
        <Rincon className="izq">
          <Telarana />
        </Rincon>
        <Rincon className="der">
          <Telarana />
        </Rincon>
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
              style={{
                animationDuration: a.t,
                animationDelay: `-${i * 0.9}s`,
              }}
            >
              <Hilo style={{ height: a.largo }} />
              <Cuerpo style={{ width: a.ancho }}>
                <AranaSvg />
              </Cuerpo>
            </Pendulo>
          </Colgante>
        ))}
      </div>
      <Toaster richColors></Toaster>
      {openRegistro && (
        <RegistrarCategorias
          setIsExploding={setIsExploding}
          onClose={() => setOpenRegistro(!openRegistro)}
          dataSelect={dataSelect}
          accion={accion}
        ></RegistrarCategorias>
      )}
      <section className="area1">
        <Title>Categorías</Title>{" "}
        <Btn1
          funcion={nuevoRegistro}
          bgcolor="#171719"
          color="#f5f5f5"
          titulo="Nuevo"
          border="1px"
          icono={<Icon icon="solar:add-circle-bold" />}
        />
      </section>
      <section className="area2">
        <Buscador setBuscador={setBuscador}></Buscador>
      </section>
      <section className="main">
        {isExploding && <Confetti></Confetti>}
        <TablaCategorias
          data={datacategorias}
          SetopenRegistro={setOpenRegistro}
          setAccion={setAccion}
          setdataSelect={setDataSelect}
        ></TablaCategorias>{" "}
      </section>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  height: calc(100vh - 30px);
  padding: 15px;
  display: grid;
  grid-template:
    "area1" 60px
    "area2" 60px
    "main" auto;
  overflow: auto;
  animation: ${aparecer} 0.3s ease both;
  .decorations {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    z-index: 0;
  }
  .area1 {
    grid-area: area1;
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 15px;
  }
  .area2 {
    grid-area: area2;
    position: relative;
    z-index: 2;
    display: flex;
    justify-content: end;
    align-items: center;
  }
  .main {
    grid-area: main;
    position: relative;
    z-index: 2;
  }
`;
