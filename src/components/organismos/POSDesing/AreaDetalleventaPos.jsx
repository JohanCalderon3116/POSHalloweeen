import styled from "styled-components";
import { blur_in } from "../../../styles/Keyframes";
import { FormatearNumeroDinero } from "../../../utils/Conversiones";
import {
  Btn1,
  InputText2,
  Lottieanimation,
  useEmpresaStore,
} from "../../../index";
import animaciovacio from "../../../assets/Handchi spooky.json";
import { Device } from "../../../styles/breakpoints";
import { Icon } from "@iconify/react";
import { useState } from "react";
import {
  useEditarCantidadDetalleVentaMutationStack,
  useEliminarCantidadDetalleVentaMutationStack,
  useMostrarDetalleVentaQueryStack,
} from "../../../tanstack/DetallesVentaStack";
const HALLOWEEN = {
  primary: "#c56a20",
  primarySoft: "rgba(197, 106, 32, 0.045)",
  primaryFocus: "rgba(197, 106, 32, 0.20)",
  border: "rgba(197, 106, 32, 0.11)",
  borderStrong: "rgba(197, 106, 32, 0.16)",
  hover: "rgba(197, 106, 32, 0.045)",
  icon: "rgba(197, 106, 32, 0.72)",
};

export const AreaDetalleventaPos = () => {
  const { dataempresa } = useEmpresaStore();
  const [editIndex, setEditIndex] = useState(null);
  const [newCantidad, setNewCantidad] = useState(1);
  const { mutate: mutateEditarCantidadDetalleVenta } =
    useEditarCantidadDetalleVentaMutationStack();
  const { mutate: mutateEliminarDV } =
    useEliminarCantidadDetalleVentaMutationStack();
  const handleEditClick = (index, cantidad) => {
    setEditIndex(index);
    setNewCantidad(cantidad);
  };
  const handleInputChange = (e) => {
    const value = Math.max(0, parseFloat(e.target.value) || 0);
    setNewCantidad(value);
  };
  const handleInputBlur = (item) => {
    mutateEditarCantidadDetalleVenta({
      id: item.id,
      cantidad: newCantidad,
    });
    setEditIndex(null);
  };
  const handleKeyDown = (e, item) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleInputBlur(item);
    }
  };
  const { data: items } = useMostrarDetalleVentaQueryStack();

  return (
    <AreaDetalleventa className={items?.length > 0 ? "" : "animacion"}>
      {items?.length > 0 ? (
        items.map((item, index) => {
          return (
            <Itemventa key={index}>
              <article className="contentdescripcion">
                <span className="descripcion">{item.descripcion}</span>
                <span className="importe">
                  <strong>Precio unit:</strong>
                  <span className="precio-icon">◈</span>
                  {FormatearNumeroDinero(
                    item.precio_venta,
                    dataempresa?.currency,
                    dataempresa?.iso,
                  )}
                </span>
                <ContentTotalResponsive>
                  <span className="importerespo">
                    <strong>Precio unit:</strong>
                    <span className="precio-icon">◈</span>
                    {FormatearNumeroDinero(
                      item.precio_venta,
                      dataempresa?.currency,
                      dataempresa?.iso,
                    )}
                  </span>
                  <article className="contentTotaldetalleventarespon">
                    <span className="cantidad">
                      <strong>
                        {FormatearNumeroDinero(
                          item.total,
                          dataempresa?.currency,
                          dataempresa?.iso,
                        )}
                      </strong>
                    </span>
                    <span
                      className="delete"
                      onClick={() => mutateEliminarDV(item)}
                    >
                      <Icon icon="weui:delete-filled" width="22" height="22" />
                    </span>
                  </article>
                </ContentTotalResponsive>
              </article>
              <article className="contentbtn">
                <Btn1
                  funcion={() =>
                    mutateEditarCantidadDetalleVenta({
                      id: item.id,
                      cantidad: item.cantidad - 1,
                    })
                  }
                  width="20px"
                  height="35px"
                  icono={<Icon icon="subway:subtraction-1" />}
                />
                {editIndex === index ? (
                  <InputText2>
                    <input
                      type="number"
                      value={newCantidad}
                      onChange={handleInputChange}
                      onBlur={() => handleInputBlur(item)}
                      onKeyDown={(e) => handleKeyDown(e, item)}
                      className="form__field"
                      min="1"
                    />
                  </InputText2>
                ) : (
                  <>
                    <span className="cantidad">{item.cantidad}</span>
                    <Icon
                      icon="mdi:pencil"
                      onClick={() => handleEditClick(index, item.cantidad)}
                      className="edit-icon"
                    />
                  </>
                )}
                <Btn1
                  funcion={() =>
                    mutateEditarCantidadDetalleVenta({
                      id: item.id,
                      cantidad: item.cantidad + 1,
                    })
                  }
                  width="20px"
                  height="35px"
                  icono={<Icon icon="mdi:add-bold" />}
                />
              </article>
              <article className="contentTotaldetalleventa">
                <span className="cantidad">
                  <strong>
                    {FormatearNumeroDinero(
                      item.total,
                      dataempresa?.currency,
                      dataempresa?.iso,
                    )}
                  </strong>
                </span>
                <span className="delete" onClick={() => mutateEliminarDV(item)}>
                  <Icon icon="weui:delete-filled" width="22" height="22" />
                </span>
              </article>
            </Itemventa>
          );
        })
      ) : (
        <Lottieanimation animacion={animaciovacio} alto="200" ancho="200" />
      )}
    </AreaDetalleventa>
  );
};

const ContentTotalResponsive = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  width: 100%;
  justify-content: space-between;
  .descripcionrespon {
    font-weight: 700;
    font-size: 20px;
  }
  .importerespo {
    font-size: 15px;
    display: flex;
    align-items: center;
    width: 100%;
    color: ${({ theme }) => theme.text};
    opacity: 0.78;
  }
  .precio-icon {
    margin: 0 5px;
    color: ${HALLOWEEN.icon};
    font-size: 11px;
    opacity: 0.8;
  }
  @media ${Device.laptop} {
    display: none;
  }
  .contentTotaldetalleventarespon {
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
    text-align: end;
    align-items: center;
    gap: 8px;
    width: 100%;
    .delete {
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      width: 22px;
      height: 22px;
      color: ${({ theme }) => theme.text};
      opacity: 0.42;
      transition:
        color 0.18s ease,
        opacity 0.18s ease,
        transform 0.18s ease;
      &:hover {
        color: ${HALLOWEEN.icon};
        opacity: 0.9;
        transform: scale(1.05);
      }
      &:active {
        transform: scale(0.95);
      }
    }
  }
`;

const AreaDetalleventa = styled.section`
  display: flex;
  width: 100%;
  margin-top: 10px;
  flex-direction: column;
  gap: 10px;
  max-height: calc(100vh - 500px);
  overflow-y: auto;
  overflow-x: hidden;
  padding-right: 3px;
  &::-webkit-scrollbar {
    width: 7px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) =>
      theme.body === "#fff"
        ? "rgba(0, 0, 0, 0.12)"
        : "rgba(255, 255, 255, 0.10)"};
    border-radius: 10px;
    transition: background 0.2s ease;
  }
  &:hover::-webkit-scrollbar-thumb {
    background: rgba(197, 106, 32, 0.18);
  }
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.1) transparent;
  &.animacion {
    height: 100%;
    justify-content: center;
  }
  @media ${Device.laptop} {
    max-height: initial;
  }
`;

const Itemventa = styled.section`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px dashed
    ${({ theme }) =>
      theme.body === "#fff"
        ? "rgba(0, 0, 0, 0.10)"
        : "rgba(255, 255, 255, 0.09)"};
  animation: ${blur_in} 0.2s linear both;
  flex-direction: column;
  gap: 10px;
  padding-bottom: 10px;
  .contentdescripcion {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    .descripcion {
      font-weight: 700;
      font-size: 20px;
      color: ${({ theme }) => theme.text};
    }
    .importe {
      font-size: 15px;
      display: none;
      align-items: center;
      color: ${({ theme }) => theme.text};
      opacity: 0.72;
      .precio-icon {
        margin: 0 5px;
        color: ${HALLOWEEN.icon};
        font-size: 11px;
        opacity: 0.8;
      }
      strong {
        font-weight: 600;
        opacity: 0.72;
      }
      @media ${Device.laptop} {
        display: flex;
      }
    }
  }
  .contentbtn {
    display: flex;
    width: 100%;
    height: 100%;
    gap: 10px;
    align-items: center;
    justify-content: center;
    .cantidad {
      font-size: 1.8rem;
      font-weight: 700;
      color: ${({ theme }) => theme.text};
    }
    .edit-icon {
      cursor: pointer;
      font-size: 18px;
      color: ${({ theme }) => theme.text};
      opacity: 0.38;
      transition:
        color 0.18s ease,
        opacity 0.18s ease,
        transform 0.18s ease;
      &:hover {
        color: ${HALLOWEEN.icon};
        opacity: 0.85;
        transform: rotate(-4deg) scale(1.06);
      }
      &:active {
        transform: scale(0.95);
      }
    }
  }
  .contentTotaldetalleventa {
    display: none;
    @media ${Device.laptop} {
      display: flex;
      flex-direction: row;
      justify-content: center;
      text-align: end;
      align-items: center;
      margin-bottom: 10px;
      width: 100%;
      .delete {
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        width: 22px;
        height: 22px;
        color: ${({ theme }) => theme.text};
        opacity: 0.42;
        transition:
          color 0.18s ease,
          opacity 0.18s ease,
          transform 0.18s ease;
        &:hover {
          color: ${HALLOWEEN.icon};
          opacity: 0.9;
          transform: scale(1.05);
        }
        &:active {
          transform: scale(0.95);
        }
      }
    }
  }
  @media ${Device.tablet} {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    .contentdescripcion {
      display: flex;
      flex-direction: column;
      gap: 8px;
      width: 100%;
      .descripcion {
        font-weight: 700;
        font-size: 20px;
      }
      .importe {
        font-size: 15px;
        display: flex;
      }
    }
    .contentbtn {
      display: flex;
      width: 100%;
      height: 100%;
      gap: 10px;
      align-items: center;
      justify-content: center;
      .cantidad {
        font-size: 1.8rem;
        font-weight: 700;
      }
      .edit-icon {
        cursor: pointer;
        font-size: 18px;
        color: ${({ theme }) => theme.text};
        opacity: 0.38;
        transition:
          color 0.18s ease,
          opacity 0.18s ease,
          transform 0.18s ease;
        &:hover {
          color: ${HALLOWEEN.icon};
          opacity: 0.85;
          transform: rotate(-4deg) scale(1.06);
        }
      }
    }
  }
`;
