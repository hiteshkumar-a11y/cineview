interface RecentSearchesProps {
  searches: string[];
  onSelect: (query: string) => void;
  onRemove: (query: string) => void;
  onClear: () => void;
}

function RecentSearches({
  searches,
  onSelect,
  onRemove,
  onClear,
}: RecentSearchesProps) {
  if (searches.length === 0) {
    return null;
  }

  return (
    <section
      style={{
        marginBottom: "32px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "12px",
        }}
      >
        {/* <h2 style={{ margin: 0 }}>Recent Searches</h2>
        <button onClick={onClear}>Clear</button> */}

<h2 style={{ margin: 0, color: "#ffffff" }}>Recent Searches</h2>
<button onClick={onClear} style={{ color: "#ffffff", background: "transparent", border: "1px solid #444", borderRadius: 8, padding: "6px 12px", cursor: "pointer" }}>
  Clear
</button>
      </div>

      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        {searches.map((search) => (
          <div
            key={search}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 14px",
              borderRadius: "20px",
              border: "1px solid #444",
              background: "#1f1f1f",
            }}
          >
            <button
              onClick={() => onSelect(search)}
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
                color: "#ffffff",
              }}
            >
              {search}
            </button>

            <button
              onClick={() => onRemove(search)}
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
                color: "#9ca3af", 

              }}
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default RecentSearches;