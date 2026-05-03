import React, { createContext, useContext, useState } from "react";
import type { UILang, Strings } from "./i18n";
import strings from "./i18n";

interface I18nContextType {
  lang: UILang;
  setLang: (l: UILang) => void;
  t: Strings;
}

const I18nContext = createContext<I18nContextType>({
  lang: "zh",
  setLang: () => {},
  t: strings.zh,
});

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<UILang>("zh");
  return (
    <I18nContext.Provider value={{ lang, setLang, t: strings[lang] }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
