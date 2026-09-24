import styled from "styled-components";
import {
  Btn1,
  Buscador,
  RegistrarProductos,
  TablaProductos,
  Title,
  useProductosStore,
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
export const ProductosTemplate = () => {
  const {
    dataProductos,
    setBuscador,
    generarCodigo,
    buscador,
    resultadosBusqueda,
  } = useProductosStore();
  const [openRegistro, setOpenRegistro] = useState(false);
  const [accion, setAccion] = useState("");
  const [dataSelect, setdataSelect] = useState([]);
  const [isExploding, setIsExploding] = useState(false);
  const dataAMostrar = buscador.trim() ? resultadosBusqueda : dataProductos;
  function nuevoRegistro() {
    setOpenRegistro(!openRegistro);
    setAccion("Nuevo");
    setdataSelect([]);
    setIsExploding(false);
    generarCodigo();
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
      <Toaster richColors position="top-center"></Toaster>
      <RegistrarProductos
        setIsExploding={setIsExploding}
        onClose={() => setOpenRegistro(!openRegistro)}
        dataSelect={dataSelect}
        accion={accion}
        state={openRegistro}
      ></RegistrarProductos>
      <section className="area1">
        <Title>Productos</Title>{" "}
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
        <TablaProductos
          data={dataAMostrar}
          SetopenRegistro={setOpenRegistro}
          setAccion={setAccion}
          setdataSelect={setdataSelect}
        ></TablaProductos>{" "}
      </section>
    </Container>
  );
};
const Container = styled.div`
  height: calc(100vh - 30px);
  padding: 15px;
  display: grid;
  grid-template:
    "area1" 60px
    "area2" 60px
    "main" auto;
  .area1 {
    grid-area: area1;
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 15px;
  }
  .area2 {
    grid-area: area2;
    display: flex;
    justify-content: end;
    align-items: center;
  }
  .decorations {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    z-index: 0;
  }
  .main {
    grid-area: main;
  }
`;
