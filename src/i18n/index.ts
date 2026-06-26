import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enCommon from "./locales/en/common.json";
import enAuth from "./locales/en/auth.json";
import enHome from "./locales/en/home.json";
import enSearch from "./locales/en/search.json";
import enMovieDetail from "./locales/en/movieDetail.json";
import enTvDetail from "./locales/en/tvDetail.json";
import enSettings from "./locales/en/settings.json";

import hiCommon from "./locales/hi/common.json";
import hiAuth from "./locales/hi/auth.json";
import hiHome from "./locales/hi/home.json";
import hiSearch from "./locales/hi/search.json";
import hiMovieDetail from "./locales/hi/movieDetail.json";
import hiTvDetail from "./locales/hi/tvDetail.json";
import hiSettings from "./locales/hi/settings.json";

import enWatchlist from "./locales/en/watchlist.json";
import hiWatchlist from "./locales/hi/watchlist.json";

void i18n.use(initReactI18next).init({
  resources: {
    en: {
      common: enCommon,
      auth: enAuth,
      home: enHome,
      search: enSearch,
      movieDetail: enMovieDetail,
      tvDetail: enTvDetail,
      settings: enSettings,
      watchlist: enWatchlist,
    },
    hi: {
      common: hiCommon,
      auth: hiAuth,
      home: hiHome,
      search: hiSearch,
      movieDetail: hiMovieDetail,
      tvDetail: hiTvDetail,
      settings: hiSettings,
      watchlist: hiWatchlist,
    },
  },
  lng: "en",
  fallbackLng: "en",
  defaultNS: "common",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;