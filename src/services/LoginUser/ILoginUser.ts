export interface IAccountDataRes {
	userId: string;
	accountType: string;
	email?: string;
}

export interface IAccountLogin extends IAccountDataRes{
	password: string;
}
