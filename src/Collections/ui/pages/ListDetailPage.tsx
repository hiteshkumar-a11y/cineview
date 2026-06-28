import { observer } from "mobx-react-lite";
import { useParams, useNavigate } from "react-router-dom";
import { collectionStore } from "../../data/stores/CollectionStore";
import RenameListInline from "../components/RenameListInline";
import DeleteListDialog from "../components/DeleteListDialog";
import { useState } from "react";

function ListDetailPage() {
  const { listId } = useParams();
  const navigate = useNavigate();
  const [showDelete, setShowDelete] = useState(false);
  const list = listId ? collectionStore.getList(listId) : undefined;

  if (!list) {
    return (
      <div style={{ padding: "24px" }}>
        <h1>404 — List Not Found</h1>
        <button type="button" onClick={() => navigate("/collections")}>Back to Lists</button>
      </div>
    );
  }

  const imageBaseUrl = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

  return (
    <div style={{ padding: "24px" }}>
      <RenameListInline listId={list.id} name={list.name} />
      {list.description && <p>{list.description}</p>}

      <button type="button" onClick={() => setShowDelete(true)} style={{ marginBottom: "16px" }}>
        Delete List
      </button>

      {list.items.length === 0 ? (
  <p style={{ color: "#9ca3af" }}>This list is empty.</p>
) : (
  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
    {list.items.map((item) => (
      <article
        key={item.id}
        style={{
          display: "flex",
          gap: "16px",
          padding: "12px",
          background: "#1f1f1f",
          borderRadius: "12px",
          border: "1px solid #374151",
        }}
      >
        <img
          src={
            item.snapshot.posterPath
              ? `${imageBaseUrl}${item.snapshot.posterPath}`
              : "https://via.placeholder.com/60x90?text=No+Image"
          }
          alt={item.snapshot.title}
          style={{ width: 60, height: 90, objectFit: "cover", borderRadius: 8 }}
        />
        <div style={{ flex: 1 }}>
          <p style={{ margin: "0 0 4px", fontWeight: 600, color: "#fff" }}>
            {item.snapshot.title}
          </p>
          <p style={{ margin: "0 0 8px", color: "#9ca3af", fontSize: 14 }}>
            {item.mediaType.toUpperCase()} · ⭐ {item.snapshot.rating.toFixed(1)}
          </p>
          <button
            type="button"
            onClick={() => collectionStore.removeFromList(list.id, item.id)}
            style={{
              padding: "6px 12px",
              background: "transparent",
              color: "#f87171",
              border: "1px solid #374151",
              borderRadius: 6,
              cursor: "pointer",
            }}
          >
            Remove
          </button>
        </div>
      </article>
    ))}
  </div>
)}

      {showDelete && (
        <DeleteListDialog
          listId={list.id}
          onClose={() => setShowDelete(false)}
          onDeleted={() => navigate("/collections")}
        />
      )}
    </div>
  );
}

export default observer(ListDetailPage);