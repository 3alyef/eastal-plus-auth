export interface IAccount {
	userId: string;
	email: string;
	password: string;
	accountType: "normal" | "pro";
	createdAt: Date;
	updatedAt: Date;
	recoveryEmail: string;
}

export interface IUser {
	_id?: string;
	userId: string;
	firstName: string;
	lastName: string;
	dateOfBirth: Date;
	updatedAt: Date;
}
