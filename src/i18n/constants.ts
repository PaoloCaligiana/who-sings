// i18n/constants.ts
export const LANGUAGE_CONFIGS = [
  { code: "en", label: "English", flag: "🇬🇧", country: "uk" },
  { code: "it", label: "Italiano", flag: "🇮🇹", country: "it" },
  { code: "es", label: "Español", flag: "🇪🇸", country: "es" },
] as const;

export type Lang = (typeof LANGUAGE_CONFIGS)[number]["code"];
export type Country = (typeof LANGUAGE_CONFIGS)[number]["country"];