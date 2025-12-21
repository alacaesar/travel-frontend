import { routes } from "../i18n/routes";

export function getPaths(locale, key) {
  return `/${locale}/${routes[locale][key]}`;
}
