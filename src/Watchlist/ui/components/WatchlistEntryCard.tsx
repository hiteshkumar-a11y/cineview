import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import WatchlistStatusSelector from "./WatchlistStatusSelector";
import type {
  WatchlistEntry,
  WatchlistStatus,
} from "../../core/types/Watchlist.types";
import { useTranslation } from "react-i18next";

interface WatchlistEntryCardProps {
  entry: WatchlistEntry;
  onRemove: () => void;
  onStatusChange: (status: WatchlistStatus) => void;
  onNoteChange: (note: string | null) => void; 
}

function WatchlistEntryCard({
  entry,
  onRemove,
  onStatusChange,
  onNoteChange,
}: WatchlistEntryCardProps) {
  const navigate = useNavigate();
  const imageBaseUrl = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;
  const { t } = useTranslation("watchlist");
  const MAX_NOTE_LENGTH = 300;

  const [noteText, setNoteText] = useState(entry.note ?? "");
  
  // Sync when a different entry is shown
  useEffect(() => {
    setNoteText(entry.note ?? "");
  }, [entry.id, entry.note]);
  
  function handleNoteBlur() {
    const trimmed = noteText.trim();
    onNoteChange(trimmed === "" ? null : trimmed);
  }

  const posterUrl = entry.snapshot.posterPath
    ? `${imageBaseUrl}${entry.snapshot.posterPath}`
    : "https://via.placeholder.com/300x450?text=No+Image";

   

  function goToDetail() {
    if (entry.mediaType === "movie") {
      navigate(`/movie/${entry.mediaId}`);
      return;
    }
    navigate(`/tv/${entry.mediaId}`);
  }

  return (
    <article
      style={{
        display: "grid",
        gridTemplateColumns: "120px 1fr",
        gap: "16px",
        marginBottom: "16px",
        padding: "12px",
        background: "#1f1f1f",
        borderRadius: "12px",
      }}
    >
      <img
        src={posterUrl}
        alt={entry.snapshot.title}
        onClick={goToDetail}
        style={{ width: "100%", borderRadius: "8px", cursor: "pointer" }}
      />

      <div>
        <h3 onClick={goToDetail} style={{ cursor: "pointer" }}>
          {entry.snapshot.title}
        </h3>
        <p>{entry.mediaType.toUpperCase()} · ⭐ {entry.snapshot.rating.toFixed(1)}</p>
    
        <div style={{ marginTop: "12px" }}>
  <label
    htmlFor={`note-${entry.id}`}
    style={{
      display: "block",
      marginBottom: "6px",
      fontSize: "14px",
      fontWeight: 600,
      color: "#e5e7eb",
    }}
  >
    {t("noteLabel")}
  </label>

  <textarea
    id={`note-${entry.id}`}
    value={noteText}
    onChange={(e) => {
      if (e.target.value.length <= MAX_NOTE_LENGTH) {
        setNoteText(e.target.value);
      }
    }}
    onBlur={handleNoteBlur}
    placeholder={t("notePlaceholder")}
    rows={3}
    style={{
      width: "100%",
      maxWidth: "100%",
      padding: "10px 12px",
      borderRadius: "8px",
      border: "1px solid #374151",
      background: "#111827",
      color: "#ffffff",
      fontSize: "14px",
      resize: "vertical",
      fontFamily: "inherit",
    }}
  />

  <p
    style={{
      margin: "4px 0 0",
      fontSize: "12px",
      color: noteText.length >= MAX_NOTE_LENGTH ? "#f87171" : "#9ca3af",
      textAlign: "right",
    }}
  >
    {noteText.length}/{MAX_NOTE_LENGTH}
  </p>
</div>
        <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginTop: "12px",
    flexWrap: "wrap",
  }}
>
  <WatchlistStatusSelector
    currentStatus={entry.status}
    onChange={onStatusChange}
  />

  <button
    type="button"
    onClick={onRemove}
    style={{
      height: "36px",           // same as dropdown
      padding: "0 16px",
      borderRadius: "8px",
      border: "1px solid #374151",
      background: "transparent",
      color: "#f87171",         // red text, not big red block
      fontSize: "14px",
      fontWeight: 600,
      cursor: "pointer",
    }}
  >
    Remove
  </button>
</div>
      </div>
    </article>
  );
}

export default WatchlistEntryCard;