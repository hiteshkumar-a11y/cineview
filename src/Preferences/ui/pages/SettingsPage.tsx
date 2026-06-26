import { observer } from "mobx-react-lite";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { authStore } from "../../../Authentication/data/stores/AuthStore";
import { preferencesStore } from "../../data/stores/PreferencesStore";

import LanguageSwitcher from "../components/LanguageSwitcher";
import RegionSelector from "../components/RegionSelector";
import ThemeToggle from "../components/ThemeToggle";

function SettingsPage() {
  const { t } = useTranslation("settings");
  const navigate = useNavigate();

  const handleLogout = () => {
    authStore.logout();
    navigate("/login", { replace: true });
  };

  return (
    <div>
      <h1 style={{ marginBottom: "24px" }}>
        {t("title")}
      </h1>

      <section style={{ marginBottom: "24px" }}>
        <h2>{t("language")}</h2>
        <LanguageSwitcher
          selectedLanguage={
            preferencesStore.language
          }
          onChange={(code) =>
            preferencesStore.setLanguage(code)
          }
        />
      </section>

      <section style={{ marginBottom: "24px" }}>
        <h2>{t("region")}</h2>
        <RegionSelector
          selectedRegion={
            preferencesStore.region
          }
          onChange={(code) =>
            preferencesStore.setRegion(code)
          }
        />
      </section>

      <section style={{ marginBottom: "24px" }}>
        <h2>{t("theme")}</h2>
        <ThemeToggle
          currentTheme={preferencesStore.theme}
          onChange={(theme) =>
            preferencesStore.setTheme(theme)
          }
        />
      </section>

      <button type="button" onClick={handleLogout}>
        {t("logout")}
      </button>
    </div>
  );
}

export default observer(SettingsPage);