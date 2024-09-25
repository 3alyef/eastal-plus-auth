import { IStatusMsg } from "../../interfaces/IStatusMsg";
import { StatusCode } from "../../interfaces/IStatusCode";

export default function verifyPassword(password: string | undefined, repeatPassword: string | undefined): void | IStatusMsg {
	if(password !== null && repeatPassword !== null && password === repeatPassword) {
		return;
	}
	throw { message: "Senhas não correspondem", status: StatusCode.BAD_REQUEST };
}