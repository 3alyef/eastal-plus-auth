import { DictionaryMapping, IEmailRecovery, ViewsDictionaries } from '../dictionaries-interface/IDictionaries';
import { Locale } from './locale-views';

async function loadDictionary<T>(template: string, locale: Locale): Promise<T> {
  const path = `../${template}/dictionaries/${locale}.json`;
  return import(path).then((module) => module.default);
};

export default async function getDictionary<K extends ViewsDictionaries>(template: string, locale: Locale): Promise<DictionaryMapping[K] | null> {
  try {
    return await loadDictionary<DictionaryMapping[K] | null>(template, locale);
  } catch (error) {
    console.error(`Erro ao carregar o dicionário para ${locale}:`, error);
    return null; 
  }
};

const test = getDictionary<IEmailRecovery>('', 'en')
