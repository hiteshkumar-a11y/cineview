import type { CastMember } from "../../data/schemas/creditsSchema";

interface CastCarouselProps {
  cast: CastMember[];
}

function CastCarousel({ cast }: CastCarouselProps) {
  const imageBaseUrl =
    import.meta.env.VITE_TMDB_IMAGE_BASE_URL;

  if (cast.length === 0) {
    return <p>No cast information available.</p>;
  }

  return (
    <section style={{ marginBottom: "48px" }}>
      <h2 style={{ marginBottom: "20px" }}>Cast</h2>

      <div
        style={{
          display: "flex",
          gap: "16px",
          overflowX: "auto",
          paddingBottom: "10px",
        }}
      >
        {cast.slice(0, 20).map((member) => {
          const imageUrl = member.profile_path
            ? `${imageBaseUrl}${member.profile_path}`
            : "https://via.placeholder.com/180x270?text=No+Image";

          return (
            <div
              key={member.id}
              style={{
                width: "160px",
                flexShrink: 0,
                textAlign: "center",
              }}
            >
              <img
                src={imageUrl}
                alt={member.name}
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover",
                  borderRadius: "12px",
                }}
              />

              <h3
                style={{
                  margin: "12px 0 6px",
                  fontSize: "15px",
                }}
              >
                {member.name}
              </h3>

              <p
                style={{
                  margin: 0,
                  color: "#9ca3af",
                  fontSize: "13px",
                }}
              >
                {member.character}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default CastCarousel;