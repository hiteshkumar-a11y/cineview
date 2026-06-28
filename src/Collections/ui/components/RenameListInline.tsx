import { useState } from "react";
import { collectionStore } from "../../data/stores/CollectionStore";

function RenameListInline({ listId, name }: { listId: string; name: string }) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(name);

  function save() {
    if (value.trim()) collectionStore.renameList(listId, value.trim());
    setEditing(false);
  }

  if (editing) {
    return (
      <>
        <input value={value} onChange={e => setValue(e.target.value)} />
        <button type="button" onClick={save}>Save</button>
        <button type="button" onClick={() => setEditing(false)}>Cancel</button>
      </>
    );
  }

  return (
    <h1 onClick={() => setEditing(true)} style={{ cursor: "pointer" }}>
      {name} ✏️
    </h1>
  );
}

export default RenameListInline;