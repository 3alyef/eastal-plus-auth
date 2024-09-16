import { Request, Response } from "express";
import DefaultController from "../../DefaultController";
import { reqBodyLogin } from "./ILoginController";
import { LoginUser } from "../../../../services/Services";

export default class LoginController extends DefaultController {
	private login: LoginUser;
	constructor(req: Request, res: Response) {
		super(req, res);
		this.login = new LoginUser();
		this.start();
	}

	private async start(): Promise<void> {
		const reqBody: reqBodyLogin = this.req.body;

		let { status, message } = await this.login.init(reqBody);

    this.res.status(status).send(message).end();
	}
}