import { Request, Response } from "express";
import { CheckEmail } from "../../../services/Services";
import DefaultController from "../DefaultController";
import { IStatusMsg } from "../../../interfaces/IStatusMsg";
import { IUser } from "../../../interfaces/IModels";
import { StatusCode } from "../../../interfaces/IStatusCode";
export default class CheckEmailController extends DefaultController {
	private CheckEmail: CheckEmail;
	constructor(req: Request, res: Response) {
		super(req, res);
		this.CheckEmail = new CheckEmail();
		this.start();
	}

	private async start(): Promise<void> {
		const email = this.req.query.email as string | undefined;
		let userData = await this.CheckEmail.init(email);
		
		if("status" in userData){
			const { status, message } = userData;
			this.res.status(status).send(message).end();
		} else {
			this.res.status(StatusCode.OK).json(userData).end();
		}
	}
}