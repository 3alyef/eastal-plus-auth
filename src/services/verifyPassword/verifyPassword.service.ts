import { defaultError } from "../../interfaces/IError";
import { StatusCode } from "../../interfaces/IStatusCode";

export default function verifyPassword(password: string, repeatPassword: string): void | defaultError {
	if(password !== null && repeatPassword !== null && password === repeatPassword) {
		return;
	}
	throw { message: "Senhas não correspondem", status: StatusCode.BAD_REQUEST };
}