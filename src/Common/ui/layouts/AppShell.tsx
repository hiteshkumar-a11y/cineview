import type { ReactNode } from "react";

import Navbar from "../components/Navbar";

interface AppShellProps {
  children: ReactNode;
}

function AppShell({
  children,
}: AppShellProps) {
  return (
    <>
      <Navbar />

      <main>{children}</main>
    </>
  );
}

export default AppShell;