import { Request, Response } from "express";
import { reqBodyLogin } from "./ILoginController";
import { LoginUser } from "../../../rewrite/services/Servicesces";
import DefaultController from "../DefaultController";
import { StatusCode } from "../../../interfaces/IStatusCode";
export default class LoginController extends DefaultController {
	private login: LoginUser;
	constructor(req: Request, res: Response) {
		super(req, res);
		this.login = new LoginUser();
		this.start();
	}

	private async start(): Promise<void> {
		const reqBody: reqBodyLogin = this.req.body;

		let response = await this.login.init(reqBody);
		if("status" in response) {
			const { status, message } = response;
			this.res.status(status).json({
				message,
			}).end();
		} else {
			this.res.status(StatusCode.ACCEPTED).json(
				response
			).end();
		}
   
	}
}