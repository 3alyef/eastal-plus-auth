import DefaultController from "../DefaultController";
import { Request, Response } from "express";

export default class ValidateCodeController extends DefaultController {
	constructor(req: Request, res: Response) {
		super(req, res);
	}
}