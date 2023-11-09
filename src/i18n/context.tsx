import {
  Component,
  createContext,
  createEffect,
  JSX,
  useContext,
} from "solid-js";
import { createStore } from "solid-js/store";
import { Locale, locales } from ".";
import * as i18n from "@solid-primitives/i18n";

export type LanguageContextType = [
  {
    code: Locale["code"];
  },
  (code: Locale["code"]) => void
];

export const LanguageContext = createContext<LanguageContextType>([
  {
    code: "en",
  },
  (_code: string) => {},
]);

export const LanguageProvider: Component<{
  children: JSX.Element;
  initialLanguage?: Locale["code"];
}> = (props) => {
  const [state, setState] = createStore<LanguageContextType[0]>({
    code: props.initialLanguage ?? "en",
  });

  const languageValue: LanguageContextType = [
    state,
    (code: Locale["code"]) => {
      document.cookie = `lang=${code}; path=/; max-age=31536000; samesite=strict`;

      setState({
        code,
      });
    },
  ];

  return (
    <LanguageContext.Provider value={languageValue}>
      {props.children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  return useContext(LanguageContext);
};

export const useTranslation = () => {
  const [lang] = useLanguage();

  return i18n.translator(() => locales[lang.code].dict, i18n.resolveTemplate);
};
