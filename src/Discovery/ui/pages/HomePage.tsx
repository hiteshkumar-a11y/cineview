import { useMemo, useState } from "react";

import HeroBanner from "../components/HeroBanner";
import GenreFilter from "../components/GenreFilter";
import ContentRow from "../components/ContentRow";
import TrailerModal from "../components/TrailerModal";

import { useHomeContent } from "../hooks/useHomeContent";
import { getMovieVideos } from "../../data/services/tmdbService";

import type { Movie } from "../../data/schemas/movieSchema";

function HomePage() {
  const {
    trending,
    popular,
    topRated,
    upcoming,
    genres,
    genresLoading,
  } = useHomeContent();

  const [activeGenreId, setActiveGenreId] =
    useState<number | null>(null);

  const [trailerKey, setTrailerKey] = useState<
    string | null
  >(null);

  function filterMovies(movies: Movie[]): Movie[] {
    if (activeGenreId === null) {
      return movies;
    }

    return movies.filter((movie) =>
      movie.genre_ids.includes(activeGenreId)
    );
  }

  const filteredTrending = useMemo(
    () => filterMovies(trending.items),
    [trending.items, activeGenreId]
  );

  const filteredPopular = useMemo(
    () => filterMovies(popular.items),
    [popular.items, activeGenreId]
  );

  const filteredTopRated = useMemo(
    () => filterMovies(topRated.items),
    [topRated.items, activeGenreId]
  );

  const filteredUpcoming = useMemo(
    () => filterMovies(upcoming.items),
    [activeGenreId, upcoming.items]
  );

  const heroMovie =
    filteredTrending.length > 0
      ? filteredTrending[0]
      : trending.items[0];

  async function handleWatchTrailer() {
    if (!heroMovie) return;

    try {
      const videos = await getMovieVideos(
        heroMovie.id
      );

      const trailer = videos.results.find(
        (video) =>
          video.site === "YouTube" &&
          video.type === "Trailer"
      );

      if (trailer) {
        setTrailerKey(trailer.key);
      } else {
        alert("No trailer available for this movie.");
      }
    } catch {
      alert("Failed to load trailer.");
    }
  }

  return (
    <>
      {heroMovie && (
        <HeroBanner
          movie={heroMovie}
          onWatchTrailer={handleWatchTrailer}
        />
      )}

      {!genresLoading && (
        <GenreFilter
          genres={genres}
          activeGenreId={activeGenreId}
          onSelect={(id) =>
            setActiveGenreId(
              id === activeGenreId ? null : id
            )
          }
        />
      )}

      <ContentRow
        title="Trending"
        items={filteredTrending}
        isLoading={trending.loading}
        error={trending.error}
      />

      <ContentRow
        title="Popular"
        items={filteredPopular}
        isLoading={popular.loading}
        error={popular.error}
      />

      <ContentRow
        title="Top Rated"
        items={filteredTopRated}
        isLoading={topRated.loading}
        error={topRated.error}
      />

      <ContentRow
        title="Upcoming"
        items={filteredUpcoming}
        isLoading={upcoming.loading}
        error={upcoming.error}
      />

      {trailerKey && (
        <TrailerModal
          videoKey={trailerKey}
          onClose={() => setTrailerKey(null)}
        />
      )}
    </>
  );
}

export default HomePage;