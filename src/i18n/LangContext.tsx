import { createContext, useContext } from "react";
import type { Lang } from "./constants";
interface LangContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

export const LangContext = createContext<LangContextType | undefined>(undefined);

export function useLang() {
  const context = useContext(LangContext);
  if (!context) {
    throw new Error("useLang must be used within LangProvider");
  }
  return context;
}