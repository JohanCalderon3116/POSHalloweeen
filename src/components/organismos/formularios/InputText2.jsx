import styled from "styled-components";

export function InputText2({ children }) {
  return (
    <Container>
      <div className="form__group field">{children}</div>
    </Container>
  );
}

const Container = styled.div`
  position: relative;

  display: flex;
  align-items: center;

  width: 100%;

  .form__group {
    position: relative;
    width: 100%;
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-background-clip: text;
    -webkit-text-fill-color: ${({ theme }) => theme.text};
    transition: background-color 5000s ease-in-out 0s;
  }

  .form__field {
    border: 1px solid
      ${({ theme }) =>
        theme.body === "#fff"
          ? "rgba(0, 0, 0, 0.12)"
          : "rgba(255, 255, 255, 0.10)"};

    border-radius: 12px;

    font-family: inherit;

    outline: 0;

    font-size: 17px;

    color: ${({ theme }) => theme.text};

    padding: 12px;

    background: transparent;

    transition:
      border-color 0.2s ease,
      box-shadow 0.2s ease,
      background-color 0.2s ease;

    width: 94%;

    &.disabled {
      color: #696969;

      background: #2d2d2d;

      border-radius: 8px;

      margin-top: 8px;

      border-bottom: 1px dashed #656565;
    }
  }

  .form__field:placeholder-shown ~ .form__label {
    font-size: 17px;
    cursor: text;
  }

  .form__field:focus {
    font-weight: 700;

    border: 1px solid rgba(197, 106, 32, 0.42);

    box-shadow: 0 0 0 3px rgba(197, 106, 32, 0.055);

    background: ${({ theme }) =>
      theme.body === "#fff"
        ? "rgba(197, 106, 32, 0.012)"
        : "rgba(197, 106, 32, 0.018)"};
  }

  .form__field:hover:not(:focus) {
    border-color: ${({ theme }) =>
      theme.body === "#fff"
        ? "rgba(0, 0, 0, 0.17)"
        : "rgba(255, 255, 255, 0.14)"};
  }

  .form__field:required,
  .form__field:invalid {
    box-shadow: none;
  }

  .form__field::placeholder {
    color: ${({ theme }) => theme.text};
    opacity: 0.42;
  }
`;
