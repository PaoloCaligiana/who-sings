
export default function QuizErrorScreen({ errorMessage, reloadQuiz }: { errorMessage: string; reloadQuiz: () => void }) {
    return (
        <div className="flex flex-col items-center justify-center h-full gap-6 p-6">
            <div className="text-5xl mb-2 text-danger">⚠️</div>
            <h2 className="text-2xl font-bold text-danger">Failed to Load Quiz</h2>
            <p className="text-muted mt-2 text-sm">
                {errorMessage || "An unexpected error occurred while loading the quiz."}
            </p>
            <div className="divider" />
            <div className="flex flex-col gap-3 mt-4">
                <button
                    onClick={reloadQuiz}
                    className="btn-primary w-full"
                >
                    Try Again
                </button>
            </div>
        </div>
    )
}
