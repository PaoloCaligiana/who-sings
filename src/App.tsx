import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppLayout from "./app/AppLayout";
import { getCurrentPlayer } from "./storage/playerStorage";
import LoginPage from "./pages/LoginPage";


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
      </Routes>
    </BrowserRouter>
  );
}
