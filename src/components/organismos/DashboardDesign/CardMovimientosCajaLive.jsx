import styled from "styled-components";
import { LiveIndicator } from "../../moleculas/LiveIndicator";
import { TablaMovimientosCajaLive } from "../tablas/TablaMovimientosCajaLive";
import {
  useMostrarMovimientosCajaLiveQueryStack,
  useSupabaseSubscription,
} from "../../..";
import { BarLoader } from "react-spinners";

export const CardMovimientosCajaLive = () => {
  const { data, isLoading, error } = useMostrarMovimientosCajaLiveQueryStack();
  useSupabaseSubscription({
    channelName: "public:movimientos_caja",
    options: { event: "*", schema: "public", table: "movimientos_caja" },
    queryKey: ["mostrar movimientos caja live"],
  });

  if (isLoading) {
    return <BarLoader color="#ff7a18" />;
  }

  if (error) {
    return <span>Error: {error.message} </span>;
  }

  return (
    <Container>
      <HeaderCard>
        <Title>Movimientos caja</Title>
        <LiveIndicator />
      </HeaderCard>
      <TablaMovimientosCajaLive data={data} />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  border: 1px solid
    ${({ theme }) => theme.halloweenBorder || theme.colortitlecard};
  border-radius: 22px;
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
