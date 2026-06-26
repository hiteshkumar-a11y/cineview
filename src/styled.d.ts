import "styled-components";

import type { AppTheme } from "./Common/ui/styles/theme";

declare module "styled-components" {
  export interface DefaultTheme extends AppTheme {}
}