import { useLang } from '../../i18n/LangContext';
import { translate } from '../../i18n/utils';
import { getInfiniteProgress } from '../../storage/quizSessionStorage';

type StartScreenProps = {
  questionsCount: number;
  onStart: () => void;
  isInfiniteMode?: boolean;
  onSwitchMode: () => void;
};

export default function QuizStartScreen({ questionsCount, onStart, isInfiniteMode = false, onSwitchMode }: StartScreenProps) {
  const { lang } = useLang();
  const infinityProgress = getInfiniteProgress()?.round || 1;

  // Configurazione UI basata su modalità
  const config = isInfiniteMode ? {
    icon: "∞",
    title: translate("login.endlessModeButton", lang),
    subtitle: translate("quiz.round", lang).replace("{count}", infinityProgress.toString()),
    showWarning: true,
    switchText: translate("login.normalModeButton", lang)
  } : {
    icon: "🎵",
    title: translate("quiz.readyToStart", lang),
    subtitle: translate("quiz.questionsLoaded", lang).replace("{count}", questionsCount.toString()),
    showWarning: false,
    switchText: translate("login.endlessModeButton", lang)
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="card max-w-md w-full flex flex-col gap-5 p-8 text-center">

        {/* Icon + Title */}
        <div>
          <div className="text-5xl mb-4">{config.icon}</div>
          <h2 className="text-2xl font-bold text-primary mb-2">{config.title}</h2>
          <p className="text-sm text-muted">{config.subtitle}</p>
        </div>

        {/* Warning per Infinite Mode */}
        {config.showWarning && (
          <div className="surface-dark p-3 rounded-xl">
            <p className="text-xs text-orange-400">
              ⚡ {translate("quiz.endlessModeWarning", lang)}
            </p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            className="btn-primary"
            disabled={questionsCount === 0}
            onClick={onStart}
          >
            {translate("quiz.startQuiz", lang)}
          </button>

          <button className="btn-surface text-sm" onClick={onSwitchMode}>
            ← {config.switchText}
          </button>
        </div>

      </div>
    </div>
  );
}
