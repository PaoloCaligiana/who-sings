type StartScreenProps = {
  questionsCount: number;
  onStart: () => void;
};

export default function QuizStartScreen({ questionsCount, onStart }: StartScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full gap-4">
      <h2 className="text-xl mb-3">Pronto per iniziare!</h2>
      <p className="text-muted mb-4">{questionsCount} domande caricate</p>
      <button
        className="btn-primary"
        disabled={questionsCount === 0}
        onClick={onStart}
      >
        Inizia Quiz
      </button>
    </div>
  );
}
