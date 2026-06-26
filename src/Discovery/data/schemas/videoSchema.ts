import { z } from "zod";

export const videoSchema = z.object({
  key: z.string(),
  site: z.string(),
  type: z.string(),
  name: z.string().optional(),
});

export const videoListSchema = z.object({
  results: z.array(videoSchema),
});

export type Video = z.infer<typeof videoSchema>;