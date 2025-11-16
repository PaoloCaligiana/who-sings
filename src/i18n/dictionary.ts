export const LANGS = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "es", label: "Español", flag: "🇪🇸" },
] as const;

// derived type Lang from LANGS
export type Lang = (typeof LANGS)[number]["code"];

// derived runtime array for validation
export const supportedLangs = LANGS.map((l) => l.code);

export const dictionary = {
  "login.title": {
    en: "Welcome to Who Sings 🎵",
    it: "Benvenuto in Who Sings 🎵",
    es: "Bienvenido a Who Sings 🎵",
  },

  "login.subtitle": {
    en: "Enter your name to start playing.",
    it: "Inserisci il tuo nome per iniziare a giocare.",
    es: "Ingresa tu nombre para comenzar a jugar.",
  },

  "login.placeholder": {
    en: "Player name",
    it: "Nome giocatore",
    es: "Nombre del jugador",
  },

  "login.button": {
    en: "Start Game",
    it: "Inizia il gioco",
    es: "Comenzar juego",
  },

  "navbar.play": {
    en: "Play",
    it: "Gioca",
    es: "Jugar",
  },

  "navbar.highScores": {
    en: "High Scores",
    it: "Classifica",
    es: "Puntuaciones",
  },

  "quiz.timeLeft": {
    en: "Time left",
    it: "Tempo rimasto",
    es: "Tiempo restante",
  },

  "quiz.score": {
    en: "Score",
    it: "Punteggio",
    es: "Puntuación",
  },
} as const;

export function translate(key: keyof typeof dictionary, lang: Lang): string {
  return dictionary[key]?.[lang] ?? key;
}
