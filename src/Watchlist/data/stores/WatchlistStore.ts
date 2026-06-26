import { makeAutoObservable } from "mobx";

import { WATCHLIST_STORAGE_KEY } from "../../core/constants/watchlistConstants";
import {
  mediaSnapshotSchema,
  watchlistArraySchema,
  watchlistEntrySchema,
} from "../../core/schemas/watchlistSchema";

import type {
  MediaSnapshot,
  WatchlistEntry,
  WatchlistStatus,
} from "../../core/types/Watchlist.types";

class WatchlistStore {
  entries: WatchlistEntry[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  // --- READ helpers (used by UI) ---

  get totalCount(): number {
    return this.entries.length;
  }

  get countByStatus() {
    const counts = {
      all: this.entries.length,
      want_to_watch: 0,
      watching: 0,
      completed: 0,
    };

    for (const entry of this.entries) {
      counts[entry.status] += 1;
    }

    return counts;
  }

  isInWatchlist(
    mediaId: number,
    mediaType: "movie" | "tv"
  ): boolean {
    return this.entries.some(
      (entry) =>
        entry.mediaId === mediaId &&
        entry.mediaType === mediaType
    );
  }

  getEntry(
    mediaId: number,
    mediaType: "movie" | "tv"
  ): WatchlistEntry | undefined {
    return this.entries.find(
      (entry) =>
        entry.mediaId === mediaId &&
        entry.mediaType === mediaType
    );
  }

  // --- WRITE actions ---

  init() {
    const stored = localStorage.getItem(WATCHLIST_STORAGE_KEY);
    if (!stored) return;

    try {
      const parsed = JSON.parse(stored);
      const result = watchlistArraySchema.safeParse(parsed);

      if (result.success) {
        this.entries = result.data;
        return;
      }

      // Drop bad entries one by one
      if (Array.isArray(parsed)) {
        this.entries = parsed
          .map((item) => watchlistEntrySchema.safeParse(item))
          .filter((r) => r.success)
          .map((r) => r.data);
        this.persist();
      }
    } catch {
      localStorage.removeItem(WATCHLIST_STORAGE_KEY);
      this.entries = [];
    }
  }

  add(snapshotInput: MediaSnapshot) {
    const snapshot = mediaSnapshotSchema.parse(snapshotInput);

    if (this.isInWatchlist(snapshot.mediaId, snapshot.mediaType)) {
      return;
    }

    const now = new Date().toISOString();

    const entry = watchlistEntrySchema.parse({
      id: crypto.randomUUID(),
      mediaId: snapshot.mediaId,
      mediaType: snapshot.mediaType,
      status: "want_to_watch",
      note: null,
      snapshot: {
        title: snapshot.title,
        posterPath: snapshot.posterPath,
        rating: snapshot.rating,
      },
      addedAt: now,
      updatedAt: now,
    });

    this.entries = [...this.entries, entry];
    this.persist();
  }

  remove(id: string) {
    this.entries = this.entries.filter((entry) => entry.id !== id);
    this.persist();
  }

  toggle(snapshotInput: MediaSnapshot) {
    const snapshot = mediaSnapshotSchema.parse(snapshotInput);
    const existing = this.getEntry(snapshot.mediaId, snapshot.mediaType);

    if (existing) {
      this.remove(existing.id);
    } else {
      this.add(snapshot);
    }
  }

  updateStatus(id: string, status: WatchlistStatus) {
    this.entries = this.entries.map((entry) => {
      if (entry.id !== id) return entry;

      const updated = {
        ...entry,
        status,
        updatedAt: new Date().toISOString(),
      };

      return watchlistEntrySchema.parse(updated);
    });

    this.persist();
  }

  updateNote(id: string, note: string | null) {
    this.entries = this.entries.map((entry) => {
      if (entry.id !== id) return entry;

      const updated = {
        ...entry,
        note,
        updatedAt: new Date().toISOString(),
      };

      return watchlistEntrySchema.parse(updated);
    });

    this.persist();
  }

  private persist() {
    const validated = watchlistArraySchema.parse(this.entries);
    localStorage.setItem(
      WATCHLIST_STORAGE_KEY,
      JSON.stringify(validated)
    );
  }
}

export const watchlistStore = new WatchlistStore();