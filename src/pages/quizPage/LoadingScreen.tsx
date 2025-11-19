import { useLang } from '../../i18n/LangContext';
import { translate } from '../../i18n/utils';

export default function LoadingScreen() {
    const { lang } = useLang();

    return (
        <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="music-loader">
                <div className="music-bar"></div>
                <div className="music-bar"></div>
                <div className="music-bar"></div>
                <div className="music-bar"></div>
                <div className="music-bar"></div>
                <div className="music-bar"></div>
            </div>
            <h2 className="text-xl text-muted">{translate("quiz.loadingQuestions", lang)}</h2>
        </div>
    );
}
