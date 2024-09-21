import { ForgotPassword } from "../../../services/Services";
import DefaultController from "../DefaultController";
import { Request, Response } from 'express';
export default class ForgotPasswordController extends DefaultController {
	private forgotPassword: ForgotPassword;
	constructor(req: Request, res: Response) {
		super(req, res);
		this.forgotPassword = new ForgotPassword();
		this.start();
	}

	private async start() {
		const { email } = this.req.body;

		const { message, status } = await this.forgotPassword.init(email);

		this.res.status(status).send(message).end();
	}
}