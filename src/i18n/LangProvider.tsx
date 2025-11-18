import { type ReactNode, useState } from "react";
import { LangContext } from "./LangContext";
import type { Lang } from "./constants";
import { getSavedLanguage, saveLanguage } from "../storage/languageStorage";

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(getSavedLanguage());

  const update = (l: Lang) => {
    saveLanguage(l);
    setLang(l);
  };

  return (
    <LangContext.Provider value={{ lang, setLang: update }}>
      {children}
    </LangContext.Provider>
  );
}