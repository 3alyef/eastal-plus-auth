import { Request, Response } from "express";
export default abstract class DefaultController {
  protected req: Request;
  protected res: Response;

	constructor(req: Request, res: Response) {
		this.req = req;
		this.res = res;
	}
}