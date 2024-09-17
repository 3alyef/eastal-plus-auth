export interface AccountDataRes {
	userId: string;
	accountType: string;
	email?: string;
}

export interface AccountLogin extends AccountDataRes{
	password: string;
}
