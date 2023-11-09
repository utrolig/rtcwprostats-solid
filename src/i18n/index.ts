import { InternationalizationDictionary } from "./type";
import esFlag from "../assets/flags/es.svg";
import enFlag from "../assets/flags/gb.svg";

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
    flag: enFlag,
    name: "English",
    dict: en_dict,
  },
  es: {
    code: "es",
    flag: esFlag,
    name: "Español",
    dict: es_dict,
  },
};
