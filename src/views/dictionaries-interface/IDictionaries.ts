import IEmailRecovery from "./IEmailRecovery";

export { IEmailRecovery };

const dictionaries = {
	IEmailRecovery: 'IEmailRecovery'
} as const;

export type DictionaryMapping = {
  IEmailRecovery: IEmailRecovery;
};

export type ViewsDictionaries = keyof typeof dictionaries;
