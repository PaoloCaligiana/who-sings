import { useLang } from "../../i18n/LangContext";
import { translate } from "../../i18n/utils";
import { bestScorePerPlayer } from "../../services/leaderboardStrategies";
import { getLeaderboard } from "../../services/leaderBoardService";
import { globalScoresStorage } from "../../storage/globalScoresStorage";

export default function HighScoresPage() {
  const { lang } = useLang();

  const strategy = bestScorePerPlayer;
  const leaderboard = getLeaderboard(strategy, 10);

  const maxScore = Math.max(globalScoresStorage.getMaxScore(), 1);

  return (
    <div className="min-h-[70vh] mt-6">
      <h1 className="text-2xl font-bold mb-2">
        {translate("highscores.title", lang)}
      </h1>

      <p className="text-sm text-muted mb-3">
        {translate("highscores.subtitle", lang)}
      </p>

      <div className="card">
        {leaderboard.length === 0 ? (
          <p className="text-sm text-muted">
            {translate("highscores.empty", lang)}
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {leaderboard.map((entry, index) => (
              <div key={entry.player}>

                <div className="flex justify-between items-center">
                  <p className="text-sm">
                    {translate("highscores.position", lang).replace("{pos}", String(index + 1))}
                    <strong>{entry.player}</strong>
                  </p>
                  <p className="text-sm">{entry.bestScore}</p>
                </div>

                <div className="progress-track mt-1">
                  <div
                    className="progress-fill"
                    style={{ width: `${(entry.bestScore / maxScore) * 100}%` }}
                  />
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
