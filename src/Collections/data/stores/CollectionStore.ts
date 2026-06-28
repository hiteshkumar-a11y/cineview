import { makeAutoObservable } from "mobx";

import {
  COLLECTION_STORAGE_KEY,
  COLLECTION_VERSION,
  LEGACY_WATCHLIST_KEY,
} from "../../core/constants/collectionConstants";

import {
  collectionSchema,
  customListSchema,
  listItemSchema,
  episodeProgressSchema,
} from "../../core/schemas/collectionSchema";

import {
  mediaSnapshotSchema,
  watchlistEntrySchema,
} from "../../../Watchlist/core/schemas/watchlistSchema";

import type { WatchlistEntry, WatchlistStatus } from "../../../Watchlist/core/types/Watchlist.types";
import type { CustomList, MediaSnapshot } from "../../core/types/Collection.types";

class CollectionStore {
  watchlist: WatchlistEntry[] = [];
  customLists: CustomList[] = [];
  episodeProgress: Array<{
    tvId: number;
    seasonNumber: number;
    episodeId: number;
    watched: boolean;
    watchedAt: string | null;
  }> = [];

  constructor() {
    makeAutoObservable(this);
  }

  // --- watchlist (same API as M5) ---
  get entries() { return this.watchlist; }
  get totalCount() { return this.watchlist.length; }

  get countByStatus() {
    const counts = { all: this.watchlist.length, want_to_watch: 0, watching: 0, completed: 0 };
    for (const e of this.watchlist) counts[e.status] += 1;
    return counts;
  }

  isInWatchlist(mediaId: number, mediaType: "movie" | "tv") {
    return this.watchlist.some(e => e.mediaId === mediaId && e.mediaType === mediaType);
  }

  getWatchlistEntry(mediaId: number, mediaType: "movie" | "tv") {
    return this.watchlist.find(e => e.mediaId === mediaId && e.mediaType === mediaType);
  }

  addToWatchlist(snapshotInput: MediaSnapshot) {
    const snapshot = mediaSnapshotSchema.parse(snapshotInput);
    if (this.isInWatchlist(snapshot.mediaId, snapshot.mediaType)) return;

    const now = new Date().toISOString();
    const entry = watchlistEntrySchema.parse({
      id: crypto.randomUUID(),
      mediaId: snapshot.mediaId,
      mediaType: snapshot.mediaType,
      status: "want_to_watch",
      note: null,
      snapshot: { title: snapshot.title, posterPath: snapshot.posterPath, rating: snapshot.rating },
      addedAt: now,
      updatedAt: now,
    });
    this.watchlist = [...this.watchlist, entry];
    this.persist();
  }

  removeFromWatchlist(id: string) {
    const entry = this.watchlist.find(e => e.id === id);
    this.watchlist = this.watchlist.filter(e => e.id !== id);
    if (entry?.mediaType === "tv") {
      this.episodeProgress = this.episodeProgress.filter(p => p.tvId !== entry.mediaId);
    }
    this.persist();
  }

  toggleWatchlist(snapshotInput: MediaSnapshot) {
    const snapshot = mediaSnapshotSchema.parse(snapshotInput);
    const existing = this.getWatchlistEntry(snapshot.mediaId, snapshot.mediaType);
    if (existing) this.removeFromWatchlist(existing.id);
    else this.addToWatchlist(snapshot);
  }

  updateWatchlistStatus(id: string, status: WatchlistStatus) {
    this.watchlist = this.watchlist.map(e =>
      e.id === id ? watchlistEntrySchema.parse({ ...e, status, updatedAt: new Date().toISOString() }) : e
    );
    this.persist();
  }

  updateWatchlistNote(id: string, note: string | null) {
    this.watchlist = this.watchlist.map(e =>
      e.id === id ? watchlistEntrySchema.parse({ ...e, note, updatedAt: new Date().toISOString() }) : e
    );
    this.persist();
  }

  // --- custom lists ---
  createList(name: string, description: string | null = null) {
    const now = new Date().toISOString();
    const list = customListSchema.parse({
      id: crypto.randomUUID(),
      name,
      description,
      items: [],
      createdAt: now,
      updatedAt: now,
    });
    this.customLists = [...this.customLists, list];
    this.persist();
    return list.id;
  }

  renameList(id: string, name: string) {
    this.customLists = this.customLists.map(l =>
      l.id === id ? customListSchema.parse({ ...l, name, updatedAt: new Date().toISOString() }) : l
    );
    this.persist();
  }

  deleteList(id: string) {
    this.customLists = this.customLists.filter(l => l.id !== id);
    this.persist();
  }

  getList(id: string) {
    return this.customLists.find(l => l.id === id);
  }

  addToList(listId: string, snapshotInput: MediaSnapshot) {
    const snapshot = mediaSnapshotSchema.parse(snapshotInput);
    this.customLists = this.customLists.map(list => {
      if (list.id !== listId) return list;
      if (list.items.some(i => i.mediaId === snapshot.mediaId && i.mediaType === snapshot.mediaType)) return list;

      const item = listItemSchema.parse({
        id: crypto.randomUUID(),
        mediaId: snapshot.mediaId,
        mediaType: snapshot.mediaType,
        snapshot: { title: snapshot.title, posterPath: snapshot.posterPath, rating: snapshot.rating },
        addedAt: new Date().toISOString(),
      });

      return customListSchema.parse({
        ...list,
        items: [...list.items, item],
        updatedAt: new Date().toISOString(),
      });
    });
    this.persist();
  }

  removeFromList(listId: string, itemId: string) {
    this.customLists = this.customLists.map(list =>
      list.id === listId
        ? customListSchema.parse({
            ...list,
            items: list.items.filter(i => i.id !== itemId),
            updatedAt: new Date().toISOString(),
          })
        : list
    );
    this.persist();
  }

  isInList(listId: string, mediaId: number, mediaType: "movie" | "tv") {
    const list = this.getList(listId);
    return list?.items.some(i => i.mediaId === mediaId && i.mediaType === mediaType) ?? false;
  }

  // --- episode progress ---
  isEpisodeWatched(tvId: number, seasonNumber: number, episodeId: number) {
    return this.episodeProgress.some(
      p => p.tvId === tvId && p.seasonNumber === seasonNumber && p.episodeId === episodeId && p.watched
    );
  }

  toggleEpisode(tvId: number, seasonNumber: number, episodeId: number) {
    const existing = this.episodeProgress.find(
      p => p.tvId === tvId && p.seasonNumber === seasonNumber && p.episodeId === episodeId
    );

    if (existing) {
      this.episodeProgress = this.episodeProgress.map(p =>
        p === existing
          ? episodeProgressSchema.parse({
              ...p,
              watched: !p.watched,
              watchedAt: !p.watched ? new Date().toISOString() : null,
            })
          : p
      );
    } else {
      this.episodeProgress = [
        ...this.episodeProgress,
        episodeProgressSchema.parse({
          tvId,
          seasonNumber,
          episodeId,
          watched: true,
          watchedAt: new Date().toISOString(),
        }),
      ];
    }
    this.persist();
  }

  getSeasonProgress(tvId: number, seasonNumber: number, totalEpisodes: number) {
    const watched = this.episodeProgress.filter(
      p => p.tvId === tvId && p.seasonNumber === seasonNumber && p.watched
    ).length;
    return { watched, total: totalEpisodes };
  }

  getShowProgress(tvId: number, totalEpisodes: number) {
    const watched = this.episodeProgress.filter(
      (p) => p.tvId === tvId && p.watched
    ).length;
  
    return { watched, total: totalEpisodes };
  }
  
  getWatchedCountForShow(tvId: number) {
    return this.episodeProgress.filter(
      (p) => p.tvId === tvId && p.watched
    ).length;
  }

  markAllSeason(tvId: number, seasonNumber: number, episodeIds: number[]) {
    for (const episodeId of episodeIds) {
      if (!this.isEpisodeWatched(tvId, seasonNumber, episodeId)) {
        this.episodeProgress = [
          ...this.episodeProgress,
          episodeProgressSchema.parse({
            tvId,
            seasonNumber,
            episodeId,
            watched: true,
            watchedAt: new Date().toISOString(),
          }),
        ];
      }
    }
    this.persist();
  }

  unmarkAllSeason(tvId: number, seasonNumber: number) {
    this.episodeProgress = this.episodeProgress.filter(
      p => !(p.tvId === tvId && p.seasonNumber === seasonNumber)
    );
    this.persist();
  }

  init() {
    const stored = localStorage.getItem(COLLECTION_STORAGE_KEY);
    if (stored) {
      try {
        const parsed = collectionSchema.parse(JSON.parse(stored));
        this.watchlist = parsed.watchlist;
        this.customLists = parsed.customLists;
        this.episodeProgress = parsed.episodeProgress;
        return;
      } catch {
        localStorage.removeItem(COLLECTION_STORAGE_KEY);
      }
    }

    // migrate old M5 watchlist
    const legacy = localStorage.getItem(LEGACY_WATCHLIST_KEY);
    if (legacy) {
      try {
        const arr = JSON.parse(legacy);
        if (Array.isArray(arr)) {
          this.watchlist = arr
            .map(i => watchlistEntrySchema.safeParse(i))
            .filter(r => r.success)
            .map(r => r.data);
        }
        this.persist();
        localStorage.removeItem(LEGACY_WATCHLIST_KEY);
      } catch { /* ignore */ }
    }
  }

  private persist() {
    const data = collectionSchema.parse({
      version: COLLECTION_VERSION,
      watchlist: this.watchlist,
      customLists: this.customLists,
      episodeProgress: this.episodeProgress,
    });
    localStorage.setItem(COLLECTION_STORAGE_KEY, JSON.stringify(data));
  }
}

export const collectionStore = new CollectionStore();