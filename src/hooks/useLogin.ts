// hooks/useLogin.ts
import { saveCurrentPlayer } from "../storage/playerStorage";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();

  function login(name: string) {
    const trimmed = name.trim();
    if (!trimmed) return false;
    saveCurrentPlayer(trimmed);
    navigate("/quiz");
    return true;
  }

  return { login };
}
