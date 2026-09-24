import { Icon } from "@iconify/react";
import styled, { keyframes } from "styled-components";
import { Btn1 } from "../components/moleculas/Btn1";
const telaranaAnim = keyframes`
  0%, 100% {
    opacity: 0.025;
    transform: rotate(0deg) scale(1);
  }
  50% {
    opacity: 0.055;
    transform: rotate(1.5deg) scale(1.015);
  }
`;
const murcielagoVolar = keyframes`
  0% {
    transform: translateX(-120px) translateY(0) rotate(-3deg);
  }
  20% {
    transform: translateX(20vw) translateY(-8px) rotate(3deg);
  }
  40% {
    transform: translateX(45vw) translateY(6px) rotate(-2deg);
  }
  60% {
    transform: translateX(70vw) translateY(-6px) rotate(2deg);
  }
  80% {
    transform: translateX(90vw) translateY(4px) rotate(-2deg);
  }
  100% {
    transform: translateX(calc(100vw + 120px)) translateY(0) rotate(2deg);
  }
`;

const aletear = keyframes`
  0%, 100% {
    transform: scaleY(1);
  }
  50% {
    transform: scaleY(0.55);
  }
`;

const arañaCaer = keyframes`
  from {
    transform: translateY(-45px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const arañaBalancear = keyframes`
  0%, 100% {
    transform: rotate(-5deg);
  }
  50% {
    transform: rotate(5deg);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const popIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9) translateY(16px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(0.9);
    opacity: 0.55;
  }
  70% {
    transform: scale(1.6);
    opacity: 0;
  }
  100% {
    transform: scale(1.6);
    opacity: 0;
  }
`;

const shimmer = keyframes`
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
`;

const telaranaPaths = `
M0 0 L180 0
M0 0 L165 70
M0 0 L125 125
M0 0 L70 165
M0 0 L0 180
M30 0 Q28 18 0 30
M60 0 Q58 34 0 60
M90 0 Q86 50 0 90
M120 0 Q114 68 0 120
M150 0 Q144 85 0 150
`;

const WebSvg = ({ flip = false }) => (
  <svg
    viewBox="0 0 180 180"
    width="180"
    height="180"
    aria-hidden="true"
    style={{
      transform: flip ? "scaleX(-1)" : "none",
    }}
  >
    <path
      d={telaranaPaths}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
    />
  </svg>
);

const MurcielagoSvg = () => (
  <svg viewBox="0 0 64 32" width="100%" height="100%" aria-hidden="true">
    <path
      d="M32 10 C30 6 28 4 26 3 C26 7 25 9 23 10 C18 6 10 5 2 8 C6 10 7 13 6 17 C10 14 14 14 17 17 C19 14 22 14 24 16 C26 18 29 19 32 24 C35 19 38 18 40 16 C42 14 45 14 47 17 C50 14 54 14 58 17 C57 13 58 10 62 8 C54 5 46 6 41 10 C39 9 38 7 38 3 C36 4 34 6 32 10 Z"
      fill="currentColor"
    />
    <circle cx="29.5" cy="13" r="0.9" fill="#ff4b55" />
    <circle cx="34.5" cy="13" r="0.9" fill="#ff4b55" />
  </svg>
);

const AranaSvg = () => (
  <svg viewBox="0 0 60 60" width="100%" height="100%" aria-hidden="true">
    <line
      x1="30"
      y1="0"
      x2="30"
      y2="17"
      stroke="currentColor"
      strokeWidth="0.8"
    />
    <g
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
    >
      <path d="M36 24 L49 11 L56 19" />
      <path d="M37 28 L53 21 L58 31" />
      <path d="M37 32 L53 35 L57 47" />
      <path d="M35 36 L47 45 L49 55" />
      <path d="M24 24 L11 11 L4 19" />
      <path d="M23 28 L7 21 L2 31" />
      <path d="M23 32 L7 35 L3 47" />
      <path d="M25 36 L13 45 L11 55" />
    </g>
    <ellipse
      cx="30"
      cy="38"
      rx="10"
      ry="12"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.2"
    />
    <circle
      cx="30"
      cy="24"
      r="6.5"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="1.2"
    />
    <path d="M30 32 L34 38 L30 44 L26 38 Z" fill="#d56b18" />
    <circle cx="27.5" cy="22.5" r="1.5" fill="#e9424f" />
    <circle cx="32.5" cy="22.5" r="1.5" fill="#e9424f" />
  </svg>
);

export const AbrirCajaSerealizacion = ({ onClose }) => {
  return (
    <Container>
      <Decoracion>
        <WebCorner className="web-left">
          <WebSvg />
        </WebCorner>
        <WebCorner className="web-right">
          <WebSvg flip />
        </WebCorner>
        <Bat
          style={{
            animationDuration: "34s",
            animationDelay: "-8s",
          }}
        >
          <BatInner>
            <MurcielagoSvg />
          </BatInner>
        </Bat>
        <Spider
          style={{
            left: "4%",
            height: "115px",
            animationDelay: "0.2s",
          }}
        >
          <SpiderInner>
            <AranaSvg />
          </SpiderInner>
        </Spider>
        <Spider
          style={{
            right: "4%",
            height: "145px",
            animationDelay: "0.5s",
          }}
        >
          <SpiderInner>
            <AranaSvg />
          </SpiderInner>
        </Spider>
      </Decoracion>
      <div className="sub-contenedor">
        <div className="glow" />
        <div className="icono-wrapper">
          <span className="pulso" />
          <Icon
            icon="line-md:alert-circle"
            width="36"
            height="36"
            className="icono-alerta"
          />
        </div>
        <span className="eyebrow">Caja</span>
        <h2>Caja cerrada</h2>
        <p>
          Para ver y gestionar las serializaciones de comprobantes, primero
          debes abrir la caja.
        </p>
        <Btn1
          titulo="De acuerdo"
          bgcolor="#b85c18"
          width="100%"
          funcion={onClose}
        />
      </div>
    </Container>
  );
};
const Container = styled.div`
  top: 0;
  left: 0;
  position: fixed;
  background-color: rgba(6, 5, 12, 0.65);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  display: flex;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: ${fadeIn} 0.25s ease;
  overflow: hidden;
  .sub-contenedor {
    position: relative;
    width: 400px;
    max-width: 85%;
    border-radius: 28px;
    background:
      linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.035),
        rgba(255, 255, 255, 0) 40%
      ),
      ${({ theme }) => theme.bg2};
    padding: 44px 34px 32px;
    z-index: 100;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 6px;
    overflow: hidden;
    box-shadow:
      0 30px 70px -15px rgba(0, 0, 0, 0.55),
      0 0 0 1px rgba(213, 107, 24, 0.16),
      inset 0 0 0 1px rgba(255, 255, 255, 0.025);
    animation: ${popIn} 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      background: linear-gradient(
        90deg,
        #8f3f0e,
        #d56b18,
        #f09a4a,
        #d56b18,
        #8f3f0e
      );
      background-size: 200% 100%;
      animation: ${shimmer} 4s linear infinite;
    }
    &::after {
      content: "";
      position: absolute;
      left: 25px;
      right: 25px;
      bottom: 0;
      height: 1px;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(213, 107, 24, 0.22),
        transparent
      );
    }
    .glow {
      position: absolute;
      top: -70px;
      width: 230px;
      height: 230px;
      background: radial-gradient(
        circle,
        rgba(213, 107, 24, 0.2),
        rgba(184, 92, 24, 0.05) 42%,
        transparent 72%
      );
      pointer-events: none;
      z-index: 0;
    }
    .icono-wrapper {
      position: relative;
      width: 74px;
      height: 74px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(
        145deg,
        rgba(213, 107, 24, 0.18),
        rgba(184, 92, 24, 0.05)
      );
      border: 1px solid rgba(213, 107, 24, 0.24);
      margin-bottom: 14px;
      z-index: 1;
      box-shadow: inset 0 0 20px rgba(213, 107, 24, 0.05);
    }
    .pulso {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      border: 2px solid rgba(213, 107, 24, 0.8);
      animation: ${pulse} 2.2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
    .icono-alerta {
      color: #e8a15d;
      z-index: 1;
    }
    .eyebrow {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: #d56b18;
      z-index: 1;
    }
    h2 {
      font-size: 23px;
      font-weight: 800;
      color: ${({ theme }) => theme.text};
      letter-spacing: -0.4px;
      margin-top: 2px;
      z-index: 1;
    }
    p {
      font-size: 14.5px;
      color: ${({ theme }) =>
        theme.textLight || theme.colorSubtitle || "#9a9aa5"};
      line-height: 1.6;
      margin: 6px 0 16px;
      max-width: 300px;
      z-index: 1;
    }
    button,
    a {
      border-radius: 14px;
      font-weight: 700;
      font-size: 15px;
      padding: 14px 0;
      box-shadow: 0 8px 20px -6px rgba(184, 92, 24, 0.45);
      transition:
        transform 0.15s ease,
        filter 0.15s ease,
        box-shadow 0.15s ease;
      z-index: 1;
      &:hover {
        transform: translateY(-2px);
        filter: brightness(1.08);
        box-shadow: 0 12px 24px -6px rgba(184, 92, 24, 0.55);
      }
      &:active {
        transform: translateY(0);
      }
    }
  }
`;

const Decoracion = styled.div`
  position: fixed;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 1;
`;

const WebCorner = styled.div`
  position: absolute;
  top: -12px;
  width: 180px;
  height: 180px;
  color: ${({ theme }) => theme.halloweenPrimary || "#a85b20"};
  opacity: 0.05;
  animation: ${telaranaAnim} 8s ease-in-out infinite;
  transform-origin: top center;
  &.web-left {
    left: -12px;
  }
  &.web-right {
    right: -12px;
    animation-delay: -3s;
  }
`;

const Bat = styled.div`
  position: absolute;
  top: 14%;
  left: -120px;
  width: 48px;
  height: 24px;
  color: ${({ theme }) => theme.halloweenPrimary || "#7d5d43"};
  opacity: 0.14;
  animation: ${murcielagoVolar} 34s linear infinite;
  will-change: transform;
`;

const BatInner = styled.div`
  width: 100%;
  height: 100%;
  animation: ${aletear} 0.3s ease-in-out infinite alternate;
  filter: drop-shadow(0 0 3px rgba(213, 107, 24, 0.08));
  will-change: transform;
`;

const Spider = styled.div`
  position: absolute;
  top: 0;
  color: ${({ theme }) => theme.halloweenPrimary || "#765438"};
  opacity: 0.1;
  transform-origin: top center;
  animation: ${arañaCaer} 1s cubic-bezier(0.22, 1, 0.36, 1) both;
  will-change: transform;
`;

const SpiderInner = styled.div`
  width: 100%;
  height: 100%;
  transform-origin: top center;
  animation: ${arañaBalancear} 5s ease-in-out infinite alternate;
  svg {
    display: block;
  }
`;
