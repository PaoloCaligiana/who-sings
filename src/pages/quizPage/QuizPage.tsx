import { useState, useEffect } from "react";
import { getCurrentPlayer } from "../../storage/playerStorage";
import type { QuizCard } from "../../types";
import { DEMO_QUESTIONS } from "../../data/quizData";
import { globalScoresStorage } from "../../storage/globalScoresStorage";
import { currentScoresStorage } from "../../storage/currentScoresStorage";
import { useQuestionTimer } from "../../hooks/useQuestionTimer";
import LoadingScreen from "./LoadingScreen";
import StartScreen from "./StartScreen";
import QuizResultScreen from "./QuizResultScreen";
import QuizGameScreen from "./QuizGameScreen";
// import { preloadQuizCards } from "../../api/quizGenerator"; // <-- Usare quando API pronte


const TOTAL_QUESTIONS = 7;
const QUESTION_TIME = 7;

export default function QuizPage() {
  const playerName = getCurrentPlayer()!;

  const [questionIndex, setQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<QuizCard | null>(null);
  const [questions, setQuestions] = useState<QuizCard[]>([]); // Domande caricate

  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const [status, setStatus] =
    useState<"loadingQuestions" | "ready" | "answering" | "feedback" | "finished">("loadingQuestions");

  const [selectedOption, setSelectedOption] = useState<string | null>(null);




  /* -------------------------------------------------------------------------- */
  /*                               FUNZIONI DI GIOCO                             */
  /* -------------------------------------------------------------------------- */

  /** Ricarica le domande dall'inizio (per "Gioca ancora") */
  const reloadQuiz = () => {
    setStatus("loadingQuestions");

    // Ricarica le domande
    async function reload() {
      // Simula un caricamento (rimuovere quando usi le API)
      await new Promise(resolve => setTimeout(resolve, 500));

      // 🔥 QUANDO LE API SARANNO PRONTE, sostituire con:
      // const qs = await preloadQuizCards(TOTAL_QUESTIONS);
      // setQuestions(qs);

      // Per ora usa DEMO_QUESTIONS
      setQuestions(DEMO_QUESTIONS.slice(0, TOTAL_QUESTIONS));

      setStatus("ready");
    }

    reload();
  };

  /** Inizia il quiz con le domande già caricate */
  const startGame = () => {
    setQuestionIndex(0);
    setCurrentQuestion(questions[0]); // Imposta la prima domanda
    setScore(0);
    setStreak(0);
    setSelectedOption(null);
    setStatus("answering");
  };

  /** Gestisce il passaggio alla domanda successiva */
  const goNextQuestion = () => {
    const nextIndex = questionIndex + 1;

    if (nextIndex >= TOTAL_QUESTIONS) {
      setStatus("finished");
      return;
    }

    setQuestionIndex(nextIndex);
    setCurrentQuestion(questions[nextIndex]);
    setSelectedOption(null);
    setStatus("answering");
  };

  /** Timeout della domanda */

  const handleTimeout = () => {
    setStreak(0);
    setStatus("feedback");
    setTimeout(goNextQuestion, 800);
  };


  /* -------------------------------------------------------------------------- */
  /*                                  TIMER                                      */
  /* -------------------------------------------------------------------------- */


  const { timeLeft } = useQuestionTimer({
    duration: QUESTION_TIME,
    active: status === "answering",
    onExpire: handleTimeout,
  });


  /* -------------------------------------------------------------------------- */
  /*                            CARICAMENTO INIZIALE                              */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    async function loadQuestions() {
      setStatus("loadingQuestions");

      // Simula un caricamento (rimuovere quando usi le API)
      await new Promise(resolve => setTimeout(resolve, 500));

      // 🔥 QUANDO LE API SARANNO PRONTE, sostituire con:
      // const qs = await preloadQuizCards(TOTAL_QUESTIONS);
      // setQuestions(qs);

      // Per ora usa DEMO_QUESTIONS
      setQuestions(DEMO_QUESTIONS.slice(0, TOTAL_QUESTIONS));

      setStatus("ready"); // ✅ Ora il bottone Start è abilitato!
    }

    loadQuestions();
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                          SALVATAGGIO PUNTEGGIO                              */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    if (status === "finished") {
      const gameResult = {
        playerName,
        score,
        totalQuestions: TOTAL_QUESTIONS,
        createdAt: new Date().toISOString()
      };

      globalScoresStorage.saveGameResult(gameResult);
      currentScoresStorage.saveGameResult(gameResult);
    }
  }, [status, playerName, score]);


  /* -------------------------------------------------------------------------- */
  /*                                  RISPOSTA                                   */
  /* -------------------------------------------------------------------------- */

  const handleAnswer = (artist: string) => {
    if (!currentQuestion || status !== "answering") return;

    setSelectedOption(artist);

    const isCorrect = artist === currentQuestion.correctArtist;

    setStreak((s) => (isCorrect ? s + 1 : 0));
    if (isCorrect) setScore((s) => s + 1);

    setStatus("feedback");

    setTimeout(goNextQuestion, 800);
  };


  /* ========================================================================== */
  /*                       RENDER: LOADING / START BUTTON                        */
  /* ========================================================================== */

  if (status === "loadingQuestions") return <LoadingScreen />;

  if (status === "ready") return <StartScreen onStart={startGame} questionsCount={questions.length} />;


  /* ========================================================================== */
  /*                            RENDER: QUIZ FINITO                              */
  /* ========================================================================== */

  if (status === "finished") {
    return (
      <QuizResultScreen
        playerName={playerName}
        score={score}
        totalQuestions={TOTAL_QUESTIONS}
        reloadQuiz={reloadQuiz}
      />
    );
  }

  /* ========================================================================== */
  /*                               RENDER: QUIZ                                  */
  /* ========================================================================== */

  return (
    <QuizGameScreen
      questionIndex={questionIndex}
      totalQuestions={TOTAL_QUESTIONS}
      score={score} streak={streak}
      currentQuestion={currentQuestion}
      timeLeft={timeLeft}
      questionTime={QUESTION_TIME}
      status={status}
      selectedOption={selectedOption}
      onAnswer={handleAnswer} />
  )
}
