import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    *, *::before, *::after {
        box-sizing: border-box;
    }

    html, body, #root {
        min-height: 100vh;
        width: 100%;
        margin: 0;
        padding: 0;
    }

    html {
        background-color: ${(props) => props.theme.bgtotal};
    }

    body {
        font-family: "Poppins", sans-serif;
        background-color: ${(props) => props.theme.bgtotal};
        color: ${(props) => props.theme.text};
        transition: background-color 0.25s ease, color 0.25s ease;
    }

    body::-webkit-scrollbar {
        width: 12px;
        background: rgba(24, 24, 24, 0.2);
    }

    body::-webkit-scrollbar-thumb {
        background: rgba(148, 148, 148, 0.9);
        border-radius: 10px;
        filter: blur(10px);
    }
`;
