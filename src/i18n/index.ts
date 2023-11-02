import { InternationalizationDictionary } from "./type";

import { en_dict } from "./en";
import { es_dict } from "./es";

export type Locale = {
  code: "es" | "en";
  flag: string;
  name: string;
  dict: InternationalizationDictionary;
};

export const locales: Record<Locale["code"], Locale> = {
  en: {
    code: "en",
    flag: "🇺🇸",
    name: "English",
    dict: en_dict,
  },
  es: {
    code: "es",
    flag: "🇪🇸",
    name: "Español",
    dict: es_dict,
  },
};
