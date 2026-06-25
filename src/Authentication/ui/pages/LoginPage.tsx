import { useState } from "react";
import { observer } from "mobx-react-lite";

import {
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";

import LoginForm from "../components/LoginForm";

import { authStore } from "../../data/stores/AuthStore";

function LoginPage() {
  const navigate = useNavigate();

  const location = useLocation();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState<string | null>(null);

  if (authStore.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = () => {
    if (!username.trim()) {
      setErrorMessage(
        "Username is required"
      );

      return;
    }

    if (!password.trim()) {
      setErrorMessage(
        "Password is required"
      );

      return;
    }

    const success =
      authStore.login(
        username,
        password
      );

    if (!success) {
      setErrorMessage(
        "Invalid username or password"
      );

      return;
    }

    const redirectTo =
      location.state?.from || "/";

    navigate(redirectTo, {
      replace: true,
    });
  };

  return (
    <LoginForm
      username={username}
      password={password}
      showPassword={showPassword}
      errorMessage={errorMessage}
      onUsernameChange={setUsername}
      onPasswordChange={setPassword}
      onTogglePassword={() =>
        setShowPassword(
          (prev) => !prev
        )
      }
      onSubmit={handleSubmit}
    />
  );
}

export default observer(LoginPage);