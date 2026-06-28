import { z } from "zod";
import { watchlistEntrySchema } from "../../../Watchlist/core/schemas/watchlistSchema";

export const listItemSchema = z.object({
  id: z.string().uuid(),
  mediaId: z.number(),
  mediaType: z.enum(["movie", "tv"]),
  snapshot: z.object({
    title: z.string(),
    posterPath: z.string().nullable(),
    rating: z.number(),
  }),
  addedAt: z.string().datetime(),
});

export const customListSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(60),
  description: z.string().max(200).nullable(),
  items: z.array(listItemSchema),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const episodeProgressSchema = z.object({
  tvId: z.number(),
  seasonNumber: z.number(),
  episodeId: z.number(),
  watched: z.boolean(),
  watchedAt: z.string().datetime().nullable(),
});

export const collectionSchema = z.object({
  version: z.number(),
  watchlist: z.array(watchlistEntrySchema),
  customLists: z.array(customListSchema),
  episodeProgress: z.array(episodeProgressSchema),
});