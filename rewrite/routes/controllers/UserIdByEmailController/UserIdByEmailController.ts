import { Request, Response } from "express";
import DefaultController from "../DefaultController";
import { GetUserIdByEmail } from "../../../rewrite/services/Servicesces";
import { StatusCode } from "../../../interfaces/IStatusCode";
import { IStatusMsg } from "../../../interfaces/IStatusMsg";
import { GetUserId } from "./IUserIdByEmailController";

export default class UserIdByEmailController extends DefaultController {
  private getUserIdByEmail: GetUserIdByEmail;
  constructor(req: Request, res: Response) {
    super(req, res);
    this.getUserIdByEmail = new GetUserIdByEmail();
    this.start();
  }

  private async start(): Promise<void> {
    const email = (this.req.query.email as string) || undefined;
    const userData: GetUserId | IStatusMsg = await this.getUserIdByEmail.init(email);
    if ("userId" in userData) {
      this.res.status(StatusCode.OK).json({
				userData,
			}).end();
    } else {
      const { status, message } = userData;
      this.res.status(status).json({
				message,
			}).end();
    }
  }
}
