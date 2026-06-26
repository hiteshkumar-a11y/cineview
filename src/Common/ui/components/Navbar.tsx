import type { KeyboardEvent } from "react";
import { observer } from "mobx-react-lite";
import { NavLink, useNavigate } from "react-router-dom";

import { authStore } from "../../../Authentication/data/stores/AuthStore";

function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    authStore.logout();

    navigate("/login", {
      replace: true,
    });
  };

  const handleSearchFocus = () => {
    navigate("/search");
  };

  const handleSearchKeyDown = (
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    if (event.key === "Enter") {
      navigate("/search");
    }
  };

  return (
    <nav>
      <div>
        <h2>CineView</h2>
      </div>

      <div>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "active-link" : ""
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/search"
          className={({ isActive }) =>
            isActive ? "active-link" : ""
          }
        >
          Search
        </NavLink>

        <NavLink
          to="/watchlist"
          className={({ isActive }) =>
            isActive ? "active-link" : ""
          }
        >
          Watchlist
        </NavLink>

        <NavLink
          to="/collections"
          className={({ isActive }) =>
            isActive ? "active-link" : ""
          }
        >
          Collections
        </NavLink>

        <NavLink
          to="/tracker"
          className={({ isActive }) =>
            isActive ? "active-link" : ""
          }
        >
          Tracker
        </NavLink>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            isActive ? "active-link" : ""
          }
        >
          Settings
        </NavLink>
      </div>

      <div>
        <input
          type="text"
          placeholder="Search..."
          onFocus={handleSearchFocus}
          onKeyDown={handleSearchKeyDown}
        />

        <button type="button">
          Language
        </button>

        <span>
          {authStore.currentUser}
        </span>

        <button
          type="button"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default observer(Navbar);