import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";

import App from "./App.tsx";
import { GlobalStyle } from "./Common/ui/styles/GlobalStyle";
import { theme } from "./Common/ui/styles/theme";

import "./index.css";

createRoot(
  document.getElementById("root")!
).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <App />
    </ThemeProvider>
  </StrictMode>
);