import { Locale } from "../views/i18n-views";

export interface CheckEmailRes {
	email: string;
	accountType: "normal" | "pro";
	createdAt: Date;
	updatedAt: Date;
}

export interface IAccount extends CheckEmailRes {
	userId: string;
	password: string;
	recoveryEmail: string;
}

export interface IUserAbout {
	_id?: string;
	userId: string;
	firstName: string;
	lastName: string;
	dateOfBirth: Date;
	updatedAt: Date;
	language: Locale
}
