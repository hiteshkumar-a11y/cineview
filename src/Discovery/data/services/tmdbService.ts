import { tmdbClient } from "./tmdbClient";

import {
  movieListSchema,
  movieDetailSchema,
} from "../schemas/movieSchema";

import {
  genreListSchema,
} from "../schemas/genreSchema";

import {
  searchResponseSchema,
} from "../schemas/searchSchema";

import {
  creditsSchema,
} from "../schemas/creditsSchema";

import {
  videoListSchema,
} from "../schemas/videoSchema";

import {
  tvShowDetailSchema,
} from "../schemas/tvSchema";

import {
  seasonDetailSchema,
} from "../schemas/seasonSchema";

/* ----------------------------------------------------------
   Home Page
---------------------------------------------------------- */

export async function getTrendingMovies() {
  const response = await tmdbClient.get(
    "/trending/movie/week"
  );

  return movieListSchema.parse(response.data);
}

export async function getPopularMovies() {
  const response = await tmdbClient.get(
    "/movie/popular"
  );

  return movieListSchema.parse(response.data);
}

export async function getTopRatedMovies() {
  const response = await tmdbClient.get(
    "/movie/top_rated"
  );

  return movieListSchema.parse(response.data);
}

export async function getUpcomingMovies() {
  const response = await tmdbClient.get(
    "/movie/upcoming"
  );

  return movieListSchema.parse(response.data);
}

export async function getGenres() {
  const response = await tmdbClient.get(
    "/genre/movie/list"
  );

  return genreListSchema.parse(response.data);
}

/* ----------------------------------------------------------
   Search
---------------------------------------------------------- */

export async function searchMulti(
  query: string
) {
  const response = await tmdbClient.get(
    "/search/multi",
    {
      params: {
        query,
      },
    }
  );

  return searchResponseSchema.parse(
    response.data
  );
}

/* ----------------------------------------------------------
   Movie Details
---------------------------------------------------------- */

export async function getMovieDetails(
  movieId: number
) {
  const response = await tmdbClient.get(
    `/movie/${movieId}`
  );

  return movieDetailSchema.parse(response.data);
}

export async function getMovieCredits(
  movieId: number
) {
  const response = await tmdbClient.get(
    `/movie/${movieId}/credits`
  );

  return creditsSchema.parse(response.data);
}

export async function getMovieVideos(
  movieId: number
) {
  const response = await tmdbClient.get(
    `/movie/${movieId}/videos`
  );

  return videoListSchema.parse(response.data);
}

export async function getSimilarMovies(
  movieId: number
) {
  const response = await tmdbClient.get(
    `/movie/${movieId}/similar`
  );

  return movieListSchema.parse(response.data);
}

export async function getRecommendedMovies(
  movieId: number
) {
  const response = await tmdbClient.get(
    `/movie/${movieId}/recommendations`
  );

  return movieListSchema.parse(response.data);
}

/* ----------------------------------------------------------
   TV Shows
---------------------------------------------------------- */

export async function getTvDetails(
  tvId: number
) {
  const response = await tmdbClient.get(
    `/tv/${tvId}`
  );

  return tvShowDetailSchema.parse(response.data);
}

export async function getSeasonDetails(
  tvId: number,
  seasonNumber: number
) {
  const response = await tmdbClient.get(
    `/tv/${tvId}/season/${seasonNumber}`
  );

  return seasonDetailSchema.parse(response.data);
}