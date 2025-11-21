import { useLang } from "../../i18n/LangContext";
import { translate } from "../../i18n/utils";

type StartScreenProps = {
  questionsCount: number;
  onStart: () => void;
  isInfiniteMode?: boolean;
  onSwitchMode: () => void;
  infiniteRound?: number;
};

export default function QuizStartScreen({
  questionsCount,
  onStart,
  isInfiniteMode = false,
  onSwitchMode,
  infiniteRound = 1,
}: StartScreenProps) {
  const { lang } = useLang();

  const config = isInfiniteMode
    ? {
        icon: "∞",
        title: translate("login.endlessModeButton", lang),
        subtitle: translate("quiz.round", lang).replace("{count}", infiniteRound.toString()),
        showWarning: true,
        switchText: translate("login.normalModeButton", lang),
      }
    : {
        icon: "🎵",
        title: translate("quiz.readyToStart", lang),
        subtitle: translate("quiz.questionsLoaded", lang).replace("{count}", questionsCount.toString()),
        showWarning: false,
        switchText: translate("login.endlessModeButton", lang),
      };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="card max-w-sm md:max-w-md lg:max-w-lg w-full flex flex-col gap-4 md:gap-6">
        {/* Icon + Title */}
        <div className="flex flex-col items-center">
          <div className="text-4xl md:text-5xl lg:text-6xl mb-4">{config.icon}</div>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-primary mb-2">{config.title}</h2>
          <p className="text-sm md:text-base lg:text-lg text-secondary">{config.subtitle}</p>
        </div>

        {/* Warning (Infinite Mode) */}
        {config.showWarning && (
          <div className="flex justify-center">
            <p className="text-xs md:text-sm lg:text-base text-primary">
              ⚡ {translate("quiz.endlessModeWarning", lang)}
            </p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col gap-4 md:gap-5 mt-4">
          <button className="btn-primary" disabled={questionsCount === 0} onClick={onStart}>
            {translate("quiz.startQuiz", lang)}
          </button>

          <button className="btn-surface text-sm md:text-base" onClick={onSwitchMode}>
            ← {config.switchText}
          </button>
        </div>
      </div>
    </div>
  );
}
