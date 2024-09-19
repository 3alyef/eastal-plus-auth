import { Locale } from "../../../views/i18n-views";

export interface reqBodyRegister {
	firstName: string;
	lastName: string;
	email: string;
	password: string; 
	repeatPassword: string;
	language?: Locale
}