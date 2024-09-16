import { Request, Response } from "express";
import DefaultController from "../../DefaultController";
import { UnregisterUser } from "../../../../services/Services";

export default class UnregisterController extends DefaultController {
	private unregisterService: UnregisterUser;
	constructor(req: Request, res: Response) {
		super(req, res);
		this.unregisterService = new UnregisterUser();
		this.start();
	}

	private async start() {
		
		const response = await this.unregisterService.init(this.req);

		if(response !== true) {
			const { status, message } = response;

			this.res.status(status).send(message).end();
		}
		
	}
}