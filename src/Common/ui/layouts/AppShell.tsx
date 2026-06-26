import type { ReactNode } from "react";
import styled from "styled-components";

import Navbar from "../components/Navbar";

interface AppShellProps {
  children: ReactNode;
}

const Shell = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.bg};
`;

const Main = styled.main`
  max-width: ${({ theme }) => theme.layout.maxWidth};
  margin: 0 auto;
  padding: ${({ theme }) => theme.layout.pagePadding};
  padding-top: 16px;
`;

function AppShell({ children }: AppShellProps) {
  return (
    <Shell>
      <Navbar />
      <Main>{children}</Main>
    </Shell>
  );
}

export default AppShell;