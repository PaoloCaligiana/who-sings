import { getCurrentPlayer } from "../../storage/playerStorage";
import { currentScoresStorage } from "../../storage/currentScoresStorage";
import { useLang } from "../../i18n/LangContext";
import { translate } from "../../i18n/utils";


export default function UserPage() {
  const { lang } = useLang();

  const playerName = getCurrentPlayer()!;
  const results = currentScoresStorage.getResultsForPlayer(playerName).sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt)
  );                                                           // risultati ordinati dal più recente
  const last10 = results.slice(0, 10);                         // ultime 10 partite

  const gamesPlayed = results.length;                          // totale partite giocate
  const bestScore = results.reduce((max, r) => Math.max(max, r.score), 0);   // miglior punteggio
  const highScoreUnlocked = bestScore >= 9;                    // medaglia punteggio alto
  const hotStreakUnlocked = results.some(          // medaglia streak
    (r) => (r.maxStreak || 0) >= 5
  );
  return (
    <div className="min-h-[70vh] mt-6">

      {/* Titolo pagina */}
      <h1 className="text-2xl font-bold mb-4">
        {translate("userpage.title", lang).replace("{player}", playerName)}
      </h1>

      {/* Contenitore statistiche e medaglie */}
      <div className="flex flex-col md:flex-row gap-3 mb-3">

        {/* Card Statistiche */}
        <div className="card flex-1">
          <div>
            <p className="text-base font-semibold mb-2">
              {translate("userpage.statsTitle", lang)}
            </p>

            <div className="flex flex-row flex-wrap gap-6">

              <div>
                <p className="text-xl font-bold">{gamesPlayed}</p>
                <p className="text-xs text-muted">
                  {translate("userpage.gamesPlayed", lang)}
                </p>
              </div>

              <div>
                <p className="text-xl font-bold">{bestScore}</p>
                <p className="text-xs text-muted">
                  {translate("userpage.bestScore", lang)}
                </p>
              </div>

              {/* Bottoni solo in Mobile */}
              <div className="flex-1 gap-3 flex sm:hidden">
                <a href="/quiz" className="btn-primary flex-1 px-2 sm:px-4 py-1 sm:py-2 whitespace-nowrap">
                  {translate("navbar.play", lang)}
                </a>
                <a href="/highscores" className="btn-surface flex-1 px-2 sm:px-4 py-1 sm:py-2 whitespace-nowrap">
                  {translate("navbar.highScores", lang)}
                </a>
              </div>

            </div>
          </div>
        </div>

        {/* Card Medaglie */}
        <div className="card flex-1">
          <div>
            <p className="text-base font-semibold mb-2">
              {translate("userpage.badgesTitle", lang)}
            </p>

            <div className="flex flex-col gap-2">

              {/* Medaglia 1 */}
              <span
                className={`chip ${gamesPlayed >= 1 ? "chip-filled" : "chip-outlined"
                  }`}
              >
                <span>🥉</span>
                <span>{translate("userpage.badge.firstPlay", lang)}</span>
              </span>

              {/* Medaglia 2 */}
              <span
                className={`chip ${highScoreUnlocked ? "chip-filled" : "chip-outlined"
                  }`}
              >
                <span>👑</span>
                <span>{translate("userpage.badge.highRoller", lang)}</span>
              </span>

              {/* Medaglia 3 */}
              <span
                className={`chip ${hotStreakUnlocked ? "chip-filled" : "chip-outlined"
                  }`}
              >
                <span>🔥</span>
                <span>{translate("userpage.badge.hotStreak", lang)}</span>
              </span>

            </div>
          </div>
        </div>

      </div>

      {/* Card Ultime partite */}
      <div className="card">
        <p className="text-base font-semibold mb-2">
          {translate("userpage.recentGamesTitle", lang)}
        </p>

        {last10.length === 0 ? (

          // Nessuna partita registrata
          <p className="text-sm text-muted">
            {translate("userpage.noGames", lang)}
          </p>

        ) : (
          <div>

            {last10.map((r, index) => (
              <div key={index}>

                {/* divider tra gli elementi */}
                {index > 0 && <div className="divider"></div>}

                {/* Riga partita */}
                <div className="flex justify-between items-center py-1 flex-wrap gap-1">
                  <p className="text-sm">
                    {new Date(r.createdAt).toLocaleString()}{" "}
                    {r.mode === "infinite" && (
                      <span className="text-xs text-primary font-semibold">
                        ∞ {r.rounds || 1} {r.rounds === 1 ? "round" : "rounds"}
                      </span>
                    )}
                    {" - "}
                    <strong>
                      {r.score}/{r.totalQuestions}
                    </strong>
                    {r.maxStreak && r.maxStreak >= 3 && (
                      <span className="text-xs ml-1">
                        🔥 {r.maxStreak}
                      </span>
                    )}
                  </p>
                </div>

              </div>
            ))}

          </div>
        )}
      </div>

    </div>
  );
}
