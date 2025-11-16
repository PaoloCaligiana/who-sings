import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./app/AppLayout";
import { getCurrentPlayer } from "./storage/playerStorage";
import LoginPage from "./pages/loginPage/LoginPage";
import { RequirePlayer } from "./app/guards/RequirePlayer";
import QuizPage from "./pages/quizPage/QuizPage";
import UserPage from "./pages/userPage/UserPage";
import HighScoresPage from "./pages/highScoresPage/HighScoresPage";


export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <AppLayout>
              {getCurrentPlayer()
                ? <Navigate to="/quiz" replace />
                : <Navigate to="/login" replace />
              }
            </AppLayout>
          }
        />

        <Route
          path="/login"
          element={
            <AppLayout>
              <LoginPage />
            </AppLayout>
          }
        />

           <Route
          path="/quiz"
          element={
            <AppLayout>
              <RequirePlayer>
                <QuizPage />
              </RequirePlayer>
            </AppLayout>
          }
        />

        <Route
          path="/me"
          element={
            <AppLayout>
              <RequirePlayer>
                <UserPage />
              </RequirePlayer>
            </AppLayout>
          }
        />

        <Route
          path="/highscores"
          element={
            <AppLayout>
              <HighScoresPage />
            </AppLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
