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
  const [error, setError] = useState<"login.errorMinLength" | "login.errorMaxLength" | "login.errorNoSpaces" | null>(
    null
  );
  const [touched, setTouched] = useState(false);
  const MIN_CHARS = 3;
  const MAX_CHARS = 8;

  const validateName = (
    value: string
  ): "login.errorMinLength" | "login.errorMaxLength" | "login.errorNoSpaces" | null => {
    if (!value) return null; // Non mostra errore se completamente vuoto
    if (value.includes(" ")) return "login.errorNoSpaces";
    if (value.length < MIN_CHARS) return "login.errorMinLength";
    if (value.length > MAX_CHARS) return "login.errorMaxLength";
    return null;
  };

  const handleInputChange = (value: string) => {
    setName(value);
    if (touched) {
      setError(validateName(value));
    }
  };

  const handleFocus = () => {
    setTouched(true);
    setError(validateName(name));
  };

  const formatNickname = (value: string): string => {
    const trimmed = value.trim();
    return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
  };

  const handleSubmit = (mode: QuizMode) => {
    const validationError = validateName(name);
    if (validationError) {
      setError(validationError);
      setTouched(true);
      return;
    }

    const formattedName = formatNickname(name);
    saveQuizMode(mode);
    login(formattedName);
  };

  return (
    <div className="flex items-center justify-center min-h-[70vh]">
      <div className="card max-w-sm w-full flex flex-col gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-primary mb-4">{translate("login.title", lang)}</h1>
          <p className="text-sm sm:text-base text-secondary ">{translate("login.subtitle", lang)}</p>
        </div>

        <input
          type="text"
          value={name}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={handleFocus}
          placeholder={translate("login.placeholder", lang)}
          className="input "
          maxLength={MAX_CHARS}
        />

        {error && touched && <p className="text-xs text-orange-400 -mt-2">⚠ {translate(error, lang)}</p>}

        <div className="flex flex-col gap-3 pt-2">
          <button onClick={() => handleSubmit("normal")} className="btn-primary" disabled={!name.trim() || !!error}>
            {translate("login.normalModeButton", lang)}
          </button>

          <button onClick={() => handleSubmit("infinite")} className="btn-surface" disabled={!name.trim() || !!error}>
            {translate("login.endlessModeButton", lang)} ∞
          </button>
        </div>
      </div>
    </div>
  );
}
