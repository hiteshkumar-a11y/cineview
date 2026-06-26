import type { WatchlistFilter } from "../../core/types/Watchlist.types";
  
  interface WatchlistFilterTabsProps {
    activeFilter: WatchlistFilter;
    counts: Record<WatchlistFilter, number>;
    onSelect: (filter: WatchlistFilter) => void;
  }
  
  const TABS: { key: WatchlistFilter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "want_to_watch", label: "Want to Watch" },
    { key: "watching", label: "Watching" },
    { key: "completed", label: "Completed" },
  ];
  
  function WatchlistFilterTabs({
    activeFilter,
    counts,
    onSelect,
  }: WatchlistFilterTabsProps) {
    return (
      <div style={{ display: "flex", gap: "8px", marginBottom: "16px" }}>
        {TABS.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => onSelect(tab.key)}
            style={{
              fontWeight: activeFilter === tab.key ? 700 : 400,
            }}
          >
            {tab.label} ({counts[tab.key]})
          </button>
        ))}
      </div>
    );
  }
  
  export default WatchlistFilterTabs;