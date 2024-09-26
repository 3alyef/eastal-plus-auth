import pathModule from 'path';
import { Views } from './Views';
import { Locale } from './locale-views';
import { promises as fs } from 'fs';

async function loadDictionary<T>(template: Views, locale: Locale): Promise<T> {
  const jsonPath = pathModule.join(
    __dirname,
    `../views-templates/${template}/dictionaries/${locale}.json`,
  );

  try {
    const data = await fs.readFile(jsonPath, 'utf-8');
    return JSON.parse(data) as T;
  } catch (error) {
    throw new Error(`Erro ao carregar o dicionário para ${locale}: ${error}`);
  }
}

export default async function getDictionary<T>(
  template: Views,
  locale: Locale,
): Promise<T | null> {
  try {
    const data = await loadDictionary<T | null>(template, locale);
    // console.log(data);
    return data;
  } catch (error) {
    console.error(`Erro ao carregar o dicionário para ${locale}:`, error);
    return null;
  }
}

/*
// const filePath = pathModule.join(__dirname, `../views-templates/${template}/dictionaries/${locale}.json`)
  // return import(filePath).then((module) => module.default);
*/
