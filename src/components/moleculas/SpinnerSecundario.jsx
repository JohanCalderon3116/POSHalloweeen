import styled from "styled-components";
import { PuffLoader } from "react-spinners";
import { theme } from "antd";

export const SpinnerSecundario = ({ texto }) => {
  return (
    <Container>
      <PuffLoader color={theme.halloweenAccent} size={20}></PuffLoader>
      <span> {texto} </span>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;
  align-items: center;
  justify-content: center;
`;
