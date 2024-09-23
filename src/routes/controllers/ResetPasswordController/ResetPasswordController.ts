import { ResetPassword } from "../../../services/Services";
import DefaultController from "../DefaultController";
import { Request, Response } from "express";
import { IResetPassword } from "./IResetPasswordController";

export default class ResetPasswordController extends DefaultController {
	private resetPassword: ResetPassword;

	constructor(req: Request, res: Response) {
		super(req, res);
		this.resetPassword = new ResetPassword();
		this.start();
	}

	private async start() {
		const reqBody: IResetPassword = this.req.body;

		const { status, message }= await this.resetPassword.init(reqBody);

		this.res.status(status).json({
			message,
		}).end();
	}
}