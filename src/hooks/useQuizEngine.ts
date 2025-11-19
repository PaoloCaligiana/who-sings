import { useState, useEffect } from "react";
import type { QuizCard } from "../types";
import { preloadQuizCards } from "../api/quizGenerator";

type QuizStatus = "loadingQuestions" | "ready" | "answering" | "feedback" | "finished" | "error";

export function useQuizEngine(totalQuestions: number) {
  const [questions, setQuestions] = useState<QuizCard[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<QuizCard | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [status, setStatus] = useState<QuizStatus>("loadingQuestions");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  /* -------------------------------------------------------------------------- */
  /*                            CARICAMENTO INIZIALE                              */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    async function loadQuestions() {
      setStatus("loadingQuestions");
      try {
        const qs = await preloadQuizCards(totalQuestions);
        setQuestions(qs);
        setStatus("ready");
      } catch (err) {
        setErrorMessage(err instanceof Error ? err.message : "Failed to load quiz questions");
        setStatus("error");
      }
    }

    loadQuestions();
  }, [totalQuestions]);

  /* -------------------------------------------------------------------------- */
  /*                               FUNZIONI DI GIOCO                             */
  /* -------------------------------------------------------------------------- */

  /** Ricarica le domande dall'inizio (per "Gioca ancora") */
  const reloadQuiz = () => {
    setStatus("loadingQuestions");
    setErrorMessage("");

    async function reload() {
      try {
        const qs = await preloadQuizCards(totalQuestions);
        setQuestions(qs);
        setStatus("ready");
      } catch (err) {
        setErrorMessage(err instanceof Error ? err.message : "Failed to load quiz questions");
        setStatus("error");
      }
    }

    reload();
  };

  /** Inizia il quiz con le domande già caricate */
  const startGame = () => {
    setQuestionIndex(0);
    setCurrentQuestion(questions[0]);
    setScore(0);
    setStreak(0);
    setSelectedOption(null);
    setStatus("answering");
  };

  /** Gestisce il passaggio alla domanda successiva */
  const goNextQuestion = () => {
    const nextIndex = questionIndex + 1;

    if (nextIndex >= totalQuestions) {
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

  /** Gestisce la risposta dell'utente */
  const handleAnswer = (artist: string) => {
    if (!currentQuestion || status !== "answering") return;

    setSelectedOption(artist);

    const isCorrect = artist === currentQuestion.correctArtist;

    setStreak((s) => (isCorrect ? s + 1 : 0));
    if (isCorrect) setScore((s) => s + 1);

    setStatus("feedback");

    setTimeout(goNextQuestion, 800);
  };

  return {
    // State
    questions,
    questionIndex,
    currentQuestion,
    score,
    streak,
    status,
    errorMessage,
    selectedOption,

    // Actions
    startGame,
    handleAnswer,
    handleTimeout,
    reloadQuiz,
  };
}
