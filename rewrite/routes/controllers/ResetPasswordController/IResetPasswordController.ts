export interface IResetPassword { 
	email: string | undefined; 
	code: string | undefined; 
	password: string | undefined; 
	repeatPassword: string | undefined;
}