import { useEffect, useState } from "react";
import type { KeyboardEvent } from "react";
import styled from "styled-components";
import { observer } from "mobx-react-lite";
import {
  NavLink,
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import { authStore } from "../../../Authentication/data/stores/AuthStore";

const Nav = styled.nav`
  position: sticky;
  top: 0;
  z-index: 100;
  height: ${({ theme }) => theme.layout.navHeight};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 0 24px;
  background: rgba(11, 11, 15, 0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  box-shadow: ${({ theme }) => theme.shadow.nav};
`;

const Brand = styled.div`
  font-size: 24px;
  font-weight: 800;
  letter-spacing: 0.5px;
  color: ${({ theme }) => theme.colors.accent};
  white-space: nowrap;
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
`;

const StyledNavLink = styled(NavLink)`
  padding: 10px 14px;
  border-radius: ${({ theme }) => theme.radius.pill};
  color: ${({ theme }) => theme.colors.textMuted};
  font-weight: 500;
  transition: 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.surfaceHover};
  }

  &.active {
    color: ${({ theme }) => theme.colors.text};
    background: ${({ theme }) => theme.colors.surfaceHover};
  }
`;

const RightSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const SearchInput = styled.input`
  width: 220px;
  padding: 10px 14px;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
  }

  @media (max-width: 900px) {
    width: 140px;
  }
`;

const IconButton = styled.button`
  padding: 10px 14px;
  border-radius: ${({ theme }) => theme.radius.pill};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.surface};
  color: ${({ theme }) => theme.colors.text};
  cursor: pointer;
`;

const Avatar = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: ${({ theme }) => theme.colors.accent};
  color: white;
  font-weight: 700;
  font-size: 14px;
`;

const LogoutButton = styled.button`
  padding: 10px 16px;
  border: none;
  border-radius: ${({ theme }) => theme.radius.pill};
  background: ${({ theme }) => theme.colors.accent};
  color: white;
  font-weight: 600;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.accentHover};
  }
`;

function Navbar() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const urlQuery = searchParams.get("q") ?? "";
  const [navQuery, setNavQuery] = useState(urlQuery);

  useEffect(() => {
    setNavQuery(urlQuery);
  }, [urlQuery]);

  const handleLogout = () => {
    authStore.logout();
    navigate("/login", { replace: true });
  };

  const handleSearchSubmit = () => {
    const trimmed = navQuery.trim();

    if (!trimmed) {
      navigate("/search");
      return;
    }

    navigate(
      `/search?q=${encodeURIComponent(trimmed)}`
    );
  };

  const handleSearchKeyDown = (
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearchSubmit();
    }
  };

  const userInitial =
    authStore.currentUser?.[0]?.toUpperCase() ?? "U";

  return (
    <Nav>
      <Brand>CineView</Brand>

      <NavLinks>
        <StyledNavLink to="/" end>
          Home
        </StyledNavLink>
        <StyledNavLink to="/search">
          Search
        </StyledNavLink>
        <StyledNavLink to="/watchlist">
          Watchlist
        </StyledNavLink>
        <StyledNavLink to="/collections">
          Collections
        </StyledNavLink>
        <StyledNavLink to="/tracker">
          Tracker
        </StyledNavLink>
        <StyledNavLink to="/settings">
          Settings
        </StyledNavLink>
      </NavLinks>

      <RightSection>
        <SearchInput
          type="text"
          placeholder="Search movies, shows..."
          value={navQuery}
          onChange={(event) =>
            setNavQuery(event.target.value)
          }
          onKeyDown={handleSearchKeyDown}
        />

        <IconButton type="button">EN</IconButton>

        <Avatar title={authStore.currentUser ?? "User"}>
          {userInitial}
        </Avatar>

        <LogoutButton
          type="button"
          onClick={handleLogout}
        >
          Logout
        </LogoutButton>
      </RightSection>
    </Nav>
  );
}

export default observer(Navbar);