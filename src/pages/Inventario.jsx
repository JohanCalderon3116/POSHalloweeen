import styled from "styled-components";
import {
  CrudTemplate,
  useBuscarProductosQueryStack,
  useProductosStore,
} from "..";
import { RegistrarInventario } from "../components/organismos/formularios/RegistrarInventario";
import { TablaInventarios } from "../components/organismos/tablas/TablaInventarios";
import { Toaster } from "sonner";
import { useMostrarMovimientosStockQueryStack } from "../tanstack/MovimientosStock";
import { useEffect } from "react";
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
} from "../components/organismos/LoginDesing/EscenaHalloween";

export const Inventario = () => {
  const { setBuscador, selectProductos } = useProductosStore();
  const { data: dataProductos } = useBuscarProductosQueryStack();
  const { data } = useMostrarMovimientosStockQueryStack();

  useEffect(() => {
    setBuscador("");
    return () => setBuscador("");
  }, []);

  return (
    <Container>
      <div className="halloween-bg" aria-hidden="true">
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
      <div className="contenido">
        <Toaster richColors position="top-center" />
        <CrudTemplate
          stateBtnAdd={true}
          stateBuscador={true}
          Table={TablaInventarios}
          title="Inventarios"
          Formularioregistro={RegistrarInventario}
          data={data || []}
          tipoBuscador="list"
          dataBuscadorList={dataProductos}
          selectBuscadorList={selectProductos}
          setBuscadorList={setBuscador}
          bgcolorBtnAdd="#9a5425"
        />
      </div>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  .contenido {
    position: relative;
    z-index: 5;
    padding-bottom: 40px;
  }
  .halloween-bg {
    position: absolute;
    inset: 0;
    overflow: hidden;
    pointer-events: none;
    z-index: 0;
  }
  button[title="Nuevo"],
  button[aria-label="Nuevo"] {
    background: #9a5425 !important;
    border-color: #9a5425 !important;
    box-shadow: 0 0 10px rgba(154, 84, 37, 0.12) !important;
    transition: 0.25s ease !important;
    &:hover {
      background: #b86627 !important;
      border-color: #b86627 !important;
      box-shadow: 0 0 14px rgba(184, 102, 39, 0.2) !important;
      transform: translateY(-1px);
    }
  }
`;
