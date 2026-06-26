import type { Movie } from "../../data/schemas/movieSchema";
import MovieCard from "./MovieCard";

interface ContentRowProps {
  title: string;
  items: Movie[];
  isLoading: boolean;
  error?: string | null;
}

function ContentRow({
  title,
  items,
  isLoading,
  error,
}: ContentRowProps) {
  return (
    <section
      style={{
        marginBottom: "48px",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
        }}
      >
        {title}
      </h2>

      {isLoading && (
        <div
          style={{
            display: "flex",
            gap: "16px",
          }}
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              style={{
                width: 180,
                height: 360,
                background: "#2d2d2d",
                borderRadius: 12,
                flexShrink: 0,
              }}
            />
          ))}
        </div>
      )}

      {!isLoading && error && (
        <p
          style={{
            color: "red",
          }}
        >
          {error}
        </p>
      )}

      {!isLoading &&
        !error &&
        items.length === 0 && (
          <p>No movies found.</p>
        )}

      {!isLoading &&
        !error &&
        items.length > 0 && (
          <div
            style={{
              display: "flex",
              gap: "18px",
              overflowX: "auto",
              paddingBottom: "10px",
            }}
          >
            {items.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                isInWatchlist={false}
                onToggleWatchlist={() =>
                  console.log(movie.title)
                }
              />
            ))}
          </div>
        )}
    </section>
  );
}

export default ContentRow;