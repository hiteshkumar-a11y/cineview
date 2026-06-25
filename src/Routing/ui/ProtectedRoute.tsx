import {
  Navigate,
  useLocation,
} from "react-router-dom";
import { observer } from "mobx-react-lite";

import type { ReactNode } from "react";

import { authStore } from "../../Authentication/data/stores/AuthStore";

interface ProtectedRouteProps {
  children: ReactNode;
}

function ProtectedRoute({
  children,
}: ProtectedRouteProps) {
  const location = useLocation();

  if (
    !authStore.isAuthenticated
  ) {
    return (
      <Navigate
        to="/login"
        state={{
          from:
            location.pathname,
        }}
        replace
      />
    );
  }

  return children;
}

export default observer(ProtectedRoute);