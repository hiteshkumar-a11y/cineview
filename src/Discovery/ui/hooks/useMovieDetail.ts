import { useEffect, useState } from "react";
import axios from "axios";

import type { MovieDetail } from "../../data/schemas/movieSchema";
import type { CastMember } from "../../data/schemas/creditsSchema";
import type { Video } from "../../data/schemas/videoSchema";
import type { Movie } from "../../data/schemas/movieSchema";

import {
  getMovieCredits,
  getMovieDetails,
  getMovieVideos,
  getRecommendedMovies,
  getSimilarMovies,
} from "../../data/services/tmdbService";

interface SectionState<T> {
  items: T;
  loading: boolean;
  error: string | null;
}

export function useMovieDetail(movieId: number) {
  const [movie, setMovie] =
    useState<MovieDetail | null>(null);
  const [credits, setCredits] = useState<CastMember[]>(
    []
  );
  const [videos, setVideos] = useState<Video[]>([]);
  const [similar, setSimilar] = useState<
    SectionState<Movie[]>
  >({
    items: [],
    loading: true,
    error: null,
  });
  const [recommended, setRecommended] = useState<
    SectionState<Movie[]>
  >({
    items: [],
    loading: true,
    error: null,
  });

  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(
    null
  );

  useEffect(() => {
    if (!movieId || Number.isNaN(movieId)) {
      setNotFound(true);
      setLoading(false);
      return;
    }

    async function loadMovieDetail() {
      setLoading(true);
      setNotFound(false);
      setError(null);

      try {
        const [
          movieData,
          creditsData,
          videosData,
        ] = await Promise.all([
          getMovieDetails(movieId),
          getMovieCredits(movieId),
          getMovieVideos(movieId),
        ]);

        setMovie(movieData);
        setCredits(creditsData.cast);
        setVideos(videosData.results);
      } catch (err) {
        if (
          axios.isAxiosError(err) &&
          err.response?.status === 404
        ) {
          setNotFound(true);
        } else {
          setError("Failed to load movie details.");
        }
      } finally {
        setLoading(false);
      }
    }

    async function loadSimilar() {
      try {
        const response =
          await getSimilarMovies(movieId);

        setSimilar({
          items: response.results,
          loading: false,
          error: null,
        });
      } catch {
        setSimilar({
          items: [],
          loading: false,
          error: "Failed to load similar movies.",
        });
      }
    }

    async function loadRecommended() {
      try {
        const response =
          await getRecommendedMovies(movieId);

        setRecommended({
          items: response.results,
          loading: false,
          error: null,
        });
      } catch {
        setRecommended({
          items: [],
          loading: false,
          error: "Failed to load recommended movies.",
        });
      }
    }

    loadMovieDetail();
    loadSimilar();
    loadRecommended();
  }, [movieId]);

  const trailerVideo = videos.find(
    (video) =>
      video.site === "YouTube" &&
      video.type === "Trailer"
  );

  return {
    movie,
    credits,
    trailerVideo,
    similar,
    recommended,
    loading,
    notFound,
    error,
  };
}