import { useEffect, useMemo, useState } from "react";

import { searchMulti } from "../../data/services/tmdbService";
import type { SearchResult } from "../../data/schemas/searchSchema";
import { useDebounce } from "./useDebounce";

interface SearchGroups {
  movies: SearchResult[];
  tvShows: SearchResult[];
  people: SearchResult[];
}

const STORAGE_KEY = "recentSearches";

export function useSearch() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const debouncedQuery = useDebounce(query, 500);

  // -----------------------------
  // Load history from localStorage
  // -----------------------------
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setRecentSearches(JSON.parse(stored));
      }
    } catch {
      setRecentSearches([]);
    }
  }, []);

  // -----------------------------
  // Search API call
  // -----------------------------
  useEffect(() => {
    async function search() {
      if (!debouncedQuery.trim()) {
        setResults([]);
        setError(null);
        return;
      }

      try {
        setLoading(true);

        const response = await searchMulti(debouncedQuery);

        setResults(response.results);

        // Save to history ONLY on successful search
        addSearch(debouncedQuery);

        setError(null);
      } catch {
        setError("Failed to search.");
        setResults([]);
      } finally {
        setLoading(false);
      }
    }

    search();
  }, [debouncedQuery]);

  // -----------------------------
  // Helpers: localStorage sync
  // -----------------------------
  const syncToStorage = (data: string[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  };

  // -----------------------------
  // Add search (no duplicates, max 10)
  // -----------------------------
  const addSearch = (searchTerm: string) => {
    const trimmed = searchTerm.trim();
    if (!trimmed) return;

    setRecentSearches((prev) => {
      const updated = [
        trimmed,
        ...prev.filter((item) => item !== trimmed),
      ].slice(0, 10);

      syncToStorage(updated);
      return updated;
    });
  };

  // -----------------------------
  // Remove single history item
  // -----------------------------
  const removeSearch = (searchTerm: string) => {
    setRecentSearches((prev) => {
      const updated = prev.filter(
        (item) => item !== searchTerm
      );

      syncToStorage(updated);
      return updated;
    });
  };

  // -----------------------------
  // Clear all history
  // -----------------------------
  const clearHistory = () => {
    setRecentSearches([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  // -----------------------------
  // Group results (memoized)
  // -----------------------------
  const groupedResults = useMemo<SearchGroups>(() => {
    return {
      movies: results.filter(
        (item) => item.media_type === "movie"
      ),
      tvShows: results.filter(
        (item) => item.media_type === "tv"
      ),
      people: results.filter(
        (item) => item.media_type === "person"
      ),
    };
  }, [results]);

  // -----------------------------
  // Expose API
  // -----------------------------
  return {
    query,
    setQuery,

    loading,
    error,

    results,
    groupedResults,

    recentSearches,
    addSearch,
    removeSearch,
    clearHistory,
  };
}