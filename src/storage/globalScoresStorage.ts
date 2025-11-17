import { createScoreStorage } from "./createScoresStorage";

const GLOBAL_SCORES_KEY = "who-sings-global-scores";

export const globalScoresStorage = createScoreStorage(GLOBAL_SCORES_KEY);
