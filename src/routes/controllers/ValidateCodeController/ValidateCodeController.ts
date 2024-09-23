import { ValidateCode } from "../../../services/Services";
import DefaultController from "../DefaultController";
import { Request, Response } from "express";

export default class ValidateCodeController extends DefaultController {
	private validateCode: ValidateCode;
	constructor(req: Request, res: Response) {
		super(req, res);
		this.validateCode = new ValidateCode();
		this.start();
	}

	private async start() {
		const { email, code } = this.req.body;
		const { status, message } = await this.validateCode.init(email, code);

		this.res.status(status).json({
			message,
		}).end();
	}
}