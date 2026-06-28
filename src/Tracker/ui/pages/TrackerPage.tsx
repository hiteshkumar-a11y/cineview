import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import { collectionStore } from "../../../Collections/data/stores/CollectionStore";

function TrackerPage() {
  const tvEntries = collectionStore.entries.filter(
    (entry) => entry.mediaType === "tv"
  );

  const imageBaseUrl = import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

  return (
    <div style={{ padding: "24px" }}>
      <h1 style={{ marginBottom: "24px" }}>Episode Tracker</h1>

      {tvEntries.length === 0 ? (
        <p>Add TV shows to your watchlist to track episodes.</p>
      ) : (
        tvEntries.map((entry) => {
          const watched = collectionStore.getWatchedCountForShow(
            entry.mediaId
          );

          const posterUrl = entry.snapshot.posterPath
            ? `${imageBaseUrl}${entry.snapshot.posterPath}`
            : "https://via.placeholder.com/80x120?text=No+Image";

          return (
            <article
              key={entry.id}
              style={{
                display: "flex",
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
                style={{ width: 80, borderRadius: 8 }}
              />
              <div>
                <h3 style={{ margin: "0 0 8px" }}>
                  <Link to={`/tv/${entry.mediaId}`} style={{ color: "inherit" }}>
                    {entry.snapshot.title}
                  </Link>
                </h3>
                <p style={{ margin: 0, color: "#9ca3af" }}>
                  {watched} episodes watched
                </p>
              </div>
            </article>
          );
        })
      )}
    </div>
  );
}

export default observer(TrackerPage);