import { Request, Response } from "express";
import DefaultController from "../DefaultController";
import { UnregisterUser } from "../../../services/Services";

export default class UnregisterController extends DefaultController {
	private unregisterService: UnregisterUser;
	constructor(req: Request, res: Response) {
		super(req, res);
		this.unregisterService = new UnregisterUser();
		this.start();
	}

	private async start() {
		
		const { status, message } = await this.unregisterService.init(this.req);

		this.res.status(status).json({
			message,
		}).end();
	}
}