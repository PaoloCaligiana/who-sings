import { Link, useNavigate } from "react-router-dom";
import { getCurrentPlayer } from "../storage/playerStorage";
import { useLang } from "../i18n/LangContext";
import { LanguageSwitcher } from "./LanguageSwithcer";
import { translate } from "../i18n/utils";
import { logout } from "../storage/logoutManager";

export default function Navbar() {
  const { lang } = useLang();
  const player = getCurrentPlayer();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 right-0 h-16 md:h-20 flex items-center bg-black/20 backdrop-blur-sm px-4 sm:px-6 md:px-8 lg:px-12 z-50">
      {/* Tutto a sinistra */}
      <div className="font-bold text-sm sm:text-base md:text-lg lg:text-xl">Who Sings?</div>

      {/* Spazio flessibile */}
      <div className="flex-1" />

      <nav className="flex items-center gap-4 md:gap-6 lg:gap-8 text-sm md:text-base lg:text-lg">
        {/* Centrali */}
        <Link className="nav-link hidden sm:inline-block" to="/quiz">
          {translate("navbar.play", lang)}
        </Link>
        <Link className="nav-link hidden sm:inline-block" to="/highscores">
          {translate("navbar.highScores", lang)}
        </Link>

        {/* Tutto a destra */}
        <LanguageSwitcher />
        {player && (
          <>
            <Link className="nav-link truncate max-w-[9ch] inline-block" to="/me">
              {player}
            </Link>
            <button className="nav-link" onClick={handleLogout}>
              Logout
            </button>
          </>
        )}
      </nav>
    </header>
  );
}
