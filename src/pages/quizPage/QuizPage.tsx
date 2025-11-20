import { useEffect } from "react";
import { getCurrentPlayer } from "../../storage/playerStorage";
import { globalScoresStorage } from "../../storage/globalScoresStorage";
import { currentScoresStorage } from "../../storage/currentScoresStorage";
import { useQuestionTimer } from "../../hooks/useQuestionTimer";
import { useQuizEngine } from "../../hooks/useQuizEngine";
import { getQuizMode } from "../../storage/quizSessionStorage";
import LoadingScreen from "./LoadingScreen";
import QuizStartScreen from "./QuizStartScreen";
import QuizResultScreen from "./QuizResultScreen";
import QuizGameScreen from "./QuizGameScreen";
import QuizErrorScreen from "./QuizErrorScreen";

const QUIZ_CONFIG = {
  normal: { questions: 7, time: 7, finishOnWrongAnswer: false },
  infinite: { questions: 7, time: 7, finishOnWrongAnswer: true }
} as const;

export default function QuizPage() {
  const playerName = getCurrentPlayer()!;
  const mode = getQuizMode(); // Legge da sessionStorage
  const config = QUIZ_CONFIG[mode];

  const quiz = useQuizEngine({
    totalQuestions: config.questions,
    finishOnWrongAnswer: config.finishOnWrongAnswer
  });

  const { timeLeft } = useQuestionTimer({
    duration: config.time,
    active: quiz.status === "answering",
    onExpire: quiz.handleTimeout,
  });

  /* -------------------------------------------------------------------------- */
  /*                          SALVATAGGIO PUNTEGGIO                              */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    if (quiz.status === "finished") {
      const isInfinite = mode === "infinite";
      const finalScore = isInfinite ? quiz.totalScore : quiz.score;
      const finalMaxStreak = isInfinite ? quiz.maxStreak : quiz.streak;
      
      const gameResult = {
        playerName,
        score: finalScore,
        totalQuestions: isInfinite ? finalScore : config.questions, // In infinita, totalQuestions = score raggiunto
        createdAt: new Date().toISOString()
      };

      globalScoresStorage.saveGameResult(gameResult);
      currentScoresStorage.saveGameResult(gameResult);
      
      console.log('[Quiz] Partita salvata:', { 
        mode, 
        score: finalScore, 
        maxStreak: finalMaxStreak,
        round: isInfinite ? quiz.infiniteRound : 1
      });
    }
  }, [quiz.status, playerName, quiz.score, quiz.totalScore, quiz.maxStreak, quiz.streak, quiz.infiniteRound, mode, config.questions]);

  /* ========================================================================== */
  /*                       RENDER: LOADING / START BUTTON / ERROR               */
  /* ========================================================================== */

  if (quiz.status === "loadingQuestions") return <LoadingScreen />;

  if (quiz.status === "error") return <QuizErrorScreen errorMessage={quiz.errorMessage} reloadQuiz={quiz.reloadQuiz} />;

  if (quiz.status === "ready") return <QuizStartScreen onStart={quiz.startGame} onSwitchMode={quiz.switchMode} questionsCount={quiz.questions.length} isInfiniteMode={mode === "infinite"} />;

  /* ========================================================================== */
  /*                            RENDER: QUIZ FINITO                              */
  /* ========================================================================== */

  if (quiz.status === "finished") {
    const isInfinite = mode === "infinite";
    const completedAllQuestions = quiz.score === config.questions;
    const canContinue = isInfinite && completedAllQuestions;
    
    return (
      <QuizResultScreen
        playerName={playerName}
        score={isInfinite ? quiz.totalScore : quiz.score}
        totalQuestions={isInfinite ? quiz.totalScore : config.questions}
        reloadQuiz={quiz.reloadQuiz}
        isInfiniteMode={isInfinite}
        isLegendary={false}
        canContinue={canContinue}
        onContinue={canContinue ? quiz.continueInfinite : undefined}
        onSwitchMode={quiz.switchMode}
      />
    );
  }

  /* ========================================================================== */
  /*                               RENDER: QUIZ                                  */
  /* ========================================================================== */

  return (
    <QuizGameScreen
      questionIndex={quiz.questionIndex}
      totalQuestions={mode === "infinite" ? undefined : config.questions} // Infinite non mostra totale
      score={quiz.score}
      streak={quiz.streak}
      currentQuestion={quiz.currentQuestion}
      timeLeft={timeLeft}
      questionTime={config.time}
      status={quiz.status}
      selectedOption={quiz.selectedOption}
      onAnswer={quiz.handleAnswer}
      isInfiniteMode={mode === "infinite"}
    />
  );
}
