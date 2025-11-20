import { useLang } from '../../i18n/LangContext';
import { translate } from '../../i18n/utils';
import { getInfiniteProgress } from '../../storage/quizSessionStorage';

type StartScreenProps = {
  questionsCount: number;
  onStart: () => void;
  isInfiniteMode?: boolean;
  onSwitchMode: () => void;
};

export default function QuizStartScreen({
  questionsCount,
  onStart,
  isInfiniteMode = false,
  onSwitchMode
}: StartScreenProps) {

  const { lang } = useLang();
  const infinityProgress = getInfiniteProgress()?.round || 1;

  // Config dinamica
  const config = isInfiniteMode
    ? {
      icon: "∞",
      title: translate("login.endlessModeButton", lang),
      subtitle: translate("quiz.round", lang).replace("{count}", infinityProgress.toString()),
      showWarning: true,
      switchText: translate("login.normalModeButton", lang)
    }
    : {
      icon: "🎵",
      title: translate("quiz.readyToStart", lang),
      subtitle: translate("quiz.questionsLoaded", lang).replace("{count}", questionsCount.toString()),
      showWarning: false,
      switchText: translate("login.endlessModeButton", lang)
    };

  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4">
      <div className="card max-w-md w-full flex flex-col gap-6 text-center">

        {/* Icon + Title */}
        <div className="flex flex-col items-center gap-2">
          <div className="text-4xl">{config.icon}</div>

          <h2 className="text-xl sm:text-2xl font-bold text-primary">
            {config.title}
          </h2>

          <p className="text-sm text-white/70">
            {config.subtitle}
          </p>
        </div>

        {/* Warning (Infinite Mode) */}
        {config.showWarning && (
          <div className="bg-surface-dark/80 border border-white/5 rounded-xl p-4">
            <p className="text-xs sm:text-sm text-primary">
              ⚡ {translate("quiz.endlessModeWarning", lang)}
            </p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col gap-4 mt-2">
          <button
            className="btn-primary"
            disabled={questionsCount === 0}
            onClick={onStart}
          >
            {translate("quiz.startQuiz", lang)}
          </button>

          <button
            className="btn-surface text-sm"
            onClick={onSwitchMode}
          >
            ← {config.switchText}
          </button>
        </div>

      </div>
    </div>
  );
}
