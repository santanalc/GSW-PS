import { css } from "@emotion/react";

export const GlobalStyle = css`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;

    font-family: "Source Sans Pro", sans-serif;
  }

  html {
    max-width: 100vw;
    width: 100%;
    max-height: 100vh;
    min-height: 100%;

    overflow: hidden;
  }

  button {
    cursor: pointer;
  }

  input,
  textarea,
  button {
    outline: none;
    border: none;

    font-family: "Source Sans Pro", sans-serif;
    font-weight: 400;
  }

  body {
    font-family: "Source Sans Pro", sans-serif;
    font-weight: 400;
  }

  body {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  svg {
    flex-shrink: 0;
  }
`;
