import { StatusCode } from "../../interfaces/IStatusCode";
import { IStatusMsg } from "../../interfaces/IStatusMsg";
import { ConfirmationCode } from "../Services";

export default class ValidateCode {
	private confirmationCode: ConfirmationCode;
	constructor() {
		this.confirmationCode = new ConfirmationCode();
	}
	public async init(email: string | undefined, code: string | undefined): Promise<IStatusMsg> {
		try {
			if(email && code) {
				const response = await this.confirmationCode.verifyConfirmationCode(email, code);

				if(response !== true) {
					throw response
				}

				return {
					message: "Code válido.",
					status: StatusCode.OK,
				}
			} else {
				throw {
					message: "Email ou code incompletos",
					status: StatusCode.BAD_REQUEST,
				}
			}
		} catch(err) {
			const error = err as IStatusMsg;
			console.error(error.message);
			return error;
		}
	}
};