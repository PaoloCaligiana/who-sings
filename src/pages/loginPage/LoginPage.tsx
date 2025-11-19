// LoginPage.tsx
import { useState } from "react";
import { translate } from "../../i18n/utils";
import { useLang } from "../../i18n/LangContext";
import { useLogin } from "../../hooks/useLogin";
import type { QuizMode } from "../../types";
import { saveQuizMode } from "../../storage/quizSessionStorage";

export default function LoginPage() {
  const { lang } = useLang();
  const { login } = useLogin();
  const [name, setName] = useState("");

  const handleSubmit = (mode: QuizMode) => {
    if (!name.trim()) return;
    saveQuizMode(mode);
    login(name);
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="card max-w-sm w-full flex flex-col gap-4 p-8">

        <div>
          <h1 className="text-2xl font-bold text-primary mb-4">
            {translate("login.title", lang)}
          </h1>
          <p className="text-sm text-muted mb-2">
            {translate("login.subtitle", lang)}
          </p>
        </div>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={translate("login.placeholder", lang)}
          className="input"
        />

        <div className="flex flex-col gap-3 pt-2">
          <button
            onClick={() => handleSubmit("normal")}
            className="btn-primary"
            disabled={!name.trim()}
          >
            {translate("login.normalModeButton", lang)}
          </button>

          <button
            onClick={() => handleSubmit("infinite")}
            className="btn-surface"
            disabled={!name.trim()}
          >
            {translate("login.endlessModeButton", lang)} ∞
          </button>
        </div>

      </div>
    </div>
  );
}
