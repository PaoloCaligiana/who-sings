import { useLang } from "../../i18n/LangContext";
import { translate } from "../../i18n/utils";
import type { QuizCard } from "../../types";

type QuizGameScreenProps = {
  questionIndex: number;
  totalQuestions?: number; // Opzionale per modalità infinita
  score: number;
  streak: number;
  currentQuestion: QuizCard | null;
  timeLeft: number;
  questionTime: number;
  status: "answering" | "feedback";
  selectedOption: string | null;
  onAnswer: (artist: string) => void;
  isInfiniteMode?: boolean;
};

export default function QuizGameScreen({
  questionIndex,
  totalQuestions,
  score,
  streak,
  currentQuestion,
  timeLeft,
  questionTime,
  status,
  selectedOption,
  onAnswer,
  isInfiniteMode = false,
}: QuizGameScreenProps) {
  const { lang } = useLang();

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2">
        {/* Header */}
        <div className="flex justify-between items-center mb-2 flex-wrap gap-2 p-1">
          <span className="text-sm sm:text-base font-bold text-secondary">
            {isInfiniteMode
              ? `${translate("quiz.question", lang)} ${questionIndex + 1}`
              : `${translate("quiz.question", lang)} ${questionIndex + 1} / ${totalQuestions}`}
          </span>

          <div className="flex items-center gap-2">
            <span className="badge-primary">
              {translate("quiz.score", lang)}: {score}
            </span>

            {streak >= 2 && (
              <span className="badge-streak">
                🔥 {translate("quiz.streak", lang)} x{streak}
              </span>
            )}
          </div>
        </div>

        {/* Card */}
        <div className="card">
          <span className="text-xs sm:text-sm uppercase tracking-wider text-secondary">
            {translate("quiz.whoSings", lang)}
          </span>

          {/* Lyric */}
          <div className="lyric-box relative overflow-hidden mt-4">
            {/* Progress layer */}
            <div
              className="lyric-progress"
              style={{
                width: `${(timeLeft / questionTime) * 100}%`,
                transitionDuration: timeLeft === questionTime ? "0.15s" : "1s",
              }}
            />

            {/* Lyric text */}
            <span className="relative z-10 transition-opacity duration-300">
              "{currentQuestion?.lyricLine ?? "..."}"
            </span>
          </div>

          {/* Timer */}
          <div className="mb-4">
            <p className="text-xs text-muted">
              {translate("quiz.timeLeft", lang)}: {timeLeft}s
            </p>
          </div>

          {/* Options */}
          <div className="flex flex-col gap-2">
            {currentQuestion?.options.map((artist, index) => {
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
                  key={index}
                  disabled={status !== "answering"}
                  onClick={() => onAnswer(artist)}
                  className={`${className} ${status === "answering" ? "hover:-translate-y-px" : ""}`}
                >
                  {artist}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
