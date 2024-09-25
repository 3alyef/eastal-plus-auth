import { Locale } from "../../../views/lib/locale-views";

export interface reqBodyRegister {
	firstName: string;
	lastName: string;
	email: string;
	password: string; 
	repeatPassword: string;
	language?: Locale
}