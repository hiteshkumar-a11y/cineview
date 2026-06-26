import { useNavigate } from "react-router-dom";

import type { Movie } from "../../data/schemas/movieSchema";

interface MovieCardProps {
  movie: Movie;
  isInWatchlist?: boolean;
  onToggleWatchlist?: () => void;
}

function MovieCard({
  movie,
  isInWatchlist = false,
  onToggleWatchlist,
}: MovieCardProps) {
  const navigate = useNavigate();

  const imageBaseUrl =
    import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

  const posterUrl = movie.poster_path
    ? `${imageBaseUrl}${movie.poster_path}`
    : "https://via.placeholder.com/300x450?text=No+Image";

  function handleCardClick() {
    navigate(`/movie/${movie.id}`);
  }

  function handleWatchlistClick(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    event.stopPropagation();

    if (onToggleWatchlist) {
      onToggleWatchlist();
    }
  }

  return (
    <div
      onClick={handleCardClick}
      style={{
        width: "180px",
        borderRadius: "12px",
        overflow: "hidden",
        backgroundColor: "#1f1f1f",
        color: "#ffffff",
        cursor: "pointer",
        transition: "transform 0.2s ease",
        flexShrink: 0,
      }}
    >
      <img
        src={posterUrl}
        alt={movie.title}
        style={{
          width: "100%",
          height: "270px",
          objectFit: "cover",
          display: "block",
        }}
      />

      <div
        style={{
          padding: "12px",
        }}
      >
        <h3
          style={{
            margin: "0 0 10px 0",
            fontSize: "16px",
            minHeight: "42px",
          }}
        >
          {movie.title}
        </h3>

        <p
          style={{
            marginBottom: "12px",
            fontWeight: 600,
          }}
        >
          ⭐ {movie.vote_average.toFixed(1)}
        </p>

        <button
          onClick={handleWatchlistClick}
          style={{
            width: "100%",
            padding: "10px",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          {isInWatchlist
            ? "✓ In Watchlist"
            : "+ Add Watchlist"}
        </button>
      </div>
    </div>
  );
}

export default MovieCard;