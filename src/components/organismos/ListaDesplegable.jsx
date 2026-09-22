import styled from "styled-components";
import { Device } from "../../index";
import { useRef, useState } from "react";

export function ListaDesplegable({
  data,
  setState,
  funcion,
  scroll,
  top,
  state,
  refetch,
  funcioncrud,
}) {
  if (!state) return null;
  const [selectIndex, setSelectIndex] = useState(0);
  const dropdownRef = useRef(null);

  function seleccionar(p) {
    if (!p) return;
    if (refetch) {
      refetch();
    }
    funcion(p);
    setState();
    if (funcioncrud) {
      funcioncrud();
    }
  }

  const handleKeyDown = (e) => {
    if (!data?.length) return;
    if (e.key === "Enter") {
      e.preventDefault();
      seleccionar(data[selectIndex]);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectIndex((prevIndex) =>
        prevIndex === 0 ? data.length - 1 : prevIndex - 1,
      );
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectIndex((prevIndex) =>
        prevIndex === data.length - 1 ? 0 : prevIndex + 1,
      );
    }
  };

  return (
    <Container
      scroll={scroll}
      $top={top}
      ref={dropdownRef}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <section className="contentClose" onClick={setState}>
        ×
      </section>
      <section className="contentItems">
        {data?.map((item, index) => {
          const seleccionado = index === selectIndex;
          return (
            <ItemContainer
              key={index}
              onClick={() => seleccionar(item)}
              $selected={seleccionado}
            >
              <span className="icono">🌫️</span>
              <span className="nombre">{item?.nombre}</span>
            </ItemContainer>
          );
        })}
      </section>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: ${(props) => props.$top};
  width: 95%;
  padding: 10px;
  margin-bottom: 15px;
  gap: 8px;
  border-radius: 10px;
  z-index: 3;
  background: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  border: 1px solid
    ${({ theme }) =>
      theme.body === "#fff" ? "rgba(0,0,0,0.08)" : "rgba(255,255,255,0.055)"};
  box-shadow: ${({ theme }) =>
    theme.body === "#fff"
      ? "0 10px 25px rgba(0,0,0,0.08)"
      : "0 10px 25px rgba(0,0,0,0.30)"};
  &:focus {
    outline: none;
  }
  @media ${() => Device.tablet} {
    width: 95%;
  }
  .contentClose {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    height: 24px;
    padding-right: 4px;
    font-weight: 600;
    cursor: pointer;
    font-size: 18px;
    line-height: 1;
    opacity: 0.55;
    transition:
      opacity 0.2s ease,
      color 0.2s ease;
    &:hover {
      opacity: 1;
      color: rgba(197, 106, 32, 0.75);
    }
  }
  .contentItems {
    overflow-y: ${(props) => props.scroll};
    padding-right: 2px;
    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background: ${({ theme }) =>
        theme.body === "#fff" ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.10)"};
      border-radius: 10px;
      transition: background 0.2s ease;
    }
    &:hover::-webkit-scrollbar-thumb {
      background: rgba(197, 106, 32, 0.18);
    }
    scrollbar-width: thin;
    scrollbar-color: ${({ theme }) =>
      theme.body === "#fff"
        ? "rgba(0,0,0,0.12) transparent"
        : "rgba(255,255,255,0.10) transparent"};
  }
`;

const ItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 11px;
  border-radius: 8px;
  cursor: pointer;
  background: ${({ theme, $selected }) =>
    $selected
      ? theme.body === "#fff"
        ? "rgba(197,106,32,0.045)"
        : "rgba(197,106,32,0.055)"
      : "transparent"};
  border: 1px solid
    ${({ theme, $selected }) =>
      $selected ? "rgba(197,106,32,0.08)" : "transparent"};
  transition:
    background-color 0.18s ease,
    border-color 0.18s ease,
    transform 0.18s ease;
  .icono {
    font-size: 16px;
    opacity: 0.7;
    filter: grayscale(0.25);
    transition:
      opacity 0.18s ease,
      transform 0.18s ease;
  }
  .nombre {
    flex: 1;
    color: ${({ theme }) => theme.text};
    font-size: 14px;
    font-weight: ${({ $selected }) => ($selected ? "600" : "500")};
    opacity: ${({ $selected }) => ($selected ? 1 : 0.86)};
    transition:
      color 0.18s ease,
      opacity 0.18s ease;
  }
  &:hover {
    background: ${({ theme }) =>
      theme.body === "#fff" ? "rgba(0,0,0,0.035)" : "rgba(255,255,255,0.035)"};
    border-color: ${({ theme }) =>
      theme.body === "#fff" ? "rgba(0,0,0,0.06)" : "rgba(255,255,255,0.05)"};
    transform: translateX(1px);
    .icono {
      opacity: 0.9;
      transform: scale(1.04);
    }
    .nombre {
      opacity: 1;
    }
  }
  &:active {
    transform: scale(0.99);
  }
`;
