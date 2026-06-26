import { Link, Outlet, useParams } from "react-router-dom";

import { useTvShowDetail } from "../hooks/useTvShowDetail";
import { watchlistStore } from "../../../Watchlist/data/stores/WatchlistStore";
import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";

function TvShowDetailPage() {
  const { id } = useParams();
  const tvId = Number(id);
  const { t } = useTranslation("tvDetail");
  const { show, loading, notFound, error } =
    useTvShowDetail(tvId);

  const imageBaseUrl =
    import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

  if (loading) {
    return <p style={{ padding: "24px" }}>Loading...</p>;
  }

  if (notFound) {
    return (
      <div style={{ padding: "24px" }}>
        <h1>404 — TV Show Not Found</h1>
        <p>
          The TV show you are looking for does not
          exist.
        </p>
      </div>
    );
  }

  if (error || !show) {
    return (
      <p
        style={{
          padding: "24px",
          color: "red",
        }}
      >
        {error ?? "Something went wrong."}
      </p>
    );
  }

  const inWatchlist = watchlistStore.isInWatchlist(show.id, "tv");

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
          style={{
            width: "100%",
            borderRadius: "12px",
          }}
        />

        <div>
          <h1>{show.name}</h1>
          <p>⭐ {show.vote_average.toFixed(1)}</p>
          <p>
            {show.number_of_seasons} seasons ·{" "}
            {show.number_of_episodes} episodes
          </p>
          <p
            style={{
              lineHeight: 1.7,
              marginTop: "16px",
            }}
          >
            {show.overview}
          </p>

          {/* <button
            type="button"
            onClick={() =>
              console.log("Watchlist placeholder")
            }
            style={{ marginTop: "20px" }}
          >
            + Add to Watchlist
          </button> */} 

          <button onClick={() =>
  watchlistStore.toggle({
    mediaId: show.id,
    mediaType: "tv",
    title: show.name,
    posterPath: show.poster_path ?? null,
    rating: show.vote_average,
  })
}>
  {inWatchlist ? t("inWatchlist") : t("addWatchlist")}
</button>
        </div>
      </section>

      <section style={{ marginBottom: "32px" }}>
        <h2 style={{ marginBottom: "16px" }}>
          Seasons
        </h2>

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
                  <p>
                    {season.episode_count} episodes
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