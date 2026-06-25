interface LoginFormProps {
  username: string;
  password: string;
  showPassword: boolean;
  errorMessage: string | null;

  onUsernameChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onTogglePassword: () => void;
  onSubmit: () => void;
}

function LoginForm({
  username,
  password,
  showPassword,
  errorMessage,
  onUsernameChange,
  onPasswordChange,
  onTogglePassword,
  onSubmit,
}: LoginFormProps) {
  return (
    <div>
      <h1>Login</h1>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(event) =>
          onUsernameChange(event.target.value)
        }
      />

      <input
        type={
          showPassword
            ? "text"
            : "password"
        }
        placeholder="Password"
        value={password}
        onChange={(event) =>
          onPasswordChange(event.target.value)
        }
      />

      <button
        type="button"
        onClick={onTogglePassword}
      >
        {showPassword
          ? "Hide"
          : "Show"}
      </button>

      {errorMessage && (
        <p>{errorMessage}</p>
      )}

      <button
        type="button"
        onClick={onSubmit}
      >
        Login
      </button>
    </div>
  );
}

export default LoginForm;