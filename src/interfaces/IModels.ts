export interface IAccount {
	userId: string;
	accountType: "normal" | "premium";
	createdIn: Date;
	lastUpdateIn: Date;
}

export interface IUser {
	_id?: string;
	userId: string;
	email: string;
	password: string;
	firstName: string;
	lastName: string;
	dateOfBirth: Date;
	lastUpdateIn: Date;
}
