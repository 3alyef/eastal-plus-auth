import { Locale } from "../views/lib/locale-views";

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
	language: Locale
}

export interface IUserAbout {
	_id?: string;
	userId: string;
	firstName: string;
	lastName: string;
	dateOfBirth: Date;
	updatedAt: Date;
}
