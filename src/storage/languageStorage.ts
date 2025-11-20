import type { Lang } from "../i18n/constants";
import { isValidLang } from "../i18n/utils";

const LANGUAGE_KEY = "pc-who-sings-language";


export function saveLanguage(lang: Lang) {
  localStorage.setItem(LANGUAGE_KEY, lang);
}

export function getSavedLanguage(): Lang {
  const raw = localStorage.getItem(LANGUAGE_KEY);
  return isValidLang(raw) ? raw : "en";
}
