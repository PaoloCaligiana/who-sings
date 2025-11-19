import { LANGUAGE_CONFIGS, type Country, type Lang } from "./constants";
import { dictionary } from "./dictionary";

export function translate(key: keyof typeof dictionary, lang: Lang): string {
  return dictionary[key]?.[lang] ?? key;
}

export function isValidLang(x: unknown): x is Lang {
  return LANGUAGE_CONFIGS.some(l => l.code === x);
}

export function isValidCountry(x: unknown): x is Country {
  return LANGUAGE_CONFIGS.some(l => l.country === x);
}

export function getLangByCountry(country: Country): Lang {
  return LANGUAGE_CONFIGS.find(l => l.country === country)!.code;
}

export function getCountryByLang(lang: Lang): Country {
  return LANGUAGE_CONFIGS.find(l => l.code === lang)!.country;
}

export function getLanguageConfigByLang(lang: Lang) {
  return LANGUAGE_CONFIGS.find(l => l.code === lang)!;
}