import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import pl from "pl.json";
import en from "en.json";

var userLang = navigator.language || navigator.userLanguage;

const resources = {
  en: en,
  pl: pl,
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: userLang,

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
