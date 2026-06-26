const STORAGE_KEY = "cineview_recent_searches";

const MAX_HISTORY_ITEMS = 10;

/**
 * Returns all recent searches.
 */
export function getRecentSearches(): string[] {
  const storedValue = localStorage.getItem(
    STORAGE_KEY
  );

  if (!storedValue) {
    return [];
  }

  try {
    return JSON.parse(storedValue);
  } catch {
    return [];
  }
}

/**
 * Saves a search query.
 */
export function saveSearch(
  query: string
): void {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return;
  }

  const history =
    getRecentSearches();

  const updatedHistory = [
    trimmedQuery,
    ...history.filter(
      (item) =>
        item.toLowerCase() !==
        trimmedQuery.toLowerCase()
    ),
  ].slice(0, MAX_HISTORY_ITEMS);

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedHistory)
  );
}

/**
 * Removes all saved searches.
 */
export function clearSearchHistory(): void {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Deletes one search query.
 */
export function removeSearch(
  query: string
): void {
  const history =
    getRecentSearches();

  const updatedHistory =
    history.filter(
      (item) =>
        item.toLowerCase() !==
        query.toLowerCase()
    );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedHistory)
  );
}