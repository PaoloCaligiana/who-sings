import type { QuizCard } from "../../types";

type QuizGameScreenProps = {
    questionIndex: number;
    totalQuestions: number;
    score: number;
    streak: number;
    currentQuestion: QuizCard | null;
    timeLeft: number;
    questionTime: number;
    status: "answering" | "feedback";
    selectedOption: string | null;
    onAnswer: (artist: string) => void;
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
}: QuizGameScreenProps) {
    return (
        <div className="w-full">
            {/* Header */}
            <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
                <span className="text-sm text-muted">
                    Domanda {questionIndex + 1} / {totalQuestions}
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
                <div className="lyric-box relative overflow-hidden">
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
                <div className="mb-3">
                    <p className="text-xs text-muted">Tempo rimasto: {timeLeft}s</p>
                </div>

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
    );
}
