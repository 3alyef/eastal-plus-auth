export interface PropsRegister {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	repeatPassword: string;
}

export interface PropsGenerateRandomKey {
	alKey: string,
	postKey: string,
	elKey: string
}