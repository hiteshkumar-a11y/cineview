import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AddToListPopover from "../../../Collections/ui/components/AddToListPopover";
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
  const [showListPopover, setShowListPopover] = useState(false);

  const imageBaseUrl =
    import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

  const posterUrl = movie.poster_path
    ? `${imageBaseUrl}${movie.poster_path}`
    : "https://via.placeholder.com/300x450?text=No+Image";

  const mediaSnapshot = {
    mediaId: movie.id,
    mediaType: "movie" as const,
    title: movie.title,
    posterPath: movie.poster_path ?? null,
    rating: movie.vote_average,
  };

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

  function handleAddToListClick(
    event: React.MouseEvent<HTMLButtonElement>
  ) {
    event.stopPropagation();
    setShowListPopover((prev) => !prev);
  }

  return (
    <div
    onClick={handleCardClick}
    style={{
      width: "180px",
      borderRadius: "12px",
      backgroundColor: "#1f1f1f",
      color: "#ffffff",
      cursor: "pointer",
      flexShrink: 0,
      overflow: "visible", // allow popover to show
    }}
    >
     <div style={{ borderRadius: "12px 12px 0 0", overflow: "hidden" }}>
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
    </div>

      <div style={{ padding: "12px" }}>
        <h3
          style={{
            margin: "0 0 10px 0",
            fontSize: "16px",
            minHeight: "42px",
          }}
        >
          {movie.title}
        </h3>

        <p style={{ marginBottom: "12px", fontWeight: 600 }}>
          ⭐ {movie.vote_average.toFixed(1)}
        </p>

        <div style={{ position: "relative" }}>
          <button
            type="button"
            onClick={handleWatchlistClick}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "14px",
              marginBottom: "8px",
              backgroundColor: isInWatchlist ? "#166534" : "#ffffff",
              color: isInWatchlist ? "#ffffff" : "#111827",
              border: isInWatchlist
                ? "1px solid #22c55e"
                : "1px solid transparent",
            }}
          >
            {isInWatchlist ? "✓ In Watchlist" : "+ Add Watchlist"}
          </button>

          <button
            type="button"
            onClick={handleAddToListClick}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: 600,
              fontSize: "14px",
              background: "#374151",
              color: "#ffffff",
              border: "none",
            }}
          >
            + Add to List
          </button>

          {showListPopover && (
          <div onClick={(e) => e.stopPropagation()}>
            <AddToListPopover
              snapshot={mediaSnapshot}
              onClose={() => setShowListPopover(false)}
            />
          </div>
        )}
        </div>
      </div>
    </div>
  );
}

export default MovieCard;