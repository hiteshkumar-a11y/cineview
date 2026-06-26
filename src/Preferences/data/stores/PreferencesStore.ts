import { makeAutoObservable } from "mobx";
import i18n from "../../../i18n";

import {
  preferencesSchema,
} from "../../core/schemas/preferencesSchema";

import {
  DEFAULT_LANGUAGE,
  DEFAULT_REGION,
  DEFAULT_THEME,
  PREFERENCES_STORAGE_KEY,
  SUPPORTED_LANGUAGES,
} from "../../core/constants/preferencesConstants";

import type { Preferences } from "../../core/schemas/preferencesSchema";

type ThemeMode = "light" | "dark";

class PreferencesStore {
  language = DEFAULT_LANGUAGE;
  theme: ThemeMode = DEFAULT_THEME;
  region = DEFAULT_REGION;

  constructor() {
    makeAutoObservable(this);
  }

  get tmdbLanguageParam(): string {
    return `${this.language}-${this.region}`;
  }

  init() {
    const stored = localStorage.getItem(
      PREFERENCES_STORAGE_KEY
    );

    if (stored) {
      try {
        const parsed = preferencesSchema.parse(
          JSON.parse(stored)
        );

        this.applyPreferences(parsed);
        return;
      } catch {
        localStorage.removeItem(
          PREFERENCES_STORAGE_KEY
        );
      }
    }

    const osTheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches
      ? "dark"
      : "light";

    this.applyPreferences({
      language: DEFAULT_LANGUAGE,
      theme: osTheme,
      region: DEFAULT_REGION,
    });
  }

  setLanguage(code: string) {
    const isSupported = SUPPORTED_LANGUAGES.some(
      (lang) => lang.code === code
    );

    if (!isSupported) return;

    this.language = code;
    i18n.changeLanguage(code);
    this.persist();
  }

  setTheme(theme: ThemeMode) {
    this.theme = theme;
    document.documentElement.setAttribute(
      "data-theme",
      theme
    );
    this.persist();
  }

  setRegion(code: string) {
    this.region = code;
    this.persist();
  }

  private applyPreferences(
    prefs: Preferences
  ) {
    this.language = prefs.language;
    this.theme = prefs.theme;
    this.region = prefs.region;

    i18n.changeLanguage(prefs.language);
    document.documentElement.setAttribute(
      "data-theme",
      prefs.theme
    );
  }

  private persist() {
    const data: Preferences = {
      language: this.language,
      theme: this.theme,
      region: this.region,
    };

    localStorage.setItem(
      PREFERENCES_STORAGE_KEY,
      JSON.stringify(data)
    );
  }
}

export const preferencesStore =
  new PreferencesStore();