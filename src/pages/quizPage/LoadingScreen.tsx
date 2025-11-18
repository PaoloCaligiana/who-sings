export default function LoadingScreen() {
    return (
        <div className="flex flex-col items-center justify-center h-full gap-4">
            <div className="music-loader">
                <div className="music-bar"></div>
                <div className="music-bar"></div>
                <div className="music-bar"></div>
                <div className="music-bar"></div>
                <div className="music-bar"></div>
                <div className="music-bar"></div>
            </div>
            <h2 className="text-xl text-muted">Caricamento domande...</h2>
        </div>
    );
}
