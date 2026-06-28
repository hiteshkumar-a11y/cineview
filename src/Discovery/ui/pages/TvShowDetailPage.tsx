import { useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

import { useTvShowDetail } from "../hooks/useTvShowDetail";
import { collectionStore } from "../../../Collections/data/stores/CollectionStore";
import AddToListPopover from "../../../Collections/ui/components/AddToListPopover";

function TvShowDetailPage() {
  const { id } = useParams();
  const tvId = Number(id);
  const { t } = useTranslation("tvDetail");

  const { show, loading, notFound, error } = useTvShowDetail(tvId);
  const [showListPopover, setShowListPopover] = useState(false);

  const imageBaseUrl =
    import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

  if (loading) {
    return <p style={{ padding: "24px" }}>Loading...</p>;
  }

  if (notFound) {
    return (
      <div style={{ padding: "24px" }}>
        <h1>404 — TV Show Not Found</h1>
        <p>The TV show you are looking for does not exist.</p>
      </div>
    );
  }

  if (error || !show) {
    return (
      <p style={{ padding: "24px", color: "red" }}>
        {error ?? "Something went wrong."}
      </p>
    );
  }

  const inWatchlist = collectionStore.isInWatchlist(show.id, "tv");
  const watchlistEntry = collectionStore.getWatchlistEntry(show.id, "tv");

  const mediaSnapshot = {
    mediaId: show.id,
    mediaType: "tv" as const,
    title: show.name,
    posterPath: show.poster_path ?? null,
    rating: show.vote_average,
  };

  const showProgress = collectionStore.getShowProgress(
    show.id,
    show.number_of_episodes
  );

  const posterUrl = show.poster_path
    ? `${imageBaseUrl}${show.poster_path}`
    : "https://via.placeholder.com/300x450?text=No+Image";

  const visibleSeasons = show.seasons.filter(
    (season) => season.season_number > 0
  );

  return (
    <div style={{ padding: "24px" }}>
      <section
        style={{
          display: "grid",
          gridTemplateColumns: "220px 1fr",
          gap: "32px",
          marginBottom: "40px",
        }}
      >
        <img
          src={posterUrl}
          alt={show.name}
          style={{ width: "100%", borderRadius: "12px" }}
        />

        <div>
          <h1>{show.name}</h1>
          <p>⭐ {show.vote_average.toFixed(1)}</p>
          <p>
            {show.number_of_seasons} seasons ·{" "}
            {show.number_of_episodes} episodes
          </p>
          <p style={{ color: "#9ca3af" }}>
            Progress: {showProgress.watched}/{showProgress.total} episodes
            watched
          </p>

          <p style={{ lineHeight: 1.7, marginTop: "16px" }}>
            {show.overview}
          </p>

          <div
            style={{
              position: "relative",
              marginTop: "20px",
              display: "flex",
              gap: "12px",
              flexWrap: "wrap",
            }}
          >
            <button
              type="button"
              onClick={() =>
                collectionStore.toggleWatchlist(mediaSnapshot)
              }
            >
              {inWatchlist ? t("inWatchlist") : t("addWatchlist")}
              {watchlistEntry?.note ? " 📝" : ""}
            </button>

            <button
              type="button"
              onClick={() => setShowListPopover((prev) => !prev)}
            >
              + Add to List
            </button>

            {showListPopover && (
              <AddToListPopover
                snapshot={mediaSnapshot}
                onClose={() => setShowListPopover(false)}
              />
            )}
          </div>
        </div>
      </section>

      <section style={{ marginBottom: "32px" }}>
        <h2 style={{ marginBottom: "16px" }}>Seasons</h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(180px, 1fr))",
            gap: "16px",
          }}
        >
          {visibleSeasons.map((season) => {
            const seasonPoster = season.poster_path
              ? `${imageBaseUrl}${season.poster_path}`
              : "https://via.placeholder.com/180x270?text=No+Image";

            const seasonProgress = collectionStore.getSeasonProgress(
              show.id,
              season.season_number,
              season.episode_count
            );

            return (
              <Link
                key={season.id}
                to={`/tv/${show.id}/season/${season.season_number}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  background: "#1f1f1f",
                  borderRadius: "12px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={seasonPoster}
                  alt={season.name}
                  style={{
                    width: "100%",
                    height: "240px",
                    objectFit: "cover",
                  }}
                />

                <div style={{ padding: "12px" }}>
                  <h3>{season.name}</h3>
                  <p>{season.episode_count} episodes</p>
                  <p style={{ color: "#9ca3af", fontSize: "14px" }}>
                    {seasonProgress.watched}/{seasonProgress.total} watched
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <Outlet />
    </div>
  );
}

export default observer(TvShowDetailPage);