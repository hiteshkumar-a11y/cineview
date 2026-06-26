import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginPage from "../../Authentication/ui/pages/LoginPage";

import HomePage from "../../Discovery/ui/pages/HomePage";
import MovieDetailPage from "../../Discovery/ui/pages/MovieDetailPage";
import TvShowDetailPage from "../../Discovery/ui/pages/TvShowDetailPage";
import SeasonDetailPage from "../../Discovery/ui/pages/SeasonDetailPage";
import SearchPage from "../../Discovery/ui/pages/SearchPage";

import WatchlistPage from "../../Watchlist/ui/pages/WatchlistPage";

import CollectionsPage from "../../Collections/ui/pages/CollectionsPage";

import TrackerPage from "../../Tracker/ui/pages/TrackerPage";

import SettingsPage from "../../Preferences/ui/pages/SettingsPage";

import ProtectedRoute from "./ProtectedRoute";

import AppShell from "../../Common/ui/layouts/AppShell";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppShell>
                <HomePage />
              </AppShell>
            </ProtectedRoute>
          }
        />

        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <AppShell>
                <SearchPage />
              </AppShell>
            </ProtectedRoute>
          }
        />

        <Route
          path="/movie/:id"
          element={
            <ProtectedRoute>
              <AppShell>
                <MovieDetailPage />
              </AppShell>
            </ProtectedRoute>
          }
        />

        <Route
          path="/tv/:id"
          element={
            <ProtectedRoute>
              <AppShell>
                <TvShowDetailPage />
              </AppShell>
            </ProtectedRoute>
          }
        >
          <Route
            path="season/:seasonNumber"
            element={<SeasonDetailPage />}
          />
        </Route>

        <Route
          path="/watchlist"
          element={
            <ProtectedRoute>
              <AppShell>
                <WatchlistPage />
              </AppShell>
            </ProtectedRoute>
          }
        />

        <Route
          path="/collections"
          element={
            <ProtectedRoute>
              <AppShell>
                <CollectionsPage />
              </AppShell>
            </ProtectedRoute>
          }
        />

        <Route
          path="/tracker"
          element={
            <ProtectedRoute>
              <AppShell>
                <TrackerPage />
              </AppShell>
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <AppShell>
                <SettingsPage />
              </AppShell>
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;