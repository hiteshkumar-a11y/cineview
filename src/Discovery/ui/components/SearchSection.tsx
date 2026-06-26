import { useNavigate } from "react-router-dom";

import type { SearchResult } from "../../data/schemas/searchSchema";

interface SearchSectionProps {
  title: string;
  items: SearchResult[];
}

function SearchSection({
  title,
  items,
}: SearchSectionProps) {
  const navigate = useNavigate();

  if (items.length === 0) {
    return null;
  }

  const imageBaseUrl =
    import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

  function handleItemClick(item: SearchResult) {
    if (item.media_type === "movie") {
      navigate(`/movie/${item.id}`);
      return;
    }

    if (item.media_type === "tv") {
      navigate(`/tv/${item.id}`);
    }
  }

  return (
    <section
      style={{
        marginBottom: "40px",
      }}
    >
      <h2
        style={{
          marginBottom: "16px",
        }}
      >
        {title}
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill, minmax(180px,1fr))",
          gap: "20px",
        }}
      >
        {items.map((item) => {
          const image =
            item.poster_path ??
            item.profile_path;

          const isClickable =
            item.media_type === "movie" ||
            item.media_type === "tv";

          return (
            <div
              key={`${item.media_type}-${item.id}`}
              onClick={() =>
                isClickable
                  ? handleItemClick(item)
                  : undefined
              }
              style={{
                background: "#1f1f1f",
                borderRadius: "12px",
                overflow: "hidden",
                cursor: isClickable
                  ? "pointer"
                  : "default",
              }}
            >
              <img
                src={
                  image
                    ? `${imageBaseUrl}${image}`
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt={
                  item.title ??
                  item.name ??
                  "Unknown"
                }
                style={{
                  width: "100%",
                  height: "270px",
                  objectFit: "cover",
                }}
              />

              <div
                style={{
                  padding: "12px",
                }}
              >
                <h3>
                  {item.title ?? item.name}
                </h3>

                <p>
                  {item.media_type.toUpperCase()}
                </p>

                {item.vote_average !==
                  undefined && (
                  <p>
                    ⭐{" "}
                    {item.vote_average.toFixed(1)}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default SearchSection;