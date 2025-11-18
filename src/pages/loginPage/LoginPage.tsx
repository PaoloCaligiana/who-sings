import { useState } from "react";
import { translate } from "../../i18n/utils";
import { useLang } from "../../i18n/LangContext";
import { useLogin } from "../../hooks/useLogin";

export default function LoginPage() {
  const { lang } = useLang();
  const { login } = useLogin();
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(name);
  };

  return (
    <div className="flex justify-center items-center min-h-[70vh] px-4">

      {/* Card */}
      <div className="card flex flex-col gap-2 max-w-md">

        {/* Title */}
        <h1 className="text-xl font-bold text-primary">
          {translate("login.title", lang)}
        </h1>

        <p className="text-sm text-muted mb-3">
          {translate("login.subtitle", lang)}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Input */}
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={translate("login.placeholder", lang)}
            className="input"
          />

          {/* Button */}
          <button type="submit" className="btn-primary" disabled={!name.trim()}>
            {translate("login.button", lang)}
          </button>
        </form>

      </div>
    </div>
  );
}
