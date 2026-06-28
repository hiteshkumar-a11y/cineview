import { useState } from "react";
import { collectionStore } from "../../data/stores/CollectionStore";
import { MAX_LIST_NAME } from "../../core/constants/collectionConstants";

function CreateListModal({ onClose }: { onClose: () => void }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  function handleCreate() {
    if (!name.trim()) return;
    collectionStore.createList(name.trim(), description.trim() || null);
    onClose();
  }

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "grid", placeItems: "center" }}>
      <div style={{ background: "#1f1f1f", padding: 24, borderRadius: 12, width: 400 }}>
        <h2>Create List</h2>
        <input
          value={name}
          maxLength={MAX_LIST_NAME}
          onChange={e => setName(e.target.value)}
          placeholder="List name"
          style={{ width: "100%", marginBottom: 12 }}
        />
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Description (optional)"
          rows={3}
          style={{ width: "100%", marginBottom: 12 }}
        />
        <button type="button" onClick={handleCreate}>Create</button>
        <button type="button" onClick={onClose} style={{ marginLeft: 8 }}>Cancel</button>
      </div>
    </div>
  );
}

export default CreateListModal;