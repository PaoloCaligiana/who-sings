export type Lang = "en" | "it" | "es";

export const dictionary = {
  "login.title": {
    en: "Welcome to Who Sings",
    it: "Benvenuto in Who Sings",
    es: "Bienvenido a Who Sings",
  },
  "login.button": {
    en: "Start Game",
    it: "Inizia il gioco",
    es: "Comenzar juego",
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
