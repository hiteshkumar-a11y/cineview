import { z } from "zod";

export const episodeSchema = z.object({
  id: z.number(),
  name: z.string(),
  overview: z.string(),
  still_path: z.string().nullable(),
  episode_number: z.number(),
  season_number: z.number(),
  vote_average: z.number(),
  runtime: z.number().nullable().optional(),
  air_date: z.string().nullable().optional(),
});

export const seasonDetailSchema = z.object({
  id: z.number(),
  name: z.string(),
  overview: z.string(),
  season_number: z.number(),
  episodes: z.array(episodeSchema),
});

export type Episode = z.infer<typeof episodeSchema>;

export type SeasonDetail = z.infer<
  typeof seasonDetailSchema
>;