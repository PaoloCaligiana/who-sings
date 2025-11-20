import { useState, useEffect } from "react";
import type { QuizCard } from "../types";
import { preloadQuizCards } from "../api/quizGenerator";
import { getInfiniteProgress, saveInfiniteProgress, clearInfiniteProgress, saveQuizMode } from "../storage/quizSessionStorage";
import { globalScoresStorage } from "../storage/globalScoresStorage";

type QuizStatus = "loadingQuestions" | "ready" | "answering" | "feedback" | "finished" | "error";

type UseQuizEngineOptions = {
  totalQuestions: number;
  finishOnWrongAnswer?: boolean; // Per modalità infinita
};

export function useQuizEngine(options: UseQuizEngineOptions | number) {
  const config = typeof options === "number" ? { totalQuestions: options, finishOnWrongAnswer: false } : options;

  const { totalQuestions, finishOnWrongAnswer } = config;

  const [questions, setQuestions] = useState<QuizCard[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<QuizCard | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [status, setStatus] = useState<QuizStatus>("loadingQuestions");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  // Infinite mode specifics
  const [infiniteRound, setInfiniteRound] = useState(1);
  const [cumulativeScore, setCumulativeScore] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0); // Streak massima raggiunta
  const [isLegendary, setIsLegendary] = useState(false); // Nuovo record mondiale

  /* -------------------------------------------------------------------------- */
  /*                            CARICAMENTO INIZIALE                              */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    async function loadQuestions() {
      setStatus("loadingQuestions");
      try {
        // In infinite mode, ripristina progresso se presente
        if (finishOnWrongAnswer) {
          const savedProgress = getInfiniteProgress();
          if (savedProgress) {
            setCumulativeScore(savedProgress.score);
            setInfiniteRound(savedProgress.round);
            setStreak(savedProgress.streak);
            setMaxStreak(savedProgress.maxStreak || savedProgress.streak); // Compatibilità con vecchi save
          }
        }

        const qs = await preloadQuizCards(totalQuestions);
        setQuestions(qs);
        setStatus("ready");
      } catch (err) {
        setErrorMessage(err instanceof Error ? err.message : "Failed to load quiz questions");
        setStatus("error");
      }
    }

    loadQuestions();
  }, [totalQuestions, finishOnWrongAnswer]);

  /* -------------------------------------------------------------------------- */
  /*                               FUNZIONI DI GIOCO                             */
  /* -------------------------------------------------------------------------- */

  /** Ricarica le domande dall'inizio (per "Gioca ancora") */
  const reloadQuiz = () => {
    setStatus("loadingQuestions");
    setErrorMessage("");

    // Reset infinite progress
    if (finishOnWrongAnswer) {
      clearInfiniteProgress();
      setCumulativeScore(0);
      setInfiniteRound(1);
      setMaxStreak(0);
    }

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

  /** Continua in infinite mode caricando altre domande */
  const continueInfinite = () => {
    // Salva progresso cumulativo
    const newCumulativeScore = cumulativeScore + score;
    setCumulativeScore(newCumulativeScore);
    const newRound = infiniteRound + 1;
    setInfiniteRound(newRound);

    // Aggiorna maxStreak se necessario
    const newMaxStreak = Math.max(maxStreak, streak);
    setMaxStreak(newMaxStreak);

    saveInfiniteProgress({
      score: newCumulativeScore,
      streak, // Mantieni streak corrente per il prossimo round
      maxStreak: newMaxStreak,
      round: newRound,
    });

    // Ricarica domande
    setStatus("loadingQuestions");
    setScore(0); // Reset score del round corrente

    async function loadNext() {
      try {
        const qs = await preloadQuizCards(totalQuestions);
        setQuestions(qs);
        setStatus("ready");
      } catch (err) {
        setErrorMessage(err instanceof Error ? err.message : "Failed to load next questions");
        setStatus("error");
      }
    }

    loadNext();
  };

  /* Cambia modalita' da normale a infinite e viceversa */
  const switchMode = () => {
    if (finishOnWrongAnswer) {
      saveQuizMode("normal");
    } else {
      saveQuizMode("infinite");
    }
    clearInfiniteProgress();
    setCumulativeScore(0);
    setInfiniteRound(1);
    setMaxStreak(0);
    setStreak(0);

    setStatus("loadingQuestions");
  };

  /** Inizia il quiz con le domande già caricate */
  const startGame = () => {
    setQuestionIndex(0);
    setCurrentQuestion(questions[0]);
    setScore(0);
    // Non resetta streak in infinite mode (viene mantenuta tra i round)
    if (!finishOnWrongAnswer) {
      setStreak(0);
    }
    setSelectedOption(null);
    setStatus("answering");
  };

  /** Gestisce il passaggio alla domanda successiva */
  const goNextQuestion = () => {
    const nextIndex = questionIndex + 1;

    if (nextIndex >= totalQuestions) {
      // Verifica se è un nuovo record prima di finire
      const finalScore = finishOnWrongAnswer ? cumulativeScore + score : score;
      const previousMaxScore = globalScoresStorage.getMaxScore();
      if (finalScore > previousMaxScore) {
        setIsLegendary(true);
      }
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

    // In modalità infinita, timeout = errore = fine gioco
    if (finishOnWrongAnswer) {
      // Verifica se è un nuovo record
      const finalScore = cumulativeScore + score;
      const previousMaxScore = globalScoresStorage.getMaxScore();
      if (finalScore > previousMaxScore) {
        setIsLegendary(true);
      }
      clearInfiniteProgress();
      setTimeout(() => setStatus("finished"), 800);
    } else {
      setTimeout(goNextQuestion, 800);
    }
  };

  /** Gestisce la risposta dell'utente */
  const handleAnswer = (artist: string) => {
    if (!currentQuestion || status !== "answering") return;

    setSelectedOption(artist);

    const isCorrect = artist === currentQuestion.correctArtist;

    setStreak((s) => {
      const newStreak = isCorrect ? s + 1 : 0;
      // Aggiorna maxStreak in infinite mode
      if (finishOnWrongAnswer && newStreak > maxStreak) {
        setMaxStreak(newStreak);
      }
      return newStreak;
    });
    if (isCorrect) setScore((s) => s + 1);

    setStatus("feedback");

    // In modalità infinita, termina se sbaglia
    if (finishOnWrongAnswer && !isCorrect) {
      // Verifica se è un nuovo record
      const finalScore = cumulativeScore + score;
      const previousMaxScore = globalScoresStorage.getMaxScore();
      if (finalScore > previousMaxScore) {
        setIsLegendary(true);
      }
      // Salva punteggio finale prima di terminare
      clearInfiniteProgress();
      setTimeout(() => setStatus("finished"), 800);
    } else {
      setTimeout(goNextQuestion, 800);
    }
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

    // Infinite mode state
    infiniteRound,
    cumulativeScore,
    totalScore: cumulativeScore + score, // Punteggio totale in infinite mode
    maxStreak, // Streak massima raggiunta nell'intera sessione
    isLegendary, // Indica se ha battuto il record mondiale

    // Actions
    startGame,
    handleAnswer,
    handleTimeout,
    reloadQuiz,
    continueInfinite,
    switchMode,
  };
}
