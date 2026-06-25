import { BrowserRouter, Routes, Route } from "react-router-dom";

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

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route path="/" element={<HomePage />} />

        <Route path="/movie/:id" element={<MovieDetailPage />} />

        <Route path="/tv/:id" element={<TvShowDetailPage />} />

        <Route
          path="/tv/:id/season/:seasonNumber"
          element={<SeasonDetailPage />}
        />

        <Route path="/search" element={<SearchPage />} />

        <Route path="/watchlist" element={<WatchlistPage />} />

        <Route path="/collections" element={<CollectionsPage />} />

        <Route path="/tracker" element={<TrackerPage />} />

        <Route path="/settings" element={<SettingsPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;