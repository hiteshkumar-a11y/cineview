interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

function SearchBar({
  value,
  onChange,
}: SearchBarProps) {
  return (
    <div
      style={{
        marginBottom: "32px",
      }}
    >
      <input
        type="text"
        placeholder="Search movies, TV shows, people..."
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        style={{
          width: "100%",
          padding: "14px 18px",
          fontSize: "16px",
          borderRadius: "10px",
          border: "1px solid #444",
          outline: "none",
        }}
      />
    </div>
  );
}

export default SearchBar;