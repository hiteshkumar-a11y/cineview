import { Link } from "react-router-dom";
import type { CustomList } from "../../core/types/Collection.types";

function ListCard({ list }: { list: CustomList }) {
  const imageBaseUrl = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;
  const previews = list.items.slice(0, 4);

  return (
    <Link
      to={`/collections/${list.id}`}
      style={{
        display: "block",
        textDecoration: "none",
        color: "#ffffff",
        background: "#1f1f1f",
        borderRadius: "12px",
        padding: "16px",
        border: "1px solid #374151",
        transition: "transform 0.2s ease",
      }}
    >
      <h3 style={{ margin: "0 0 8px", fontSize: "18px" }}>{list.name}</h3>
      <p style={{ margin: "0 0 12px", color: "#9ca3af", fontSize: "14px" }}>
        {list.items.length} {list.items.length === 1 ? "item" : "items"}
      </p>

      <div style={{ display: "flex", gap: "8px", minHeight: 72 }}>
        {previews.length === 0 ? (
          <div
            style={{
              width: 48,
              height: 72,
              background: "#374151",
              borderRadius: 4,
              display: "grid",
              placeItems: "center",
              fontSize: 12,
              color: "#9ca3af",
            }}
          >
            Empty
          </div>
        ) : (
          previews.map((item) => (
            <img
              key={item.id}
              src={
                item.snapshot.posterPath
                  ? `${imageBaseUrl}${item.snapshot.posterPath}`
                  : "https://via.placeholder.com/48x72?text=No+Image"
              }
              alt={item.snapshot.title}
              style={{
                width: 48,
                height: 72,
                objectFit: "cover",
                borderRadius: 4,
              }}
            />
          ))
        )}
      </div>
    </Link>
  );
}

export default ListCard;