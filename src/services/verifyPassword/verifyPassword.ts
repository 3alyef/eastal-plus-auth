import { defaultError } from "../../interfaces/error";

export default function verifyPassword(password: string, repeatPassword: string): void | defaultError {
	if(password !== null && repeatPassword !== null && password === repeatPassword) {
		return;
	}
	throw { message: "Senhas não correspondem", status: 400 };
}