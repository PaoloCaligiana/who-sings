import { currentScoresStorage } from "./currentScoresStorage";
import { clearLanguage } from "./languageStorage";
import { clearPlayer } from "./playerStorage";
import { clearInfiniteProgress, clearQuizMode } from "./quizSessionStorage";


export function logout() {
  clearPlayer();
  currentScoresStorage.clear();
  clearQuizMode();
  clearLanguage();
  clearInfiniteProgress()
}