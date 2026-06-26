import type { WatchlistStatus } from "../../core/types/Watchlist.types";

interface WatchlistStatusSelectorProps {
  currentStatus: WatchlistStatus;
  onChange: (status: WatchlistStatus) => void;
}

function WatchlistStatusSelector({
    currentStatus,
    onChange,
  }: WatchlistStatusSelectorProps) {
    return (
      <select
        value={currentStatus}
        onChange={(e) => onChange(e.target.value as WatchlistStatus)}
        style={{
          height: "36px",
          minWidth: "160px",
          padding: "0 12px",
          borderRadius: "8px",
          border: "1px solid #374151",
          background: "#111827",
          color: "#ffffff",
          fontSize: "14px",
          cursor: "pointer",
        }}
      >
        <option value="want_to_watch">Want to Watch</option>
        <option value="watching">Watching</option>
        <option value="completed">Completed</option>
      </select>
    );
  }

export default WatchlistStatusSelector;