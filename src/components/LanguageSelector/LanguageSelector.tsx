import { For } from "solid-js";
import { Select } from "@kobalte/core";
import { Locale, locales } from "~/i18n";
import { useLanguage } from "~/i18n/context";
import styles from "./LanguageSelector.module.css";
import { CaretDown } from "~/assets/icons/CaretDown";

export const LanguageSelector = () => {
  const [lang, setLanguage] = useLanguage();

  const getLocales = () => {
    return Object.values(locales).map((locale) => locale.code);
  };

  const getValue = () => {
    return lang.code;
  };

  const getLanguageName = (code: Locale["code"]) => {
    return locales[code].name;
  };

  const onChange = (value: Locale["code"]) => {
    if (!value) {
      return;
    }

    setLanguage(value);
  };

  const getImageUrl = (code: Locale["code"]) => {
    return locales[code].flag;
  };

  return (
    <div class={styles.languageSelector}>
      <Select.Root
        options={getLocales()}
        onChange={onChange}
        placeholder="Select a fruit…"
        value={getValue()}
        itemComponent={(props) => (
          <Select.Item item={props.item} class={styles.selectItem}>
            <Select.ItemLabel class={styles.selectItemLabel}>
              <img
                class={styles.valueImage}
                src={getImageUrl(props.item.rawValue)}
              />
              <span>{getLanguageName(props.item.rawValue)}</span>
            </Select.ItemLabel>
          </Select.Item>
        )}
      >
        <Select.Trigger class={styles.selectTrigger}>
          <Select.Value class={styles.selectValue}>
            <img class={styles.valueImage} src={getImageUrl(lang.code)} />
            <CaretDown class={styles.caretDown} />
          </Select.Value>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content class={styles.selectContent}>
            <Select.Arrow class={styles.selectArrow} />
            <Select.Listbox class={styles.selectListbox} />
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
};
