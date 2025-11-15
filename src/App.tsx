function App() {

  return (
    <div className="min-h-screen bg-bg text-white font-sans flex items-center justify-center">
      <div className="bg-surface p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="font-display text-display text-primary">
          Who Sings 🎵
        </h1>
        <p className="mt-2 text-sm text-muted">
          Indovina chi canta questa linea di testo.
        </p>

        <button className="btn-primary">Gioca</button>
        <button className="btn-ghost ml-2">Esci</button>

        <div className="card mt-6">
          <h2 className="font-display text-xl">Prossima domanda</h2>
        </div>
      </div>
    </div>
  );
}

export default App
