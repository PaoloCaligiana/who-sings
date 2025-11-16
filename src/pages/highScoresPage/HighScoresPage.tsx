import { getAllResults } from "../../storage/scoresStorage";
import { translate } from "../../i18n/dictionary";
import { useLang } from "../../i18n/LangContext";

export default function HighScoresPage() {
  const { lang } = useLang();                                 // lingua selezionata

  const all = getAllResults();                                // recupera tutti i risultati salvati
  const byPlayer = new Map<string, typeof all>();             // raggruppa risultati per giocatore

  all.forEach((r) => {
    if (!byPlayer.has(r.playerName)) byPlayer.set(r.playerName, []);   // crea array se non esiste
    byPlayer.get(r.playerName)!.push(r);                              // aggiunge risultato al player
  });

  const leaderboard = Array.from(byPlayer.entries())          // converte in array semplice
    .map(([player, results]) => {
      const bestScore = Math.max(...results.map((r) => r.score));      // calcola miglior punteggio
      return { player, bestScore };
    })
    .sort((a, b) => b.bestScore - a.bestScore)                // ordina per punteggio desc
    .slice(0, 10);                                            // prende solo top 10

  const maxScore = leaderboard.reduce(                        // usato per barra di progressione
    (m, i) => Math.max(m, i.bestScore),
    1
  );

  return (
    <div>
      {/* Title principale */}
      <h1 className="text-2xl font-bold mb-1">
        {translate("highscores.title", lang)}
      </h1>

      {/* Sottotitolo descrittivo */}
      <p className="text-sm text-muted mb-3">
        {translate("highscores.subtitle", lang)}
      </p>

      {/* Card contenitore leaderboard */}
      <div className="card">
        {leaderboard.length === 0 ? (

          // Caso: nessun punteggio salvato
          <p className="text-sm text-muted">
            {translate("highscores.empty", lang)}
          </p>

        ) : (
          <div className="flex flex-col gap-3">

            {leaderboard.map((entry, index) => (
              <div key={entry.player}>

                {/* Riga superiore: posizione + nome giocatore + punteggio */}
                <div className="flex justify-between items-center">
                  <p className="text-sm">
                    {translate("highscores.position", lang).replace("{pos}", String(index + 1))}
                    <strong>{entry.player}</strong>
                  </p>
                  <p className="text-sm">{entry.bestScore}</p>
                </div>

                {/* Barra di progressione proporzionale al punteggio */}
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
