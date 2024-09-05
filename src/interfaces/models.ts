export interface IUserDetails {
	userId: string;
	firstName: string;
	lastName: string;
	dateOfBirth?: Date;
	lastUpdateIn: string;
}

export interface IUser {
	userId: string;
	email: string;
	password: string;
	lastUpdateIn: string;
}
