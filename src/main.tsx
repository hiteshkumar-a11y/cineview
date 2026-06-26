import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import { GlobalStyle } from "./Common/ui/styles/GlobalStyle";
import ThemeProviderWrapper from "./Common/ui/components/ThemeProviderWrapper";

import "./i18n";
import { preferencesStore } from "./Preferences/data/stores/PreferencesStore";

import "./index.css";

preferencesStore.init();

createRoot(
  document.getElementById("root")!
).render(
  <StrictMode>
    <ThemeProviderWrapper>
      <GlobalStyle />
      <App />
    </ThemeProviderWrapper>
  </StrictMode>
);