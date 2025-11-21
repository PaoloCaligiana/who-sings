import { useLang } from "../../i18n/LangContext";
import { translate } from "../../i18n/utils";
import type { Lang } from "../../i18n/constants";

type QuizResultProps = {
  playerName: string;
  score: number;
  totalQuestions: number;
  reloadQuiz: () => void;
  isInfiniteMode?: boolean;
  infiniteRound?: number;
  isLegendary?: boolean;
  canContinue?: boolean; // Se in infinite e ha completato tutte le domande senza errori
  onContinue?: () => void;
  onSaveAndQuit?: () => void; // Salva sessione endless e torna al profilo
};

// Helper per selezionare messaggio motivazionale/vittoria in base al round (rotazione ciclica)
const getMotivationalMessage = (round: number, isLegendary: boolean, lang: Lang): string => {
  const messageType = isLegendary ? "victory" : "motivational";
  const messageIndex = ((round - 1) % 7) + 1; // Cicla tra 1-7
  const key = `quiz.${messageType}${messageIndex}`;

  type MessageKey =
    | "quiz.motivational1"
    | "quiz.motivational2"
    | "quiz.motivational3"
    | "quiz.motivational4"
    | "quiz.motivational5"
    | "quiz.motivational6"
    | "quiz.motivational7"
    | "quiz.victory1"
    | "quiz.victory2"
    | "quiz.victory3"
    | "quiz.victory4"
    | "quiz.victory5"
    | "quiz.victory6"
    | "quiz.victory7";

  return translate(key as MessageKey, lang);
};

export default function QuizResult({
  playerName,
  score,
  totalQuestions,
  reloadQuiz,
  isInfiniteMode = false,
  isLegendary = false,
  canContinue = false,
  onContinue,
  infiniteRound = 1,
  onSaveAndQuit,
}: QuizResultProps) {
  const { lang } = useLang();

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="card flex flex-col gap-2 max-w-md">
        <h2 className="text-xl font-bold text-primary">
          {isLegendary ? "Legendary Player! 🏆" : translate("quiz.finishedTitle", lang)}
        </h2>

        <p className="text-sm sm:text-base text-secondary mb-2">
          {isInfiniteMode
            ? `${playerName}, ${translate("quiz.score", lang)}: ${score}!`
            : translate("quiz.finalScore", lang)
                .replace("{player}", playerName)
                .replace("{score}", String(score))
                .replace("{total}", String(totalQuestions))}
        </p>

        <p className="text-sm sm:text-base text-muted mb-4">
          {canContinue && onContinue
            ? getMotivationalMessage(infiniteRound, isLegendary, lang)
            : translate("quiz.retrySubtitle", lang)}
        </p>

        <div className="flex gap-3 flex-wrap">
          {canContinue && onContinue ? (
            <>
              <button className="btn-primary flex-1 px-4 py-2 whitespace-nowrap" onClick={onContinue}>
                🔥 Round {infiniteRound + 1}
              </button>

              {onSaveAndQuit && (
                <button
                  className="btn-surface flex-1 px-4 py-2 whitespace-nowrap"
                  onClick={() => {
                    onSaveAndQuit();
                    setTimeout(() => {
                      window.location.href = "/me";
                    }, 100);
                  }}
                >
                  💾 {translate("quiz.saveAndQuit", lang)}
                </button>
              )}
            </>
          ) : (
            <>
              <button className="btn-primary flex-1 px-4 py-2 whitespace-nowrap" onClick={reloadQuiz}>
                {translate("quiz.playAgain", lang)}
              </button>

              <a href="/me" className="btn-surface flex-1 px-4 py-2 whitespace-nowrap">
                {translate("quiz.myProfile", lang)}
              </a>

              <a href="/highscores" className="btn-surface flex-1 px-4 py-2 whitespace-nowrap">
                {translate("quiz.highScores", lang)}
              </a>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
