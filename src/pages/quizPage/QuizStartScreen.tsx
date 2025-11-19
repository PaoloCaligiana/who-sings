import { useLang } from '../../i18n/LangContext';
import { translate } from '../../i18n/utils';

type StartScreenProps = {
  questionsCount: number;
  onStart: () => void;
};

export default function QuizStartScreen({ questionsCount, onStart }: StartScreenProps) {
  const { lang } = useLang();

  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <h2 className="text-xl mb-3">{translate("quiz.readyToStart", lang)}</h2>
      <p className="text-muted mb-4">
        {translate("quiz.questionsLoaded", lang).replace("{count}", questionsCount.toString())}
      </p>
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
