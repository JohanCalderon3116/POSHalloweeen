import styled, { useTheme } from "styled-components";
import { CircleLoader } from "react-spinners";

export const Spinner1 = ({ texto }) => {
  const theme = useTheme();
  return (
    <Container>
      <CircleLoader
        color={theme?.halloweenAccent || "#F97316"}
        size={80}
      />
      {texto && <span className="texto">{texto}</span>}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => theme.bgtotal};
  color: ${({ theme }) => theme.text};
  transition: background-color 0.25s ease, color 0.25s ease;

  .texto {
    font-family: "Poppins", sans-serif;
    font-size: 15px;
    font-weight: 500;
    letter-spacing: 0.5px;
    opacity: 0.85;
    color: ${({ theme }) => theme.text};
  }
`;
