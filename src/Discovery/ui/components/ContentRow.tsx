import type { Movie } from "../../data/schemas/movieSchema";
import MovieCard from "./MovieCard";
import { observer } from "mobx-react-lite";
import { watchlistStore } from "../../../Watchlist/data/stores/WatchlistStore";

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
    <section style={{ marginBottom: "48px" }}>
      <h2 style={{ marginBottom: "20px" }}>{title}</h2>

      {/* ... loading / error / empty states stay the same ... */}

      {!isLoading && !error && items.length > 0 && (
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
              isInWatchlist={watchlistStore.isInWatchlist(
                movie.id,
                "movie"
              )}
              onToggleWatchlist={() =>
                watchlistStore.toggle({
                  mediaId: movie.id,
                  mediaType: "movie",
                  title: movie.title,
                  posterPath: movie.poster_path ?? null,
                  rating: movie.vote_average,
                })
              }
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default observer(ContentRow);