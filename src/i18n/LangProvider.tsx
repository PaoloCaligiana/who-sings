import { type ReactNode, useState } from "react";
import { LangContext } from "./LangContext";
import type { Lang } from "./dictionary";

export function LangProvider({ children }: { children: ReactNode }) {
  const saved = (localStorage.getItem("lang") as Lang) || "en";
  const [lang, setLang] = useState<Lang>(saved);

  const update = (l: Lang) => {
    localStorage.setItem("lang", l);
    setLang(l);
  };

  return (
    <LangContext.Provider value={{ lang, setLang: update }}>
      {children}
    </LangContext.Provider>
  );
}