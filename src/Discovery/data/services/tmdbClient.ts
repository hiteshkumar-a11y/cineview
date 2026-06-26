import axios from "axios";

import { preferencesStore } from "../../../Preferences/data/stores/PreferencesStore";

export const tmdbClient = axios.create({
  baseURL: import.meta.env.VITE_TMDB_BASE_URL,
  params: {
    api_key: import.meta.env.VITE_TMDB_API_KEY,
  },
});

tmdbClient.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    language: preferencesStore.tmdbLanguageParam,
  };

  return config;
});