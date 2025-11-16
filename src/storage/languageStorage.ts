import { supportedLangs, type Lang } from "../i18n/dictionary";

const LANGUAGE_KEY = "who-sings-language";

function isLanguage(x: unknown): x is Lang {
  return supportedLangs.includes(x as Lang);
}

export function saveLanguage(lang: Lang) {
  localStorage.setItem(LANGUAGE_KEY, lang);
}

export function getSavedLanguage(): Lang {
  const raw = localStorage.getItem(LANGUAGE_KEY);
  return isLanguage(raw) ? raw : "en";
}
