import type { z } from "zod";
import type {
  mediaSnapshotSchema,
  watchlistEntrySchema,
  watchlistStatusSchema,
} from "../schemas/watchlistSchema";
import type { SORT_KEYS } from "../constants/watchlistConstants";

export type WatchlistStatus = z.infer<typeof watchlistStatusSchema>;
export type WatchlistEntry = z.infer<typeof watchlistEntrySchema>;
export type MediaSnapshot = z.infer<typeof mediaSnapshotSchema>;
export type SortKey = (typeof SORT_KEYS)[number];
export type WatchlistFilter = WatchlistStatus | "all";