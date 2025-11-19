
import { useLang } from '../../i18n/LangContext';
import { translate } from '../../i18n/utils';

export default function QuizErrorScreen({ errorMessage, reloadQuiz }: { errorMessage: string; reloadQuiz: () => void }) {
    const { lang } = useLang();

    return (
        <div className="flex flex-col items-center justify-center h-full gap-6 p-6">
            <div className="text-5xl mb-2 text-danger">⚠️</div>
            <h2 className="text-2xl font-bold text-danger">{translate("quiz.errorTitle", lang)}</h2>
            <p className="text-muted mt-2 text-sm">
                {errorMessage || translate("quiz.errorDefault", lang)}
            </p>
            <div className="divider" />
            <div className="flex flex-col gap-3 mt-4">
                <button
                    onClick={reloadQuiz}
                    className="btn-primary w-full"
                >
                    {translate("quiz.tryAgain", lang)}
                </button>
            </div>
        </div>
    )
}
