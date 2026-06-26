import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import SearchBar from "../components/SearchBar";
import RecentSearches from "../components/RecentSearches";
import SearchResults from "../components/SearchResults";
import { useSearch } from "../hooks/useSearch";

export default function SearchPage() {
  const [searchParams] = useSearchParams();

  const {
    query,
    setQuery,
    loading,
    error,
    groupedResults,
    recentSearches,
    addSearch,
    removeSearch,
    clearHistory,
  } = useSearch();

  useEffect(() => {
    const urlQuery = searchParams.get("q") ?? "";

    if (urlQuery) {
      setQuery(urlQuery);
    }
  }, [searchParams, setQuery]);

  const handleSelectRecent = (term: string) => {
    setQuery(term);
    addSearch(term);
  };

  return (
    <div>
      <h1
        style={{
          marginBottom: "24px",
          color: "#ffffff",
        }}
      >
        Search
      </h1>

      <SearchBar
        value={query}
        onChange={setQuery}
      />

      <RecentSearches
        searches={recentSearches}
        onSelect={handleSelectRecent}
        onRemove={removeSearch}
        onClear={clearHistory}
      />

      <SearchResults
        loading={loading}
        error={error}
        movies={groupedResults.movies}
        tvShows={groupedResults.tvShows}
        people={groupedResults.people}
      />
    </div>
  );
}