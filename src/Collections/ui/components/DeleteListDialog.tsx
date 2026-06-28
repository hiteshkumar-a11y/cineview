import { collectionStore } from "../../data/stores/CollectionStore";

function DeleteListDialog({
  listId,
  onClose,
  onDeleted,
}: {
  listId: string;
  onClose: () => void;
  onDeleted: () => void;
}) {
  function confirmDelete() {
    collectionStore.deleteList(listId);
    onDeleted();
  }

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", display: "grid", placeItems: "center" }}>
      <div style={{ background: "#1f1f1f", padding: 24, borderRadius: 12 }}>
        <p>Delete this list? Watchlist items will not be affected.</p>
        <button type="button" onClick={confirmDelete}>Delete</button>
        <button type="button" onClick={onClose} style={{ marginLeft: 8 }}>Cancel</button>
      </div>
    </div>
  );
}

export default DeleteListDialog;