import { useParams } from "react-router-dom";

import { useSeasonDetail } from "../hooks/useSeasonDetail";

function SeasonDetailPage() {
  const { id, seasonNumber } = useParams();
  const tvId = Number(id);
  const seasonNum = Number(seasonNumber);

  const { season, loading, notFound, error } =
    useSeasonDetail(tvId, seasonNum);

  const imageBaseUrl =
    import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

  if (loading) {
    return <p>Loading season...</p>;
  }

  if (notFound) {
    return (
      <div>
        <h2>404 — Season Not Found</h2>
        <p>This season does not exist.</p>
      </div>
    );
  }

  if (error || !season) {
    return (
      <p style={{ color: "red" }}>
        {error ?? "Something went wrong."}
      </p>
    );
  }

  return (
    <section>
      <h2 style={{ marginBottom: "8px" }}>
        {season.name}
      </h2>

      <p
        style={{
          marginBottom: "24px",
          color: "#9ca3af",
        }}
      >
        {season.overview || "No overview available."}
      </p>

      {season.episodes.length === 0 ? (
        <p>No episodes available.</p>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {season.episodes.map((episode) => {
            const stillUrl = episode.still_path
              ? `${imageBaseUrl}${episode.still_path}`
              : "https://via.placeholder.com/300x169?text=No+Image";

            return (
              <article
                key={episode.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "180px 1fr",
                  gap: "16px",
                  background: "#1f1f1f",
                  borderRadius: "12px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={stillUrl}
                  alt={episode.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    minHeight: "100px",
                    objectFit: "cover",
                  }}
                />

                <div style={{ padding: "16px" }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      gap: "12px",
                      alignItems: "start",
                    }}
                  >
                    <div>
                      <h3 style={{ margin: "0 0 8px" }}>
                        {episode.episode_number}.{" "}
                        {episode.name}
                      </h3>

                      <p
                        style={{
                          margin: "0 0 8px",
                          color: "#9ca3af",
                        }}
                      >
                        ⭐{" "}
                        {episode.vote_average.toFixed(1)}
                        {episode.runtime
                          ? ` · ${episode.runtime} min`
                          : ""}
                      </p>
                    </div>

                    <label
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                        whiteSpace: "nowrap",
                      }}
                    >
                      <input
                        type="checkbox"
                        onChange={() =>
                          console.log(
                            "Episode tracker placeholder",
                            episode.id
                          )
                        }
                      />
                      Watched
                    </label>
                  </div>

                  <p style={{ margin: 0 }}>
                    {episode.overview ||
                      "No description available."}
                  </p>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default SeasonDetailPage;