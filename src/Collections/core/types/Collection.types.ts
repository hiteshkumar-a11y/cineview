import type { z } from "zod";
import type {
  collectionSchema,
  customListSchema,
  listItemSchema,
  episodeProgressSchema,
} from "../schemas/collectionSchema";
import type { MediaSnapshot } from "../../../Watchlist/core/types/Watchlist.types";

export type CollectionData = z.infer<typeof collectionSchema>;
export type CustomList = z.infer<typeof customListSchema>;
export type ListItem = z.infer<typeof listItemSchema>;
export type EpisodeProgress = z.infer<typeof episodeProgressSchema>;
export type { MediaSnapshot };