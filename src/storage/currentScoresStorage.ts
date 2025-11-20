import { createScoreStorage } from "./createScoresStorage";

const CURRENT_SCORES_KEY = "pc-who-sings-current-scores";

export const currentScoresStorage = createScoreStorage(CURRENT_SCORES_KEY);
