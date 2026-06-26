interface TrailerModalProps {
    videoKey: string;
    onClose: () => void;
  }
  
  function TrailerModal({
    videoKey,
    onClose,
  }: TrailerModalProps) {
    return (
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.85)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 1000,
          padding: "24px",
        }}
      >
        <div
          onClick={(event) =>
            event.stopPropagation()
          }
          style={{
            width: "100%",
            maxWidth: "960px",
            aspectRatio: "16 / 9",
            background: "#000",
            borderRadius: "12px",
            overflow: "hidden",
            position: "relative",
          }}
        >
          <button
            onClick={onClose}
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              zIndex: 2,
              border: "none",
              borderRadius: "999px",
              width: "36px",
              height: "36px",
              cursor: "pointer",
            }}
          >
            ✕
          </button>
  
          <iframe
            src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
            title="Movie Trailer"
            allow="autoplay; encrypted-media"
            allowFullScreen
            style={{
              width: "100%",
              height: "100%",
              border: "none",
            }}
          />
        </div>
      </div>
    );
  }
  
  export default TrailerModal;