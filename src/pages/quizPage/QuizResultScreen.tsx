
import { useLang } from '../../i18n/LangContext';
import { translate } from '../../i18n/utils';

type QuizResultProps = {
    playerName: string;
    score: number;
    totalQuestions: number;
    reloadQuiz: () => void;
};

export default function QuizResult({ playerName, score, totalQuestions, reloadQuiz }: QuizResultProps) {
    const { lang } = useLang();

    return (
        <div className="flex justify-center items-center min-h-[70vh] px-4">
            <div className="card flex flex-col gap-2 max-w-md">

                <h2 className="text-xl font-bold text-primary">
                    {translate("quiz.finishedTitle", lang)}
                </h2>

                <p className="text-sm text-muted mb-3">
                    {translate("quiz.finalScore", lang)
                        .replace("{player}", playerName)
                        .replace("{score}", String(score))
                        .replace("{total}", String(totalQuestions))}
                </p>

                <p className="text-sm text-muted mb-4">
                    {translate("quiz.retrySubtitle", lang)}
                </p>

                <div className="flex gap-3 flex-wrap">
                    <button className="btn-primary" onClick={reloadQuiz}>
                        {translate("quiz.playAgain", lang)}
                    </button>

                    <a href="/me" className="btn-surface">
                        {translate("quiz.myProfile", lang)}
                    </a>

                    <a href="/highscores" className="btn-surface">
                        {translate("quiz.highScores", lang)}
                    </a>
                </div>

            </div>
        </div>
    );
}
