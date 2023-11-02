import { For } from "solid-js";
import { Locale, locales } from "~/i18n";
import { useLanguage } from "~/i18n/context";
import styles from "./LanguageSelector.module.css";

export const LanguageSelector = () => {
  const [lang, setLanguage] = useLanguage();

  const getLocales = () => {
    return Object.values(locales);
  };

  const onChange = (event: Event) => {
    const element = event.currentTarget as HTMLSelectElement;
    setLanguage(element.value as Locale["code"]);
  };

  return (
    <div class={styles.languageSelector}>
      <select onChange={onChange}>
        <For each={getLocales()}>
          {(locale) => (
            <option value={locale.code} selected={locale.code === lang.code}>
              {locale.name}
            </option>
          )}
        </For>
      </select>
    </div>
  );
};
