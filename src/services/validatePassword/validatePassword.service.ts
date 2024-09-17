import { compare } from "bcrypt";
import { IStatusMsg } from "../../interfaces/IStatusMsg";
import { StatusCode } from "../../interfaces/IStatusCode";

export default async function validatePassword(password: string, refPassword: string): Promise<IStatusMsg | boolean> {
	try {
		const confirmPass = await compare(password, refPassword);

		return confirmPass;
	} catch(error) {
		console.error(error);
		return {
			message: "Erro ao conferir senha",
			status: StatusCode.INTERNAL_SERVER_ERROR
		};
	}
}