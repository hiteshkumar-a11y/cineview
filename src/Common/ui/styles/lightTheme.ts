import type { AppTheme } from "./theme";

export const lightTheme: AppTheme = {
  colors: {
    bg: "#f5f5f7",
    surface: "#ffffff",
    surfaceHover: "#ececf1",
    card: "#ffffff",
    border: "#d1d5db",
    text: "#111827",
    textMuted: "#6b7280",
    accent: "#e50914",
    accentHover: "#c40812",
    success: "#16a34a",
    error: "#dc2626",
    warning: "#d97706",
  },
  radius: {
    sm: "8px",
    md: "12px",
    lg: "16px",
    pill: "999px",
  },
  shadow: {
    card: "0 8px 24px rgba(0,0,0,0.08)",
    nav: "0 4px 20px rgba(0,0,0,0.08)",
  },
  layout: {
    maxWidth: "1440px",
    navHeight: "72px",
    pagePadding: "24px",
  },
  font: {
    body: "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  },
};