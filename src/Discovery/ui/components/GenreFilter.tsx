import type { Genre } from "../../data/schemas/genreSchema";

interface GenreFilterProps {
  genres: Genre[];
  activeGenreId: number | null;
  onSelect: (genreId: number | null) => void;
}

function getChipStyle(isActive: boolean) {
  return {
    padding: "8px 16px",
    borderRadius: "20px",
    border: "1px solid #2a2a36",
    cursor: "pointer",
    background: isActive ? "#e50914" : "#1f1f28",
    color: "#ffffff",
    fontWeight: isActive ? 600 : 400,
  } as const;
}

function GenreFilter({
  genres,
  activeGenreId,
  onSelect,
}: GenreFilterProps) {
  return (
    <section
      style={{
        marginBottom: "30px",
      }}
    >
      <h2
        style={{
          color: "#ffffff",
          marginBottom: "15px",
        }}
      >
        Browse by Genre
      </h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <button
          type="button"
          onClick={() => onSelect(null)}
          style={getChipStyle(activeGenreId === null)}
        >
          All
        </button>

        {genres.map((genre) => (
          <button
            key={genre.id}
            type="button"
            onClick={() => onSelect(genre.id)}
            style={getChipStyle(
              activeGenreId === genre.id
            )}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </section>
  );
}

export default GenreFilter;