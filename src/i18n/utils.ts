import { LANGS, type Lang } from "./constants";
import { dictionary } from "./dictionary";

export function translate(key: keyof typeof dictionary, lang: Lang): string {
  return dictionary[key]?.[lang] ?? key;
}

export function getLanguageConfig(code: Lang) {
  return LANGS.find((l) => l.code === code)!;
}

export function getCountryCode(lang: Lang): string {
  return getLanguageConfig(lang).country;
}

export function isValidLang(x: unknown): x is Lang {
  return LANGS.some((l) => l.code === x);
}