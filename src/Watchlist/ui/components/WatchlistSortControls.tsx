import type { SortKey } from "../../core/types/Watchlist.types";

interface WatchlistSortControlsProps {
  sortKey: SortKey;
  onSortChange: (key: SortKey) => void;
}

function WatchlistSortControls({
    sortKey,
    onSortChange,
  }: WatchlistSortControlsProps) {
    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          marginBottom: "24px",
        }}
      >
        <label
          htmlFor="watchlist-sort"
          style={{ fontWeight: 600, whiteSpace: "nowrap" }}
        >
          Sort by:
        </label>
  
        <select
          id="watchlist-sort"
          value={sortKey}
          onChange={(e) => onSortChange(e.target.value as SortKey)}
          style={{
            height: "36px",
            minWidth: "160px",
            padding: "0 12px",
            borderRadius: "8px",
            border: "1px solid #374151",
            background: "#111827",
            color: "#ffffff",
            fontSize: "14px",
          }}
        >
          <option value="date_added">Date Added</option>
          <option value="title">Title</option>
          <option value="rating">Rating</option>
        </select>
      </div>
    );
  }

export default WatchlistSortControls;