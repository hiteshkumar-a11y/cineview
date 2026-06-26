import { observer } from "mobx-react-lite";
import { useMemo, useState } from "react";

import { watchlistStore } from "../../data/stores/WatchlistStore";
import type {
  SortKey,
  WatchlistFilter,
} from "../../core/types/Watchlist.types";

import WatchlistFilterTabs from "../components/WatchlistFilterTabs";
import WatchlistSortControls from "../components/WatchlistSortControls";
import WatchlistEntryCard from "../components/WatchlistEntryCard";
import EmptyState from "../components/EmptyState";

function WatchlistPage() {
  const [activeFilter, setActiveFilter] =
    useState<WatchlistFilter>("all");
  const [sortKey, setSortKey] = useState<SortKey>("date_added");

  const filteredEntries = useMemo(() => {
    let list = watchlistStore.entries;

    if (activeFilter !== "all") {
      list = list.filter((entry) => entry.status === activeFilter);
    }

    return [...list].sort((a, b) => {
      if (sortKey === "date_added") {
        return b.addedAt.localeCompare(a.addedAt);
      }
      if (sortKey === "title") {
        return a.snapshot.title.localeCompare(b.snapshot.title);
      }
      return b.snapshot.rating - a.snapshot.rating;
    });
  }, [watchlistStore.entries, activeFilter, sortKey]);

  return (
    <div style={{ padding: "24px" }}>
      <h1>Watchlist</h1>

      <WatchlistFilterTabs
        activeFilter={activeFilter}
        counts={watchlistStore.countByStatus}
        onSelect={setActiveFilter}
      />

      <WatchlistSortControls
        sortKey={sortKey}
        onSortChange={setSortKey}
      />

      {filteredEntries.length === 0 ? (
        <EmptyState />
      ) : (
        filteredEntries.map((entry) => (
          <WatchlistEntryCard
          key={entry.id}
          entry={entry}
          onRemove={() => watchlistStore.remove(entry.id)}
          onStatusChange={(status) =>
            watchlistStore.updateStatus(entry.id, status)
          }
          onNoteChange={(note) =>
            watchlistStore.updateNote(entry.id, note)
          }
        />
        ))
      )}
    </div>
  );
}

export default observer(WatchlistPage);