import { ForgotPassword } from "../../../rewrite/services/Servicesces";
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

		const response = await this.forgotPassword.init(email);

		if("expiresAt" in response) {
			const { status, message, expiresAt } = response;
			this.res.status(status).json({
				message, 
				expiresAt
			}).end();
		} else {
			const { status, message } = response;
			this.res.status(status).json({ message }).end();
		}
	}
}