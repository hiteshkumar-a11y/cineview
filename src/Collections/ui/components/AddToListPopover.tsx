import { observer } from "mobx-react-lite";

import { collectionStore } from "../../data/stores/CollectionStore";
import type { MediaSnapshot } from "../../core/types/Collection.types";

interface AddToListPopoverProps {
  snapshot: MediaSnapshot;
  onClose: () => void;
}

function AddToListPopover({
  snapshot,
  onClose,
}: AddToListPopoverProps) {
  function handleToggle(listId: string) {
    if (
      collectionStore.isInList(
        listId,
        snapshot.mediaId,
        snapshot.mediaType
      )
    ) {
      const list = collectionStore.getList(listId);
      const item = list?.items.find(
        (i) =>
          i.mediaId === snapshot.mediaId &&
          i.mediaType === snapshot.mediaType
      );

      if (item) {
        collectionStore.removeFromList(listId, item.id);
      }
    } else {
      collectionStore.addToList(listId, snapshot);
    }
  }

  return (
    <div
      role="dialog"
      aria-label="Add to list"
      onClick={(event) => event.stopPropagation()}
      style={{
        position: "absolute",
        top: "100%",
        left: 0,
        marginTop: "8px",
        zIndex: 1000,
        minWidth: "240px",
        maxWidth: "280px",
        padding: "12px",
        background: "#1f1f1f",
        color: "#ffffff",
        border: "1px solid #374151",
        borderRadius: "8px",
        boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5)",
      }}
    >
      <p
        style={{
          margin: "0 0 12px",
          fontWeight: 600,
          fontSize: "14px",
        }}
      >
        Add to list
      </p>

      {collectionStore.customLists.length === 0 ? (
        <p
          style={{
            margin: 0,
            fontSize: "14px",
            color: "#9ca3af",
            lineHeight: 1.5,
          }}
        >
          No lists yet. Create one from the Collections page.
        </p>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            maxHeight: "200px",
            overflowY: "auto",
          }}
        >
          {collectionStore.customLists.map((list) => {
            const isChecked = collectionStore.isInList(
              list.id,
              snapshot.mediaId,
              snapshot.mediaType
            );

            return (
              <label
                key={list.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 10px",
                  borderRadius: "6px",
                  background: isChecked ? "#166534" : "#111827",
                  border: isChecked
                    ? "1px solid #22c55e"
                    : "1px solid #374151",
                  color: "#ffffff",
                  cursor: "pointer",
                  fontSize: "14px",
                }}
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleToggle(list.id)}
                  onClick={(event) => event.stopPropagation()}
                />
                <span>{list.name}</span>
              </label>
            );
          })}
        </div>
      )}

      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          onClose();
        }}
        style={{
          marginTop: "12px",
          width: "100%",
          padding: "8px 12px",
          background: "#374151",
          color: "#ffffff",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          fontWeight: 600,
          fontSize: "14px",
        }}
      >
        Close
      </button>
    </div>
  );
}

export default observer(AddToListPopover);