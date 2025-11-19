import { useLang } from '../../i18n/LangContext';
import { translate } from '../../i18n/utils';

type StartScreenProps = {
  questionsCount: number;
  onStart: () => void;
  isInfiniteMode?: boolean;
};

export default function QuizStartScreen({ questionsCount, onStart, isInfiniteMode = false }: StartScreenProps) {
  const { lang } = useLang();

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <h2 className="text-xl mb-3">
        {isInfiniteMode ? "∞ Infinite Mode" : translate("quiz.readyToStart", lang)}
      </h2>
      <p className="text-muted mb-4">
        {translate("quiz.questionsLoaded", lang).replace("{count}", questionsCount.toString())}
      </p>
      {isInfiniteMode && (
        <p className="text-sm text-warning mb-2">{translate("quiz.endlessModeWarning", lang)}</p>
      )}
      <button
        className="btn-primary"
        disabled={questionsCount === 0}
        onClick={onStart}
      >
        {translate("quiz.startQuiz", lang)}
      </button>
    </div>
  );
}
