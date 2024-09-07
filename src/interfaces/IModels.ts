export interface IAccount {
	userId: string;
	accountType: "normal" | "premium";
	createdIn: Date;
	lastUpdateIn: Date;
}

export interface IUser {
	userId: string;
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	dateOfBirth: Date;
	lastUpdateIn: Date;
}
