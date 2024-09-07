import { Request, Response } from "express";
import DefaultController from "../../DefaultController";

export default class LoginController extends DefaultController {
	constructor(req: Request, res: Response) {
		super(req, res);

		this.start();
	}

	private async start(): Promise<void> {

	}
}