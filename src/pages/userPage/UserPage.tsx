import { getCurrentPlayer } from "../../storage/playerStorage";
import { getResultsForPlayer } from "../../storage/scoresStorage";
import { translate } from "../../i18n/dictionary";
import { useLang } from "../../i18n/LangContext";
import type { GameResult } from "../../types";

type ExtendedGameResult = GameResult & { maxStreak?: number };


export default function UserPage() {
  const { lang } = useLang();                                  // lingua corrente

  const playerName = getCurrentPlayer()!;                      // nome giocatore corrente
  const results = getResultsForPlayer(playerName).sort((a, b) =>
    b.createdAt.localeCompare(a.createdAt)
  );                                                           // risultati ordinati dal più recente
  const last10 = results.slice(0, 10);                         // ultime 10 partite

  const gamesPlayed = results.length;                          // totale partite giocate
  const bestScore = results.reduce((max, r) => Math.max(max, r.score), 0);   // miglior punteggio
  const highScoreUnlocked = bestScore >= 9;                    // medaglia punteggio alto
  const hotStreakUnlocked = (results as ExtendedGameResult[]).some(          // medaglia streak
    (r) => (r.maxStreak || 0) >= 5
  );
  return (
    <div>

      {/* Titolo pagina */}
      <h1 className="text-2xl font-bold mb-2">
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
              <div key={r.id}>

                {/* divider tra gli elementi */}
                {index > 0 && <div className="divider"></div>}

                {/* Riga partita */}
                <div className="flex justify-between items-center py-1 flex-wrap gap-1">
                  <p className="text-sm">
                    {new Date(r.createdAt).toLocaleString()} –{" "}
                    <strong>
                      {r.score}/{r.totalQuestions}
                    </strong>
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
