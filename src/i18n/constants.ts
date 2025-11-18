export const LANGS = [
  { code: "en", label: "English", flag: "🇬🇧", country: "uk" },
  { code: "it", label: "Italiano", flag: "🇮🇹", country: "it" },
  { code: "es", label: "Español", flag: "🇪🇸", country: "es" },
] as const;

// derived type Lang from LANGS
export type Lang = (typeof LANGS)[number]["code"];

// derived runtime array for validation
export const supportedLangs = LANGS.map((l) => l.code);