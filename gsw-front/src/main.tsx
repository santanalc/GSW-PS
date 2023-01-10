import { ChakraProvider, theme } from "@chakra-ui/react";
import { Global } from "@emotion/react";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { GlobalStyle } from "./styles/styles";

export const newTheme = {
  ...theme,
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={newTheme} resetCSS={false}>
      <App />
      <Global styles={GlobalStyle} />
    </ChakraProvider>
  </React.StrictMode>
);
