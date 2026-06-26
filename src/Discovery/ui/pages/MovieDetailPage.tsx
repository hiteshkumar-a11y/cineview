import { useState } from "react";
import { useParams } from "react-router-dom";

import CastCarousel from "../components/CastCarousel";
import ContentRow from "../components/ContentRow";
import TrailerModal from "../components/TrailerModal";
import { useMovieDetail } from "../hooks/useMovieDetail";
import { formatDate } from "../../../Common/utils/formatDate";
import { useTranslation } from "react-i18next";
const { t, i18n } = useTranslation("movieDetail");

function MovieDetailPage() {
  const { id } = useParams();
  const movieId = Number(id);

  const {
    movie,
    credits,
    trailerVideo,
    similar,
    recommended,
    loading,
    notFound,
    error,
  } = useMovieDetail(movieId);

  const [showTrailer, setShowTrailer] =
    useState(false);

  const imageBaseUrl =
    import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

  if (loading) {
    return <p style={{ padding: "24px" }}>Loading...</p>;
  }

  if (notFound) {
    return (
      <div style={{ padding: "24px" }}>
        <h1>404 — Movie Not Found</h1>
        <p>
          The movie you are looking for does not
          exist.
        </p>
      </div>
    );
  }

  if (error || !movie) {
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

  const backdropUrl = movie.backdrop_path
    ? `${imageBaseUrl}${movie.backdrop_path}`
    : "";

  const posterUrl = movie.poster_path
    ? `${imageBaseUrl}${movie.poster_path}`
    : "https://via.placeholder.com/300x450?text=No+Image";

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
          alt={movie.title}
          style={{
            width: "100%",
            borderRadius: "12px",
          }}
        />

        <div>
          {backdropUrl && (
            <img
              src={backdropUrl}
              alt=""
              style={{
                width: "100%",
                maxHeight: "280px",
                objectFit: "cover",
                borderRadius: "12px",
                marginBottom: "20px",
              }}
            />
          )}

          <h1>{movie.title}</h1>

          {movie.tagline && (
            <p style={{ color: "#9ca3af" }}>
              {movie.tagline}
            </p>
          )}

          <p>⭐ {movie.vote_average.toFixed(1)}</p>

          <p>
  {t("release")}: {formatDate(movie.release_date, i18n.language)}
</p>

          {movie.runtime && (
            <p>Runtime: {movie.runtime} min</p>
          )}

          {movie.genres && (
            <p>
              Genres:{" "}
              {movie.genres
                .map((genre: { name: string }) => genre.name)
                .join(", ")}
            </p>
          )}

          <p
            style={{
              lineHeight: 1.7,
              marginTop: "16px",
            }}
          >
            {movie.overview}
          </p>

          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "20px",
            }}
          >
            <button
              disabled={!trailerVideo}
              onClick={() => setShowTrailer(true)}
            >
              ▶ Watch Trailer
            </button>

            <button
              type="button"
              onClick={() =>
                console.log("Watchlist placeholder")
              }
            >
              + Add to Watchlist
            </button>
          </div>
        </div>
      </section>

      <CastCarousel cast={credits} />

      <ContentRow
        title="Similar Movies"
        items={similar.items}
        isLoading={similar.loading}
        error={similar.error}
      />

      <ContentRow
        title="Recommended Movies"
        items={recommended.items}
        isLoading={recommended.loading}
        error={recommended.error}
      />

      {showTrailer && trailerVideo && (
        <TrailerModal
          videoKey={trailerVideo.key}
          onClose={() => setShowTrailer(false)}
        />
      )}
    </div>
  );
}

export default MovieDetailPage;