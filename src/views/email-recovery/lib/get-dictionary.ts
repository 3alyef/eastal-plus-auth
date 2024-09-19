import { Locale } from '../../i18n-views'

// Também obtemos a importação padrão para tipos
const dictionaries = {
  en: () => import('../dictionaries/en.json').then((module) => module.default),
  pt: () => import('../dictionaries/pt.json').then((module) => module.default),
}

export const getDictionary = async (locale: Locale) => dictionaries[locale]();