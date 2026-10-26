import styled from "styled-components";
import {
  Btn1,
  Buscador,
  RegistrarClientesProveedores,
  TablaClientesProveedores,
  Title,
  useClientesProveedoresStore,
} from "../../index";
import { useState } from "react";
import Confetti from "react-confetti-boom";
import { useLocation } from "react-router-dom";
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

export const ClientesProveedoresTemplate = () => {
  const { dataclipro, setBuscador, setTipo } = useClientesProveedoresStore();
  const [openRegistro, setOpenRegistro] = useState(false);
  const [accion, setAccion] = useState("");
  const [dataSelect, setDataSelect] = useState([]);
  const [isExploding, setIsExploding] = useState(false);
  const location = useLocation();
  const esCliente = location.pathname === "/configuracion/clientes";
  const titulo = esCliente ? "Clientes" : "Proveedores";

  function nuevoRegistro() {
    setTipo(esCliente ? "cliente" : "proveedor");
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
      <Toaster richColors position="top-center"/>
      {openRegistro && (
        <RegistrarClientesProveedores
          setIsExploding={setIsExploding}
          onClose={() => setOpenRegistro(!openRegistro)}
          dataSelect={dataSelect}
          accion={accion}
        />
      )}
      <section className="area1">
        <Title>{titulo}</Title>
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
        <Buscador setBuscador={setBuscador} />
      </section>
      <section className="main">
        {isExploding && <Confetti />}
        <TablaClientesProveedores
          data={dataclipro}
          SetopenRegistro={setOpenRegistro}
          setAccion={setAccion}
          setdataSelect={setDataSelect}
        />
      </section>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  z-index: 1;
  height: calc(100vh - 30px);
  padding: 15px;
  display: grid;
  grid-template:
    "area1" 60px
    "area2" 60px
    "main" auto;
  overflow: auto;
  .decorations {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    z-index: 0;
  }
  .area1 {
    grid-area: area1;
    display: flex;
    justify-content: end;
    align-items: center;
    gap: 15px;
    position: relative;
    z-index: 2;
  }
  .area2 {
    grid-area: area2;
    display: flex;
    justify-content: end;
    align-items: center;
    position: relative;
    z-index: 2;
  }
  .main {
    grid-area: main;
    position: relative;
    z-index: 2;
    min-height: 0;
  }
  button {
    transition:
      transform 0.18s ease,
      box-shadow 0.18s ease,
      filter 0.18s ease;
  }
  button:hover {
    transform: translateY(-2px);
    box-shadow: 0 7px 18px rgba(0, 0, 0, 0.28);
    filter: brightness(1.08);
  }
  button:active {
    transform: scale(0.98);
  }
`;
