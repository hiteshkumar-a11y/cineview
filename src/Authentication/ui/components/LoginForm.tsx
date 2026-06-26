import styled from "styled-components";

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

const Page = styled.div`
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: 24px;
  background:
  radial-gradient(circle at top, rgba(229, 9, 20, 0.18), transparent 35%),
  ${({ theme }) => theme.colors.bg};
`;

const Card = styled.div`
  width: 100%;
  max-width: 420px;
  padding: 32px;
  border-radius: ${({ theme }) => theme.radius.lg};
  background: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadow.card};
`;

const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 24px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
`;

const Label = styled.label`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.text};
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

const PasswordRow = styled.div`
  display: flex;
  gap: 8px;
`;

const ToggleButton = styled.button`
  padding: 0 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
`;

const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.error};
  margin-bottom: 16px;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: ${({ theme }) => theme.radius.md};
  background: ${({ theme }) => theme.colors.accent};
  color: white;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.accentHover};
  }
`;

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
    <Page>
      <Card>
        <Title>Sign In</Title>
        <Subtitle>Welcome back to CineView</Subtitle>

        <Field>
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) =>
              onUsernameChange(e.target.value)
            }
          />
        </Field>

        <Field>
          <Label htmlFor="password">Password</Label>
          <PasswordRow>
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                onPasswordChange(e.target.value)
              }
            />
            <ToggleButton
              type="button"
              onClick={onTogglePassword}
            >
              {showPassword ? "Hide" : "Show"}
            </ToggleButton>
          </PasswordRow>
        </Field>

        {errorMessage && (
          <ErrorText>{errorMessage}</ErrorText>
        )}

        <SubmitButton type="button" onClick={onSubmit}>
          Sign In
        </SubmitButton>
      </Card>
    </Page>
  );
}

export default LoginForm;