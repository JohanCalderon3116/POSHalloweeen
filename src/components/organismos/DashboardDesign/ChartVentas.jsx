import styled from "styled-components";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEmpresaStore } from "../../../store/EmpresaStore";
import {
  FormatearNumeroDinero,
  FormatearNumeroDineroSinIsoYCurrency,
} from "../../../utils/Conversiones";
import { Icon } from "@iconify/react";
import {
  useDetalleVentasStore,
  useMostrarVentasAgrupadasXFechaQueryStack,
} from "../../..";
import { BarLoader } from "react-spinners";

export const ChartVentas = () => {
  const { ventasAgrupadasFecha, totalVentas, porcentajeCambioTotal } =
    useDetalleVentasStore();
  const isPositive = porcentajeCambioTotal > 0;
  const isNeutral = porcentajeCambioTotal === 0;
  const { isLoading } = useMostrarVentasAgrupadasXFechaQueryStack();
  if (isLoading) {
    return <BarLoader color="#ff7a18" />;
  }

  return (
    <Container>
      <Header>
        <Title>Total ventas</Title>
      </Header>
      <MainInfo>
        <Revenue>{FormatearNumeroDineroSinIsoYCurrency(totalVentas)}</Revenue>
        <Change>
          <Percentage isPositive={isPositive} isNeutral={isNeutral}>
            <Icon
              width="26"
              height="26"
              icon={
                isNeutral
                  ? "akar-icons:minus"
                  : isPositive
                    ? "iconamoon:arrow-up-2-fill"
                    : "iconamoon:arrow-down-2-fill"
              }
            />
            {Math.abs(porcentajeCambioTotal).toFixed(1)}% al periodo anterior
          </Percentage>
        </Change>
      </MainInfo>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart
          width={500}
          height={400}
          data={ventasAgrupadasFecha}
          margin={{
            top: 10,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff7a18" stopOpacity={0.4} />
              <stop offset="95%" stopColor="#ff7a18" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeOpacity={0.15}
            stroke="#ff7a18"
            vertical={false}
          />
          <XAxis
            dataKey="fecha"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: "#9CA3AF" }}
          />
          <YAxis hide />
          <Tooltip content={<CustomTooltip />} />
          <Area
            strokeWidth={2}
            type="monotone"
            dataKey="total_dia"
            stroke="#ff7a18"
            fill="url(#colorValue)"
            activeDot={{
              r: 6,
              fill: "#ff7a18",
              stroke: "#ffffff",
              strokeWidth: 2,
            }}
            fillOpacity={1}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Container>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  const { dataempresa } = useEmpresaStore();
  if (active && payload && payload.length) {
    return (
      <TooltipContainer>
        <Date>{label}</Date>
        <Value>
          {FormatearNumeroDinero(
            payload[0].value,
            dataempresa?.currency,
            dataempresa?.iso,
          )}
        </Value>
      </TooltipContainer>
    );
  }
};

const Container = styled.div``;

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
  color: ${({ theme }) => theme.colorSubtitle || "#9CA3AF"};
`;

const Value = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.halloweenPrimary || "#ff7a18"};
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
  padding-top: 15px;
`;

const Title = styled.h3`
  font-size: 16px;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
`;

const MainInfo = styled.div`
  margin: 15px 0 20px;
  padding-left: 20px;
`;

const Revenue = styled.div`
  font-size: 28px;
  font-weight: 900;
  color: ${({ theme }) => theme.text};
`;

const Change = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 5px;
`;

const Percentage = styled.span`
  display: flex;
  text-align: center;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  color: ${(props) =>
    props.isNeutral ? "#6b7280" : props.isPositive ? "#10b981" : "#ef4444"};
`;
