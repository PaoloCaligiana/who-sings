import { Link, useNavigate } from 'react-router-dom'
import { getCurrentPlayer, logoutPlayer } from '../storage/playerStorage';
import { useLang } from '../i18n/LangContext';
import { LanguageSwitcher } from './LanguageSwithcer';
import { translate } from '../i18n/dictionary';

export default function Navbar() {
    const { lang } = useLang();
    const player = getCurrentPlayer();
    const navigate = useNavigate();

    const handleLogout = () => {
        logoutPlayer();
        navigate("/login");
    };


    return (
        <header className="w-full px-5 py-2 flex justify-between items-center bg-black/20 backdrop-blur-sm">
            {/* Tutto a sinistra */}
            <div className="font-bold text-xl">Who Sings?</div>

            <nav className="flex items-center gap-4">
                {/* Centrali */}
                <Link className="nav-link" to="/quiz">{translate('navbar.play', lang)}</Link>
                <Link className="nav-link" to="/highscores">{translate('navbar.highScores', lang)}</Link>

                {/* Tutto a destra */}
                <LanguageSwitcher />
                {player && (
                    <>
                        <Link className="nav-link" to="/me">{player}</Link>
                        <button className="btn-nav-outline" onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                )}
            </nav>
        </header>
    )
}
