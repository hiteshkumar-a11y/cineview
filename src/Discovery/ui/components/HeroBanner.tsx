import { useNavigate } from "react-router-dom";

import type { Movie } from "../../data/schemas/movieSchema";

interface HeroBannerProps {
  movie: Movie;
  onWatchTrailer?: () => void;
}

function HeroBanner({
  movie,
  onWatchTrailer,
}: HeroBannerProps) {
  const navigate = useNavigate();

  const imageBaseUrl =
    import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

  const backdropUrl = movie.backdrop_path
    ? `${imageBaseUrl}${movie.backdrop_path}`
    : "";

  function handleMoreInfo() {
    navigate(`/movie/${movie.id}`);
  }

  function handleWatchTrailer() {
    if (onWatchTrailer) {
      onWatchTrailer();
      return;
    }

    // fallback: go to detail page if no trailer handler passed
    navigate(`/movie/${movie.id}`);
  }

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "520px",
        marginBottom: "40px",
        borderRadius: "16px",
        overflow: "hidden",
        backgroundColor: "#111827",
      }}
    >
      {backdropUrl ? (
        <img
          src={backdropUrl}
          alt={movie.title}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      ) : (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, #1e293b, #111827)",
          }}
        />
      )}

      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to right, rgba(0,0,0,0.92), rgba(0,0,0,0.55), rgba(0,0,0,0.15))",
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: "650px",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "60px",
          color: "#ffffff",
          textAlign: "left",
        }}
      >
        <p
          style={{
            margin: 0,
            color: "#facc15",
            fontWeight: 600,
            letterSpacing: "2px",
            textTransform: "uppercase",
          }}
        >
          Trending Now
        </p>

        <h1
          style={{
            marginTop: "16px",
            marginBottom: "20px",
            fontSize: "52px",
            lineHeight: 1.1,
            color: "#ffffff",
          }}
        >
          {movie.title}
        </h1>

        <p
          style={{
            marginBottom: "20px",
            fontSize: "18px",
            color: "#ffffff",
          }}
        >
          ⭐ {movie.vote_average.toFixed(1)}
        </p>

        <p
          style={{
            lineHeight: 1.7,
            marginBottom: "32px",
            color: "#e5e7eb",
          }}
        >
          {movie.overview.length > 220
            ? `${movie.overview.slice(0, 220)}...`
            : movie.overview}
        </p>

        <div
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <button
            type="button"
            onClick={handleWatchTrailer}
            style={{
              padding: "14px 24px",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: 600,
              backgroundColor: "#ffffff",
              color: "#111827",
            }}
          >
            ▶ Watch Trailer
          </button>

          <button
            type="button"
            onClick={handleMoreInfo}
            style={{
              padding: "14px 24px",
              borderRadius: "8px",
              border: "2px solid #ffffff",
              background: "rgba(0,0,0,0.4)",
              color: "#ffffff",
              cursor: "pointer",
              fontSize: "16px",
              fontWeight: 600,
            }}
          >
            More Info
          </button>
        </div>
      </div>
    </section>
  );
}

export default HeroBanner;