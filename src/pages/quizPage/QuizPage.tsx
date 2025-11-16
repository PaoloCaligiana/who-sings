import { useState, useEffect } from "react";
import { getCurrentPlayer } from "../../storage/playerStorage";
import { useCountdown } from "../../hooks/useCountdown";
import type { QuizCard } from "../../types";
import { DEMO_QUESTIONS } from "../../data/quizData";
import QuizResult from "./QuizResult";

const TOTAL_QUESTIONS = 7;
const QUESTION_TIME = 10;

export default function QuizPage() {
  const playerName = getCurrentPlayer()!;

  const [questionIndex, setQuestionIndex] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<QuizCard | null>(null);

  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const [status, setStatus] =
    useState<"loading" | "answering" | "feedback" | "finished">("loading");

  const [selectedOption, setSelectedOption] = useState<string | null>(null);


  /* -------------------------------------------------------------------------- */
  /*                               FUNZIONI DI GIOCO                             */
  /* -------------------------------------------------------------------------- */

  const loadQuestion = () => {
    const q = DEMO_QUESTIONS[questionIndex];
    setCurrentQuestion(q);
    setSelectedOption(null);
    setStatus("answering");
  };

  const startQuiz = () => {
    setQuestionIndex(0);
    setScore(0);
    setStreak(0);
    loadQuestion();
  };

  /** Gestisce il passaggio alla domanda successiva */

  const goNextQuestion = () => {
    if (questionIndex + 1 >= TOTAL_QUESTIONS) {
      setStatus("finished");
      return;
    }

    setQuestionIndex((i) => i + 1);
    loadQuestion();
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


  const timeLeft = useCountdown(
    status === "answering" ? QUESTION_TIME : 0,
    () => {
      if (status === "answering") handleTimeout();
    }
  );

  /* -------------------------------------------------------------------------- */
  /*                            CARICAMENTO INIZIALE                              */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    startQuiz();
    // eslint-disable-next-line react-hooks/exhaustive-deps

  }, []);

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

    setTimeout(goNextQuestion, 1300);
  };

  /* ========================================================================== */
  /*                            RENDER: QUIZ FINITO                              */
  /* ========================================================================== */

  if (status === "finished") {
    return (
     <QuizResult
        playerName={playerName}
        score={score}
        totalQuestions={TOTAL_QUESTIONS}
        startQuiz={startQuiz}
      />  
    );
  }

  /* ========================================================================== */
  /*                               RENDER: QUIZ                                  */
  /* ========================================================================== */

  return (
    <div className="w-full">
      {/* Header */}

      <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
        <span className="text-sm text-muted">
          Domanda {questionIndex + 1} / {TOTAL_QUESTIONS}
        </span>

        <div className="flex items-center gap-2">
          <span className="badge-primary">
            Punteggio: {score}
          </span>

          {streak >= 2 && (
            <span className="badge-streak">
              🔥 Streak x{streak}
            </span>
          )}
        </div>
      </div>

      {/* Card */}

      <div className="card">
        <span className="text-xs uppercase tracking-wider text-muted">
          Chi canta questa frase?
        </span>

        {/* Lyric */}

        <div className="lyric-box">
          {currentQuestion ? (
            <span className="opacity-100 transition-opacity duration-300">
              “{currentQuestion.lyricLine}”
            </span>
          ) : (
            <span className="opacity-40 text-muted">...</span>
          )}
        </div>

        {/* Timer */}

        {status === "answering" && (
          <div className="mb-3">
            <p className="text-xs text-muted">Tempo rimasto: {timeLeft}s</p>

            <div className="progress-track">
              <div
                className="progress-fill"
                style={{
                  width: `${(timeLeft / QUESTION_TIME) * 100}%`,
                }}
              />
            </div>
          </div>
        )}

        {/* Options */}
        <div className="flex flex-col gap-2 mt-2">
          {currentQuestion?.options.map((artist) => {
            const isSelected = selectedOption === artist;
            const isCorrect = artist === currentQuestion.correctArtist;
            const isFeedback = status === "feedback";

            let className = "btn-answer";

            if (isFeedback && isCorrect) {
              className = "btn-answer-correct";
            } else if (isFeedback && isSelected && !isCorrect) {
              className = "btn-answer-wrong";
            }

            return (
              <button
                key={artist}
                disabled={status !== "answering"}
                onClick={() => handleAnswer(artist)}
                className={`${className} ${status === "answering" ? "hover:-translate-y-[1px]" : ""
                  }`}
              >
                {artist}
              </button>
            );
          })}
        </div>

      </div>
    </div>
  );
}
