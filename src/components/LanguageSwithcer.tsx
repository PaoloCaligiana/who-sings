import { useState } from "react";
import { useLang } from "../i18n/LangContext";
import type { Lang } from "../i18n/dictionary";

const LANGS: { code: Lang; label: string; flag: string }[] = [
  { code: "en", label: "English", flag: "🇬🇧" },
  { code: "it", label: "Italiano", flag: "🇮🇹" },
  { code: "es", label: "Español", flag: "🇪🇸" },
];

export function LanguageSwitcher() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);

  const current = LANGS.find((l) => l.code === lang)!;

  return (
    <div className="relative inline-block text-left">
      {/* TRIGGER */}
      <button
        onClick={() => setOpen(!open)}
        className="lang-trigger"
      >
        <span className="flag">{current.flag}</span>
        <span>{current.label}</span>
      </button>

      {/* MENU */}
      {open && (
        <div className="dropdown">
          {LANGS.map((item) => (
            <button
              key={item.code}
              onClick={() => {
                setLang(item.code);
                setOpen(false);
              }}
              className={
                lang === item.code
                  ? "dropdown-item dropdown-item-active"
                  : "dropdown-item"
              }
            >
              <span className="flag">{item.flag}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}

      {/* CLICK OUTSIDE */}
      {open && (
        <div
          className="fixed inset-0 z-10"
          onClick={() => setOpen(false)}
        />
      )}
    </div>
  );
}
