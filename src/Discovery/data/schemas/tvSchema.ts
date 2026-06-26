import { z } from "zod";

export const tvSeasonSummarySchema = z.object({
  id: z.number(),
  name: z.string(),
  season_number: z.number(),
  episode_count: z.number(),
  poster_path: z.string().nullable(),
});

export const tvShowDetailSchema = z.object({
  id: z.number(),
  name: z.string(),
  overview: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
  vote_average: z.number(),
  number_of_seasons: z.number(),
  number_of_episodes: z.number(),
  first_air_date: z.string().optional(),
  seasons: z.array(tvSeasonSummarySchema),
});

export type TvShowDetail = z.infer<
  typeof tvShowDetailSchema
>;

export type TvSeasonSummary = z.infer<
  typeof tvSeasonSummarySchema
>;