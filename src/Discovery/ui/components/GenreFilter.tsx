import type { Genre } from "../../data/schemas/genreSchema";

interface GenreFilterProps {
  genres: Genre[];
  activeGenreId: number | null;
  onSelect: (genreId: number | null) => void;
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
      <h2>Browse by Genre</h2>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "10px",
          marginTop: "15px",
        }}
      >
        <button
          onClick={() => onSelect(null)}
          style={{
            padding: "8px 16px",
            borderRadius: "20px",
            border: "1px solid #ccc",
            cursor: "pointer",
            background:
              activeGenreId === null
                ? "#2563eb"
                : "#ffffff",
            color:
              activeGenreId === null
                ? "#ffffff"
                : "#000000",
          }}
        >
          All
        </button>

        {genres.map((genre) => (
          <button
            key={genre.id}
            onClick={() => onSelect(genre.id)}
            style={{
              padding: "8px 16px",
              borderRadius: "20px",
              border: "1px solid #ccc",
              cursor: "pointer",
              background:
                activeGenreId === genre.id
                  ? "#2563eb"
                  : "#ffffff",
              color:
                activeGenreId === genre.id
                  ? "#ffffff"
                  : "#000000",
            }}
          >
            {genre.name}
          </button>
        ))}
      </div>
    </section>
  );
}

export default GenreFilter;