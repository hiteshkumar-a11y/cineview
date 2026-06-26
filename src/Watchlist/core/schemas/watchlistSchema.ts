import { z } from "zod";

export const watchlistStatusSchema = z.enum([
  "want_to_watch",
  "watching",
  "completed",
]);

export const mediaSnapshotSchema = z.object({
  mediaId: z.number(),
  mediaType: z.enum(["movie", "tv"]),
  title: z.string(),
  posterPath: z.string().nullable(),
  rating: z.number(),
});

export const watchlistEntrySchema = z.object({
  id: z.string().uuid(),
  mediaId: z.number(),
  mediaType: z.enum(["movie", "tv"]),
  status: watchlistStatusSchema,
  note: z.string().max(300).nullable(),
  snapshot: z.object({
    title: z.string(),
    posterPath: z.string().nullable(),
    rating: z.number(),
  }),
  addedAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export const watchlistArraySchema = z.array(watchlistEntrySchema);