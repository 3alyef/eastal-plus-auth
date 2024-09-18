import DefaultController from "../DefaultController";
import { Request, Response } from "express";
import { promises as fs } from "fs";
import path from 'path';
export default class HomeController extends DefaultController {
	constructor(req: Request, res: Response) {
		super(req, res);
		this.start();
	}

	private async start() {
		const templatePath = path.join(__dirname, "../public/index.html");
		const template = await fs.readFile(templatePath, 'utf-8');
		this.res.send(template).end();
	}
}