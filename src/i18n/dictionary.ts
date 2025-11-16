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

  "quiz.finishedTitle": {
    en: "Match finished 🎉",
    it: "Partita conclusa 🎉",
    es: "Partida terminada 🎉",
  },

  "quiz.finalScore": {
    en: "{player}, you scored {score}/{total}",
    it: "{player}, hai totalizzato {score}/{total}",
    es: "{player}, has conseguido {score}/{total}",
  },

  "quiz.retrySubtitle": {
    en: "Do you want to try again to improve your score?",
    it: "Vuoi ritentare per scalare la classifica?",
    es: "¿Quieres intentarlo de nuevo para subir en la clasificación?",
  },

  "quiz.playAgain": {
    en: "Play again",
    it: "Rigioca",
    es: "Jugar de nuevo",
  },

  "quiz.myProfile": {
    en: "Go to my profile",
    it: "Vai al mio profilo",
    es: "Ir a mi perfil",
  },

  "quiz.highScores": {
    en: "View leaderboard",
    it: "Vedi classifica",
    es: "Ver clasificación",
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

  "highscores.title": {
    en: "Leaderboard 👑",
    it: "Classifica 👑",
    es: "Clasificación 👑",
  },

  "highscores.subtitle": {
    en: "Best players on this device.",
    it: "Migliori giocatori su questo dispositivo.",
    es: "Mejores jugadores en este dispositivo.",
  },

  "highscores.empty": {
    en: "No scores recorded. Play a match to appear on the leaderboard!",
    it: "Nessun punteggio registrato. Gioca una partita per apparire in classifica!",
    es: "No hay puntuaciones registradas. ¡Juega una partida para aparecer en la clasificación!",
  },

  "highscores.position": {
    en: "#{pos} ",
    it: "#{pos} ",
    es: "#{pos} ",
  },
} as const;

export function translate(key: keyof typeof dictionary, lang: Lang): string {
  return dictionary[key]?.[lang] ?? key;
}
