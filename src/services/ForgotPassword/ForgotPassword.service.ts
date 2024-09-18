import { StatusCode } from "../../interfaces/IStatusCode";
import { IStatusMsg } from "../../interfaces/IStatusMsg";
import { GetUserIdByEmail } from "../Services";

export default class ForgotPassword {
	private getUserIdService: GetUserIdByEmail;
	constructor() {
		this.getUserIdService = new GetUserIdByEmail();
	}
	public async init(email: string | undefined): Promise<IStatusMsg> {
		try {
			if(email) {
				const response = await this.getUserIdService.init(email);

				if("status" in response) {
					throw response;
				}

				const { userId } = response;
				return {
					message: "oi",
					status: StatusCode.OK
				}
			} else {
				throw {
					message: "Email incompleto ou faltando.",
					status: StatusCode.BAD_REQUEST,
				}
			}
		} catch(err) {
			const error = err as IStatusMsg;
			console.log(error.message);
			return error;
		}
	}
}