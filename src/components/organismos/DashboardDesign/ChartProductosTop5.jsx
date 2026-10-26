import styled from "styled-components";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { ConvertirCapitalize } from "../../../utils/Conversiones";
import { BarLoader } from "react-spinners";
import { Lottieanimation } from "../../atomos/Lottieanimation";
import animacionvacio from "../../../assets/vacioanimation.json.json";
import { useMostrarTop5MasVendidosXCantidadQueryStack } from "../../../tanstack/VentasStack";

export const ChartProductosTop5 = () => {
  const { data, isLoading } = useMostrarTop5MasVendidosXCantidadQueryStack();
  if (isLoading) {
    return <BarLoader color="#ff7a18" />;
  }

  return (
    <Container>
      <Header>
        <Title>Top 5</Title>
        <Subtitle>Productos por cantidad vendida</Subtitle>
      </Header>
      {data && data.length > 0 ? (
        <>
          {data?.map((item, index) => {
            return (
              <Row key={index}>
                <NameContent>
                  <Name>{ConvertirCapitalize(item.nombre_producto)}</Name>
                </NameContent>
                <Stats>{item.total_vendido}</Stats>
                <Percentage>{item.porcentaje} %</Percentage>
              </Row>
            );
          })}
          <ResponsiveContainer width="100%" height={260}>
            <BarChart
              width={500}
              height={400}
              data={data}
              margin={{
                top: 15,
                right: 0,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid
                strokeOpacity={0.15}
                stroke="#ff7a18"
                vertical={false}
              />
              <XAxis
                dataKey="nombre_producto"
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "#9CA3AF" }}
              />
              <YAxis hide />
              <Tooltip content={<CustomTooltip />} />
              <Bar
                strokeWidth={1.5}
                type="monotone"
                dataKey="total_vendido"
                fill="#ff7a18"
                activeDot={{ r: 6 }}
                fillOpacity={0.9}
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </>
      ) : (
        <Lottieanimation animacion={animacionvacio} alto="200" ancho="200" />
      )}
    </Container>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <TooltipContainer>
        <Date>{ConvertirCapitalize(label)} </Date>
        <Value>Cant: {payload[0].value}</Value>
      </TooltipContainer>
    );
  }
};

const Stats = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
`;

const Value = styled.span`
  font-size: 14px;
  font-weight: bold;
  color: ${({ theme }) => theme.halloweenPrimary || "#ff7a18"};
`;

const Percentage = styled.span`
  font-size: 12px;
  font-weight: bold;
  color: ${({ theme }) => theme.halloweenPrimary || "#ff7a18"};
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 8px;
  padding: 4px 8px;
  border-radius: 8px;
  background: ${({ theme }) => theme.bgAlpha || "rgba(255, 122, 24, 0.05)"};
`;

const NameContent = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 2;
`;

const Name = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: ${({ theme }) => theme.colorSubtitle || "#6b7280"};
  margin: 5px 0 0;
`;

const Container = styled.div`
  padding: 20px;
`;

const TooltipContainer = styled.div`
  background: ${({ theme }) => theme.body || theme.bg};
  padding: 10px 14px;
  border-radius: 10px;
  font-size: 12px;
  border: 1px solid
    ${({ theme }) => theme.halloweenBorder || "rgba(255, 122, 24, 0.3)"};
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(8px);
`;

const Date = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.text};
`;

const Header = styled.div`
  margin-bottom: 16px;
  text-align: center;
`;

const Title = styled.h3`
  font-size: 22px;
  font-weight: 800;
  color: ${({ theme }) => theme.text};
  margin: 0;
`;
