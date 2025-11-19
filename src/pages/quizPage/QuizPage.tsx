import { useEffect } from "react";
import { getCurrentPlayer } from "../../storage/playerStorage";
import { globalScoresStorage } from "../../storage/globalScoresStorage";
import { currentScoresStorage } from "../../storage/currentScoresStorage";
import { useQuestionTimer } from "../../hooks/useQuestionTimer";
import { useQuizEngine } from "../../hooks/useQuizEngine";
import LoadingScreen from "./LoadingScreen";
import QuizStartScreen from "./QuizStartScreen";
import QuizResultScreen from "./QuizResultScreen";
import QuizGameScreen from "./QuizGameScreen";
import QuizErrorScreen from "./QuizErrorScreen";


const TOTAL_QUESTIONS = 7;
const QUESTION_TIME = 7;

export default function QuizPage() {
  const playerName = getCurrentPlayer()!;

  const quiz = useQuizEngine(TOTAL_QUESTIONS);

  const { timeLeft } = useQuestionTimer({
    duration: QUESTION_TIME,
    active: quiz.status === "answering",
    onExpire: quiz.handleTimeout,
  });

  /* -------------------------------------------------------------------------- */
  /*                          SALVATAGGIO PUNTEGGIO                              */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    if (quiz.status === "finished") {
      const gameResult = {
        playerName,
        score: quiz.score,
        totalQuestions: TOTAL_QUESTIONS,
        createdAt: new Date().toISOString()
      };

      globalScoresStorage.saveGameResult(gameResult);
      currentScoresStorage.saveGameResult(gameResult);
    }
  }, [quiz.status, playerName, quiz.score]);

  /* ========================================================================== */
  /*                       RENDER: LOADING / START BUTTON / ERROR               */
  /* ========================================================================== */

  if (quiz.status === "loadingQuestions") return <LoadingScreen />;

  if (quiz.status === "error") return <QuizErrorScreen errorMessage={quiz.errorMessage} reloadQuiz={quiz.reloadQuiz} />;

  if (quiz.status === "ready") return <QuizStartScreen onStart={quiz.startGame} questionsCount={quiz.questions.length} />;

  /* ========================================================================== */
  /*                            RENDER: QUIZ FINITO                              */
  /* ========================================================================== */

  if (quiz.status === "finished") {
    return (
      <QuizResultScreen
        playerName={playerName}
        score={quiz.score}
        totalQuestions={TOTAL_QUESTIONS}
        reloadQuiz={quiz.reloadQuiz}
      />
    );
  }

  /* ========================================================================== */
  /*                               RENDER: QUIZ                                  */
  /* ========================================================================== */

  return (
    <QuizGameScreen
      questionIndex={quiz.questionIndex}
      totalQuestions={TOTAL_QUESTIONS}
      score={quiz.score}
      streak={quiz.streak}
      currentQuestion={quiz.currentQuestion}
      timeLeft={timeLeft}
      questionTime={QUESTION_TIME}
      status={quiz.status}
      selectedOption={quiz.selectedOption}
      onAnswer={quiz.handleAnswer}
    />
  );
}
