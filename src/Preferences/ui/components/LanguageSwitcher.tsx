import {
    SUPPORTED_LANGUAGES,
  } from "../../core/constants/preferencesConstants";
  
  interface LanguageSwitcherProps {
    selectedLanguage: string;
    onChange: (code: string) => void;
  }
  
  function LanguageSwitcher({
    selectedLanguage,
    onChange,
  }: LanguageSwitcherProps) {
    return (
      <select
        value={selectedLanguage}
        onChange={(e) => onChange(e.target.value)}
      >
        {SUPPORTED_LANGUAGES.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.label}
          </option>
        ))}
      </select>
    );
  }
  
  export default LanguageSwitcher;