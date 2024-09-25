export const locale = {
  defaultLocale: 'en',
  locales: ['pt', 'en'],
} as const;

export type Locale = (typeof locale)['locales'][number];
