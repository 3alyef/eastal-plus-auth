import { Request, Response } from "express";
import DefaultController from "../../DefaultController";
import { CheckEmail } from "../../../../services/Services";
import { defaultError } from "../../../../interfaces/IError";
import { IUser } from "../../../../interfaces/IModels";
import { StatusCode } from "../../../../interfaces/IStatusCode";

export default class CheckEmailController extends DefaultController {
	private CheckEmail: CheckEmail;
	constructor(req: Request, res: Response) {
		super(req, res);
		this.CheckEmail = new CheckEmail();
		this.start();
	}

	private async start(): Promise<void> {

		let userData: IUser | defaultError = await this.CheckEmail.init(this.req);
		
		if("status" in userData){
			const { status, message } = userData;
			this.res.status(status).send(message).end();
		} else {
			this.res.status(StatusCode.FOUND).json(userData).end();
		}
	}
}