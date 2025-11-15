import type { Lang } from "../i18n/dictionary";
import { useLang } from "../i18n/LangContext";

export function LanguageSwitcher() {
  const { lang, setLang } = useLang();

  return (
    <select value={lang} onChange={(e) => setLang(e.target.value as Lang)}>
      <option value="en">🇬🇧 English</option>
      <option value="it">🇮🇹 Italiano</option>
      <option value="es">🇪🇸 Español</option>
    </select>
  );
}
