import { z } from "zod";

import { genreSchema } from "./genreSchema";

export const movieSchema = z.object({
  id: z.number(),
  title: z.string(),
  overview: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  vote_average: z.number(),
  genre_ids: z.array(z.number()),
});

export const movieListSchema = z.object({
  results: z.array(movieSchema),
});

export const movieDetailSchema = z.object({
  id: z.number(),
  title: z.string(),
  overview: z.string(),
  tagline: z.string().optional(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  vote_average: z.number(),
  runtime: z.number().nullable().optional(),
  release_date: z.string().optional(),
  genres: z.array(genreSchema).optional(),
});

export type Movie = z.infer<typeof movieSchema>;

export type MovieDetail = z.infer<
  typeof movieDetailSchema
>;