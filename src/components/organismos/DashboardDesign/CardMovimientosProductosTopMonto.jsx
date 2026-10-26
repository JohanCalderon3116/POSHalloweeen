import styled from "styled-components";
import { LiveIndicator } from "../../moleculas/LiveIndicator";
import {
  Lottieanimation,
  useMostrarTop10MasVendidosXMontoQueryStack,
} from "../../..";
import { BarLoader } from "react-spinners";
import { TablaProductosTop10 } from "../tablas/TablaProductosTop10";
import vacio from "../../../assets/vacio2.json";

export const CardMovimientosProductosTopMonto = () => {
  const { data, isLoading, error } =
    useMostrarTop10MasVendidosXMontoQueryStack();
  if (isLoading) {
    return <BarLoader color="#ff7a18" />;
  }
  if (error) {
    return <span>Error: {error.message} </span>;
  }

  return (
    <Container>
      <HeaderCard>
        <Title>Top 10 PMV</Title>
        <LiveIndicator />
      </HeaderCard>
      {data && data.length > 0 ? (
        <TablaProductosTop10 data={data} />
      ) : (
        <Lottieanimation animacion={vacio} ancho="200" alto="200" />
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  border: 1px solid
    ${({ theme }) => theme.halloweenBorder || theme.colortitlecard};
  border-radius: 22px;
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.body};
  backdrop-filter: blur(8px);
  box-shadow: 0 10px 24px -14px rgba(255, 122, 24, 0.2);
  overflow: hidden;
`;

const HeaderCard = styled.div`
  text-align: center;
  display: flex;
  gap: 15px;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid
    ${({ theme }) => theme.bgAlpha || "rgba(255, 122, 24, 0.1)"};
`;

const Title = styled.h3`
  font-size: 22px;
  font-weight: 800;
  color: ${({ theme }) => theme.text};
  margin: 0;
`;
