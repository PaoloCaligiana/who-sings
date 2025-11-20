
import { useLang } from '../../i18n/LangContext';
import { translate } from '../../i18n/utils';

type QuizResultProps = {
    playerName: string;
    score: number;
    totalQuestions: number;
    reloadQuiz: () => void;
    isInfiniteMode?: boolean;
    isLegendary?: boolean;
    canContinue?: boolean; // Se in infinite e ha completato tutte le domande senza errori
    onContinue?: () => void;
    onSwitchMode: () => void;
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
    // onSwitchMode
}: QuizResultProps) {
    const { lang } = useLang();

    return (
        <div className="flex items-center justify-center min-h-[70vh]">
            <div className="card flex flex-col gap-2 max-w-md">

                <h2 className="text-xl font-bold text-primary">
                    {isLegendary ? "🏆 Legendary Player! 🏆" : translate("quiz.finishedTitle", lang)}
                </h2>

                <p className="text-sm text-muted mb-3">
                    {isInfiniteMode 
                        ? `${playerName}, ${translate("quiz.score", lang)}: ${score}!`
                        : translate("quiz.finalScore", lang)
                            .replace("{player}", playerName)
                            .replace("{score}", String(score))
                            .replace("{total}", String(totalQuestions))}
                </p>

                <p className="text-sm text-muted mb-4">
                    {isLegendary 
                        ? "You've reached the maximum! Are you even human? 🤖" 
                        : translate("quiz.retrySubtitle", lang)}
                </p>

                <div className="flex gap-3 flex-wrap">
                    {canContinue && onContinue ? (
                        <>
                            <button className="btn-primary" onClick={onContinue}>
                                🔥 Continue (Next Round)
                            </button>
                            
                            {/* <button className="btn-surface" onClick={onSwitchMode}>
                                {isInfiniteMode ? "Go Normal Mode" : "Go Infinity Mode"}
                            </button> */}
                        </>
                    ) : (
                        <>
                            <button className="btn-primary" onClick={reloadQuiz}>
                                {translate("quiz.playAgain", lang)}
                            </button>

                            <a href="/me" className="btn-surface">
                                {translate("quiz.myProfile", lang)}
                            </a>

                            <a href="/highscores" className="btn-surface">
                                {translate("quiz.highScores", lang)}
                            </a>
                        </>
                    )}
                </div>

            </div>
        </div>
    );
}
