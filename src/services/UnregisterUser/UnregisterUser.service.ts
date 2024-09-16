import { Request } from "express";
import { IStatusMsg } from "../../interfaces/IStatusMsg";
import { IUser } from "../../interfaces/IModels";
import { CheckEmail } from "../Services";
import { StatusCode } from "../../interfaces/IStatusCode";
export default class UnregisterUser {
	private CheckEmail: CheckEmail;
	constructor() {
		this.CheckEmail = new CheckEmail();
	}
	public async init(req: Request): Promise<IStatusMsg | true> {
		try {
			const { email, password } = req.body;
			if(email && password) {
				const response: IStatusMsg | IUser = await this.CheckEmail.init(email);

				if("status" in response) {
					throw response;
				}


			}
			throw {
				status: StatusCode.BAD_REQUEST, 
				message: "Informações incompletas."
			};
		} catch(err) {
			const error = err as IStatusMsg;
      console.error(error);
      return error;
		}
	}
}