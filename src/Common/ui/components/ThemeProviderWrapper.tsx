import { observer } from "mobx-react-lite";
import type { ReactNode } from "react";
import {
  ThemeProvider as StyledThemeProvider,
} from "styled-components";

import { preferencesStore } from "../../../Preferences/data/stores/PreferencesStore";
import { darkTheme } from "../styles/darkTheme";
import { lightTheme } from "../styles/lightTheme";
import type { AppTheme } from "../../../styled";

function ThemeProviderWrapper({
  children,
}: {
  children: ReactNode;
}) {
  const activeTheme: AppTheme =
    preferencesStore.theme === "light"
      ? lightTheme
      : darkTheme;

  return (
    <StyledThemeProvider theme={activeTheme}>
      {children}
    </StyledThemeProvider>
  );
}

export default observer(ThemeProviderWrapper);