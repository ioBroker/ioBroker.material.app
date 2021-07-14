import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./en.json";
import ru from "./ru.json";
import de from "./de.json";
import es from "./es.json";
import fr from "./fr.json";
import it from "./it.json";
import nl from "./nl.json";
import pl from "./pl.json";
import pt from "./pt.json";
import zh from "./zh.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeModules, Platform } from 'react-native';
import * as RNLocalize from "react-native-localize";

export const resources = {
  en: {
    translation: en,
  },
  ru: {
    translation: ru,
  },
  de: {
    translation: de,
  },
  es: {
    translation: es,
  },
  fr: {
    translation: fr,
  },
  it: {
    translation: it,
  },
  nl: {
    translation: nl,
  },
  pl: {
    translation: pl,
  },
  pt: {
    translation: pt,
  },
  'zh-cn': {
    translation: zh,
  },
};

const languageDetector = {
  type: "languageDetector",
  async: true,
  detect: async (language) => {
    const persistedLocale = await AsyncStorage.getItem("language");
    const infoDevice = RNLocalize.getLocales();
    if (infoDevice.length) {
      const languageCode = infoDevice[0].languageCode;
      const arrLang = Object.keys(resources);
      if (languageCode) {
        const keyLanguage = arrLang.find((key) => key.includes(languageCode));
        if (keyLanguage) {
          return language(keyLanguage);
        }
      }
    }
    if (!persistedLocale) {
      return language("en");
    }
    language(persistedLocale);
  },
  init: () => {},
  cacheUserLanguage: (locale) => {
    AsyncStorage.setItem("language", locale);
  },
};
i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    resources: resources,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
