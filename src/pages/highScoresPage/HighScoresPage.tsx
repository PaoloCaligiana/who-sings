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

  const getTitleKey = (position: number) => {
    const titles = [
      "highscores.title1",
      "highscores.title2",
      "highscores.title3",
      "highscores.title4",
      "highscores.title5",
      "highscores.title6",
      "highscores.title7",
      "highscores.title8",
      "highscores.title9",
      "highscores.title10",
    ] as const;
    return titles[position] || titles[0];
  };

  return (
    <div className="min-h-[70vh] mt-6">
      <h1 className="text-2xl font-bold mb-2">{translate("highscores.title", lang)}</h1>

      <p className="text-sm text-muted mb-3">{translate("highscores.subtitle", lang)}</p>

      <div className="card">
        {leaderboard.length === 0 ? (
          <p className="text-sm text-muted">{translate("highscores.empty", lang)}</p>
        ) : (
          <div className="flex flex-col gap-3">
            {leaderboard.map((entry, index) => (
              <div key={entry.player}>
                <div className="flex justify-between items-center gap-2">
                  <div className="flex flex-row gap-6 ">
                    <p className="text-sm">
                      {index === 0 && "🥇 "}
                      {index === 1 && "🥈 "}
                      {index === 2 && "🥉 "}
                      {index === 3 && "4️⃣ "}
                      {index === 4 && "5️⃣ "}
                      {index === 5 && "6️⃣ "}
                      {index === 6 && "7️⃣ "}
                      {index === 7 && "8️⃣ "}
                      {index === 8 && "9️⃣ "}
                      {index === 9 && "🔟 "}
                      <strong>{entry.player}</strong>
                    </p>
                    {entry.mainGenre && (
                      <p className="text-xs text-primary">
                        {translate(getTitleKey(index), lang).replace("{genre}", entry.mainGenre)}
                      </p>
                    )}
                  </div>
                  <p className="text-sm font-semibold">{entry.bestScore}</p>
                </div>

                <div className="progress-track mt-1">
                  <div className="progress-fill" style={{ width: `${(entry.bestScore / maxScore) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
