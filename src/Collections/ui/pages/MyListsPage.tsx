import { observer } from "mobx-react-lite";
import { useState } from "react";
import { collectionStore } from "../../data/stores/CollectionStore";
import ListCard from "../components/ListCard";
import CreateListModal from "../components/CreateListModal";

function MyListsPage() {
  const [showCreate, setShowCreate] = useState(false);

  return (
    <div style={{ padding: "24px", color: "#ffffff" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <h1 style={{ margin: 0 }}>My Lists</h1>
        <button
          type="button"
          onClick={() => setShowCreate(true)}
          style={{
            padding: "10px 16px",
            background: "#6366f1",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          + Create List
        </button>
      </div>
  
      {collectionStore.customLists.length === 0 ? (
        <p style={{ color: "#9ca3af" }}>No lists yet. Create your first list.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "16px",
          }}
        >
          {collectionStore.customLists.map((list) => (
            <ListCard key={list.id} list={list} />
          ))}
        </div>
      )}
  
      {showCreate && (
        <CreateListModal onClose={() => setShowCreate(false)} />
      )}
    </div>
  );
}

export default observer(MyListsPage);