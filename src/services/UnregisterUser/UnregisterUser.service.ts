import { Request } from "express";
import { defaultError } from "../../interfaces/IError";
import { IUser } from "../../interfaces/IModels";
import { getUserAuth } from "../Services";
import { StatusCode } from "../../interfaces/IStatusCode";
export default class UnregisterUser {
	public async init(req: Request): Promise<defaultError | true> {
		try {
			const { email, password } = req.body;
			if(email && password) {
				const response = await this.verifyEmail(email);
				if(response) {

				}
			}
			throw {
				status: StatusCode.BAD_REQUEST, 
				message: "Informações incompletas."
			};
		} catch(err) {
			const error = err as defaultError;
      console.error(error);
      return error;
		}
	}

	private async verifyEmail(email: string): Promise<boolean> {
		const IUserData: defaultError | IUser = await getUserAuth(email);

		if("status" in IUserData) {
			throw {
				status: StatusCode.NOT_FOUND,
				message: "Email ausente na base de dados."
			}
		}

		return true;
	}
}