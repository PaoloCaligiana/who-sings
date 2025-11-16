import { useState } from "react";
import { useLang } from "../i18n/LangContext";
import { LANGS } from "../i18n/dictionary";

export function LanguageSwitcher() {
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const current = LANGS.find((l) => l.code === lang)!;

  return (
    <div className="relative inline-block text-left">
      {/* Trigger */}

      <button onClick={() => setOpen((o) => !o)} className="lang-trigger">
        <span className="flag">{current.flag}</span>
        <span>{current.code.toUpperCase()}</span>
        <svg className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {/* Dropdown */}
      {open && (
        <div className="dropdown animate-fadeIn">
          {LANGS.map((item) => (
            <button key={item.code} onClick={() => { setLang(item.code); setOpen(false); }} className={lang === item.code ? "dropdown-item dropdown-item-active" : "dropdown-item"}>
              <span className="flag">{item.flag}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </div>
      )}
      {/* Click outside */}

      {open && <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />}
    </div>
  );
}
