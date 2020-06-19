import {
  formatDistanceToNow as formatDistanceToNowFns,
  differenceInYears as differenceInYearsFns,
  format as formatFns,
} from "date-fns";

import { pl } from "date-fns/locale";

const userLang = navigator.language || navigator.userLanguage;

const getLocale = (lang) => {
  const locales = {
    pl: pl,
  };
  return { locale: locales[lang] } || {};
};

export const format = (...args) => formatFns(...args, getLocale(userLang));

export const getAge = (birthday) =>
  differenceInYearsFns(new Date(), new Date(birthday), getLocale(userLang)) - 1;

export const formatDistanceToNow = (...args) =>
  formatDistanceToNowFns(...args, getLocale(userLang));
