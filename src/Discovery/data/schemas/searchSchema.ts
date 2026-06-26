import { z } from "zod";

export const searchResultSchema = z.object({
  id: z.number(),

  media_type: z.enum([
    "movie",
    "tv",
    "person",
  ]),

  title: z.string().optional(),

  name: z.string().optional(),

  overview: z.string().optional(),

  poster_path: z.string().nullable().optional(),

  profile_path: z.string().nullable().optional(),

  backdrop_path: z.string().nullable().optional(),

  vote_average: z.number().optional(),
});

export const searchResponseSchema =
  z.object({
    page: z.number(),

    results: z.array(
      searchResultSchema
    ),

    total_pages: z.number(),

    total_results: z.number(),
  });

export type SearchResult = z.infer<
  typeof searchResultSchema
>;

export type SearchResponse = z.infer<
  typeof searchResponseSchema
>;