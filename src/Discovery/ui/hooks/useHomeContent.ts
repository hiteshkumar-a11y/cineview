import { useEffect, useState } from "react";

import type { Movie } from "../../data/schemas/movieSchema";
import type { Genre } from "../../data/schemas/genreSchema";

import {
  getGenres,
  getPopularMovies,
  getTopRatedMovies,
  getTrendingMovies,
  getUpcomingMovies,
} from "../../data/services/tmdbService";

interface SectionState {
  items: Movie[];
  loading: boolean;
  error: string | null;
}

interface HomeContent {
  trending: SectionState;
  popular: SectionState;
  topRated: SectionState;
  upcoming: SectionState;

  genres: Genre[];
  genresLoading: boolean;
  genresError: string | null;
}

export function useHomeContent(): HomeContent {
  const [trending, setTrending] = useState<SectionState>({
    items: [],
    loading: true,
    error: null,
  });

  const [popular, setPopular] = useState<SectionState>({
    items: [],
    loading: true,
    error: null,
  });

  const [topRated, setTopRated] = useState<SectionState>({
    items: [],
    loading: true,
    error: null,
  });

  const [upcoming, setUpcoming] = useState<SectionState>({
    items: [],
    loading: true,
    error: null,
  });

  const [genres, setGenres] = useState<Genre[]>([]);
  const [genresLoading, setGenresLoading] =
    useState(true);

  const [genresError, setGenresError] =
    useState<string | null>(null);

  useEffect(() => {
    async function loadTrending() {
      try {
        const response =
          await getTrendingMovies();

        setTrending({
          items: response.results,
          loading: false,
          error: null,
        });
      } catch {
        setTrending({
          items: [],
          loading: false,
          error: "Failed to load Trending movies.",
        });
      }
    }

    async function loadPopular() {
      try {
        const response =
          await getPopularMovies();

        setPopular({
          items: response.results,
          loading: false,
          error: null,
        });
      } catch {
        setPopular({
          items: [],
          loading: false,
          error: "Failed to load Popular movies.",
        });
      }
    }

    async function loadTopRated() {
      try {
        const response =
          await getTopRatedMovies();

        setTopRated({
          items: response.results,
          loading: false,
          error: null,
        });
      } catch {
        setTopRated({
          items: [],
          loading: false,
          error: "Failed to load Top Rated movies.",
        });
      }
    }

    async function loadUpcoming() {
      try {
        const response =
          await getUpcomingMovies();

        setUpcoming({
          items: response.results,
          loading: false,
          error: null,
        });
      } catch {
        setUpcoming({
          items: [],
          loading: false,
          error: "Failed to load Upcoming movies.",
        });
      }
    }

    async function loadGenres() {
      try {
        const response =
          await getGenres();

        setGenres(response.genres);
      } catch {
        setGenresError(
          "Failed to load genres."
        );
      } finally {
        setGenresLoading(false);
      }
    }

    loadTrending();
    loadPopular();
    loadTopRated();
    loadUpcoming();
    loadGenres();
  }, []);

  return {
    trending,
    popular,
    topRated,
    upcoming,

    genres,
    genresLoading,
    genresError,
  };
}