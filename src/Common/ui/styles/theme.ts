export const theme = {
    colors: {
      bg: "#0b0b0f",
      surface: "#14141b",
      surfaceHover: "#1c1c26",
      card: "#1f1f28",
      border: "#2a2a36",
      text: "#ffffff",
      textMuted: "#9ca3af",
      accent: "#e50914",
      accentHover: "#f6121d",
      success: "#22c55e",
      error: "#ef4444",
      warning: "#f59e0b",
    },
    radius: {
      sm: "8px",
      md: "12px",
      lg: "16px",
      pill: "999px",
    },
    shadow: {
      card: "0 8px 24px rgba(0,0,0,0.35)",
      nav: "0 4px 20px rgba(0,0,0,0.4)",
    },
    layout: {
      maxWidth: "1440px",
      navHeight: "72px",
      pagePadding: "24px",
    },
    font: {
      body: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
    },
  } as const;
  
  export type AppTheme = typeof theme;