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
  const config = LANGUAGE_CONFIGS.find(l => l.country === country);
  return config ? config.code : LANGUAGE_CONFIGS[0].code;
}

export function getCountryByLang(lang: Lang): Country {
  const config = LANGUAGE_CONFIGS.find(l => l.code === lang);
  return config ? config.country : LANGUAGE_CONFIGS[0].country;
}

export function getLanguageConfigByLang(lang: Lang) {
  const config = LANGUAGE_CONFIGS.find(l => l.code === lang);
  return config || LANGUAGE_CONFIGS[0];
}