import styled, { useTheme } from "styled-components";
import { CircleLoader } from "react-spinners";

export const Spinner1 = () => {
  const theme = useTheme();
  return (
    <Container>
      <CircleLoader color={theme.halloweenAccent} size={80}></CircleLoader>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
