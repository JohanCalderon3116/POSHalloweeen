import styled from "styled-components";
import {
  Btn1,
  Buscador,
  RegistrarUsuarios,
  TablaUsuarios,
  Title,
  useAsignacionCajaSucursalesStore,
} from "../../index";
import { useState } from "react";
import Confetti from "react-confetti-boom";
import { Toaster } from "sonner";
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
import { Icon } from "@iconify/react";
export const UsuariosTemplate = () => {
  const [openRegistro, setOpenRegistro] = useState(false);
  const [dataSelect, setDataSelect] = useState([]);
  const [isExploding, setIsExploding] = useState(false);
  const {
    accion,
    setAccion,
    dataUsuariosAsignados,
    setBuscador,
    setSelectItem,
  } = useAsignacionCajaSucursalesStore();
  function nuevoRegistro() {
    setOpenRegistro(!openRegistro);
    setAccion("Nuevo");
    setDataSelect([]);
    setIsExploding(false);
    setSelectItem(null);
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
        <RegistrarUsuarios
          setIsExploding={setIsExploding}
          onClose={() => setOpenRegistro(!openRegistro)}
          dataSelect={dataSelect}
          accion={accion}
        ></RegistrarUsuarios>
      )}
      <section className="area1">
        <Title>Usuarios</Title>{" "}
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
        <TablaUsuarios
          data={dataUsuariosAsignados}
          SetopenRegistro={setOpenRegistro}
          setAccion={setAccion}
          setdataSelect={setDataSelect}
        ></TablaUsuarios>{" "}
      </section>
    </Container>
  );
};

const Container = styled.div`
  height: calc(100vh - 30px);
  padding: 15px;
  display: grid;
  .decorations {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    z-index: 0;
  }
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
  .main {
    grid-area: main;
  }
`;
