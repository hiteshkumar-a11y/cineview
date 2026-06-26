import SearchSection from "./SearchSection";

import type {
  SearchResult,
} from "../../data/schemas/searchSchema";

interface SearchResultsProps {
  loading: boolean;
  error: string | null;

  movies: SearchResult[];

  tvShows: SearchResult[];

  people: SearchResult[];
}

function SearchResults({
  loading,
  error,
  movies,
  tvShows,
  people,
}: SearchResultsProps) {
  if (loading) {
    return <p>Searching...</p>;
  }

  if (error) {
    return (
      <p
        style={{
          color: "red",
        }}
      >
        {error}
      </p>
    );
  }

  if (
    movies.length === 0 &&
    tvShows.length === 0 &&
    people.length === 0
  ) {
    return (
      <p>No results found.</p>
    );
  }

  return (
    <>
      <SearchSection
        title="Movies"
        items={movies}
      />

      <SearchSection
        title="TV Shows"
        items={tvShows}
      />

      <SearchSection
        title="People"
        items={people}
      />
    </>
  );
}

export default SearchResults;