export const PREFERENCES_STORAGE_KEY =
  "cineview_preferences";

export const SUPPORTED_LANGUAGES = [
  { code: "en", label: "English" },
  { code: "hi", label: "हिन्दी" },
] as const;

export const SUPPORTED_REGIONS = [
  { code: "US", label: "United States" },
  { code: "IN", label: "India" },
  { code: "GB", label: "United Kingdom" },
  { code: "FR", label: "France" },
] as const;

export const DEFAULT_LANGUAGE = "en";
export const DEFAULT_REGION = "US";
export const DEFAULT_THEME = "dark" as const;